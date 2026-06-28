import { type Request, type Response } from "express";
import client from "../index.ts";
const addToRoom = async (req: Request, res: Response) => {
  try {
    const roomId = await client.get("key");
    if (roomId == null) {
      // Find a cool server that can handle it
      await client.set("key", "value");
    } else {
      // Return the server ip in a cookie
    }
  } catch (e) {
    console.error(e);
  }
};

export default addToRoom;
