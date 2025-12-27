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

// Lire les pronostics actuels
const pronosticsPath = join(__dirname, '../src/data/pronostics.json');
const currentPronostics = JSON.parse(readFileSync(pronosticsPath, 'utf-8'));

// Analyser les pronostics
console.log('\n📊 ANALYSE DES PRONOSTICS\n');
console.log('='.repeat(60));

let correctWinner = 0;
let exactScore = 0;
let totalAnalyzed = 0;
const analysis = [];

for (const [matchId, realResult] of Object.entries(realResults)) {
  const myPronostic = currentPronostics.matches.find(m => m.matchId === matchId);
  if (!myPronostic) continue;
  
  totalAnalyzed++;
  
  // Déterminer le gagnant réel
  const realWinner = realResult.score1 > realResult.score2 ? realResult.team1 :
                     realResult.score2 > realResult.score1 ? realResult.team2 : null;
  
  // Déterminer mon gagnant prédit
  const myWinner = myPronostic.score1 > myPronostic.score2 ? myPronostic.team1 :
                   myPronostic.score2 > myPronostic.score1 ? myPronostic.team2 : null;
  
  const winnerCorrect = realWinner === myWinner;
  const scoreExact = myPronostic.score1 === realResult.score1 && 
                     myPronostic.score2 === realResult.score2;
  
  if (winnerCorrect) correctWinner++;
  if (scoreExact) exactScore++;
  
  analysis.push({
    matchId,
    real: `${realResult.team1} ${realResult.score1}-${realResult.score2} ${realResult.team2}`,
    predicted: `${myPronostic.team1} ${myPronostic.score1}-${myPronostic.score2} ${myPronostic.team2}`,
    winnerCorrect,
    scoreExact
  });
  
  const status = winnerCorrect ? (scoreExact ? '✅ EXACT' : '✅ GAGNANT') : '❌ ERREUR';
  console.log(`${status} | Match ${matchId}`);
  console.log(`   Réel:     ${realResult.team1} ${realResult.score1}-${realResult.score2} ${realResult.team2}`);
  console.log(`   Prédit:   ${myPronostic.team1} ${myPronostic.score1}-${myPronostic.score2} ${myPronostic.team2}`);
  console.log('');
}

// Calculer les statistiques
const winnerRate = ((correctWinner / totalAnalyzed) * 100).toFixed(1);
const exactRate = ((exactScore / totalAnalyzed) * 100).toFixed(1);

console.log('='.repeat(60));
console.log(`📈 STATISTIQUES:`);
console.log(`   Matchs analysés: ${totalAnalyzed}`);
console.log(`   Gagnants corrects: ${correctWinner}/${totalAnalyzed} (${winnerRate}%)`);
console.log(`   Scores exacts: ${exactScore}/${totalAnalyzed} (${exactRate}%)`);
console.log('='.repeat(60));

// Lire les données des groupes
const groupsPath = join(__dirname, '../src/data/groups.ts');
const groupsContent = readFileSync(groupsPath, 'utf-8');

// Extraire les groupes depuis le fichier (méthode simplifiée)
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

// Calculer les classements réels actuels basés sur les résultats réels
const calculateRealStandings = () => {
  const standings = {};
  
  // Initialiser les équipes depuis les groupes
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

console.log('\n📋 CLASSEMENTS RÉELS ACTUELS (après les matchs joués):\n');
const groups = ['A', 'B', 'C', 'D', 'E', 'F'];
groups.forEach(groupId => {
  const groupTeams = Object.values(realStandings)
    .filter(t => t.groupId === groupId)
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  
  if (groupTeams.length > 0 && groupTeams[0].played > 0) {
    console.log(`Groupe ${groupId}:`);
    groupTeams.forEach((team, idx) => {
      console.log(`  ${idx + 1}. ${team.id}: ${team.points}pts (${team.won}V-${team.drawn}N-${team.lost}D, ${team.goalsFor}:${team.goalsAgainst})`);
    });
    console.log('');
  }
});

// Générer de nouveaux pronostics améliorés pour les matchs restants
console.log('\n🎯 GÉNÉRATION DE NOUVEAUX PRONOSTICS AMÉLIORÉS\n');
console.log('='.repeat(60));

// Équipes qualifiées cibles
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

// Fonction pour générer un score réaliste basé sur la force relative
const generateRealisticScore = (team1Strength, team2Strength, isQualified1, isQualified2) => {
  const diff = team1Strength - team2Strength;
  
  // Si équipe qualifiée vs non-qualifiée, favoriser la qualifiée
  if (isQualified1 && !isQualified2) {
    if (Math.random() < 0.7) {
      // Victoire probable
      const goals1 = Math.floor(Math.random() * 3) + 1; // 1-3 buts
      const goals2 = Math.random() < 0.3 ? Math.floor(Math.random() * 2) : 0; // 0-1 but
      return { score1: goals1, score2: goals2 };
    } else {
      // Match nul possible
      return { score1: Math.floor(Math.random() * 2) + 1, score2: Math.floor(Math.random() * 2) + 1 };
    }
  } else if (!isQualified1 && isQualified2) {
    if (Math.random() < 0.3) {
      // Défaite probable
      const goals1 = Math.random() < 0.3 ? Math.floor(Math.random() * 2) : 0;
      const goals2 = Math.floor(Math.random() * 2) + 1;
      return { score1: goals1, score2: goals2 };
    } else {
      return { score1: Math.floor(Math.random() * 2) + 1, score2: Math.floor(Math.random() * 2) + 1 };
    }
  } else {
    // Match équilibré
    if (Math.abs(diff) < 0.3) {
      // Match nul probable
      const drawScore = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 2) + 1;
      return { score1: drawScore, score2: drawScore };
    } else {
      const winner = diff > 0 ? 1 : 2;
      const goals1 = winner === 1 ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 2);
      const goals2 = winner === 2 ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 2);
      return { score1: goals1, score2: goals2 };
    }
  }
};

// Créer une copie des pronostics avec les résultats réels
const improvedPronostics = {
  matches: [],
  groups: []
};

// Ajouter les résultats réels
for (const [matchId, result] of Object.entries(realResults)) {
  improvedPronostics.matches.push({
    matchId,
    groupId: realStandings[result.team1].groupId,
    team1: result.team1,
    team2: result.team2,
    score1: result.score1,
    score2: result.score2
  });
}

// Lire les matchs restants depuis matches.ts
const matchesPath = join(__dirname, '../src/data/matches.ts');
const matchesContent = readFileSync(matchesPath, 'utf-8');

// Extraire les matchs restants (ceux qui ne sont pas dans realResults)
const remainingMatches = currentPronostics.matches.filter(m => !realResults[m.matchId]);

console.log(`\nMatchs restants à pronostiquer: ${remainingMatches.length}\n`);

// Simuler les matchs restants en tenant compte des classements réels
const simulateRemainingMatches = () => {
  const tempStandings = JSON.parse(JSON.stringify(realStandings));
  
  for (const match of remainingMatches) {
    const team1 = tempStandings[match.team1];
    const team2 = tempStandings[match.team2];
    
    if (!team1 || !team2) continue;
    
    // Déterminer si les équipes sont qualifiées
    const qualified1 = qualifiedTeams.find(q => q.teamId === match.team1);
    const qualified2 = qualifiedTeams.find(q => q.teamId === match.team2);
    
    // Calculer la force relative basée sur les points actuels
    const strength1 = team1.points + (team1.goalDifference / 10);
    const strength2 = team2.points + (team2.goalDifference / 10);
    
    // Générer un score réaliste
    const score = generateRealisticScore(strength1, strength2, !!qualified1, !!qualified2);
    
    // Ajouter au pronostic
    improvedPronostics.matches.push({
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
  
  return tempStandings;
};

const finalStandings = simulateRemainingMatches();

// Générer les classements finaux par groupe
groups.forEach(groupId => {
  const groupData = groupsData.find(g => g.id === groupId);
  const groupTeams = Object.values(finalStandings)
    .filter(t => t.groupId === groupId)
    .map(team => {
      const teamData = groupData?.teams.find(t => t.id === team.id);
      return {
        id: team.id,
        name: teamData?.name || team.name || team.id,
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
  
  improvedPronostics.groups.push({
    id: groupId,
    name: `Groupe ${groupId}`,
    teams: groupTeams
  });
});

// Sauvegarder les nouveaux pronostics
writeFileSync(pronosticsPath, JSON.stringify(improvedPronostics, null, 2));

console.log('✅ Nouveaux pronostics générés et sauvegardés!\n');
console.log('📊 PRONOSTICS POUR LES MATCHS RESTANTS:\n');

// Afficher les pronostics pour les matchs restants
remainingMatches.forEach(match => {
  const pronostic = improvedPronostics.matches.find(m => m.matchId === match.matchId);
  if (pronostic) {
    console.log(`Match ${match.matchId}: ${pronostic.team1} ${pronostic.score1}-${pronostic.score2} ${pronostic.team2}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('✨ Analyse terminée! Les pronostics ont été améliorés.');
console.log('='.repeat(60) + '\n');

