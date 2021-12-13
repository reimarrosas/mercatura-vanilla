"use strict";

(async function () {
    const cart = reduceItems(await JSON.parse(window.localStorage.getItem("cart")));
    const checkoutList = document.querySelector(".checkout__list");
    cart.forEach(item => {
        const { product } = item;
        const li = document.createElement("li");
        li.classList.add("checkout-item");
        li.innerHTML = `
            <div class="checkout-img-container">
                <img src="${product.product_image}" alt="${product.product_name}" />
            </div>
            <h1 class="cart__item-title">${product.product_name.length > 50 ? product.product_name.slice(0, 47) + '...' : product.product_name}</h1>
            <span class="cart__price">$ ${round2Digits(product.product_price).toFixed(2)}</span>
        `;
        checkoutList.appendChild(li);
    });
})()

const addressForm = document.querySelector(".address__form");
addressForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    window.localStorage.setItem("cart", []);
    document.querySelector(".checkout__status").classList.remove("undisplay");
    document.querySelector(".checkout__content").classList.add("undisplay");
})