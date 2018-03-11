import FCC from "./fcc";

export class StockRecord {
    constructor([date, open, high, low, close, adjClose, volume]) {
        this.date = new Date(date);
        this.open = Number.parseFloat(open);
        this.high = Number.parseFloat(high);
        this.low = Number.parseFloat(low);
        this.close = Number.parseFloat(close);
        this.adjClose = Number.parseFloat(adjClose);
        this.volume = Number.parseFloat(volume);
    }
}

export class StockRecords extends FCC {
    constructor(array) {
        super(array);
    }

    filterValidValues = () => new StockRecords(this.array.filter(e => !isNaN(e.adjClose)));

    getAdjCloses = () => this.array.map(e => e.adjClose);

    getDates = () => this.array.map(e => e.date);

    getStartDate = () => new Date(Math.min(...this.getDates()));

    getEndDate = () => new Date(Math.max(...this.getDates()));

    getMaxAdjClose = () => Math.max(...this.getAdjCloses());

    getMinAdjClose = () => Math.min(...this.getAdjCloses());

}
