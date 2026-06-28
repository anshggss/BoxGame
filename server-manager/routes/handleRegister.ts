import { type Request, type Response } from "express";
import connections from "../index.ts";

// interface Server {
//   hostIp: string;
//   port: number;
//   connections: number;
// }

const handleRegister = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(401).send("Invalid server info");
    return;
  }
  const server = req.body; // server.ts sends flat: { hostIp, port, connections }
  if (!server.hostIp || !server.port) {
    res.status(401).send("Invalid server info");
    return;
  }
  if (!server.connections) {
    server.connections = 0;
  }
  let stat = connections.push(server);
  if (stat == "present") {
    res.status(400).send("No bro you're already present");
    return;
  }
  console.log(connections.heap);
  res.status(200).send("Yay now you're registered hehehehehe!");
  return;
};

export default handleRegister;
