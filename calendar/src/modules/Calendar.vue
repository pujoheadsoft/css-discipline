<template>
  <div class="calender-container">
    <div v-for="week in weeks.array" v-bind:key="week" class="calender-row">
        <div v-for="date in week.dates.array" v-bind:key="date" class="calender-column">
            {{date.getDate().toString()}}
        </div>
    </div>
  </div>
</template>

<script language="ts">
export default {
  props: ["weeks"]
}
</script>

<style lang="postcss" scoped>
.calender-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: gray;

    .calender-row {
        display: flex;
        flex: 1 1 0%;
        .calender-column {
            width: 100%;
            background: lightgray;
        }
    }
}
</style>

