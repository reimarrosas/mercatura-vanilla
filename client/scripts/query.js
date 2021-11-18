"use strict";

let count;

const fetchProducts= async ({categoryName, searchQuery, limit, offset, recount}) => {
  const apiEndpoint = `${window.localStorage.getItem('baseApiEndpoint')}` + 
                      `/api/products/${categoryName ?? ''}` + 
                      `?${searchQuery ? 'search=' + searchQuery : ''}` + 
                      `&limit=${limit}&offset=${offset}&recount=${recount}`;
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
  let pages = [start, start + 1, '...', number - 1, number];

  if (number < 5) {
    pages = Array(number === 0 ? 1 : number).fill(0).map((_, ind) => start + ind);
  } else if (number - start <= 5) {
    pages = Array(5)
              .fill(0)
              .map((_, ind) => number - ind)
              .reverse();
  }

  const paginationLinkContainer = document.querySelector('.paginate__links');
  const paginationLinks = document.querySelectorAll('.paginate__links > a');
  if (paginationLinks.length === 0) {
    pages.forEach(page => {
      let listItem;
      const anchor = document.createElement('a')
      anchor.setAttribute('role', 'button');
      listItem = document.createElement('li');
      listItem.classList.add('paginate__page');
      listItem.textContent = page;
      anchor.appendChild(listItem);
      paginationLinkContainer.appendChild(anchor);
    });
  } else {
    [...paginationLinks]
      .forEach((link, ind) => {
        if (pages[2] === '...') {
          link.firstChild.textContent = ind === 2 ? '...' : pages[ind];
        } else {
          link.firstChild.textContent = pages[ind];
        }
      });
  }
}

const generateProducts = async (product, listElement) => {
  const {
    product_id: id,
    product_name: pname,
    product_price: price,
    product_image: image
  } = product;
  const anchor = document.createElement('a');
  anchor.setAttribute('role', 'button');
  anchor.classList.add('product__grp');
  const listItem = document.createElement('li');
  listItem.classList.add('product__listing');
  listItem.id = id;
  listItem.innerHTML = `
    <div class="container__img--p flex-center">
      <img src="${image}" alt="${pname}." />
    </div>
    <div class="content-grp--p flex-center">
      <h1 class="product__name">${pname.length > 22 ? pname.slice(0, 19) + '...' : pname}</h1>
      <span class="product__price">$ ${price}</span>
      <button class="product__btn">Add to Cart</button>
    </div>
  `;
  anchor.appendChild(listItem);
  listElement.appendChild(anchor);
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
  const productList = jsonResponse.queryResult;
  count = count ?? Math.ceil(parseInt(jsonResponse.count) / 15) - 1;
  productList.forEach(product => {
    generateProducts(product, listElement);
  });
}

(async function () {
  const selectedCategory = window.sessionStorage.getItem('selectedCategory');
  const searchedQuery = window.sessionStorage.getItem('searchQuery');
  let category;
  if (selectedCategory && !searchedQuery) {
    category = await JSON.parse(selectedCategory);
    const categoryElement = document.querySelector('.query__selected-category');
    setupCategoryCard(category, categoryElement);
  } else {
    document.querySelector('.query__selected-category').setAttribute('style', 'display: none');
  }

  const queryProducts = document.querySelector('.query__products');
  await setupProducts({
    categoryName: category?.category_name,
    searchQuery: searchedQuery,
    limit: 15,
    offset: 0,
    recount: 'true',
    listElement: queryProducts
  });

  setupPaginationLinks(count);

  const paginateLinks = document.querySelectorAll('.paginate__links > a');
  [...paginateLinks]
    .filter(link => link.firstChild.textContent !== '...')
    .forEach(link => {
      link.addEventListener('click', async () => {
        queryProducts.innerHTML = '';
        const offset = parseInt(link.firstChild.textContent);
        setupPaginationLinks(count, offset);
        await setupProducts({
          categoryName: category?.category_name,
          searchQuery: searchedQuery,
          limit: 15,
          offset: offset * 15,
          recount: 'false',
          listElement: queryProducts
        });
      }, false)
    })
})();