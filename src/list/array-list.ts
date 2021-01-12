import { List } from '../list';

export class ArrayList<E> implements List<E> {
	constructor(isEqual: (left: E, right: E) => boolean) {
		this.list = [];
		this.isEqual = isEqual;
	}
	private list: E[];
	private isEqual: (left: E, right: E) => boolean;

	size(): number {
		return this.list.length;
	}
	isEmpty(): boolean {
		return this.list.length === 0;
	}
	clear(): void {
		this.list = [];
		return;
	}
	add(ele: E): boolean {
		this.list[this.size()] = ele;
		return;
	}
	addAll(list: ArrayList<E>): boolean {
		if (list.isEmpty()) {
			return false;
		}
		list.iterate((ele) => {
			this.add(ele);
		});
		return true;
	}
	contains(ele: E): boolean {
		this.iterate((e) => {
			if (this.isEqual(ele, e)) {
				return true;
			}
		});
		return false;
	}
	containsAll(list: ArrayList<E>): boolean {
		let flag = false;
		list.iterate((e) => {
			flag = flag && this.contains(e);
		});
		return flag;
	}
	iterate(on: (ele: E) => void): void {
		for (let i = 0; i < this.size(); i++) {
			on(this.list[i]);
		}
		return;
	}
	remove(ele: E): boolean {
		if (this.indexOf(ele) === -1) {
			return false;
		}
		while (this.indexOf(ele) !== -1) {
			let pos = this.indexOf(ele);
			if (pos === this.size() - 1) {
				this.list.length -= 1;
				continue;
			}
			for (let i = pos; i < this.size() - 1; i++) {
				this.set(i, this.get(i + 1));
			}
			this.list.length -= 1;
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
		let flag = false;
		this.iterate((e) => {
			if (!list.contains(e)) {
				flag = flag || this.remove(e);
			}
		});
		return flag;
	}
	set(index: number, ele: E): void {
		if (index < 0 || index >= this.size()) {
			throw new Error('out of the boundary');
		}
		this.list[index] = ele;
		return;
	}
	insert(index: number, ele: E): void {
		if (index < 0 || index > this.size()) {
			throw new Error('out of the boundary');
		}
		if (index === this.size()) {
			this.add(ele);
			return;
		}
		this.list.length += 1;
		for (let i = this.size() - 1; i > index; i--) {
			this.set(i, this.get(i - 1));
		}
		this.set(index, ele);
		return;
	}
	insertAll(index: number, list: ArrayList<E>): boolean {
		if (index < 0 || index > this.size()) {
			throw new Error('out of the boundary');
		}
		if (list.size() === 0) {
			return false;
		}
		if (index === this.size()) {
			this.addAll(list);
			return true;
		}
		this.list.length += list.size();
		for (let i = this.size() - 1; i > index; i--) {
			this.set(i, this.get(i - list.size()));
		}
		for (let i = 0; i < list.size(); i++) {
			this.set(i + index, list.get(i));
		}
		return true;
	}
	get(index: number): E {
		if (index < 0 || index >= this.size()) {
			throw new Error('out of the boundary');
		}
		return this.list[index];
	}
	indexOf(ele: E): number {
		for (let i = 0; i < this.size(); i++) {
			if (this.isEqual(this.get(i), ele)) {
				return i;
			}
		}
		return -1;
	}
	lastIndexOf(ele: E): number {
		for (let i = this.size() - 1; i >= 0; i--) {
			if (this.isEqual(this.get(i), ele)) {
				return i;
			}
		}
		return -1;
	}
	iterateFrom(index: number, on: (ele: E) => void): void {
		if (index < 0 || index >= this.size()) {
			throw new Error('out of the boundary');
		}
		for (let i = index; i < this.size(); i++) {
			on(this.list[i]);
		}
		return;
	}
	removeIndex(index: number): E {
		if (index < 0 || index >= this.size()) {
			throw new Error('out of the boundary');
		}
		const ele = this.get(index);
		if (index === this.size() - 1) {
			this.list.length -= 1;
			return ele;
		}
		for (let i = index; i < this.size() - 1; i++) {
			this.set(i, this.get(i + 1));
		}
		this.list.length -= 1;
		return ele;
	}
	replaceAll(operator: (ele: E) => E): void {
		for (let i = 0; i < this.size(); i++) {
			this.set(i, operator(this.get(i)));
		}
		return;
	}
	sort(compare: (left: E, right: E) => number): void {
		// TODO
		return;
	}
	subList(from: number, to: number): ArrayList<E> {
		if (from > to || from < 0 || to >= this.size()) {
			throw new Error('out of the boundary');
		}
		const sub = new ArrayList(this.isEqual);
		for (let i = from; i < to; i++) {
			sub.add(this.get(i));
		}
		return sub;
	}
}
