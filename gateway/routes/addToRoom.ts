import { type Request, type Response } from "express";
import roomMaps from "../index.ts";
const addToRoom = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send("No body");
    return;
  }
  const roomId = req.body.roomId;
  if (roomId == undefined || roomMaps[roomId] == undefined) {
    res.status(400).send("Invalid room id");
    return;
  }

  res.cookie("hostip", roomMaps[roomId]["hostIp"]);
  res.cookie("port", roomMaps[roomId]["port"]);
  res.status(200).send("here have your server");
  return;
};

export default addToRoom;
