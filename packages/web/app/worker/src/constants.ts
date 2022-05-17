export const LEADERBOARD_CHANNEL = "leaderboard-broadcast";

export enum Command {
  LISTEN_LEADERBOARD = "listenLeaderboard",
}

export enum SocketEvent {
  LEADERBOARD_EVENT = "leaderboard",
}

export enum WorkerEvent {
  LEADERBOARD_EVENT = "leaderboard",
}

export type WorkerResponse<T> = {
  event: WorkerEvent;
  payload: T;
};
