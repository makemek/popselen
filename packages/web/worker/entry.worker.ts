// import { connectWebsocket } from "./src/socket";
let browserInstances: MessagePort[] = [];
let count = 0;
// const socket = connectWebsocket(process.env.API_BASE_URL as string);

onconnect = function (ev) {
  const port = ev.ports[0];

  count++;
  browserInstances.push(port);

  console.log("asdfsdf", count);

  browserInstances.map((inst) => inst.postMessage(`pong ${count}`));
};

export type {};
