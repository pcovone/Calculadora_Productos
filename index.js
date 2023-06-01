function calcularCostoTotal() {
    let cantidad = parseInt(prompt("Ingrese la cantidad de productos:"));
    let total = 0;

    for (let i = 0; i < cantidad; i++) {
        let precioProductos = parseFloat(prompt("Ingrese el precio unitario del producto " + (i + 1) + ":"));
        total += precioProductos;
    }

    alert("¡Genial! Tenemos tus productos listos en la cesta, por ser tu primera compra te ofrecemos descuentos");

    return total;
}

function aplicarDescuento(costoTotal) {
    let descuento = 0;

    let tipoDescuento = prompt("Ingrese el tipo de descuento (A/B/C):");

    switch (tipoDescuento) {
        case "A":
            descuento = costoTotal * 0.1; // 10% de descuento
            break;
        case "B":
            descuento = costoTotal * 0.2; // 20% de descuento
            break;
        case "C":
            descuento = costoTotal * 0.3; // 30% de descuento
            break;
        default:
            console.log("Tipo de descuento inválido.");
    }

    costoTotal = costoTotal - descuento;

    return costoTotal;
}

function mostrarResultado(resultado) {
    console.log("El costo total de los productos es: $" + resultado);
    alert("El costo total de los productos es: $" + resultado);
}

function calcularCostoTotalConDescuento() {
    let costoTotal = calcularCostoTotal();
    let costoTotalConDescuento = aplicarDescuento(costoTotal);
    mostrarResultado(costoTotalConDescuento);
}

calcularCostoTotalConDescuento();