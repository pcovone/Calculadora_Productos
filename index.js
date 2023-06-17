let cestaProductos = [];
let arrayProductos = [];
const salir = 3;

class Producto {
  constructor(id, nombre, precio, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
  }
}

function crearProducto(id, nombre, precio, categoria) {
  const producto = new Producto(id, nombre, precio, categoria);
  arrayProductos.push(producto);
}

// Productos a vender
crearProducto(1, "Viola 16 pulgadas", 650, "instrumentos");
crearProducto(2, "Violin 4/4", 500, "instrumentos");
crearProducto(
  3,
  "RockJam Kit de piano de teclado con pantalla táctil",
  300,
  "instrumentos"
);
crearProducto(
  4,
  "D Z Strad - Viola de 15,5 pulgadas hecha a mano",
  1500,
  "instrumentos"
);
crearProducto(
  5,
  "Sabomenia Violin Dreamer D10 hecho a mano",
  299,
  "instrumentos"
);
crearProducto(
  6,
  "Starument Piano de teclado eléctrico prémium",
  149,
  "instrumentos"
);
crearProducto(7, "D'Addario Kaplan Premium Rosin", 8, "accesorios");
crearProducto(
  8,
  "Bernardel Original – Colofonia para violín y viola",
  12,
  "accesorios"
);

const mostrarPorCategoria = (categoria) => {
  const filtrado = arrayProductos.filter((el) => el.categoria === categoria);
  let mensajeAMostrar = "";
  filtrado.forEach((el) => {
    mensajeAMostrar += `ID: ${el.id} \nProducto: ${el.nombre} \nPrecio: ${el.precio} \n`;
  });
  const id = parseInt(
    prompt(
      mensajeAMostrar +
        "\n" +
        "Ingrese el ID del producto para agregar al carrito"
    )
  );
  const productoEncontrado = arrayProductos.find((el) => el.id === id);
  cestaProductos.push(productoEncontrado);
};

const verProducto = () => {
  let option;
  option = parseInt(
    prompt(
      "Elige la categoría que quieres ver: \n 1) Instrumentos \n 2) Accesorios \n 3) Ninguna"
    )
  );
  while (option !== salir) {
    switch (option) {
      case 1:
        mostrarPorCategoria("instrumentos");
        break;
      case 2:
        mostrarPorCategoria("accesorios");
        break;

      default:
        alert("Has ingresado una opción inválida.");
    }
    option = parseInt(
      prompt(
        "Elige la categoría que quieres ver: \n 1) Instrumentos \n 2) Accesorios \n 3) Ninguna"
      )
    );
  }
};

const verCarrito = () => {
  let mensajeAMostrar = "Lista de productos: \n";
  cestaProductos.forEach((el) => {
    mensajeAMostrar += `ID: ${el.id} \nProducto: ${el.nombre} \nPrecio: ${el.precio} \n`;
  });
  const total = cestaProductos.reduce(
    (acumulador, elemento) => acumulador + elemento.precio,
    0
  );
  mensajeAMostrar += "El total de los productos añadidos es: " + total;
  alert(mensajeAMostrar);
};

let opcion = parseInt(
  prompt(
    "Elige la operación que deseas: \n 1) Ver Productos \n 2) Ver Carrito \n 3) Ninguna, salir"
  )
);

while (opcion !== salir) {
  switch (opcion) {
    case 1:
      verProducto();
      break;
    case 2:
      verCarrito();
      break;
    default:
      alert("Has ingresado una opción inválida.");
      break;
  }

  opcion = parseInt(
    prompt(
      "Elige la operación que deseas: \n 1) Ver Productos \n 2) Ver Carrito \n 3) Ninguna, salir"
    )
  );
}

alert("¡Gracias! ¡Vuelve pronto!");
