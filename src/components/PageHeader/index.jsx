import './styles.css';
import {Link} from 'react-router-dom';
import marvelLogo from '../../assets/marvelLogo.svg';

const PageHeader = () => {

  return (
    <>
      <nav className="navbar">
        <Link to='/' className="home-page">
          <img className="home-img-btn" src={marvelLogo} alt="Marvel Logo"/>
        </Link>
        <ul className="link-list">
          <li className="link-wrapper"><Link to='/' className="page-link">CHARACTERS</Link></li>
          <li className="link-wrapper"><Link to='/' className="page-link">COMICS</Link></li>
          <li className="link-wrapper"><Link to='/' className="page-link">CREATORS</Link></li>
          <li className="link-wrapper"><Link to='/' className="page-link">EVENTS</Link></li>
          <li className="link-wrapper"><Link to='/' className="page-link">SERIES</Link></li>
          <li className="link-wrapper"><Link to='/' className="page-link">STORIES</Link></li>
        </ul>
      </nav>
    </>
  );
}
export default PageHeader;