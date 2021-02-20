import { List } from '../list';
import { Collection } from '../collection';
import { ArrayList } from './array-list';

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
	constructor(isEqual?: (left: E, right: E) => boolean) {
		if (isEqual) {
			this.isEqual = isEqual;
		}
		this.length = 0;
		this.head = null;
		this.tail = null;
	}
	private length: number;
	private head: LinkedListNode<E> | null;
	private tail: LinkedListNode<E> | null;
	private isEqual: (left: E, right: E) => boolean = (left: E, right: E) => left === right;

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
			return true;
		}
		this.tail.next = newEle;
		newEle.prev = this.tail;
		this.tail = newEle;
		this.length++;
		return true;
	}
	addAll(list: Collection<E>): boolean {
		if (list.isEmpty()) {
			return false;
		}
		list.iterate((ele) => {
			this.add(ele);
			return false;
		});
		return true;
	}
	contains(ele: E): boolean {
		let flag = false;
		let current = this.head;
		while (current !== null) {
			if (this.isEqual(ele, current.data)) {
				flag = true;
				break;
			}
			current = current.next;
		}
		return flag;
	}
	containsAll(list: Collection<E>): boolean {
		return !list.iterate((e) => !this.contains(e));
	}
	iterate(on: (e: E) => boolean): boolean {
		let flag = false;
		let current = this.head;
		while (current !== null) {
			flag = on(current.data);
			if (flag) {
				break;
			}
			current = current.next;
		}
		return flag;
	}
	remove(ele: E): boolean {
		let current = this.head;
		let flag = false;
		while (current !== null) {
			if (this.isEqual(current.data, ele)) {
				if (current.prev !== null) {
					current.prev.next = current.next;
				} else {
					this.head = current.next;
				}
				if (current.next !== null) {
					current.next.prev = current.prev;
				} else {
					this.tail = current.prev;
				}
				this.length--;
				flag = true;
			}
			current = current.next;
		}
		return flag;
	}
	removeAll(list: Collection<E>): boolean {
		let flag = false;
		list.iterate((e) => {
			flag = flag || this.remove(e);
			return false;
		});
		return flag;
	}
	removeIf(filter: (ele: E) => boolean): boolean {
		let flag = false;
		let current = this.head;
		while (current !== null) {
			if (filter(current.data)) {
				if (current.prev !== null) {
					current.prev.next = current.next;
				} else {
					this.head = current.next;
				}
				if (current.next !== null) {
					current.next.prev = current.prev;
				} else {
					this.tail = current.prev;
				}
				this.length--;
				flag = flag || true;
			}
			current = current.next;
		}
		return flag;
	}
	retainAll(list: Collection<E>): boolean {
		let flag = false;
		this.iterate((e) => {
			if (!list.contains(e)) {
				flag = flag || this.remove(e);
			}
			return false;
		});
		return flag;
	}
	set(index: number, ele: E): void {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		let current = this.head;
		let position = 0;
		while (current !== null) {
			if (position === index) {
				current.data = ele;
				break;
			}
			current = current.next;
			position++;
		}
		return;
	}
	insert(index: number, ele: E): void {
		if (index < 0 || index > this.length) {
			throw new Error('out of the boundary');
		}
		if (index === this.length) {
			this.add(ele);
			return;
		}
		const newNode: LinkedListNode<E> = new LinkedListNode<E>(ele);
		if (index === 0) {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
			this.length++;
			return;
		}
		let current = this.head;
		let position = 0;
		while (current !== null && position !== index) {
			current = current.next;
			position++;
		}
		current.prev.next = newNode;
		newNode.prev = current.prev;
		current.prev = newNode;
		newNode.next = current;
		this.length++;
		return;
	}
	insertAll(index: number, list: Collection<E>): boolean {
		if (index < 0 || index > this.length) {
			throw new Error('out of the boundary');
		}
		if (list.size() === 0) {
			return false;
		}
		if (index === this.size()) {
			return this.addAll(list);
		}
		let i = index;
		list.iterate((ele) => {
			this.insert(i, ele);
			i++;
			return false;
		});
		return true;
	}
	get(index: number): E {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		let current = this.head;
		let position = 0;
		while (current !== null && position !== index) {
			current = current.next;
			position++;
		}
		return current.data;
	}
	indexOf(ele: E): number {
		let current = this.head;
		let position = 0;
		while (current !== null) {
			if (this.isEqual(current.data, ele)) {
				return position;
			}
			current = current.next;
			position++;
		}
		return -1;
	}
	lastIndexOf(ele: E): number {
		let current = this.tail;
		let position = this.length - 1;
		while (current !== null) {
			if (this.isEqual(current.data, ele)) {
				return position;
			}
			current = current.prev;
			position--;
		}
		return -1;
	}
	iterateFrom(index: number, on: (ele: E) => boolean): boolean {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		let flag = false;
		let current = this.head;
		let position = 0;
		while (current !== null) {
			if (position >= index) {
				flag = on(current.data);
				if (flag) {
					break;
				}
			}
			current = current.next;
			position++;
		}
		return flag;
	}
	removeIndex(index: number): E {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		let current = this.head;
		let position = 0;
		while (current !== null) {
			if (position === index) {
				if (current.prev !== null) {
					current.prev.next = current.next;
				} else {
					this.head = current.next;
				}
				if (current.next !== null) {
					current.next.prev = current.prev;
				} else {
					this.tail = current.prev;
				}
				this.length--;
				return current.data;
			}
			current = current.next;
			position++;
		}
	}
	replaceAll(operator: (ele: E) => E): void {
		let current = this.head;
		while (current !== null) {
			current.data = operator(current.data);
			current = current.next;
		}
		return;
	}
	sort(compare: (left: E, right: E) => number): void {
		if (this.isEmpty() || this.head.next === null) {
			return;
		}
		const array = new ArrayList(this.isEqual);
		this.iterate((ele) => array.add(ele));
		array.sort(compare);
		this.clear();
		this.addAll(array);
	}
	subList(from: number, to: number): LinkedList<E> {
		if (from > to || from < 0 || to >= this.length) {
			throw new Error('out of the boundary');
		}
		const sub = new LinkedList(this.isEqual);
		let current = this.head;
		let position = 0;
		while (current !== null) {
			if (position >= from && position < to) {
				sub.add(current.data);
			}
			current = current.next;
			position++;
		}
		return sub;
	}
}
