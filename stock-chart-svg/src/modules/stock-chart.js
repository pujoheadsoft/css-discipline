//@ts-check
import { StockRecord, StockRecords } from "./stock-records";
import { Point, Points } from "./point";
import DateRange from "./date-range";
import Rectangle from "./rectangle";
import * as d3 from "d3";

export default class StockChart {
    constructor(csvData) {
        this.records = new StockRecords(csvData.map(record => new StockRecord(record))).filterValidValues();
        this.currentRecords = this.records.filterDateRange(new DateRange(new Date("2017-01-01"), new Date("2017-02-28")));
    }

    draw = () => {
        const margin = { top: 20, right: 20, bottom: 25, left: 50 }
        const chartContainer = d3.select(".chart-container").node();
        const rect = chartContainer.getBoundingClientRect();
        const width = rect.width - margin.left - margin.right;
        const height = rect.height - margin.top - margin.bottom;
        const minValue = this._floorValue(this.currentRecords.getMinAdjClose(), 2);
        const maxValue = this._ceilValue(this.currentRecords.getMaxAdjClose(), 2);
        console.log(rect);

        d3.selectAll("svg").remove();

        const svg = d3.select(".chart-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            ;

        const xScale = d3.scalePoint()
            .domain(this.currentRecords.getDates())
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([minValue, maxValue])
            .range([height, 0]);

        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickSize(6)
            .tickFormat(e => {
                if (this.currentRecords.isFirstDateOfMonth(e)) {
                    return d3.timeFormat("%b")(e);
                } else {
                    return d3.timeFormat("%e")(e);
                }
            })
            ;

        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(6)
            .tickSize(6);

        /*
                var line = d3.line()
                    .x(d => xScale(d.date))
                    .y(d => yScale(d.adjClose));
                    */

        var gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#c2e9fb")
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#a1c4fd")
            .attr("stop-opacity", 1);

        /*
        const points = this.currentRecords
            .map(e => new Point(xScale(e.date), yScale(e.adjClose)))
            .concat([
                new Point(xScale(this.currentRecords.getEndDate()), yScale(minValue)),
                new Point(xScale(this.currentRecords.getStartDate()), yScale(minValue))
            ])
            .map(e => `${e.x},${e.y}`)
            .join(" ");

        svg.append("polygon")
            .attr("points", points)
            .attr("fill", "url(#gradient)");
            */
/*
        const line = d3.line()
            .x(e => xScale(e.date))
            .y(e => yScale(e.adjClose))
            .curve(d3.curveCardinal);

        svg.append("path")
            .datum(this.currentRecords.array)
            .attr("d", line)
            .attr("stroke", "#04befe")
            .attr("fill", "none");
            */

        const area = d3.area()
            .x(e => xScale(e.date))
            .y0(height)
            .y1(e => yScale(e.adjClose));
//            .curve(d3.curveCardinal);

        svg.append("path")
            .datum(this.currentRecords.array)
            .attr("d", area)
            .attr("fill", "url(#gradient)");

        svg.append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${height})`);

        svg.append("g")
            .call(yAxis)
            .attr("transform", `translate(0, 0)`);

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
}

