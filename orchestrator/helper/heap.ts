// This helper class implements a heap which is how we'll be storing the servers
// and the number of connections that they currently have.
//
// This would allow for O(log n) time lookup for the best server

class Heap {
  heap: (string | number)[][] = [];
  curList: { [id: string]: number } = {};

  heapify() {
    this.heapifyHelper(0);
  }

  private heapifyHelper(i: number) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    // Fix this nightmare
    // PS: I'm not used to typing
    if (l < this.heap.length && this.heap[l]![1]! < this.heap[i]![1]!) {
      largest = l;
    }
    if (r < this.heap.length && this.heap[r]![1]! < this.heap[i]![1]!) {
      largest = r;
    }
    if (largest != i) {
      let temp = this.heap[largest];
      this.heap[largest] = this.heap[i]!;
      this.heap[i] = temp!;
      this.heapifyHelper(largest);
    }
  }

  push(connection: (string | number)[]) {
    this.heap.push(connection);
    this.heapify();
    if (this.curList[connection[0]!] != undefined) {
      this.curList[connection[0]!]! += 1;
    } else {
      this.curList[connection[0]!] = 1;
    }
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

  peek(): (string | number)[] | undefined {
    if (this.heap.length < 1) {
      console.log("Heap is empty");
      return;
    }
    return this.heap[0];
  }
}

export default Heap;
