import { List } from '../list';

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
	private swell(newCapacity?: number) {
		this.capacity = Math.ceil((newCapacity ? newCapacity : this.capacity) * ArrayList.FACTOR);
		const newList = new Array<E>(this.capacity);
		for (let i = 0; i < this.length; i++) {
			newList[i] = this.get(i);
		}
		this.list = newList;
	}
	changeCapacity(newCapacity: number) {
		if (newCapacity < this.length) {
			throw new Error('capacity is too small');
		}
		this.capacity = Math.ceil(newCapacity);
		const newList = new Array<E>(this.capacity);
		for (let i = 0; i < this.length; i++) {
			newList[i] = this.get(i);
		}
		this.list = newList;
	}
	add(ele: E): boolean {
		if (this.length >= this.capacity) {
			this.swell();
		}
		this.list[this.length] = ele;
		this.length++;
		return;
	}
	addAll(list: ArrayList<E>): boolean {
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
			if (this.isEqual(ele, this.get(i))) {
				flag = true;
				break;
			}
		}
		return flag;
	}
	containsAll(list: ArrayList<E>): boolean {
		let flag = false;
		list.iterate((e) => {
			flag = flag && this.contains(e);
		});
		return flag;
	}
	iterate(on: (ele: E) => void): void {
		for (let i = 0; i < this.length; i++) {
			on(this.get(i));
		}
		return;
	}
	remove(ele: E): boolean {
		if (this.indexOf(ele) === -1) {
			return false;
		}
		while (this.indexOf(ele) !== -1) {
			let pos = this.indexOf(ele);
			if (pos === this.length - 1) {
				this.length -= 1;
				continue;
			}
			for (let i = pos; i < this.length - 1; i++) {
				this.set(i, this.get(i + 1));
			}
			this.length -= 1;
		}
		return true;
	}
	removeAll(list: ArrayList<E>): boolean {
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
	retainAll(list: ArrayList<E>): boolean {
		// TODO
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
		this.length += 1;
		for (let i = this.length - 1; i > index; i--) {
			this.set(i, this.get(i - 1));
		}
		this.set(index, ele);
		return;
	}
	insertAll(index: number, list: ArrayList<E>): boolean {
		if (index < 0 || index > this.length) {
			throw new Error('out of the boundary');
		}
		if (list.length === 0) {
			return false;
		}
		if (index === this.length) {
			this.addAll(list);
			return true;
		}
		this.length += list.length;
		for (let i = this.length - 1; i > index; i--) {
			this.set(i, this.get(i - list.length));
		}
		for (let i = 0; i < list.length; i++) {
			this.set(i + index, list.get(i));
		}
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
			if (this.isEqual(this.get(i), ele)) {
				return i;
			}
		}
		return -1;
	}
	lastIndexOf(ele: E): number {
		for (let i = this.length - 1; i >= 0; i--) {
			if (this.isEqual(this.get(i), ele)) {
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
			on(this.get(i));
		}
		return;
	}
	removeIndex(index: number): E {
		if (index < 0 || index >= this.length) {
			throw new Error('out of the boundary');
		}
		const ele = this.get(index);
		if (index === this.length - 1) {
			this.length -= 1;
			return ele;
		}
		for (let i = index; i < this.length - 1; i++) {
			this.set(i, this.get(i + 1));
		}
		this.length -= 1;
		return ele;
	}
	replaceAll(operator: (ele: E) => E): void {
		for (let i = 0; i < this.length; i++) {
			this.set(i, operator(this.get(i)));
		}
		return;
	}
	sort(compare: (left: E, right: E) => number): void {
		for (let i = 1; i < this.length; i++) {
			const ele = this.get(i);
			for (var j = i - 1; j >= 0; j--) {
				const tmp = this.get(j);
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
		const sub = new ArrayList(this.isEqual);
		for (let i = from; i < to; i++) {
			sub.add(this.get(i));
		}
		return sub;
	}
}
