/**
 * Web service worker fallback for shared worker that is unavailable to some browsers
 * https://caniuse.com/sharedworkers
 */

/// <reference lib="WebWorker" />

import { connectWebsocket } from "./src/socket";

const socket = connectWebsocket(process.env.API_BASE_URL as string);

onmessage = function (event) {
  const cmd = event.data;

  if (cmd === "listenLeaderboard") {
    listenLeaderboard();
  }
};

function listenLeaderboard() {
  socket.on("leaderboard", (data) => {
    postMessage(data);
  });
}
