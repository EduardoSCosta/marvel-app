import { useEffect, useState } from 'react';
import CategoryTitle from '../../../components/CategoryTitle';
import PageHeader from '../../../components/PageHeader';
import PageFooter from '../../../components/PageFooter';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

const EventPage = ({match}) => {

  const {params: {eventId}} = match;
  const [eventData, setEventData] = useState([]);


  const apiCall = async () => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get(`v1/public/events/${eventId}`,
      {params: {
        ts: timeStamp,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setEventData(response.data.data);
  }

  useEffect(() => {
    apiCall();
  },[]);
  
  return(
    <>
      <PageHeader/>
      {eventData.results !== undefined && 
        <div className="character-data">
          <h1 className="character-name">{eventData.results[0].title}</h1>
        </div>}
      <PageFooter/>
    </>
  );
}

export default EventPage;