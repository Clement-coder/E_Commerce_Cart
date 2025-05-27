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
    cartContainer.innerHTML = '<p class="text-gray-500 col-span-full">No items in cart yet </p>';
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
          <span class="relative z-10">Add to cart</span>
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
        <img src="${product.image}" alt="${product.title}" class="w-full h-[200px] object-contain mb-4">
        <h2 class="text-lg font-semibold mb-2">${product.title}</h2>
        <p class="text-[#36b4ee] font-bold text-xl mb-4">$${product.price.toFixed(2)}</p>
        <button class="py-2 px-3 border border-black rounded-full relative overflow-hidden group hover:text-white">
          <span class="relative z-10">Add to cart</span>
          <span class="absolute left-0 bottom-0 h-full w-0 bg-gradient-to-r from-[#e82993] to-[#36b4ee] transition-all duration-500 group-hover:w-full z-0"></span>
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
