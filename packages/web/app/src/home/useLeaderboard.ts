import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { LeaderboardPayload } from "../types/leaderboard.payload";

export function useLeaderboard() {
  const initialLeaderboard = useLoaderData<Record<string, number>>();
  const [leaderboard, setLeaderboard] =
    useState<Record<string, number>>(initialLeaderboard);

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
