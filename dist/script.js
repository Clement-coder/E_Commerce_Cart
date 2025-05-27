const productList = document.getElementById('product-list');
const cartContainer = document.getElementById('cart-items');
const clearCartBtn = document.getElementById('clear-cart');
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

function removeItem(index) {
  cartItems.splice(index, 1);
  saveCartToLocalStorage();
  updateCartUI();
}

function clearCart() {
  cartItems = [];
  saveCartToLocalStorage();
  updateCartUI();
}



function updateCartUI() {
  cartContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p class="text-gray-500 col-span-full">No items in cart brooo </p>';
    return;
  }

  cartItems.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'p-4 rounded-xl bg-white bg-red border shadow-md flex flex-col items-center text-center';

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-[100px] h-[100px] object-contain mb-2" />
      <h3 class="text-sm font-semibold mb-1">${item.title}</h3>
      <p class="text-[#36b4ee] font-bold mb-1">$${item.price.toFixed(2)}</p>
       <button class="py-2 px-3 border border-black rounded-full relative overflow-hidden group hover:text-white">
          <span class="relative z-10">Remove from cart</span>
          <span class="absolute left-0 bottom-0 h-full w-0 bg-red-600 transition-all duration-500 group-hover:w-full z-0"></span>
        </button>
    `;

    const removeBtn = cartItem.querySelector('button');
    removeBtn.addEventListener('click', () => removeItem(index));

    cartContainer.appendChild(cartItem);
  });
}

fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      const item = document.createElement('div');
      item.className = 'border p-4 rounded-xl shadow-lg bg-white flex flex-col';

      item.innerHTML = `
      <svg
      id="liked"
      class=""
        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="url(#bluePinkGradient)">
      <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
      </svg>
        <img src="${product.image}" alt="${product.title}" class="w-full h-[200px] object-contain mb-4">
        <h2 class="text-lg font-semibold mb-2">${product.title}</h2>
        <p class="text-[#36b4ee] font-bold text-xl mb-4">$${product.price.toFixed(2)}</p>
      <div class="flex items-center gap-3 mb-4">
  <svg width="0" height="0">
    <defs>
      <linearGradient id="bluePinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#36b4ee" />
        <stop offset="100%" stop-color="#e82993" />
      </linearGradient>
    </defs>
  </svg>

  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path fill="url(#bluePinkGradient)" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
  </svg>

  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path fill="url(#bluePinkGradient)" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
  </svg>

  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path fill="url(#bluePinkGradient)" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
  </svg>

  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path fill="url(#bluePinkGradient)" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
  </svg>

  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path fill="url(#bluePinkGradient)" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
  </svg>
</div>

        
        <button class="py-2 px-3 border border-black rounded-full relative overflow-hidden group hover:text-white">
          <span class="relative z-10">Add to cart</span>
          <span class="absolute left-0 bottom-0 w-full h-0 bg-gradient-to-r from-[#e82993] to-[#36b4ee] transition-all duration-500 group-hover:h-full z-0"></span>
        </button>
      `;
      

      const btn = item.querySelector('button');
      btn.addEventListener('click', () => {
        cartItems.push(product);
        saveCartToLocalStorage();
        updateCartUI();
      });

      productList.appendChild(item);
    });
    
  })
  
  .catch((err) => {
    console.error('Error fetching products:', err);
    productList.innerHTML = `<p class="text-red-500">Failed to load products</p>`;
  });



clearCartBtn.addEventListener('click', clearCart);

updateCartUI();
