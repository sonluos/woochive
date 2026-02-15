import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Publication } from '../types/portfolio';
import './AdminEdit.css';

function AdminEditPublications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      const cached = localStorage.getItem('publications_data');
      if (cached) {
        setPublications(JSON.parse(cached));
        return;
      }

      const response = await fetch('/data/publications.json');
      const data = await response.json();
      setPublications(data);
      localStorage.setItem('publications_data', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to load publications:', error);
    }
  };

  const handleCreate = () => {
    const newPub: Publication = {
      id: `pub-${Date.now()}`,
      title: '',
      authors: [],
      venue: '',
      date: new Date().toISOString().split('T')[0],
      abstract: '',
      tags: []
    };
    setEditingPub(newPub);
    setIsCreating(true);
  };

  const handleEdit = (pub: Publication) => {
    setEditingPub({ ...pub });
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = publications.filter(p => p.id !== id);
      setPublications(updated);
      localStorage.setItem('publications_data', JSON.stringify(updated));
      alert('삭제되었습니다! 변경사항이 즉시 반영됩니다.');
    }
  };

  const handleSave = () => {
    if (!editingPub) return;

    let updated: Publication[];
    if (isCreating) {
      updated = [...publications, editingPub];
    } else {
      updated = publications.map(p => 
        p.id === editingPub.id ? editingPub : p
      );
    }

    setPublications(updated);
    localStorage.setItem('publications_data', JSON.stringify(updated));
    setEditingPub(null);
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

  const updateField = (field: keyof Publication, value: any) => {
    if (!editingPub) return;
    setEditingPub({ ...editingPub, [field]: value });
  };

  const updateArrayField = (field: 'authors' | 'tags', value: string) => {
    if (!editingPub) return;
    const items = value.split(',').map(s => s.trim()).filter(s => s);
    setEditingPub({ ...editingPub, [field]: items });
  };

  return (
    <div className="admin-edit">
      <div className="admin-edit-header">
        <button onClick={() => navigate('/admin')} className="back-button">
          ← 대시보드로
        </button>
        <h1>출판물 관리</h1>
        <button onClick={handleCreate} className="create-button">
          + 새 출판물
        </button>
      </div>

      <div className="admin-edit-content">
        <div className="items-list">
          <h2>출판물 목록 ({publications.length})</h2>
          {publications.map(pub => (
            <div key={pub.id} className="item-card">
              <div className="item-info">
                <h3>{pub.title || '(제목 없음)'}</h3>
                <p>{pub.authors.join(', ')}</p>
                <div className="item-meta">
                  <span>{pub.venue}</span>
                  <span>{pub.date}</span>
                </div>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(pub)} className="btn-edit">
                  편집
                </button>
                <button onClick={() => handleDelete(pub.id)} className="btn-delete">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingPub && (
          <div className="edit-form">
            <h2>{isCreating ? '새 출판물 만들기' : '출판물 편집'}</h2>
            
            <div className="form-group">
              <label>제목 *</label>
              <input
                type="text"
                value={editingPub.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="논문 제목"
              />
            </div>

            <div className="form-group">
              <label>저자 (쉼표로 구분) *</label>
              <input
                type="text"
                value={editingPub.authors.join(', ')}
                onChange={(e) => updateArrayField('authors', e.target.value)}
                placeholder="John Doe, Jane Smith"
              />
            </div>

            <div className="form-group">
              <label>출판처 *</label>
              <input
                type="text"
                value={editingPub.venue}
                onChange={(e) => updateField('venue', e.target.value)}
                placeholder="Conference or Journal Name"
              />
            </div>

            <div className="form-group">
              <label>날짜 *</label>
              <input
                type="date"
                value={editingPub.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>초록 *</label>
              <textarea
                value={editingPub.abstract}
                onChange={(e) => updateField('abstract', e.target.value)}
                placeholder="논문 초록"
                rows={5}
              />
            </div>

            <div className="form-group">
              <label>태그 (쉼표로 구분)</label>
              <input
                type="text"
                value={editingPub.tags?.join(', ') || ''}
                onChange={(e) => updateArrayField('tags', e.target.value)}
                placeholder="Machine Learning, AI, NLP"
              />
            </div>

            <div className="form-group">
              <label>PDF URL</label>
              <input
                type="text"
                value={editingPub.pdfUrl || ''}
                onChange={(e) => updateField('pdfUrl', e.target.value)}
                placeholder="/pdfs/paper.pdf"
              />
            </div>

            <div className="form-group">
              <label>DOI</label>
              <input
                type="text"
                value={editingPub.doi || ''}
                onChange={(e) => updateField('doi', e.target.value)}
                placeholder="10.1234/example.doi"
              />
            </div>

            <div className="form-group">
              <label>arXiv URL</label>
              <input
                type="text"
                value={editingPub.arxivUrl || ''}
                onChange={(e) => updateField('arxivUrl', e.target.value)}
                placeholder="https://arxiv.org/abs/..."
              />
            </div>

            <div className="form-actions">
              <button onClick={handleSave} className="btn-save">
                저장
              </button>
              <button onClick={() => setEditingPub(null)} className="btn-cancel">
                취소
              </button>
              <button 
                onClick={() => downloadJSON(publications, 'publications.json')} 
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

export default AdminEditPublications;
