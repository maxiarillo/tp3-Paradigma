const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise((resolve) => rl.question(pregunta, resolve));
}

function limpiarConsola() {
    console.clear();
}

async function pausar() {
    await preguntar("\nPresiona ENTER para continuar...");
}

// =====================
// ENUM de estados
// =====================
const Estado = {
    Pendiente: "Pendiente",
    EnCurso: "En Curso",
    Terminada: "Terminada",
    Cancelada: "Cancelada"
};

// =====================
// Función constructora Tarea
// =====================
function Tarea(titulo, descripcion, estado, dificultad, vencimiento) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado || Estado.Pendiente;
    this.dificultad = dificultad;
    this.vencimiento = vencimiento;
    this.fechaCreacion = new Date().toLocaleString();
}

// Métodos del prototipo de Tarea
Tarea.prototype.mostrarDetalle = function () {
    console.log("=== Detalle de la Tarea ===\n");
    console.log(`Título: ${this.titulo}`);
    console.log(`Descripción: ${this.descripcion}`);
    console.log(`Estado: ${this.estado}`);
    console.log(`Dificultad: ${this.dificultad}`);
    console.log(`Vencimiento: ${this.vencimiento}`);
    console.log(`Creada el: ${this.fechaCreacion}`);
};

Tarea.prototype.editar = async function () {
    limpiarConsola();
    console.log("=== Editor de Tareas ===\n");
    console.log(`Editando: ${this.titulo}\n`);
    
    const nuevoTitulo = await preguntar(`Nuevo título (${this.titulo}): `);
    const nuevaDescripcion = await preguntar(`Nueva descripción (${this.descripcion}): `);
    const nuevoEstado = await preguntar(`Nuevo estado (${this.estado}): `);
    const nuevaDificultad = await preguntar(`Nueva dificultad (${this.dificultad}): `);
    const nuevoVencimiento = await preguntar(`Nueva fecha de vencimiento (${this.vencimiento}): `);

    if (nuevoTitulo) this.titulo = nuevoTitulo;
    if (nuevaDescripcion) this.descripcion = nuevaDescripcion;
    if (nuevoEstado) this.estado = formatearEstado(nuevoEstado);
    if (nuevaDificultad) this.dificultad = nuevaDificultad;
    if (nuevoVencimiento) this.vencimiento = nuevoVencimiento;

    console.log("\n✅ Tarea actualizada con éxito!");
    await pausar();
};

// =====================
// Funciones auxiliares
// =====================
function formatearEstado(estado) {
    switch (estado.trim().toLowerCase()) {
    case "p":
    case "pendiente":
        return Estado.Pendiente;
    case "e":
    case "en curso":
        return Estado.EnCurso;
    case "t":
    case "terminada":
        return Estado.Terminada;
    case "c":
    case "cancelada":
        return Estado.Cancelada;
    default:
        return Estado.Pendiente;
    }
}

// =====================
// Sistema de tareas (objeto base)
// =====================
function SistemaTareas() {
    this.tareas = [];
}

// Métodos del Sistema
SistemaTareas.prototype.agregarTarea = async function () {
    limpiarConsola();
    console.log("=== Crear nueva tarea ===\n");

    const titulo = await preguntar("Título: ");
    const descripcion = await preguntar("Descripción: ");
    const estado = await preguntar("Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
    const dificultad = await preguntar("Dificultad (1/2/3): ");
    const vencimiento = await preguntar("Vencimiento: ");

    const tarea = new Tarea(
    titulo,
    descripcion,
    formatearEstado(estado),
    dificultad,
    vencimiento
);

this.tareas.push(tarea);
console.log("\n✅ Tarea guardada!");
await pausar();
};

SistemaTareas.prototype.verTareas = async function () {
let opc;
do {
    limpiarConsola();
    console.log("¿Qué tareas querés ver?\n");
    console.log("[1] Todas");
    console.log("[2] Pendientes");
    console.log("[3] En curso");
    console.log("[4] Terminadas");
    console.log("[5] Canceladas");
    console.log("[6] Volver\n");

    opc = await preguntar("> ");
    switch (opc) {
    case "1":
        await this.mostrarTareas();
        break;
    case "2":
        await this.verPorEstado(Estado.Pendiente, "Pendientes");
        break;
    case "3":
        await this.verPorEstado(Estado.EnCurso, "En Curso");
        break;
    case "4":
        await this.verPorEstado(Estado.Terminada, "Terminadas");
        break;
    case "5":
        await this.verPorEstado(Estado.Cancelada, "Canceladas");
        break;
    case "6":
        break;
    default:
        console.log("Opción inválida...");
        await pausar();
        break;
    }
    } while (opc !== "6");
};

SistemaTareas.prototype.mostrarTareas = async function () {
limpiarConsola();
console.log("=== Todas las Tareas ===\n");

if (this.tareas.length === 0) {
    console.log("No hay tareas cargadas...");
} else {
    this.tareas.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));
    const eleccion = parseInt(await preguntar("\nIngrese el número de la tarea o 0 para volver: "));
    if (!isNaN(eleccion) && eleccion > 0 && eleccion <= this.tareas.length) {
    const t = this.tareas[eleccion - 1];
    t.mostrarDetalle();
    const opcion = await preguntar("\nPresiona [E] para editar o [0] para volver: ");
    if (opcion.toUpperCase() === "E") {
        await t.editar();
    }
    }
}
await pausar();
};

SistemaTareas.prototype.verPorEstado = async function (estado, titulo) {
limpiarConsola();
console.log(`=== Tareas ${titulo} ===\n`);

const filtradas = this.tareas.filter((t) => t.estado === estado);

if (filtradas.length === 0) {
    console.log(`No hay tareas ${titulo.toLowerCase()}...`);
} else {
    filtradas.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));
    const eleccion = parseInt(await preguntar("\nIngrese el número de la tarea o 0 para volver: "));
    if (!isNaN(eleccion) && eleccion > 0 && eleccion <= filtradas.length) {
    const t = filtradas[eleccion - 1];
    t.mostrarDetalle();
    const opcion = await preguntar("\nPresiona [E] para editar o [0] para volver: ");
    if (opcion.toUpperCase() === "E") {
        await t.editar();
    }
    }
}
await pausar();
};

SistemaTareas.prototype.buscarTarea = async function () {
limpiarConsola();
console.log("=== Buscador de Tareas ===\n");

const palabra = (await preguntar("Ingrese el título: ")).toLowerCase();
const coincidencias = this.tareas.filter((t) =>
    t.titulo.toLowerCase().includes(palabra)
);

if (coincidencias.length === 0) {
    console.log("No se encontró ninguna tarea...");
} else {
    coincidencias.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));
    const eleccion = parseInt(await preguntar("\nIngrese el número o 0 para volver: "));
    if (!isNaN(eleccion) && eleccion > 0 && eleccion <= coincidencias.length) {
    const t = coincidencias[eleccion - 1];
    t.mostrarDetalle();
    const opcion = await preguntar("\nPresiona [E] para editar o [0] para volver: ");
    if (opcion.toUpperCase() === "E") {
        await t.editar();
    }
    }
}
await pausar();
};

// =====================
// MAIN
// =====================
async function main() {
const sistema = new SistemaTareas();
let opcion;

do {
    limpiarConsola();
    console.log("=== Sistema de Tareas ===\n");
    console.log("[1] Ver mis tareas");
    console.log("[2] Buscar tarea");
    console.log("[3] Agregar tarea");
    console.log("[4] Salir\n");

    opcion = await preguntar("> ");

    switch (opcion) {
    case "1":
        await sistema.verTareas();
        break;
    case "2":
        await sistema.buscarTarea();
        break;
    case "3":
        await sistema.agregarTarea();
        break;
    case "4":
        console.log("\n👋 Saliendo...");
        rl.close();
        break;
    default:
        console.log("Opción inválida...");
        await pausar();
        break;
    }
} while (opcion !== "4");
}

main();