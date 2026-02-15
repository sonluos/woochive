import { useBio, useCourses } from '../hooks/usePortfolioData';
import { useProjects, useMusic, usePublications } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import GradientCard from '../components/GradientCard';
import './About.css';

function About() {
  const { data: bio, loading: bioLoading, error: bioError, reload: reloadBio } = useBio();
  const { data: courses, loading: coursesLoading, error: coursesError, reload: reloadCourses } = useCourses();
  const { data: projects } = useProjects();
  const { data: music } = useMusic();
  const { data: publications } = usePublications();

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

  // Calculate academic-creative balance
  const totalProjects = (projects?.length || 0) + (music?.length || 0);
  const academicCount = projects?.length || 0;
  const creativeCount = music?.length || 0;
  const academicPercent = totalProjects > 0 ? Math.round((academicCount / totalProjects) * 100) : 50;
  const creativePercent = totalProjects > 0 ? Math.round((creativeCount / totalProjects) * 100) : 50;
  const balanceScore = 100 - Math.abs(academicPercent - creativePercent);

  return (
    <div className="about">
      <div className="container">
        {/* Profile Section */}
        <section className="profile-section">
          <div className="profile-content">
            <div className="profile-image-wrapper">
              <div className="profile-image-container">
                <div className="profile-image-placeholder">
                  <span className="profile-icon">👤</span>
                </div>
              </div>
            </div>
            
            <div className="profile-text">
              <h1 className="profile-name">{bio.name}</h1>
              <p className="profile-introduction">{bio.introduction}</p>
              
              {bio.email && (
                <p className="profile-contact">
                  <span className="contact-label">Email:</span>
                  <a href={`mailto:${bio.email}`} className="contact-link">{bio.email}</a>
                </p>
              )}
              
              {bio.socialLinks && (
                <div className="social-links">
                  {bio.socialLinks.github && (
                    <a href={bio.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                      <span className="social-icon">💻</span>
                      GitHub
                    </a>
                  )}
                  {bio.socialLinks.linkedin && (
                    <a href={bio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                      <span className="social-icon">💼</span>
                      LinkedIn
                    </a>
                  )}
                  {bio.socialLinks.twitter && (
                    <a href={bio.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                      <span className="social-icon">🐦</span>
                      Twitter
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats-section">
          <div className="stats-grid-about">
            <StatCard
              title="Academic-Creative Balance"
              value={`${balanceScore}%`}
              subtitle="Well-balanced development"
              gradient="mixed"
            >
              <div className="balance-bars">
                <ProgressBar
                  label="Academic"
                  value={academicPercent}
                  color="cyan"
                  showValue={true}
                />
                <div style={{ height: '12px' }} />
                <ProgressBar
                  label="Creative"
                  value={creativePercent}
                  color="yellow"
                  showValue={true}
                />
              </div>
            </StatCard>

            <StatCard
              title="Total Works"
              value={totalProjects + (publications?.length || 0)}
              subtitle="Projects, Music & Publications"
              icon="📊"
              gradient="purple"
            />

            <StatCard
              title="Collaboration Network"
              value={(publications?.length || 0) * 2}
              subtitle="Institutional partnerships"
              icon="🤝"
              gradient="orange"
            />
          </div>
        </section>

        {/* Courses Section */}
        {courses && courses.length > 0 && (
          <section className="courses-section">
            <h2 className="section-title-about">Courses</h2>
            {groupedCourses && Object.entries(groupedCourses).map(([category, categoryCourses]) => (
              <div key={category} className="course-category">
                <h3 className="category-title">{category}</h3>
                <div className="course-grid">
                  {categoryCourses.map((course, index) => {
                    const gradients: Array<'purple' | 'blue' | 'orange'> = ['purple', 'blue', 'orange'];
                    return (
                      <GradientCard
                        key={course.id}
                        gradient={gradients[index % 3]}
                        hover={false}
                      >
                        <div className="course-card">
                          <div className="course-header">
                            <strong className="course-name">{course.code} - {course.name}</strong>
                            <span className="course-semester">{course.semester} {course.year}</span>
                          </div>
                          <div className="course-meta">
                            <span className="course-credits">{course.credits} credits</span>
                            {course.grade && <span className="course-grade">Grade: {course.grade}</span>}
                          </div>
                          {course.description && <p className="course-description">{course.description}</p>}
                        </div>
                      </GradientCard>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default About;
