"use strict";
// electron

const { ipcRenderer } = require("electron");
const electron = require("electron");
const ipc = electron.ipcRenderer;

// DATABASE mysql CONNECTION
var mysql = require('mysql');

// agregar las credenciales para poder conectarme a mi base de datos
var connection = mysql.createConnection("mysql://root:@localhost:3306/inventario");

// conectar a mysql 
connection.connect(function (err) {
    ipc.send('mysql-connection-start');
    if (err) {
        console.log(`${err.code} ha fallado la coneccion a la base de datos`);
    }
});

module.exports = connection;