// Classements finaux des groupes selon les pronostics
export type QualifiedTeam = {
  teamId: string;
  teamName: string;
  position: number; // 1, 2, ou 3 (meilleur 3ème)
  groupId: string;
}

export const qualifiedTeams: QualifiedTeam[] = [
  // Groupe A
  { teamId: 'maroc', teamName: 'Maroc', position: 1, groupId: 'A' },
  { teamId: 'mali', teamName: 'Mali', position: 2, groupId: 'A' },
  { teamId: 'comores', teamName: 'Comores', position: 3, groupId: 'A' },
  
  // Groupe B
  { teamId: 'egypte', teamName: 'Egypte', position: 1, groupId: 'B' },
  { teamId: 'afrique-du-sud', teamName: 'Afrique du Sud', position: 2, groupId: 'B' },
  { teamId: 'angola', teamName: 'Angola', position: 3, groupId: 'B' },
  
  // Groupe C
  { teamId: 'tunisie', teamName: 'Tunisie', position: 1, groupId: 'C' },
  { teamId: 'nigeria', teamName: 'Nigéria', position: 2, groupId: 'C' },
  { teamId: 'ouganda', teamName: 'Ouganda', position: 3, groupId: 'C' },
  
  // Groupe D
  { teamId: 'senegal', teamName: 'Sénégal', position: 1, groupId: 'D' },
  { teamId: 'rd-congo', teamName: 'RD Congo', position: 2, groupId: 'D' },
  
  // Groupe E
  { teamId: 'algerie', teamName: 'Algérie', position: 1, groupId: 'E' },
  { teamId: 'burkina-faso', teamName: 'Burkina Faso', position: 2, groupId: 'E' },
  { teamId: 'guinee-equatoriale', teamName: 'Guinée Équatoriale', position: 3, groupId: 'E' },
  
  // Groupe F
  { teamId: 'cote-d-ivoire', teamName: 'Côte d\'Ivoire', position: 1, groupId: 'F' },
  { teamId: 'cameroun', teamName: 'Cameroun', position: 2, groupId: 'F' },
];

