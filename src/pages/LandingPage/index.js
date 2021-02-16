import PageHeader from '../../components/PageHeader';
import {Link} from 'react-router-dom';

import './styles.css';

const LandingPage = () => {

  return(
    <>
      <PageHeader/>
      <div className="pages-wrapper">        
        <div className="page-landing-link-container"><Link to='/Characters' className="page-landing-link">CHARACTERS</Link></div>
        <div className="page-landing-link-container"><Link to='/Comics' className="page-landing-link">COMICS</Link></div>
        <div className="page-landing-link-container"><Link to='/Creators' className="page-landing-link">CREATORS</Link></div>
        <div className="page-landing-link-container"><Link to='/Events' className="page-landing-link">EVENTS</Link></div>
        <div className="page-landing-link-container"><Link to='/Series' className="page-landing-link">SERIES</Link></div>
      </div>
    </>
  );

}

export default LandingPage;