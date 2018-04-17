import "./resources/css/style.css";
import csv from "./resources/N225.csv";
import StockChart from "./modules/stock-chart";
import * as d3 from "d3";

window.addEventListener("load", async e => {
    const csvData = await d3.csv("./resources/N225.csv");
    const stockChart = new StockChart(csvData);
    stockChart.draw();

    var timer = null;
    window.addEventListener("resize", e => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            stockChart.draw();
        }, 200);
    });
})