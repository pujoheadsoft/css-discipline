export default class LineStyle {
    constructor(lineWidth = 1.0, lineCap = "butt", lineJoin = "miter", miterLimit = 10.0) {
        this.lineWidth = lineWidth;
        this.lineCap = lineCap;
        this.lineJoin = lineJoin;
        this.miterLimit = miterLimit;
    }
}