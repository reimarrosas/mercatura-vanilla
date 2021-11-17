"use strict";

const fetchCategories = async () => {
  const apiEndpoint = window.localStorage.getItem('baseApiEndpoint');
  return await fetch(`${apiEndpoint}/api/categories`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    referrerPolicy: 'no-referrer',
  });
}

(async function () {
  let categoryString = window.localStorage.getItem('categories');
  let categories;
  if (categoryString) {
    categories = await JSON.parse(categoryString);
  } else {
    const rawCategory = await fetchCategories();
    categories = await rawCategory.json();
    window.localStorage.setItem('categories', JSON.stringify(categories));
  }

  const categoriesList = document.querySelector('.categories__list');
  categories.forEach(category => {
    const listItem = document.createElement('li');
    listItem.classList.add('categories__list-item')
    listItem.innerHTML = `
    <a href="./searchResult.html">
      <div class="container__img">
        <img src="${category.category_image}" alt="${category.category_name}." />
      </div>
      <div class="content-grp">
        <h1 class="categories__name">${category.category_name}</h1>
        <p class="categories__desc">${category.category_description}</p>
      </div>
    </a>
    `;
    categoriesList.appendChild(listItem);
  });

  const anchors = document.querySelectorAll('.categories__list-item > a');
  anchors.forEach((anchor, ind) => {
    anchor.addEventListener('click', () => {
      window.sessionStorage.setItem('selectedCategory', JSON.stringify(categories[ind]));
    });
  })
})();