"use strict";

const fetchProducts= async ({categoryName, searchQuery, limit, offset, recount}) => {
  const apiEndpoint = `${window.localStorage.getItem('baseApiEndpoint')}` + 
                      `/api/products/${categoryName ?? ''}` + 
                      `?${searchQuery ? 'search=' + searchQuery : ''}` + 
                      `limit=${limit}&offset=${offset}&recount=${recount}`;
  return await fetch(apiEndpoint);
}

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
}

const setupPaginationLinks = (number, start = 1) => {
  let pages = [start, start + 1, start + 2, number - 1, number];
  const paginationLinks = document.querySelector('.paginate__links');
  pages.forEach((el, ind) => {
    let listItem;
    const anchor = document.createElement('a')
    anchor.setAttribute('role', 'button');
    listItem = document.createElement('li');
    listItem.classList.add('paginate__page');

    if (ind === 0 || ind === 1) {
      listItem.classList.add('moving');
    }

    if (ind === 2 && number > 5) {
      listItem.textContent = '...';
    } else {
      listItem.textContent = el;
    }

    anchor.appendChild(listItem);
    paginationLinks.appendChild(anchor);
  });
}

const generateProducts = async (product, listElement) => {
  const {
    product_id: id,
    product_name: pname,
    product_price: price,
    product_image: image
  } = product;
  const button = document.createElement('b');
  button.classList.add('product__grp');
  const listItem = document.createElement('li');
  listItem.classList.add('product__listing');
  listItem.id = id;
  listItem.innerHTML = `
    <div class="container__img">
      <img src="${image}" alt="${pname}." />
    </div>
    <div class="content-grp">
      <h1 class="product__name">${pname.length > 25 ? pname.slice(0, 22) + '...' : pname}</h1>
      <span class="product__price>$ ${price}</span>
    </div>
    <button class="product__btn">Add to Cart</button>
  `;
  button.appendChild(listItem);
  listElement.appendChild(button);
}

const setupProducts = async ({ categoryName, searchQuery, limit, offset, recount, listElement}) => {
  const products = await fetchProducts({
    categoryName,
    searchQuery,
    limit,
    offset,
    recount
  });
  const jsonResponse = await products.json();
  const productList = jsonResponse.result;
  count = jsonResponse.count;
  setupPaginationLinks(count);
  productList.forEach(product => {
    generateProducts(product, listElement);
  });
}

let count;

const testFunc = (products) => {
  console.log(products);
}

(async function () {
  const selectedCategory = window.sessionStorage.getItem('selectedCategory');
  const searchedQuery = window.sessionStorage.getItem('searchQuery');
  let category;
  if (selectedCategory && !searchedQuery) {
    category = await JSON.parse(selectedCategory);
    const categoryElement = document.querySelector('.query__selected-category');
    setupCategoryCard(category, categoryElement);
  };
  
  await setupProducts({
    categoryName: category.category_name,
    searchQuery: searchedQuery,
    limit: 10,
    offset: 0,
    recount: 'true',
    listElement: document.querySelector('.query__products')
  });
})();