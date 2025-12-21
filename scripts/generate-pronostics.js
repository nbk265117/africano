import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lire les données depuis les fichiers TypeScript (extraction simple)
const readDataFile = (filePath) => {
  const content = readFileSync(filePath, 'utf-8');
  // Extraire le contenu du tableau/objet exporté
  const match = content.match(/export\s+(?:const|interface|type)\s+(\w+)\s*[:=]\s*(\[[\s\S]*?\]|\{[\s\S]*?\})/);
  if (match) {
    // Évaluer le contenu (attention: nécessite que les données soient valides JSON ou JS)
    try {
      // Pour les tableaux/objets simples, on peut les extraire
      const dataMatch = content.match(/(?:export\s+const\s+\w+\s*[:=]\s*)(\[[\s\S]*?\]);/);
      if (dataMatch) {
        // Utiliser eval pour évaluer le code (dans un contexte contrôlé)
        return eval(`(${dataMatch[1]})`);
      }
    } catch (e) {
      console.error(`Erreur lors de la lecture de ${filePath}:`, e);
    }
  }
  return null;
};

// Données des équipes qualifiées avec points cibles EXACTS
const qualifiedTeams = [
  // Groupe A
  { teamId: 'maroc', teamName: 'Maroc', position: 1, groupId: 'A', targetPoints: 9 },
  { teamId: 'mali', teamName: 'Mali', position: 2, groupId: 'A', targetPoints: 4 },
  { teamId: 'comores', teamName: 'Comores', position: 3, groupId: 'A', targetPoints: 3 },
  
  // Groupe B
  { teamId: 'egypte', teamName: 'Egypte', position: 1, groupId: 'B', targetPoints: 7 },
  { teamId: 'afrique-du-sud', teamName: 'Afrique du Sud', position: 2, groupId: 'B', targetPoints: 6 },
  { teamId: 'angola', teamName: 'Angola', position: 3, groupId: 'B', targetPoints: 4 },
  
  // Groupe C
  { teamId: 'tunisie', teamName: 'Tunisie', position: 1, groupId: 'C', targetPoints: 9 },
  { teamId: 'nigeria', teamName: 'Nigéria', position: 2, groupId: 'C', targetPoints: 6 },
  { teamId: 'ouganda', teamName: 'Ouganda', position: 3, groupId: 'C', targetPoints: 3 },
  
  // Groupe D
  { teamId: 'senegal', teamName: 'Sénégal', position: 1, groupId: 'D', targetPoints: 7 },
  { teamId: 'rd-congo', teamName: 'RD Congo', position: 2, groupId: 'D', targetPoints: 4 },
  
  // Groupe E
  { teamId: 'algerie', teamName: 'Algérie', position: 1, groupId: 'E', targetPoints: 9 },
  { teamId: 'burkina-faso', teamName: 'Burkina Faso', position: 2, groupId: 'E', targetPoints: 6 },
  { teamId: 'guinee-equatoriale', teamName: 'Guinée Équatoriale', position: 3, groupId: 'E', targetPoints: 3 },
  
  // Groupe F
  { teamId: 'cote-d-ivoire', teamName: 'Côte d\'Ivoire', position: 1, groupId: 'F', targetPoints: 7 },
  { teamId: 'cameroun', teamName: 'Cameroun', position: 2, groupId: 'F', targetPoints: 3 },
];

// Données des groupes (structure initiale)
const groups = [
  {
    id: 'A',
    name: 'Groupe A',
    teams: [
      { id: 'maroc', name: 'Maroc', flag: '🇲🇦', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'mali', name: 'Mali', flag: '🇲🇱', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'zambie', name: 'Zambie', flag: '🇿🇲', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'comores', name: 'Comores', flag: '🇰🇲', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  },
  {
    id: 'B',
    name: 'Groupe B',
    teams: [
      { id: 'afrique-du-sud', name: 'Afrique du Sud', flag: '🇿🇦', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'zimbabwe', name: 'Zimbabwe', flag: '🇿🇼', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'egypte', name: 'Egypte', flag: '🇪🇬', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'angola', name: 'Angola', flag: '🇦🇴', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  },
  {
    id: 'C',
    name: 'Groupe C',
    teams: [
      { id: 'tanzanie', name: 'Tanzanie', flag: '🇹🇿', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'nigeria', name: 'Nigéria', flag: '🇳🇬', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'tunisie', name: 'Tunisie', flag: '🇹🇳', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'ouganda', name: 'Ouganda', flag: '🇺🇬', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  },
  {
    id: 'D',
    name: 'Groupe D',
    teams: [
      { id: 'rd-congo', name: 'RD Congo', flag: '🇨🇩', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'benin', name: 'Bénin', flag: '🇧🇯', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'botswana', name: 'Botswana', flag: '🇧🇼', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'senegal', name: 'Sénégal', flag: '🇸🇳', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  },
  {
    id: 'E',
    name: 'Groupe E',
    teams: [
      { id: 'algerie', name: 'Algérie', flag: '🇩🇿', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'burkina-faso', name: 'Burkina Faso', flag: '🇧🇫', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'guinee-equatoriale', name: 'Guinée Équatoriale', flag: '🇬🇶', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'soudan', name: 'Soudan', flag: '🇸🇩', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  },
  {
    id: 'F',
    name: 'Groupe F',
    teams: [
      { id: 'cote-d-ivoire', name: 'Côte d\'Ivoire', flag: '🇨🇮', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'cameroun', name: 'Cameroun', flag: '🇨🇲', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'mozambique', name: 'Mozambique', flag: '🇲🇿', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'gabon', name: 'Gabon', flag: '🇬🇦', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  }
];

// Données des matchs
const matches = [
  // Journée 1 - Groupe A
  { id: 'match-1', groupId: 'A', team1: 'comores', team2: 'maroc', date: '2025-12-21', time: '20:00', status: 'scheduled' },
  { id: 'match-2', groupId: 'A', team1: 'mali', team2: 'zambie', date: '2025-12-22', time: '15:00', status: 'scheduled' },
  
  // Journée 1 - Groupe B
  { id: 'match-3', groupId: 'B', team1: 'afrique-du-sud', team2: 'angola', date: '2025-12-22', time: '18:00', status: 'scheduled' },
  { id: 'match-4', groupId: 'B', team1: 'egypte', team2: 'zimbabwe', date: '2025-12-22', time: '21:00', status: 'scheduled' },
  
  // Journée 1 - Groupe C
  { id: 'match-5', groupId: 'C', team1: 'nigeria', team2: 'tanzanie', date: '2025-12-23', time: '18:30', status: 'scheduled' },
  { id: 'match-6', groupId: 'C', team1: 'tunisie', team2: 'ouganda', date: '2025-12-23', time: '21:00', status: 'scheduled' },
  
  // Journée 1 - Groupe D
  { id: 'match-7', groupId: 'D', team1: 'rd-congo', team2: 'benin', date: '2025-12-23', time: '13:30', status: 'scheduled' },
  { id: 'match-8', groupId: 'D', team1: 'botswana', team2: 'senegal', date: '2025-12-23', time: '16:00', status: 'scheduled' },
  
  // Journée 1 - Groupe E
  { id: 'match-9', groupId: 'E', team1: 'burkina-faso', team2: 'guinee-equatoriale', date: '2025-12-24', time: '13:30', status: 'scheduled' },
  { id: 'match-10', groupId: 'E', team1: 'algerie', team2: 'soudan', date: '2025-12-24', time: '16:00', status: 'scheduled' },
  
  // Journée 1 - Groupe F
  { id: 'match-11', groupId: 'F', team1: 'cote-d-ivoire', team2: 'mozambique', date: '2025-12-24', time: '18:30', status: 'scheduled' },
  { id: 'match-12', groupId: 'F', team1: 'cameroun', team2: 'gabon', date: '2025-12-24', time: '21:00', status: 'scheduled' },
  
  // Journée 2 - Groupe B
  { id: 'match-13', groupId: 'B', team1: 'angola', team2: 'zimbabwe', date: '2025-12-26', time: '13:30', status: 'scheduled' },
  { id: 'match-14', groupId: 'B', team1: 'egypte', team2: 'afrique-du-sud', date: '2025-12-26', time: '16:00', status: 'scheduled' },
  
  // Journée 2 - Groupe A
  { id: 'match-15', groupId: 'A', team1: 'zambie', team2: 'comores', date: '2025-12-26', time: '18:30', status: 'scheduled' },
  { id: 'match-16', groupId: 'A', team1: 'maroc', team2: 'mali', date: '2025-12-26', time: '21:00', status: 'scheduled' },
  
  // Journée 2 - Groupe D
  { id: 'match-17', groupId: 'D', team1: 'benin', team2: 'botswana', date: '2025-12-27', time: '13:30', status: 'scheduled' },
  { id: 'match-18', groupId: 'D', team1: 'senegal', team2: 'rd-congo', date: '2025-12-27', time: '16:00', status: 'scheduled' },
  
  // Journée 2 - Groupe C
  { id: 'match-19', groupId: 'C', team1: 'ouganda', team2: 'tanzanie', date: '2025-12-27', time: '18:30', status: 'scheduled' },
  { id: 'match-20', groupId: 'C', team1: 'nigeria', team2: 'tunisie', date: '2025-12-27', time: '21:00', status: 'scheduled' },
  
  // Journée 2 - Groupe F
  { id: 'match-21', groupId: 'F', team1: 'gabon', team2: 'mozambique', date: '2025-12-28', time: '13:30', status: 'scheduled' },
  
  // Journée 2 - Groupe E
  { id: 'match-22', groupId: 'E', team1: 'guinee-equatoriale', team2: 'soudan', date: '2025-12-28', time: '16:00', status: 'scheduled' },
  { id: 'match-23', groupId: 'E', team1: 'algerie', team2: 'burkina-faso', date: '2025-12-28', time: '18:30', status: 'scheduled' },
  
  // Journée 2 - Groupe F
  { id: 'match-24', groupId: 'F', team1: 'cote-d-ivoire', team2: 'cameroun', date: '2025-12-28', time: '21:00', status: 'scheduled' },
  
  // Journée 3 - Groupe B
  { id: 'match-25', groupId: 'B', team1: 'angola', team2: 'egypte', date: '2025-12-29', time: '17:00', status: 'scheduled' },
  { id: 'match-26', groupId: 'B', team1: 'zimbabwe', team2: 'afrique-du-sud', date: '2025-12-29', time: '17:00', status: 'scheduled' },
  
  // Journée 3 - Groupe A
  { id: 'match-27', groupId: 'A', team1: 'comores', team2: 'mali', date: '2025-12-29', time: '20:00', status: 'scheduled' },
  { id: 'match-28', groupId: 'A', team1: 'zambie', team2: 'maroc', date: '2025-12-29', time: '20:00', status: 'scheduled' },
  
  // Journée 3 - Groupe C
  { id: 'match-29', groupId: 'C', team1: 'ouganda', team2: 'nigeria', date: '2025-12-30', time: '17:00', status: 'scheduled' },
  { id: 'match-30', groupId: 'C', team1: 'tanzanie', team2: 'tunisie', date: '2025-12-30', time: '17:00', status: 'scheduled' },
  
  // Journée 3 - Groupe D
  { id: 'match-31', groupId: 'D', team1: 'benin', team2: 'senegal', date: '2025-12-30', time: '20:00', status: 'scheduled' },
  { id: 'match-32', groupId: 'D', team1: 'botswana', team2: 'rd-congo', date: '2025-12-30', time: '20:00', status: 'scheduled' },
  
  // Journée 3 - Groupe E
  { id: 'match-33', groupId: 'E', team1: 'guinee-equatoriale', team2: 'algerie', date: '2025-12-31', time: '17:00', status: 'scheduled' },
  { id: 'match-34', groupId: 'E', team1: 'soudan', team2: 'burkina-faso', date: '2025-12-31', time: '17:00', status: 'scheduled' },
  
  // Journée 3 - Groupe F
  { id: 'match-35', groupId: 'F', team1: 'gabon', team2: 'cote-d-ivoire', date: '2025-12-31', time: '20:00', status: 'scheduled' },
  { id: 'match-36', groupId: 'F', team1: 'mozambique', team2: 'cameroun', date: '2025-12-31', time: '20:00', status: 'scheduled' },
];

// Obtenir la position d'une équipe qualifiée
const getTeamPosition = (teamId, groupId) => {
  const qualified = qualifiedTeams.find(t => t.teamId === teamId && t.groupId === groupId);
  return qualified ? qualified.position : null;
};

// Simuler un match de groupe en tenant compte des équipes qualifiées avec logique plus réaliste
const simulateGroupMatch = (team1, team2, groupId) => {
  const team1Position = getTeamPosition(team1, groupId);
  const team2Position = getTeamPosition(team2, groupId);
  
  let team1Score = 0;
  let team2Score = 0;
  const random = Math.random();
  
  // Probabilité de match nul : 20-30% selon le niveau des équipes
  const drawProbability = 0.25;
  
  // Logique basée sur le classement final avec plus de variété
  if (team1Position !== null && team2Position !== null) {
    const positionDiff = team1Position - team2Position;
    
    if (random < drawProbability) {
      // Match nul (20-25% de chance)
      const drawScore = Math.floor(Math.random() * 2); // 0-0, 1-1, ou 2-2
      team1Score = drawScore;
      team2Score = drawScore;
    } else if (positionDiff < 0) {
      // Team1 mieux classée (position 1 vs 2, ou 1 vs 3, etc.)
      const advantage = Math.abs(positionDiff);
      // Plus l'avantage est grand, plus la probabilité de victoire est élevée
      if (random < 0.6 + (advantage * 0.15)) {
        // Victoire Team1 (60-90% selon l'avantage)
        team1Score = Math.floor(Math.random() * 3) + 1; // 1-3 buts
        team2Score = Math.floor(Math.random() * Math.min(team1Score, 2)); // 0 à (score1-1)
        if (team1Score <= team2Score) team1Score = team2Score + 1;
      } else {
        // Surprise : défaite Team1 (10-40%)
        team2Score = Math.floor(Math.random() * 2) + 1;
        team1Score = Math.floor(Math.random() * team2Score);
        if (team2Score <= team1Score) team2Score = team1Score + 1;
      }
    } else if (positionDiff > 0) {
      // Team2 mieux classée
      const advantage = Math.abs(positionDiff);
      if (random < 0.6 + (advantage * 0.15)) {
        // Victoire Team2
        team2Score = Math.floor(Math.random() * 3) + 1;
        team1Score = Math.floor(Math.random() * Math.min(team2Score, 2));
        if (team2Score <= team1Score) team2Score = team1Score + 1;
      } else {
        // Surprise : défaite Team2
        team1Score = Math.floor(Math.random() * 2) + 1;
        team2Score = Math.floor(Math.random() * team1Score);
        if (team1Score <= team2Score) team1Score = team2Score + 1;
      }
    } else {
      // Même position, match très serré
      if (random < 0.3) {
        // Match nul (30% de chance)
        const drawScore = Math.floor(Math.random() * 2);
        team1Score = drawScore;
        team2Score = drawScore;
      } else {
        // Victoire serrée (70% de chance)
        const score = Math.floor(Math.random() * 2);
        if (Math.random() > 0.5) {
          team1Score = score + 1;
          team2Score = score;
        } else {
          team1Score = score;
          team2Score = score + 1;
        }
      }
    }
  } else if (team1Position !== null) {
    // Team1 qualifiée, Team2 non qualifiée
    if (random < 0.25) {
      // Match nul possible (25%)
      const drawScore = Math.floor(Math.random() * 2);
      team1Score = drawScore;
      team2Score = drawScore;
    } else if (random < 0.75) {
      // Victoire Team1 (50%)
      team1Score = Math.floor(Math.random() * 3) + 1;
      team2Score = Math.floor(Math.random() * Math.min(team1Score, 2));
      if (team1Score <= team2Score) team1Score = team2Score + 1;
    } else {
      // Surprise : défaite Team1 (25%)
      team2Score = Math.floor(Math.random() * 2) + 1;
      team1Score = Math.floor(Math.random() * team2Score);
      if (team2Score <= team1Score) team2Score = team1Score + 1;
    }
  } else if (team2Position !== null) {
    // Team2 qualifiée, Team1 non qualifiée
    if (random < 0.25) {
      const drawScore = Math.floor(Math.random() * 2);
      team1Score = drawScore;
      team2Score = drawScore;
    } else if (random < 0.75) {
      team2Score = Math.floor(Math.random() * 3) + 1;
      team1Score = Math.floor(Math.random() * Math.min(team2Score, 2));
      if (team2Score <= team1Score) team2Score = team1Score + 1;
    } else {
      team1Score = Math.floor(Math.random() * 2) + 1;
      team2Score = Math.floor(Math.random() * team1Score);
      if (team1Score <= team2Score) team1Score = team2Score + 1;
    }
  } else {
    // Aucune équipe qualifiée, match équilibré
    if (random < 0.3) {
      // Match nul (30%)
      const drawScore = Math.floor(Math.random() * 2);
      team1Score = drawScore;
      team2Score = drawScore;
    } else {
      // Victoire serrée (70%)
      const score = Math.floor(Math.random() * 2);
      if (Math.random() > 0.5) {
        team1Score = score + 1;
        team2Score = score;
      } else {
        team1Score = score;
        team2Score = score + 1;
      }
    }
  }
  
  return { score1: team1Score, score2: team2Score };
};

// Mettre à jour les statistiques d'une équipe après un match
const updateTeamStats = (team, goalsFor, goalsAgainst) => {
  const newGoalsFor = team.goalsFor + goalsFor;
  const newGoalsAgainst = team.goalsAgainst + goalsAgainst;
  const newGoalDifference = newGoalsFor - newGoalsAgainst;
  
  let newWon = team.won;
  let newDrawn = team.drawn;
  let newLost = team.lost;
  let newPoints = team.points;
  
  if (goalsFor > goalsAgainst) {
    newWon += 1;
    newPoints += 3;
  } else if (goalsFor < goalsAgainst) {
    newLost += 1;
  } else {
    newDrawn += 1;
    newPoints += 1;
  }
  
  return {
    ...team,
    played: team.played + 1,
    won: newWon,
    drawn: newDrawn,
    lost: newLost,
    goalsFor: newGoalsFor,
    goalsAgainst: newGoalsAgainst,
    goalDifference: newGoalDifference,
    points: newPoints
  };
};

// Calculer combien de victoires/nuls/défaites sont nécessaires pour atteindre un nombre de points
const calculateResultsNeeded = (targetPoints) => {
  // 9 pts = 3V, 7 pts = 2V+1N, 6 pts = 2V, 5 pts = 1V+2N, 4 pts = 1V+1N+1D, 3 pts = 1V+2D ou 3N
  if (targetPoints === 9) return { wins: 3, draws: 0, losses: 0 };
  if (targetPoints === 7) return { wins: 2, draws: 1, losses: 0 };
  if (targetPoints === 6) return { wins: 2, draws: 0, losses: 1 };
  if (targetPoints === 5) return { wins: 1, draws: 2, losses: 0 };
  if (targetPoints === 4) return { wins: 1, draws: 1, losses: 1 };
  if (targetPoints === 3) return { wins: 1, draws: 0, losses: 2 };
  return { wins: 0, draws: targetPoints, losses: 3 - targetPoints };
};

// Générer les pronostics
const generatePronostics = () => {
  const simulatedMatches = [];
  const updatedGroups = groups.map(group => ({
    groupId: group.id,
    teams: group.teams.map(team => ({ ...team })) // Copie profonde
  }));

  // Traiter chaque groupe séparément
  updatedGroups.forEach(group => {
    const groupQualified = qualifiedTeams.filter(q => q.groupId === group.groupId);
    const groupMatches = matches.filter(m => m.groupId === group.groupId);
    
    if (groupQualified.length === 0) {
      // Pas de qualifications, simulation normale
      groupMatches.forEach(match => {
        const result = simulateGroupMatch(match.team1, match.team2, group.groupId);
        simulatedMatches.push({
          matchId: match.id,
          groupId: match.groupId,
          team1: match.team1,
          team2: match.team2,
          score1: result.score1,
          score2: result.score2
        });
        
        const team1Index = group.teams.findIndex(t => t.id === match.team1);
        const team2Index = group.teams.findIndex(t => t.id === match.team2);
        if (team1Index !== -1) {
          group.teams[team1Index] = updateTeamStats(group.teams[team1Index], result.score1, result.score2);
        }
        if (team2Index !== -1) {
          group.teams[team2Index] = updateTeamStats(group.teams[team2Index], result.score2, result.score1);
        }
      });
      return;
    }
    
    // Créer un mapping des points cibles pour les équipes qualifiées
    const targetPointsMap = {};
    groupQualified.forEach(q => {
      if (q.targetPoints !== undefined) {
        targetPointsMap[q.teamId] = q.targetPoints;
      }
    });
    
    // Calculer les résultats nécessaires pour chaque équipe qualifiée
    const teamRequirements = {};
    groupQualified.forEach(q => {
      if (q.targetPoints !== undefined) {
        teamRequirements[q.teamId] = calculateResultsNeeded(q.targetPoints);
      }
    });
    
    // Compteurs pour suivre les résultats de chaque équipe
    const teamCounts = {};
    group.teams.forEach(team => {
      teamCounts[team.id] = { wins: 0, draws: 0, losses: 0 };
    });
    
    // Générer les résultats des matchs selon les exigences
    groupMatches.forEach(match => {
      const team1Req = teamRequirements[match.team1];
      const team2Req = teamRequirements[match.team2];
      const team1Counts = teamCounts[match.team1];
      const team2Counts = teamCounts[match.team2];
      
      let result;
      
      if (team1Req && team2Req) {
        // Les deux équipes sont qualifiées
        const team1Pos = groupQualified.find(q => q.teamId === match.team1)?.position || 99;
        const team2Pos = groupQualified.find(q => q.teamId === match.team2)?.position || 99;
        
        if (team1Pos < team2Pos) {
          // Team1 mieux classée, doit gagner si possible
          if (team1Counts.wins < team1Req.wins && team2Counts.losses < (3 - team2Req.wins - team2Req.draws)) {
            result = { score1: Math.floor(Math.random() * 2) + 2, score2: Math.floor(Math.random() * 2) };
            team1Counts.wins++;
            team2Counts.losses++;
          } else if (team1Counts.draws < team1Req.draws && team2Counts.draws < team2Req.draws) {
            const drawScore = Math.floor(Math.random() * 2);
            result = { score1: drawScore, score2: drawScore };
            team1Counts.draws++;
            team2Counts.draws++;
          } else {
            result = { score1: Math.floor(Math.random() * 2) + 2, score2: Math.floor(Math.random() * 2) };
            team1Counts.wins++;
            team2Counts.losses++;
          }
        } else if (team2Pos < team1Pos) {
          // Team2 mieux classée
          if (team2Counts.wins < team2Req.wins && team1Counts.losses < (3 - team1Req.wins - team1Req.draws)) {
            result = { score2: Math.floor(Math.random() * 2) + 2, score1: Math.floor(Math.random() * 2) };
            team2Counts.wins++;
            team1Counts.losses++;
          } else if (team1Counts.draws < team1Req.draws && team2Counts.draws < team2Req.draws) {
            const drawScore = Math.floor(Math.random() * 2);
            result = { score1: drawScore, score2: drawScore };
            team1Counts.draws++;
            team2Counts.draws++;
          } else {
            result = { score2: Math.floor(Math.random() * 2) + 2, score1: Math.floor(Math.random() * 2) };
            team2Counts.wins++;
            team1Counts.losses++;
          }
        } else {
          // Même position
          if (team1Counts.draws < team1Req.draws && team2Counts.draws < team2Req.draws) {
            const drawScore = Math.floor(Math.random() * 2);
            result = { score1: drawScore, score2: drawScore };
            team1Counts.draws++;
            team2Counts.draws++;
          } else if (team1Counts.wins < team1Req.wins) {
            result = { score1: Math.floor(Math.random() * 2) + 1, score2: Math.floor(Math.random() * 2) };
            team1Counts.wins++;
            team2Counts.losses++;
          } else {
            result = { score2: Math.floor(Math.random() * 2) + 1, score1: Math.floor(Math.random() * 2) };
            team2Counts.wins++;
            team1Counts.losses++;
          }
        }
      } else if (team1Req && !team2Req) {
        // Team1 qualifiée, Team2 non qualifiée
        if (team1Counts.wins < team1Req.wins) {
          result = { score1: Math.floor(Math.random() * 2) + 2, score2: Math.floor(Math.random() * 2) };
          team1Counts.wins++;
          team2Counts.losses++;
        } else if (team1Counts.draws < team1Req.draws) {
          const drawScore = Math.floor(Math.random() * 2);
          result = { score1: drawScore, score2: drawScore };
          team1Counts.draws++;
          team2Counts.draws++;
        } else {
          result = { score1: Math.floor(Math.random() * 2) + 2, score2: Math.floor(Math.random() * 2) };
          team1Counts.wins++;
          team2Counts.losses++;
        }
      } else if (team2Req && !team1Req) {
        // Team2 qualifiée, Team1 non qualifiée
        if (team2Counts.wins < team2Req.wins) {
          result = { score2: Math.floor(Math.random() * 2) + 2, score1: Math.floor(Math.random() * 2) };
          team2Counts.wins++;
          team1Counts.losses++;
        } else if (team2Counts.draws < team2Req.draws) {
          const drawScore = Math.floor(Math.random() * 2);
          result = { score1: drawScore, score2: drawScore };
          team1Counts.draws++;
          team2Counts.draws++;
        } else {
          result = { score2: Math.floor(Math.random() * 2) + 2, score1: Math.floor(Math.random() * 2) };
          team2Counts.wins++;
          team1Counts.losses++;
        }
      } else {
        // Aucune équipe qualifiée
        const random = Math.random();
        if (random < 0.3) {
          const drawScore = Math.floor(Math.random() * 2);
          result = { score1: drawScore, score2: drawScore };
          team1Counts.draws++;
          team2Counts.draws++;
        } else if (random < 0.65) {
          result = { score1: Math.floor(Math.random() * 2) + 1, score2: Math.floor(Math.random() * 2) };
          team1Counts.wins++;
          team2Counts.losses++;
        } else {
          result = { score2: Math.floor(Math.random() * 2) + 1, score1: Math.floor(Math.random() * 2) };
          team2Counts.wins++;
          team1Counts.losses++;
        }
      }
      
      simulatedMatches.push({
        matchId: match.id,
        groupId: match.groupId,
        team1: match.team1,
        team2: match.team2,
        score1: result.score1,
        score2: result.score2
      });
      
      // Mettre à jour les statistiques des équipes
      const team1Index = group.teams.findIndex(t => t.id === match.team1);
      const team2Index = group.teams.findIndex(t => t.id === match.team2);
      
      if (team1Index !== -1) {
        group.teams[team1Index] = updateTeamStats(group.teams[team1Index], result.score1, result.score2);
      }
      
      if (team2Index !== -1) {
        group.teams[team2Index] = updateTeamStats(group.teams[team2Index], result.score2, result.score1);
      }
    });
  });

  // Ajuster les résultats des matchs pour garantir les points EXACTS
  updatedGroups.forEach(group => {
    const groupQualified = qualifiedTeams.filter(q => q.groupId === group.groupId);
    if (groupQualified.length === 0) {
      // Pas de qualifications, trier normalement
      group.teams.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });
      return;
    }
    
    // Ajuster les matchs pour garantir les points exacts
    const groupMatches = simulatedMatches.filter(m => m.groupId === group.groupId);
    
    // Pour chaque équipe qualifiée, ajuster ses matchs si nécessaire
    groupQualified.forEach(q => {
      if (q.targetPoints === undefined) return;
      
      const team = group.teams.find(t => t.id === q.teamId);
      if (!team) return;
      
      if (team.points !== q.targetPoints) {
        const neededPoints = q.targetPoints - team.points;
        const teamMatches = groupMatches.filter(m => m.team1 === team.id || m.team2 === team.id);
        
        // Ajuster les matchs pour atteindre le nombre de points exact
        let currentPoints = team.points;
        
        for (const match of teamMatches) {
          if (currentPoints === q.targetPoints) break;
          
          const isTeam1 = match.team1 === team.id;
          const currentScore1 = match.score1;
          const currentScore2 = match.score2;
          const currentResult = isTeam1 ? 
            (currentScore1 > currentScore2 ? 'win' : currentScore1 === currentScore2 ? 'draw' : 'loss') :
            (currentScore2 > currentScore1 ? 'win' : currentScore2 === currentScore1 ? 'draw' : 'loss');
          
          const pointsNeeded = q.targetPoints - currentPoints;
          
          // Ajuster le résultat du match
          if (pointsNeeded >= 3 && currentResult !== 'win') {
            // Besoin d'une victoire
            if (isTeam1) {
              match.score1 = Math.floor(Math.random() * 2) + 2;
              match.score2 = Math.floor(Math.random() * 2);
            } else {
              match.score2 = Math.floor(Math.random() * 2) + 2;
              match.score1 = Math.floor(Math.random() * 2);
            }
            currentPoints += 3;
            if (currentResult === 'draw') currentPoints -= 1;
            if (currentResult === 'loss') currentPoints += 0;
          } else if (pointsNeeded === 1 && currentResult === 'loss') {
            // Besoin d'un nul
            const drawScore = Math.floor(Math.random() * 2);
            match.score1 = drawScore;
            match.score2 = drawScore;
            currentPoints += 1;
          } else if (pointsNeeded === -2 && currentResult === 'win') {
            // Changer une victoire en nul
            const drawScore = Math.floor(Math.random() * 2);
            match.score1 = drawScore;
            match.score2 = drawScore;
            currentPoints -= 2;
          } else if (pointsNeeded <= -3 && currentResult === 'win') {
            // Changer une victoire en défaite
            if (isTeam1) {
              match.score1 = Math.floor(Math.random() * 2);
              match.score2 = Math.floor(Math.random() * 2) + 2;
            } else {
              match.score2 = Math.floor(Math.random() * 2);
              match.score1 = Math.floor(Math.random() * 2) + 2;
            }
            currentPoints -= 3;
          }
          
          // Recalculer les stats de l'équipe
          const teamIndex = group.teams.findIndex(t => t.id === team.id);
          if (teamIndex !== -1) {
            // Réinitialiser et recalculer
            group.teams[teamIndex].points = 0;
            group.teams[teamIndex].won = 0;
            group.teams[teamIndex].drawn = 0;
            group.teams[teamIndex].lost = 0;
            group.teams[teamIndex].goalsFor = 0;
            group.teams[teamIndex].goalsAgainst = 0;
            
            const teamMatches2 = groupMatches.filter(m => m.team1 === team.id || m.team2 === team.id);
            teamMatches2.forEach(m => {
              const isT1 = m.team1 === team.id;
              const score1 = isT1 ? m.score1 : m.score2;
              const score2 = isT1 ? m.score2 : m.score1;
              
              group.teams[teamIndex].goalsFor += score1;
              group.teams[teamIndex].goalsAgainst += score2;
              
              if (score1 > score2) {
                group.teams[teamIndex].won++;
                group.teams[teamIndex].points += 3;
              } else if (score1 === score2) {
                group.teams[teamIndex].drawn++;
                group.teams[teamIndex].points += 1;
              } else {
                group.teams[teamIndex].lost++;
              }
            });
            
            group.teams[teamIndex].goalDifference = group.teams[teamIndex].goalsFor - group.teams[teamIndex].goalsAgainst;
            group.teams[teamIndex].played = 3;
          }
          
          // Ajuster aussi l'autre équipe
          const otherTeamId = isTeam1 ? match.team2 : match.team1;
          const otherTeamIndex = group.teams.findIndex(t => t.id === otherTeamId);
          if (otherTeamIndex !== -1) {
            // Réinitialiser et recalculer pour l'autre équipe aussi
            group.teams[otherTeamIndex].points = 0;
            group.teams[otherTeamIndex].won = 0;
            group.teams[otherTeamIndex].drawn = 0;
            group.teams[otherTeamIndex].lost = 0;
            group.teams[otherTeamIndex].goalsFor = 0;
            group.teams[otherTeamIndex].goalsAgainst = 0;
            
            const otherTeamMatches = groupMatches.filter(m => m.team1 === otherTeamId || m.team2 === otherTeamId);
            otherTeamMatches.forEach(m => {
              const isT1 = m.team1 === otherTeamId;
              const score1 = isT1 ? m.score1 : m.score2;
              const score2 = isT1 ? m.score2 : m.score1;
              
              group.teams[otherTeamIndex].goalsFor += score1;
              group.teams[otherTeamIndex].goalsAgainst += score2;
              
              if (score1 > score2) {
                group.teams[otherTeamIndex].won++;
                group.teams[otherTeamIndex].points += 3;
              } else if (score1 === score2) {
                group.teams[otherTeamIndex].drawn++;
                group.teams[otherTeamIndex].points += 1;
              } else {
                group.teams[otherTeamIndex].lost++;
              }
            });
            
            group.teams[otherTeamIndex].goalDifference = group.teams[otherTeamIndex].goalsFor - group.teams[otherTeamIndex].goalsAgainst;
            group.teams[otherTeamIndex].played = 3;
          }
        }
        
        // Forcer les points exacts
        const finalTeamIndex = group.teams.findIndex(t => t.id === team.id);
        if (finalTeamIndex !== -1) {
          group.teams[finalTeamIndex].points = q.targetPoints;
        }
      }
    });
    
    // Recalculer TOUTES les stats des équipes AVANT de vérifier les non qualifiées
    group.teams.forEach(team => {
      team.points = 0;
      team.won = 0;
      team.drawn = 0;
      team.lost = 0;
      team.goalsFor = 0;
      team.goalsAgainst = 0;
      
      const teamMatches = groupMatches.filter(m => m.team1 === team.id || m.team2 === team.id);
      teamMatches.forEach(m => {
        const isT1 = m.team1 === team.id;
        const score1 = isT1 ? m.score1 : m.score2;
        const score2 = isT1 ? m.score2 : m.score1;
        
        team.goalsFor += score1;
        team.goalsAgainst += score2;
        
        if (score1 > score2) {
          team.won++;
          team.points += 3;
        } else if (score1 === score2) {
          team.drawn++;
          team.points += 1;
        } else {
          team.lost++;
        }
      });
      
      team.goalDifference = team.goalsFor - team.goalsAgainst;
      team.played = 3;
    });
    
    // Garantir que les équipes NON qualifiées ont strictement moins de points que les qualifiées
    const qualifiedTeamIds = new Set(groupQualified.map(q => q.teamId));
    const minQualifiedPoints = Math.min(...groupQualified.map(q => q.targetPoints || 0));
    
    group.teams.forEach(team => {
      if (!qualifiedTeamIds.has(team.id)) {
        // Équipe non qualifiée doit avoir strictement moins de points que la moins bonne équipe qualifiée
        if (team.points >= minQualifiedPoints) {
          // Ajuster les matchs pour réduire les points
          const teamMatches = groupMatches.filter(m => m.team1 === team.id || m.team2 === team.id);
          const maxAllowedPoints = minQualifiedPoints - 1;
          
          // Réduire les points en changeant des victoires en défaites ou nuls en défaites
          // Utiliser >= au lieu de > pour garantir que les équipes non qualifiées ont strictement moins de points
          while (team.points >= minQualifiedPoints && teamMatches.length > 0) {
            // Trouver un match où l'équipe a gagné ou fait match nul
            const winMatch = teamMatches.find(m => {
              const isT1 = m.team1 === team.id;
              const score1 = isT1 ? m.score1 : m.score2;
              const score2 = isT1 ? m.score2 : m.score1;
              return score1 >= score2; // Victoire ou nul
            });
            
            if (winMatch) {
              const isTeam1 = winMatch.team1 === team.id;
              const currentScore1 = winMatch.score1;
              const currentScore2 = winMatch.score2;
              const isWin = isTeam1 ? currentScore1 > currentScore2 : currentScore2 > currentScore1;
              const isDraw = currentScore1 === currentScore2;
              
              // Changer la victoire ou le nul en défaite
              if (isTeam1) {
                winMatch.score1 = Math.floor(Math.random() * 2);
                winMatch.score2 = Math.floor(Math.random() * 2) + 2;
              } else {
                winMatch.score2 = Math.floor(Math.random() * 2);
                winMatch.score1 = Math.floor(Math.random() * 2) + 2;
              }
              
              // Recalculer les stats de l'équipe
              team.points = 0;
              team.won = 0;
              team.drawn = 0;
              team.lost = 0;
              team.goalsFor = 0;
              team.goalsAgainst = 0;
              
              teamMatches.forEach(m => {
                const isT1 = m.team1 === team.id;
                const score1 = isT1 ? m.score1 : m.score2;
                const score2 = isT1 ? m.score2 : m.score1;
                
                team.goalsFor += score1;
                team.goalsAgainst += score2;
                
                if (score1 > score2) {
                  team.won++;
                  team.points += 3;
                } else if (score1 === score2) {
                  team.drawn++;
                  team.points += 1;
                } else {
                  team.lost++;
                }
              });
              
              team.goalDifference = team.goalsFor - team.goalsAgainst;
              team.played = 3;
              
              // Ajuster aussi l'autre équipe
              const otherTeamId = isTeam1 ? winMatch.team2 : winMatch.team1;
              const otherTeam = group.teams.find(t => t.id === otherTeamId);
              if (otherTeam && !qualifiedTeamIds.has(otherTeamId)) {
                // Recalculer pour l'autre équipe aussi
                const otherTeamMatches = groupMatches.filter(m => m.team1 === otherTeamId || m.team2 === otherTeamId);
                otherTeam.points = 0;
                otherTeam.won = 0;
                otherTeam.drawn = 0;
                otherTeam.lost = 0;
                otherTeam.goalsFor = 0;
                otherTeam.goalsAgainst = 0;
                
                otherTeamMatches.forEach(m => {
                  const isT1 = m.team1 === otherTeamId;
                  const score1 = isT1 ? m.score1 : m.score2;
                  const score2 = isT1 ? m.score2 : m.score1;
                  
                  otherTeam.goalsFor += score1;
                  otherTeam.goalsAgainst += score2;
                  
                  if (score1 > score2) {
                    otherTeam.won++;
                    otherTeam.points += 3;
                  } else if (score1 === score2) {
                    otherTeam.drawn++;
                    otherTeam.points += 1;
                  } else {
                    otherTeam.lost++;
                  }
                });
                
                otherTeam.goalDifference = otherTeam.goalsFor - otherTeam.goalsAgainst;
                otherTeam.played = 3;
              }
            } else {
              // Plus de victoires/nuls à changer, essayer de changer un nul en défaite
              const drawMatch = teamMatches.find(m => {
                const isT1 = m.team1 === team.id;
                return m.score1 === m.score2; // Match nul
              });
              
              if (drawMatch) {
                const isTeam1 = drawMatch.team1 === team.id;
                // Changer le nul en défaite
                if (isTeam1) {
                  drawMatch.score1 = Math.floor(Math.random() * 2);
                  drawMatch.score2 = Math.floor(Math.random() * 2) + 2;
                } else {
                  drawMatch.score2 = Math.floor(Math.random() * 2);
                  drawMatch.score1 = Math.floor(Math.random() * 2) + 2;
                }
                
                // Recalculer les stats
                team.points = 0;
                team.won = 0;
                team.drawn = 0;
                team.lost = 0;
                team.goalsFor = 0;
                team.goalsAgainst = 0;
                
                teamMatches.forEach(m => {
                  const isT1 = m.team1 === team.id;
                  const score1 = isT1 ? m.score1 : m.score2;
                  const score2 = isT1 ? m.score2 : m.score1;
                  
                  team.goalsFor += score1;
                  team.goalsAgainst += score2;
                  
                  if (score1 > score2) {
                    team.won++;
                    team.points += 3;
                  } else if (score1 === score2) {
                    team.drawn++;
                    team.points += 1;
                  } else {
                    team.lost++;
                  }
                });
                
                team.goalDifference = team.goalsFor - team.goalsAgainst;
                team.played = 3;
                
                // Ajuster aussi l'autre équipe
                const otherTeamId = isTeam1 ? drawMatch.team2 : drawMatch.team1;
                const otherTeam = group.teams.find(t => t.id === otherTeamId);
                if (otherTeam && !qualifiedTeamIds.has(otherTeamId)) {
                  const otherTeamMatches = groupMatches.filter(m => m.team1 === otherTeamId || m.team2 === otherTeamId);
                  otherTeam.points = 0;
                  otherTeam.won = 0;
                  otherTeam.drawn = 0;
                  otherTeam.lost = 0;
                  otherTeam.goalsFor = 0;
                  otherTeam.goalsAgainst = 0;
                  
                  otherTeamMatches.forEach(m => {
                    const isT1 = m.team1 === otherTeamId;
                    const score1 = isT1 ? m.score1 : m.score2;
                    const score2 = isT1 ? m.score2 : m.score1;
                    
                    otherTeam.goalsFor += score1;
                    otherTeam.goalsAgainst += score2;
                    
                    if (score1 > score2) {
                      otherTeam.won++;
                      otherTeam.points += 3;
                    } else if (score1 === score2) {
                      otherTeam.drawn++;
                      otherTeam.points += 1;
                    } else {
                      otherTeam.lost++;
                    }
                  });
                  
                  otherTeam.goalDifference = otherTeam.goalsFor - otherTeam.goalsAgainst;
                  otherTeam.played = 3;
                }
              } else {
                break; // Plus de matchs à modifier
              }
            }
          }
          
          // Si toujours trop de points (ou égal), réduire encore de manière agressive
          let attempts = 0;
          while (team.points >= minQualifiedPoints && attempts < 10) {
            attempts++;
            const teamMatches = groupMatches.filter(m => m.team1 === team.id || m.team2 === team.id);
            
            // Trouver un match à modifier (victoire ou nul)
            // Prioriser les matchs contre des équipes non qualifiées pour éviter d'affecter les qualifiées
            let matchToModify = teamMatches.find(match => {
              const otherTeamId = match.team1 === team.id ? match.team2 : match.team1;
              if (qualifiedTeamIds.has(otherTeamId)) return false; // Éviter les équipes qualifiées
              
              const isTeam1 = match.team1 === team.id;
              const score1 = isTeam1 ? match.score1 : match.score2;
              const score2 = isTeam1 ? match.score2 : match.score1;
              return score1 >= score2; // Victoire ou nul
            });
            
            // Si pas de match contre non qualifié, prendre n'importe quel match
            if (!matchToModify) {
              matchToModify = teamMatches.find(match => {
                const isTeam1 = match.team1 === team.id;
                const score1 = isTeam1 ? match.score1 : match.score2;
                const score2 = isTeam1 ? match.score2 : match.score1;
                return score1 >= score2; // Victoire ou nul
              });
            }
            
            if (matchToModify) {
              const isTeam1 = matchToModify.team1 === team.id;
              
              // Changer en défaite
              if (isTeam1) {
                matchToModify.score1 = Math.floor(Math.random() * 2);
                matchToModify.score2 = Math.floor(Math.random() * 2) + 2;
              } else {
                matchToModify.score2 = Math.floor(Math.random() * 2);
                matchToModify.score1 = Math.floor(Math.random() * 2) + 2;
              }
              
              // Recalculer toutes les stats de l'équipe
              team.points = 0;
              team.won = 0;
              team.drawn = 0;
              team.lost = 0;
              team.goalsFor = 0;
              team.goalsAgainst = 0;
              
              teamMatches.forEach(m => {
                const isT1 = m.team1 === team.id;
                const score1 = isT1 ? m.score1 : m.score2;
                const score2 = isT1 ? m.score2 : m.score1;
                
                team.goalsFor += score1;
                team.goalsAgainst += score2;
                
                if (score1 > score2) {
                  team.won++;
                  team.points += 3;
                } else if (score1 === score2) {
                  team.drawn++;
                  team.points += 1;
                } else {
                  team.lost++;
                }
              });
              
              team.goalDifference = team.goalsFor - team.goalsAgainst;
              team.played = 3;
              
              // Ajuster aussi l'autre équipe du match modifié
              const otherTeamId = isTeam1 ? matchToModify.team2 : matchToModify.team1;
              const otherTeam = group.teams.find(t => t.id === otherTeamId);
              if (otherTeam) {
                if (qualifiedTeamIds.has(otherTeamId)) {
                  // Si l'autre équipe est qualifiée, réajuster ses points après modification
                  const qualifiedData = groupQualified.find(q => q.teamId === otherTeamId);
                  if (qualifiedData && qualifiedData.targetPoints !== undefined) {
                    // Recalculer les stats de l'équipe qualifiée
                    const otherTeamMatches = groupMatches.filter(m => m.team1 === otherTeamId || m.team2 === otherTeamId);
                    otherTeam.points = 0;
                    otherTeam.won = 0;
                    otherTeam.drawn = 0;
                    otherTeam.lost = 0;
                    otherTeam.goalsFor = 0;
                    otherTeam.goalsAgainst = 0;
                    
                    otherTeamMatches.forEach(m => {
                      const isT1 = m.team1 === otherTeamId;
                      const score1 = isT1 ? m.score1 : m.score2;
                      const score2 = isT1 ? m.score2 : m.score1;
                      
                      otherTeam.goalsFor += score1;
                      otherTeam.goalsAgainst += score2;
                      
                      if (score1 > score2) {
                        otherTeam.won++;
                        otherTeam.points += 3;
                      } else if (score1 === score2) {
                        otherTeam.drawn++;
                        otherTeam.points += 1;
                      } else {
                        otherTeam.lost++;
                      }
                    });
                    
                    otherTeam.goalDifference = otherTeam.goalsFor - otherTeam.goalsAgainst;
                    otherTeam.played = 3;
                    
                    // Réajuster les matchs de l'équipe qualifiée pour atteindre les points cibles
                    if (otherTeam.points !== qualifiedData.targetPoints) {
                      const neededPoints = qualifiedData.targetPoints - otherTeam.points;
                      const adjustMatches = otherTeamMatches.filter(m => {
                        const opponentId = m.team1 === otherTeamId ? m.team2 : m.team1;
                        return !qualifiedTeamIds.has(opponentId); // Ne modifier que les matchs contre non qualifiées
                      });
                      
                      for (const adjMatch of adjustMatches) {
                        if (otherTeam.points === qualifiedData.targetPoints) break;
                        
                        const isOtherTeam1 = adjMatch.team1 === otherTeamId;
                        const currentScore1 = adjMatch.score1;
                        const currentScore2 = adjMatch.score2;
                        const currentResult = isOtherTeam1 ?
                          (currentScore1 > currentScore2 ? 'win' : currentScore1 === currentScore2 ? 'draw' : 'loss') :
                          (currentScore2 > currentScore1 ? 'win' : currentScore2 === currentScore1 ? 'draw' : 'loss');
                        
                        const pointsNeeded = qualifiedData.targetPoints - otherTeam.points;
                        
                        if (pointsNeeded >= 3 && currentResult !== 'win') {
                          // Besoin d'une victoire
                          if (isOtherTeam1) {
                            adjMatch.score1 = Math.floor(Math.random() * 2) + 2;
                            adjMatch.score2 = Math.floor(Math.random() * 2);
                          } else {
                            adjMatch.score2 = Math.floor(Math.random() * 2) + 2;
                            adjMatch.score1 = Math.floor(Math.random() * 2);
                          }
                        } else if (pointsNeeded === 1 && currentResult === 'loss') {
                          // Besoin d'un nul
                          const drawScore = Math.floor(Math.random() * 2);
                          adjMatch.score1 = drawScore;
                          adjMatch.score2 = drawScore;
                        } else if (pointsNeeded <= -3 && currentResult === 'win') {
                          // Changer une victoire en défaite
                          if (isOtherTeam1) {
                            adjMatch.score1 = Math.floor(Math.random() * 2);
                            adjMatch.score2 = Math.floor(Math.random() * 2) + 2;
                          } else {
                            adjMatch.score2 = Math.floor(Math.random() * 2);
                            adjMatch.score1 = Math.floor(Math.random() * 2) + 2;
                          }
                        }
                        
                        // Recalculer
                        otherTeam.points = 0;
                        otherTeam.won = 0;
                        otherTeam.drawn = 0;
                        otherTeam.lost = 0;
                        otherTeam.goalsFor = 0;
                        otherTeam.goalsAgainst = 0;
                        
                        otherTeamMatches.forEach(m => {
                          const isT1 = m.team1 === otherTeamId;
                          const score1 = isT1 ? m.score1 : m.score2;
                          const score2 = isT1 ? m.score2 : m.score1;
                          
                          otherTeam.goalsFor += score1;
                          otherTeam.goalsAgainst += score2;
                          
                          if (score1 > score2) {
                            otherTeam.won++;
                            otherTeam.points += 3;
                          } else if (score1 === score2) {
                            otherTeam.drawn++;
                            otherTeam.points += 1;
                          } else {
                            otherTeam.lost++;
                          }
                        });
                        
                        otherTeam.goalDifference = otherTeam.goalsFor - otherTeam.goalsAgainst;
                        otherTeam.played = 3;
                      }
                      
                      // Forcer les points exacts
                      otherTeam.points = qualifiedData.targetPoints;
                    }
                  }
                } else {
                  // Équipe non qualifiée, recalculer normalement
                  const otherTeamMatches = groupMatches.filter(m => m.team1 === otherTeamId || m.team2 === otherTeamId);
                  otherTeam.points = 0;
                  otherTeam.won = 0;
                  otherTeam.drawn = 0;
                  otherTeam.lost = 0;
                  otherTeam.goalsFor = 0;
                  otherTeam.goalsAgainst = 0;
                  
                  otherTeamMatches.forEach(m => {
                    const isT1 = m.team1 === otherTeamId;
                    const score1 = isT1 ? m.score1 : m.score2;
                    const score2 = isT1 ? m.score2 : m.score1;
                    
                    otherTeam.goalsFor += score1;
                    otherTeam.goalsAgainst += score2;
                    
                    if (score1 > score2) {
                      otherTeam.won++;
                      otherTeam.points += 3;
                    } else if (score1 === score2) {
                      otherTeam.drawn++;
                      otherTeam.points += 1;
                    } else {
                      otherTeam.lost++;
                    }
                  });
                  
                  otherTeam.goalDifference = otherTeam.goalsFor - otherTeam.goalsAgainst;
                  otherTeam.played = 3;
                }
              }
            } else {
              break; // Plus de matchs à modifier
            }
          }
          
          // Dernière vérification : forcer le maximum autorisé si toujours trop
          if (team.points >= minQualifiedPoints) {
            // Réduire tous les matchs restants en défaites (sauf ceux contre équipes qualifiées si nécessaire)
            const teamMatches = groupMatches.filter(m => m.team1 === team.id || m.team2 === team.id);
            
            // D'abord, modifier les matchs contre équipes non qualifiées
            teamMatches.forEach(match => {
              const otherTeamId = match.team1 === team.id ? match.team2 : match.team1;
              if (qualifiedTeamIds.has(otherTeamId)) return; // Sauter les équipes qualifiées pour l'instant
              
              const isTeam1 = match.team1 === team.id;
              const score1 = isTeam1 ? match.score1 : match.score2;
              const score2 = isTeam1 ? match.score2 : match.score1;
              
              if (score1 > score2) {
                // Victoire -> changer en nul pour réduire les points
                const drawScore = Math.floor(Math.random() * 2);
                if (isTeam1) {
                  match.score1 = drawScore;
                  match.score2 = drawScore;
                } else {
                  match.score2 = drawScore;
                  match.score1 = drawScore;
                }
              } else if (score1 === score2) {
                // Nul -> changer en défaite
                if (isTeam1) {
                  match.score1 = 0;
                  match.score2 = 2;
                } else {
                  match.score2 = 0;
                  match.score1 = 2;
                }
              }
            });
            
            // Recalculer
            team.points = 0;
            team.won = 0;
            team.drawn = 0;
            team.lost = 0;
            team.goalsFor = 0;
            team.goalsAgainst = 0;
            
            const teamMatchesFinal = groupMatches.filter(m => m.team1 === team.id || m.team2 === team.id);
            teamMatchesFinal.forEach(m => {
              const isT1 = m.team1 === team.id;
              const score1 = isT1 ? m.score1 : m.score2;
              const score2 = isT1 ? m.score2 : m.score1;
              
              team.goalsFor += score1;
              team.goalsAgainst += score2;
              
              if (score1 > score2) {
                team.won++;
                team.points += 3;
              } else if (score1 === score2) {
                team.drawn++;
                team.points += 1;
              } else {
                team.lost++;
              }
            });
            
            team.goalDifference = team.goalsFor - team.goalsAgainst;
            team.played = 3;
            
            // Si toujours trop de points, modifier aussi les matchs contre équipes qualifiées
            if (team.points >= minQualifiedPoints) {
              teamMatches.forEach(match => {
                if (team.points < minQualifiedPoints) return;
                
                const otherTeamId = match.team1 === team.id ? match.team2 : match.team1;
                const isTeam1 = match.team1 === team.id;
                const score1 = isTeam1 ? match.score1 : match.score2;
                const score2 = isTeam1 ? match.score2 : match.score1;
                
                if (score1 >= score2) {
                  // Changer en défaite
                  if (isTeam1) {
                    match.score1 = 0;
                    match.score2 = 2;
                  } else {
                    match.score2 = 0;
                    match.score1 = 2;
                  }
                  
                  // Recalculer immédiatement
                  team.points = 0;
                  team.won = 0;
                  team.drawn = 0;
                  team.lost = 0;
                  team.goalsFor = 0;
                  team.goalsAgainst = 0;
                  
                  teamMatchesFinal.forEach(m => {
                    const isT1 = m.team1 === team.id;
                    const s1 = isT1 ? m.score1 : m.score2;
                    const s2 = isT1 ? m.score2 : m.score1;
                    
                    team.goalsFor += s1;
                    team.goalsAgainst += s2;
                    
                    if (s1 > s2) {
                      team.won++;
                      team.points += 3;
                    } else if (s1 === s2) {
                      team.drawn++;
                      team.points += 1;
                    } else {
                      team.lost++;
                    }
                  });
                  
                  team.goalDifference = team.goalsFor - team.goalsAgainst;
                  team.played = 3;
                  
                  // Réajuster l'équipe qualifiée si nécessaire
                  if (qualifiedTeamIds.has(otherTeamId)) {
                    const qualifiedData = groupQualified.find(q => q.teamId === otherTeamId);
                    if (qualifiedData && qualifiedData.targetPoints !== undefined) {
                      const otherTeam = group.teams.find(t => t.id === otherTeamId);
                      const otherTeamMatches = groupMatches.filter(m => m.team1 === otherTeamId || m.team2 === otherTeamId);
                      
                      // Ajuster un match contre une équipe non qualifiée pour compenser
                      const adjustMatch = otherTeamMatches.find(m => {
                        const oppId = m.team1 === otherTeamId ? m.team2 : m.team1;
                        return !qualifiedTeamIds.has(oppId) && oppId !== team.id;
                      });
                      
                      if (adjustMatch) {
                        const isOtherTeam1 = adjustMatch.team1 === otherTeamId;
                        if (isOtherTeam1) {
                          adjustMatch.score1 = Math.floor(Math.random() * 2) + 2;
                          adjustMatch.score2 = Math.floor(Math.random() * 2);
                        } else {
                          adjustMatch.score2 = Math.floor(Math.random() * 2) + 2;
                          adjustMatch.score1 = Math.floor(Math.random() * 2);
                        }
                      }
                      
                      // Recalculer l'équipe qualifiée
                      otherTeam.points = 0;
                      otherTeam.won = 0;
                      otherTeam.drawn = 0;
                      otherTeam.lost = 0;
                      otherTeam.goalsFor = 0;
                      otherTeam.goalsAgainst = 0;
                      
                      otherTeamMatches.forEach(m => {
                        const isT1 = m.team1 === otherTeamId;
                        const s1 = isT1 ? m.score1 : m.score2;
                        const s2 = isT1 ? m.score2 : m.score1;
                        
                        otherTeam.goalsFor += s1;
                        otherTeam.goalsAgainst += s2;
                        
                        if (s1 > s2) {
                          otherTeam.won++;
                          otherTeam.points += 3;
                        } else if (s1 === s2) {
                          otherTeam.drawn++;
                          otherTeam.points += 1;
                        } else {
                          otherTeam.lost++;
                        }
                      });
                      
                      otherTeam.goalDifference = otherTeam.goalsFor - otherTeam.goalsAgainst;
                      otherTeam.played = 3;
                      
                      // Forcer les points exacts
                      otherTeam.points = qualifiedData.targetPoints;
                    }
                  }
                }
              });
            }
          }
        }
      }
    });
    
    // Trier les équipes pour garantir l'ordre des qualifications
    group.teams.sort((a, b) => {
      const aQualified = groupQualified.find(q => q.teamId === a.id);
      const bQualified = groupQualified.find(q => q.teamId === b.id);
      
      // Les équipes qualifiées d'abord selon leur position
      if (aQualified && bQualified) {
        return aQualified.position - bQualified.position;
      }
      if (aQualified && !bQualified) return -1;
      if (!aQualified && bQualified) return 1;
      
      // Ensuite par points pour les non qualifiées
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
    
    // Créer un mapping des positions souhaitées
    const positionMap = {};
    groupQualified.forEach(q => {
      positionMap[q.position] = q.teamId;
    });
    
    // Trier d'abord par points
    group.teams.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
    
    // Vérifier si les équipes qualifiées sont aux bonnes positions
    // Si non, ajuster les résultats des matchs pour corriger
    const needsAdjustment = groupQualified.some((q, index) => {
      const teamIndex = group.teams.findIndex(t => t.id === q.teamId);
      return teamIndex !== (q.position - 1);
    });
    
    if (needsAdjustment) {
      // Réorganiser les équipes selon les qualifications
      const reorderedTeams = [];
      const usedTeams = new Set();
      
      // Placer les équipes qualifiées aux bonnes positions
      for (let pos = 1; pos <= 4; pos++) {
        const qualifiedTeamId = positionMap[pos];
        if (qualifiedTeamId) {
          const team = group.teams.find(t => t.id === qualifiedTeamId && !usedTeams.has(t.id));
          if (team) {
            reorderedTeams.push(team);
            usedTeams.add(team.id);
          }
        }
      }
      
      // Ajouter les équipes non qualifiées restantes
      group.teams.forEach(team => {
        if (!usedTeams.has(team.id)) {
          reorderedTeams.push(team);
        }
      });
      
      // Ajuster les résultats des matchs pour garantir les points nécessaires
      const groupMatches = simulatedMatches.filter(m => m.groupId === group.groupId);
      
      // Ajuster les matchs pour garantir les points EXACTS spécifiés
      reorderedTeams.forEach((team, index) => {
        const qualified = groupQualified.find(q => q.teamId === team.id);
        if (qualified && qualified.targetPoints !== undefined) {
          const targetPoints = qualified.targetPoints;
          
          // Si l'équipe n'a pas les points exacts, ajuster les matchs
          if (team.points !== targetPoints) {
            const neededPoints = targetPoints - team.points;
            const teamMatches = groupMatches.filter(m => m.team1 === team.id || m.team2 === team.id);
            
            // Calculer combien de victoires/nuls/défaites sont nécessaires
            // Points possibles: Victoire = +3, Nul = +1, Défaite = +0
            // On doit ajuster pour atteindre exactement targetPoints
            
            // Stratégie: ajuster les matchs un par un jusqu'à atteindre le bon total
            let currentPoints = team.points;
            let matchesToAdjust = [...teamMatches];
            
            // Trier les matchs pour ajuster d'abord ceux où l'équipe a perdu ou fait nul
            matchesToAdjust.sort((a, b) => {
              const aIsTeam1 = a.team1 === team.id;
              const aWon = aIsTeam1 ? a.score1 > a.score2 : a.score2 > a.score1;
              const aDraw = a.score1 === a.score2;
              const bIsTeam1 = b.team1 === team.id;
              const bWon = bIsTeam1 ? b.score1 > b.score2 : b.score2 > b.score1;
              const bDraw = b.score1 === b.score2;
              
              // Prioriser les défaites puis les nuls
              if (!aWon && bWon) return -1;
              if (aWon && !bWon) return 1;
              if (aDraw && !bDraw) return -1;
              if (!aDraw && bDraw) return 1;
              return 0;
            });
            
            // Ajuster les matchs pour atteindre le nombre de points exact
            for (const match of matchesToAdjust) {
              if (currentPoints === targetPoints) break;
              
              const isTeam1 = match.team1 === team.id;
              const currentScore1 = match.score1;
              const currentScore2 = match.score2;
              const currentResult = isTeam1 ? 
                (currentScore1 > currentScore2 ? 'win' : currentScore1 === currentScore2 ? 'draw' : 'loss') :
                (currentScore2 > currentScore1 ? 'win' : currentScore2 === currentScore1 ? 'draw' : 'loss');
              
              const pointsNeeded = targetPoints - currentPoints;
              
              // Déterminer le résultat nécessaire
              if (pointsNeeded >= 3 && currentResult !== 'win') {
                // Besoin d'une victoire
                if (isTeam1) {
                  match.score1 = Math.floor(Math.random() * 2) + 2; // 2-3 buts
                  match.score2 = Math.floor(Math.random() * 2); // 0-1 but
                } else {
                  match.score2 = Math.floor(Math.random() * 2) + 2;
                  match.score1 = Math.floor(Math.random() * 2);
                }
                currentPoints += 3;
                if (currentResult === 'draw') currentPoints -= 1;
              } else if (pointsNeeded === 1 && currentResult === 'loss') {
                // Besoin d'un nul
                const drawScore = Math.floor(Math.random() * 2);
                match.score1 = drawScore;
                match.score2 = drawScore;
                currentPoints += 1;
              } else if (pointsNeeded < 0 && currentResult === 'win') {
                // Trop de points, changer une victoire en nul ou défaite
                if (pointsNeeded === -2) {
                  // Changer en nul
                  const drawScore = Math.floor(Math.random() * 2);
                  match.score1 = drawScore;
                  match.score2 = drawScore;
                  currentPoints -= 2;
                } else {
                  // Changer en défaite
                  if (isTeam1) {
                    match.score1 = Math.floor(Math.random() * 2);
                    match.score2 = Math.floor(Math.random() * 2) + 2;
                  } else {
                    match.score2 = Math.floor(Math.random() * 2);
                    match.score1 = Math.floor(Math.random() * 2) + 2;
                  }
                  currentPoints -= 3;
                }
              }
              
              // Recalculer les stats de l'équipe
              if (isTeam1) {
                const newResult = match.score1 > match.score2 ? 'win' : match.score1 === match.score2 ? 'draw' : 'loss';
                team.points = team.points - (currentResult === 'win' ? 3 : currentResult === 'draw' ? 1 : 0) + (newResult === 'win' ? 3 : newResult === 'draw' ? 1 : 0);
                team.won = team.won - (currentResult === 'win' ? 1 : 0) + (newResult === 'win' ? 1 : 0);
                team.drawn = team.drawn - (currentResult === 'draw' ? 1 : 0) + (newResult === 'draw' ? 1 : 0);
                team.lost = team.lost - (currentResult === 'loss' ? 1 : 0) + (newResult === 'loss' ? 1 : 0);
                team.goalsFor = team.goalsFor - currentScore1 + match.score1;
                team.goalsAgainst = team.goalsAgainst - currentScore2 + match.score2;
              } else {
                const newResult = match.score2 > match.score1 ? 'win' : match.score2 === match.score1 ? 'draw' : 'loss';
                team.points = team.points - (currentResult === 'win' ? 3 : currentResult === 'draw' ? 1 : 0) + (newResult === 'win' ? 3 : newResult === 'draw' ? 1 : 0);
                team.won = team.won - (currentResult === 'win' ? 1 : 0) + (newResult === 'win' ? 1 : 0);
                team.drawn = team.drawn - (currentResult === 'draw' ? 1 : 0) + (newResult === 'draw' ? 1 : 0);
                team.lost = team.lost - (currentResult === 'loss' ? 1 : 0) + (newResult === 'loss' ? 1 : 0);
                team.goalsFor = team.goalsFor - currentScore2 + match.score2;
                team.goalsAgainst = team.goalsAgainst - currentScore1 + match.score1;
              }
              
              team.goalDifference = team.goalsFor - team.goalsAgainst;
              
              // Ajuster aussi l'autre équipe
              const otherTeamId = isTeam1 ? match.team2 : match.team1;
              const otherTeam = reorderedTeams.find(t => t.id === otherTeamId);
              if (otherTeam) {
                const otherIsTeam1 = match.team1 === otherTeamId;
                const otherCurrentResult = otherIsTeam1 ?
                  (currentScore1 > currentScore2 ? 'win' : currentScore1 === currentScore2 ? 'draw' : 'loss') :
                  (currentScore2 > currentScore1 ? 'win' : currentScore2 === currentScore1 ? 'draw' : 'loss');
                const otherNewResult = otherIsTeam1 ?
                  (match.score1 > match.score2 ? 'win' : match.score1 === match.score2 ? 'draw' : 'loss') :
                  (match.score2 > match.score1 ? 'win' : match.score2 === match.score1 ? 'draw' : 'loss');
                
                if (otherIsTeam1) {
                  otherTeam.points = otherTeam.points - (otherCurrentResult === 'win' ? 3 : otherCurrentResult === 'draw' ? 1 : 0) + (otherNewResult === 'win' ? 3 : otherNewResult === 'draw' ? 1 : 0);
                  otherTeam.won = otherTeam.won - (otherCurrentResult === 'win' ? 1 : 0) + (otherNewResult === 'win' ? 1 : 0);
                  otherTeam.drawn = otherTeam.drawn - (otherCurrentResult === 'draw' ? 1 : 0) + (otherNewResult === 'draw' ? 1 : 0);
                  otherTeam.lost = otherTeam.lost - (otherCurrentResult === 'loss' ? 1 : 0) + (otherNewResult === 'loss' ? 1 : 0);
                  otherTeam.goalsFor = otherTeam.goalsFor - currentScore1 + match.score1;
                  otherTeam.goalsAgainst = otherTeam.goalsAgainst - currentScore2 + match.score2;
                } else {
                  otherTeam.points = otherTeam.points - (otherCurrentResult === 'win' ? 3 : otherCurrentResult === 'draw' ? 1 : 0) + (otherNewResult === 'win' ? 3 : otherNewResult === 'draw' ? 1 : 0);
                  otherTeam.won = otherTeam.won - (otherCurrentResult === 'win' ? 1 : 0) + (otherNewResult === 'win' ? 1 : 0);
                  otherTeam.drawn = otherTeam.drawn - (otherCurrentResult === 'draw' ? 1 : 0) + (otherNewResult === 'draw' ? 1 : 0);
                  otherTeam.lost = otherTeam.lost - (otherCurrentResult === 'loss' ? 1 : 0) + (otherNewResult === 'loss' ? 1 : 0);
                  otherTeam.goalsFor = otherTeam.goalsFor - currentScore2 + match.score2;
                  otherTeam.goalsAgainst = otherTeam.goalsAgainst - currentScore1 + match.score1;
                }
                otherTeam.goalDifference = otherTeam.goalsFor - otherTeam.goalsAgainst;
              }
            }
            
            // Forcer les points exacts si nécessaire
            team.points = targetPoints;
          }
        }
      });
      
      group.teams = reorderedTeams;
    }
  });

  // Créer l'objet final avec les groupes complets
  const pronostics = {
    matches: simulatedMatches,
    groups: updatedGroups.map(groupResult => {
      const originalGroup = groups.find(g => g.id === groupResult.groupId);
      return {
        id: originalGroup.id,
        name: originalGroup.name,
        teams: groupResult.teams
      };
    })
  };

  // Sauvegarder dans le fichier JSON
  const outputPath = join(__dirname, '../src/data/pronostics.json');
  writeFileSync(outputPath, JSON.stringify(pronostics, null, 2), 'utf-8');
  
  console.log('✅ Pronostics générés et sauvegardés dans src/data/pronostics.json');
  console.log(`📊 ${simulatedMatches.length} matchs simulés`);
  console.log(`📈 ${pronostics.groups.length} groupes mis à jour`);
};

generatePronostics();
