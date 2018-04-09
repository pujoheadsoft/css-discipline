<template>
  <div class="calender-container">
    <div v-for="week of weeks.array" class="calender-row">
        <div v-for="date in week.array" class="calender-column" @click="openModal(date)">
            <div v-if="weeks.isFirst(week)" class="day-of-week">{{date.getDayOfWeek()}}</div>
            <div :class="getDateClass(date)">{{date.isFirstDayOfMonth() ? date.getMonthAndDay() : date.getDay()}}</div>
            <div v-if="hasSchedule(date)" class="schedule">{{getScheduleAsString(date)}}</div>
        </div>
    </div>
  <schedule-editor v-if="showModal" @close="showModal = false" v-bind:date="editDate" />
  </div>
</template>

<script language="ts">
import ScheduleEditor from "./ScheduleEditor.vue";
import XDate from "./XDate";

export default {
  props: ["yearMonth"],
  data: function() {
      return {
          showModal: false,
          editDate: ""
      }
  },
  components: { ScheduleEditor },
  methods: {
      openModal(date) {
          this.editDate = date.getDate();
          this.showModal = true;
      },
      getDateClass(date) {
          return this.yearMonth.isSameMonth(date) ? "date" : "out-range-date";
      },
      hasSchedule(date) {
          return this.$store.getters.getScheduleByDate(date.getDate());
      },
      getScheduleAsString(date) {
        const schedule = this.$store.getters.getScheduleByDate(date.getDate());
        return `${schedule.start} - ${schedule.end}  ${schedule.title}`
      }
  },
  computed: {
      weeks() {
          return this.yearMonth.getWeeks();
      }
  }
}
</script>

<style lang="postcss" scoped>
.calender-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .calender-row {
        display: flex;
        flex: 1 1 0%;
        border-bottom: #e0e0e0 1px solid;

        .calender-column {
            width: 100%;
            border-right: #e0e0e0 1px solid;
            padding-left: 8px;

            .date {
                font-weight: 400;
                font-size: 14px;
                color: #212121;
                line-height: 32px;
            }

            .out-range-date {
                font-weight: 400;
                font-size: 14px;
                color: #757575;
                line-height: 32px;
            }

            .day-of-week {
                color: #757575;
                font-size: 14px;
                padding-top: 8px;
            }

            .schedule {
                color: #212121;
                font-size: 12px;
                font-weight: 400;
                letter-spacing: .4px;
            }
        }
    }
}
</style>

