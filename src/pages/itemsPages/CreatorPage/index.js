import { useEffect, useState } from 'react';
import CategoryTitle from '../../../components/CategoryTitle';
import PageHeader from '../../../components/PageHeader';
import PageFooter from '../../../components/PageFooter';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

const CreatorPage = ({match}) => {

  const {params: {creatorId}} = match;
  const [creatorData, setCreatorData] = useState([]);


  const apiCall = async () => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get(`v1/public/creators/${creatorId}`,
      {params: {
        ts: timeStamp,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setCreatorData(response.data.data);
  }

  useEffect(() => {
    apiCall();
  },[]);
  
  return(
    <>
      <PageHeader/>
      {creatorData.results !== undefined && 
        <div className="character-data">
          <h1 className="character-name">{creatorData.results[0].fullName}</h1>
        </div>}
      <PageFooter/>
    </>
  );
}

export default CreatorPage;