import "./resources/css/style.css";
import Vue from "vue";
import App from "./App.vue";

/*
var container: Element = document.querySelector(".calender-container")!!;
weeks.forEach((week: Week) => {
    let row: Element = document.createElement("div");
    row.setAttribute("class", "calender-row")
    container.appendChild(row);
    week.dates.forEach((date: Date) => {
        let col: Element = document.createElement("div");
        col.setAttribute("class", "calender-column");
        row.appendChild(col);

        let val: Element = document.createElement("div");
        val.appendChild(document.createTextNode(date.getDate().toString()));
        col.appendChild(val);
    });
});
*/

new Vue({
    el: "#app",
    template: '<App />',
    components: { App }
})