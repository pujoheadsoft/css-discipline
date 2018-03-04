require("./style.css");

window.addEventListener("scroll", (e) => {
    const style = document.querySelector(".social-container").style;
    const isOver = window.scrollY > 460
    style.top = isOver ? "77px" : "540px";
    style.position = isOver ? "fixed" : "absolute";
});
