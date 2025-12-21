import { useState } from 'react';
import { matches } from '../data/matches';
import { groups } from '../data/groups';
import MatchCard from './MatchCard';
import Navigation from './Navigation';
import './MatchesView.css';

export default function MatchesView() {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  
  const liveMatches = matches.filter(m => m.status === 'live');
  const finishedMatches = matches.filter(m => m.status === 'finished');
  const scheduledMatches = matches.filter(m => {
    if (selectedGroup === 'all') return m.status === 'scheduled';
    return m.status === 'scheduled' && m.groupId === selectedGroup;
  });

  // Grouper les matchs par date
  const matchesByDate = scheduledMatches.reduce((acc, match) => {
    const date = match.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {} as Record<string, typeof scheduledMatches>);

  const sortedDates = Object.keys(matchesByDate).sort();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <>
      <Navigation />
      <div className="matches-container">
        <header className="matches-header">
          <h1 className="matches-title">Calendrier des Matchs</h1>
          <p className="matches-subtitle">CAN 2025 - Maroc 🇲🇦</p>
        </header>

      <div className="filter-section">
        <label htmlFor="group-filter" className="filter-label">Filtrer par groupe:</label>
        <select 
          id="group-filter"
          value={selectedGroup} 
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="group-filter"
        >
          <option value="all">Tous les groupes</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>

      {liveMatches.length > 0 && (
        <section className="matches-section">
          <h2 className="section-header live">⚡ Matchs en Direct</h2>
          <div className="matches-grid">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      <section className="matches-section">
        <h2 className="section-header scheduled">📅 Matchs à Venir</h2>
        {scheduledMatches.length > 0 ? (
          <div className="matches-by-date">
            {sortedDates.map((date) => (
              <div key={date} className="date-group">
                <h3 className="date-header">{formatDate(date)}</h3>
                <div className="matches-grid">
                  {matchesByDate[date].map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-matches">Aucun match programmé pour le moment</p>
        )}
      </section>

      {finishedMatches.length > 0 && (
        <section className="matches-section">
          <h2 className="section-header finished">✅ Matchs Terminés</h2>
          <div className="matches-grid">
            {finishedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

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
    </>
  );
}

