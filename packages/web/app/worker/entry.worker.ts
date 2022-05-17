/**
 * Web service worker fallback for shared worker that is unavailable to some browsers
 * https://caniuse.com/sharedworkers
 */

/// <reference lib="WebWorker" />

import { Command, SocketEvent, WorkerEvent } from "./src/constants";
import { connectWebsocket } from "./src/socket";

const socket = connectWebsocket(process.env.API_BASE_URL as string);

onmessage = function (event) {
  const command = event.data;

  if (command === Command.LISTEN_LEADERBOARD) {
    listenLeaderboard();
  }
};

function listenLeaderboard() {
  socket.on(SocketEvent.LEADERBOARD_EVENT, (data) => {
    postMessage({
      event: WorkerEvent.LEADERBOARD_EVENT,
      payload: data,
    });
  });
}
