"use strict";
const electrons = require("electron");
const ipcs = electrons.ipcRenderer;
// require connect 
let connects = require("./database_connection.js");
// btns cancel
let btn_cancel = document.getElementById("cancel");
btn_cancel.addEventListener("click", function (e) {
    e.preventDefault();
    ipcs.send('close-agregar-producto.html');
});
// render manda info al main para cerrar el widget
// baja las opciones de proveedores
function get_proveedores_post() {
    let proveedor_input = document.getElementById("proveedor");
    connects.query('SELECT nombre FROM proveedores', function (error, results, fields) {
        if (error) {
            throw error;
        }
        else {
            console.log(results.nombre);
            for (let index = 0; index < results.length; index++) {
                let create_option_element = document.createElement("option");
                create_option_element.innerHTML = results[index].nombre;
                proveedor_input.appendChild(create_option_element);
            }
        }
    });
}
get_proveedores_post();
// btns agregar
let btn_agregar = document.getElementById("agregar");
btn_agregar.addEventListener("click", function (event) {
    let nombre_input = document.getElementById("nombre");
    let tipo_input = document.getElementById("tipo");
    let color_input = document.getElementById("color");
    let cantidad_input = document.getElementById("cantidad");
    let medida_input = document.getElementById("medida");
    let costo_unitario_input = document.getElementById("costo_unitario");
    let proveedor_input = document.getElementById("proveedor");
    // obj post
    var obj = {
        nombre: nombre_input.value,
        tipo: tipo_input.value,
        color: color_input.value,
        cantidad: cantidad_input.value,
        medida: medida_input.value,
        costo_unitario: costo_unitario_input.value,
        proveedor: proveedor_input.value
    };
    // obj post
    var query = connects.query('INSERT INTO `productos` SET ?', obj, function (error, result, field) {
        if (error) {
            throw error;
        }
        ;
    });
    nombre_input.value = "";
    tipo_input.value = "";
    color_input.value = "";
    cantidad_input.value = "";
    medida_input.value = "";
    costo_unitario_input.value = "";
    proveedor_input.value = "";
});
