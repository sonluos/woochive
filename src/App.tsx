import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Research from './pages/Research';
import Foundations from './pages/Foundations';
import Works from './pages/Works';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditAbout from './pages/AdminEditAbout';
import AdminEditProjects from './pages/AdminEditProjects';
import AdminEditMusic from './pages/AdminEditMusic';
import AdminEditPublications from './pages/AdminEditPublications';
import './App.css';

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
                <Route path="/research" element={<Research />} />
                <Route path="/foundations" element={<Foundations />} />
                <Route path="/works" element={<Works />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/edit/about" element={<AdminEditAbout />} />
                <Route path="/admin/edit/projects" element={<AdminEditProjects />} />
                <Route path="/admin/edit/music" element={<AdminEditMusic />} />
                <Route path="/admin/edit/publications" element={<AdminEditPublications />} />

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
