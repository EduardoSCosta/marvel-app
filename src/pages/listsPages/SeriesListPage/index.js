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

const SeriesListPage = () => {

  const [seriesResults, setSeriesResults] = useState({});
  const [serieSearchField, setSerieSearchField] = useState("");
  const [serieSearch, setSerieSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);
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
        titleStartsWith: (serieSearch.length > 0) ? serieSearch : null,
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
    setSerieSearch(serieSearchField);
    setFirstRender(true);
}

  useEffect(() => {
    firstRender && apiCall(0);
  },[firstRender, serieSearch]);
  
  return(
    <>
      <PageHeader/>
      <SearchField pageName="SERIES" handleSubmit={handleSubmit} placeholderText="Serie name"
                  itemSearch={serieSearchField} setItemSearch={e => setSerieSearchField(e.target.value)}/>
      {isLoading && <Loading/>}
      
      <div className={`results-grid ${hideResults}`}>
      {seriesResults.results !== undefined && seriesResults.results.map((serie)=> {
        return (
          <div className="image-container" key={serie.id}>
            <img className="item-img" src={`${serie.thumbnail.path}/portrait_incredible.${serie.thumbnail.extension}`} alt={serie.name}/>
            <div className="item-name-container">
              <span className="item-name">{serie.title}</span>
            </div>
          </div>
        );
        })}
      </div>
        {seriesResults.results !== undefined && <Pagination
                                                      pageCount={Math.ceil(seriesResults.total / seriesResults.limit)} 
                                                      onPageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>}
      <PageFooter/>
    </>
  );
}

export default SeriesListPage;