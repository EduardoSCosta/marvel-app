import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import PageHeader from '../../../components/PageHeader';
import SearchField from '../../../components/SearchField';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

import './styles.css';

const CharactersListPage = () => {

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
      <SearchField pageName="CHARACTERS" handleSubmit={handleSubmit} placeholderText="Character name"
                  itemSearch={characterSearchField} setItemSearch={e => setCharacterSearchField(e.target.value)}/>
      <div className="results-grid">
      {charactersResults.results !== undefined && charactersResults.results.map((hero)=> {
        return (
          <Link className="image-container" key={hero.id} to={`/character/${hero.id}`}>
            <img className="item-img" src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`} alt={hero.name}/>
            <div className="item-name-container">
              <span className="item-name">{hero.name}</span>
            </div>
          </Link>
        );
        })}
      </div>
        {charactersResults.results !== undefined && <Pagination
                                                      pageCount={Math.ceil(charactersResults.total / charactersResults.limit)} 
                                                      onPageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>}
    </>
  );
}

export default CharactersListPage;