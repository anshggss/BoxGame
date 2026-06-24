import express from "express";
import addToRoom from "./routes/addToRoom";
import removeFromRoom from "./routes/removeFromRoom";

const app = express();
const port = process.env.PORT || 3000;

app.post("/add", addToRoom);
app.post("/remove", removeFromRoom);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
