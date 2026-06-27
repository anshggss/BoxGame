import { type Response, type Request } from "express";
import connections from "../index.ts";
const assignServer = async (req: Request, res: Response) => {
  let bestServer = connections.pop();
  // Fix this too omg
  if (typeof bestServer![1] == "number") {
    bestServer![1] += 1;
  }
  connections.push(bestServer!);
  // Now we have the name of the best server
  // We need to find the ip and port mapping of the server
};

export default assignServer;
