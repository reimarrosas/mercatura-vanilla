"use strict";

const fetchCategories = async (relativeUrl) => {
  const fullUrl = `${window.sessionStorage.getItem('baseApiEndpoint')}/${relativeUrl}`
  const response = await fetch(fullUrl);

  return response;
};

window.onload = async function() {
  const cardList = document.querySelector('.categories__card-list');
  const categories = window.localStorage.getItem('categories');
  let fst4Categories;
  if (categories) {
    fst4Categories = [...categories.slice(0, 4)];
  } else {
    const response = await fetchCategories('api/categories')
    const responseArr = await response.json();
    window.localStorage.setItem('Categories', JSON.stringify(responseArr));
    fst4Categories = [...await responseArr.slice(0, 4)];
  }
  populateCategoryList(fst4Categories, cardList);
};

const populateCategoryList = (categories, categoryList) => {
  categories.forEach(category => {
    createCard(category.category_image, category.category_name, categoryList);
  })
  const viewMoreCard = document.createElement('li');
  viewMoreCard.classList.add('categories__card');
  viewMoreCard.innerHTML = `
    <a href="pages/categories.html" class="view__more">View More!</a>
  `;
  categoryList.appendChild(viewMoreCard);
}

const createCard = (imgSrc, categoryName, listElement) => {
  const listItem = document.createElement('li');
  listItem.classList.add('categories__card');
  listItem.innerHTML = `
    <div class="container__img">
      <img src="${imgSrc}" alt="${categoryName}." />
    </div>
    <a href="" class="category__link">${categoryName}</a>
  `;

  listElement.appendChild(listItem);
};