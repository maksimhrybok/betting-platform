"use client";

import { BetSlip } from "@/components/features/BetSlip";
import { EventCard } from "@/components/features/EventCard";
import { useMatches } from "@/hooks/useMatches";

export default function Home() {
  const { data: matches, isLoading, isError } = useMatches();

  return (
    <div className="flex min-h-screen gap-8 p-8">
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-white text-2xl font-bold">Events</h1>

        {isLoading && <p className="text-slate-400">Loading matches...</p>}

        {isError && (
          <p className="text-red-400">Failed to load matches. Try again.</p>
        )}

        {matches?.map((match) => (
          <EventCard key={match.id} match={match} />
        ))}
      </div>

      <div className="w-80 shrink-0">
        <h2 className="text-white text-2xl font-bold mb-4">Bet Slip</h2>
        <BetSlip />
      </div>
    </div>
  );
}
