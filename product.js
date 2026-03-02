const productid = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".section-product");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${productid}`;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showProduct);
}
function showProduct(data) {
  container.innerHTML = `
    <div class="img-container">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp"
            alt="Product Image"
          />
        </div>
        <div class="product-info ${data.soldout && "soldout"} ${data.discount && "sale"}">
          <p class="brandname">${data.brandname}</p>
          <h3 class="productname">${data.productdisplayname}</h3>
          <div class="price-container">
            <p class="price">${data.price},-</p>
            <span class="salesprice">${Math.round(data.price - (data.price * data.discount) / 100)},-</span>
          </div>
          <p class="stock">
            <span class="in-stock">In stock</span
            ><span class="out-of-stock">Out of stock</span>
          </p>
          <a href=""> <button class="add-to-cart">Add to Cart</button></a>
          <p id="product-description">${data.description}</p>
        </div>
    `;
}

getData();
