import {StockRecord, StockRecords} from "./stock-records";
import Canvas from "./canvas";
import {Point, Points} from "./point";
import {ColorStop, ColorStops} from "./color-stop";

export default class StockChart {
    constructor(csvData) {
        this.stockRecords = new StockRecords(csvData.slice(1).map(record => new StockRecord(record))).filterValidValues();
        this.canvas = new Canvas();
        this._debugPring();
    }

    drawChart = () => {
        const xUnit = (this.canvas.getWidth() - 1) / (this.stockRecords.size() - 1);
        const points = new Points(this.stockRecords.map((e, index) => new Point(index * xUnit, this._lerpValue(e.adjClose))));

        /*
        this.canvas.setStrokeStyle("#f5f5f5");
        points.forEach(p => this.canvas.drawLine(new Point(p.x, this.canvas.getHeight()), new Point(p.x, 0)));
        */

        const gradientPoints = points.concat([
            new Point(this.canvas.getWidth(), this.canvas.getHeight()),
            new Point(0, this.canvas.getHeight()),
            new Point(0, this._lerpValue(this.stockRecords.array[0].adjClose))]);

        const gradientStart = gradientPoints.getMinYPoint();
        const gradientEnd = new Point(gradientStart.x, this.canvas.getHeight());
        const colorStops = new ColorStops([new ColorStop(0, "#00FF99A0"), new ColorStop(1, "#00BBFFA0")]);
        this.canvas.setLinearGradientStyle(gradientStart, gradientEnd, colorStops);
        this.canvas.drawPolygon(gradientPoints);
/*
        this.canvas.setStrokeStyle("#3f3f3f");
        this.canvas.drawLines(new Points([
            new Point(0, 0),
            new Point(this.canvas.getWidth() - 1, 0),
            new Point(this.canvas.getWidth() - 1, this.canvas.getHeight() - 1),
            new Point(0, this.canvas.getHeight() - 1),
            new Point(0, 0)
        ]));
        */
    }

    refreshSize = () => this.canvas.refreshSize();

    _lerp = (x1, y1, x2, y2, x) => {
        return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    }

    _lerpValue = (x) => {
        return this._lerp(this.stockRecords.getMinAdjClose(), this.canvas.getHeight(), this.stockRecords.getMaxAdjClose(), 0, x);
    }

    _debugPring() {
        console.log(this.stockRecords);
        console.log(this.stockRecords.size());
        console.log(this.stockRecords.getAdjCloses());
        console.log(`Value Range: ${this.stockRecords.getMinAdjClose()} - ${this.stockRecords.getMaxAdjClose()}`);
        console.log(`Date Range: ${this.stockRecords.getStartDate()} - ${this.stockRecords.getEndDate()}`);
        console.log(`width: ${this.canvas.getWidth()}, height: ${this.canvas.getHeight()}`);
    }
}