import './styles.css';

const SearchField = ({pageName, handleSubmit, itemSearch, setItemSearch}) => {
  return(
    <div className="search-container">
      <h1 className="page-title">{pageName}</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-input" type="text" value={itemSearch} onChange={setItemSearch}/>
        <button className="search-btn" type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchField;