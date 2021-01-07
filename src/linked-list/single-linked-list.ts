class SingleLinkedListNode<T> {
	constructor(data: T | null, next: SingleLinkedListNode<T> | null = null) {
		this.data = data;
		this.next = next;
	}
	data: T | null;
	next: SingleLinkedListNode<T> | null;
}

export class SingleLinkedList<T> {
	constructor() {
		this.size = 0;
		this.head = null;
	}
	private size: number;
	// 真正的头结点，不是哨兵结点
	private head: SingleLinkedListNode<T> | null;

	getSize(): number {
		return this.size;
	}

	insertToTail(value: T): void {
		const newNode: SingleLinkedListNode<T> = new SingleLinkedListNode<T>(value);
		if (this.size === 0) {
			this.head = newNode;
			this.size++;
			return;
		}
		let node = this.head;
		while (node.next !== null) {
			node = node.next;
		}
		node.next = newNode;
		this.size++;
	}

	insertToIndex(value: T, index: number): void {
		const newNode: SingleLinkedListNode<T> = new SingleLinkedListNode<T>(value);
		if (index >= this.size) {
			this.insertToTail(value);
			return;
		}
		if (index <= 0) {
			newNode.next = this.head;
			this.head = newNode;
			this.size++;
			return;
		}
		let node = this.head;
		let position = 0;
		while (node.next !== null && position !== index - 1) {
			node = node.next;
			position++;
		}
		newNode.next = node.next;
		node.next = newNode;
		this.size++;
		return;
	}

	iterate(onIterate: (value: T) => void): void {
		let current = this.head;
		while (current !== null) {
			onIterate(current.data);
			current = current.next;
		}
	}

	private findByValue(value: T): SingleLinkedListNode<T> | null {
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
		let node = this.findByValue(value);
		if (node === null) {
			return;
		}
		if (node.next === null) {
			node = null;
			this.size--;
			return;
		}
		node.next = node.next.next;
		this.size--;
		return;
	}

	reverse(): void {
		let current = this.head;
		let prev = null;
		while (current !== null) {
			const next = current.next;
			current.next = prev;
			prev = current;
			current = next;
		}
		return;
	}
}
