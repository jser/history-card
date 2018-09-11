// MIT © 2018 azu
"use strict";

export class Chapterion {
    constructor() {
        this.onUpdate = (slideSection) => {
            const chapter = slideSection.dataset.chapter;
            document.querySelector(".slide-header").textContent = chapter || "";
        };
    }

    start() {
        document.addEventListener("slidechanged", () => {
            this.onUpdate(event.currentSlide);
        }, false);
    }
}
