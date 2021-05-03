import PageHeader from '../../components/PageHeader';
import {Link} from 'react-router-dom';

import charactersBackground from '../../assets/pagesLinksBackgrounds/characters-background.jpg';
import comicsBackground from '../../assets/pagesLinksBackgrounds/comics-background.jpg';
import creatorsBackground from '../../assets/pagesLinksBackgrounds/creators-background.jpg';
import eventsBackground from '../../assets/pagesLinksBackgrounds/events-background.jpg';
import seriesBackground from '../../assets/pagesLinksBackgrounds/series-background.jpg';

import './styles.css';
import PageFooter from '../../components/PageFooter';

const LandingPage = () => {

  return(
    <>
      <PageHeader/>
      <div className="pages-wrapper">        
        <div className="page-landing-link-container">
          <Link to='/Characters' className="page-landing-link">
            <img className="page-link-background" src={charactersBackground} alt="Characters page background"/>
            <span className="page-link-text">CHARACTERS</span>
          </Link>
        </div>
        <div className="page-landing-link-container">
          <Link to='/Comics' className="page-landing-link">
            <img className="page-link-background" src={comicsBackground} alt="Comics page background"/>
            <span className="page-link-text">COMICS</span>
          </Link>
        </div>
        <div className="page-landing-link-container">
          <Link to='/Creators' className="page-landing-link">
            <img className="page-link-background" src={creatorsBackground} alt="Creators page background"/>
            <span className="page-link-text">CREATORS</span>
          </Link>
        </div>
        <div className="page-landing-link-container">
          <Link to='/Events' className="page-landing-link">
            <img className="page-link-background" src={eventsBackground} alt="Events page background"/>
            <span className="page-link-text">EVENTS</span>
          </Link>
        </div>
        <div className="page-landing-link-container">
          <Link to='/Series' className="page-landing-link">
            <img className="page-link-background" src={seriesBackground} alt="Series page background"/>
            <span className="page-link-text">SERIES</span>
          </Link>
        </div>
      </div>
      <PageFooter/>
    </>
  );

}

export default LandingPage;