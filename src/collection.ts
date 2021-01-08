export interface Collection<E> {
	size(): number;
	isEmpty(): boolean;
	clear(): void;
	add(e: E): boolean;
	addAll(c: Collection<E>): boolean;
	contains(e: E): boolean;
	containsAll(c: Collection<E>): boolean;
	iterate(on: (e: E) => void): void;
	remove(e: E): boolean;
	removeAll(c: Collection<E>): boolean;
	removeIf(filter: (e: E) => boolean): boolean;
	retainAll(c: Collection<E>): boolean;
}
