import "./resources/css/style.css";
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import Schedule from "./modules/Schedule";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        schedules: new Map<string, Schedule>()
    },
    getters: {
        getScheduleByDate: (state) => (date: string) => {
            return state.schedules.get(date);
        }
    },
    mutations: {
        initialize(state) {
            if (localStorage.getItem("test-schedule")) {
                const schedules = new Map<string, Schedule>(JSON.parse(localStorage.getItem("test-schedule")!!));
                console.log(schedules);
                state.schedules = schedules;
            }
        },
        storeSchedule(state, schedule: Schedule) {
            state.schedules.set(schedule.date, schedule);
            console.log(state.schedules);
            localStorage.setItem("test-schedule", JSON.stringify([...state.schedules]));
        }
    },
    actions: {
        storeSchedule({ commit }, schedule: Schedule) {
            commit("storeSchedule", schedule);
        }
    }
});

new Vue({
    el: "#app",
    store,
    template: '<App />',
    components: { App },
    beforeCreate() {
        this.$store.commit("initialize");
    }
})