import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Résultats réels jusqu'à aujourd'hui (24 décembre 2025)
const realResults = {
  'match-1': { team1: 'comores', team2: 'maroc', score1: 0, score2: 2 }, // 21.12. 20:00
  'match-2': { team1: 'mali', team2: 'zambie', score1: 1, score2: 1 }, // 22.12. 15:00
  'match-3': { team1: 'afrique-du-sud', team2: 'angola', score1: 2, score2: 1 }, // 22.12. 18:00
  'match-4': { team1: 'egypte', team2: 'zimbabwe', score1: 2, score2: 1 }, // 22.12. 21:00
  'match-7': { team1: 'rd-congo', team2: 'benin', score1: 1, score2: 0 }, // 23.12. 13:30
  'match-8': { team1: 'botswana', team2: 'senegal', score1: 0, score2: 3 }, // 23.12. 16:00
  'match-5': { team1: 'nigeria', team2: 'tanzanie', score1: 2, score2: 1 }, // 23.12. 18:30
  'match-6': { team1: 'tunisie', team2: 'ouganda', score1: 3, score2: 1 }, // 23.12. 21:00
};

// Équipes qualifiées cibles avec points finaux
const qualifiedTeams = [
  { teamId: 'maroc', position: 1, groupId: 'A', targetPoints: 9 },
  { teamId: 'mali', position: 2, groupId: 'A', targetPoints: 4 },
  { teamId: 'comores', position: 3, groupId: 'A', targetPoints: 3 },
  { teamId: 'egypte', position: 1, groupId: 'B', targetPoints: 7 },
  { teamId: 'afrique-du-sud', position: 2, groupId: 'B', targetPoints: 6 },
  { teamId: 'angola', position: 3, groupId: 'B', targetPoints: 4 },
  { teamId: 'tunisie', position: 1, groupId: 'C', targetPoints: 9 },
  { teamId: 'nigeria', position: 2, groupId: 'C', targetPoints: 6 },
  { teamId: 'ouganda', position: 3, groupId: 'C', targetPoints: 3 },
  { teamId: 'senegal', position: 1, groupId: 'D', targetPoints: 7 },
  { teamId: 'rd-congo', position: 2, groupId: 'D', targetPoints: 4 },
  { teamId: 'algerie', position: 1, groupId: 'E', targetPoints: 9 },
  { teamId: 'burkina-faso', position: 2, groupId: 'E', targetPoints: 6 },
  { teamId: 'guinee-equatoriale', position: 3, groupId: 'E', targetPoints: 3 },
  { teamId: 'cote-d-ivoire', position: 1, groupId: 'F', targetPoints: 7 },
  { teamId: 'cameroun', position: 2, groupId: 'F', targetPoints: 3 },
];

// Données des groupes avec noms et drapeaux
const groupsData = [
  { id: 'A', teams: [
    { id: 'maroc', name: 'Maroc', flag: '🇲🇦' },
    { id: 'mali', name: 'Mali', flag: '🇲🇱' },
    { id: 'zambie', name: 'Zambie', flag: '🇿🇲' },
    { id: 'comores', name: 'Comores', flag: '🇰🇲' }
  ]},
  { id: 'B', teams: [
    { id: 'egypte', name: 'Egypte', flag: '🇪🇬' },
    { id: 'afrique-du-sud', name: 'Afrique du Sud', flag: '🇿🇦' },
    { id: 'angola', name: 'Angola', flag: '🇦🇴' },
    { id: 'zimbabwe', name: 'Zimbabwe', flag: '🇿🇼' }
  ]},
  { id: 'C', teams: [
    { id: 'tunisie', name: 'Tunisie', flag: '🇹🇳' },
    { id: 'nigeria', name: 'Nigéria', flag: '🇳🇬' },
    { id: 'ouganda', name: 'Ouganda', flag: '🇺🇬' },
    { id: 'tanzanie', name: 'Tanzanie', flag: '🇹🇿' }
  ]},
  { id: 'D', teams: [
    { id: 'senegal', name: 'Sénégal', flag: '🇸🇳' },
    { id: 'rd-congo', name: 'RD Congo', flag: '🇨🇩' },
    { id: 'botswana', name: 'Botswana', flag: '🇧🇼' },
    { id: 'benin', name: 'Bénin', flag: '🇧🇯' }
  ]},
  { id: 'E', teams: [
    { id: 'algerie', name: 'Algérie', flag: '🇩🇿' },
    { id: 'burkina-faso', name: 'Burkina Faso', flag: '🇧🇫' },
    { id: 'guinee-equatoriale', name: 'Guinée Équatoriale', flag: '🇬🇶' },
    { id: 'soudan', name: 'Soudan', flag: '🇸🇩' }
  ]},
  { id: 'F', teams: [
    { id: 'cote-d-ivoire', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { id: 'cameroun', name: 'Cameroun', flag: '🇨🇲' },
    { id: 'mozambique', name: 'Mozambique', flag: '🇲🇿' },
    { id: 'gabon', name: 'Gabon', flag: '🇬🇦' }
  ]}
];

// Calculer les classements réels actuels
const calculateRealStandings = () => {
  const standings = {};
  
  groupsData.forEach(group => {
    group.teams.forEach(team => {
      standings[team.id] = {
        id: team.id,
        name: team.name,
        flag: team.flag,
        groupId: group.id,
        played: 0, won: 0, drawn: 0, lost: 0,
        goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
      };
    });
  });
  
  // Appliquer les résultats réels
  for (const [matchId, result] of Object.entries(realResults)) {
    const team1 = standings[result.team1];
    const team2 = standings[result.team2];
    
    if (team1 && team2) {
      team1.played++;
      team2.played++;
      team1.goalsFor += result.score1;
      team1.goalsAgainst += result.score2;
      team2.goalsFor += result.score2;
      team2.goalsAgainst += result.score1;
      
      if (result.score1 > result.score2) {
        team1.won++;
        team1.points += 3;
        team2.lost++;
      } else if (result.score2 > result.score1) {
        team2.won++;
        team2.points += 3;
        team1.lost++;
      } else {
        team1.drawn++;
        team2.drawn++;
        team1.points += 1;
        team2.points += 1;
      }
    }
  }
  
  // Calculer les différences de buts
  Object.values(standings).forEach(team => {
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });
  
  return standings;
};

const realStandings = calculateRealStandings();

// Lire les pronostics actuels et les matchs
const pronosticsPath = join(__dirname, '../src/data/pronostics.json');
const currentPronostics = JSON.parse(readFileSync(pronosticsPath, 'utf-8'));

// Trouver les matchs restants
const remainingMatches = currentPronostics.matches.filter(m => !realResults[m.matchId]);

// Fonction pour calculer les points nécessaires pour atteindre l'objectif
const calculatePointsNeeded = (teamId, groupId) => {
  const qualified = qualifiedTeams.find(q => q.teamId === teamId && q.groupId === groupId);
  if (!qualified) return null;
  
  const current = realStandings[teamId];
  const remaining = 3 - current.played;
  const needed = qualified.targetPoints - current.points;
  
  return { needed, remaining, current: current.points, target: qualified.targetPoints };
};

// Fonction pour générer un score intelligent basé sur les besoins
const generateSmartScore = (team1Id, team2Id, groupId) => {
  const team1 = realStandings[team1Id];
  const team2 = realStandings[team2Id];
  const needs1 = calculatePointsNeeded(team1Id, groupId);
  const needs2 = calculatePointsNeeded(team2Id, groupId);
  
  const qualified1 = qualifiedTeams.find(q => q.teamId === team1Id && q.groupId === groupId);
  const qualified2 = qualifiedTeams.find(q => q.teamId === team2Id && q.groupId === groupId);
  
  // Si les deux sont qualifiées, favoriser selon leur position
  if (qualified1 && qualified2) {
    if (qualified1.position < qualified2.position) {
      // Team1 mieux classée, doit gagner
      if (needs1 && needs1.needed > 0) {
        const score1 = Math.floor(Math.random() * 2) + 1; // 1-2 buts
        const score2 = Math.random() < 0.3 ? Math.floor(Math.random() * 2) : 0; // 0-1 but
        return { score1, score2 };
      }
    } else {
      // Team2 mieux classée
      if (needs2 && needs2.needed > 0) {
        const score2 = Math.floor(Math.random() * 2) + 1;
        const score1 = Math.random() < 0.3 ? Math.floor(Math.random() * 2) : 0;
        return { score1, score2 };
      }
    }
  }
  
  // Si une seule est qualifiée, favoriser celle-ci
  if (qualified1 && !qualified2) {
    if (needs1 && needs1.needed >= 3) {
      // Besoin d'une victoire
      const score1 = Math.floor(Math.random() * 2) + 1;
      const score2 = Math.random() < 0.2 ? Math.floor(Math.random() * 2) : 0;
      return { score1, score2 };
    } else if (needs1 && needs1.needed === 1) {
      // Besoin d'un match nul
      return { score1: 1, score2: 1 };
    }
  }
  
  if (qualified2 && !qualified1) {
    if (needs2 && needs2.needed >= 3) {
      const score2 = Math.floor(Math.random() * 2) + 1;
      const score1 = Math.random() < 0.2 ? Math.floor(Math.random() * 2) : 0;
      return { score1, score2 };
    } else if (needs2 && needs2.needed === 1) {
      return { score1: 1, score2: 1 };
    }
  }
  
  // Match équilibré basé sur la forme actuelle
  const strength1 = team1.points + (team1.goalDifference / 10);
  const strength2 = team2.points + (team2.goalDifference / 10);
  const diff = strength1 - strength2;
  
  if (Math.abs(diff) < 0.5) {
    // Match nul probable
    const drawScore = Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 2) + 1;
    return { score1: drawScore, score2: drawScore };
  } else if (diff > 0) {
    // Team1 favorisée
    const score1 = Math.floor(Math.random() * 2) + 1;
    const score2 = Math.random() < 0.4 ? Math.floor(Math.random() * 2) : 0;
    return { score1, score2 };
  } else {
    // Team2 favorisée
    const score2 = Math.floor(Math.random() * 2) + 1;
    const score1 = Math.random() < 0.4 ? Math.floor(Math.random() * 2) : 0;
    return { score1, score2 };
  }
};

// Simuler les matchs restants avec ajustement pour atteindre les objectifs
const simulateRemainingMatches = () => {
  const tempStandings = JSON.parse(JSON.stringify(realStandings));
  const newPronostics = [];
  
  // Ajouter d'abord les résultats réels
  for (const [matchId, result] of Object.entries(realResults)) {
    newPronostics.push({
      matchId,
      groupId: tempStandings[result.team1].groupId,
      team1: result.team1,
      team2: result.team2,
      score1: result.score1,
      score2: result.score2
    });
  }
  
  // Simuler les matchs restants
  for (const match of remainingMatches) {
    const team1 = tempStandings[match.team1];
    const team2 = tempStandings[match.team2];
    
    if (!team1 || !team2) continue;
    
    // Générer un score intelligent
    let score = generateSmartScore(match.team1, match.team2, match.groupId);
    
    // Ajuster pour atteindre les objectifs si nécessaire
    const needs1 = calculatePointsNeeded(match.team1, match.groupId);
    const needs2 = calculatePointsNeeded(match.team2, match.groupId);
    
    if (needs1 && needs1.needed > 0 && needs1.remaining === 1) {
      // Dernier match, besoin exact de points
      if (needs1.needed >= 3 && score.score1 <= score.score2) {
        score = { score1: Math.max(score.score1, 1), score2: Math.min(score.score2, score.score1 - 1) };
        if (score.score1 <= score.score2) score.score1 = score.score2 + 1;
      } else if (needs1.needed === 1 && score.score1 !== score.score2) {
        score = { score1: 1, score2: 1 };
      }
    }
    
    if (needs2 && needs2.needed > 0 && needs2.remaining === 1) {
      if (needs2.needed >= 3 && score.score2 <= score.score1) {
        score = { score1: Math.min(score.score1, score.score2 - 1), score2: Math.max(score.score2, 1) };
        if (score.score2 <= score.score1) score.score2 = score.score1 + 1;
      } else if (needs2.needed === 1 && score.score1 !== score.score2) {
        score = { score1: 1, score2: 1 };
      }
    }
    
    newPronostics.push({
      matchId: match.matchId,
      groupId: match.groupId,
      team1: match.team1,
      team2: match.team2,
      score1: score.score1,
      score2: score.score2
    });
    
    // Mettre à jour les statistiques temporaires
    team1.played++;
    team2.played++;
    team1.goalsFor += score.score1;
    team1.goalsAgainst += score.score2;
    team2.goalsFor += score.score2;
    team2.goalsAgainst += score.score1;
    
    if (score.score1 > score.score2) {
      team1.won++;
      team1.points += 3;
      team2.lost++;
    } else if (score.score2 > score.score1) {
      team2.won++;
      team2.points += 3;
      team1.lost++;
    } else {
      team1.drawn++;
      team2.drawn++;
      team1.points += 1;
      team2.points += 1;
    }
    
    team1.goalDifference = team1.goalsFor - team1.goalsAgainst;
    team2.goalDifference = team2.goalsFor - team2.goalsAgainst;
  }
  
  return { pronostics: newPronostics, standings: tempStandings };
};

const { pronostics: improvedPronostics, standings: finalStandings } = simulateRemainingMatches();

// Générer les classements finaux
const finalGroups = groupsData.map(group => {
  const groupTeams = Object.values(finalStandings)
    .filter(t => t.groupId === group.id)
    .map(team => {
      const teamData = group.teams.find(t => t.id === team.id);
      return {
        id: team.id,
        name: teamData?.name || team.name,
        flag: teamData?.flag || team.flag || '🏴',
        played: team.played,
        won: team.won,
        drawn: team.drawn,
        lost: team.lost,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
        goalDifference: team.goalDifference,
        points: team.points
      };
    })
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  
  return {
    id: group.id,
    name: `Groupe ${group.id}`,
    teams: groupTeams
  };
});

// Sauvegarder
const output = {
  matches: improvedPronostics,
  groups: finalGroups
};

writeFileSync(pronosticsPath, JSON.stringify(output, null, 2));

console.log('\n✅ Pronostics améliorés générés avec succès!\n');
console.log('📊 RÉSUMÉ:');
console.log(`   - Matchs réels intégrés: ${Object.keys(realResults).length}`);
console.log(`   - Matchs pronostiqués: ${remainingMatches.length}`);
console.log(`   - Total: ${improvedPronostics.length} matchs\n`);

