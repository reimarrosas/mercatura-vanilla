"use strict";

const roundTo2 = (number) => Math.floor(number * 100) / 100;

let count;

const fetchProducts = async ({
  categoryName,
  searchQuery,
  limit,
  offset,
  recount,
}) => {
  const apiEndpoint =
    `${window.localStorage.getItem("baseApiEndpoint")}` +
    `/api/products/${categoryName ?? ""}` +
    `?${searchQuery ? "search=" + searchQuery : ""}` +
    `&limit=${limit}&offset=${offset}&recount=${recount}`;
  return await fetch(apiEndpoint);
};

const setupCategoryCard = (category, element) => {
  element.innerHTML = `
    <div class="container__img">
      <img src="${category.category_image}" alt="${category.category_name}." />
    </div>
    <div class="content-grp">
      <h1 class="category__name">${category.category_name}</h1>
      <p class="category__desc">${category.category_description}</p>
    </div>
  `;
};

const setupPaginationLinks = (number, start = 1) => {
  let pages = [start, start + 1, "...", number - 1, number];

  if (number < 5) {
    pages = Array(number === 0 ? 1 : number)
      .fill(0)
      .map((_, ind) => start + ind);
  } else if (number - start + 1 <= 5) {
    pages = Array(5)
      .fill(0)
      .map((_, ind) => number - ind)
      .reverse();
  }

  const paginationLinkContainer = document.querySelector(".paginate__links");
  const paginationLinks = document.querySelectorAll(".paginate__links > a");
  if (paginationLinks.length === 0) {
    pages.forEach((page) => {
      let listItem;
      const anchor = document.createElement("a");
      anchor.setAttribute("role", "button");
      listItem = document.createElement("li");
      listItem.classList.add("paginate__page");
      listItem.textContent = page;
      anchor.appendChild(listItem);
      paginationLinkContainer.appendChild(anchor);
    });
  } else {
    [...paginationLinks].forEach((link, ind) => {
      if (pages[2] === "...") {
        paginationLinks[0].classList.add("current");
        link.firstChild.textContent = ind === 2 ? "..." : pages[ind];
      } else {
        link.firstChild.textContent = pages[ind];
      }
    });
    paginationLinks.forEach((link) => {
      link.classList.remove("current");
    });
    paginationLinks[
      [...paginationLinks].findIndex((el) => el.textContent === `${start}`)
    ].classList.add("current");
  }
};

const reduceCartItems = (cartList) => {
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

const setupCartList = (cartList) => {
  const cart = document.querySelector('.cart__item-list');
  const reducedCart = reduceItems(cartList);
  cart.innerHTML = '';
  reducedCart.forEach(item => {
    const { product, count } = item;
    const cartItem = document.createElement('li');
    cartItem.classList.add('list__item');
    cartItem.innerHTML = `
      <div class="container__img--p">
        <img src="${product.product_image}" alt="${product.product_name}">
      </div>
      <h1 class="cart__title">${product.product_name}</h1>
      <span class="cart__price">$ ${round2Digits(product.product_price).toFixed(2)}</span>
    `;
    cart.appendChild(cartItem);
  });
  console.log(reducedCart);
  const total = reducedCart.reduce((acc, cur) => (round2Digits(acc) + (round2Digits(cur.product.product_price) * cur.count)), 1)
  const cartPrice = document.querySelector('.cart__total > .cart__price');
  cartPrice.textContent = round2Digits(total).toFixed(2);
}

const generateProducts = async (product, listElement) => {
  const {
    product_id: id,
    product_name: pname,
    product_price: price,
    product_image: image,
  } = product;
  const anchor = document.createElement("a");
  anchor.setAttribute("role", "button");
  anchor.classList.add("product__grp");
  const listItem = document.createElement("li");
  listItem.classList.add("product__listing");
  listItem.id = id;
  listItem.innerHTML = `
    <div class="container__img--p flex-center">
      <img src="${image}" alt="${pname}." />
    </div>
  `;
  const contentGrp = document.createElement('div');
  contentGrp.classList.add('content-grp--p', 'flex-center');
  contentGrp.innerHTML = `
    <h1 class="product__name">${
      pname.length > 20 ? pname.slice(0, 17) + "..." : pname
    }</h1>
    <span class="product__price">$ ${price}</span>
  `;
  const addToCart = document.createElement('button');
  addToCart.classList.add('product__btn');
  addToCart.textContent = 'Add to Cart';
  addToCart.addEventListener('click', async () => {
    const cartList = await JSON.parse(window.localStorage.getItem('cart'));
    const newCartList = [...cartList, product];
    window.localStorage.setItem('cart', JSON.stringify(newCartList));
    setupCartList(newCartList);
  });
  contentGrp.appendChild(addToCart);
  listItem.appendChild(contentGrp);
  anchor.appendChild(listItem);
  listElement.appendChild(anchor);
};

const setupProducts = async ({
  categoryName,
  searchQuery,
  limit,
  offset,
  recount,
  listElement,
}) => {
  const products = await fetchProducts({
    categoryName,
    searchQuery,
    limit,
    offset,
    recount,
  });
  const jsonResponse = await products.json();
  const productList = jsonResponse.queryResult;
  count = count ?? Math.ceil(parseInt(jsonResponse.count) / 15);
  productList.forEach((product) => {
    generateProducts(product, listElement);
  });
};

const setupLinksAndProducts = async ({
  categoryName,
  searchQuery,
  limit,
  offset,
  recount,
  listElement,
  start
}) => {
  await setupProducts({
    categoryName,
    searchQuery,
    limit,
    offset,
    recount,
    listElement,
  });
  setupPaginationLinks(count, start);
};

const setupArrowPagination = ({
  categoryName,
  searchQuery,
  limit,
  recount,
  listElement,
}) => {
  const paginationLinks = document.querySelectorAll(".paginate__links > a");
  const [left, right] = document.querySelectorAll(".query__paginate > a");
  left.addEventListener("click", async () => {
    const currentNode = [...paginationLinks].find((el) =>
      el.classList.contains("current")
    );
    const page = parseInt(currentNode.textContent) - 1;
    if (page > 0) {
      listElement.innerHTML = "";
      await setupLinksAndProducts({
        categoryName,
        searchQuery,
        limit,
        offset: (page - 1) * 15,
        recount,
        listElement,
        start: page
      });
    }
  });
  right.addEventListener("click", async () => {
    const currentNode = [...paginationLinks].find((el) =>
      el.classList.contains("current")
    );
    const page = parseInt(currentNode.textContent);
    console.log(count, page);
    if (page < count) {
      listElement.innerHTML = "";
      await setupLinksAndProducts({
        categoryName,
        searchQuery,
        limit,
        offset: page * 15,
        recount,
        listElement,
        start: page + 1
      });
    }
  });
};

(async function () {
  const selectedCategory = window.sessionStorage.getItem("selectedCategory");
  const searchedQuery = window.sessionStorage.getItem("searchQuery");
  let category;
  if (selectedCategory && !searchedQuery) {
    category = await JSON.parse(selectedCategory);
    const categoryElement = document.querySelector(".query__selected-category");
    setupCategoryCard(category, categoryElement);
  } else if (searchedQuery) {
    document
      .querySelector(".query__selected-category")
      .setAttribute("style", "display: none");
  }

  const queryProducts = document.querySelector(".query__products");

  await setupLinksAndProducts({
    categoryName: category?.category_name,
    searchQuery: searchedQuery,
    limit: 15,
    offset: 0,
    recount: 'true',
    listElement: queryProducts
  });
  setupArrowPagination({
    categoryName: category?.category_name,
    searchQuery: searchedQuery,
    limit: 15,
    recount: "false",
    listElement: queryProducts,
  });
  const paginateLinks = document.querySelectorAll(".paginate__links > a");
  paginateLinks[0].classList.add("current");
  [...paginateLinks]
    .forEach((link) => {
      if (link.textContent !== '...') {
        link.addEventListener(
          "click",
          async () => {
            queryProducts.innerHTML = "";
            const page = parseInt(link.firstChild.textContent);
            setupLinksAndProducts({
              categoryName: category?.category_name,
              searchQuery: searchedQuery,
              limit: 15,
              offset: (page - 1) * 15,
              recount: "false",
              listElement: queryProducts,
              start: page
            });
          },
          false
        );
      }
    });
})();
