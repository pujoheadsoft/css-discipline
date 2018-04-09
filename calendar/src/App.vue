<template>
  <div id="app">
    <Calendar v-bind:yearMonth="yearMonth" />
  </div>
</template>

<script lang="ts">
import Calendar from "./modules/Calendar.vue";
import { YearMonth } from "./modules/YearMonth";

const yearMonth = new YearMonth(2018, 4);
console.log(yearMonth.getStartDate());
console.log(yearMonth.getEndDate());

export default {
  components: {
    Calendar
  },
  data() {
    return { yearMonth: yearMonth };
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
