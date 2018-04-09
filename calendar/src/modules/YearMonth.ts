import FCC from "./FCC";
import XDate from "./XDate";

export class Dates extends FCC<Date> {
    constructor(dates: Array<Date>) {
        super(dates);
    }
}

export class Week extends FCC<XDate> {
    constructor(dates: Array<XDate>) {
       super(dates);
    }
}

export class Weeks extends FCC<Week> {
    constructor(weeks: Array<Week>) {
        super(weeks)
    }
}

function* range(begin: number, end: number) {
    for (let i = begin; i <= end; i++) {
        yield i;
    }
}

export class YearMonth {
    year: number;
    month: number;

    constructor(year: number, month: number) {
        this.year = year;
        this.month = month;
    }

    getWeeks() {
        const dates = this.getDates();
        const first = dates.first();
        const end = dates.last();

        const paddingStart = new Dates(Array.from(range(1, first.getDay())).map((e: number) => {
            var date = new Date(`${this.year}-${this.month}-${first.getDate()}`);
            date.setDate(date.getDate() - e);
            return date;
        })).sort((e1: Date, e2: Date) => e1.getDate() - e2.getDate());
        const paddingEnd = new Dates(Array.from(range(1, 6 - end.getDay())).map((e: number) => {
            var date = new Date(`${this.year}-${this.month}-${end.getDate()}`);
            date.setDate(date.getDate() + e);
            return date;
        }));

        return new Weeks(paddingStart.concat(dates).concat(paddingEnd).partition(7).map((dates: Array<Date>) => {
            return new Week(dates.map((e) => new XDate(e)));
        }));
    }

    getDates() {
        const start = this.getStartDate();
        const end = this.getEndDate();
        return new Dates(Array.from(range(start.getDate(), end.getDate())).map((e: number) => {
            return new Date(`${this.year}-${this.month}-${e}`);
        }));
    }

    getStartDate = () => new Date(`${this.year}-${this.month}-01`);

    getEndDate() {
        var date = new Date(`${this.year}-${this.month}-01`);
        date.setMonth(date.getMonth() + 1);
        date.setDate(date.getDate() - 1);
        return date;
    }

    isSameMonth = (date: XDate) => date.getMonth() + 1 === this.month;
}
