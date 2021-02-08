import { useEffect, useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

import './styles.css';

const CharactersPage = ({match}) => {

  const {params: {characterId}} = match;
  const [characterData, setCharacterData] = useState([]);

  const apiCall = async () => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get(`v1/public/characters/${characterId}`,
      {params: {
        ts: timeStamp,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setCharacterData(response.data.data);
  }

  useEffect(() => {
    apiCall();
  },[]);
  
  return(
    <>
      <PageHeader/>
      {characterData.results !== undefined && 
        <h1 className="character-name">{characterData.results[0].name}</h1>}
      {characterData.results !== undefined && 
        <img className="character-img" 
              src={`${characterData.results[0].thumbnail.path}/portrait_incredible.${characterData.results[0].thumbnail.extension}`} 
              alt={characterData.results[0].name}/>}
      {characterData.results !== undefined && 
        <p className="character-name">{characterData.results[0].description}</p>}

    </>
  );
}

export default CharactersPage;