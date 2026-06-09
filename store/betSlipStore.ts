import { create } from "zustand";

interface Bet {
  id: string;
  outcomeId: string;
  match: string;
  outcome: string;
  odds: number;
  stake: number;
}

export interface PlacedBet {
  id: string;
  match: string;
  outcome: string;
  odds: number;
  stake: number;
  payout: number;
  status: "pending" | "won" | "lost";
  placedAt: string;
}

interface BetSlipStore {
  bets: Bet[];
  history: PlacedBet[];
  addBet: (bet: Bet) => void;
  removeBet: (id: string) => void;
  updateStake: (id: string, stake: number) => void;
  placeBets: () => void;
  clearBets: () => void;
  totalStake: () => number;
  totalPayout: () => number;
}

export const useBetSlipStore = create<BetSlipStore>((set, get) => ({
  bets: [],
  history: [],
  addBet: (bet) => {
    const already = get().bets.some((b) => b.outcomeId === bet.outcomeId);
    if (already) return;
    set((state) => ({ bets: [...state.bets, bet] }));
  },
  removeBet: (id) =>
    set((state) => ({ bets: state.bets.filter((bet) => bet.id !== id) })),
  updateStake: (id, stake) =>
    set((state) => ({
      bets: state.bets.map((bet) =>
        bet.id === id ? { ...bet, stake } : bet,
      ),
    })),
  placeBets: () => {
    const bets = get().bets;
    const statuses: PlacedBet["status"][] = ["pending", "won", "lost"];
    const placed: PlacedBet[] = bets.map((bet) => ({
      id: bet.id,
      match: bet.match,
      outcome: bet.outcome,
      odds: bet.odds,
      stake: bet.stake,
      payout: bet.stake * bet.odds,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      placedAt: new Date().toLocaleTimeString(),
    }));
    set((state) => ({ bets: [], history: [...placed, ...state.history] }));
  },
  clearBets: () => set({ bets: [] }),
  totalStake: () => get().bets.reduce((total, bet) => total + bet.stake, 0),
  totalPayout: () =>
    get().bets.reduce((total, bet) => total + bet.stake * bet.odds, 0),
}));
