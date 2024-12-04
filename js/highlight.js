/* global AFRAME */
let resetEls;
AFRAME.registerComponent("highlight", {
    init: function () {
        let buttonEls = (this.buttonEls =
            this.el.querySelectorAll(".menu-button"));
        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.reset = this.reset.bind(this);
        resetEls = this.reset;
        for (let button of buttonEls) {
            button.addEventListener("mouseenter", this.onMouseEnter);
            button.addEventListener("mouseleave", this.onMouseLeave);
            button.addEventListener("click", this.onClick);
        }
    },

    onClick: function (evt) {
        evt.target.pause();
        this.el.addState("clicked");
    },

    onMouseEnter: function (evt) {
        evt.target.setAttribute("material", "color", "#046de7");
        for (let button of this.buttonEls) {
            if (evt.target === button) {
                continue;
            }
            button.setAttribute("material", "color", "white");
        }
    },

    onMouseLeave: function (evt) {
        evt.target.setAttribute("material", "color", "white");
    },

    reset: function () {
        for (let button of this.buttonEls) {
            this.el.removeState("clicked");
            button.play();
            button.emit("mouseleave");
        }
    },
});
