import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Music from './pages/Music';
import Publications from './pages/Publications';
import DetailPage from './pages/DetailPage';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditProjects from './pages/AdminEditProjects';
import AdminEditMusic from './pages/AdminEditMusic';
import AdminEditPublications from './pages/AdminEditPublications';
import AdminEditAbout from './pages/AdminEditAbout';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<DetailPage type="project" />} />
                <Route path="/music" element={<Music />} />
                <Route path="/music/:id" element={<DetailPage type="music" />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/publications/:id" element={<DetailPage type="publication" />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/edit/projects" element={
                  <ProtectedRoute>
                    <AdminEditProjects />
                  </ProtectedRoute>
                } />
                <Route path="/admin/edit/music" element={
                  <ProtectedRoute>
                    <AdminEditMusic />
                  </ProtectedRoute>
                } />
                <Route path="/admin/edit/publications" element={
                  <ProtectedRoute>
                    <AdminEditPublications />
                  </ProtectedRoute>
                } />
                <Route path="/admin/edit/about" element={
                  <ProtectedRoute>
                    <AdminEditAbout />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
