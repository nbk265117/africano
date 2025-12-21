export type Match = {
  id: string;
  groupId: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  score1?: number;
  score2?: number;
  status: 'scheduled' | 'live' | 'finished';
  venue?: string;
}

export const matches: Match[] = [
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

