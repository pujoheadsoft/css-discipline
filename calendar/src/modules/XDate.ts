import dateFormat from "dateformat";

export default class XDate {
    date: Date;

    constructor(date: Date) {
        this.date = date;
    }

    getDay = () => this.date.getDate().toString();

    getDate = () => dateFormat(this.date, "yyyymmdd");

    getMonth = () => this.date.getMonth();

    getMonthAndDay = () => `${this.date.getMonth() + 1}月 ${this.date.getDate()}日`

    getDayOfWeek() {
        const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];
        return dayOfWeeks[this.date.getDay()];
    }

    getHourAndMinites() {
        return dateFormat(this.date, "HH:MM");
    }

    isFirstDayOfMonth = () => this.date.getDate() === 1;

    addMinites(minites: number) {
        let date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDay());
        date.setMinutes(date.getMinutes() + minites);
        return new XDate(date);
    }

    static of = (year: number, month: number, date: number) => new XDate(new Date(year, month, date));
}
