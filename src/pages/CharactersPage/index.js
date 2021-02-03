import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import PageHeader from '../../components/PageHeader';
import SearchField from '../../components/SearchField';
import api from '../../service/api';
import md5Hash from '../../utils/md5Hash';

import './styles.css';

const CharactersPage = () => {

  const [charactersResults, setCharactersResults] = useState({});
  const [characterSearchField, setCharacterSearchField] = useState("");
  const [characterSearch, setCharacterSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);

  const apiCall = async (dataOffset) => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/characters",
      {params: {
        limit: 30,
        nameStartsWith: (characterSearch.length > 0) ? characterSearch : null,
        ts: timeStamp,
        offset: dataOffset,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setCharactersResults(response.data.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCharacterSearch(characterSearchField);
    setFirstRender(true);
}

  useEffect(() => {
    firstRender && apiCall(0);
  },[firstRender, characterSearch]);
  
  return(
    <>
      <PageHeader/>
      <SearchField pageName="CHARACTERS" handleSubmit={handleSubmit} 
                  itemSearch={characterSearchField} setItemSearch={e => setCharacterSearchField(e.target.value)}/>
      <div className="results-grid">
      {charactersResults.results !== undefined && charactersResults.results.map((heroes)=> {
        return (
          <div className="image-container" key={heroes.id}>
            <img className="item-img" src={`${heroes.thumbnail.path}/portrait_incredible.${heroes.thumbnail.extension}`} alt={heroes.name}/>
            <span className="item-name">{heroes.name}</span>
          </div>
        );
        })}
      </div>
        {charactersResults.results !== undefined && <ReactPaginate
                                                      containerClassName={"pagination"}
                                                      pageClassName={"page-item"}
                                                      pageLinkClassName={"page-item-link"}
                                                      activeLinkClassName={"active-page-link"}
                                                      previousClassName={"page-item"}
                                                      nextClassName={"page-item"}
                                                      breakClassName={"page-item"}
                                                      breakLinkClassName={"page-item-link"}
                                                      previousLinkClassName={"page-item-link"}
                                                      nextLinkClassName={"page-item-link"}
                                                      previousLabel={"<"}
                                                      nextLabel={">"}
                                                      pageCount={Math.ceil(charactersResults.total / charactersResults.limit)} 
                                                      pageRangeDisplayed={10} 
                                                      marginPagesDisplayed={3}
                                                      onPageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>}
    </>
  );
}

export default CharactersPage;