import { useState } from 'react';
import { qualifiedTeams } from '../data/qualifications';
import type { QualifiedTeam } from '../data/qualifications';
import { groups } from '../data/groups';
import './PronosticsView.css';

interface KnockoutMatch {
  id: string;
  round: 'round16' | 'quarter' | 'semi' | 'final' | 'third';
  team1: string;
  team2: string;
  winner?: string;
  score1?: number;
  score2?: number;
}

export default function PronosticsView() {
  const [knockoutMatches, setKnockoutMatches] = useState<KnockoutMatch[]>([]);
  const [simulated, setSimulated] = useState(false);

  // Obtenir le drapeau d'une équipe
  const getTeamFlag = (teamId: string) => {
    for (const group of groups) {
      const team = group.teams.find(t => t.id === teamId);
      if (team) return team.flag;
    }
    return '🏴';
  };

  // Obtenir le nom d'une équipe
  const getTeamName = (teamId: string) => {
    for (const group of groups) {
      const team = group.teams.find(t => t.id === teamId);
      if (team) return team.name;
    }
    return teamId;
  };

  // Simuler un match (logique simple basée sur le classement)
  const simulateMatch = (team1: string, team2: string): { winner: string; score1: number; score2: number } => {
    const team1Data = qualifiedTeams.find(t => t.teamId === team1);
    const team2Data = qualifiedTeams.find(t => t.teamId === team2);
    
    // Logique : meilleur classement = plus de chances de gagner
    // Position 1 > Position 2 > Position 3
    let team1Score = 0;
    let team2Score = 0;
    
    if (team1Data && team2Data) {
      if (team1Data.position < team2Data.position) {
        // Team1 mieux classée
        team1Score = Math.floor(Math.random() * 3) + 1;
        team2Score = Math.floor(Math.random() * 2);
        if (team1Score <= team2Score) team1Score = team2Score + 1;
      } else if (team2Data.position < team1Data.position) {
        // Team2 mieux classée
        team2Score = Math.floor(Math.random() * 3) + 1;
        team1Score = Math.floor(Math.random() * 2);
        if (team2Score <= team1Score) team2Score = team1Score + 1;
      } else {
        // Même position, match serré
        const score = Math.floor(Math.random() * 3);
        if (Math.random() > 0.5) {
          team1Score = score + 1;
          team2Score = score;
        } else {
          team1Score = score;
          team2Score = score + 1;
        }
      }
    }
    
    return {
      winner: team1Score > team2Score ? team1 : team2,
      score1: team1Score,
      score2: team2Score
    };
  };

  // Simuler tous les matchs
  const simulateTournament = () => {
    const matches: KnockoutMatch[] = [];
    
    // Huitièmes de finale (16 équipes)
    const firstPlaced = qualifiedTeams.filter(t => t.position === 1);
    const secondPlaced = qualifiedTeams.filter(t => t.position === 2);
    const thirdPlaced = qualifiedTeams.filter(t => t.position === 3);
    
    // Format CAN : 1er d'un groupe vs 2ème/3ème d'un autre groupe
    // Pairing classique des huitièmes
    const round16Pairings: Array<[QualifiedTeam, QualifiedTeam]> = [
      // Match 1: 1A vs 2C
      [firstPlaced.find(t => t.groupId === 'A')!, secondPlaced.find(t => t.groupId === 'C')!],
      // Match 2: 2A vs 2B
      [secondPlaced.find(t => t.groupId === 'A')!, secondPlaced.find(t => t.groupId === 'B')!],
      // Match 3: 1B vs 3A/C/D
      [firstPlaced.find(t => t.groupId === 'B')!, thirdPlaced.find(t => t.groupId === 'A')!],
      // Match 4: 1C vs 3B/E/F
      [firstPlaced.find(t => t.groupId === 'C')!, thirdPlaced.find(t => t.groupId === 'B')!],
      // Match 5: 1D vs 3C
      [firstPlaced.find(t => t.groupId === 'D')!, thirdPlaced.find(t => t.groupId === 'C')!],
      // Match 6: 2D vs 2E
      [secondPlaced.find(t => t.groupId === 'D')!, secondPlaced.find(t => t.groupId === 'E')!],
      // Match 7: 1E vs 2F
      [firstPlaced.find(t => t.groupId === 'E')!, secondPlaced.find(t => t.groupId === 'F')!],
      // Match 8: 1F vs 2C ou 3E
      [firstPlaced.find(t => t.groupId === 'F')!, secondPlaced.find(t => t.groupId === 'C') || thirdPlaced.find(t => t.groupId === 'E')!],
    ];
    
    const round16Matches: KnockoutMatch[] = [];
    const quarterFinalists: string[] = [];
    
    round16Pairings.forEach((pairing, index) => {
      if (pairing[0] && pairing[1]) {
        const result = simulateMatch(pairing[0].teamId, pairing[1].teamId);
        round16Matches.push({
          id: `r16-${index + 1}`,
          round: 'round16',
          team1: pairing[0].teamId,
          team2: pairing[1].teamId,
          winner: result.winner,
          score1: result.score1,
          score2: result.score2
        });
        quarterFinalists.push(result.winner);
      }
    });
    
    matches.push(...round16Matches);
    
    // Quarts de finale (8 équipes)
    const quarterMatches: KnockoutMatch[] = [];
    const semiFinalists: string[] = [];
    
    for (let i = 0; i < quarterFinalists.length; i += 2) {
      if (quarterFinalists[i] && quarterFinalists[i + 1]) {
        const result = simulateMatch(quarterFinalists[i], quarterFinalists[i + 1]);
        quarterMatches.push({
          id: `qf-${i / 2 + 1}`,
          round: 'quarter',
          team1: quarterFinalists[i],
          team2: quarterFinalists[i + 1],
          winner: result.winner,
          score1: result.score1,
          score2: result.score2
        });
        semiFinalists.push(result.winner);
      }
    }
    
    matches.push(...quarterMatches);
    
    // Demi-finales (4 équipes)
    const semiMatches: KnockoutMatch[] = [];
    const finalists: string[] = [];
    const thirdPlaceTeams: string[] = [];
    
    for (let i = 0; i < semiFinalists.length; i += 2) {
      if (semiFinalists[i] && semiFinalists[i + 1]) {
        const result = simulateMatch(semiFinalists[i], semiFinalists[i + 1]);
        semiMatches.push({
          id: `sf-${i / 2 + 1}`,
          round: 'semi',
          team1: semiFinalists[i],
          team2: semiFinalists[i + 1],
          winner: result.winner,
          score1: result.score1,
          score2: result.score2
        });
        finalists.push(result.winner);
        thirdPlaceTeams.push(result.winner === semiFinalists[i] ? semiFinalists[i + 1] : semiFinalists[i]);
      }
    }
    
    matches.push(...semiMatches);
    
    // Match pour la 3ème place
    if (thirdPlaceTeams[0] && thirdPlaceTeams[1]) {
      const result = simulateMatch(thirdPlaceTeams[0], thirdPlaceTeams[1]);
      matches.push({
        id: 'third',
        round: 'third',
        team1: thirdPlaceTeams[0],
        team2: thirdPlaceTeams[1],
        winner: result.winner,
        score1: result.score1,
        score2: result.score2
      });
    }
    
    // Finale
    if (finalists[0] && finalists[1]) {
      const result = simulateMatch(finalists[0], finalists[1]);
      matches.push({
        id: 'final',
        round: 'final',
        team1: finalists[0],
        team2: finalists[1],
        winner: result.winner,
        score1: result.score1,
        score2: result.score2
      });
    }
    
    setKnockoutMatches(matches);
    setSimulated(true);
  };

  const getRoundTitle = (round: string) => {
    const titles: Record<string, string> = {
      round16: 'Huitièmes de Finale',
      quarter: 'Quarts de Finale',
      semi: 'Demi-Finales',
      third: 'Match pour la 3ème Place',
      final: 'Finale'
    };
    return titles[round] || round;
  };

  const round16Matches = knockoutMatches.filter(m => m.round === 'round16');
  const quarterMatches = knockoutMatches.filter(m => m.round === 'quarter');
  const semiMatches = knockoutMatches.filter(m => m.round === 'semi');
  const thirdMatch = knockoutMatches.find(m => m.round === 'third');
  const finalMatch = knockoutMatches.find(m => m.round === 'final');

  return (
    <div className="pronostics-container">
      <header className="pronostics-header">
        <h1 className="pronostics-title">🏆 Pronostics CAN 2025</h1>
        <p className="pronostics-subtitle">Simulation des phases finales</p>
      </header>

      <section className="qualified-teams-section">
        <h2 className="section-title">Équipes Qualifiées</h2>
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
        <div className="simulate-button-container">
          <button onClick={simulateTournament} className="simulate-button">
            🎲 Lancer la Simulation
          </button>
        </div>

        {simulated && (
          <div className="knockout-bracket">
            {round16Matches.length > 0 && (
              <div className="round-section">
                <h2 className="round-title">{getRoundTitle('round16')}</h2>
                <div className="matches-grid">
                  {round16Matches.map((match) => (
                    <div key={match.id} className="knockout-match">
                      <div className="match-teams">
                        <div className={`match-team ${match.winner === match.team1 ? 'winner' : ''}`}>
                          <span className="team-flag-small">{getTeamFlag(match.team1)}</span>
                          <span className="team-name-small">{getTeamName(match.team1)}</span>
                          <span className="match-score">{match.score1}</span>
                        </div>
                        <div className="match-vs">VS</div>
                        <div className={`match-team ${match.winner === match.team2 ? 'winner' : ''}`}>
                          <span className="team-flag-small">{getTeamFlag(match.team2)}</span>
                          <span className="team-name-small">{getTeamName(match.team2)}</span>
                          <span className="match-score">{match.score2}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {quarterMatches.length > 0 && (
              <div className="round-section">
                <h2 className="round-title">{getRoundTitle('quarter')}</h2>
                <div className="matches-grid">
                  {quarterMatches.map((match) => (
                    <div key={match.id} className="knockout-match">
                      <div className="match-teams">
                        <div className={`match-team ${match.winner === match.team1 ? 'winner' : ''}`}>
                          <span className="team-flag-small">{getTeamFlag(match.team1)}</span>
                          <span className="team-name-small">{getTeamName(match.team1)}</span>
                          <span className="match-score">{match.score1}</span>
                        </div>
                        <div className="match-vs">VS</div>
                        <div className={`match-team ${match.winner === match.team2 ? 'winner' : ''}`}>
                          <span className="team-flag-small">{getTeamFlag(match.team2)}</span>
                          <span className="team-name-small">{getTeamName(match.team2)}</span>
                          <span className="match-score">{match.score2}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {semiMatches.length > 0 && (
              <div className="round-section">
                <h2 className="round-title">{getRoundTitle('semi')}</h2>
                <div className="matches-grid">
                  {semiMatches.map((match) => (
                    <div key={match.id} className="knockout-match">
                      <div className="match-teams">
                        <div className={`match-team ${match.winner === match.team1 ? 'winner' : ''}`}>
                          <span className="team-flag-small">{getTeamFlag(match.team1)}</span>
                          <span className="team-name-small">{getTeamName(match.team1)}</span>
                          <span className="match-score">{match.score1}</span>
                        </div>
                        <div className="match-vs">VS</div>
                        <div className={`match-team ${match.winner === match.team2 ? 'winner' : ''}`}>
                          <span className="team-flag-small">{getTeamFlag(match.team2)}</span>
                          <span className="team-name-small">{getTeamName(match.team2)}</span>
                          <span className="match-score">{match.score2}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {thirdMatch && (
              <div className="round-section">
                <h2 className="round-title">{getRoundTitle('third')}</h2>
                <div className="matches-grid">
                  <div className="knockout-match">
                    <div className="match-teams">
                      <div className={`match-team ${thirdMatch.winner === thirdMatch.team1 ? 'winner' : ''}`}>
                        <span className="team-flag-small">{getTeamFlag(thirdMatch.team1)}</span>
                        <span className="team-name-small">{getTeamName(thirdMatch.team1)}</span>
                        <span className="match-score">{thirdMatch.score1}</span>
                      </div>
                      <div className="match-vs">VS</div>
                      <div className={`match-team ${thirdMatch.winner === thirdMatch.team2 ? 'winner' : ''}`}>
                        <span className="team-flag-small">{getTeamFlag(thirdMatch.team2)}</span>
                        <span className="team-name-small">{getTeamName(thirdMatch.team2)}</span>
                        <span className="match-score">{thirdMatch.score2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {finalMatch && (
              <div className="round-section final-section">
                <h2 className="round-title final-title">🏆 {getRoundTitle('final')}</h2>
                <div className="final-match">
                  <div className="match-teams">
                    <div className={`match-team final-team ${finalMatch.winner === finalMatch.team1 ? 'champion' : ''}`}>
                      <span className="team-flag-large-final">{getTeamFlag(finalMatch.team1)}</span>
                      <span className="team-name-large-final">{getTeamName(finalMatch.team1)}</span>
                      <span className="match-score-final">{finalMatch.score1}</span>
                    </div>
                    <div className="match-vs-final">VS</div>
                    <div className={`match-team final-team ${finalMatch.winner === finalMatch.team2 ? 'champion' : ''}`}>
                      <span className="team-flag-large-final">{getTeamFlag(finalMatch.team2)}</span>
                      <span className="team-name-large-final">{getTeamName(finalMatch.team2)}</span>
                      <span className="match-score-final">{finalMatch.score2}</span>
                    </div>
                  </div>
                  {finalMatch.winner && (
                    <div className="champion-announcement">
                      <div className="champion-crown">👑</div>
                      <div className="champion-name">{getTeamName(finalMatch.winner)}</div>
                      <div className="champion-subtitle">Champion d'Afrique 2025</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

