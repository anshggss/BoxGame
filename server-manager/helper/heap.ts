// This helper class implements a heap which is how we'll be storing the servers
// and the number of connections that they currently have.
//
// This would allow for O(log n) time lookup for the best server

import type { Server } from "../types/server.ts";

// interface Server {
//   hostIp: string;
//   port: number;
//   connections: number;
// }

class Heap {
  // The heap stores all the servers that are currently registered to the server-manager sorted
  // by connections
  heap: Server[] = [];
  // The curList stores all the servers that are currently registered to the server-manager mapped
  // by portNumber -> connections
  curList: { [id: number]: number } = {};

  swap(a: number, b: number) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b]!;
    this.heap[b] = temp!;
  }

  bubbleUp(i: number) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      if (this.heap[parent]!.connections < this.heap[i]!.connections) {
        break;
      }
      this.swap(i, parent);
      i = parent;
    }
  }

  bubbleDown(i: number) {
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (
        left < this.heap.length &&
        this.heap[left]!.connections < this.heap[smallest]!.connections
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right]!.connections < this.heap[smallest]!.connections
      ) {
        smallest = right;
      }
      if (smallest == i) break;
      this.swap(smallest, i);
      i = smallest;
    }
  }

  incrementConnection(server: Server) {
    if (this.curList[server.port] == undefined) {
      console.log("Can't increment a server that isn't present!");
      return;
    }
    this.heap.forEach((serv, idx) => {
      if (serv.port == server.port && serv.hostIp == server.hostIp) {
        this.heap[idx]!.connections += 1;
        this.bubbleDown(idx);
        this.curList[server.port]! += 1;
      }
    });
  }

  push(connection: Server): string {
    if (this.curList[connection.port] != undefined) {
      return "present";
    }
    this.curList[connection.port] = connection.connections;
    this.heap.push(connection);
    this.bubbleUp(this.heap.length - 1);
    return "added";
  }

  pop() {
    if (this.heap.length < 1) {
      console.log("Heap is empty");
      return undefined;
    }
    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    delete this.curList[root!.port];

    this.bubbleDown(0);

    return root;
  }

  peek(): Server | undefined {
    if (this.heap.length < 1) {
      console.log("Heap is empty");
      return;
    }
    return this.heap[0];
  }
}

export default Heap;
