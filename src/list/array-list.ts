import { List } from '../list';

export class ArrayList<E> implements List<E> {
	constructor(isEqual: (left: E, right: E) => boolean) {
		this.length = 0;
		this.isEqual = isEqual;
	}
	private length: number;
	private isEqual: (left: E, right: E) => boolean;

	size(): number {
		return this.length;
	}
	isEmpty(): boolean {
		return this.length === 0;
	}
	clear(): void {
		// TODO
		return;
	}
	add(ele: E): boolean {
		// TODO
		return;
	}
	addAll(list: ArrayList<E>): boolean {
		// TODO
		return;
	}
	contains(ele: E): boolean {
		// TODO
		return;
	}
	containsAll(list: ArrayList<E>): boolean {
		// TODO
		return;
	}
	iterate(on: (ele: E) => void): void {
		// TODO
		return;
	}
	remove(ele: E): boolean {
		//TODO
		return;
	}
	removeAll(list: ArrayList<E>): boolean {
		// TODO
		return;
	}
	removeIf(filter: (ele: E) => boolean): boolean {
		// TODO
		return;
	}
	retainAll(list: ArrayList<E>): boolean {
		// TODO
		return;
	}
	set(index: number, ele: E): void {
		// TODO
		return;
	}
	insert(index: number, ele: E): void {
		// TODO
		return;
	}
	insertAll(index: number, list: ArrayList<E>): boolean {
		// TODO
		return;
	}
	get(index: number): E {
		// TODO
		return;
	}
	indexOf(ele: E): number {
		// TODO
		return;
	}
	lastIndexOf(ele: E): number {
		// TODO
		return;
	}
	iterateFrom(index: number, on: (ele: E) => void): void {
		// TODO
		return;
	}
	removeIndex(index: number): E {
		// TODO
		return;
	}
	replaceAll(operator: (ele: E) => E): void {
		// TODO
		return;
	}
	sort(compare: (left: E, right: E) => number): void {
		// TODO
		return;
	}
	subList(from: number, to: number): List<E> {
		// TODO
		return;
	}
}
