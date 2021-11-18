"use strict";

const fetchCategories = async (relativeUrl) => {
  const fullUrl = `${window.localStorage.getItem('baseApiEndpoint')}/${relativeUrl}`
  const response = await fetch(fullUrl);

  return response;
};

window.onload = async function() {
  const cardList = document.querySelector('.categories__card-list');
  const categoryString = window.localStorage.getItem('categories');
  let fst4Categories;
  if (categoryString) {
    const categories = await JSON.parse(categoryString);
    fst4Categories = [...categories.slice(0, 4)];
  } else {
    const response = await fetchCategories('api/categories')
    const responseArr = await response.json();
    window.localStorage.setItem('categories', JSON.stringify(responseArr));
    fst4Categories = [...await responseArr.slice(0, 4)];
  }
  populateCategoryList(fst4Categories, cardList);
};

const populateCategoryList = (categories, categoryList) => {
  categories.forEach(category => {
    createCard(category, categoryList);
  })
  const viewMoreCard = document.createElement('li');
  viewMoreCard.classList.add('categories__card', 'flex-center', 'view-more');
  viewMoreCard.innerHTML = `
    <a href="pages/categories.html" class="view__more">View More!<span class="arrow">></span></a>
  `;
  categoryList.appendChild(viewMoreCard);
}

const createCard = (category, listElement) => {
  const listItem = document.createElement('li');
  listItem.classList.add('categories__card', 'flex-center');
  listItem.innerHTML = `
    <div class="container__img">
      <img src="${category.category_image}" alt="${category.category_name}." />
    </div>
  `;
  const anchor = document.createElement('a');
  anchor.classList.add('category__link');
  anchor.textContent = category.category_name;
  anchor.addEventListener('click', () => {
    window.sessionStorage.setItem('selectedCategory', JSON.stringify(category));
    window.location.href = '/pages/query.html';
  });
  listItem.appendChild(anchor);

  listElement.appendChild(listItem);
};