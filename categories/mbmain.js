document.addEventListener('DOMContentLoaded', () => {
   const cartIcon = document.querySelector('#cart-icon');
   const cart = document.querySelector('.cart');
   const closeCart = document.querySelector('#close-cart');
 
   cartIcon.addEventListener('click', () => {
     cart.classList.add('active');
   });
 
   closeCart.addEventListener('click', () => {
     cart.classList.remove('active');
   });
 
   const addCartButtons = document.querySelectorAll('#add-mobile');
   addCartButtons.forEach(button => {
     button.addEventListener('click', addToCart);
   });

   const cartContent = document.querySelector('.cart-content');
   cartContent.addEventListener('click', (event) => {
     if (event.target.classList.contains('cart-remove')) {
       removeCartItem(event);
     }
   });
 
   cartContent.addEventListener('change', (event) => {
     if (event.target.classList.contains('cart-quantity')) {
       updateTotal();
     }
   });
 
   function addToCart(event) {
     const button = event.target;
     const mobileBox = button.parentElement;
     const title = mobileBox.querySelector('.mobile-title').innerText;
     const price = mobileBox.querySelector('.mobile-price').innerText;
     const productImg = mobileBox.querySelector('.mobiles-img').src;
 
     addItemToCart(title, price, productImg);
     updateTotal();
   }
 
   function addItemToCart(title, price, productImg) {
     const cartContent = document.querySelector('.cart-content');
     const cartItems = cartContent.querySelectorAll('.cart-box');
 
     for (let item of cartItems) {
       const itemTitle = item.querySelector('.cart-product-title').innerText;
       if (itemTitle === title) {
         alert('This item is already in the cart');
         return;
       }
     }
 
     const cartBox = document.createElement('div');
     cartBox.classList.add('cart-box');
 
     cartBox.innerHTML = `
       <img src="${productImg}" alt="" class="cart-img">
       <div class="detail-box">
         <div class="cart-product-title">${title}</div>
         <div class="cart-price">${price}</div>
         <input type="number" value="1" class="cart-quantity">
       </div>
       <span class="material-symbols-outlined cart-remove" id="cart-remove">delete</span>
     `;
     cartContent.append(cartBox);
   }
 
   function removeCartItem(event) {
     const buttonClicked = event.target;
     buttonClicked.parentElement.remove();
     updateTotal();
   }
 
   function updateTotal() {
     const cartContent = document.querySelector('.cart-content');
     const cartBoxes = cartContent.querySelectorAll('.cart-box');
     let total = 0;
 
     cartBoxes.forEach(cartBox => {
       const priceElement = cartBox.querySelector('.cart-price');
       const quantityElement = cartBox.querySelector('.cart-quantity');
       const price = parseFloat(priceElement.innerText.replace('OMR', ''));
       const quantity = quantityElement.value;
       total += price * quantity;
     });
 
     total = Math.round(total * 100) / 100;
     document.querySelector('.total-price').innerText = 'OMR ' + total;
   }
 

   updateTotal();
 });