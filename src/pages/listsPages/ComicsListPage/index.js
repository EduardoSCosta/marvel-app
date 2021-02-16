import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import PageHeader from '../../../components/PageHeader';
import SearchField from '../../../components/SearchField';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

import './styles.css';

const ComicsListPage = () => {

  const [comicsResults, setComicsResults] = useState({});
  const [comicSearchField, setComicSearchField] = useState("");
  const [comicSearch, setComicSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);

  const apiCall = async (dataOffset) => {

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/comics",
      {params: {
        limit: 30,
        titleStartsWith: (comicSearch.length > 0) ? comicSearch : null,
        ts: timeStamp,
        offset: dataOffset,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setComicsResults(response.data.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setComicSearch(comicSearchField);
    setFirstRender(true);
}

  useEffect(() => {
    firstRender && apiCall(0);
  },[firstRender, comicSearch]);
  
  return(
    <>
      <PageHeader/>
      <SearchField pageName="COMICS" handleSubmit={handleSubmit} placeholderText="Comics name"
                  itemSearch={comicSearchField} setItemSearch={e => setComicSearchField(e.target.value)}/>
      <div className="results-grid">
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
    </>
  );
}

export default ComicsListPage;