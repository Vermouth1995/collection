class DoubleLinkedListNode<T> {
	constructor(data: T | null, next: DoubleLinkedListNode<T> | null = null, prev: DoubleLinkedListNode<T> | null = null) {
		this.data = data;
		this.next = next;
		this.prev = prev;
	}
	data: T | null;
	next: DoubleLinkedListNode<T> | null;
	prev: DoubleLinkedListNode<T> | null;
}

export class DoubleLinkedList<T> {
	constructor() {
		this.size = 0;
		this.head = null;
		this.tail = null;
	}
	private size: number;
	private head: DoubleLinkedListNode<T> | null;
	private tail: DoubleLinkedListNode<T> | null;

	getSize(): number {
		return this.size;
	}

	insertToHead(value: T): void {
		const newNode: DoubleLinkedListNode<T> = new DoubleLinkedListNode<T>(value);
		if (this.size === 0) {
			this.head = newNode;
			this.tail = newNode;
			this.size++;
			return;
		}
		newNode.next = this.head;
		this.head.prev = newNode;
		this.head = newNode;
		this.size++;
		return;
	}

	insertToTail(value: T): void {
		const newNode: DoubleLinkedListNode<T> = new DoubleLinkedListNode<T>(value);
		if (this.size === 0) {
			this.head = newNode;
			this.tail = newNode;
			this.size++;
			return;
		}
		this.tail.next = newNode;
		newNode.prev = this.tail;
		this.tail = newNode;
		this.size++;
		return;
	}

	insertToIndex(value: T, index: number): void {
		const newNode: DoubleLinkedListNode<T> = new DoubleLinkedListNode<T>(value);
		if (index <= 0) {
			this.insertToHead(value);
			return;
		}
		if (index >= this.size) {
			this.insertToTail(value);
			return;
		}
		let node = this.head;
		let position = 0;
		while (node.next !== null && position !== index) {
			node = node.next;
			position++;
		}
		node.prev.next = newNode;
		newNode.prev = node.prev;
		node.prev = newNode;
		newNode.next = node;
		this.size++;
		return;
	}

	iterateFromHead(onIterate: (value: T) => void): void {
		let current = this.head;
		while (current !== null) {
			onIterate(current.data);
			current = current.next;
		}
	}

	iterateFromTail(onIterate: (value: T) => void): void {
		let current = this.tail;
		while (current !== null) {
			onIterate(current.data);
			current = current.prev;
		}
	}

	private findByValue(value: T): DoubleLinkedListNode<T> | null {
		let current = this.head;
		while (current !== null) {
			if (current.data === value) {
				return current;
			}
			current = current.next;
		}
		return null;
	}

	findByIndex(index: number): T | null {
		if (this.size === 0 || index >= this.size) {
			return null;
		}
		let current = this.head;
		let position = 0;
		while (current.next !== null && position !== index) {
			current = current.next;
			position++;
		}
		return current.data;
	}

	remove(value: T): void {
		const node = this.findByValue(value);
		if (node === null) {
			return;
		}
		if (node.prev !== null) {
			node.prev.next = node.next;
		} else {
			this.head = node.next;
		}
		if (node.next !== null) {
			node.next.prev = node.prev;
		} else {
			this.tail = node.prev;
		}
		this.size--;
		return;
	}
}
