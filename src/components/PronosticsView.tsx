import { useState } from 'react';
import { qualifiedTeams } from '../data/qualifications';
import { groups, type Group } from '../data/groups';
import { pronostics, type SimulatedGroup, type SimulatedMatch, type KnockoutMatch } from '../data/pronostics';
import { matches } from '../data/matches';
import GroupTable from './GroupTable';
import Navigation from './Navigation';
import './PronosticsView.css';

export default function PronosticsView() {
  const [activeTab, setActiveTab] = useState<'groupes' | '8emes' | 'quarts' | 'demis' | 'finale' | 'bracket'>('groupes');

  // Charger directement les pronostics depuis le JSON
  const simulatedGroups: SimulatedGroup[] = pronostics?.groups || [];
  const simulatedMatches: SimulatedMatch[] = pronostics?.matches || [];
  const knockoutMatches: KnockoutMatch[] = pronostics?.knockoutMatches || [];
  
  // Obtenir le nom et le drapeau d'une équipe
  const getTeamInfo = (teamId: string) => {
    for (const group of groups) {
      const team = group.teams.find(t => t.id === teamId);
      if (team) return { name: team.name, flag: team.flag };
    }
    return { name: teamId, flag: '🏴' };
  };
  
  // Grouper les matchs par jour (date)
  const matchesWithDates = simulatedMatches.map(simMatch => {
    const originalMatch = matches.find(m => m.id === simMatch.matchId);
    return {
      ...simMatch,
      date: originalMatch?.date || '',
      time: originalMatch?.time || '',
      groupId: simMatch.groupId
    };
  });

  // Grouper par date
  const matchesByDate: { [key: string]: typeof matchesWithDates } = {};
  matchesWithDates.forEach(match => {
    if (!match.date) return;
    if (!matchesByDate[match.date]) {
      matchesByDate[match.date] = [];
    }
    matchesByDate[match.date].push(match);
  });

  // Trier les dates et les matchs dans chaque date
  const sortedDates = Object.keys(matchesByDate).sort();
  sortedDates.forEach(date => {
    matchesByDate[date].sort((a, b) => {
      // Trier par heure
      if (a.time !== b.time) return a.time.localeCompare(b.time);
      return 0;
    });
  });

  // Filtrer les matchs par phase
  const getMatchesByRound = (round: string) => {
    return knockoutMatches.filter(m => m.round === round);
  };

  const r16Matches = getMatchesByRound('8emes');
  const qfMatches = getMatchesByRound('quarts');
  const sfMatches = getMatchesByRound('demis');
  const finalMatch = knockoutMatches.find(m => m.round === 'finale');
  const thirdPlaceMatch = knockoutMatches.find(m => m.round === 'petite-finale');

  // Rendu d'un match bracket simple (pour le tableau)
  const renderBracketMatch = (match: KnockoutMatch, showScore: boolean = true) => {
    const team1Info = getTeamInfo(match.team1);
    const team2Info = getTeamInfo(match.team2);
    const pred = match.prediction;
    const hasPenalties = pred.penalties !== null;

    return (
      <div className="bracket-matchup">
        <div className={`bracket-team-row ${pred.winner === match.team1 ? 'qualified' : ''}`}>
          <span className="team-flag-sm">{team1Info.flag}</span>
          <span className="team-name-sm">{team1Info.name.toUpperCase()}</span>
          {showScore && (
            <span className="team-score-sm">
              {pred.score1}
              {hasPenalties && pred.winner === match.team1 && <sup>({pred.penalties?.team1})</sup>}
            </span>
          )}
        </div>
        <div className={`bracket-team-row ${pred.winner === match.team2 ? 'qualified' : ''}`}>
          <span className="team-flag-sm">{team2Info.flag}</span>
          <span className="team-name-sm">{team2Info.name.toUpperCase()}</span>
          {showScore && (
            <span className="team-score-sm">
              {pred.score2}
              {hasPenalties && pred.winner === match.team2 && <sup>({pred.penalties?.team2})</sup>}
            </span>
          )}
        </div>
        {pred.extraTime && showScore && (
          <div className="bracket-extra-tag">{hasPenalties ? 'TAB' : 'A.P.'}</div>
        )}
      </div>
    );
  };

  // Rendu d'un match knockout
  const renderKnockoutMatch = (match: KnockoutMatch) => {
    const team1Info = getTeamInfo(match.team1);
    const team2Info = getTeamInfo(match.team2);
    const pred = match.prediction;
    const isWinner1 = pred.winner === match.team1;
    const isWinner2 = pred.winner === match.team2;

    const dateObj = new Date(match.date);
    const dateStr = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });

    const confidenceLabel = {
      'very_high': '🔥 Très sûr',
      'high': '✅ Confiant',
      'medium': '⚖️ Équilibré',
      'low': '❓ Incertain'
    };

    return (
      <div key={match.matchId} className={`knockout-match-card ${match.round === 'finale' ? 'final-match-card' : ''}`}>
        <div className="knockout-match-header">
          <span className="knockout-date">{dateStr} - {match.time}</span>
          <span className={`confidence-badge ${pred.confidence}`}>{confidenceLabel[pred.confidence]}</span>
        </div>

        <div className="knockout-teams">
          <div className={`knockout-team ${isWinner1 ? 'winner' : ''}`}>
            <span className="knockout-flag">{team1Info.flag}</span>
            <span className="knockout-name">{team1Info.name}</span>
            <span className="knockout-score">{pred.score1}</span>
          </div>

          <div className="knockout-vs">VS</div>

          <div className={`knockout-team ${isWinner2 ? 'winner' : ''}`}>
            <span className="knockout-score">{pred.score2}</span>
            <span className="knockout-name">{team2Info.name}</span>
            <span className="knockout-flag">{team2Info.flag}</span>
          </div>
        </div>

        {pred.extraTime && (
          <div className="knockout-extra">
            {pred.penalties ? (
              <span className="penalties-badge">
                ⚽ TAB: {pred.penalties.team1} - {pred.penalties.team2}
              </span>
            ) : (
              <span className="extra-time-badge">⏱️ Après prolongation</span>
            )}
          </div>
        )}

        <div className="knockout-analysis">
          <p>{pred.analysis}</p>
        </div>
      </div>
    );
  };

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
            <p className="subtitle">Maroc 🇲🇦 - Pronostics</p>
          </div>
        </header>

        {/* Onglets de navigation */}
        <div className="phase-tabs">
          <button
            className={`phase-tab ${activeTab === 'groupes' ? 'active' : ''}`}
            onClick={() => setActiveTab('groupes')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-text">Groupes</span>
          </button>
          <button
            className={`phase-tab ${activeTab === '8emes' ? 'active' : ''}`}
            onClick={() => setActiveTab('8emes')}
          >
            <span className="tab-icon">🎯</span>
            <span className="tab-text">1/8</span>
          </button>
          <button
            className={`phase-tab ${activeTab === 'quarts' ? 'active' : ''}`}
            onClick={() => setActiveTab('quarts')}
          >
            <span className="tab-icon">🔥</span>
            <span className="tab-text">1/4</span>
          </button>
          <button
            className={`phase-tab ${activeTab === 'demis' ? 'active' : ''}`}
            onClick={() => setActiveTab('demis')}
          >
            <span className="tab-icon">⭐</span>
            <span className="tab-text">1/2</span>
          </button>
          <button
            className={`phase-tab ${activeTab === 'finale' ? 'active' : ''}`}
            onClick={() => setActiveTab('finale')}
          >
            <span className="tab-icon">🏆</span>
            <span className="tab-text">Finale</span>
          </button>
          <button
            className={`phase-tab bracket-tab ${activeTab === 'bracket' ? 'active' : ''}`}
            onClick={() => setActiveTab('bracket')}
          >
            <span className="tab-icon">📋</span>
            <span className="tab-text">Tableau</span>
          </button>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'groupes' && (
          <>
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
        
        {/* Affichage des matchs avec résultats par jour */}
        {simulatedMatches.length > 0 && (
          <div className="matches-results-section">
            <h2 className="section-title">Résultats des Matchs par Jour</h2>
            {sortedDates.map((date) => {
              const dayMatches = matchesByDate[date];
              const dateObj = new Date(date);
              const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'long' });
              const dateFormatted = dateObj.toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              });
              
              return (
                <div key={date} className="group-matches-container">
                  <h3 className="group-matches-title">
                    {dayName.charAt(0).toUpperCase() + dayName.slice(1)} {dateFormatted}
                  </h3>
                  <div className="matches-grid-pronostics">
                    {dayMatches.map((match) => {
                      const team1Info = getTeamInfo(match.team1);
                      const team2Info = getTeamInfo(match.team2);
                      const winner = match.score1 > match.score2 ? match.team1 : 
                                    match.score2 > match.score1 ? match.team2 : null;
                      const groupInfo = groups.find(g => g.id === match.groupId);
                      
                      return (
                        <div key={match.matchId} className="match-result-card">
                          <div className="match-result-date">
                            {match.time} - {groupInfo?.name || `Groupe ${match.groupId}`}
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
              );
            })}
          </div>
        )}
      </section>
          </>
        )}

        {/* 8èmes de finale - Format Bracket */}
        {activeTab === '8emes' && (
          <section className="knockout-section">
            <h2 className="section-title">🎯 Huitièmes de Finale</h2>
            <p className="section-subtitle">3-6 janvier 2026</p>
            <div className="bracket-phase">
              <div className="bracket-phase-side">
                <h3 className="bracket-phase-title">Côté Gauche</h3>
                <div className="bracket-phase-matches">
                  {r16Matches[0] && renderBracketMatch(r16Matches[0])}
                  {r16Matches[1] && renderBracketMatch(r16Matches[1])}
                  {r16Matches[4] && renderBracketMatch(r16Matches[4])}
                  {r16Matches[7] && renderBracketMatch(r16Matches[7])}
                </div>
              </div>
              <div className="bracket-phase-side">
                <h3 className="bracket-phase-title">Côté Droit</h3>
                <div className="bracket-phase-matches">
                  {r16Matches[3] && renderBracketMatch(r16Matches[3])}
                  {r16Matches[2] && renderBracketMatch(r16Matches[2])}
                  {r16Matches[5] && renderBracketMatch(r16Matches[5])}
                  {r16Matches[6] && renderBracketMatch(r16Matches[6])}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quarts de finale - Format Bracket */}
        {activeTab === 'quarts' && (
          <section className="knockout-section">
            <h2 className="section-title">🔥 Quarts de Finale</h2>
            <p className="section-subtitle">9-10 janvier 2026</p>
            <div className="bracket-phase">
              <div className="bracket-phase-side">
                <h3 className="bracket-phase-title">Côté Gauche</h3>
                <div className="bracket-phase-matches">
                  {qfMatches[0] && renderBracketMatch(qfMatches[0])}
                  {qfMatches[1] && renderBracketMatch(qfMatches[1])}
                </div>
              </div>
              <div className="bracket-phase-side">
                <h3 className="bracket-phase-title">Côté Droit</h3>
                <div className="bracket-phase-matches">
                  {qfMatches[2] && renderBracketMatch(qfMatches[2])}
                  {qfMatches[3] && renderBracketMatch(qfMatches[3])}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Demi-finales - Format Bracket */}
        {activeTab === 'demis' && (
          <section className="knockout-section">
            <h2 className="section-title">⭐ Demi-Finales</h2>
            <p className="section-subtitle">14-15 janvier 2026</p>
            <div className="bracket-phase">
              <div className="bracket-phase-side">
                <h3 className="bracket-phase-title">Demi 1</h3>
                <div className="bracket-phase-matches">
                  {sfMatches[0] && renderBracketMatch(sfMatches[0])}
                </div>
              </div>
              <div className="bracket-phase-side derby-side">
                <h3 className="bracket-phase-title derby-title">Demi 2 - DERBY DU MAGHREB</h3>
                <div className="bracket-phase-matches">
                  {sfMatches[1] && renderBracketMatch(sfMatches[1])}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Finale */}
        {activeTab === 'finale' && (
          <section className="knockout-section finale-section">
            <h2 className="section-title">🏆 FINALE</h2>
            <p className="section-subtitle">18 janvier 2026 - Rabat</p>

            {finalMatch && (
              <div className="final-container">
                {renderKnockoutMatch(finalMatch)}

                {/* Annonce du champion */}
                <div className="champion-box">
                  <div className="champion-crown">👑</div>
                  <div className="champion-title">CHAMPION CAN 2025</div>
                  <div className="champion-team">
                    <span className="champion-flag">{getTeamInfo(finalMatch.prediction.winner).flag}</span>
                    <span className="champion-name">{getTeamInfo(finalMatch.prediction.winner).name}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Petite finale */}
            {thirdPlaceMatch && (
              <div className="third-place-section">
                <h3 className="third-place-title">🥉 Match pour la 3ème place</h3>
                <p className="section-subtitle">17 janvier 2026</p>
                {renderKnockoutMatch(thirdPlaceMatch)}
              </div>
            )}
          </section>
        )}

        {/* Bracket complet - Format officiel CAF */}
        {activeTab === 'bracket' && (
          <section className="bracket-section">
            <h2 className="section-title">📋 Tableau Complet CAN 2025</h2>
            <p className="section-subtitle">Les affiches des phases éliminatoires</p>

            <div className="bracket-official">
              {/* CÔTÉ GAUCHE */}
              <div className="bracket-side bracket-left">
                {/* 8èmes gauche */}
                <div className="bracket-column r16-col">
                  {r16Matches[0] && renderBracketMatch(r16Matches[0])}
                  {r16Matches[1] && renderBracketMatch(r16Matches[1])}
                  {r16Matches[4] && renderBracketMatch(r16Matches[4])}
                  {r16Matches[7] && renderBracketMatch(r16Matches[7])}
                </div>

                {/* Quarts gauche */}
                <div className="bracket-column qf-col">
                  <div className="bracket-label">1/4</div>
                  {qfMatches[0] && renderBracketMatch(qfMatches[0])}
                  <div className="bracket-label">1/4</div>
                  {qfMatches[1] && renderBracketMatch(qfMatches[1])}
                </div>

                {/* Demi gauche */}
                <div className="bracket-column sf-col">
                  <div className="bracket-label">1/2</div>
                  {sfMatches[0] && renderBracketMatch(sfMatches[0])}
                </div>
              </div>

              {/* CENTRE - FINALE */}
              <div className="bracket-center">
                <div className="finale-label">FINALE</div>
                {finalMatch && (() => {
                  const team1Info = getTeamInfo(finalMatch.team1);
                  const team2Info = getTeamInfo(finalMatch.team2);
                  const pred = finalMatch.prediction;
                  return (
                    <div className="finale-matchup">
                      <div className={`finale-team ${pred.winner === finalMatch.team1 ? 'champion' : ''}`}>
                        <span className="finale-flag">{team1Info.flag}</span>
                        <span className="finale-name">{team1Info.name}</span>
                        <span className="finale-score">{pred.score1}</span>
                      </div>
                      <div className="finale-vs">VS</div>
                      <div className={`finale-team ${pred.winner === finalMatch.team2 ? 'champion' : ''}`}>
                        <span className="finale-flag">{team2Info.flag}</span>
                        <span className="finale-name">{team2Info.name}</span>
                        <span className="finale-score">{pred.score2}</span>
                      </div>
                    </div>
                  );
                })()}
                {/* Champion */}
                {finalMatch && (
                  <div className="bracket-champion-box">
                    <div className="champion-crown-sm">👑</div>
                    <div className="champion-info">
                      <span className="champion-flag-lg">{getTeamInfo(finalMatch.prediction.winner).flag}</span>
                      <span className="champion-name-lg">{getTeamInfo(finalMatch.prediction.winner).name}</span>
                    </div>
                    <div className="champion-label">CHAMPION CAN 2025</div>
                  </div>
                )}
              </div>

              {/* CÔTÉ DROIT */}
              <div className="bracket-side bracket-right">
                {/* Demi droite */}
                <div className="bracket-column sf-col">
                  <div className="bracket-label derby-bracket-label">DERBY MAGHREB</div>
                  {sfMatches[1] && renderBracketMatch(sfMatches[1])}
                </div>

                {/* Quarts droite */}
                <div className="bracket-column qf-col">
                  <div className="bracket-label">1/4</div>
                  {qfMatches[2] && renderBracketMatch(qfMatches[2])}
                  <div className="bracket-label">1/4</div>
                  {qfMatches[3] && renderBracketMatch(qfMatches[3])}
                </div>

                {/* 8èmes droite */}
                <div className="bracket-column r16-col">
                  {r16Matches[3] && renderBracketMatch(r16Matches[3])}
                  {r16Matches[2] && renderBracketMatch(r16Matches[2])}
                  {r16Matches[5] && renderBracketMatch(r16Matches[5])}
                  {r16Matches[6] && renderBracketMatch(r16Matches[6])}
                </div>
              </div>
            </div>

            {/* Légende */}
            <div className="bracket-legend">
              <span className="legend-item"><span className="legend-qualified"></span> Qualifié</span>
              <span className="legend-item"><span className="legend-eliminated"></span> Éliminé</span>
              <span className="legend-item">TAB = Tirs au but</span>
              <span className="legend-item">A.P. = Après prolongation</span>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
