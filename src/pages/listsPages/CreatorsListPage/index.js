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

const CreatorsListPage = () => {

  const [creatorsResults, setCreatorsResults] = useState({});
  const [creatorSearchField, setCreatorSearchField] = useState("");
  const [creatorSearch, setCreatorSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);
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
        nameStartsWith: (creatorSearch.length > 0) ? creatorSearch : null,
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
    setCreatorSearch(creatorSearchField);
    setFirstRender(true);
}

  useEffect(() => {
    firstRender && apiCall(0);
  },[firstRender, creatorSearch]);
  
  return(
    <>
      <PageHeader/>
      <SearchField pageName="CREATORS" handleSubmit={handleSubmit} placeholderText="Creator name"
                  itemSearch={creatorSearchField} setItemSearch={e => setCreatorSearchField(e.target.value)}/>
      {isLoading && <Loading/>}

      <div className={`results-grid ${hideResults}`}>
      {creatorsResults.results !== undefined && creatorsResults.results.map((creator)=> {
        return (
          <div className="image-container" key={creator.id}>
            <img className="item-img" src={`${creator.thumbnail.path}/portrait_incredible.${creator.thumbnail.extension}`} alt={creator.name}/>
            <div className="item-name-container">
              <span className="item-name">{creator.fullName}</span>
            </div>
          </div>
        );
        })}
      </div>
        {creatorsResults.results !== undefined && <Pagination
                                                      pageCount={Math.ceil(creatorsResults.total / creatorsResults.limit)} 
                                                      onPageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>}
      <PageFooter/>
    </>
  );
}

export default CreatorsListPage;