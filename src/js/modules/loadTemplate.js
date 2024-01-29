import { getResourses } from "../services/services";

const loadTemplate = () => {
  /* Declaring Variables */
  const productDetailWrapper = document.getElementById('productdetails');

  let productId = new URLSearchParams(window.location.search).get('id');
  getResourses('http://localhost:3000/products')
  .then((data) => {
    let thisProductById = data.find((obj) => obj.id === productId);
    
    const {id, src, proname, price} = thisProductById;
    productDetailWrapper.querySelector('#mainImg').setAttribute('src', src);
    
    const imgGroup = document.createElement('div');
    imgGroup.classList.add('small-img-group');
    
    let group = new Array();
    while(group.length !== 4) {
      let randomIdx = Math.floor(Math.random() * data.length);
      if(group.includes(randomIdx) || (randomIdx + 1) === +id) {
        continue;
      } else {
        group.push(randomIdx);
        imgGroup.innerHTML += `
      <div class="small-img-col">
      <a href="/sproduct.html?id=${randomIdx + 1}"><img src=${data[randomIdx].src} width="100%" class="small-img" alt=""></a>
      </div>
    `;
    document.querySelector('.single-pro-image').append(imgGroup);
      }
    }
    
    const detail = document.createElement('div');
    detail.classList.add('single-pro-details');
    detail.innerHTML = `
    <h6>Home / T-Shirt</h6>
      <h4>${proname}</h4>
      <h2>$${price}</h2>
      <select>
        <option>Select Size</option>
        <option>XL</option>
        <option>XXL</option>
        <option>S</option>
        <option>L</option>
      </select>
      <input value="1" type="number">
      <button data-cart class="productdetails__btn normal">Add To Cart</button>
      <h4>Product Details</h4>
      <span>The Glidan Ultra Cotton T-shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshrunk jersey knit provides unmatched comfort with each wear. Featuring a taped neck and shoulder, and a seamless double-needle collar, and available in a range of colors, it offers it all in the ultimate head-turning package.</span>
    `;

    productDetailWrapper.appendChild(detail);

    const input = detail.querySelector('input');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '1');


    if(!thisProductById) {
      window.location.href = "/";
    }

  })
  .catch((e) => console.error(e));

};

export default loadTemplate;
