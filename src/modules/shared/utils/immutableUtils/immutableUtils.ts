export function addToArray<T>(arr: T[] | undefined, newEntry: T): T[] {
  const safeSpread = arr || [];

  return [...safeSpread, newEntry];
}

export function mergeArray<T>(first: T[] = [], second: T[] = []): T[] {
  return [...first, ...second];
}

export function setToArray<T extends object>(
  array: T[] = [],
  itemToAddOrUpdate: T,
  objUniqueField: keyof T,
  index?: number
): T[] {
  const indexToUpdate =
    index ??
    array.findIndex(
      (arrayItem) =>
        arrayItem[objUniqueField] === itemToAddOrUpdate[objUniqueField]
    );

  if (indexToUpdate === -1) {
    return [...array, itemToAddOrUpdate];
  } else {
    return array.map((item, idx) =>
      idx === indexToUpdate ? itemToAddOrUpdate : item
    );
  }
}

export function deleteFromArray<T>(array: T[] = [], index: number): T[] {
  const firstPart = array.slice(0, index);
  const secondPart = array.slice(index + 1);

  return mergeArray(firstPart, secondPart);
}

export function deleteFromArrayById<T extends object>(
  array: T[] = [],
  idFieldName: keyof T,
  idValue: any
): T[] {
  const indexToDelete = array.findIndex(
    (arrayItem) => arrayItem[idFieldName] === idValue
  );

  return deleteFromArray(array, indexToDelete);
}

export function deleteItemFromArray<T>(array: T[] = [], item: T): T[] {
  const indexToDelete = array.findIndex((arrayItem) => arrayItem === item);

  return deleteFromArray(array, indexToDelete);
}

export function setToObj<T extends object, K extends keyof any, V>(
  obj: T,
  key: K,
  value: V
): T & { [P in K]: V } {
  return {
    ...obj,
    [key]: value,
  } as T & { [P in K]: V };
}

export function mergeObj<T extends object, U extends object>(
  first: T,
  second: U
): T & U {
  return {
    ...first,
    ...second,
  };
}

export function mergeArraysUnique<T extends object>(
  baseArray: T[],
  overridingArray: T[],
  uniqueField: keyof T
): T[] {
  const uniqueItems = new Set(overridingArray.map((item) => item[uniqueField]));
  const filteredBaseArray = baseArray.filter(
    (item) => !uniqueItems.has(item[uniqueField])
  );

  return [...filteredBaseArray, ...overridingArray];
}
