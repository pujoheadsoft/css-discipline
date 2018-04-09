export default class Schedule {
    date: string;
    title: string;
    start: string;
    end: string;

    constructor(date: string, title: string, start: string, end: string) {
        this.date = date;
        this.title = title;
        this.start = start;
        this.end = end;
    }
}
