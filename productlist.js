const category = new URLSearchParams(window.location.search).get("category");

const nameContainer = document.querySelector(".category-name");
const cardgrid = document.querySelector(".card-grid");
const loadMoreBtn = document.querySelector(".load-more");
const limit = 12;
let start = 0;

function getName() {
  nameContainer.textContent = category;
}
getName();

function getEndpoint() {
  return `https://kea-alt-del.dk/t7/api/products?limit=${limit}&start=${start}&category=${category}`;
}

function getData() {
  const url = getEndpoint();
  console.log("Fetching:", url);

  fetch(url)
    .then((res) => res.json())
    .then(showProducts);
}

function showProducts(products) {
  let markup = "";
  products.forEach(
    (product) =>
      (markup += `<article class="product-card ${product.soldout && "soldout"} ${product.discount && "sale"}">
            <a href="product.html?id=${product.id}">
              <img
                src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                alt="Product Image"
              />
              <span class="soldout-badge">Sold Out</span>
              <span class="sale-badge">Sale</span>
              <p class="brandname">${product.brandname}</p>
              <h3 class="productname">${product.productdisplayname}</h3>
              <div class="price-container">
                <p class="price">${product.price},-</p>
                <span class="salesprice">${Math.round(product.price - (product.price * product.discount) / 100)},-</span>
              </div>
            </a>
          </article>`),
  );
  cardgrid.innerHTML += markup;
}
loadMoreBtn.addEventListener("click", () => {
  start += limit;
  getData();
});

getData();
