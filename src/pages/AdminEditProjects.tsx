import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResearchProject } from '../types/portfolio';
import './AdminEdit.css';

function AdminEditProjects() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [editingProject, setEditingProject] = useState<ResearchProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      // localStorage에서 먼저 확인
      const cached = localStorage.getItem('projects_data');
      if (cached) {
        setProjects(JSON.parse(cached));
        return;
      }

      // localStorage에 없으면 JSON 파일에서 로드
      const response = await fetch('/data/projects.json');
      const data = await response.json();
      setProjects(data);
      localStorage.setItem('projects_data', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const handleCreate = () => {
    const newProject: ResearchProject = {
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      fullDescription: '',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      images: [],
      technologies: []
    };
    setEditingProject(newProject);
    setIsCreating(true);
  };

  const handleEdit = (project: ResearchProject) => {
    setEditingProject({ ...project });
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      // localStorage에 저장하여 즉시 반영
      localStorage.setItem('projects_data', JSON.stringify(updated));
      alert('삭제되었습니다! 변경사항이 즉시 반영됩니다.');
    }
  };

  const handleSave = () => {
    if (!editingProject) return;

    let updated: ResearchProject[];
    if (isCreating) {
      updated = [...projects, editingProject];
    } else {
      updated = projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      );
    }

    setProjects(updated);
    // localStorage에 저장하여 즉시 반영
    localStorage.setItem('projects_data', JSON.stringify(updated));
    setEditingProject(null);
    setIsCreating(false);
    alert('저장되었습니다! 변경사항이 즉시 반영됩니다.');
  };

  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateField = (field: keyof ResearchProject, value: any) => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, [field]: value });
  };

  const updateArrayField = (field: 'tags' | 'technologies' | 'images', value: string) => {
    if (!editingProject) return;
    const items = value.split(',').map(s => s.trim()).filter(s => s);
    setEditingProject({ ...editingProject, [field]: items });
  };

  return (
    <div className="admin-edit">
      <div className="admin-edit-header">
        <button onClick={() => navigate('/admin')} className="back-button">
          ← 대시보드로
        </button>
        <h1>프로젝트 관리</h1>
        <button onClick={handleCreate} className="create-button">
          + 새 프로젝트
        </button>
      </div>

      <div className="admin-edit-content">
        <div className="items-list">
          <h2>프로젝트 목록 ({projects.length})</h2>
          {projects.map(project => (
            <div key={project.id} className="item-card">
              <div className="item-info">
                <h3>{project.title || '(제목 없음)'}</h3>
                <p>{project.description}</p>
                <div className="item-meta">
                  <span>{project.date}</span>
                  <span>{project.tags.join(', ')}</span>
                </div>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(project)} className="btn-edit">
                  편집
                </button>
                <button onClick={() => handleDelete(project.id)} className="btn-delete">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingProject && (
          <div className="edit-form">
            <h2>{isCreating ? '새 프로젝트 만들기' : '프로젝트 편집'}</h2>
            
            <div className="form-group">
              <label>제목 *</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="프로젝트 제목"
              />
            </div>

            <div className="form-group">
              <label>짧은 설명 *</label>
              <textarea
                value={editingProject.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="카드에 표시될 짧은 설명"
                rows={2}
              />
            </div>

            <div className="form-group">
              <label>상세 설명 *</label>
              <textarea
                value={editingProject.fullDescription}
                onChange={(e) => updateField('fullDescription', e.target.value)}
                placeholder="상세 페이지에 표시될 전체 설명"
                rows={5}
              />
            </div>

            <div className="form-group">
              <label>날짜 *</label>
              <input
                type="date"
                value={editingProject.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>태그 (쉼표로 구분)</label>
              <input
                type="text"
                value={editingProject.tags.join(', ')}
                onChange={(e) => updateArrayField('tags', e.target.value)}
                placeholder="AI, Machine Learning, Python"
              />
            </div>

            <div className="form-group">
              <label>기술 스택 (쉼표로 구분)</label>
              <input
                type="text"
                value={editingProject.technologies.join(', ')}
                onChange={(e) => updateArrayField('technologies', e.target.value)}
                placeholder="Python, TensorFlow, React"
              />
            </div>

            <div className="form-group">
              <label>이미지 URL (쉼표로 구분)</label>
              <input
                type="text"
                value={editingProject.images.join(', ')}
                onChange={(e) => updateArrayField('images', e.target.value)}
                placeholder="/images/project1.jpg, /images/project2.jpg"
              />
            </div>

            <div className="form-group">
              <label>썸네일 URL</label>
              <input
                type="text"
                value={editingProject.thumbnail || ''}
                onChange={(e) => updateField('thumbnail', e.target.value)}
                placeholder="/images/thumbnail.jpg"
              />
            </div>

            <div className="form-actions">
              <button onClick={handleSave} className="btn-save">
                저장
              </button>
              <button onClick={() => setEditingProject(null)} className="btn-cancel">
                취소
              </button>
              <button 
                onClick={() => downloadJSON(projects, 'projects.json')} 
                className="btn-download"
                type="button"
              >
                JSON 다운로드 (백업용)
              </button>
            </div>

            <p className="form-note">
              💡 저장하면 변경사항이 즉시 사이트에 반영됩니다. 
              JSON 다운로드는 백업용으로 사용하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEditProjects;
