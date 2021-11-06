"use strict";

(function () {
  const images = document.querySelectorAll(".carousel img");

  carouselAnimation(images);
})();

function carouselAnimation(images) {
  let count = 1;

  setInterval(() => {
    if (count > 0) images[count - 1].id = "";
    else images[images.length - 1].id = "";
    images[count].id = "carousel-show";
    count = (count + 1) % 4;
  }, 8000);
}