import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchField from '../../components/SearchField';
import api from '../../service/api';
import md5Hash from '../../utils/md5Hash';

import './styles.css';

const CharactersPage = () => {

  const [charactersResults, setCharactersResults] = useState({});
  const [characterSearch, setCharacterSearch] = useState("");

  const apiCall = async () => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/characters",
      {params: {
        limit: 30,
        nameStartsWith: (characterSearch.length > 0) ? characterSearch : null,
        ts: timeStamp,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setCharactersResults(response.data.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall();
}

  return(
    <>
      <PageHeader/>
      <SearchField pageName="CHARACTERS" handleSubmit={handleSubmit} 
                  itemSearch={characterSearch} setItemSearch={e => setCharacterSearch(e.target.value)}/>
      <div className="results-grid">
      {charactersResults.results !== undefined && charactersResults.results.map((heroes)=> {
        return (
          <div className="image-container" key={heroes.id}>
            <img className="hero-img" src={`${heroes.thumbnail.path}/portrait_incredible.${heroes.thumbnail.extension}`} alt={heroes.name}/>
            <span className="hero-name">{heroes.name}</span>
          </div>
        );
        })}
      </div>
    </>
  );
}

export default CharactersPage;