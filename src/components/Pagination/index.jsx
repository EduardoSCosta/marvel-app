import ReactPaginate from 'react-paginate';

import './styles.css';

const Pagination = ({pageCount, onPageChange}) => {
  return(
    <ReactPaginate
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-item-link"}
      activeLinkClassName={"active-page-link"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-item-link"}
      previousLinkClassName={"page-item-link"}
      nextLinkClassName={"page-item-link"}
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={pageCount} 
      pageRangeDisplayed={10} 
      marginPagesDisplayed={3}
      onPageChange={onPageChange}/>
  );
}

export default Pagination;