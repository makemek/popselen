import { Command, LEADERBOARD_CHANNEL } from "~/worker/src/constants";
import config from "../config";
import type { LeaderboardCallback } from "./WorkerMessageHandler";
import { WorkerMessageHandler } from "./WorkerMessageHandler";

export interface WorkerAdapter {
  listenLeaderboard: () => void;
  subscribeLeaderboard: (cb: LeaderboardCallback) => any;
}

export function loadWorker() {
  const isShareWorkerSupported = typeof SharedWorker === "function";
  if (isShareWorkerSupported) {
    return loadSharedWorker();
  }
  return loadWebWorker();
}

function loadSharedWorker(): WorkerAdapter {
  const sharedWorkerName = "popselen-socket-worker";
  const theSharedWorker = new SharedWorker(config.SHARED_WORKER, {
    type: "module",
    name: sharedWorkerName,
  });
  const ch = new BroadcastChannel(LEADERBOARD_CHANNEL);
  const wmh = new WorkerMessageHandler();

  ch.onmessage = (messageEvent) => wmh.handleIncommingMessage(messageEvent);

  return {
    listenLeaderboard() {
      theSharedWorker.port.postMessage(Command.LISTEN_LEADERBOARD);
    },
    subscribeLeaderboard(callback) {
      wmh.subscribeLeaderboard(callback);
    },
  };
}

function loadWebWorker(): WorkerAdapter {
  const webWorker = new Worker(config.WORKER, { type: "module" });
  const wmh = new WorkerMessageHandler();

  webWorker.onmessage = (messageEvent) =>
    wmh.handleIncommingMessage(messageEvent);

  return {
    listenLeaderboard() {
      webWorker.postMessage(Command.LISTEN_LEADERBOARD);
    },
    subscribeLeaderboard(callback) {
      wmh.subscribeLeaderboard(callback);
    },
  };
}
