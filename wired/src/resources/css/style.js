require("./style.css");

const getElement = (css) => document.querySelector(css);

const getArticleContainer = () => getElement(".article-container");

const getSocialContainer = () => getElement(".social-container");

const isOver = () => window.scrollY > 437;

const calcSocialContainerLeft = () => {
    const articleX = getArticleContainer().getBoundingClientRect().x;
    return isOver() ? `${articleX - 137}px` : "-137px";
};

window.addEventListener("scroll", (e) => {
    const style = getSocialContainer().style;
    style.top = isOver() ? "108px" : "0px";
    style.position = isOver() ? "fixed" : "absolute";
    style.left = calcSocialContainerLeft();
});

window.addEventListener("resize", (e) => {
    getSocialContainer().style.left = calcSocialContainerLeft();
});
