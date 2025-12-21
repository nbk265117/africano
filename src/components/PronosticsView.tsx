import { qualifiedTeams } from '../data/qualifications';
import { groups, type Group } from '../data/groups';
import { pronostics, type SimulatedGroup, type SimulatedMatch } from '../data/pronostics';
import { matches } from '../data/matches';
import GroupTable from './GroupTable';
import Navigation from './Navigation';
import './PronosticsView.css';

export default function PronosticsView() {
  // Charger directement les pronostics depuis le JSON
  const simulatedGroups: SimulatedGroup[] = pronostics?.groups || [];
  const simulatedMatches: SimulatedMatch[] = pronostics?.matches || [];
  
  // Obtenir le nom et le drapeau d'une équipe
  const getTeamInfo = (teamId: string) => {
    for (const group of groups) {
      const team = group.teams.find(t => t.id === teamId);
      if (team) return { name: team.name, flag: team.flag };
    }
    return { name: teamId, flag: '🏴' };
  };
  
  // Grouper les matchs par groupe
  const matchesByGroup = groups.map(group => {
    const groupMatches = simulatedMatches
      .filter(m => m.groupId === group.id)
      .map(simMatch => {
        const originalMatch = matches.find(m => m.id === simMatch.matchId);
        return {
          ...simMatch,
          date: originalMatch?.date || '',
          time: originalMatch?.time || ''
        };
      })
      .sort((a, b) => {
        // Trier par date puis par heure
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.time.localeCompare(b.time);
      });
    
    return {
      groupId: group.id,
      groupName: group.name,
      matches: groupMatches
    };
  });

  return (
    <>
      <Navigation />
      <div className="pronostics-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="main-title">
              <span className="title-icon">🏆</span>
              Coupe d'Afrique des Nations 2025
            </h1>
            <p className="subtitle">Maroc 🇲🇦</p>
          </div>
        </header>

      <section className="qualified-teams-section">
        <h2 className="section-title">Équipes Qualifiées (Référence)</h2>
        <div className="qualified-grid">
          {groups.map((group) => {
            const groupQualified = qualifiedTeams.filter(q => q.groupId === group.id);
            return (
              <div key={group.id} className="qualified-group">
                <h3 className="group-qualified-title">{group.name}</h3>
                <div className="qualified-list">
                  {groupQualified.map((team, index) => {
                    const teamData = group.teams.find(t => t.id === team.teamId);
                    return (
                      <div key={team.teamId} className={`qualified-team position-${team.position}`}>
                        <span className="position-badge">{team.position === 3 ? '3e' : team.position}</span>
                        <span className="team-flag">{teamData?.flag || '🏴'}</span>
                        <span className="team-name">{teamData?.name || team.teamName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="simulation-section">
        <div className="simulated-groups">
          <h2 className="section-title">Classements Simulés</h2>
          {simulatedGroups.length > 0 ? (
            simulatedGroups.map((groupResult) => {
              const completeGroup: Group = {
                id: groupResult.id,
                name: groupResult.name,
                teams: groupResult.teams
              };
              
              return (
                <div key={groupResult.id} className="simulated-group-container">
                  <GroupTable group={completeGroup} />
                </div>
              );
            })
          ) : (
            <div className="no-pronostics">
              <p>⚠️ Aucun pronostic disponible. Veuillez exécuter <code>npm run generate-pronostics</code> pour générer les pronostics.</p>
            </div>
          )}
        </div>
        
        {/* Affichage des matchs avec résultats par groupe */}
        {simulatedMatches.length > 0 && (
          <div className="matches-results-section">
            <h2 className="section-title">Résultats des Matchs par Groupe</h2>
            {matchesByGroup.map(({ groupId, groupName, matches: groupMatches }) => (
              <div key={groupId} className="group-matches-container">
                <h3 className="group-matches-title">{groupName}</h3>
                <div className="matches-grid-pronostics">
                  {groupMatches.map((match) => {
                    const team1Info = getTeamInfo(match.team1);
                    const team2Info = getTeamInfo(match.team2);
                    const winner = match.score1 > match.score2 ? match.team1 : 
                                  match.score2 > match.score1 ? match.team2 : null;
                    
                    return (
                      <div key={match.matchId} className="match-result-card">
                        <div className="match-result-date">
                          {new Date(match.date).toLocaleDateString('fr-FR', { 
                            day: 'numeric', 
                            month: 'short' 
                          })} à {match.time}
                        </div>
                        <div className="match-result-teams">
                          <div className={`match-result-team ${winner === match.team1 ? 'winner' : ''}`}>
                            <span className="team-flag-result">{team1Info.flag}</span>
                            <span className="team-name-result">{team1Info.name}</span>
                            <span className="team-score-result">{match.score1}</span>
                          </div>
                          <div className="match-result-separator">-</div>
                          <div className={`match-result-team ${winner === match.team2 ? 'winner' : ''}`}>
                            <span className="team-score-result">{match.score2}</span>
                            <span className="team-name-result">{team2Info.name}</span>
                            <span className="team-flag-result">{team2Info.flag}</span>
                          </div>
                        </div>
                        {winner === null && (
                          <div className="match-result-draw">Match nul</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      </div>
    </>
  );
}
