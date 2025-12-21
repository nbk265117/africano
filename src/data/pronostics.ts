import pronosticsData from './pronostics.json';

export interface SimulatedMatch {
  matchId: string;
  groupId: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
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

export interface Pronostics {
  matches: SimulatedMatch[];
  groups: SimulatedGroup[];
}

export const pronostics: Pronostics = pronosticsData as Pronostics;

