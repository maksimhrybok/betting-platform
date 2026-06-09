"use client";
import { useState } from "react";
import { useBetSlipStore } from "@/store/betSlipStore";
import { useShallow } from "zustand/react/shallow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const statusVariant = {
  pending: "info",
  won: "success",
  lost: "danger",
} as const;

const statusLabel = {
  pending: "Pending",
  won: "Won",
  lost: "Lost",
} as const;

export function BetSlip() {
  const { bets, removeBet, clearBets, updateStake, placeBets, totalStake, totalPayout } =
    useBetSlipStore();
  const history = useBetSlipStore(useShallow((s) => s.history));
  const [placed, setPlaced] = useState(false);

  const handlePlaceBet = () => {
    setPlaced(true);
    placeBets();
    setTimeout(() => setPlaced(false), 2500);
  };

  return (
    <div className="flex flex-col gap-4">
      {placed ? (
        <Card className="w-80 flex flex-col items-center gap-3 py-10">
          <div className="text-5xl">✅</div>
          <p className="text-white font-bold text-lg">Bets Placed!</p>
          <p className="text-slate-400 text-sm text-center">
            Your bets have been successfully placed. Good luck!
          </p>
        </Card>
      ) : bets.length === 0 ? (
        <Card className="w-80">
          <p className="text-center text-slate-400 text-sm py-4">
            Your bet slip is empty. Add some bets to get started!
          </p>
        </Card>
      ) : (
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
            className="flex flex-col gap-2 rounded-md bg-slate-700 p-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-white text-sm font-medium">
                  {bet.match}
                </span>
                <span className="text-slate-400 text-xs">
                  {bet.outcome} @{" "}
                  <span className="text-blue-400 font-bold">{bet.odds}</span>
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
            <div className="flex items-center gap-2">
              <label className="text-slate-400 text-xs shrink-0">Stake $</label>
              <input
                type="number"
                min="1"
                value={bet.stake}
                onChange={(e) =>
                  updateStake(bet.id, Math.max(1, Number(e.target.value)))
                }
                className="w-20 rounded bg-slate-600 px-2 py-1 text-sm text-white border border-slate-500 focus:outline-none focus:border-blue-500"
              />
              <span className="text-green-400 text-xs ml-auto">
                Win: ${(bet.stake * bet.odds).toFixed(2)}
              </span>
            </div>
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
            onClick={handlePlaceBet}
          >
            Place Bet
          </Button>
        </div>
      </div>
        </Card>
      )}

      {history.length > 0 && (
        <Card className="w-80 flex flex-col gap-3">
          <h2 className="text-white font-bold text-lg">My Bets</h2>
          <div className="flex flex-col gap-2">
            {history.map((bet) => (
              <div
                key={bet.id}
                className="flex flex-col gap-1 rounded-md bg-slate-700 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium truncate mr-2">
                    {bet.match}
                  </span>
                  <Badge variant={statusVariant[bet.status]}>
                    {statusLabel[bet.status]}
                  </Badge>
                </div>
                <span className="text-slate-400 text-xs">
                  {bet.outcome} @ {bet.odds}
                </span>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-slate-400">
                    Stake: <span className="text-white">${bet.stake}</span>
                  </span>
                  <span className="text-slate-400">
                    Payout:{" "}
                    <span className={bet.status === "won" ? "text-green-400" : "text-slate-300"}>
                      ${bet.payout.toFixed(2)}
                    </span>
                  </span>
                </div>
                <span className="text-slate-500 text-xs">{bet.placedAt}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

