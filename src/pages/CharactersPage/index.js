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
  const [currentPage, setCurrentPage] = useState(0);
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

  useEffect(() => {
    firstRender && apiCall(currentPage * 30);
  },[currentPage]);
  
  return(
    <>
      <PageHeader/>
      <SearchField pageName="CHARACTERS" handleSubmit={handleSubmit} 
                  itemSearch={characterSearchField} setItemSearch={e => setCharacterSearchField(e.target.value)}/>
      <div className="results-grid">
      {charactersResults.results !== undefined && charactersResults.results.map((heroes)=> {
        return (
          <div className="image-container" key={heroes.id}>
            <img className="hero-img" src={`${heroes.thumbnail.path}/portrait_incredible.${heroes.thumbnail.extension}`} alt={heroes.name}/>
            <span className="hero-name">{heroes.name}</span>
          </div>
        );
        })}
        {charactersResults.results !== undefined && <ReactPaginate
                                                      containerClassName={"pagination"}
                                                      pageClassName={"page-item"}
                                                      pageCount={Math.ceil(charactersResults.total / charactersResults.count)} 
                                                      pageRangeDisplayed={10} 
                                                      marginPagesDisplayed={3}
                                                      onPageChange={({ selected: selectedPage }) => setCurrentPage(selectedPage)}/>}
      </div>
    </>
  );
}

export default CharactersPage;