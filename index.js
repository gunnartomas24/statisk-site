const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const container = document.querySelector(".category-grid");

function getData() {
  fetch(endpoint)
    .then((category) => category.json())
    .then(showData);
}

function showData(data) {
  data.forEach((category) => {
    container.innerHTML += `<a href="productlist.html?category=${category.category}">${category.category}</a>`;
  });
}

getData();
