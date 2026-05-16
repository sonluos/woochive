import { foundationsData, CourseEntry } from '../data/foundations';
import './Foundations.css';

function CourseCard({ course }: { course: CourseEntry }) {
  return (
    <div className="course-card">
      <div className="course-card__header">
        <span className="course-card__name">{course.name}</span>
        <span className="course-card__grade">{course.grade}</span>
      </div>
      <div className="course-card__meta">
        <span className="course-card__semester">{course.semester}</span>
        <span className="course-card__credits">{course.credits}학점</span>
      </div>
    </div>
  );
}

export default function Foundations() {
  return (
    <main className="foundations">
      <section className="foundations__header container">
        <h1 className="foundations__title">Foundations</h1>
        <p className="foundations__desc">
          The mathematical and computational coursework behind the research.
        </p>
      </section>

      <section className="foundations__body container">
        <h2 className="foundations__section-heading foundations__section-heading--major">Major</h2>
        <div className="foundations__grid">
          {foundationsData.major.map((c, i) => (
            <CourseCard key={i} course={c} />
          ))}
        </div>

        <h2 className="foundations__section-heading foundations__section-heading--elective">Elective</h2>
        <div className="foundations__grid">
          {foundationsData.elective.map((c, i) => (
            <CourseCard key={i} course={c} />
          ))}
        </div>
      </section>
    </main>
  );
}
