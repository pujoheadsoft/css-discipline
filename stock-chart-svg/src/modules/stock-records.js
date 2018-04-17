import FCC from "./fcc";
import dateformat from "dateformat";

export class StockRecord {
    constructor({Date: date, Open: open, High: high, Low: low, Close: close, "Adj Close": adjClose, Volume: volume}) {
        this.date = new Date(date);
        this.open = Number.parseFloat(open);
        this.high = Number.parseFloat(high);
        this.low = Number.parseFloat(low);
        this.close = Number.parseFloat(close);
        this.adjClose = Number.parseFloat(adjClose);
        this.volume = Number.parseFloat(volume);
    }

    getDateAsString = () => dateformat(this.date, "yyyy-mm-dd");

    getMonthAsString = () => dateformat(this.date, "mmm");
}

export class StockRecords extends FCC {
    constructor(array) {
        super(array);
    }

    filterValidValues = () => new StockRecords(this.array.filter(e => !isNaN(e.adjClose)));

    filterDateRange = (dateRange) => new StockRecords(this.array.filter(e => dateRange.contains(e.date)));

    getAdjCloses = () => this.array.map(e => e.adjClose);

    getLows = () => this.array.map(e => e.low);

    getHighs = () => this.array.map(e => e.high);

    getDates = () => this.array.map(e => e.date);

    getStartDate = () => new Date(Math.min(...this.getDates()));

    getEndDate = () => new Date(Math.max(...this.getDates()));

    getMaxAdjClose = () => Math.max(...this.getAdjCloses());

    getMinAdjClose = () => Math.min(...this.getAdjCloses());

    getMinLow = () => Math.min(...this.getLows());

    getMaxHigh = () => Math.min(...this.getHighs());

    isFirstDateOfMonth = (date) => {
        const sameYearMonthDates = this.filterYearMonth(date.getFullYear(), date.getMonth());
        return sameYearMonthDates.array && sameYearMonthDates.array[0] == date;
    }

    isFirstDateOfYear = (date) => {
        const sameYearDates = this.filterYear(date.getFullYear());
        return sameYearDates.array && sameYearDates.array[0] == date;
    }

    filterYear = (year) => new StockRecords(this.array.map(e => e.date).filter(e => e.getFullYear() == year));

    filterYearMonth = (year, month) => new StockRecords(
        this.array.map(e => e.date).filter(e => e.getFullYear() == year && e.getMonth() == month));

}
