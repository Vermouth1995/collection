import { List } from './interface';

class LinkedListNode<E> {
	constructor(data: E, next: LinkedListNode<E> | null = null, prev: LinkedListNode<E> | null = null) {
		this.data = data;
		this.next = next;
		this.prev = prev;
	}
	data: E;
	next: LinkedListNode<E> | null;
	prev: LinkedListNode<E> | null;
}

export class LinkedList<E> implements List<E> {
	constructor() {
		this.length = 0;
		this.head = null;
		this.tail = null;
	}
	private length: number;
	private head: LinkedListNode<E> | null;
	private tail: LinkedListNode<E> | null;

	size(): number {
		return this.length;
	}
	isEmpty(): boolean {
		return this.length === 0;
	}
	clear(): void {
		this.length = 0;
		this.head = null;
		this.tail = null;
		return;
	}
	add(ele: E): boolean {
		const newEle: LinkedListNode<E> = new LinkedListNode<E>(ele);
		if (this.isEmpty()) {
			this.head = newEle;
			this.tail = newEle;
			this.length++;
			return;
		}
		this.tail.next = newEle;
		newEle.prev = this.tail;
		this.tail = newEle;
		this.length++;
		return true;
	}
	addAll(list: LinkedList<E>): boolean {
		if (list.isEmpty()) {
			return false;
		}
		list.iterate((ele) => {
			this.add(ele);
		});
		return true;
	}
	contains(ele: E): boolean {
		return;
	}
	containsAll(list: LinkedList<E>): boolean {
		return;
	}
	iterate(on: (ele: E) => void): void {
		let current = this.head;
		while (current !== null) {
			on(current.data);
			current = current.next;
		}
		return;
	}
	remove(ele: E): boolean {
		return;
	}
	removeAll(list: LinkedList<E>): boolean {
		return;
	}
	removeIf(filter: (ele: E) => boolean): boolean {
		return;
	}
	retainAll(list: LinkedList<E>): boolean {
		return;
	}
}
