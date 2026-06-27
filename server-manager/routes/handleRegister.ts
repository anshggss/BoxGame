import type { Server } from "bun";
import { type Request, type Response } from "express";

// interface Server {
//   hostIp: string;
//   port: number;
//   connections: number;
// }

const handleRegister = (req: Request, res: Response) => {
  const server = req.body.serverInfo;
  if (!server.hostIp || !server.port) {
    res.status(401).send("Invalid server info");
  }
  if (!server.connections) {
    server.connections = 0;
  }
};

export default handleRegister;
