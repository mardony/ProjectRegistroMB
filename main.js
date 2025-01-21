let maquinarias = [];

// Cargar datos desde localStorage
function cargarDatos() {
    const datosGuardados = localStorage.getItem("maquinarias");
    if (datosGuardados) {
        maquinarias = JSON.parse(datosGuardados);
    } else {
        // Inicializar con dos maquinarias si no hay datos guardados
        maquinarias = [
            {
                id: 1,
                tipo: "Excavadora",
                modelo: "CAT 320D",
                anio: 2019,
                estado: "Operativo",
                combustible: "Diesel",
                horasUso: 1200,
                repuestos: ["Filtro de aire", "Aceite hidráulico"],
                consumos: { combustible: 1500, aceite: 50 },
            },
            {
                id: 2,
                tipo: "Bulldozer",
                modelo: "Komatsu D85",
                anio: 2018,
                estado: "Mantenimiento",
                combustible: "Diesel",
                horasUso: 2500,
                repuestos: ["Cadenas", "Rodillos"],
                consumos: { combustible: 3000, aceite: 100 },
            },
        ];
        guardarDatos(); // Guardar las maquinarias iniciales
    }
}

// Guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem("maquinarias", JSON.stringify(maquinarias));
}

// Mostrar maquinarias en el DOM
function mostrarMaquinarias(maqs) {
    const contenedor = document.getElementById("maquinarias");
    contenedor.innerHTML = "";

    maqs.forEach((maq) => {
        const maquinariaHTML = `
            <h2>ID: ${maq.id}, Tipo: ${maq.tipo}, Modelo: ${maq.modelo}</h2>
            <p>Año: ${maq.anio}, Estado: ${maq.estado}, Combustible: ${maq.combustible}</p>
            <p>Horas de Uso: ${maq.horasUso}</p>
            <p>Repuestos: ${maq.repuestos.join(", ")}</p>
            <p>Consumos (Combustible: ${maq.consumos.combustible}L, Aceite: ${maq.consumos.aceite}L)</p>
            <hr>
        `;
        contenedor.insertAdjacentHTML("beforeend", maquinariaHTML);
    });
}

// Agregar nueva maquinaria
function agregarMaquinaria(event) {
    event.preventDefault();
    const tipo = document.getElementById("tipo").value;
    const modelo = document.getElementById("modelo").value;
    const anio = parseInt(document.getElementById("anio").value);
    const estado = document.getElementById("estado").value;
    const combustible = document.getElementById("combustible").value;
    const horasUso = parseInt(document.getElementById("horasUso").value);
    const repuestos = document.getElementById("repuestos").value.split(",");
    const consumoCombustible = parseFloat(document.getElementById("consumoCombustible").value);
    const consumoAceite = parseFloat(document.getElementById("consumoAceite").value);

    const nuevaMaquinaria = {
        id: maquinarias.length + 1,
        tipo,
        modelo,
        anio,
        estado,
        combustible,
        horasUso,
        repuestos,
        consumos: {
            combustible: consumoCombustible,
            aceite: consumoAceite,
        },
    };

    maquinarias.push(nuevaMaquinaria);
    guardarDatos();
    alert("Maquinaria agregada correctamente.");
    document.getElementById("formularioAgregar").reset();
}

// Filtrar por tipo de maquinaria
function filtrarPorTipo(event) {
    event.preventDefault();
    const tipo = document.getElementById("tipoBuscar").value;
    const resultado = maquinarias.filter((maq) => maq.tipo.toLowerCase() === tipo.toLowerCase());
    if (resultado.length > 0) {
        mostrarMaquinarias(resultado);
    } else {
        alert(`No se encontraron maquinarias del tipo "${tipo}".`);
    }
}

// Filtrar por estado
function filtrarPorEstado(event) {
    event.preventDefault();
    const estado = document.getElementById("estadoBuscar").value;
    const resultado = maquinarias.filter((maq) => maq.estado.toLowerCase() === estado.toLowerCase());
    if (resultado.length > 0) {
        mostrarMaquinarias(resultado);
    } else {
        alert(`No se encontraron maquinarias en estado "${estado}".`);
    }
}

// Eventos
document.getElementById("formularioAgregar").addEventListener("submit", agregarMaquinaria);
document.getElementById("btnMostrar").addEventListener("click", () => mostrarMaquinarias(maquinarias));
document.getElementById("formularioBuscarTipo").addEventListener("submit", filtrarPorTipo);
document.getElementById("formularioBuscarEstado").addEventListener("submit", filtrarPorEstado);

// Cargar datos al inicio
cargarDatos();




