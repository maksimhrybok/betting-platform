import { create } from "zustand";

interface Bet {
  id: string;
  outcomeId: string;
  match: string;
  outcome: string;
  odds: number;
  stake: number;
}

interface BetSlipStore {
  bets: Bet[];
  addBet: (bet: Bet) => void;
  removeBet: (id: string) => void;
  clearBets: () => void;
  totalStake: () => number;
  totalPayout: () => number;
}

export const useBetSlipStore = create<BetSlipStore>((set, get) => ({
  bets: [],
  addBet: (bet) => {
    const already = get().bets.some((b) => b.outcomeId === bet.outcomeId);
    if (already) return;
    set((state) => ({ bets: [...state.bets, bet] }));
  },
  removeBet: (id) =>
    set((state) => ({ bets: state.bets.filter((bet) => bet.id !== id) })),
  clearBets: () => set({ bets: [] }),
  totalStake: () => get().bets.reduce((total, bet) => total + bet.stake, 0),
  totalPayout: () =>
    get().bets.reduce((total, bet) => total + bet.stake * bet.odds, 0),
}));
