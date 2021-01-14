## List

```typescript
interface List<E> extends Collection<E>
```

有序集合(列表)。有序集合继承集合接口。其他有序集合都继承此接口。有序集合可以通过索引精确控制每个元素的位置。

---

有序集合实现所有[集合](./collection.md)的方法。

---

```typescript
set(index: number, e: E): void
```

用指定的元素替换此列表中的指定位置的元素。

> `index` - 要替换的位置
>
> `e` - 要替换的元素

---

```typescript
insert(index: number, e: E): void
```

将指定的元素插入此列表中的指定位置。

> `index` - 要插入的位置
>
> `e` - 要插入的元素

---

```typescript
insertAll(index: number, c: Collection<E>): boolean
```

将指定集合中的所有元素插入到此列表中的指定位置，返回此集合是否改变。

> `index` - 要插入的位置
>
> `c` - 要插入的元素的集合

---

```typescript
get(index: number): E
```

获取此列表中指定位置的元素。

> `index` - 要获取的位置

---

```typescript
indexOf(e: E): number
```

查找此列表中指定元素的第一次出现的索引，如果此列表不包含元素，则返回-1。

> `e` - 要查找的元素

---

```typescript
lastIndexOf(e: E): number
```

查找此列表中指定元素的最后一次出现的索引，如果此列表不包含元素，则返回-1。

> `e` - 要查找的元素

---

```typescript
iterateFrom(index: number, on: (e: E) => boolean): boolean
```

从指定索引处遍历元素直到找到目标元素或全部元素均非目标元素。

> `index` - 要获取的位置
>
> `on` - 处理每个元素的函数
>
> > `e` - 要处理的元素
> >
> > `return` - 该元素是否为目标元素(若是则停止遍历)
>
> `return` - 是否在遍历中找到了目标元素

---

```typescript
removeIndex(index: number): E
```

删除该列表中指定位置的元素，返回这个元素。

> `index` - 要删除的位置

---

```typescript
replaceAll(operator: (e: E) => E): void
```

将该列表的每个元素替换为处理函数应用于该元素的结果。

> `operator` 处理函数

---

```typescript
sort(compare: (left: E, right: E) => number): void
```

使用随附的比较函数从小到大排序此列表的元素。在比较函数中：

- 若左元素较小，则结果小于 0；
- 若左元素较大，则结果大于 0；
- 若两个元素相等，则结果等于 0。

> `compare` - 比较函数
>
> > `left` - 左元素
> >
> > `right` - 右元素

---

```typescript
subList(from: number, to: number): List<E>
```

获取此列表指定索引范围的子列表。

> `from` - 起始索引（含）
>
> `to` - 终止所以（不含）
