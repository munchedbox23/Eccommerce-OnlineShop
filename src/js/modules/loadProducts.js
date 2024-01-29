import { getResourses } from "../services/services";

const loadProducts = (wrapperSelector) => {
   class Products {
    constructor( src, brand, proname, stars, price, id, ...classes) {
      this.src = src;
      this.brand = brand;
      this.proname = proname;
      this.stars = stars;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(wrapperSelector);
      this.id = id;
    }

    render() {
      const element = document.createElement('div');
      if(this.classes.length === 0) {
        element.classList.add('product__card');
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      
      element.innerHTML = `
        <a href="/sproduct.html?id=${this.id}"><img src=${this.src} alt=""></a>
        <div class="product__descr">
          <span>${this.brand}</span>
          <h5>${this.proname}</h5>
          <div class="product__star"></div>
          <h4 class="product__price">$${this.price}</h4>
        </div>
        <a href="#"><i data-cart class="fal fa-shopping-cart cart"></i></a>
      `;
      for(let i = 0; i < this.stars; ++i) {
        element.querySelector('.product__star').innerHTML += '<i class="fas fa-star"></i>';
      }
      this.parent.append(element);
    }
  }

  function addProductsToWrapper(start, end) {
    getResourses('http://localhost:3000/products')
    .then((data) => {
     let newData = data.slice(start, end);
     newData.forEach(({src, brand, proname, stars, price, id}) => {
      new Products(src, brand, proname, stars, price, id).render();
     });
    })
    .catch((e) => console.error(e));
  }
  switch(wrapperSelector) {
    case '.product-wrapper_featured':
      addProductsToWrapper(0, 8);
      break;
    case '.product-wrapper_arrivals':
      addProductsToWrapper(8, 16);
      break;
    case '.product-wrapper_full':
      addProductsToWrapper(0, 16);
      break;
    default:
      addProductsToWrapper(0, 8);
      break;
  }
};

export default loadProducts;
