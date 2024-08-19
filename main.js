let productos = []
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener("DOMContentLoaded", () => {
    const getProducts = fetch("./data.json")
    getProducts.then((respuesta) => respuesta.json()).then((respuesta) => {
        productos = respuesta.productos
        renderProductos(productos)
    })
})


const renderProductos = (arrayProductos) => {
    let container = document.getElementById("containerPrincipal");
    container.innerHTML = "";

    arrayProductos.forEach((producto) => {

    let productCard = document.createElement("div")

    productCard.className = "productCard"

    productCard.innerHTML = 
        `<img src="${producto.image}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>${producto.description}</p>
        <p>Precio: $${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;

    container.appendChild(productCard);
    })
};

const agregarAlCarrito = (id) => {

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tu producto se agrego al carrito correctamente",
        showConfirmButton: false,
        timer: 1500
    });
let productoCarrito = productos.find((elemento) => elemento.id ===id);

carrito.push(productoCarrito)

localStorage.setItem('carrito', JSON.stringify(carrito))

};

const buscar = document.getElementById("Buscar")

if (buscar){
    buscar.addEventListener("input", (evento) => {
        let value = evento.target.value.toLowerCase();
        let arrayFiltrado = productos.filter((producto) => 
            producto.nombre.toLowerCase().includes(value)
    );
    renderProductos(arrayFiltrado)
    });
}

