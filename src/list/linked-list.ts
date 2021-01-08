import { List } from './interface';

class DoubleLinkedListNode<E> {
	constructor(
		data: E | null,
		next: DoubleLinkedListNode<E> | null = null,
		prev: DoubleLinkedListNode<E> | null = null
	) {
		this.data = data;
		this.next = next;
		this.prev = prev;
	}
	data: E | null;
	next: DoubleLinkedListNode<E> | null;
	prev: DoubleLinkedListNode<E> | null;
}

export class LinkedList<E> implements List<E> {
	constructor() {
		this.length = 0;
		this.head = null;
		this.tail = null;
	}
	private length: number;
	private head: DoubleLinkedListNode<E> | null;
	private tail: DoubleLinkedListNode<E> | null;
}
