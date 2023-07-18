import { arrayProductos } from "./class.js";

const container = document.getElementById("contenedor");
const categoriesBtn = document.querySelectorAll(".button-categorie");
const principalTitle = document.querySelector("#principal__title");
const cartNotification = document.querySelector(".header__cart--notification");
const cartModal = document.querySelector(".cart-modal");
const productContainer = document.querySelector(
  ".cart-modal__checkout-container"
);
const buyButton = document.querySelector("#btnComprar");
const emptyCartMessage = document.querySelector("#emptyCartMessage");
const totalPriceContainer = document.querySelector("#totalPriceContainer");

const selectedProductsContainer = document.querySelector(".product-list");
const totalContainer = document.getElementById("totalPriceContainer");
const purchaseForm = document.getElementById("checkoutForm");
let cartProducts = [];

function uploadProducts(productosElegidos) {
  container.innerHTML = "";
  productosElegidos.forEach((el) => {
    const section = document.createElement("section");
    const article = `<article class="card">
      <img class="product-img" src="${el.url}" alt="piano" />
      <div class="card__description">
        <h3 class="card__title">
          ${el.nombre}
        </h3>
        <p class="card__price">$${el.precio}</p>
        <div class="cart__button">
          <button class="add-product" id="${el.id}">
            Añadir al carrito
            <img src="./recursos/shopping-cart.png" alt="carrito" />
          </button>
        </div>
      </div>
    </article>`;
    section.innerHTML = article;
    container.appendChild(section);
  });

  const addToCartBtn = document.querySelectorAll(".add-product");
  addToCartBtn.forEach((button) => {
    button.addEventListener("click", agregarAlCarrito);
  });
}

uploadProducts(arrayProductos);

categoriesBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    categoriesBtn.forEach((button) => button.classList.remove("active"));

    e.currentTarget.classList.add("active");

    let productsBtn;
    if (e.currentTarget.id === "allProducts") {
      productsBtn = arrayProductos;
      principalTitle.innerText = "Todos los productos";
    } else {
      productsBtn = arrayProductos.filter(
        (el) => el.categoria === e.currentTarget.id
      );
      const category = productsBtn.length > 0 ? productsBtn[0].categoria : "";
      principalTitle.innerText = category;
    }

    uploadProducts(productsBtn);
  });
});

function agregarAlCarrito(event) {
  const idButton = event.currentTarget.id;
  const addedProduct = arrayProductos.find(
    (el) => el.id === parseInt(idButton)
  );
  const existingProduct = cartProducts.find(
    (product) => product.id === addedProduct.id
  );

  if (existingProduct) {
    existingProduct.cantidad++;
  } else {
    cartProducts.push({ ...addedProduct, cantidad: 1 });
  }

  actualizarCarrito();
  updateCartNotification();
  guardarProductosEnLocalStorage();
  mostrarModal();
}

function actualizarCarrito() {
  productContainer.innerHTML = ""; // Limpiar el contenido del carrito

  if (cartProducts.length === 0) {
    // Si el carrito está vacío
    emptyCartMessage.style.display = "block"; // Mostrar el mensaje
    cartModal.classList.remove("show"); // Ocultar el modal del carrito
  } else {
    // Si el carrito tiene productos
    emptyCartMessage.style.display = "none"; // Ocultar el mensaje
    let totalPrice = 0;

    cartProducts.forEach((product, index) => {
      // Agregar cada producto al carrito
      const productElement = document.createElement("div");
      productElement.classList.add("cart-modal__details-container");
      productElement.innerHTML = `
        <img src="${product.url}" alt="${product.nombre}" />
        <div>
          <p class="cart-modal__product">${product.nombre}</p>
          <p class="cart-modal__price">$${product.precio} x ${
        product.cantidad
      } <span>$${product.precio * product.cantidad}</span></p>
        </div>
        <div class="cart-modal__delete-img">
          <img class="cart-modal__delete" src="./recursos/icon-delete.svg" alt="delete" data-index="${index}" />
        </div>
      `;
      productContainer.appendChild(productElement);

      totalPrice += product.precio * product.cantidad;
    });

    totalPriceContainer.innerText = `Total: $${totalPrice}`;

    cartModal.classList.add("show"); // Mostrar el modal del carrito
  }

  actualizarNotificacionCarrito(); // Actualizar la notificación del carrito

  const deleteButtons = document.querySelectorAll(".cart-modal__delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", eliminarProducto);
  });
}

function eliminarProducto(event) {
  const index = event.currentTarget.dataset.index;
  cartProducts.splice(index, 1);
  actualizarCarrito();
  updateCartNotification();
  guardarProductosEnLocalStorage();
}

function vaciarCarrito() {
  cartProducts = [];
  actualizarCarrito();
  updateCartNotification();
  guardarProductosEnLocalStorage();
}

function updateCartNotification() {
  cartNotification.textContent = cartProducts
    .reduce((total, product) => total + product.cantidad, 0)
    .toString();
}

function mostrarModal() {
  cartModal.classList.add("show");
}

function cerrarModal() {
  cartModal.classList.remove("show");
}

buyButton.addEventListener("click", () => {
  vaciarCarrito();
  guardarProductosEnLocalStorage();
  window.location.href = "formulario.html";
});

function guardarProductosEnLocalStorage() {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

function cargarProductosDesdeLocalStorage() {
  const storedCartProducts = localStorage.getItem("cartProducts");
  if (storedCartProducts) {
    cartProducts = JSON.parse(storedCartProducts);
    actualizarCarrito();
    updateCartNotification();
  }
}

function actualizarNotificacionCarrito() {
  cartNotification.textContent = cartProducts
    .reduce((total, product) => total + product.cantidad, 0)
    .toString();
}

cargarProductosDesdeLocalStorage();

// Obtenemos los elementos del DOM que vamos a manipular

// Función para cargar los productos desde el LocalStorage y mostrarlos en el formulario
function mostrarProductosFormulario() {
  const storedCartProducts = localStorage.getItem("cartProducts");
  const storedTotal = localStorage.getItem("cartTotal");

  if (storedCartProducts && storedTotal) {
    const cartProducts = JSON.parse(storedCartProducts);
    const total = parseFloat(storedTotal);

    // Mostramos los productos seleccionados y el total en el formulario
    mostrarProductosSeleccionados(cartProducts);
    mostrarTotal(total);
  }
}

// Función para mostrar los productos seleccionados en el formulario
function mostrarProductosSeleccionados(cartProducts) {
  selectedProductsContainer.innerHTML = "";

  cartProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("selected-product");
    productElement.innerHTML = `
      <img src="${product.url}" alt="${product.nombre}">
      <p>${product.nombre} x ${product.cantidad}</p>
      <p>Precio unitario: $${product.precio}</p>
      <p>Total: $${product.precio * product.cantidad}</p>
    `;
    selectedProductsContainer.appendChild(productElement);
  });
}

// Función para mostrar el total en el formulario
function mostrarTotal(total) {
  totalContainer.innerHTML = `<p>Total a pagar: $${total.toFixed(2)}</p>`;
}

// Llamamos a la función para cargar los productos y el total al cargar la página
mostrarProductosFormulario();

// Escuchamos el evento submit del formulario
purchaseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Aquí puedes agregar el código para enviar la información del formulario a donde corresponda
  // Por ejemplo, podrías enviarla a un servidor para procesar el pago y guardar los datos del cliente.
  // Luego, podrías redirigir al usuario a una página de confirmación de compra o agradecimiento.

  // Una vez procesado el pago y enviado la información, podrías limpiar el LocalStorage si ya no es necesario tener los datos almacenados:
  // localStorage.removeItem("cartProducts");
  // localStorage.removeItem("cartTotal");
});
// Aquí puedes agregar el código para enviar la información del formulario a donde corresponda
// Por ejemplo, podrías enviarla a un servidor para procesar el pago y guardar los datos del cliente.
// Luego, podrías redirigir al usuario a una página de confirmación de compra o agradecimiento.

// Una vez procesado el pago y enviado la información, podrías limpiar el LocalStorage si ya no es necesario tener los datos almacenados:
// localStorage.removeItem("cartProducts");
// localStorage.removeItem("cartTotal");
// });

// import { Producto, arrayProductos } from "./class.js";

// const container = document.querySelector("#contenedor");
// const categoriesBtn = document.querySelectorAll(".button-categorie");
// const principalTitle = document.querySelector("#principal__title");
// const cartNotification = document.querySelector(".header__cart--notification");
// const cartModal = document.querySelector(".cart-modal");
// const productContainer = document.querySelector(
//   ".cart-modal__checkout-container"
// );
// const buyButton = document.querySelector("#btnComprar");

// let cartProducts = [];

// function uploadProducts(productosElegidos) {
//   container.innerHTML = "";
//   productosElegidos.forEach((el) => {
//     const section = document.createElement("section");
//     const article = `<article class="card">
//       <img class="product-img" src="${el.url}" alt="piano" />
//       <div class="card__description">
//         <h3 class="card__title">
//           ${el.nombre}
//         </h3>
//         <p class="card__price">$${el.precio}</p>
//         <div class="cart__button">
//           <button class="add-product" id="${el.id}">
//             Añadir al carrito
//             <img src="./recursos/shopping-cart.png" alt="carrito" />
//           </button>
//         </div>
//       </div>
//     </article>`;
//     section.innerHTML = article;
//     container.appendChild(section);
//   });

//   const addToCartBtn = document.querySelectorAll(".add-product");
//   addToCartBtn.forEach((button) => {
//     button.addEventListener("click", agregarAlCarrito);
//   });
// }

// uploadProducts(arrayProductos);

// categoriesBtn.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     categoriesBtn.forEach((button) => button.classList.remove("active"));

//     e.currentTarget.classList.add("active");

//     let productsBtn;
//     if (e.currentTarget.id === "allProducts") {
//       productsBtn = arrayProductos;
//       principalTitle.innerText = "Todos los productos";
//     } else {
//       productsBtn = arrayProductos.filter(
//         (el) => el.categoria === e.currentTarget.id
//       );
//       const category = productsBtn.length > 0 ? productsBtn[0].categoria : "";
//       principalTitle.innerText = category;
//     }

//     uploadProducts(productsBtn);
//   });
// });

// function agregarAlCarrito(event) {
//   const idButton = event.currentTarget.id;
//   const addedProduct = arrayProductos.find(
//     (el) => el.id === parseInt(idButton)
//   );
//   const existingProduct = cartProducts.find(
//     (product) => product.id === addedProduct.id
//   );

//   if (existingProduct) {
//     existingProduct.cantidad++;
//   } else {
//     cartProducts.push({ ...addedProduct, cantidad: 1 });
//   }

//   actualizarCarrito();
//   updateCartNotification();
//   mostrarModal();
// }

// function actualizarCarrito() {
//   productContainer.innerHTML = "";

//   cartProducts.forEach((product) => {
//     const productElement = document.createElement("div");
//     productElement.classList.add("cart-modal__details-container");
//     productElement.innerHTML = `
//       <img src="${product.url}" alt="${product.nombre}" />
//       <div>
//         <p class="cart-modal__product">${product.nombre}</p>
//         <p class="cart-modal__price">$${product.precio} x ${
//       product.cantidad
//     } <span>$${product.precio * product.cantidad}</span></p>
//       </div>
//       <div class="cart-modal__delete-img">
//         <img class="cart-modal__delete" src="./recursos/icon-delete.svg" alt="delete" />
//       </div>
//     `;

//     productContainer.appendChild(productElement);
//   });

//   const deleteButtons = document.querySelectorAll(".cart-modal__delete");
//   deleteButtons.forEach((button, index) => {
//     button.addEventListener("click", () => eliminarProducto(index));
//   });

//   buyButton.addEventListener("click", vaciarCarrito);
// }

// function eliminarProducto(index) {
//   cartProducts.splice(index, 1);
//   actualizarCarrito();
//   updateCartNotification();
// }

// function vaciarCarrito() {
//   cartProducts = [];
//   actualizarCarrito();
//   updateCartNotification();
// }

// function updateCartNotification() {
//   cartNotification.textContent = cartProducts
//     .reduce((total, product) => total + product.cantidad, 0)
//     .toString();
// }

// function mostrarModal() {
//   cartModal.classList.add("show");
// }

// function cerrarModal() {
//   cartModal.classList.remove("show");
// }

// buyButton.addEventListener("click", vaciarCarrito);

// let carrito = [];
// let minusBtn = document.querySelector(".input__minus");
// let plusBtn = document.querySelector(".input__plus");
// let userInput = document.querySelector(".input__number");
// let contenedor = document.querySelector("#contenedor");

// let userInputNumber = 0;

// arrayProductos.forEach((el, index) => {
//   const section = document.createElement("section");
//   section.classList.add("card");
//   section.id = "producto" + (index + 1);

//   const article = `<article class="card__img"></article>
//   <article class="card__title">
//     ${el.nombre}
//     <div class="card__description">
//       <p>
//         ${el.descripcion}
//       </p>
//     </div>
//     <div class="card__price">$${el.precio}</div>
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

// plusBtn.addEventListener("click", () => {
//   userInputNumber++;
//   userInput.value = userInputNumber;
//   console.log(userInputNumber);
// });

// minusBtn.addEventListener("click", () => {
//   userInputNumber--;
//   if (userInputNumber <= 0) {
//     userInputNumber = 0;
//   }
//   userInput.value = userInputNumber;
//   console.log(userInputNumber);
// });

// // Agregar el total de productos al carrito cuando se presiona el botón Añadir al carrito
// const addToCartBtn = document.querySelector(".cart__button");
// let cartNotification = document.querySelector(".header__cart--notification");
// let lastValue = parseInt(cartNotification.innerText);

// addToCartBtn.addEventListener("click", () => {
//   lastValue += userInputNumber;

//   cartNotification.innerText = lastValue;
//   cartNotification.style.display = "block";
//   drawProductInModal();
//   priceModal.innerHTML = `${el.precio} x ${lastValue} <span>$${
//     lastValue * el.precio
//   }</span>`;

//   localStorage.setItem("cartValue", lastValue.toString());
// });

// // Mostrar el modal con el detalle
// const cartIconBtn = document.querySelector(".header__cart");
// const cartModal = document.querySelector(".cart-modal");
// const productContainer = document.querySelector(
//   ".cart-modal__checkout-container"
// );
// let priceModal = document.querySelector(".cart-modal__price");

// cartIconBtn.addEventListener("click", () => {
//   cartModal.classList.toggle("show");
//   if (lastValue === 0) {
//     drawProductInModal();
//   }
// });

// // Borrar contenido del carrito
// function deleteProduct() {
//   const deleteProductBtn = document.querySelector(".cart-modal__delete");

//   deleteProductBtn.addEventListener("click", () => {
//     productContainer.innerHTML =
//       '<p class="cart-empty">Tu carrito está vacío</p>';
//     lastValue = 0;
//     cartNotification.innerText = lastValue;
//     priceModal.innerHTML = "";
//     // Eliminar el valor del carrito del almacenamiento local
//     localStorage.removeItem("cartValue");
//   });
// }

// // FUNCIONES
// function drawProductInModal() {
//   productContainer.innerHTML = `<div class="cart-modal__details-container">
//     <img src="./recursos/piano.jpg" alt="piano" />
//     <div>
//       <p class="cart-modal__product">${el.nombre}</p>
//       <p class="cart-modal__price">${el.precio} x ${lastValue} <span>$${
//     lastValue * el.precio
//   }</span></p>
//     </div>
//     <div class="cart-modal__delete-img">
//       <img class="cart-modal__delete" src="./recursos/icon-delete.svg" alt="delete" />
//     </div>
//   </div>
//   <button class="cart-modal__checkout">Checkout</button>
//   `;
//   deleteProduct();
//   priceModal = document.querySelector(".cart-modal__price");
//   priceModal.innerHTML = `${el.precio} x ${lastValue} <span>$${
//     lastValue * el.precio
//   }</span>`;
// }

// // Obtener el valor del carrito almacenado en el localStorage al cargar la página
// document.addEventListener("DOMContentLoaded", () => {
//   const storedValue = localStorage.getItem("cartValue");
//   if (storedValue) {
//     lastValue = parseInt(storedValue);
//     cartNotification.innerText = lastValue;
//     cartNotification.style.display = lastValue > 0 ? "block" : "none";
//     priceModal.innerHTML = `${el.precio} x ${lastValue} <span>$${
//       lastValue * el.precio
//     }</span>`;
//   }
// });
