import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminDashboard.css';

type Section = 'about' | 'projects' | 'music' | 'publications';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('projects');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleResetData = () => {
    if (confirm('모든 변경사항을 초기화하고 원본 데이터로 되돌리시겠습니까?')) {
      localStorage.removeItem('portfolio_projects');
      localStorage.removeItem('portfolio_music');
      localStorage.removeItem('portfolio_publications');
      localStorage.removeItem('portfolio_bio');
      localStorage.removeItem('portfolio_courses');
      alert('데이터가 초기화되었습니다. 페이지를 새로고침하세요.');
      window.location.reload();
    }
  };

  const sections = [
    { id: 'about' as Section, name: 'About', icon: '👤' },
    { id: 'projects' as Section, name: 'Projects', icon: '💻' },
    { id: 'music' as Section, name: 'Music', icon: '🎵' },
    { id: 'publications' as Section, name: 'Publications', icon: '📚' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>관리자 대시보드</h1>
        <div className="header-actions">
          <button onClick={handleResetData} className="reset-button">
            데이터 초기화
          </button>
          <button onClick={handleLogout} className="logout-button">
            로그아웃
          </button>
        </div>
      </div>

      <div className="admin-content">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`admin-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-text">{section.name}</span>
              </button>
            ))}
          </nav>
          
          <div className="storage-info">
            <p className="info-text">
              💾 변경사항은 브라우저에 저장됩니다
            </p>
            <p className="info-subtext">
              다른 브라우저나 기기에서는 원본 데이터가 표시됩니다
            </p>
          </div>
        </aside>

        <main className="admin-main">
          {activeSection === 'about' && (
            <div className="admin-section">
              <h2>About 섹션 편집</h2>
              <p className="section-description">
                자기소개와 수강 과목을 관리합니다.
              </p>
              <button 
                onClick={() => navigate('/admin/edit/about')}
                className="edit-button"
              >
                편집하기
              </button>
            </div>
          )}

          {activeSection === 'projects' && (
            <div className="admin-section">
              <h2>Projects 관리</h2>
              <p className="section-description">
                연구 프로젝트를 추가, 수정, 삭제할 수 있습니다.
              </p>
              <button 
                onClick={() => navigate('/admin/edit/projects')}
                className="edit-button"
              >
                프로젝트 관리
              </button>
            </div>
          )}

          {activeSection === 'music' && (
            <div className="admin-section">
              <h2>Music 관리</h2>
              <p className="section-description">
                음악 작품을 추가, 수정, 삭제할 수 있습니다.
              </p>
              <button 
                onClick={() => navigate('/admin/edit/music')}
                className="edit-button"
              >
                음악 관리
              </button>
            </div>
          )}

          {activeSection === 'publications' && (
            <div className="admin-section">
              <h2>Publications 관리</h2>
              <p className="section-description">
                출판물을 추가, 수정, 삭제할 수 있습니다.
              </p>
              <button 
                onClick={() => navigate('/admin/edit/publications')}
                className="edit-button"
              >
                출판물 관리
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
