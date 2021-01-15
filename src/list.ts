import { Collection } from './collection';

export interface List<E> extends Collection<E> {
	set(index: number, e: E): void;
	insert(index: number, e: E): void;
	insertAll(index: number, c: Collection<E>): boolean;
	get(index: number): E;
	indexOf(e: E): number;
	lastIndexOf(e: E): number;
	iterateFrom(index: number, on: (e: E) => boolean): boolean;
	removeIndex(index: number): E;
	replaceAll(operator: (e: E) => E): void;
	sort(compare: (left: E, right: E) => number): void;
	subList(from: number, to: number): List<E>;
}
