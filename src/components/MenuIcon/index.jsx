import './styles.css';

const MenuIcon = ({menuVisibility, changeMenuVisibility}) => {
  return (
    <div className={`menu-btn ${menuVisibility}`}  onClick={changeMenuVisibility}>
    <div className="menu-btn-icon"></div>
  </div>
  );
}

export default MenuIcon;