import { Match } from '../data/matches';
import { groups } from '../data/groups';
import './MatchCard.css';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const group = groups.find(g => g.id === match.groupId);
  const team1 = group?.teams.find(t => t.id === match.team1);
  const team2 = group?.teams.find(t => t.id === match.team2);

  const getStatusClass = () => {
    switch (match.status) {
      case 'live':
        return 'status-live';
      case 'finished':
        return 'status-finished';
      default:
        return 'status-scheduled';
    }
  };

  const getStatusText = () => {
    switch (match.status) {
      case 'live':
        return 'EN DIRECT';
      case 'finished':
        return 'TERMINÉ';
      default:
        return match.date;
    }
  };

  return (
    <div className={`match-card ${getStatusClass()}`}>
      <div className="match-header">
        <span className="match-group">{match.groupId}</span>
        <span className={`match-status ${getStatusClass()}`}>{getStatusText()}</span>
      </div>
      <div className="match-content">
        <div className="team-section">
          <div className="team-flag-large">{team1?.flag || '🏴'}</div>
          <div className="team-name-large">{team1?.name || match.team1}</div>
        </div>
        <div className="score-section">
          {match.status === 'finished' || match.status === 'live' ? (
            <div className="score">
              <span className="score-number">{match.score1 ?? 0}</span>
              <span className="score-separator">-</span>
              <span className="score-number">{match.score2 ?? 0}</span>
            </div>
          ) : (
            <div className="match-time">{match.time}</div>
          )}
        </div>
        <div className="team-section">
          <div className="team-flag-large">{team2?.flag || '🏴'}</div>
          <div className="team-name-large">{team2?.name || match.team2}</div>
        </div>
      </div>
      {match.venue && (
        <div className="match-venue">📍 {match.venue}</div>
      )}
    </div>
  );
}

