// This orchestrator talks with the server orchestrator to get the best server right now
import express from "express";
import assignServer from "./routes/assignServer";
import Heap from "./helper/heap";
import { KubeConfig, CoreV1Api } from "@kubernetes/client-node";

const app = express();
const port = process.env.PORT || 4689;
const kc = new KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(CoreV1Api);
const servers = await k8sApi.listNamespacedPod({
  namespace: "box-game-servers",
});

const connections = new Heap();

servers.items.forEach((server) => {
  // If the connection isn't present in the heap, don't do anything
  // Else push the connection onto the heap
  //
  //
  // Fix this please the `!`s' are getting to me
  if (connections.curList[server.metadata!.name!] == undefined) {
    let arrEl = [server.metadata!.name!, 0];
    connections.push(arrEl);
  }
});

app.get("/assign", assignServer);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

export default connections;
