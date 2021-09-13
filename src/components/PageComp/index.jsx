import {Link} from 'react-router-dom';
import Pagination from '../Pagination';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import SearchField from '../SearchField';
import Loading from '../Loading';

const PageComp = (
  {pageName, handleSubmit, placeholderText, itemSearch, setItemSearch, isLoading,
    hideResults, itemResults, goToPage, itemType, pageChange}) =>{
  return(
    <>
      <PageHeader/>
      <SearchField pageName={pageName} handleSubmit={handleSubmit} placeholderText={placeholderText}
                  itemSearch={itemSearch} setItemSearch={setItemSearch}/>
      {isLoading && <Loading/>}

      <div className={`results-grid ${hideResults}`}>      
        {itemResults.results !== undefined && itemResults.results.map((item)=> {
          return (
            <Link className="image-container" key={item.id} to={`/${goToPage}/${item.id}`}>
              <img className="item-img" src={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`} alt={itemType === "name" ? item.name : item.title}/>
              <div className="item-name-container">
                <span className="item-name">{item[itemType]}</span>
              </div>
            </Link>
          );
          })}
      </div>
        {itemResults.results !== undefined && <Pagination
                                                      pageCount={Math.ceil(itemResults.total / itemResults.limit)} 
                                                      onPageChange={pageChange}/>}
      <PageFooter/>
    </>
  )
}

export default PageComp;