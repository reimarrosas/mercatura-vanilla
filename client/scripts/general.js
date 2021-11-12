"use strict";

window.addEventListener('load', () => {
  const loginLink = document.querySelector(".login-link");
  const logoutLink = document.querySelector(".logout-link");

  if (window.sessionStorage && window.sessionStorage.getItem('isLoggedIn') === 'true') {
    loginLink.setAttribute('style', 'display: none;');
    logoutLink.setAttribute('style', 'display: inline;');
  } else {
    logoutLink.setAttribute('style', 'display: none;');
    loginLink.setAttribute('style', 'display: inline;');
  }
});

(function () {
  const cart = document.querySelector("#cart");
  const cartClose = document.querySelector(".cart .clear-button");
  const cartOpen = document.querySelector("header button");

  cartClose.addEventListener("click", () => {
    console.log("event hit");
    cart.classList.remove("cart-toggle");
  });
  cartOpen.addEventListener("click", () => {
    cart.classList.add("cart-toggle");
  });

})();