import { useBio, useCourses } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function About() {
  const { data: bio, loading: bioLoading, error: bioError, reload: reloadBio } = useBio();
  const { data: courses, loading: coursesLoading, error: coursesError, reload: reloadCourses } = useCourses();

  const loading = bioLoading || coursesLoading;
  const error = bioError || coursesError;
  
  const handleRetry = () => {
    reloadBio();
    reloadCourses();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={handleRetry} />;
  }

  if (!bio) {
    return <div className="error">No bio data available</div>;
  }

  // Group courses by category
  const groupedCourses = courses?.reduce((acc, course) => {
    const category = course.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);

  return (
    <div className="about">
      <h1>About</h1>
      <div className="bio-content">
        <h2>{bio.name}</h2>
        <p className="introduction">{bio.introduction}</p>
        
        {bio.email && (
          <p className="contact">
            <strong>Email:</strong> <a href={`mailto:${bio.email}`}>{bio.email}</a>
          </p>
        )}
        
        {bio.socialLinks && (
          <div className="social-links">
            <h3>Links</h3>
            {bio.socialLinks.github && (
              <a href={bio.socialLinks.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {bio.socialLinks.linkedin && (
              <a href={bio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {bio.socialLinks.twitter && (
              <a href={bio.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
          </div>
        )}
      </div>

      {courses && courses.length > 0 && (
        <div className="courses-section">
          <h2>Courses</h2>
          {groupedCourses && Object.entries(groupedCourses).map(([category, categoryCourses]) => (
            <div key={category} className="course-category">
              <h3>{category}</h3>
              <ul className="course-list">
                {categoryCourses.map((course) => (
                  <li key={course.id} className="course-item">
                    <strong>{course.name}</strong>
                    <span className="semester">{course.semester}</span>
                    {course.description && <p>{course.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default About;
