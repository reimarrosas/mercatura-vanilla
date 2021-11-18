"use strict";

window.addEventListener("load", () => {
  const loginLink = document.querySelector(".login-link");
  const logoutLink = document.querySelector(".logout-link");

  if (
    window.sessionStorage &&
    window.sessionStorage.getItem("isLoggedIn") === "true"
  ) {
    loginLink.setAttribute("style", "display: none;");
    logoutLink.setAttribute("style", "display: inline;");
  } else {
    logoutLink.setAttribute("style", "display: none;");
    loginLink.setAttribute("style", "display: inline;");
  }
});

if (window.localStorage.getItem("baseApiEndpoint") === null) {
  window.localStorage.setItem("baseApiEndpoint", "http://localhost:1200");
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

const loginBtn = document.querySelector(".login-link");
loginBtn.addEventListener("click", () => {
  window.sessionStorage.setItem("prevUrl", window.location.href);
});

const logoutBtn = document.querySelector(".logout-link");
logoutBtn.addEventListener("click", () => {
  window.sessionStorage.removeItem("isLoggedIn");
  window.sessionStorage.removeItem("user");
});

const screenCheck = (mq, siteTitle) => {
  if (mq.matches) {
    siteTitle.textContent = "M";
  } else {
    siteTitle.textContent = "Mercatura";
  }
};

const titleMediaQuery = window.matchMedia("(max-width: 560px)");
const siteTitle = document.querySelector(".mercatura__title");

screenCheck(titleMediaQuery, siteTitle);

titleMediaQuery.addEventListener('change', () => {
  screenCheck(titleMediaQuery, siteTitle);
});

const searchForm = document.querySelector('.mercatura__search');
searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(searchForm);
  data.forEach((value, key) => (data[key] = value));
  window.sessionStorage.setItem('searchQuery', data.search_query);
  window.location.replace('/pages/query.html');
});