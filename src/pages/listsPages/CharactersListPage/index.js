import { useState } from 'react';
import PageComp from '../../../components/PageComp';
import api from '../../../service/api';
import md5Hash from '../../../utils/md5Hash';

const CharactersListPage = () => {

  const [charactersResults, setCharactersResults] = useState({});
  const [characterSearchField, setCharacterSearchField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hideResults, setHideResults] = useState("visible");

  const apiCall = async (dataOffset) => {
    setIsLoading(true);
    setHideResults("hidden");

    const timeStamp = Date.now().toString();
    const publicApiKey = process.env.REACT_APP_API_PUBLIC_KEY;

    const request = api.get("v1/public/characters",
      {params: {
        limit: 30,
        nameStartsWith: (characterSearchField.length > 0) ? characterSearchField : null,
        ts: timeStamp,
        offset: dataOffset,
        apikey: publicApiKey,
        hash: md5Hash(timeStamp, publicApiKey)
      }});
    const response = await request;
    setCharactersResults(response.data.data);
    setIsLoading(false);
    setHideResults("visible");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall(0);
}
  
  return(
    <>
      <PageComp pageName="CHARACTERS" handleSubmit={handleSubmit} placeholderText="Character name"
                itemSearch={characterSearchField} setItemSearch={e => setCharacterSearchField(e.target.value)}
                isLoading={isLoading} hideResults={hideResults} itemResults={charactersResults}
                goToPage="character" itemType="name"
                pageChange={({ selected: selectedPage }) => apiCall(selectedPage * 30)}/>
    </>
  );
}

export default CharactersListPage;