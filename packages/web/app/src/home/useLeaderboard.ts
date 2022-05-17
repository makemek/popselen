import type { LeaderboardPayload } from "../utils/WorkerMessageHandler";

export function useLeaderboard() {
  function handleUpdate(payload: LeaderboardPayload) {
    console.log(payload);
  }

  return {
    handleUpdate,
  };
}
