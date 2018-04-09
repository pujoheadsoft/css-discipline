export default class FCC<T> implements Iterable<T> {
    array: Array<T>

    constructor(array: Array<T>) {
        this.array = array;
    }

    [Symbol.iterator]() {
        let pointer = 0;
        let components = this.array;

        return {
            next(): IteratorResult<T> {
                if (pointer < components.length) {
                    return {
                        done: false,
                        value: components[pointer++]
                    }
                } else {
                    return {
                        done: true,
                        value: null!!
                    }
                }
            }
        }
    }

    size = () => this.array.length;

    forEach = (f: (e: T) => void) => this.array.forEach(f);

    map = <U>(f: (e: T) => U): Array<U> => this.array.map(f);

    find = (f: (e: T) => boolean) => this.array.find(f);

    first = () => this.array[0];

    rest = () => this.array.slice(1);

    last = () => this.array[this.size() - 1];

    isFirst = (e: T) => this.first() === e;

    partition = (size: number, step: number = size) => this._partition(this.array, 0, step, size);

    concat = (fcc: FCC<T>) => {
        this.array = this.array.concat(fcc.array);
        return this;
    }

    groupBy = <U>(keySelector: (e: T) => U) => {
        var map = new Map();
        this.array.forEach(e => {
            const key = keySelector(e);
            const values = map.get(key) || [];
            values.push(e);
            map.set(key, values);
        });
        return map;
    }

    sort = (f: (e1: T, e2: T) => number) => {
        this.array.sort(f);
        return this;
    }

    _partition = (array: Array<T>, index: number, size: number, step: number): Array<Array<T>> => {
        if (index + size > array.length) {
            return [];
        }
        return [array.slice(index, index + size)].concat(this._partition(array, index + step, step, size));
    }
}

