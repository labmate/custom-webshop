import {productComponent} from '../views/productComponent.js';

export const productService = {
  getProductById: productId => {
    $.get('https://www.googleapis.com/books/v1/volumes/'+ productId)
      .done( function(data) {
        const productData = prepareSingleProductData(data);
        productComponent.renderProduct(productData);
      })
      .fail( function() {
        productComponent.showError();
      });
  }
}

function prepareSingleProductData (data) {
  return {
    id: data.id,
    authors: data.volumeInfo.authors,
    title: data.volumeInfo.title,
    description: data.volumeInfo.description || 'No description provided',
    publisher: data.volumeInfo.publisher,
    publishedDate: data.volumeInfo.publishedDate,
    images: data.volumeInfo.imageLinks
 };
}
