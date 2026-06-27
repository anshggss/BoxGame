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

  heapify() {
    this.heapifyHelper(0);
  }

  private heapifyHelper(i: number) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    // Fix this nightmare
    // PS: I'm not used to typing
    if (
      l < this.heap.length &&
      this.heap[l]!.connections < this.heap[i]!.connections
    ) {
      largest = l;
    }
    if (
      r < this.heap.length &&
      this.heap[r]!.connections < this.heap[i]!.connections
    ) {
      largest = r;
    }
    if (largest != i) {
      let temp = this.heap[largest];
      this.heap[largest] = this.heap[i]!;
      this.heap[i] = temp!;
      this.heapifyHelper(largest);
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
        this.heapify();
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
    this.heapify();
    return "added";
  }

  pop() {
    if (this.heap.length < 1) {
      console.log("Heap is empty");
      return undefined;
    }
    let el = this.heap[0];
    this.heap = this.heap.slice(1);
    this.heapify();
    return el;
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
