import { useState } from 'react';
import PageComp from '../../../components/PageComp';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

const ComicsListPage = () => {

  const [comicsResults, setComicsResults] = useState({});
  const [comicSearchField, setComicSearchField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hideResults, setHideResults] = useState("visible");

  const apiCall = async (dataOffset) => {
    setIsLoading(true);
    setHideResults("hidden");
    
    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/comics",
      {params: {
        limit: 30,
        titleStartsWith: (comicSearchField.length > 0) ? comicSearchField : null,
        ts: timeStamp,
        offset: dataOffset,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setComicsResults(response.data.data);
    setIsLoading(false);
    setHideResults("visible");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall(0);
}
  
  return(
    <>
      <PageComp pageName="COMICS" handleSubmit={handleSubmit} placeholderText="Comic name"
                itemSearch={comicSearchField} setItemSearch={e => setComicSearchField(e.target.value)}
                isLoading={isLoading} hideResults={hideResults} itemResults={comicsResults}
                goToPage="comic" itemType="title"
                pageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>
    </>
  );
}

export default ComicsListPage;