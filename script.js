let carrito = [];

const botones = document.querySelectorAll(".producto button");
const listaCarrito = document.getElementById("carrito-lista");
const totalElemento = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar-carrito");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const producto = boton.parentElement;
        const nombre = producto.querySelector("h3").textContent;
        const precioTexto = producto.querySelector(".precio").textContent;
        const precio = parseFloat(precioTexto.replace("$", ""));

        const productoExistente = carrito.find(
            (item) => item.nombre === nombre
        );

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        actualizarCarrito();
    });
});

function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const elemento = document.createElement("p");

        elemento.textContent =
            `${producto.nombre} × ${producto.cantidad} — $${subtotal.toFixed(2)}`;

        listaCarrito.appendChild(elemento);
    });

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
    }

    totalElemento.textContent = total.toFixed(2);
}

botonVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});