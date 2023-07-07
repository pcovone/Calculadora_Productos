//DOM, cambio de cantidad de artículos
let minusBtn = document.querySelector(".input__minus");
let plusBtn = document.querySelector(".input__plus");
let userInput = document.querySelector(".input__number");

let userInputNumber = 0;

plusBtn.addEventListener("click", () => {
  userInputNumber++;
  userInput.value = userInputNumber;
  console.log(userInputNumber);
});

minusBtn.addEventListener("click", () => {
  userInputNumber--;
  if (userInputNumber <= 0) {
    userInputNumber = 0;
  }
  userInput.value = userInputNumber;
  console.log(userInputNumber);
});

// Agregar el total de productos al carrito cuando se presiona el botón Añadir al carrito
const addToCartBtn = document.querySelector(".cart__button");
let cartNotification = document.querySelector(".header__cart--notification");
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener("click", () => {
  lastValue += userInputNumber;

  cartNotification.innerText = lastValue;
  cartNotification.style.display = "block";
  drawProductInModal();
  priceModal.innerHTML = `$4.99 x ${lastValue} <span>$${
    lastValue * 4.99
  }</span>`;

  localStorage.setItem("cartValue", lastValue.toString());
});

// Mostrar el modal con el detalle
const cartIconBtn = document.querySelector(".header__cart");
const cartModal = document.querySelector(".cart-modal");
const productContainer = document.querySelector(
  ".cart-modal__checkout-container"
);
let priceModal = document.querySelector(".cart-modal__price");

cartIconBtn.addEventListener("click", () => {
  cartModal.classList.toggle("show");
  if (lastValue === 0) {
    drawProductInModal();
  }
});

// Borrar contenido del carrito
function deleteProduct() {
  const deleteProductBtn = document.querySelector(".cart-modal__delete");

  deleteProductBtn.addEventListener("click", () => {
    productContainer.innerHTML =
      '<p class="cart-empty">Tu carrito está vacío</p>';
    lastValue = 0;
    cartNotification.innerText = lastValue;
    priceModal.innerHTML = "";
    // Eliminar el valor del carrito del almacenamiento local
    localStorage.removeItem("cartValue");
  });
}

// FUNCIONES
function drawProductInModal() {
  productContainer.innerHTML = `<div class="cart-modal__details-container">
    <img src="./recursos/piano.jpg" alt="piano" />
    <div>
      <p class="cart-modal__product">RockJam kit de piano...</p>
      <p class="cart-modal__price">$4.99 x ${lastValue} <span>$${
    lastValue * 4.99
  }</span></p>
    </div>
    <div class="cart-modal__delete-img">
      <img class="cart-modal__delete" src="./recursos/icon-delete.svg" alt="delete" />
    </div>
  </div>
  <button class="cart-modal__checkout">Checkout</button>
  `;
  deleteProduct();
  priceModal = document.querySelector(".cart-modal__price");
  priceModal.innerHTML = `$4.99 x ${lastValue} <span>$${
    lastValue * 4.99
  }</span>`;
}

// Obtener el valor del carrito almacenado en el localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const storedValue = localStorage.getItem("cartValue");
  if (storedValue) {
    lastValue = parseInt(storedValue);
    cartNotification.innerText = lastValue;
    cartNotification.style.display = lastValue > 0 ? "block" : "none";
    priceModal.innerHTML = `$4.99 x ${lastValue} <span>$${
      lastValue * 4.99
    }</span>`;
  }
});
