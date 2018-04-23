require("./style.css");

window.addEventListener("scroll", (e) => {
    const y = window.scrollY;
    const logo = document.querySelector(".header");
    const menu = document.querySelector(".menu");
    const stiky = document.querySelector(".header .sticky");
    if (y === 0) {
        logo.classList.remove("has-sticky");
        menu.classList.remove("has-sticky");
        stiky.classList.remove("on");
    } else {
        logo.classList.add("has-sticky");
        menu.classList.add("has-sticky");
        stiky.classList.add("on");
    }
});