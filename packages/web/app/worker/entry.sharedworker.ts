import { Command, LEADERBOARD_CHANNEL, SocketEvent } from "./src/constants";
import { connectWebsocket } from "./src/socket";

const broadcastChannel = new BroadcastChannel(LEADERBOARD_CHANNEL);
const socket = connectWebsocket(process.env.API_BASE_URL as string);

onmessage = function (ev) {
  const command = ev.data;

  if (command === Command.LISTEN_LEADERBOARD) {
    listenLeaderboard();
  }
};

function listenLeaderboard() {
  socket.on(SocketEvent.LEADERBOARD_EVENT, (data) => {
    broadcastChannel.postMessage(data);
  });
}
