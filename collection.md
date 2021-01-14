# Collection

```typescript
interface Collection<E>
```

集合。其他集合都继承此接口。

---

```typescript
size(): number
```

返回此集合中的元素数。

---

```typescript
isEmpty(): boolean
```

判断此集合是否为空。

---

```typescript
clear(): void
```

从此集合中删除所有元素。

---

```typescript
add(e: E): boolean
```

向集合中追加一个元素，返回是否追加成功。

- 不允许重复的集合可能会因已存在而追加失败；

- 不允许空值加入的集合可能会因追加空值而失败。

> `e` - 要追加的元素

---

```typescript
addAll(c: Collection<E>): boolean
```

将指定集合中的所有元素追加到此集合，返回此集合是否改变。

> `c` - 要追加的元素的集合

---

```typescript
contains(e: E): boolean
```

判断此集合是否包含指定的元素。

> `e` - 要判断的元素

---

```typescript
containsAll(c: Collection<E>): boolean
```

查看此集合是否包含指定集合的所有元素。

> `c` - 要判断的元素的集合

---

```typescript
iterate(on: (e: E) => boolean): boolean
```

遍历元素直到找到目标元素或全部元素均非目标元素。

> `on` - 处理每个元素的函数
>
> > `e` - 要处理的元素
> >
> > `return` - 该元素是否为目标元素(若是则停止遍历)
>
> `return` - 是否在遍历中找到了目标元素

---

```typescript
remove(e: E): boolean
```

从此集合中删除指定的元素，返回是否删除成功。

- 集合可能会因不存在要删除的元素而删除失败；

- 不允许空值加入的集合可能会因删除空值而失败；

- 集合可能会因为不支持删除操作而删除失败。

> `e` - 要删除的元素

---

```typescript
removeAll(c: Collection<E>): boolean
```

从此集合中删除指定集合中包含的所有元素，返回此集合是否改变。

> `c` - 要删除的元素的集合

---

```typescript
removeIf(filter: (e: E) => boolean): boolean
```

删除满足给定条件的此集合的所有元素，返回此集合是否改变。

> `filter` - 判断是否需要删除的函数
>
> > `e` - 要判断的元素

---

```typescript
retainAll(c: Collection<E>): boolean
```

仅保留此集合中包含在指定集合中的元素而删除其他元素，返回此集合是否改变。

> `c` - 要保留的元素的集合
