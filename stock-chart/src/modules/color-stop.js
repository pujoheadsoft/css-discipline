import FCC from "./fcc";

export class ColorStop {
    constructor(offset, color) {
        this.offset = offset;
        this.color = color;
    }
}

export class ColorStops extends FCC {
    constructor(array) {
        super(array);
    }
}