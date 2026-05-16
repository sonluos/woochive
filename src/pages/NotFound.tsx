import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound container">
      <p className="notfound__code">404</p>
      <h1 className="notfound__title">Page not found</h1>
      <p className="notfound__msg">This page doesn't exist or has been moved.</p>
      <Link to="/" className="notfound__back">← Back to Intro</Link>
    </div>
  );
}
