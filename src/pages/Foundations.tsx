import { useMemo } from 'react';
import { foundationsData, CourseEntry, MFKEntry } from '../data/foundations';
import './Foundations.css';

// Major = gray (#5B6770), Elective = purple (#C077DB) — interpolate by ratio
function interpolateColor(ratio: number): string {
  const r = Math.round(0x5B + (0xC0 - 0x5B) * ratio);
  const g = Math.round(0x67 + (0x77 - 0x67) * ratio);
  const b = Math.round(0x70 + (0xDB - 0x70) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

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
        <span className="course-card__credits">{course.credits}학점</span>
      </div>
    </div>
  );
}

function MFKCard({ entry }: { entry: MFKEntry }) {
  return (
    <div className={`course-card course-card--mfk ${entry.inProgress ? 'course-card--in-progress' : ''}`}>
      <div className="course-card__header">
        <span className="course-card__name">{entry.title}</span>
      </div>
      <div className="course-card__meta">
        <span className="course-card__desc">{entry.description}</span>
      </div>
    </div>
  );
}

function CourseSection({ courses }: { courses: CourseEntry[] }) {
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

function MFKSection({ entries }: { entries: MFKEntry[] }) {
  const semesters: { label: string; items: MFKEntry[] }[] = [];
  let currentSemester = '';

  entries.forEach((e) => {
    if (e.semester !== currentSemester) {
      currentSemester = e.semester;
      semesters.push({ label: e.semester, items: [] });
    }
    semesters[semesters.length - 1].items.push(e);
  });

  return (
    <>
      {semesters.map((sem) => (
        <div key={sem.label} className="foundations__semester-group">
          <span className="foundations__semester-label">{sem.label}</span>
          <div className="foundations__grid">
            {sem.items.map((e, i) => (
              <MFKCard key={i} entry={e} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default function Foundations() {
  // Title color based on Elective:Major ratio
  const titleColor = useMemo(() => {
    const major = foundationsData.major.length;
    const elective = foundationsData.elective.length;
    const total = major + elective;
    const ratio = total > 0 ? elective / total : 0;
    return interpolateColor(ratio);
  }, []);

  return (
    <main className="foundations">
      <section className="foundations__header container">
        <h1 className="foundations__title" style={{ color: titleColor }}>Foundations</h1>
        <p className="foundations__desc">
          Courses in <strong className="foundations__desc-gray">Applied Mathematics</strong>, <strong className="foundations__desc-gray">Computing</strong>, and <strong className="foundations__desc-purple">Music</strong>.
        </p>
      </section>

      <section className="foundations__body container">
        <h2 className="foundations__section-heading foundations__section-heading--major">Major</h2>
        <CourseSection courses={foundationsData.major} />

        <h2 className="foundations__section-heading foundations__section-heading--mfk">MFK</h2>
        <MFKSection entries={foundationsData.mfk} />

        <h2 className="foundations__section-heading foundations__section-heading--elective">Elective</h2>
        <CourseSection courses={foundationsData.elective} />
      </section>
    </main>
  );
}
