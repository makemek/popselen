import { useState } from "react";
import type { LeaderboardPayload } from "../utils/WorkerMessageHandler";

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<Record<string, number>>({});

  function handleUpdate(payload: LeaderboardPayload) {
    const { country, value } = payload;
    setLeaderboard({
      ...leaderboard,
      [country]: value,
    });
  }

  return {
    handleUpdate,
    leaderboard,
  };
}
