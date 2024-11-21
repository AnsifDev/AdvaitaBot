export function generateArray<T>(size: number, item: (index: number) => T): T[] {
    const array = Array<T>()
    for (let index = 0; index < size; index++) array.push(item(index));
    return array;
}