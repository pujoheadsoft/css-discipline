import {StockRecord, StockRecords} from "./stock-records";
import Canvas from "./canvas";
import {Point, Points} from "./point";
import {ColorStop, ColorStops} from "./color-stop";
import DateRange from "./date-range";
import Rectangle from "./rectangle";

export default class StockChart {
    constructor(csvData) {
        this.records = new StockRecords(csvData.slice(1).map(record => new StockRecord(record))).filterValidValues();
        this.currentRecords = this.records.filterDateRange(new DateRange(new Date("2017-01-01"), new Date("2017-02-28")));
        this.canvas = new Canvas();
        this.dateRectangleHeight = 40;
        this.valueRectangleWidth = 70;
        this.chartRectangle = this.getChartRectangle();
        this.dateRectangle = this.getDateRectangle();
        this.valueRectangle = this.getValueRectangle();
        this._debugPrint();

        this.valueView = new ValueView(this.canvas, this.valueRectangle, this.currentRecords);
        this.dateView = new DateView(this.canvas, this.dateRectangle, this.currentRecords);
    }

    draw = () => {
        this.drawChart();
        this.drawCandle();
        this.drawDate();
        this.drawValue();
    }

    drawChart = () => {
        const xUnit = (this.chartRectangle.width - 1) / (this.currentRecords.size() - 1);
        const points = new Points(this.currentRecords.map((e, index) => {
            return new Point(index * xUnit, this.valueView.getLeapValue(e.adjClose))
        }));

        const gradientPoints = points.concat([
            new Point(this.chartRectangle.width, this.chartRectangle.height),
            new Point(0, this.chartRectangle.height),
            new Point(0, this.valueView.getLeapValue(this.currentRecords.array[0].adjClose))]);

        const gradientStart = gradientPoints.getMinYPoint();
        const gradientEnd = new Point(gradientStart.x, this.chartRectangle.height);
        const colorStops = new ColorStops([new ColorStop(0, "#00FF99A0"), new ColorStop(1, "#00BBFFA0")]);
        this.canvas.setLinearGradientStyle(gradientStart, gradientEnd, colorStops);
        this.canvas.drawPolygon(gradientPoints);
    }

    drawCandle = () => {
        const xUnit = (this.chartRectangle.width - 1) / (this.currentRecords.size() - 1);
        const points = new Points(this.currentRecords.map((e, index) => {
            return new Point(index * xUnit, this.valueView.getLeapValue(e.adjClose))
        }));

        const width = 10;
        this.currentRecords.forEach((e, index) => {
            const close = this.valueView.getLeapValue(e.adjClose);
            const open = this.valueView.getLeapValue(e.open);
            const high = this.valueView.getLeapValue(e.high);
            const low = this.valueView.getLeapValue(e.low);
            const x = index * xUnit;
            const left = x - (width / 2);
            const right = x + (width / 2);
            if (left < this.chartRectangle.x || this.chartRectangle.width < right) {
                return;
            }

            const color = e.open < e.adjClose ? "#0000FF" : "#FF0000";
            this.canvas.setStrokeStyle(color);
            this.canvas.setFillStyle(color);

            const points = new Points([
                new Point(left, open),
                new Point(left, close),
                new Point(right, close),
                new Point(right, open),
                new Point(left, open)
            ]);

            this.canvas.drawPolygon(points);

            this.canvas.drawLine(new Point(x, close), new Point(x, high));
            this.canvas.drawLine(new Point(x, open), new Point(x, low));
        });

    }

    drawDate = () => this.dateView.draw();

    drawValue = () => this.valueView.draw();

    refreshSize = () => {
        this.canvas.refreshSize()
    }

    getDateRectangle = () => {
        const rect = this.canvas.getRectangle();
        const chartRect = this.getChartRectangle();
        return new Rectangle(rect.x, chartRect.height, chartRect.width, this.dateRectangleHeight);
    }

    getValueRectangle = () => {
        const rect = this.canvas.getRectangle();
        const chartRect = this.getChartRectangle();
        return new Rectangle(chartRect.width, rect.y, this.valueRectangleWidth, chartRect.height);
    }

    getChartRectangle = () => {
        const rect = this.canvas.getRectangle();
        return new Rectangle(rect.x, rect.y, rect.width - this.valueRectangleWidth, rect.height - this.dateRectangleHeight);
    }

    _debugPrint() {
        console.log(this.currentRecords);
        console.log(this.currentRecords.size());
        console.log(this.currentRecords.getAdjCloses());
        console.log(`Value Range: ${this.currentRecords.getMinAdjClose()} - ${this.currentRecords.getMaxAdjClose()}`);
        console.log(`Date Range: ${this.currentRecords.getStartDate()} - ${this.currentRecords.getEndDate()}`);
        console.log(`width: ${this.chartRectangle.width}, height: ${this.chartRectangle.height}`);

        console.log("chart rect: " + this.chartRectangle);
        console.log("date  rect: " + this.dateRectangle);
        console.log("value rect: " + this.valueRectangle);
    }
}

class DateView {
    constructor(canvas, rectangle, records) {
        this.canvas = canvas;
        this.rectangle = rectangle;
        this.records = records;
    }

    draw = () => {
        /*
        this.canvas.setFillStyle("#F8F8F8");
        this.canvas.drawPolygon(this.rectangle.toPoints());
        */

        const xUnit = (this.rectangle.width - 1) / (this.records.size() - 1);

        const points = new Points(this.records.map((_, index) => new Point(index * xUnit, 20)));

        const y = this.rectangle.y + 10;

        this.canvas.setFont("12px serif");
        this.canvas.setStrokeStyle("#B5B5B5");
        this.canvas.setFillStyle("#656565");
        this.canvas.setTextBaseline("top");

        console.log("size: " + this.records.size());
        if (this.records.size() > 10) {
            const monthDateMap = this.records.groupBy(e => e.date.getMonth());
            monthDateMap.forEach((values, _) => {
                if (values.length > 10) {
                    console.log("xx");
                } else {

                }
            });
        }

        this.records.forEach((e, index) => {
            var text = e.date.getDate();
            if (this.records.isFirstDateOfYear(e.date)) {
                text = e.date.getFullYear();
            } else if (this.records.isFirstDateOfMonth(e.date)) {
                text = e.getMonthAsString();
            }
            const textWidth = this.canvas.getTextWidth(text);
            const textX = (index * xUnit) - (textWidth / 2);
            if (textX < this.rectangle.x || this.rectangle.x + this.rectangle.width < textX + textWidth) {
                return;
            }

            this.canvas.drawLine(new Point(index * xUnit, this.rectangle.y), new Point(index * xUnit, y))

            this.canvas.drawText(text, new Point(textX, y + 4));
        });
    }
}

class ValueView {
    constructor(canvas, rectangle, records) {
        this.canvas = canvas;
        this.rectangle = rectangle;
        this.records = records;
        this.minValue = this._floorValue(Math.min(this.records.getMinAdjClose(), this.records.getMinLow()), 2);
        this.maxValue = this._ceilValue(Math.max(this.records.getMaxAdjClose(), this.records.getMaxHigh()), 2);
        this.range = this._ceilValue(this.maxValue - this.minValue, 2);
        this.valueCount = 10;
        this.valueViewPaddingX = 8;
        this.valueViewPaddingY = 24;
        this.valueViewLeft = this.rectangle.x;
        this.valueViewBottom = this.rectangle.y + this.rectangle.height;
        this.valueViewTop = this.rectangle.y;
        this.valueViewContentsHeight = this.valueViewBottom - (this.valueViewPaddingY * 2);
        console.log(`${this.maxValue} - ${this.minValue} = ${this.range}`);
    }

    draw = () => {
        /*
        this.canvas.setFillStyle("#F8F8F8");
        this.canvas.drawPolygon(this.rectangle.toPoints());
        */

        const step = this.range / this.valueCount;
        const yUnit = this.valueViewContentsHeight / this.valueCount;

        this.canvas.setFont("12px serif");
        this.canvas.setStrokeStyle("#B5B5B5");
        this.canvas.setFillStyle("#656565");
        this.canvas.setTextBaseline("middle");

        for (var i = 0; i <= this.valueCount; i++) {

            const point = new Point(
                this.valueViewLeft + this.valueViewPaddingX,
                this.valueViewBottom - this.valueViewPaddingY - (yUnit * i)
            );

            this.canvas.drawLine(new Point(this.valueViewLeft, point.y), point);
            this.canvas.drawText((this.minValue + (step * i)).toString(), new Point(point.x + 4, point.y));
        }

    }

    _ceilValue = (value, truncateCount) => {
        const roundingFactor = this._roundingFactor(truncateCount);
        return Math.ceil(value / roundingFactor) * roundingFactor;
    }

    _floorValue = (value, truncateCount) => {
        const roundingFactor = this._roundingFactor(truncateCount);
        return Math.floor(value / roundingFactor) * roundingFactor;
    }

    _roundingFactor = (truncateCount) => parseInt(`1${"0".repeat(truncateCount)}`);

    _lerp = (x1, y1, x2, y2, x) => {
        return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    }

    getLeapValue = (x) => {
        return this._lerp(
            this.minValue,
            this.valueViewPaddingY + this.valueViewContentsHeight,
            this.maxValue,
            this.valueViewPaddingY,
            x);
    }
}
