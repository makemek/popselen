import { connectWebsocket } from "./src/socket";

const browserInstances: MessagePort[] = [];
const broadcastChannel = new BroadcastChannel("leaderboard-broadcast");
const socket = connectWebsocket(process.env.API_BASE_URL as string);

onconnect = function (ev) {
  const port = ev.ports[0];

  browserInstances.push(port);
  socket.on("leaderboard", (data) => {
    broadcastChannel.postMessage(data);
    browserInstances.map((inst) => inst.postMessage(data));
  });
};
