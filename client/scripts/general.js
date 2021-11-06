"use strict";

(function () {
  localStorage.setItem("cartItems", JSON.stringify([]));
  const cart = document.querySelector("#cart");
  const cartClose = document.querySelector(".cart .clear-button");
  const cartOpen = document.querySelector("header button");
  const addToCart = document.querySelectorAll(".add-to-cart");

  cartClose.addEventListener("click", () => {
    console.log("event hit");
    cart.classList.remove("cart-toggle");
  });
  cartOpen.addEventListener("click", () => {
    cart.classList.add("cart-toggle");
  });
  // addToCart.forEach(el => {
  //   el.addEventListener("click", () => {
  //     cart.classList.add("cart-toggle");
  //   });
  // });
})();