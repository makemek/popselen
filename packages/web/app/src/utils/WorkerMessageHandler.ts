import type { WorkerResponse } from "~/worker/src/constants";
import { WorkerEvent } from "~/worker/src/constants";
import type { LeaderboardPayload } from "../types/leaderboard.payload";

export type LeaderboardCallback = (payload: LeaderboardPayload) => any;

const noOpFunc = () => undefined;

export class WorkerMessageHandler {
  listener: Record<WorkerEvent, LeaderboardCallback> = {
    [WorkerEvent.LEADERBOARD_EVENT]: noOpFunc,
  };

  subscribeLeaderboard(callback: LeaderboardCallback) {
    this.listener.leaderboard = callback;
  }

  handleIncommingMessage(messageEvent: MessageEvent<WorkerResponse<any>>) {
    const { event, payload } = messageEvent.data;
    const callback = this.listener[event];
    callback?.(payload);
  }
}
