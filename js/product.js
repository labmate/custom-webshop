import {utils} from './utils/utils.js';
import {productComponent} from './views/productComponent.js';
import {cartService} from './services/cartService.js';
import {cartComponent} from './views/cartComponent.js';

const productId = utils.getQueryParameters('productId');
cartComponent.getCartCount();
productComponent.initProduct(productId);
