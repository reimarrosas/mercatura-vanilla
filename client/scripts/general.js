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
  if (window.localStorage.getItem('baseApiEndpoint') === null) {
    window.localStorage.setItem('baseApiEndpoint', 'http://localhost:1200');
  }

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

  const loginBtn = document.querySelector('.login-link');
  loginBtn.addEventListener('click', () => {
    window.sessionStorage.setItem('prevUrl', window.location.href);
  });
  
  const logoutBtn = document.querySelector('.logout-link');
  logoutBtn.addEventListener('click', () => {
    window.sessionStorage.removeItem('isLoggedIn');
    window.sessionStorage.removeItem('user');
  });
})();