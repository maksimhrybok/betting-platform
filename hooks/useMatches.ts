import { Match } from "@/lib/mockData";
import { useQuery } from "@tanstack/react-query";

async function fetchMatches(): Promise<Match[]> {
  const response = await fetch("/api/matches");
  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }
  return response.json();
}

export function useMatches() {
  return useQuery({
    queryKey: ["matches"],
    queryFn: fetchMatches,
  });
}
