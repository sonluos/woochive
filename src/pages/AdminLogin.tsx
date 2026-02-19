import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { setGitHubToken, hasGitHubToken } from '../utils/githubStorage';
import './AdminLogin.css';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [githubToken, setGithubTokenInput] = useState('');
  const [error, setError] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(!hasGitHubToken());
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // GitHub 토큰 저장
    if (githubToken) {
      setGitHubToken(githubToken);
    }
    
    // 토큰이 없으면 경고
    if (!hasGitHubToken() && !githubToken) {
      setError('GitHub 토큰이 필요합니다. 데이터 수정이 불가능합니다.');
      return;
    }
    
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
          
          {showTokenInput && (
            <div className="form-group">
              <label htmlFor="github-token">
                GitHub Personal Access Token
                <span className="label-badge">필수</span>
              </label>
              <input
                type="password"
                id="github-token"
                value={githubToken}
                onChange={(e) => setGithubTokenInput(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                required={!hasGitHubToken()}
              />
              <p className="input-help">
                데이터 수정을 위해 필요합니다. 
                <a 
                  href="https://github.com/settings/tokens/new?scopes=repo&description=Woochive%20Admin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="help-link"
                >
                  토큰 생성하기 →
                </a>
              </p>
            </div>
          )}
          
          {!showTokenInput && hasGitHubToken() && (
            <div className="token-status">
              ✅ GitHub 토큰이 설정되어 있습니다.
              <button 
                type="button" 
                onClick={() => setShowTokenInput(true)}
                className="btn-link"
              >
                변경
              </button>
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        
        <div className="admin-login-note">
          <p>💡 기본 비밀번호: woochive2024 (변경 권장)</p>
          <p>🔑 GitHub 토큰 권한: <code>repo</code> (전체 저장소 접근)</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
