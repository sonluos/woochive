import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLogin.css';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1>관리자 로그인</h1>
        <p className="admin-login-subtitle">
          포트폴리오 콘텐츠를 관리하려면 로그인하세요.
        </p>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호를 입력하세요"
              autoFocus
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        
        <p className="admin-login-note">
          💡 기본 비밀번호: woochive2024 (변경 권장)
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
