"use strict";
var TareaEstado;
(function (TareaEstado) {
    TareaEstado["pendiente"] = "pendiente";
    TareaEstado["completada"] = "completada";
    TareaEstado["enProgreso"] = "en progreso";
})(TareaEstado || (TareaEstado = {}));
class Tarea {
    constructor(init) {
        this.id = init.id;
        this.nombre = init.nombre;
    }
    completar() {
        this.estado = TareaEstado.completada;
    }
    enProgreso() {
        this.estado = TareaEstado.enProgreso;
    }
}
function main() {
    let tarea = new Tarea({ id: 1, nombre: "Tarea 1" });
    console.log(tarea);
    tarea.completar();
    console.log(tarea);
}
;
main();
