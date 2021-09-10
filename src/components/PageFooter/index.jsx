import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

import './styles.css';

const PageFooter = () => {
  const getYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    return year;
  }

  return (
    <footer>
      <span>{getYear()} | Eduardo Souza</span>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/eduardo-souza-costa-araujo/" 
          rel="noreferrer noopener"
          target="_blank">
          <FaLinkedin size={30}/>
        </a>
        <a href="https://github.com/EduardoSCosta" 
          rel="noreferrer noopener"
          target="_blank">
          <FaGithubSquare size={30}/>
        </a>
      </div>
    </footer>
  );
}

export default PageFooter;