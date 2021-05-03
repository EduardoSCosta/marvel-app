import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

import './styles.css';

const PageFooter = () => {
  return (
    <footer>
      <span>2020 | Eduardo Souza</span>
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