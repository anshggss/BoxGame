import createRoom from "./routes/createRoom";
import express from "express";
import cors from "cors";
import addToRoom from "./routes/addToRoom";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Allow the client origin to send credentials (cookies).
// Locally: http://localhost:5500 or file:// – use * for dev convenience.
// On Vercel: set ALLOWED_ORIGIN=https://your-app.vercel.app

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
