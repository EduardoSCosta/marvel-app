import { useState } from 'react';
import Pagination from '../../../components/Pagination';
import PageHeader from '../../../components/PageHeader';
import PageFooter from '../../../components/PageFooter';
import SearchField from '../../../components/SearchField';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

import './styles.css';

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
      <PageHeader/>
      <SearchField pageName="COMICS" handleSubmit={handleSubmit} placeholderText="Comics name"
                  itemSearch={comicSearchField} setItemSearch={e => setComicSearchField(e.target.value)}/>
      {isLoading && <Loading/>}

      <div className={`results-grid ${hideResults}`}>
      {comicsResults.results !== undefined && comicsResults.results.map((comic)=> {
        return (
          <div className="image-container" key={comic.id}>
            <img className="item-img" src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} alt={comic.name}/>
            <div className="item-name-container">
              <span className="item-name">{comic.title}</span>
            </div>
          </div>
        );
        })}
      </div>
        {comicsResults.results !== undefined && <Pagination
                                                      pageCount={Math.ceil(comicsResults.total / comicsResults.limit)} 
                                                      onPageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>}
      <PageFooter/>
    </>
  );
}

export default ComicsListPage;