import { useEffect, useState } from 'react';
import CategoryTitle from '../../../components/CategoryTitle';
import PageHeader from '../../../components/PageHeader';
import PageFooter from '../../../components/PageFooter';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

const SeriePage = ({match}) => {

  const {params: {serieId}} = match;
  const [serieData, setSerieData] = useState([]);


  const apiCall = async () => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get(`v1/public/series/${serieId}`,
      {params: {
        ts: timeStamp,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setSerieData(response.data.data);
  }

  useEffect(() => {
    apiCall();
  },[]);
  
  return(
    <>
      <PageHeader/>
      {serieData.results !== undefined && 
        <div className="character-data">
          <h1 className="character-name">{serieData.results[0].title}</h1>
        </div>}
      <PageFooter/>
    </>
  );
}

export default SeriePage;