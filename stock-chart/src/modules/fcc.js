export default class FCC {
    constructor(array) {
        this.array = array;
    }

    size = () => this.array.length;

    forEach = (f) => this.array.forEach(f);

    map = (f) => this.array.map(f);

    find = (f) => this.array.find(f);

    first = () => this.array[0];

    rest = () => this.array.slice(1);

    partition = (n) => this._partition(this.array, 0, n);

    concat = (array) => {
        this.array = this.array.concat(array);
        return this;
    }

    groupBy = (keySelector) => {
        var map = new Map();
        this.array.forEach(e => {
            const key = keySelector(e);
            const values = map.get(key) || [];
            values.push(e);
            map.set(key, values);
        });
        return map;
    }

    _partition = (array, index, step) => {
        if (index + step > array.length) {
            return [];
        }
        return [array.slice(index, index + step)].concat(this._partition(array, index + 1, step));
    }
}