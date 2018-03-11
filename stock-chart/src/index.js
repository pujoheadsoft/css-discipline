import "./resources/css/style.css";
import csvSync from "csv-parse/lib/sync";
import csv from "./resources/N225.csv";
import StockChart from "./modules/stock-chart";

window.addEventListener("load", e => {
    const csvData = csvSync(csv);
    const stockChart = new StockChart(csvData);
    stockChart.drawChart();

    var timer = null;
    window.addEventListener("resize", e => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            stockChart.refreshSize();
            stockChart.drawChart();
        }, 200);
    });
})