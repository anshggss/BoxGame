import { type Request, type Response } from "express";
import addToRoom from "./addToRoom";
const createRoom = async (req: Request, res: Response) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++)
    code += chars[Math.floor(Math.random() * chars.length)];

  //TODO: Add check for room code in redis
  req.cookies.roomId = code;
  await addToRoom(req, res);
};

export default createRoom;
