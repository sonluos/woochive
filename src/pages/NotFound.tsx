import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">페이지를 찾을 수 없습니다</h2>
        <p className="not-found-message">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            홈으로 돌아가기
          </Link>
          <Link to="/projects" className="btn-secondary">
            프로젝트 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
