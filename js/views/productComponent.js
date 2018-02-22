import {productService} from '../services/productService.js';
import {cartService} from '../services/cartService.js';

export const productComponent = {

  initProduct: productId => {
    productService.getProductById(productId);
  },

  renderProduct: productData => {
    if (!jQuery.isEmptyObject(productData)) {
      const $productContainer = $('#product-container');
      $productContainer.find('#product-title').text(productData.title);
      $productContainer.find('#product-image img').attr('src', productData.images.medium);
      const $descriptionContainer = $productContainer.find('#product-description');
      const descriptionHtml = getDescriptionTemplate(productData);
      $descriptionContainer.html(descriptionHtml);
      const $addToCartButton = $('<button type="button" class="btn btn-primary">Add to cart</button>').appendTo($descriptionContainer);

      setupEventListeners($addToCartButton, productData);
    } else {
      $('.no-product').removeClass('d-none');
    }

    $('#load-product').hide();
  },

  showError: () => {
    alert('Something went wrong durink loading product data');
  }
}

function setupEventListeners($addToCartButton, product) {
  $addToCartButton
    .on('click', function () {
      cartService.add(product);
    });
}


function getDescriptionTemplate (data) {
  let $html ='';
  jQuery.each(data, function(key, value) {
    if (key !== 'title' && key !== 'images') {
      if ( key === 'authors' ) {
        value = value.join(', ');
      }

      $html += `
      <p class="product-information">
        <label>${key}</label>:
        <span>${value}</span>
      </p>`;
    }
  });

  return $html;
}
