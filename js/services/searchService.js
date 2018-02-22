import {setupSearch} from '../views/searchComponent.js';

export const searchService = {
  getProductsByName:  productName => {
    $.get('https://www.googleapis.com/books/v1/volumes?q='+ productName +'&maxResults=40&key=AIzaSyAZFhgpwvF7kDUBvIi8sGNUT0O5SIXIk0I')
      .done( function(data) {
        const products = prepareProductData(data);
        setupSearch.renderResults(products);
      })
      .fail(function() {
        setupSearch.showError();
      });
  }
}

function prepareProductData (data) {
  return data.items.map( product => {
    return {
      id: product.id,
      title: product.volumeInfo.title,
      description: product.volumeInfo.description || '',
      authors: product.volumeInfo.authors || [],
      images: product.volumeInfo.imageLinks || []
    }
  });
}
