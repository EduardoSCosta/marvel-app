import { useState } from 'react';
import PageComp from '../../../components/PageComp';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

const CreatorsListPage = () => {

  const [creatorsResults, setCreatorsResults] = useState({});
  const [creatorSearchField, setCreatorSearchField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hideResults, setHideResults] = useState("visible");

  const apiCall = async (dataOffset) => {
    setIsLoading(true);
    setHideResults("hidden");
    
    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/creators",
      {params: {
        limit: 30,
        nameStartsWith: (creatorSearchField.length > 0) ? creatorSearchField : null,
        ts: timeStamp,
        offset: dataOffset,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setCreatorsResults(response.data.data);
    setIsLoading(false);
    setHideResults("visible");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall(0);
}
  
  return(
    <>
      <PageComp pageName="CREATORS" handleSubmit={handleSubmit} placeholderText="Creator name"
                itemSearch={creatorSearchField} setItemSearch={e => setCreatorSearchField(e.target.value)}
                isLoading={isLoading} hideResults={hideResults} itemResults={creatorsResults}
                goToPage="creator" itemType="fullName"
                pageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>
    </>
  );
}

export default CreatorsListPage;