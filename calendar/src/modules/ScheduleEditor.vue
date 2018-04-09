<template>
  <transition name="modal">
    <div class="modal-mask">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="close-button-container">
            <button @click="close" class="close-button">
              <i class="material-icons close-icon" >clear</i>
            </button>
          </div>
          <div class="title-container">
            <input type="text" v-model="title" class="title" placeholder="タイトルを追加" >
          </div>
          <div class="time-container">
            <select v-model="startTime">
              <option v-for="time in startTimes">
                {{time}}
              </option>
            </select>
            –
            <select v-model="endTime">
              <option v-for="time in endTimes">
                {{time}}
              </option>
            </select>
          </div>
          <div class="save-button-container">
            <button @click="store" v-bind:disabled="canNotStore">保存</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import XDate from "./XDate";
import { IntRange } from "./Range";
import schedule from "./Schedule";
import Schedule from './Schedule';

const root = XDate.of(1980, 1, 1);

const times = new IntRange(0, 47).map((e) => {
  return root.addMinites(e * 30).getHourAndMinites();
});

export default {
  props: ["date"],
  data() {
    const schedule = this.$store.getters.getScheduleByDate(this.date);
    console.log(schedule);
    return {
      title: schedule ? schedule.title : "",
      startTime: schedule ? schedule.start : "00:00",
      endTime: schedule ? schedule.end : "01:00"
    }
  },
  computed: {
    startTimes() {
      console.log(this.$store.state.schedules);
      return times;
    },
    endTimes() {
      const index = times.indexOf(this.startTime);
      if (index <= 0) {
        return times;
      }
      return times.slice(index + 1);
    },
    canNotStore() {
      return this.date === "" || this.startTime === "" || this.endTime === "";
    }
  },
  methods: {
    store() {
      const schedule = new Schedule(this.date, this.title, this.startTime, this.endTime);
      this.$store.dispatch("storeSchedule", schedule);
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="postcss" scoped>
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://example.com/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(https://example.com/MaterialIcons-Regular.woff2) format('woff2'),
    url(https://example.com/MaterialIcons-Regular.woff) format('woff'),
    url(https://example.com/MaterialIcons-Regular.ttf) format('truetype');
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  display: table;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.33);
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 300px;
  margin: 0px auto;
  padding: 16px 16px;
  background-color: #FFF;
  border-radius: 2px;
  box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);
}

.close-button-container {
  text-align: right;
  position: absolute;
  top: 6px;
  right: 6px;
  .close-button {
    border: 0;
    background: #ffffff;
    width: 40px;
    height: 40px;
  }
  button:hover {
    border-radius: 50%;
    background-color: rgba(0,0,0,.07);
    width: 40px;
    height: 40px;
    transition: background-color,opacity 100ms linear;
  }
  .close-icon {
    padding-top: 2px;
    color: rgba(0,0,0,0.54);
    fill: rgba(0,0,0,0.54);
    font-size: 20px;
    cursor: pointer;
  }
}

.title-container {
  margin-top: 20px;
  margin-bottom: 8px;
  .title {
    border: none;
    font: 400 16px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    font-size: 24px;
    color: #212121;
    height: 28px;
  }
  input:focus {
    outline: none;
  }
}

.time-container {
  background-color: #f5f5f5;
  padding-left: 12px;
  margin-bottom: 12px;
  border-radius: 2px;

  select {
    border: none;
    background-color: #f5f5f5;
    -webkit-appearance: none;
	  -moz-appearance: none;
	  appearance: none;
    width: 40px;
    cursor: pointer;
    height: 32px;
  }
  select:focus {
    outline: none;
  }
  option {
    width: 100px;
  }
}
.save-button-container {
  text-align: right;
  button {
    color: #ffffff;
    background: #4285f4;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    line-height: 30px;
    width: 88px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    border: 0;
    border-radius: 3px;
  }
}
</style>
