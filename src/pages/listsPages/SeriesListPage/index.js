import { useState } from 'react';
import PageComp from '../../../components/PageComp';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

const SeriesListPage = () => {

  const [seriesResults, setSeriesResults] = useState({});
  const [serieSearchField, setSerieSearchField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hideResults, setHideResults] = useState("visible");

  const apiCall = async (dataOffset) => {
    setIsLoading(true);
    setHideResults("hidden");

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/series",
      {params: {
        limit: 30,
        titleStartsWith: (serieSearchField.length > 0) ? serieSearchField : null,
        ts: timeStamp,
        offset: dataOffset,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setSeriesResults(response.data.data);
    setIsLoading(false);
    setHideResults("visible");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall(0);
}
  
  return(
    <>
      <PageComp pageName="SERIES" handleSubmit={handleSubmit} placeholderText="Series name"
                itemSearch={serieSearchField} setItemSearch={e => setSerieSearchField(e.target.value)}
                isLoading={isLoading} hideResults={hideResults} itemResults={seriesResults}
                goToPage="serie" itemType="title"
                pageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>
    </>
  );
}

export default SeriesListPage;