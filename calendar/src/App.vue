<template>
  <div id="app">
    <Calendar v-bind:weeks="weeks" />
  </div>
</template>

<script lang="ts">
import Calendar from "./modules/Calendar.vue";

import { FCC } from "./modules/fcc";

class Dates extends FCC<Date> {
    constructor(dates: Array<Date>) {
        super(dates);
    }
}

class Week {
    dates: Dates;
    constructor(dates: Dates) {
       this.dates = dates;
    }
}

class Weeks extends FCC<Week> {
    constructor(weeks: Array<Week>) {
        super(weeks)
    }
}

function* range(begin: number, end: number) {
    for (let i = begin; i <= end; i++) {
        yield i;
    }
}

class YearMonth {
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

        return new Weeks(paddingStart.concat(dates).concat(paddingEnd).partition(7).map((e: Array<Date>) => {
            console.log(e);
            return new Week(new Dates(e));
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
}

const yearMonth = new YearMonth(2017, 4);
console.log(yearMonth.getStartDate());
console.log(yearMonth.getEndDate());
const weeks = yearMonth.getWeeks();
console.log(weeks);

export default {
  components: {
    Calendar
  },
  data() {
    return { weeks: weeks };
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
