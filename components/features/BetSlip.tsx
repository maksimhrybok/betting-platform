"use client";
import { useBetSlipStore } from "@/store/betSlipStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function BetSlip() {
  const { bets, removeBet, clearBets, totalStake, totalPayout } =
    useBetSlipStore();

  if (bets.length === 0) {
    return (
      <Card className="w-80">
        <p className="text-center text-slate-400 text-sm py-4">
          Your bet slip is empty. Add some bets to get started!
        </p>
      </Card>
    );
  }
  return (
    <Card className="w-80 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Your Bet Slip</h2>
        <Badge variant="info">
          {bets.length} {bets.length === 1 ? "bet" : "bets"}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        {bets.map((bet) => (
          <div
            key={bet.id}
            className="flex items-center justify-between rounded-md bg-slate-700 p-3"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-white text-sm font-medium">
                {bet.match}
              </span>
              <span className="text-slate-400 text-xs">
                {bet.outcome} @ {bet.odds}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeBet(bet.id)}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-slate-700 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Total Stake:</span>
          <span className="text-white font-medium">
            ${totalStake().toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Total Payout:</span>
          <span className="text-green-400 font-medium">
            ${totalPayout().toFixed(2)}
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={clearBets}
          >
            Clear All
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => console.log("Placing bets:", bets)}
          >
            Place Bet
          </Button>
        </div>
      </div>
    </Card>
  );
}
