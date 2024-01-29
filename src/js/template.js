import loadTemplate from "./modules/loadTemplate";
import loadProducts from "./modules/loadProducts";
import { addProductToCart } from "./modules/addProductToCart";
window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  loadProducts('.product-wrapper_arrivals');
  loadTemplate();
  addProductToCart();
  
});
