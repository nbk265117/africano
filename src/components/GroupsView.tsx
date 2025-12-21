import { groups } from '../data/groups';
import GroupTable from './GroupTable';
import './GroupsView.css';

export default function GroupsView() {
  return (
    <div className="groups-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="main-title">
            <span className="title-icon">🏆</span>
            Coupe d'Afrique des Nations 2025
          </h1>
          <p className="subtitle">Maroc 🇲🇦</p>
          <div className="header-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-star">★</div>
            <div className="decoration-line"></div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="groups-section">
          <h2 className="section-title">Classements des Groupes</h2>
          <div className="groups-grid">
            {groups.map((group) => (
              <GroupTable key={group.id} group={group} />
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Suivez tous les matchs de la CAN 2025 au Maroc</p>
        <div className="footer-decoration">
          <span>🇲🇦</span>
          <span>⚽</span>
          <span>🏆</span>
        </div>
        <nav className="footer-nav">
          <a href="/" className="nav-link">Groupes</a>
          <a href="/matches" className="nav-link">Matchs</a>
        </nav>
      </footer>
    </div>
  );
}

