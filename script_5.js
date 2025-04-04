const carrito = document.getElementById('carrito');
const total = document.getElementById('total');
const vaciar = document.getElementById('vaciar');
const agregarBotones = document.querySelectorAll('.agregar');

let totalPrecio; 
if (localStorage.getItem('total')) {
    totalPrecio = parseFloat(localStorage.getItem('total')); 
} else {
    totalPrecio = 0;
}


let carritoProductos;
if (localStorage.getItem('carrito')) {
    carritoProductos = localStorage.getItem('carrito').split('|');
} else {
    carritoProductos = [];
}

function actualizarCarrito() {
        carrito.innerHTML = "";

        carritoProductos.forEach((producto, index) => {
            let datos = producto.split(',');
            let precio = parseFloat(datos[1]);
            let img = datos[2];

            const nuevoElemento = document.createElement('div');
            nuevoElemento.innerHTML = `
                <img class="img_venta" src="${img}">
                <div class="btn_eliminar">
                    <button class="eliminar">Eliminar</button>
                </div>
            `;
            carrito.appendChild(nuevoElemento);

            nuevoElemento.querySelector('.eliminar').addEventListener('click', () => {
                totalPrecio -= precio;
                total.innerText = `Total: $${totalPrecio}`;
                carrito.removeChild(nuevoElemento);

                carritoProductos.splice(index, 1);
                localStorage.setItem('carrito', carritoProductos.join('|'));
                localStorage.setItem('total', totalPrecio);
            });
        });

        total.innerText = `Total: $${totalPrecio}`;
    }

    agregarBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            const disco = boton.parentElement;
            const nombre = disco.dataset.nombre;
            const precio = parseFloat(disco.dataset.precio);
            const img = disco.querySelector('img').src;

            totalPrecio += precio;
            carritoProductos.push(`${nombre},${precio},${img}`);
            localStorage.setItem('carrito', carritoProductos.join('|'));
            localStorage.setItem('total', totalPrecio);
            
            actualizarCarrito();
        });
    });


    vaciar.addEventListener('click', () => {
        carrito.innerHTML = "";
        carritoProductos = [];
        totalPrecio = 0;
        localStorage.removeItem('carrito');
        localStorage.removeItem('total');
        total.innerText = `Total: $${totalPrecio}`;
    });

    actualizarCarrito();

