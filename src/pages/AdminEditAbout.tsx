import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bio, Course } from '../types/portfolio';
import './AdminEdit.css';

function AdminEditAbout() {
  const [bio, setBio] = useState<Bio | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingBio, setEditingBio] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Bio 로드
      const bioCache = localStorage.getItem('bio_data');
      if (bioCache) {
        setBio(JSON.parse(bioCache));
      } else {
        const bioResponse = await fetch('/data/bio.json');
        const bioData = await bioResponse.json();
        setBio(bioData);
        localStorage.setItem('bio_data', JSON.stringify(bioData));
      }

      // Courses 로드
      const coursesCache = localStorage.getItem('courses_data');
      if (coursesCache) {
        setCourses(JSON.parse(coursesCache));
      } else {
        const coursesResponse = await fetch('/data/courses.json');
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);
        localStorage.setItem('courses_data', JSON.stringify(coursesData));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleSaveBio = () => {
    if (!bio) return;
    localStorage.setItem('bio_data', JSON.stringify(bio));
    setEditingBio(false);
    alert('저장되었습니다! 변경사항이 즉시 반영됩니다.');
  };

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      code: '',
      name: '',
      semester: '',
      year: new Date().getFullYear(),
      credits: 3,
      grade: ''
    };
    setEditingCourse(newCourse);
    setIsCreatingCourse(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse({ ...course });
    setIsCreatingCourse(false);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = courses.filter(c => c.id !== id);
      setCourses(updated);
      localStorage.setItem('courses_data', JSON.stringify(updated));
      alert('삭제되었습니다! 변경사항이 즉시 반영됩니다.');
    }
  };

  const handleSaveCourse = () => {
    if (!editingCourse) return;

    let updated: Course[];
    if (isCreatingCourse) {
      updated = [...courses, editingCourse];
    } else {
      updated = courses.map(c => 
        c.id === editingCourse.id ? editingCourse : c
      );
    }

    setCourses(updated);
    localStorage.setItem('courses_data', JSON.stringify(updated));
    setEditingCourse(null);
    setIsCreatingCourse(false);
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

  return (
    <div className="admin-edit">
      <div className="admin-edit-header">
        <button onClick={() => navigate('/admin')} className="back-button">
          ← 대시보드로
        </button>
        <h1>About 관리</h1>
      </div>

      <div className="admin-edit-content">
        {/* Bio Section */}
        <div className="section-card">
          <div className="section-header">
            <h2>자기소개</h2>
            <div className="section-actions">
              {!editingBio && (
                <button onClick={() => setEditingBio(true)} className="btn-edit">
                  편집
                </button>
              )}
              <button onClick={() => downloadJSON(bio, 'bio.json')} className="btn-download">
                JSON 다운로드
              </button>
            </div>
          </div>

          {editingBio && bio ? (
            <div className="edit-form">
              <div className="form-group">
                <label>이름 *</label>
                <input
                  type="text"
                  value={bio.name}
                  onChange={(e) => setBio({ ...bio, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>소개 *</label>
                <textarea
                  value={bio.introduction}
                  onChange={(e) => setBio({ ...bio, introduction: e.target.value })}
                  rows={5}
                />
              </div>

              <div className="form-group">
                <label>이메일</label>
                <input
                  type="email"
                  value={bio.email || ''}
                  onChange={(e) => setBio({ ...bio, email: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button onClick={handleSaveBio} className="btn-save">
                  저장
                </button>
                <button onClick={() => setEditingBio(false)} className="btn-cancel">
                  취소
                </button>
              </div>
            </div>
          ) : (
            bio && (
              <div className="bio-preview">
                <p><strong>이름:</strong> {bio.name}</p>
                <p><strong>소개:</strong> {bio.introduction}</p>
                {bio.email && <p><strong>이메일:</strong> {bio.email}</p>}
              </div>
            )
          )}
        </div>

        {/* Courses Section */}
        <div className="section-card">
          <div className="section-header">
            <h2>수강 과목 ({courses.length})</h2>
            <div className="section-actions">
              <button onClick={handleCreateCourse} className="create-button">
                + 새 과목
              </button>
              <button onClick={() => downloadJSON(courses, 'courses.json')} className="btn-download">
                JSON 다운로드
              </button>
            </div>
          </div>

          <div className="items-list">
            {courses.map(course => (
              <div key={course.id} className="item-card">
                <div className="item-info">
                  <h3>{course.code} - {course.name}</h3>
                  <div className="item-meta">
                    <span>{course.semester} {course.year}</span>
                    <span>{course.credits}학점</span>
                    {course.grade && <span>성적: {course.grade}</span>}
                  </div>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEditCourse(course)} className="btn-edit">
                    편집
                  </button>
                  <button onClick={() => handleDeleteCourse(course.id)} className="btn-delete">
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingCourse && (
            <div className="edit-form">
              <h3>{isCreatingCourse ? '새 과목 추가' : '과목 편집'}</h3>

              <div className="form-group">
                <label>과목 코드 *</label>
                <input
                  type="text"
                  value={editingCourse.code}
                  onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                  placeholder="CS101"
                />
              </div>

              <div className="form-group">
                <label>과목명 *</label>
                <input
                  type="text"
                  value={editingCourse.name}
                  onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  placeholder="Introduction to Computer Science"
                />
              </div>

              <div className="form-group">
                <label>학기 *</label>
                <select
                  value={editingCourse.semester}
                  onChange={(e) => setEditingCourse({ ...editingCourse, semester: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="Spring">Spring</option>
                  <option value="Fall">Fall</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>

              <div className="form-group">
                <label>연도 *</label>
                <input
                  type="number"
                  value={editingCourse.year}
                  onChange={(e) => setEditingCourse({ ...editingCourse, year: parseInt(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>학점 *</label>
                <input
                  type="number"
                  value={editingCourse.credits}
                  onChange={(e) => setEditingCourse({ ...editingCourse, credits: parseInt(e.target.value) })}
                  min="1"
                  max="6"
                />
              </div>

              <div className="form-group">
                <label>성적</label>
                <input
                  type="text"
                  value={editingCourse.grade || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, grade: e.target.value })}
                  placeholder="A+, A, B+, etc."
                />
              </div>

              <div className="form-actions">
                <button onClick={handleSaveCourse} className="btn-save">
                  저장
                </button>
                <button onClick={() => setEditingCourse(null)} className="btn-cancel">
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminEditAbout;
