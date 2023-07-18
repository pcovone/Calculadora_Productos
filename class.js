export class Producto {
    constructor(id, nombre, precio, url, categoria) {
      this.id = id;
      this.nombre = nombre;
      this.url = url;
      this.precio = precio;
      this.categoria = categoria;
    }
  }
  
 export const arrayProductos = [
    new Producto(
      1,
      "Viola 16 pulgadas",
      650,
      "./recursos/viola-16pg.jpg",
      "instrumentos"
    ),
  
    new Producto(
      2,
      "Violin 4/4",
      500,
      "./recursos/violin-4cuartos.jpg",
      "instrumentos"
    ),
  
    new Producto(
      3,
      "RockJam Kit de piano de teclado con pantalla táctil",
      300,
      "./recursos/piano.jpg",
      "instrumentos"
    ),
  
    new Producto(
      4,
      "D Z Strad - Viola de 15,5 pulgadas hecha a mano",
      1500,
      "./recursos/viola-15.5.jpg",
      "instrumentos"
    ),
  
    new Producto(
      5,
      "Sabomenia Violin Dreamer D10 hecho a mano",
      299,
      "./recursos/sabomenia-violin.jpg",
      "instrumentos"
    ),
  
    new Producto(
      6,
      "Starument Piano de teclado eléctrico prémium",
      149,
      "./recursos/stratument-piano.jpg",
      "instrumentos"
    ),
  
    new Producto(
      7,
      "D'Addario Kaplan Premium Rosin",
      8,
      "./recursos/kaplan.jpg",
      "accesorios"
    ),
  
    new Producto(
      8,
      "Bernardel Original",
      12,
      "./recursos/bernardel.jpg",
      "accesorios"
    ),
  ];
