import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicWork } from '../types/portfolio';
import { saveMusicToGitHub, isGitHubConfigured } from '../utils/githubApi';
import './AdminEdit.css';

function AdminEditMusic() {
  const [musicWorks, setMusicWorks] = useState<MusicWork[]>([]);
  const [editingWork, setEditingWork] = useState<MusicWork | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadMusic();
  }, []);

  const loadMusic = async () => {
    try {
      // GitHub API를 통해 직접 최신 데이터 로드 (캐시 없음)
      const owner = 'sonluos';
      const repo = 'woochive';
      const branch = 'main';
      const path = 'public/data/music.json';
      
      // GitHub API 사용 (raw URL 대신)
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`);
      }
      const data = await response.json();
      console.log('Loaded music from GitHub:', data);
      setMusicWorks(data);
    } catch (error) {
      console.error('Failed to load music:', error);
      alert('음악 데이터를 불러오는데 실패했습니다.');
    }
  };

  const handleCreate = () => {
    const newWork: MusicWork = {
      id: `music-${Date.now()}`,
      title: '',
      description: '',
      fullDescription: '',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      instruments: []
    };
    setEditingWork(newWork);
    setIsCreating(true);
  };

  const handleEdit = (work: MusicWork) => {
    setEditingWork({ ...work });
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    setIsSaving(true);
    try {
      const updated = musicWorks.filter(w => w.id !== id);
      
      // 즉시 UI 업데이트
      setMusicWorks(updated);
      
      // GitHub에 저장
      const success = await saveMusicToGitHub(updated);
      
      if (success) {
        alert('삭제되었습니다! 변경사항이 GitHub에 저장되었습니다.');
      } else {
        // 실패시 원래 상태로 복구
        setMusicWorks(musicWorks);
        alert('GitHub 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      // 실패시 원래 상태로 복구
      setMusicWorks(musicWorks);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!editingWork) return;

    // 필수 필드 검증
    if (!editingWork.title || !editingWork.description) {
      alert('제목과 설명은 필수 항목입니다.');
      return;
    }

    setIsSaving(true);
    try {
      let updated: MusicWork[];
      if (isCreating) {
        updated = [...musicWorks, editingWork];
      } else {
        updated = musicWorks.map(w => 
          w.id === editingWork.id ? editingWork : w
        );
      }

      // 즉시 UI 업데이트
      setMusicWorks(updated);
      setEditingWork(null);
      setIsCreating(false);

      // GitHub에 저장
      const success = await saveMusicToGitHub(updated);
      
      if (success) {
        alert('저장되었습니다! 변경사항이 GitHub에 저장되었습니다.');
      } else {
        alert('GitHub 저장에 실패했습니다. 페이지를 새로고침해주세요.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('저장 중 오류가 발생했습니다. 페이지를 새로고침해주세요.');
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

  const updateField = (field: keyof MusicWork, value: any) => {
    if (!editingWork) return;
    setEditingWork({ ...editingWork, [field]: value });
  };

  const updateArrayField = (field: 'tags' | 'instruments', value: string) => {
    if (!editingWork) return;
    const items = value.split(',').map(s => s.trim()).filter(s => s);
    setEditingWork({ ...editingWork, [field]: items });
  };

  return (
    <div className="admin-edit">
      <div className="admin-edit-header">
        <button onClick={() => navigate('/admin')} className="back-button">
          ← 대시보드로
        </button>
        <h1>음악 관리</h1>
        <button onClick={handleCreate} className="create-button">
          + 새 음악
        </button>
      </div>

      <div className="admin-edit-content">
        <div className="items-list">
          <h2>음악 목록 ({musicWorks.length})</h2>
          {musicWorks.map(work => (
            <div key={work.id} className="item-card">
              <div className="item-info">
                <h3>{work.title || '(제목 없음)'}</h3>
                <p>{work.description}</p>
                <div className="item-meta">
                  <span>{work.date}</span>
                  <span>{work.instruments.join(', ')}</span>
                </div>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(work)} className="btn-edit">
                  편집
                </button>
                <button onClick={() => handleDelete(work.id)} className="btn-delete">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingWork && (
          <div className="edit-form">
            <h2>{isCreating ? '새 음악 만들기' : '음악 편집'}</h2>
            
            <div className="form-group">
              <label>제목 *</label>
              <input
                type="text"
                value={editingWork.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="음악 제목"
              />
            </div>

            <div className="form-group">
              <label>짧은 설명 *</label>
              <textarea
                value={editingWork.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="카드에 표시될 짧은 설명"
                rows={2}
              />
            </div>

            <div className="form-group">
              <label>작품 설명 *</label>
              <textarea
                value={editingWork.fullDescription}
                onChange={(e) => updateField('fullDescription', e.target.value)}
                placeholder="상세 페이지에 표시될 전체 설명"
                rows={5}
              />
            </div>

            <div className="form-group">
              <label>날짜 *</label>
              <input
                type="date"
                value={editingWork.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>태그 (쉼표로 구분)</label>
              <input
                type="text"
                value={editingWork.tags.join(', ')}
                onChange={(e) => updateArrayField('tags', e.target.value)}
                placeholder="Electronic, Ambient, Classical"
              />
            </div>

            <div className="form-group">
              <label>악기 (쉼표로 구분) *</label>
              <input
                type="text"
                value={editingWork.instruments.join(', ')}
                onChange={(e) => updateArrayField('instruments', e.target.value)}
                placeholder="Piano, Synthesizer, Guitar"
              />
            </div>

            <div className="form-group">
              <label>오디오 파일 URL</label>
              <input
                type="text"
                value={editingWork.audioFile || ''}
                onChange={(e) => updateField('audioFile', e.target.value)}
                placeholder="/audio/track.mp3"
              />
            </div>

            <div className="form-group">
              <label>썸네일 URL</label>
              <input
                type="text"
                value={editingWork.thumbnail || ''}
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
                onClick={() => setEditingWork(null)} 
                className="btn-cancel"
                disabled={isSaving}
              >
                취소
              </button>
              <button 
                onClick={() => downloadJSON(musicWorks, 'music.json')} 
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

export default AdminEditMusic;
