import {cartService} from '../services/cartService.js';

export const cartComponent = {

  showCartCounter: counter => {
    $('#cart-counter').text(counter);
  },

  showItemAlreadyAddedAlert: () => {
    alert('Product is already added to the cart.');
  },

  showSuccesAdditionAlert: () => {
    alert('Product added to cart');
  },

  getCartCount: () => {
    cartService.getCartCount();
  },

  renderCartElements: products => {
    let html;
    if (products.length) {
      html = getCartTable(products);
    } else {
      html = '<tr><td colspan="5">There are no items in the cart.</td></tr>';
    }

    $("#cart-item-list").html(html);
    setupEventListeners();
  }
}

function getCartTable (products) {
  let rows ='';
  products.forEach (function (product) {
    const authors = product.authors.join(', ');
    rows += `
    <tr>
      <td>
        <img src="${product.images.smallThumbnail}">
      </td>
      <td><a href="product.html?productId=${product.id}">${product.title}</a></td>
      <td>${product.authors}</td>
      <td>${product.id}</td>
      <td><button type="button" class="btn btn-primary remove-item" data-id="${product.id}">Remove from cart</button></td>
    </tr>
    `;
  });

  return rows;
}

function setupEventListeners (products){
  $('.btn.remove-item').on('click', function() {
    const productId = $(this).attr('data-id');
    cartService.removeItem(productId, function() {
      cartService.getCartCount();
      cartService.getCartItems();
    });
  });
}
