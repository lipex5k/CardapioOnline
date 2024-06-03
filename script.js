const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCount = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// Verifica se os elementos existem antes de adicionar os event listeners
if (cartBtn && cartModal && closeModalBtn) {
  // Abre modal do carrinho
  cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex";
    renderCartItems();
  });

  // Fecha modal do carrinho
  cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal || event.target === closeModalBtn) {
      cartModal.style.display = "none";
    }
  });
}

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.querySelector("i").getAttribute("data-name");
    const price = parseFloat(parentButton.querySelector("i").getAttribute("data-price"));
    addToCart(name, price);
  }
});

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
      <div class="flex justify-between items-center bg-slate-300 gap-1 px-4 py-2 rounded mt-3">
        <div>
          <span class="font-medium">${item.name}</span>
          <span>Qtd: ${item.quantity}</span><br>
          <span class="font-medium mt-2">R$ ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <div>
          <button class="remove-btn bg-red-600 rounded font-semibold text-white px-2 px-1" data-name="${item.name}">Remover</button>
        </div>
      </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  
    // Adiciona event listener para cada botão de remover
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-name');
        removeCartItem(itemName);
      });
    });
  }
  
  // Função para remover um item do carrinho ou reduzir a quantidade
  function removeCartItem(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
      } else {
        cart.splice(itemIndex, 1);
      }
      updateCart();
    }
  }


// Função para atualizar o total do carrinho
function updateCartTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  cartTotal.textContent = total.toFixed(2);
}

// Função para atualizar a contagem de itens do carrinho
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = count;
}

// Função para atualizar o carrinho
function updateCart() {
  renderCartItems();
  updateCartTotal();
  updateCartCount();
}

// Verifica o endereço e finaliza o pedido
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function() {
    if (addressInput.value.trim() === "") {
      addressWarn.classList.remove("hidden");
    } else {
      addressWarn.classList.add("hidden");
      alert("Pedido realizado com sucesso!");
      cart = [];
      updateCart();
      cartModal.style.display = "none";
    }
  });
}


document.addEventListener("DOMContentLoaded", function() {
    function checkRestOpen() {
        const date = new Date();
        const hora = date.getHours();
        return hora >= 18 && hora < 22;
    }

    function showPopup(message) {
        const popupModal = document.getElementById("popup-modal");
        const closeButton = document.getElementById("close-popup-btn");
        
        popupModal.querySelector('p').textContent = message;
        popupModal.classList.add("show");

        closeButton.addEventListener("click", function() {
            popupModal.classList.remove("show");
        });
    }

    const isOpen = checkRestOpen();
    const spanItem = document.getElementById("date-span");

    if (!isOpen) {
        showPopup("Restaurante Fechado no momento!!!");
    }

    if (spanItem) {
        if (isOpen) {
            spanItem.classList.remove("bg-red-500");
            spanItem.classList.add("bg-green-600");
        } else {
            spanItem.classList.remove("bg-green-600");
            spanItem.classList.add("bg-red-500");
        }
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function() {
            if (!isOpen) {
                showPopup("Restaurante Fechado no momento!!! Não é possível finalizar o pedido.");
                return;
            }

            if (addressInput.value.trim() === "") {
                addressWarn.classList.remove("hidden");
            } else {
                addressWarn.classList.add("hidden");
                alert("Pedido realizado com sucesso!");
                cart = [];
                updateCart();
                cartModal.style.display = "none";
            }
        });
    }
});
