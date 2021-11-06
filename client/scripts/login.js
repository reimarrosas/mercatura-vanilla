"use strict";

(function () {
  const inputs = document.querySelectorAll(`.signup input:not([type="submit"])`);

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (input.id === "confirm-signup-pw") {
        const pw = document.querySelector("#signup-pw");
        input.setAttribute("style",
          `background: no-repeat 96% / 8% url(../resources/images/is_${pw.value === input.value ? "" : "in"}valid.svg);`
        );
      } else {
        input.setAttribute("style",
          `background: no-repeat 96% / 8% url(../resources/images/is_${input.checkValidity() ? "" : "in"}valid.svg);`
        );
      }
    });
  });
})();