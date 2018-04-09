import FCC from "./FCC";

export class IntRange extends FCC<number> {
    constructor(begin: number, end: number) {
        function* range() {
            for (let i = begin; i <= end; i++) {
                yield i;
            }
        }
        super(Array.from(range()));
    }
}
