import loadingSpinner from '../../assets/loading-spinner.png';

import './styles.css';


const Loading = () => {
  return (
    <div className="spinner-container">
      <img className="spinner" src={loadingSpinner} alt="Loading Spinner"/> 
    </div>
  );
}

export default Loading;