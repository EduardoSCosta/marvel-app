import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import PageHeader from '../../../components/PageHeader';
import SearchField from '../../../components/SearchField';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

import './styles.css';
import PageFooter from '../../../components/PageFooter';

const EventsListPage = () => {

  const [eventsResults, setEventsResults] = useState({});
  const [eventSearchField, setEventSearchField] = useState("");
  const [eventSearch, setEventSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hideResults, setHideResults] = useState("visible");

  const apiCall = async (dataOffset) => {
    setIsLoading(true);
    setHideResults("hidden");

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
    setIsLoading(false);
    setHideResults("visible");
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
      {isLoading && <Loading/>}
      
      <div className={`results-grid ${hideResults}`}>
      {eventsResults.results !== undefined && eventsResults.results.map((event)=> {
        return (
          <div className="image-container" key={event.id}>
            <img className="item-img" src={`${event.thumbnail.path}/portrait_incredible.${event.thumbnail.extension}`} alt={event.name}/>
            <div className="item-name-container">
              <span className="item-name">{event.title}</span>
            </div>
          </div>
        );
        })}
      </div>
        {eventsResults.results !== undefined && <Pagination
                                                      pageCount={Math.ceil(eventsResults.total / eventsResults.limit)} 
                                                      onPageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>}
      <PageFooter/>
    </>
  );
}

export default EventsListPage;