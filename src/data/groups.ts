export type Team = {
  id: string;
  name: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export type Group = {
  id: string;
  name: string;
  teams: Team[];
}

export const groups: Group[] = [
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
      { id: 'senegal', name: 'Sénégal', flag: '🇸🇳', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'botswana', name: 'Botswana', flag: '🇧🇼', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'rd-congo', name: 'RD Congo', flag: '🇨🇩', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'benin', name: 'Benin', flag: '🇧🇯', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  },
  {
    id: 'E',
    name: 'Groupe E',
    teams: [
      { id: 'algerie', name: 'Algérie', flag: '🇩🇿', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'guinee-equatoriale', name: 'Guinée Équatoriale', flag: '🇬🇶', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'burkina-faso', name: 'Burkina Faso', flag: '🇧🇫', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'soudan', name: 'Soudan', flag: '🇸🇩', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  },
  {
    id: 'F',
    name: 'Groupe F',
    teams: [
      { id: 'cameroun', name: 'Cameroun', flag: '🇨🇲', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'gabon', name: 'Gabon', flag: '🇬🇦', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'mozambique', name: 'Mozambique', flag: '🇲🇿', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { id: 'cote-d-ivoire', name: 'Côte d\'Ivoire', flag: '🇨🇮', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  }
];

