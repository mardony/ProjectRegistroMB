// Variables globales
let maquinarias = [];
let listaOperarios = [];
// currentView puede ser "maquinarias", "operarios" o "asignadas"
let currentView = "maquinarias";

// Cargar datos de maquinarias desde localStorage
function cargarDatos() {
    const datosGuardados = localStorage.getItem("maquinarias");
    if (datosGuardados) {
        maquinarias = JSON.parse(datosGuardados);
    } else {
        maquinarias = [
            {
                id: 1,
                tipo: "Excavadora",
                modelo: "CAT 320D",
                anio: 2018,
                estado: "Operativa",
                combustible: "Diésel",
                horasUso: 3500,
                repuestos: ["Filtro de aire", "Bomba hidráulica"],
                consumos: {
                    combustible: 1200,
                    aceite: 300
                },
                operario: null
            },
            {
                id: 2,
                tipo: "Cargador Frontal",
                modelo: "Komatsu WA380",
                anio: 2020,
                estado: "En mantenimiento",
                combustible: "Diésel",
                horasUso: 2800,
                repuestos: ["Neumáticos", "Radiador"],
                consumos: {
                    combustible: 950,
                    aceite: 200
                },
                operario: null
            },
            {
                id: 3,
                tipo: "Grúa",
                modelo: "Liebherr LTM 1090",
                anio: 2019,
                estado: "Operativa",
                combustible: "Diésel",
                horasUso: 4200,
                repuestos: ["Cable de acero", "Sistema hidráulico"],
                consumos: {
                    combustible: 1500,
                    aceite: 400
                },
                operario: null
            }
        ];
        guardarDatos();
    }
}

// Guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem("maquinarias", JSON.stringify(maquinarias));
}

// VISTA: Mostrar todas las maquinarias (registradas, con o sin asignación)
// VISTA: Mostrar todas las maquinarias sin asignación (registradas)
function renderAllMaquinarias(filtered = null) {
    const contenedor = document.getElementById("contenedorMaquinarias");
    contenedor.style.display = "block";
    document.getElementById("contenedorOperarios").style.display = "none";
    document.getElementById("contenedorMaquinariasAsignadas").style.display = "none";
    currentView = "maquinarias";

    // Solo mostrar las máquinas sin asignación
    let lista = filtered || maquinarias.filter(maq => !maq.operario);
    contenedor.innerHTML = "";
    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay maquinarias registradas sin asignación.</p>";
        return;
    }
    lista.forEach(maq => {
        const div = document.createElement("div");
        div.className = "maquinaria";
        div.innerHTML = `
      <h3>ID: ${maq.id} - ${maq.tipo} (${maq.modelo})</h3>
      <p>Año: ${maq.anio}, Estado: ${maq.estado}, Combustible: ${maq.combustible}</p>
      <p>Horas: ${maq.horasUso}</p>
      <p>Repuestos: ${maq.repuestos.join(", ")}</p>
      <p>Consumos: Combustible ${maq.consumos.combustible}L, Aceite ${maq.consumos.aceite}L</p>
      <p>Sin asignación</p>
      <button onclick="editarMaquinaria(${maq.id})">Editar</button>
      <button onclick="eliminarMaquinaria(${maq.id})">Eliminar</button>
      <button onclick="asignarOperario(${maq.id})">Asignar Operario</button>
    `;
        contenedor.appendChild(div);
    });
}



// VISTA: Mostrar lista de operarios obtenidos de la API
function renderOperarios() {
    const contenedor = document.getElementById("contenedorOperarios");
    contenedor.style.display = "block";
    document.getElementById("contenedorMaquinarias").style.display = "none";
    document.getElementById("contenedorMaquinariasAsignadas").style.display = "none";
    currentView = "operarios";

    contenedor.innerHTML = "";
    if (listaOperarios.length === 0) {
        contenedor.innerHTML = "<p>No hay operarios disponibles.</p>";
        return;
    }
    listaOperarios.forEach(op => {
        const div = document.createElement("div");
        div.className = "operario";
        div.innerHTML = `
      <img src="${op.picture.medium}" alt="Operario">
      <p>${op.name.first} ${op.name.last} (${op.dob.age} años)</p>
    `;
        contenedor.appendChild(div);
    });
}

// VISTA: Mostrar solo las maquinarias que tienen asignado un operario
function renderMaquinariasAsignadas(filtered = null) {
    const contenedor = document.getElementById("contenedorMaquinariasAsignadas");
    contenedor.style.display = "block";
    document.getElementById("contenedorMaquinarias").style.display = "none";
    document.getElementById("contenedorOperarios").style.display = "none";
    currentView = "asignadas";

    let lista = filtered || maquinarias.filter(m => m.operario);
    contenedor.innerHTML = "";
    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay maquinarias asignadas.</p>";
        return;
    }
    lista.forEach(maq => {
        const div = document.createElement("div");
        div.className = "maquinaria";
        div.innerHTML = `
      <h3>ID: ${maq.id} - ${maq.tipo} (${maq.modelo})</h3>
      <p>Año: ${maq.anio}, Estado: ${maq.estado}, Combustible: ${maq.combustible}</p>
      <p>Horas: ${maq.horasUso}</p>
      <p>Repuestos: ${maq.repuestos.join(", ")}</p>
      <p>Consumos: Combustible ${maq.consumos.combustible}L, Aceite ${maq.consumos.aceite}L</p>
      ${maq.operario ? `
        <div>
          <img src="${maq.operario.imagen}" alt="Operario">
          <p>Operario: ${maq.operario.nombre} (${maq.operario.edad} años)</p>
        </div>
      ` : `<p>Sin asignación</p>`}
      <button onclick="editarMaquinaria(${maq.id})">Editar</button>
      <button onclick="eliminarMaquinaria(${maq.id})">Eliminar</button>
      ${maq.operario
                ? `<button onclick="asignarOperario(${maq.id})">Modificar Asignación</button>
             <button onclick="eliminarAsignacion(${maq.id})">Eliminar Asignación</button>`
                : `<button onclick="asignarOperario(${maq.id})">Asignar Operario</button>`
            }
    `;
        contenedor.appendChild(div);
    });
}

// Función para obtener operarios desde la API (simula 1 segundo de retraso)
function obtenerOperarios() {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await fetch("https://randomuser.me/api/?results=100");
                const data = await response.json();
                resolve(data.results);
            } catch (error) {
                reject("Error al obtener operarios");
            }
        }, 1000);
    });
}

// Cargar operarios y almacenarlos en listaOperarios
function cargarOperarios() {
    obtenerOperarios().then(operarios => {
        listaOperarios = operarios;
    }).catch(error => {
        console.error(error);
        Swal.fire("Error", "No se pudieron cargar los operarios.", "error");
    });
}

// Agregar nueva maquinaria (sin asignación)
function agregarMaquinaria(event) {
    event.preventDefault();
    const tipo = document.getElementById("tipo").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const anio = parseInt(document.getElementById("anio").value);
    const estado = document.getElementById("estado").value.trim();
    const combustible = document.getElementById("combustible").value.trim();
    const horasUso = parseInt(document.getElementById("horasUso").value);
    const repuestos = document.getElementById("repuestos").value.split(",").map(item => item.trim());
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
            aceite: consumoAceite
        },
        operario: null
    };

    maquinarias.push(nuevaMaquinaria);
    guardarDatos();
    Swal.fire("Éxito", "Maquinaria agregada correctamente.", "success");
    document.getElementById("formularioAgregar").reset();
    if (currentView === "maquinarias") {
        renderAllMaquinarias();
    } else if (currentView === "asignadas") {
        renderMaquinariasAsignadas();
    }
}

// Editar una maquinaria existente
function editarMaquinaria(machineId) {
    const maquina = maquinarias.find(m => m.id === machineId);
    if (!maquina) return;
    Swal.fire({
        title: "Editar Maquinaria",
        html: `
      <input id="swal-tipo" class="swal2-input" placeholder="Tipo" value="${maquina.tipo}">
      <input id="swal-modelo" class="swal2-input" placeholder="Modelo" value="${maquina.modelo}">
      <input id="swal-anio" type="number" class="swal2-input" placeholder="Año" value="${maquina.anio}">
      <input id="swal-estado" class="swal2-input" placeholder="Estado" value="${maquina.estado}">
      <input id="swal-combustible" class="swal2-input" placeholder="Combustible" value="${maquina.combustible}">
      <input id="swal-horasUso" type="number" class="swal2-input" placeholder="Horas de uso" value="${maquina.horasUso}">
      <input id="swal-repuestos" class="swal2-input" placeholder="Repuestos" value="${maquina.repuestos.join(", ")}">
      <input id="swal-consumoCombustible" type="number" class="swal2-input" placeholder="Consumo Combustible" value="${maquina.consumos.combustible}">
      <input id="swal-consumoAceite" type="number" class="swal2-input" placeholder="Consumo Aceite" value="${maquina.consumos.aceite}">
    `,
        focusConfirm: false,
        preConfirm: () => {
            return {
                tipo: document.getElementById("swal-tipo").value.trim(),
                modelo: document.getElementById("swal-modelo").value.trim(),
                anio: parseInt(document.getElementById("swal-anio").value),
                estado: document.getElementById("swal-estado").value.trim(),
                combustible: document.getElementById("swal-combustible").value.trim(),
                horasUso: parseInt(document.getElementById("swal-horasUso").value),
                repuestos: document.getElementById("swal-repuestos").value.split(",").map(item => item.trim()),
                consumoCombustible: parseFloat(document.getElementById("swal-consumoCombustible").value),
                consumoAceite: parseFloat(document.getElementById("swal-consumoAceite").value)
            };
        }
    }).then(result => {
        if (result.isConfirmed) {
            const datos = result.value;
            maquina.tipo = datos.tipo;
            maquina.modelo = datos.modelo;
            maquina.anio = datos.anio;
            maquina.estado = datos.estado;
            maquina.combustible = datos.combustible;
            maquina.horasUso = datos.horasUso;
            maquina.repuestos = datos.repuestos;
            maquina.consumos = {
                combustible: datos.consumoCombustible,
                aceite: datos.consumoAceite
            };
            guardarDatos();
            Swal.fire("Éxito", "Maquinaria editada correctamente.", "success");
            if (currentView === "maquinarias") {
                renderAllMaquinarias();
            } else if (currentView === "asignadas") {
                renderMaquinariasAsignadas();
            }
        }
    });
}

// Eliminar una maquinaria
function eliminarMaquinaria(machineId) {
    Swal.fire({
        title: "¿Eliminar Maquinaria?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            maquinarias = maquinarias.filter(m => m.id !== machineId);
            guardarDatos();
            Swal.fire("Eliminada", "Maquinaria eliminada correctamente.", "success");
            if (currentView === "maquinarias") {
                renderAllMaquinarias();
            } else if (currentView === "asignadas") {
                renderMaquinariasAsignadas();
            }
        }
    });
}

// Asignar o modificar la asignación de un operario a una maquinaria
function asignarOperario(machineId) {
    if (listaOperarios.length === 0) {
        Swal.fire("Error", "No hay operarios disponibles para asignar.", "error");
        return;
    }
    let selectHTML = '<select id="swalOperarioSelect" class="swal2-select">';
    selectHTML += '<option value="">-- Seleccione un operario --</option>';
    listaOperarios.forEach((op, index) => {
        selectHTML += `<option value="${index}">${op.name.first} ${op.name.last} (${op.dob.age} años)</option>`;
    });
    selectHTML += '</select>';

    Swal.fire({
        title: 'Asignar Operario',
        html: selectHTML,
        focusConfirm: false,
        preConfirm: () => {
            const selectedIndex = document.getElementById('swalOperarioSelect').value;
            if (selectedIndex === "") {
                Swal.showValidationMessage("Seleccione un operario");
            }
            return selectedIndex;
        }
    }).then(result => {
        if (result.isConfirmed) {
            const indice = parseInt(result.value);
            const operarioSeleccionado = listaOperarios[indice];
            const maquinaria = maquinarias.find(m => m.id === machineId);
            if (maquinaria) {
                maquinaria.operario = {
                    nombre: `${operarioSeleccionado.name.first} ${operarioSeleccionado.name.last}`,
                    edad: operarioSeleccionado.dob.age,
                    imagen: operarioSeleccionado.picture.medium
                };
                guardarDatos();
                Swal.fire("Éxito", "Operario asignado correctamente.", "success");
                if (currentView === "maquinarias") {
                    renderAllMaquinarias();
                } else if (currentView === "asignadas") {
                    renderMaquinariasAsignadas();
                }
            }
        }
    });
}

// Eliminar asignación de operario
function eliminarAsignacion(machineId) {
    const maquinaria = maquinarias.find(m => m.id === machineId);
    if (maquinaria && maquinaria.operario) {
        maquinaria.operario = null;
        guardarDatos();
        Swal.fire("Éxito", "Asignación eliminada.", "success");
        if (currentView === "maquinarias") {
            renderAllMaquinarias();
        } else if (currentView === "asignadas") {
            renderMaquinariasAsignadas();
        }
    }
}

// Búsqueda por tipo según la vista activa
function filtrarPorTipo(event) {
    event.preventDefault();
    const tipoBusqueda = document.getElementById("tipoBuscar").value.trim().toLowerCase();
    let filtrado;
    if (currentView === "maquinarias") {
        filtrado = maquinarias.filter(maq => maq.tipo.toLowerCase().includes(tipoBusqueda));
        renderAllMaquinarias(filtrado);
    } else if (currentView === "asignadas") {
        filtrado = maquinarias.filter(maq => maq.operario && maq.tipo.toLowerCase().includes(tipoBusqueda));
        renderMaquinariasAsignadas(filtrado);
    }
}

// Búsqueda por estado según la vista activa
function filtrarPorEstado(event) {
    event.preventDefault();
    const estadoBusqueda = document.getElementById("estadoBuscar").value.trim().toLowerCase();
    let filtrado;
    if (currentView === "maquinarias") {
        filtrado = maquinarias.filter(maq => maq.estado.toLowerCase().includes(estadoBusqueda));
        renderAllMaquinarias(filtrado);
    } else if (currentView === "asignadas") {
        filtrado = maquinarias.filter(maq => maq.operario && maq.estado.toLowerCase().includes(estadoBusqueda));
        renderMaquinariasAsignadas(filtrado);
    }
}

// Mostrar todas (restablece el filtro)
function mostrarTodas() {
    if (currentView === "maquinarias") {
        renderAllMaquinarias();
    } else if (currentView === "asignadas") {
        renderMaquinariasAsignadas();
    }
}

// Eventos de navegación y formularios
document.getElementById("btnMostrarMaquinarias").addEventListener("click", () => renderAllMaquinarias());
document.getElementById("btnMostrarOperarios").addEventListener("click", () => renderOperarios());
document.getElementById("btnMostrarMaquinariasAsignadas").addEventListener("click", () => renderMaquinariasAsignadas());
document.getElementById("formularioAgregar").addEventListener("submit", agregarMaquinaria);
document.getElementById("formularioAgregar").addEventListener("submit", agregarMaquinaria); // (Si es necesario, verificar duplicación)
document.getElementById("formularioBuscarTipo").addEventListener("submit", filtrarPorTipo);
document.getElementById("formularioBuscarEstado").addEventListener("submit", filtrarPorEstado);
document.getElementById("btnMostrarTodos").addEventListener("click", mostrarTodas);

// Inicialización: cargar datos, renderizar vista por defecto y cargar operarios
cargarDatos();
renderAllMaquinarias();
cargarOperarios();

// Nota: Para evitar duplicación de eventos, verifique que el ID de formulario esté definido correctamente.
