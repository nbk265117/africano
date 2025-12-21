import { useEffect, useState } from 'react';
import './Navigation.css';

export default function Navigation() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    // Écouter les changements de route
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    
    // Intercepter les clics sur les liens
    const links = document.querySelectorAll('.nav-button');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          setTimeout(() => setCurrentPath(href), 100);
        }
      });
    });
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <span className="logo-icon">🏆</span>
          <span className="logo-text">CAN 2025</span>
        </a>
        <div className="nav-buttons">
          <a 
            href="/" 
            className={`nav-button ${currentPath === '/' ? 'active' : ''}`}
          >
            <span className="button-icon">📊</span>
            <span className="button-text">Groupes</span>
          </a>
          <a 
            href="/matches" 
            className={`nav-button ${currentPath === '/matches' ? 'active' : ''}`}
          >
            <span className="button-icon">⚽</span>
            <span className="button-text">Matchs</span>
          </a>
          <a 
            href="/pronostics" 
            className={`nav-button ${currentPath === '/pronostics' ? 'active' : ''}`}
          >
            <span className="button-icon">🎯</span>
            <span className="button-text">PRO</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

