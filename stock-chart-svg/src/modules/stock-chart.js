//@ts-check
import { StockRecord, StockRecords } from "./stock-records";
import { Point, Points } from "./point";
import DateRange from "./date-range";
import Rectangle from "./rectangle";
import * as d3 from "d3";

export default class StockChart {
    constructor(csvData) {
        this.records = new StockRecords(csvData.slice(1).map(record => new StockRecord(record))).filterValidValues();
        this.currentRecords = this.records.filterDateRange(new DateRange(new Date("2017-01-01"), new Date("2017-02-28")));
    }

    draw = () => {
        const margin = { top: 10, right: 20, bottom: 25, left: 50 }
        const chartContainer = d3.select(".chart-container").node();
        const rect = chartContainer.getBoundingClientRect();
        const width = rect.width - margin.left - margin.right;
        const height = rect.height - margin.top - margin.bottom;

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
            .domain([this.currentRecords.getMinAdjClose(), this.currentRecords.getMaxAdjClose()])
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

        const points = this.currentRecords
            .map(e => new Point(xScale(e.date), yScale(e.adjClose)))
            .concat([
                new Point(xScale(this.currentRecords.getEndDate()), yScale(this.currentRecords.getMinAdjClose())),
                new Point(xScale(this.currentRecords.getStartDate()), yScale(this.currentRecords.getMinAdjClose()))
            ])
            .map(e => `${e.x},${e.y}`)
            .join(" ");

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
            .attr("stop-color", "#005c97")
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#363795")
            .attr("stop-opacity", 1);

        // path要素を作成
        svg.append("polygon")
            .attr("points", points)
            .attr("fill", "url(#gradient)");

        svg.append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${height})`);

        svg.append("g")
            .call(yAxis)
            .attr("transform", `translate(0, 0)`);

    }
}

