import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicWork } from '../types/portfolio';
import './AdminEdit.css';

function AdminEditMusic() {
  const [musicWorks, setMusicWorks] = useState<MusicWork[]>([]);
  const [editingWork, setEditingWork] = useState<MusicWork | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadMusic();
  }, []);

  const loadMusic = async () => {
    try {
      // localStorage에서 먼저 확인
      const cached = localStorage.getItem('music_data');
      if (cached) {
        setMusicWorks(JSON.parse(cached));
        return;
      }

      // localStorage에 없으면 JSON 파일에서 로드
      const response = await fetch('/data/music.json');
      const data = await response.json();
      setMusicWorks(data);
      localStorage.setItem('music_data', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to load music:', error);
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

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = musicWorks.filter(w => w.id !== id);
      setMusicWorks(updated);
      // localStorage에 저장하여 즉시 반영
      localStorage.setItem('music_data', JSON.stringify(updated));
      alert('삭제되었습니다! 변경사항이 즉시 반영됩니다.');
    }
  };

  const handleSave = () => {
    if (!editingWork) return;

    let updated: MusicWork[];
    if (isCreating) {
      updated = [...musicWorks, editingWork];
    } else {
      updated = musicWorks.map(w => 
        w.id === editingWork.id ? editingWork : w
      );
    }

    setMusicWorks(updated);
    // localStorage에 저장하여 즉시 반영
    localStorage.setItem('music_data', JSON.stringify(updated));
    setEditingWork(null);
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
              <button onClick={handleSave} className="btn-save">
                저장
              </button>
              <button onClick={() => setEditingWork(null)} className="btn-cancel">
                취소
              </button>
              <button 
                onClick={() => downloadJSON(musicWorks, 'music.json')} 
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

export default AdminEditMusic;
