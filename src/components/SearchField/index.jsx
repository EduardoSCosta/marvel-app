import { FaSearch } from "react-icons/fa";
import './styles.css';

const SearchField = ({pageName, handleSubmit, itemSearch, setItemSearch, placeholderText}) => {
  return(
    <div className="search-container">
      <h1 className="page-title">{pageName}</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-input" type="text" value={itemSearch} placeholder={placeholderText} onChange={setItemSearch}/>
        <button className="search-btn" type="submit"> <FaSearch size={16} color="#ffffff" /></button>
      </form>
    </div>
  );
}

export default SearchField;