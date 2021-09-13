import { useState } from 'react';
import PageComp from '../../../components/PageComp';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

const EventsListPage = () => {

  const [eventsResults, setEventsResults] = useState({});
  const [eventSearchField, setEventSearchField] = useState("");
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
        nameStartsWith: (eventSearchField.length > 0) ? eventSearchField : null,
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
    apiCall(0);
}
  
  return(
    <>
      <PageComp pageName="EVENTS" handleSubmit={handleSubmit} placeholderText="Event name"
                itemSearch={eventSearchField} setItemSearch={e => setEventSearchField(e.target.value)}
                isLoading={isLoading} hideResults={hideResults} itemResults={eventsResults}
                goToPage="event" itemType="title"
                pageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>
    </>
  );
}

export default EventsListPage;