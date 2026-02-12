import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Woochive</h3>
          <p>AI 연구자 & 음악가</p>
        </div>

        <div className="footer-section">
          <h4>링크</h4>
          <ul className="footer-links">
            <li><a href="/">홈</a></li>
            <li><a href="/about">소개</a></li>
            <li><a href="/projects">프로젝트</a></li>
            <li><a href="/music">음악</a></li>
            <li><a href="/publications">출판물</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>소셜</h4>
          <ul className="footer-links">
            <li>
              <a 
                href="https://github.com/woochive" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>연락</h4>
          <p>
            <a href="mailto:contact@woochive.me">contact@woochive.me</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Woochive. All rights reserved.</p>
        <p className="footer-tech">
          Built with React, TypeScript, and Vite
        </p>
      </div>
    </footer>
  );
}

export default Footer;
