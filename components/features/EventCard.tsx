"use client";

import { Match } from "@/lib/mockData";
import { useBetSlipStore } from "@/store/betSlipStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface EventCardProps {
  match: Match;
}

export function EventCard({ match }: EventCardProps) {
  const addBet = useBetSlipStore((state) => state.addBet);

  const handleOutcomeClick = (
    outcomeId: string,
    label: string,
    odds: number,
  ) => {
    addBet({
      id: crypto.randomUUID(),
      outcomeId: outcomeId,
      match: `${match.homeTeam} vs ${match.awayTeam}`,
      outcome: label,
      odds: odds,
      stake: 10,
    });
  };

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-slate-400">{match.league}</span>
          <h3 className="text-white font-bold">
            {match.homeTeam} vs {match.awayTeam}
          </h3>
          <span className="text-xs text-slate-400">{match.startTime}</span>
        </div>
        {match.isLive && <Badge variant="success">Live</Badge>}
      </div>

      <div className="flex gap-2 mt-3">
        {match.outcomes.map((outcome) => (
          <Button
            key={outcome.id}
            variant="outline"
            size="sm"
            className="flex-1 flex flex-col h-auto py-2"
            onClick={() =>
              handleOutcomeClick(outcome.id, outcome.label, outcome.odds)
            }
          >
            <span className="text-xs">{outcome.label}</span>
            <span className="font-bold">{outcome.odds}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
