import { foundationsData, CourseEntry } from '../data/foundations';
import './Foundations.css';

function CourseCard({ course }: { course: CourseEntry }) {
  return (
    <div className={`course-card ${course.inProgress ? 'course-card--in-progress' : ''}`}>
      <div className="course-card__header">
        <span className="course-card__name">{course.name}</span>
        {course.inProgress ? (
          <span className="course-card__badge">In Progress</span>
        ) : (
          <span className="course-card__grade">{course.grade}</span>
        )}
      </div>
      <div className="course-card__meta">
        <span className="course-card__semester">{course.semester}</span>
        <span className="course-card__credits">{course.credits}학점</span>
      </div>
    </div>
  );
}

function CourseSection({ courses }: { courses: CourseEntry[] }) {
  // Group by semester
  const semesters: { label: string; items: CourseEntry[] }[] = [];
  let currentSemester = '';

  courses.forEach((c) => {
    if (c.semester !== currentSemester) {
      currentSemester = c.semester;
      semesters.push({ label: c.semester, items: [] });
    }
    semesters[semesters.length - 1].items.push(c);
  });

  return (
    <>
      {semesters.map((sem) => (
        <div key={sem.label} className="foundations__semester-group">
          <span className="foundations__semester-label">{sem.label}</span>
          <div className="foundations__grid">
            {sem.items.map((c, i) => (
              <CourseCard key={i} course={c} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default function Foundations() {
  return (
    <main className="foundations">
      <section className="foundations__header container">
        <h1 className="foundations__title">Foundations</h1>
        <p className="foundations__desc">
          Courses in <strong>Applied Mathematics</strong>, <strong>Computing</strong>, and <strong>Music</strong> that support my research.
        </p>
      </section>

      <section className="foundations__body container">
        <h2 className="foundations__section-heading foundations__section-heading--major">Major</h2>
        <CourseSection courses={foundationsData.major} />

        <h2 className="foundations__section-heading foundations__section-heading--elective">Elective</h2>
        <CourseSection courses={foundationsData.elective} />
      </section>
    </main>
  );
}
