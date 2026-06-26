import express from "express";
import addToRoom from "./routes/addToRoom";
import { createClient } from "redis";

const redisURL: string = process.env.REDIS_URL!;
const client = createClient({ url: redisURL });
try {
  await client.connect();
} catch (e) {
  console.error(e);
  process.exit(1);
}
const app = express();
const port = process.env.PORT || 3000;

app.post("/add", addToRoom);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

export default client;
