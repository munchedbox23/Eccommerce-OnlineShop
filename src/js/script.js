import sidebar from "./modules/sidebar";
import newsForm from "./modules/newsForm";
import { loadProducts } from "./modules/addProductToCart";
window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  sidebar('#bar', '.nav');
  newsForm();
  loadProducts();
});
