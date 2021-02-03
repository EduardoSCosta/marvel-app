import './styles.css';
import {Link} from 'react-router-dom';
import marvelLogo from '../../assets/marvel-logo.svg';
import { useState } from 'react';
import MenuIcon from '../MenuIcon';

const PageHeader = () => {
  const [menuVisibility, setMenuVisibility] = useState("hidden");

  const changeMenuVisibility = () => {
    const menu = (menuVisibility === "hidden") ? "visible" : "hidden";

    setMenuVisibility(menu);
  }

  return (
    <>
      <nav className="portrait-nav">
        <Link to='/' className="home-page">
          <img className="home-img-btn" src={marvelLogo} alt="Marvel Logo"/>
        </Link>
        <MenuIcon menuVisibility={menuVisibility} changeMenuVisibility={changeMenuVisibility}/>
      </nav>
      <nav className={`landscape-nav ${menuVisibility}`}>
        <Link to='/' className="home-page">
          <img className="home-img-btn" src={marvelLogo} alt="Marvel Logo"/>
        </Link>
        <ul className="link-list">
          <li className="link-wrapper"><Link to='/Characters' className="page-link">CHARACTERS</Link></li>
          <li className="link-wrapper"><Link to='/Comics' className="page-link">COMICS</Link></li>
          <li className="link-wrapper"><Link to='/Creators' className="page-link">CREATORS</Link></li>
          <li className="link-wrapper"><Link to='/Events' className="page-link">EVENTS</Link></li>
          <li className="link-wrapper"><Link to='/Series' className="page-link">SERIES</Link></li>
          <li className="link-wrapper"><Link to='/Stories' className="page-link">STORIES</Link></li>
        </ul>
      </nav>
    </>
  );
}
export default PageHeader;