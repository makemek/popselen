import {
  Command,
  LEADERBOARD_CHANNEL,
  SocketEvent,
  WorkerEvent,
} from "./src/constants";
import { connectWebsocket } from "./src/socket";

const broadcastChannel = new BroadcastChannel(LEADERBOARD_CHANNEL);
const socket = connectWebsocket(process.env.API_BASE_URL as string);

onconnect = function (event) {
  const port = event.ports[0];

  port.onmessage = handleIncommingMessage;
};

function handleIncommingMessage(messageEvent: MessageEvent<Command>) {
  const command = messageEvent.data;

  if (command === Command.LISTEN_LEADERBOARD) {
    listenLeaderboard();
  }
}

function listenLeaderboard() {
  socket.on(SocketEvent.LEADERBOARD_EVENT, (data) => {
    broadcastChannel.postMessage({
      event: WorkerEvent.LEADERBOARD_EVENT,
      payload: data,
    });
  });
}
