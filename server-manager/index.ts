// This orchestrator talks with the server orchestrator to get the best server right now
import express from "express";
import assignServer from "./routes/assignServer";
import Heap from "./helper/heap";
import { KubeConfig, CoreV1Api } from "@kubernetes/client-node";
import handleRegister from "./routes/handleRegister";

const app = express();
const port = process.env.PORT || 4689;
const kc = new KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(CoreV1Api);
const servers = await k8sApi.listNamespacedPod({
  namespace: "box-game-servers",
});

const connections = new Heap();

app.get("/assign", assignServer);
app.post("/register", handleRegister);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

export default connections;
