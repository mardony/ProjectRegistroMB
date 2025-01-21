const maquinarias = [
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

// Mostrar maquinarias
function mostrarMaquinarias(maquinarias) {
    maquinarias.forEach((maq) => {
        console.log(
            `ID: ${maq.id}, Tipo: ${maq.tipo}, Modelo: ${maq.modelo}, Año: ${maq.anio}\nEstado: ${maq.estado}, Combustible: ${maq.combustible}, Horas de Uso: ${maq.horasUso}\nRepuestos: ${maq.repuestos.join(
                ", "
            )}, Consumos (Combustible: ${maq.consumos.combustible}L, Aceite: ${maq.consumos.aceite}L)`
        );
        console.log("-----------------------------");
    });
}

// Agregar nueva maquinaria
function agregarMaquinaria() {
    const nuevaMaquinaria = {
        id: maquinarias.length + 1,
        tipo: prompt("Ingrese el tipo de maquinaria:"),
        modelo: prompt("Ingrese el modelo:"),
        anio: parseInt(prompt("Ingrese el año de fabricación:")),
        estado: prompt("Ingrese el estado (Operativo/Mantenimiento):"),
        combustible: prompt("Ingrese el tipo de combustible:"),
        horasUso: parseInt(prompt("Ingrese las horas de uso:")),
        repuestos: prompt("Ingrese los repuestos (separados por coma):").split(","),
        consumos: {
            combustible: parseFloat(prompt("Ingrese el consumo de combustible (en litros):")),
            aceite: parseFloat(prompt("Ingrese el consumo de aceite (en litros):")),
        },
    };
    maquinarias.push(nuevaMaquinaria);
    console.log("Nueva maquinaria registrada correctamente.");
}

// Filtrar por tipo de maquinaria
function filtrarPorTipo(tipo) {
    const resultado = maquinarias.filter((maq) => maq.tipo.toLowerCase() === tipo.toLowerCase());
    if (resultado.length > 0) {
        mostrarMaquinarias(resultado);
    } else {
        console.log(`No se encontraron maquinarias del tipo "${tipo}".`);
    }
}

// Filtrar por estado
function filtrarPorEstado(estado) {
    const resultado = maquinarias.filter((maq) => maq.estado.toLowerCase() === estado.toLowerCase());
    if (resultado.length > 0) {
        mostrarMaquinarias(resultado);
    } else {
        console.log(`No se encontraron maquinarias en estado "${estado}".`);
    }
}

// Menú interactivo
function mostrarMenu() {
    let opcion;
    do {
        opcion = prompt(
            "Registro de Maquinarias\n\n1. Mostrar maquinarias\n2. Agregar nueva maquinaria\n3. Buscar por tipo\n4. Buscar por estado\n5. Salir\nIngrese su opción:"
        );
        switch (opcion) {
            case "1":
                mostrarMaquinarias(maquinarias);
                break;
            case "2":
                agregarMaquinaria();
                break;
            case "3":
                const tipo = prompt("Ingrese el tipo de maquinaria a buscar:");
                filtrarPorTipo(tipo);
                break;
            case "4":
                const estado = prompt("Ingrese el estado de las maquinarias a buscar (Operativo/Mantenimiento):");
                filtrarPorEstado(estado);
                break;
            case "5":
                console.log("Gracias por usar el sistema.");
                break;
            default:
                console.log("Opción inválida. Intente de nuevo.");
        }
    } while (opcion !== "5");
}

// Ejecutar el menú
mostrarMenu();
