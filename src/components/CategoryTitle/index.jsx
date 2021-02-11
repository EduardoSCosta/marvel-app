import { FaChevronUp } from "react-icons/fa";
import './styles.css';

const CategoryTitle = ({categoryName, categoryVisibility, changeCategoryVisibility}) => {
  return (
    <h4 className="categ-title" onClick={changeCategoryVisibility}>{categoryName} <FaChevronUp size={14} className={`chevron-icon ${categoryVisibility}`}/></h4>
  );
}

export default CategoryTitle;