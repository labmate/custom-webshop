import {cartComponent} from '../views/cartComponent.js';
export const cartService = {

  add: product => {
    const cart = sessionStorage.getItem("cart");
    let newCart;

    if (!cart) {
      newCart = {products: []};
    } else {
      newCart = JSON.parse(cart);
    }

    // check if book is in the cart already and if not, then added it to it
    const added = newCart.products.find( element => element.id === product.id);
    if (!added) {
      newCart.products.push(product);
      sessionStorage.setItem("cart", JSON.stringify(newCart));
      cartComponent.getCartCount();
      cartComponent.showSuccesAdditionAlert();
    } else {
      cartComponent.showItemAlreadyAddedAlert();
    }

  },

  removeItem: (productId, callback) => {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    const products = cart.products.filter(element => element.id !== productId);
    cart.products = products;
    sessionStorage.setItem("cart", JSON.stringify(cart));

    if (callback && typeof callback === 'function') {
      callback();
    }
  },

  getCartCount: () => {
    const counter = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")).products.length : 0;
    cartComponent.showCartCounter(counter);
  },

  getCartItems: () => {
    const products = JSON.parse(sessionStorage.getItem("cart")).products;
    cartComponent.renderCartElements(products);
  }
}
