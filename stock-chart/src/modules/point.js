import FCC from "./fcc";

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Points extends FCC {
    constructor(array) {
        super(array);
    }

    getMinYPoint = () => {
        const minY = this.getMinY();
        return this.find(e => e.y == minY);
    }

    getMinY = () => Math.min(...this.getYs());

    getYs = () => this.map(e => e.y);
}