import MD5 from 'crypto-js/md5';

const md5Hash = (timeStamp, publicApiKey) => {
  const privateApiKey = process.env.REACT_APP_API_PRIVATE_KEY;

  return(MD5(timeStamp + privateApiKey + publicApiKey).toString());
}

export default md5Hash;