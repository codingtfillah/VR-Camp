const img = document.getElementById("img");
img.object3D.renderOrder = 102;
img.object3D.depthTest = false;

img.clickCoordinates = [0, 0];

const preventClick = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
};

img.addEventListener('mousedown', (event) => {
    img.clickCoordinates = event.detail.intersection.point;
});

img.addEventListener('click', (event) => {
    if (!event.detail.intersection.point.equals(img.clickCoordinates)) preventClick(event);
});

const setImg = (name) => {
    return () =>
        img.setAttribute("material", { visible: true, src: `#${name}Img` });
};

const groups = {
    leviim: () => {
        let audio = document.getElementById("leviimAudio");
        audio.currentTime = 0;
        audio.play();

        setImg("leviim")();

        let timeouts = [];

        return () => {
            for (let timeout of timeouts) clearTimeout(timeout);
            audio.pause();
        }
    },
    mishkan: () => {
        let audio = document.getElementById("mishkanAudio");
        audio.currentTime = 0;
        audio.play();

        setImg("mishkan")();

        let timeouts = [];

        return () => {
            for (let timeout of timeouts) clearTimeout(timeout);
            audio.pause();
        };
    },
    north: () => {
        let audio = document.getElementById("northAudio");
        audio.currentTime = 0;
        audio.play();

        setImg("north")();

        let timeouts = [];

        return () => {
            for (let timeout of timeouts) clearTimeout(timeout);
            audio.pause();
        };
    },
    east: () => {
        let audio = document.getElementById("eastAudio");
        audio.currentTime = 0;
        audio.play();

        setImg("east")();

        let timeouts = [];

        return () => {
            for (let timeout of timeouts) clearTimeout(timeout);
            audio.pause();
        };
    },
    south: () => {
        let audio = document.getElementById("southAudio");
        audio.currentTime = 0;
        audio.play();

        setImg("south")();

        let timeouts = [];

        return () => {
            for (let timeout of timeouts) clearTimeout(timeout);
            audio.pause();
        };
    },
    west: () => {
        let audio = document.getElementById("westAudio");
        audio.currentTime = 0;
        audio.play();

        setImg("west")();

        let timeouts = [];

        return () => {
            for (let timeout of timeouts) clearTimeout(timeout);
            audio.pause();
        };
    }
    /* The following is an example if you have multiple images to display for a group
    reuben: () => {
        let audio = document.getElementById("reubenAudio");
        audio.currentTime = 0;
        audio.play();

        setImg("reuben")();

        let timeouts = [
            setTimeout(setImg("shimon"), 18900),
            setTimeout(setImg("gad"), 28680),
            setTimeout(setImg("reuben"), 48400),
            setTimeout(setImg("shimon"), 61600),
            setTimeout(setImg("gad"), 63252),
            setTimeout(setImg("reuben"), 73400),
        ];

        return () => {
            for (let timeout of timeouts) clearTimeout(timeout);
            audio.pause();
        };
    },
    */
};

AFRAME.registerComponent("menu", {
    init: function () {
        let buttonEls = this.el.getElementsByClassName("menu-button");

        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        for (let button of buttonEls) {
            button.addEventListener("click", this.onMenuButtonClick);
        }
        this.onBackButtonClick = this.onBackButtonClick.bind(this);
        this.el.object3D.renderOrder = 101;
        this.el.object3D.depthTest = false;
    },

    onMenuButtonClick: function (evt) {
        img.object3D.visible = true;
        this.reset = groups[evt.target.id]();
        img.addEventListener("click", this.onBackButtonClick);
        img.classList.add("raycastable");
    },

    onBackButtonClick: function () {
        img.object3D.visible = false;
        this.reset();
        img.removeEventListener("click", this.onBackButtonClick);
        img.classList.remove("raycastable");
        resetEls();
    },
});
