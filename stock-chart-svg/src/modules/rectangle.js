import {Point, Points} from "./point";

export default class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    toPoints = () => {
        return new Points([
            new Point(this.x, this.y),
            new Point(this.x + this.width, this.y),
            new Point(this.x + this.width, this.y + this.height),
            new Point(this.x, this.y + this.height),
            new Point(this.x, this.y)
        ]);
    }

    toString = () => `Rectangle(x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height})`;
}