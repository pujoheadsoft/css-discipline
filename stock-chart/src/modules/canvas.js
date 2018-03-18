import {Points} from "./point";
import Rectangle from "./rectangle";

export default class Canvas {
    constructor() {
        //this.container = document.querySelector(".canvas-container");
        this.container = document.querySelector("html");
        this.canvas = document.querySelector(".canvas-container canvas");
        this.context = this.canvas.getContext("2d");
        this.refreshSize();
    }

    refreshSize = () => {
        this.canvas.setAttribute("width", this.getWidth());
        this.canvas.setAttribute("height", this.getHeight() - 3);
    }

    getWidth = () => this.container.getBoundingClientRect().width;

    getHeight = () => this.container.getBoundingClientRect().height;

    getRectangle = () => {
        const clientRect = this.container.getBoundingClientRect();
        return new Rectangle(clientRect.x, clientRect.y, clientRect.width, clientRect.height);
    }

    drawLine = (p1, p2) => this.drawLines(new Points([p1, p2]));

    drawLines = (points) => {
        this.context.beginPath();
        this._buildPath(points);
        this.context.stroke();
    }

    drawPolygon = (polygon) => {
        this.context.beginPath();
        this._buildPath(polygon);
        this.context.closePath();
        this.context.fill();
    }

    drawText = (value, point) => this.context.fillText(value, point.x, point.y);

    setLineStyle = (lineStyle) => {
        this.context.lineWidth = lineStyle.lineWidth;
        this.context.lineCap = lineStyle.lineCap;
        this.context.lineJoin = lineStyle.lineJoin;
        this.context.miterLimit = lineStyle.miterLimit;
    }

    setStrokeStyle = (value) => this.context.strokeStyle = value;

    setFillStyle = (value) => this.context.fillStyle = value;

    setLinearGradientStyle = (startPoint, endPoint, colorStops) => {
        const gradient = this.context.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        colorStops.forEach(e => gradient.addColorStop(e.offset, e.color));
        this.setFillStyle(gradient);
    }

    setFont = (value) => this.context.font = value;

    setTextBaseline = (value) => this.context.textBaseline = value;

    getTextWidth = (value) => this.context.measureText(value).width;

    _buildPath = (points) => {
        this._moveTo(points.first());
        points.rest().forEach(point => {
            this._lineTo(point);
        });
    }

    _moveTo = (point) => this.context.moveTo(point.x, point.y);

    _lineTo = (point) => this.context.lineTo(point.x, point.y);
}