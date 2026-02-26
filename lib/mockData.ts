export interface Outcome {
  id: string;
  label: string;
  odds: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  startTime: string;
  isLive: boolean;
  outcomes: Outcome[];
}

export const mockMatches: Match[] = [
  {
    id: "1",
    homeTeam: "Manchester United",
    awayTeam: "Chelsea",
    league: "Premier League",
    startTime: "20:00",
    isLive: true,
    outcomes: [
      { id: "1-1", label: "Man United Win", odds: 2.5 },
      { id: "1-2", label: "Draw", odds: 3.2 },
      { id: "1-3", label: "Chelsea Win", odds: 2.8 },
    ],
  },
  {
    id: "2",
    homeTeam: "Arsenal",
    awayTeam: "Liverpool",
    league: "Premier League",
    startTime: "17:30",
    isLive: false,
    outcomes: [
      { id: "2-1", label: "Arsenal Win", odds: 1.9 },
      { id: "2-2", label: "Draw", odds: 3.5 },
      { id: "2-3", label: "Liverpool Win", odds: 3.8 },
    ],
  },
  {
    id: "3",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    league: "La Liga",
    startTime: "21:00",
    isLive: true,
    outcomes: [
      { id: "3-1", label: "Real Madrid Win", odds: 2.1 },
      { id: "3-2", label: "Draw", odds: 3.4 },
      { id: "3-3", label: "Barcelona Win", odds: 3.1 },
    ],
  },
];
