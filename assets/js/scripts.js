// toggle theme
const toggleThemeButton = document.querySelector(".toggle-theme");

toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// morph svg

const morphContainer = document.querySelector(".morph-container");
const morphSvg = document.querySelector(".morph-svg");
const morphShape = document.querySelector(".morph-shape");

const textClose = document.querySelector(".svg-text-close");
const textOpen = document.querySelector(".svg-text-open");
const catPath = document.querySelector("#cat-path");
const catSvg = document.querySelector("#cat-svg");

const morphKeyframes = [
  {
    d: 'path("M 70 130  L 130 130  C 130 135 130 150 130 150  L 70 150  C 70 150 70 135 70 135 Z")',
  },
  {
    d: 'path("M 70 95   L 130 95   C 130 120 115 125 115 150  L 85 150  C 85 125 70 120 70 95 Z")',
    offset: 0.25,
  },
  {
    d: 'path("M 50 50   L 150 50   C 150 110 130 90 130 150   L 70 150  C 70 90 50 110 50 50 Z")',
    offset: 0.5,
  },
  {
    d: 'path("M 30 45   L 170 45   C 170 100 130 90 130 155   L 70 155  C 70 90 30 100 30 45 Z")',
    offset: 0.75,
  },
  {
    d: 'path("M 10 40   L 190 40   C 190 90 190 130 190 160   L 10 160  C 10 130 10 90 10 40 Z")',
  },
];

const animOptions = {
  duration: 600,
  easing: "cubic-bezier(0.3, 0.8, 0.2, 1.3)",
  fill: "forwards",
};

let isOpen = false;
let currentAnimation = null;

morphSvg.addEventListener("click", () => {
  morphContainer.classList.toggle("trigger");

  textClose.style.opacity = "0";
  textOpen.style.opacity = "0";

  if (currentAnimation) currentAnimation.cancel();

  if (!isOpen) {
    currentAnimation = morphShape.animate(morphKeyframes, {
      ...animOptions,
      direction: "normal",
    });
  } else {
    currentAnimation = morphShape.animate(morphKeyframes, {
      ...animOptions,
      direction: "reverse",
    });
  }

  currentAnimation.finished.then(() => {
    if (!isOpen) {
      textClose.style.opacity = "1";
      textOpen.classList.remove("cat-text-move");
      catPath.classList.remove("morph-cat");
      catSvg.classList.remove("cat-jump");
    } else {
      textOpen.style.opacity = "1";
      textOpen.classList.add("cat-text-move");
      catPath.classList.add("morph-cat");
      catSvg.classList.add("cat-jump");
    }
  });

  isOpen = !isOpen;
});
