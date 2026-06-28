import createRoom from "./routes/createRoom";
import express from "express";
import addToRoom from "./routes/addToRoom";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
let roomMaps: { [id: string]: { [id: string]: string | number } } = {};

// Kubernetes health probe
app.get("/healthz", (_, res) => res.status(200).send("ok"));
// Adds a client to a given room
app.get("/add", addToRoom);
// Allocates a room to a client
app.get("/createRoom", createRoom);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

export default roomMaps;
