/* Declaring Variables */
const cartListHTML = document.getElementById('cart'),
      cartCounter = document.getElementById('cart_num');

let cartList = new Array();

/* Functions With SessionStorage */
function saveProducts() {
  sessionStorage.setItem('CART', JSON.stringify(cartList));
}

function loadProducts() {
  let sessionProducts = JSON.parse(sessionStorage.getItem('CART'));
  if(sessionProducts) {
    cartList = sessionProducts;
    updateCartCounter();
  }
}

function updateCartCounter() {
  cartCounter.innerText = cartList.length;
}

/* Update TotalPrice Function*/
function updateTotalPrice() {
  const calculateTax = (subtotal) => {
    return 0.1 * subtotal;
    
  }

  const subtotalElement = document.querySelector('.total-price table tr:nth-child(1) td:nth-child(2)');
  const taxElement = document.querySelector('.total-price table tr:nth-child(2) td:nth-child(2)');
  const totalElement = document.querySelector('.total-price table tr:nth-child(3) td:nth-child(2)');
  
  if(cartList.length !== 0) {
    const subtotal = cartList.reduce((acc, item) => {
    return acc + (item.quantity * Number(item.price.replace(/[^\d.]/g, '')));
  }, 0);
  
  subtotalElement.innerText = `$${subtotal.toFixed(2)}`;

  const tax = calculateTax(subtotal);
  taxElement.innerText = `$${tax.toFixed(2)}`;

  const total = subtotal + tax;
  totalElement.innerText = `$${total.toFixed(2)}`;
  }

}

const addProductToCart = () => {

  window.addEventListener('click', (event) => {
    let buttonClick = event.target;
    // Проверяем что клик был совершен по кнопке "Добавить в корзину"
    if(buttonClick.hasAttribute('data-cart')) {
      event.preventDefault();
      // Находим карточку с товаром, внутри котрой был совершен клик
      const card = buttonClick.closest('.product__card');
      let productInfo = {};
      if(!card || buttonClick.closest('.single-pro-details')) {
        productInfo = {
          id: cartList.length + 1,
          imgSrc: document.querySelector('#mainImg').getAttribute('src'),
          proname: document.querySelector('.single-pro-details > h4').innerText,
          price: document.querySelector('.single-pro-details > h2').innerText,
          quantity: document.querySelector('.single-pro-details > input').value
        };
      } else {
        productInfo = {
          id: cartList.length + 1,
          imgSrc: card.querySelector('img').getAttribute('src'),
          proname: card.querySelector('h5').innerText,
          price: card.querySelector('.product__price').innerText,
          quantity: 1
        };
      }
      // Проверка имеется ли этот товар в корзине
      const itemInCart = cartList.some((obj) => obj.proname === productInfo.proname);
      
      if(itemInCart) {
        cartList
        .find((obj) => obj.proname === productInfo.proname)
        .quantity += 1;
        saveProducts();
      } else {
        cartList.push(productInfo);
        updateCartCounter();
        saveProducts();
      }
    }
  });

};

const loadProductCart = () => {
  cartListHTML.querySelector('table').innerHTML = `
  <tr>
    <th>Product</th>
    <th>Quantity</th>
    <th>Subtotal</th>
  </tr>
  `;

  if(cartList.length === 0) {
    cartListHTML.innerHTML = `
    <h3>The shopping cart is empty at the moment</h3>
    <a href="/shop.html">Buy Now</a>
    `;
    cartListHTML.setAttribute('style', 'text-align: center; font-size: 2rem; font-weight: 600');
  } else {
    cartList.forEach((item) => {
      let subtotal = Number(item.price.replace(/[^\d.]/g, '')) * item.quantity;
      const element = document.createElement('tr');
       element.innerHTML = `
       <td>
          <div class="cart-info">
            <img src=${item.imgSrc} alt="" />
            <div>
              <p>${item.proname}</p>
              <small>Price: ${item.price}</small>
              <br />
              <a data-remove href="#">Remove</a>
            </div>
          </div>
        </td>
        <td><input type="number" value=${item.quantity} /></td>
        <td>$${subtotal}</td>
       `;

      cartListHTML.querySelector('table').append(element);
      updateTotalPrice();
      const quantityInput = element.querySelector('input');

      quantityInput.setAttribute('type', 'number');
      quantityInput.setAttribute('value', Math.max(1, item.quantity));
      quantityInput.setAttribute('min', '1'); 

      quantityInput.addEventListener('input', () => {
        let newQuantity = parseInt(quantityInput.value, 10);
        newQuantity = Math.max(1, newQuantity);
        item.quantity = newQuantity;
        const price = Number(item.price.replace(/[^\d.]/g, ''));
        const newSubtotal = price * newQuantity;
        element.querySelector('td:nth-child(3)').innerText = `$${newSubtotal.toFixed(2)}`;
        saveProducts();
        updateTotalPrice();
      });

      const removeBtn = element.querySelector('[data-remove]');
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = cartList.findIndex((product) => product.id === item.id);
        cartList.splice(idx, 1);
        saveProducts();
        updateCartCounter();
        loadProductCart();
        updateTotalPrice();
      });
    });
  }
}


/* INIT */
loadProducts();
export {addProductToCart, loadProductCart, loadProducts};
