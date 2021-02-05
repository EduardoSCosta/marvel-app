import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import PageHeader from '../../components/PageHeader';
import SearchField from '../../components/SearchField';
import api from '../../service/api';
import md5Hash from '../../utils/md5Hash';

import './styles.css';

const EventsPage = () => {

  const [eventsResults, setEventsResults] = useState({});
  const [eventSearchField, setEventSearchField] = useState("");
  const [eventSearch, setEventSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);

  const apiCall = async (dataOffset) => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/events",
      {params: {
        limit: 30,
        nameStartsWith: (eventSearch.length > 0) ? eventSearch : null,
        ts: timeStamp,
        offset: dataOffset,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setEventsResults(response.data.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setEventSearch(eventSearchField);
    setFirstRender(true);
}

  useEffect(() => {
    firstRender && apiCall(0);
  },[firstRender, eventSearch]);
  
  return(
    <>
      <PageHeader/>
      <SearchField pageName="EVENTS" handleSubmit={handleSubmit} placeholderText="Event name"
                  itemSearch={eventSearchField} setItemSearch={e => setEventSearchField(e.target.value)}/>
      <div className="results-grid">
      {eventsResults.results !== undefined && eventsResults.results.map((event)=> {
        return (
          <div className="image-container" key={event.id}>
            <img className="item-img" src={`${event.thumbnail.path}/portrait_incredible.${event.thumbnail.extension}`} alt={event.name}/>
            <span className="item-name">{event.title}</span>
          </div>
        );
        })}
      </div>
        {eventsResults.results !== undefined && <Pagination
                                                      pageCount={Math.ceil(eventsResults.total / eventsResults.limit)} 
                                                      onPageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>}
    </>
  );
}

export default EventsPage;