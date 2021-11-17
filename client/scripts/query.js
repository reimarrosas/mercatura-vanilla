"use strict";

(async function () {
  const selectedCategory = window.sessionStorage.getItem('selectedCategory');
  const searchedQuery = window.sessionStorage.getItem('searchQuery');
  if (selectedCategory && !searchedQuery) {
    const parsedCategory = await JSON.parse(selectedCategory);
    const categoryElement = document.querySelector('.query__selected-category');
    categoryElement.innerHTML = `
      <div class="container__img">
        <img src="${parsedCategory.category_image}" alt="${parsedCategory.category_name}." />
      </div>
      <div class="content-grp">
        <h1 class="categories__name">${parsedCategory.category_name}</h1>
        <p class="categories__desc">${parsedCategory.category_description}</p>
      </div>
    `;
    window.sessionStorage.removeItem('selectedCategory');
  }
})();