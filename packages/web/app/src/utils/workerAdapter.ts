import { Command, LEADERBOARD_CHANNEL } from "~/worker/src/constants";
import type {
  LeaderboardCallback} from "./WorkerMessageHandler";
import {
  WorkerMessageHandler,
} from "./WorkerMessageHandler";

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
  const { sharedWorker } = window.__remixContext.routeData.root;
  const theSharedWorker = new SharedWorker(sharedWorker, {
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
  const { worker } = window.__remixContext.routeData.root;
  const webWorker = new Worker(worker, { type: "module" });
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
