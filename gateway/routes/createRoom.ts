import { type Request, type Response } from "express";
import generateRoom from "../helper/generateRoom";
import roomMaps from "../index.ts";
const createRoom = async (_: Request, res: Response) => {
  let code: string;

  // Generate a unqiue room code
  do {
    code = generateRoom();
  } while (roomMaps[code] != undefined);

  const serverManager = process.env.SERVER_MANAGER_URL;

  try {
    // Get assigned a server
    const response = await fetch(`${serverManager}/assign`);

    // Validate response
    if (
      response.headers.get("hostip") == null ||
      response.headers.get("port") == null
    ) {
      res.status(400).send("Couldn't get servers");
      return;
    }

    let roomInfo = {
      hostIp: "",
      port: 0,
    };
    roomInfo.hostIp = response.headers.get("hostip")!;
    roomInfo.port = Number(response.headers.get("port"));

    // Add roominfo in the map
    // TODO: Instead of using a map, use a key value store like Redis
    roomMaps[code] = roomInfo;

    // Set cookies
    res.cookie("hostIp", roomInfo.hostIp);
    res.cookie("port", roomInfo.port);
    res.cookie("roomID", code);
    res.status(200).send("Here have your server");
  } catch (e) {
    console.error(e);
    res.status(400).send("Bad request");
  }
};

export default createRoom;
