// class Producto {
//   constructor(id, nombre, precio, descripcion, categoria) {
//     this.id = id;
//     this.nombre = nombre;
//     this.descripcion = descripcion;
//     this.precio = precio;
//     this.categoria = categoria;
//   }
// }

// const arrayProductos = [
//   new Producto(
//     1,
//     "Viola 16 pulgadas",
//     "Accesorios de ébano, diapasón de ébano, abeto sólido tallado a mano y cuerpo de arce sólido, construcción ligera que significa mano de obra de calidad",
//     650,
//     "instrumentos"
//   ),

//   new Producto(
//     2,
//     "Violin 4/4",
//     "Violín de madera maciza: cuello de arce y tableros de arce, paneles de madera de abeto y ébano. Está cortado de una pieza completa de madera con timbre limpio y sonido estable",
//     500,
//     "instrumentos"
//   ),

//   new Producto(
//     3,

//     "RockJam Kit de piano de teclado con pantalla táctil",

//     "El kit de piano de teclado RockJam 761 incluye un teclado digital con 61 teclas de tamaño completo mientras mantiene un diseño portátil y compacto que puede ser alimentado por red eléctrica (fuente de alimentación incluida) o baterías",

//     300,

//     "instrumentos"
//   ),

//   new Producto(
//     4,

//     "D Z Strad - Viola de 15,5 pulgadas hecha a mano",
//     "Configurado por nuestros luthiers con un puente de arce roca y cuerdas Helicore.",

//     1500,

//     "instrumentos"
//   ),

//   new Producto(
//     5,

//     "Sabomenia Violin Dreamer D10 hecho a mano",
//     "Barniz para violín de alta calidad: el violín está totalmente hecho a mano, la capa de laca es transparente, el grano de madera es claramente visible y el sonido es transparente",

//     299,

//     "instrumentos"
//   ),

//   new Producto(
//     6,

//     "Starument Piano de teclado eléctrico prémium",
//     "Disfruta de las ricas melodías con el juego de teclado electrónico Starument con altavoces duales de gama completa de alta calidad",

//     149,

//     "instrumentos"
//   ),

//   new Producto(
//     7,
//     "D'Addario Kaplan Premium Rosin",
//     "La colofonia oscura Kaplan Premium está empaquetada en una atractiva funda, diseñada para un uso fácil con una sola mano.",
//     8,
//     "accesorios"
//   ),

//   new Producto(
//     8,

//     "Bernardel Original",
//     "Para violín, viola y violonchelo",

//     12,

//     "accesorios"
//   ),
// ];

// let carrito = [];

// let contenedor = document.querySelector("#contenedor");

// arrayProductos.forEach((el, index) => {
//   const section = document.createElement("section");
//   section.classList.add("card");
//   section.id = "producto" + (index + 1);

//   const article = `<article class="card__img"></article>
//   <article class="card__title">
//     ${el.nombre}
//     <div class="card__description">
//       <p>
//         ${el.precio}
//       </p>
//     </div>
//     <div class="card__price">$${el.descripcion}</div>
//     <div class="card__product-quantity">
//       <div class="input">
//         <img
//           class="input__minus"
//           src="./recursos/icon-minus.svg"
//           alt="minus"
//         />
//         <input class="input__number" type="number" value="0" />
//         <img
//           class="input__plus"
//           src="./recursos/icon-plus.svg"
//           alt="plus"
//         />
//       </div>
//     </div>
//         </article>`;
//   section.innerHTML = article;
//   const div = document.createElement("div");
//   const button = document.createElement("button");
//   div.classList.add("cart__button");
//   button.innerHTML = `
//     Añadir al carrito
//     <img src="./recursos/shopping-cart.png" alt="carrito" />`;
//   button.addEventListener("click", () => {
//     carrito.push(el);
//   });
//   section.appendChild(div);
//   contenedor.appendChild(section);
//   div.appendChild(button);
// });

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
