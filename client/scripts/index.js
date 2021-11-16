"use strict";

(function () {
  const cardList = document.querySelector('.categories__card-list');
  console.log(cardList);
})();

const fetchCategories = () => {

};

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