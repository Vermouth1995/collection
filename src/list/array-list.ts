import { List } from '../list';
import { Collection } from '../collection';

export class ArrayList<E> implements List<E> {
	constructor(isEqual: (left: E, right: E) => boolean, capacity?: number) {
		if (capacity) {
			this.capacity = capacity;
		}
		this.list = new Array<E>(this.capacity);
		this.isEqual = isEqual;
		this.length = 0;
	}
	private list: E[];
	private isEqual: (left: E, right: E) => boolean;
	private length: number; // 实际长度
	private capacity: number = 10; // 数组容量
	private static readonly FACTOR: number = 1.5; // 扩容系数

	size(): number {
		return this.length;
	}
	isEmpty(): boolean {
		return this.length === 0;
	}
	clear(): void {
		this.list = new Array<E>(this.capacity);
		this.length = 0;
		return;
	}
	private swell(newCapacity?: number): void {
		this.capacity = Math.ceil((newCapacity ? newCapacity : this.capacity) * ArrayList.FACTOR);
		const newList = new Array<E>(this.capacity);
		for (let i = 0; i < this.length; i++) {
			newList[i] = this.list[i];
		}
		this.list = newList;
		return;
	}
	changeCapacity(newCapacity: number): void {
		if (newCapacity < this.length) {
			throw new Error('capacity is too small');
		}
		this.swell(newCapacity);
		return;
	}
	add(ele: E): boolean {
		if (this.length >= this.capacity) {
			this.swell();
		}
		this.list[this.length] = ele;
		this.length++;
		return true;
	}
	addAll(list: Collection<E>): boolean {
		if (list.isEmpty()) {
			return false;
		}
		const total = this.length + list.size();
		if (this.capacity <= total) {
			this.swell(total);
		}
		list.iterate((ele) => {
			this.add(ele);
		});
		return true;
	}
	contains(ele: E): boolean {
		let flag = false;
		for (let i = 0; i < this.length; i++) {
			if (this.isEqual(ele, this.list[i])) {
				flag = true;
				break;
			}
		}
		return flag;
	}
	containsAll(list: Collection<E>): boolean {
		let flag = false;
		list.iterate((e) => {
			// bug
			flag = flag && this.contains(e);
		});
		return flag;
	}
	iterate(on: (ele: E) => void): void {
		for (let i = 0; i < this.length; i++) {
			on(this.list[i]);
		}
		return;
	}
	remove(ele: E): boolean {
		let position = this.indexOf(ele);
		if (position === -1) {
			return false;
		}
		while (position !== -1) {
			if (position === this.length - 1) {
				this.length -= 1;
				continue;
			}
			for (let i = position; i < this.length - 1; i++) {
				this.set(i, this.list[i + 1]);
			}
			this.length -= 1;
			position = this.indexOf(ele);
		}
		return true;
	}
	removeAll(list: Collection<E>): boolean {
		let flag = false;
		list.iterate((e) => {
			flag = flag || this.remove(e);
		});
		return flag;
	}
	removeIf(filter: (ele: E) => boolean): boolean {
		let flag = false;
		this.iterate((e) => {
			if (filter(e)) {
				flag = flag || this.remove(e);
			}
		});
		return flag;
	}
	retainAll(list: Collection<E>): boolean {
		let flag = false;
		this.iterate((e) => {
			if (!list.contains(e)) {
				flag = flag || this.remove(e);
			}
		});
		return flag;
	}
	set(index: number, ele: E): void {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		this.list[index] = ele;
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
		if (this.length >= this.capacity) {
			this.swell();
		}
		this.length += 1;
		for (let i = this.length - 1; i > index; i--) {
			this.set(i, this.list[i - 1]);
		}
		this.set(index, ele);
		return;
	}
	insertAll(index: number, list: Collection<E>): boolean {
		if (index < 0 || index > this.length) {
			throw new Error('out of the boundary');
		}
		if (list.size() === 0) {
			return false;
		}
		if (index === this.length) {
			this.addAll(list);
			return true;
		}
		const total = this.length + list.size();
		if (this.capacity <= total) {
			this.swell(total);
		}
		this.length += list.size();
		for (let i = this.length - 1; i > index; i--) {
			this.set(i, this.list[i - list.size()]);
		}
		let i = 0;
		list.iterate((ele) => {
			this.set(i + index, ele);
			i++;
		});
		return true;
	}
	get(index: number): E {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		return this.list[index];
	}
	indexOf(ele: E): number {
		for (let i = 0; i < this.length; i++) {
			if (this.isEqual(this.list[i], ele)) {
				return i;
			}
		}
		return -1;
	}
	lastIndexOf(ele: E): number {
		for (let i = this.length - 1; i >= 0; i--) {
			if (this.isEqual(this.list[i], ele)) {
				return i;
			}
		}
		return -1;
	}
	iterateFrom(index: number, on: (ele: E) => void): void {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		for (let i = index; i < this.length; i++) {
			on(this.list[i]);
		}
		return;
	}
	removeIndex(index: number): E {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		const ele = this.list[index];
		if (index === this.length - 1) {
			this.length -= 1;
			return ele;
		}
		for (let i = index; i < this.length - 1; i++) {
			this.set(i, this.list[i + 1]);
		}
		this.length -= 1;
		return ele;
	}
	replaceAll(operator: (ele: E) => E): void {
		for (let i = 0; i < this.length; i++) {
			this.set(i, operator(this.list[i]));
		}
		return;
	}
	sort(compare: (left: E, right: E) => number): void {
		for (let i = 1; i < this.length; i++) {
			const ele = this.list[i];
			for (var j = i - 1; j >= 0; j--) {
				const tmp = this.list[j];
				const order = compare(tmp, ele);
				if (order > 0) {
					this.set(j + 1, tmp);
				} else {
					break;
				}
			}
			this.set(j + 1, ele);
		}
		return;
	}
	subList(from: number, to: number): ArrayList<E> {
		if (from > to || from < 0 || to >= this.length) {
			throw new Error('out of the boundary');
		}
		const sub = new ArrayList(this.isEqual, (to - from) * ArrayList.FACTOR);
		for (let i = from; i < to; i++) {
			sub.add(this.list[i]);
		}
		return sub;
	}
}
