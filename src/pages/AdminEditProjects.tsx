import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResearchProject } from '../types/portfolio';
import { saveProjectsToGitHub, isGitHubConfigured } from '../utils/githubApi';
import './AdminEdit.css';

function AdminEditProjects() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [editingProject, setEditingProject] = useState<ResearchProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      // GitHub raw URL에서 데이터 로드 (캐시 무효화)
      const owner = 'sonluos';
      const repo = 'woochive';
      const branch = 'main';
      const cacheBuster = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public/data/projects.json?cb=${cacheBuster}`;
      
      const response = await fetch(url, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`);
      }
      const data = await response.json();
      console.log('Loaded projects from GitHub:', data);
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
      alert('프로젝트 데이터를 불러오는데 실패했습니다.');
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

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    setIsSaving(true);
    try {
      const updated = projects.filter(p => p.id !== id);
      
      // 즉시 UI 업데이트
      setProjects(updated);
      
      // GitHub에 저장
      const success = await saveProjectsToGitHub(updated);
      
      if (success) {
        alert('삭제되었습니다! 변경사항이 GitHub에 저장되었습니다.');
      } else {
        // 실패시 원래 상태로 복구
        setProjects(projects);
        alert('GitHub 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      // 실패시 원래 상태로 복구
      setProjects(projects);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;

    // 필수 필드 검증
    if (!editingProject.title || !editingProject.description) {
      alert('제목과 설명은 필수 항목입니다.');
      return;
    }

    setIsSaving(true);
    try {
      let updated: ResearchProject[];
      if (isCreating) {
        updated = [...projects, editingProject];
      } else {
        updated = projects.map(p => 
          p.id === editingProject.id ? editingProject : p
        );
      }

      console.log('Saving projects to GitHub:', updated);

      // GitHub에 저장
      const success = await saveProjectsToGitHub(updated);
      
      if (success) {
        // 저장 성공 후 UI 업데이트
        setProjects(updated);
        setEditingProject(null);
        setIsCreating(false);
        alert('저장되었습니다! 변경사항이 GitHub에 저장되었습니다.');
      } else {
        alert('GitHub 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('저장 중 오류가 발생했습니다. 브라우저 콘솔을 확인해주세요.');
    } finally {
      setIsSaving(false);
    }
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
              <button 
                onClick={handleSave} 
                className="btn-save"
                disabled={isSaving}
              >
                {isSaving ? '저장 중...' : '저장'}
              </button>
              <button 
                onClick={() => setEditingProject(null)} 
                className="btn-cancel"
                disabled={isSaving}
              >
                취소
              </button>
              <button 
                onClick={() => downloadJSON(projects, 'projects.json')} 
                className="btn-download"
                type="button"
                disabled={isSaving}
              >
                JSON 다운로드 (백업용)
              </button>
            </div>

            <div className="form-note-container">
              {!isGitHubConfigured() && (
                <p className="form-warning">
                  ⚠️ GitHub 연동이 설정되지 않았습니다. 변경사항이 저장되지 않습니다.
                </p>
              )}
              <p className="form-note">
                💡 저장하면 GitHub에 즉시 커밋되고, 사이트에 바로 반영됩니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEditProjects;
