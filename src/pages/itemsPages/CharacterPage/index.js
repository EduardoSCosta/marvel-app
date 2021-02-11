import { useEffect, useState } from 'react';
import CategoryTitle from '../../../components/CategoryTitle';
import PageHeader from '../../../components/PageHeader';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

import './styles.css';

const CharactersPage = ({match}) => {

  const {params: {characterId}} = match;
  const [characterData, setCharacterData] = useState([]);
  const [comicsVisibility, setComicsVisibility] = useState("hidden");
  const [seriesVisibility, setSeriesVisibility] = useState("hidden");
  const [storiesVisibility, setStoriesVisibility] = useState("hidden");
  const [eventsVisibility, setEventsVisibility] = useState("hidden");

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
        <div className="character-data">
          <h1 className="character-name">{characterData.results[0].name}</h1>        
          <img className="character-img" 
                src={`${characterData.results[0].thumbnail.path}/portrait_incredible.${characterData.results[0].thumbnail.extension}`} 
                alt={characterData.results[0].name}/>

          {characterData.results[0].description.length > 0 &&
            <div className="character-description">
              <h4>DESCRIPTION</h4>
              <p >{characterData.results[0].description}</p>
            </div>}

            {characterData.results[0].comics.items.length > 0 && 
              <div className="character-comics">
                <CategoryTitle categoryName="COMICS" 
                               categoryVisibility={comicsVisibility} 
                               changeCategoryVisibility={() => setComicsVisibility((comicsVisibility === "hidden") ? "visible" : "hidden")}/>
                <ul className={`items-list ${comicsVisibility}`}> 
                  {characterData.results[0].comics.items.map((comic, index)=> {
                    return (
                      <li key={index}>{comic.name}</li>
                    );})}
                </ul>
              </div>}

            {characterData.results[0].series.items.length > 0 && 
              <div className="character-series">
                <CategoryTitle categoryName="SERIES" 
                               categoryVisibility={seriesVisibility} 
                               changeCategoryVisibility={() => setSeriesVisibility((seriesVisibility === "hidden") ? "visible" : "hidden")}/>
                <ul className={`items-list ${seriesVisibility}`}> 
                  {characterData.results[0].series.items.map((serie, index)=> {
                    return (
                      <li key={index}>{serie.name}</li>
                    );})}
                </ul>
              </div>}

            {characterData.results[0].stories.items.length > 0 && 
              <div className="character-stories">
                <CategoryTitle categoryName="STORIES" 
                               categoryVisibility={storiesVisibility} 
                               changeCategoryVisibility={() => setStoriesVisibility((storiesVisibility === "hidden") ? "visible" : "hidden")}/>
                <ul className={`items-list ${storiesVisibility}`}> 
                  {characterData.results[0].stories.items.map((story, index)=> {
                    return (
                      <li key={index}>{story.name}</li>
                    );})}
                </ul>
              </div>}

            {characterData.results[0].events.items.length > 0 && 
              <div className="character-events">
                <CategoryTitle categoryName="EVENTS" 
                               categoryVisibility={eventsVisibility} 
                               changeCategoryVisibility={() => setEventsVisibility((eventsVisibility === "hidden") ? "visible" : "hidden")}/>
                <ul className={`items-list ${eventsVisibility}`}> 
                  {characterData.results[0].events.items.map((event, index)=> {
                    return (
                      <li key={index}>{event.name}</li>
                    );})}
                </ul>
              </div>}
        </div>}
    </>
  );
}

export default CharactersPage;