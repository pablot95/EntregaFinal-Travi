let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


const renderProductos = (arrayProductos) => {
    let container = document.getElementById("containerPrincipal");
    container.innerHTML = "";

    arrayProductos.forEach((producto) => {

    let productCard = document.createElement("div")

    productCard.className = "productCard"

    productCard.innerHTML = `<img src="${producto.image}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>${producto.description}</p>
        <p>Precio: $${producto.precio}</p>
        <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
    `;

    container.appendChild(productCard);
    })
};

const eliminarDelCarrito = ((id) => {

    Swal.fire({
        title: "Seguro que quieres eliminar tu producto?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            let carritoActualizado = carrito.filter((producto) => producto.id !== id);

    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));

    carrito.length = 0;
    carrito.push(...carritoActualizado);

    renderProductos (carrito);
        } else if (result.isDenied) {
        }
    });


})

let continuarCompra = document.getElementById("FinalizarCompra")
continuarCompra.addEventListener("click", () => {
    Swal.fire({
        title: 'UPS!',
        text: "Actualmente no contamos con stock de estos productos, mil diculpas :)",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Seguir comprando'
    })
});

renderProductos(carrito);