class Node<T> {
  private _value: T;
  private _next?: Node<T>;

  constructor(value: T) {
    this._value = value;
  }

  setNext(next: Node<T>) {
    this._next = next;
  }

  get next() {
    return this._next;
  }

  get value() {
    return this._value;
  }
}

export class Queue<ValueType> implements Iterable<ValueType> {
  private head?: Node<ValueType>;
  private tail?: Node<ValueType>;
  private _size = 0;

  constructor() {
    this.clear();
  }

  enqueue(value: ValueType): void {
    const node = new Node(value);

    if (this.head) {
      this.tail.setNext(node);
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this._size++;
  }

  dequeue(): ValueType | undefined {
    const current = this.head;
    if (!current) {
      return;
    }

    this.head = this.head.next;
    this._size--;
    return current.value;
  }

  clear() {
    this.head = undefined;
    this.tail = undefined;
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  *[Symbol.iterator](): IterableIterator<ValueType> {
    let current = this.head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}

export function pLimit(concurrency: number) {
  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new TypeError('Expected `concurrency` to be a number from 1 and up');
  }

  const queue = new Queue<() => Promise<any>>();
  let activeCount = 0;

  const next = () => {
    activeCount--;

    if (queue.size > 0) {
      queue.dequeue()();
    }
  };

  const run = async (fn, resolve, args) => {
    activeCount++;

    const result = (async () => fn(...args))();

    resolve(result);

    try {
      await result;
    } catch {}

    next();
  };

  const enqueue = (fn, resolve, args) => {
    queue.enqueue(run.bind(undefined, fn, resolve, args));

    (async () => {
      // This function needs to wait until the next microtask before comparing
      // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
      // when the run function is dequeued and called. The comparison in the if-statement
      // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
      await Promise.resolve();

      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };

  const generator = (fn, ...args) =>
    new Promise((resolve) => {
      enqueue(fn, resolve, args);
    });

  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.size,
    },
    clearQueue: {
      value: () => {
        queue.clear();
      },
    },
  });

  return generator;
}
