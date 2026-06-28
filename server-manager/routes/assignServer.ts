import { type Response, type Request } from "express";
import connections from "../index.ts";
const assignServer = async (req: Request, res: Response) => {
  let bestServer = connections.pop();
  // Increment the number of connections for the bestServer
  if (bestServer == undefined) {
    console.error("No servers in the discovery");
    res.status(405).send("No servers available");
    return;
  }

  bestServer.connections += 1;
  // Push the best server on the heap
  connections.push(bestServer);
  // Send the best server details to the gateway
  res.set(bestServer);
  res.status(200).send("Here bro have your server");
  return;
};

export default assignServer;
