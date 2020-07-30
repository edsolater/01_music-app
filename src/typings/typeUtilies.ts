type MayMultiArray<Item> = Item[] | Item[][]

type ArrayItem<T> = T extends Array<infer P> ? P : never
