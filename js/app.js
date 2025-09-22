/* Carritos de compras con JavaScript */

// Variables globales - nos generaran los elementos
/* Document.querySelector busca el primer elemento que coincida
con el selector CSS #carrito */
const carrito = document.querySelector('#carrito');

/**
 * listaCurso: Referencia al contenedor que tiene todos los cursos
 */
const listaCursos = document.querySelector('#lista-cursos');

/**
 * contenedorCarrito: Referencia especifica al tbody de la tabla
 * del carrito.
 * Es donde se insertan dinámicamente las filas (tr) con los
 * cursos agregados.
 * querySelector('#lista-carrito') busca un tbody dentro
 * del elemento con id 'lista-carrito'
 */
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

/**
 * vaciarCarritoBtn: Referencia al botón que permite vaciar todo el carrito.
 * Cuando haga clic en este botón, se eliminarán todos los productos.
 */
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

/**
 * ArticulosCarrito: Array que almacena todos los productos
 * agregados al carrito.
 * let se usa porque este array se modificará constantemente
 * (agregar/eliminar productos).
 */
let articulosCarrito = [];

function cargarEventosListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito); // Agregar event listener para vaciar el carrito
}

/**
 * Función que maneja el evento para agregar un curso al 
 * carrito; Utiliza DELEGACIÓN DE EVENTOS para la captura de clicks
 * en botones dinámicos.
 * @param {Event} e - El objeto que contiene la información sobre el click.
 */
function agregarCurso(e) {
    /**
     * e.preventDefault() previene el comportamiento por defecto
     * del elemento.
     * En este caso, evita que el enlace (<a href="">) recargue la página.
     */
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        image: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        Precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        articulosCarrito = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
    } else {
        // Si el curso no existe, lo agregamos como nuevo producto
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

function carritoHTML() {
    // Limpiar carrito HTML antes de volver a renderizarlo
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.image}" width="100" alt="${curso.titulo}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.Precio}</td>
        <td>${curso.cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    // Eliminar todos los elementos dentro del carrito
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function eliminarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar el curso del array de articulosCarrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // Actualizar el carrito en la vista
    }
}

function vaciarCarrito() {
    articulosCarrito = []; // Vaciar el array de productos en el carrito
    limpiarHTML(); // Limpiar la vista del carrito
}

// Llamamos a la función para cargar los eventos
cargarEventosListeners();