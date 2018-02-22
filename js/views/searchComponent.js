import {searchService} from "../services/searchService.js";

export const setupSearch = {
  setupEventListeners: () => {
    $('#searchproduct').on('input', function() {
      const productName = $(this).val();
      searchService.getProductsByName(productName);
    });
  },

  renderResults: (products) => {
    $("#totalCounts").html(products.length);
    const $resultsContainer = $('#products-results');
    $resultsContainer.html('');
    if (products.length) {
      const productsHtml = loadProductTemplate(products);
      $resultsContainer.html(productsHtml);
    }
  },

  showError: () => {
    alert('Something went wrong during loading books!');
  }
}

function loadProductTemplate (products) {
  let productsHtml='';

  products.forEach( product => {
    productsHtml += `
    <div class="col-sm-4">
      <div class="card book">
        <div class="card-img-holder">
          <img class="card-img-top" src="${product.images.smallThumbnail}" alt="Book image">
        </div>
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <a href="product.html?productId=${product.id}" class="btn btn-primary">More</a>
        </div>
      </div>
    </div>
    `;
  });

  return productsHtml;
}
