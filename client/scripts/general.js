"use strict";

const round2Digits = (number) => Math.floor(number * 100) / 100;

if (!window.location.href.includes('query.html')) {
  window.sessionStorage.removeItem('searchQuery');
}

if (!window.localStorage.getItem('cart')) {
  window.localStorage.setItem('cart', JSON.stringify([]));
}

const reduceItems = (cartList) => {
  return cartList.reduce((acc, cur) => {
    const doubleProduct = acc.find(el => el.product.product_id === cur.product_id);
    if (doubleProduct !== undefined) {
      doubleProduct.count++;
      return acc;
    } else {
      return [...acc, {
        product: cur,
        count: 1
      }]
    }
  }, []);
}

(async function() {
  const cartList = await JSON.parse(window.localStorage.getItem('cart'));
  const cart = document.querySelector('.cart__item-list');
  const reducedCart = reduceItems(cartList);
  cart.innerHTML = '';
  reducedCart.forEach(item => {
    const { product } = item;
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart__item', 'flex-center');
    cartItem.innerHTML = `
      <div class="container__img--c">
        <img src="${product.product_image}" alt="${product.product_name}">
      </div>
      <h1 class="cart__item-title">${product.product_name.length > 50 ? product.product_name.slice(0, 47) + '...' : product.product_name}</h1>
      <span class="cart__price">$ ${round2Digits(product.product_price).toFixed(2)}</span>
    `;
    cart.appendChild(cartItem);
  });
  const total = reducedCart.reduce((acc, cur) => (round2Digits(acc) + (round2Digits(cur.product.product_price) * cur.count)), 1)
  const cartPrice = document.querySelector('.cart__total > .cart__price');
  cartPrice.textContent = round2Digits(reducedCart.length === 0 ? 0 : total).toFixed(2);
})();

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
  window.localStorage.setItem("baseApiEndpoint", "https://api.mercatura.xyz");
}

const cart = document.querySelector("#cart");
const cartClose = document.querySelector(".cart .clear-button");
const cartOpen = document.querySelector("header button");

cartClose.addEventListener("click", () => {
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

const clearButton = document.querySelector('.cart__clear');
clearButton.addEventListener('click', () => {
  window.localStorage.setItem('cart', JSON.stringify([]));
  document.querySelector('.cart__total > .cart__price').textContent = (0).toFixed(2);
  document.querySelector('.cart__item-list').innerHTML = '';
});
