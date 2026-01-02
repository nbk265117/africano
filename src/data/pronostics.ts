import pronosticsData from './pronostics.json';

export interface SimulatedMatch {
  matchId: string;
  groupId: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  status?: string;
  real?: boolean;
}

export interface SimulatedGroup {
  id: string;
  name: string;
  teams: Array<{
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
  }>;
}

export interface KnockoutPrediction {
  score1: number;
  score2: number;
  winner: string;
  confidence: 'very_high' | 'high' | 'medium' | 'low';
  extraTime: boolean;
  penalties: { team1: number; team2: number } | null;
  analysis: string;
}

export interface KnockoutMatch {
  matchId: string;
  round: '8emes' | 'quarts' | 'demis' | 'finale' | 'petite-finale';
  date: string;
  time: string;
  team1: string;
  team2: string;
  prediction: KnockoutPrediction;
  status: string;
}

export interface Pronostics {
  matches: SimulatedMatch[];
  groups: SimulatedGroup[];
  knockoutMatches: KnockoutMatch[];
}

export const pronostics: Pronostics = pronosticsData as Pronostics;

