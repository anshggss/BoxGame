import { type Request, type Response } from "express";
import roomMaps from "../index.ts";
const addToRoom = async (req: Request, res: Response) => {
  // roomID comes from the query string: GET /add?roomID=ABCDE
  const roomId = (req.query.roomID as string | undefined)?.toUpperCase();
  if (!roomId || roomMaps[roomId] == undefined) {
    res.status(400).send("Invalid room id");
    return;
  }

  // Use the same cookie names as createRoom so the client's getCookie() works
  res.cookie("hostIp", roomMaps[roomId]["hostIp"]);
  res.cookie("port", roomMaps[roomId]["port"]);
  res.status(200).send("here have your server");
  return;
};

export default addToRoom;
