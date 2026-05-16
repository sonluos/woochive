import { foundationsData, CourseEntry } from '../data/foundations';
import './Foundations.css';

function CourseTable({ courses }: { courses: CourseEntry[] }) {
  return (
    <div className="foundations__table-wrap">
      <table className="foundations__table">
        <thead>
          <tr>
            <th>학기</th>
            <th>과목명</th>
            <th>이수구분</th>
            <th>학점</th>
            <th>등급</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i}>
              <td className="foundations__cell--semester">{c.semester}</td>
              <td className="foundations__cell--name">{c.name}</td>
              <td className="foundations__cell--category">{c.category}</td>
              <td className="foundations__cell--credits">{c.credits}</td>
              <td className={`foundations__cell--grade ${c.grade === 'A+' ? 'foundations__grade--top' : ''}`}>{c.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
        <h2 className="foundations__section-heading">Major</h2>
        <CourseTable courses={foundationsData.major} />

        <h2 className="foundations__section-heading">Elective</h2>
        <CourseTable courses={foundationsData.elective} />
      </section>
    </main>
  );
}
