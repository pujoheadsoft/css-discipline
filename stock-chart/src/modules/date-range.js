export default class DateRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    contains = (date) => this.start <= date && date <= this.end;

    toString = () => `DateRange(${this.start} - ${this.end})`;
}