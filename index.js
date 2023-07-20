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
  if (container) {
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
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #4b33a8, #785ce9)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();
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
  if (productContainer) {
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
}

function eliminarProducto(event) {
  const index = event.currentTarget.dataset.index;
  cartProducts.splice(index, 1);
  actualizarCarrito();
  updateCartNotification();
  guardarProductosEnLocalStorage();
}

function vaciarCarrito() {
  actualizarCarrito();
  updateCartNotification();
  guardarProductosEnLocalStorage();
  // cartProducts = [];
}

function updateCartNotification() {
  if (cartNotification) {
    cartNotification.textContent = cartProducts
      .reduce((total, product) => total + product.cantidad, 0)
      .toString();
  }
}

function mostrarModal() {
  cartModal.classList.add("show");
}

function cerrarModal() {
  cartModal.classList.remove("show");
}

if (buyButton) {
  buyButton.addEventListener("click", () => {
    vaciarCarrito();
    guardarProductosEnLocalStorage();
    window.location.href = "formulario.html";
  });
}

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

function mostrarProductosFormulario() {
  const storedCartProducts = localStorage.getItem("cartProducts");
  // const storedTotal = localStorage.getItem("cartTotal");

  if (storedCartProducts) {
    const cartProducts = JSON.parse(storedCartProducts);
    // const total = parseFloat(storedTotal);

    // Mostramos los productos seleccionados y el total en el formulario
    mostrarProductosSeleccionados(cartProducts);
    // mostrarTotal(total);
  }
}

function mostrarProductosSeleccionados(cartProducts) {
  if (selectedProductsContainer) {
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
}

// function mostrarTotal(total) {
//   totalContainer.innerHTML = `<p>Total a pagar: $${total.toFixed(2)}</p>`;
// }

// Llamamos a la función para cargar los productos y el total al cargar la página
mostrarProductosFormulario();
