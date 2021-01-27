import './styles.css';
import {Link} from 'react-router-dom';
import marvelLogo from '../../assets/marvelLogo.svg';
import { useState } from 'react';

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
        <div className={`menu-btn ${menuVisibility}`}  onClick={changeMenuVisibility}>
          <div className="menu-btn-icon"></div>
        </div>
      </nav>
      <nav className={`landscape-nav ${menuVisibility}`}>
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