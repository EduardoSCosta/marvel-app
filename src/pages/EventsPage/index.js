import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchField from '../../components/SearchField';
import api from '../../service/api';
import md5Hash from '../../utils/md5Hash';

import './styles.css';

const EventsPage = () => {
  const [eventsResults, setEventsResults] = useState({});
  const [eventSearch, setEventSearch] = useState("");

  const apiCall = async () => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/events",
      {params: {
        limit: 30,
        nameStartsWith: (eventSearch.length > 0) ? eventSearch : null,
        ts: timeStamp,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setEventsResults(response.data.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall();
}

  return(
    <>
      <PageHeader/>
      <SearchField pageName="EVENTS" handleSubmit={handleSubmit} 
                  itemSearch={eventSearch} setItemSearch={e => setEventSearch(e.target.value)}/>
      <div className="results-grid">
      {eventsResults.results !== undefined && eventsResults.results.map((events)=> {
        return (
          <div className="image-container" key={events.id}>
            <img className="event-img" src={`${events.thumbnail.path}/portrait_incredible.${events.thumbnail.extension}`} alt={events.name}/>
            <span className="event-name">{events.title}</span>
          </div>
        );
        })}
      </div>
    </>
  );
}

export default EventsPage;