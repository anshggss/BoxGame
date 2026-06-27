import { type Request, type Response } from "express";
import connections from "../index.ts";

// interface Server {
//   hostIp: string;
//   port: number;
//   connections: number;
// }

const handleRegister = (req: Request, res: Response) => {
  const server = req.body.serverInfo;
  if (!server.hostIp || !server.port) {
    res.status(401).send("Invalid server info");
    return;
  }
  if (!server.connections) {
    server.connections = 0;
  }
  connections.push(server);
  res.status(200).send("Yay now you're registered hehehehehe!");
};

export default handleRegister;
