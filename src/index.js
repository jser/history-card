// MIT © 2018 azu
"use strict";
const Reveal = require("reveal.js");
const { Chapterion } = require("./plugins/Chapter.js");
// More info https://github.com/hakimel/reveal.js#configuration
const { JSerStat } = require("@jser/stat");
const { fetchItems, fetchPosts } = require("@jser/data-fetcher");
const remove = (element) => {
    if (!element) {return;}
    element.parentNode.removeChild(element);
};
const newSection = (number, title, url) => {
    const section = document.createElement("section");
    section.dataset.chapter = `#${number}`;
    section.innerHTML = `<h1><a href="${url}">${title}</a></h1>`;
    return section;
};
/**
 * @returns {Promise<JSerStat>}
 */
const createStat = () => {
    return Promise.all([fetchItems(), fetchPosts()]).then(([items, posts]) => {
        return new JSerStat(items, posts);
    });
};

/**
 *
 * @param {JSerWeek} week
 */
const createSlideFromJSerWeek = (week) => {
    return newSection(week.weekNumber, week.post.title, week.post.url);
};

function main() {
    Reveal.initialize({
        width: 1280,
        height: 960,
        minScale: 0.2,
        maxScale: 1.0,
        history: false,
        slideNumber: false,
        controls: false,
        loop: false,
        autoSlide: 0,
        transition: 'fade', // none/fade/slide/convex/concave/zoom
        transitionSpeed: 'fast'
    });
    const chapter = new Chapterion();
    chapter.start();
    // fetch and set
    createStat().then(stat => {
        const weeks = stat.getJSerWeeks();
        const slideSections = weeks.map(week => createSlideFromJSerWeek(week));
        const fragment = document.createDocumentFragment();
        slideSections.forEach(slideSection => fragment.appendChild(slideSection));
        const slides = document.querySelector(".slides");
        slides.appendChild(fragment);
        // start
        remove(document.querySelector(".now-loading"));
        Reveal.configure({ autoSlide: 8 * 1000 });
        Reveal.next();
    }).catch(error => {
        console.error(error);
    });
}

// Run
main();
