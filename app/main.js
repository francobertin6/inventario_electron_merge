const {app, BrowserWindow} = require("electron");
const electron = require("electron");
const ipc = electron.ipcMain;

function createwindow() {
    // crea la ventana
    const win = new BrowserWindow ({
        minWidth:1400,
        minHeight:800,
        maxWidth:1400,
        maxHeight:800,
        center: true,
        webPreferences : {
            nodeIntegration: true
        }
    })
    // carga el archivo index.html
    win.loadFile('src/index.html');

    /* open dev tools
    win.webContents.openDevTools()*/

    win.once("ready-to-show", () => {
        win.show();
    })

    win.once("close", () => {
        app.quit();
    })
}


// este metodo es llamado cuando electron ha terminado de 
// inicializarce y esta listo para crear ventanas en el 
// navegador (browser)
app.whenReady(
// conectar a mysql function
    ipc.on('mysql-connection-start', function(event, err){
    if(err){
        console.log(`ha surgido un error en la conecxion con el main`);
    }else{
    console.log("la base de datos se ha conectado exitosamente")
    }})
// conectar a mysql function
).then(createwindow);
 
// iniciar/cerrar - agregar_productos.html 
ipc.on('open_agregar_producto.html', function(event){
    const win2 = new BrowserWindow({
        minWidth:800,
        minHeight:400,
        maxWidth: 800,
        maxHeight: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win2.loadFile('src/agregar_producto.html');

    win2.once("ready-to-show", () => {
        win2.show();
    })

    ipc.on('close-agregar-producto.html', function(event){
        event.preventDefault();
        win2.hide();
    })
})
// iniciar/cerrar - agregar_productos.html 

// iniciar proveedores.html
ipc.on('open_proveedores.html', function(event){
    const win3 = new BrowserWindow({
        minWidth: 700,
        minHeight: 1000,
        maxWidth:700,
        maxHeight:1000,

        webPreferences: {
            nodeIntegration:true
        }
    })

    win3.loadFile('src/proveedores.html')

    win3.once("ready-to-show", () => {
        win3.show()
    })

})
// iniciar proveedores.html

// terminar proceso cuando todas las ventanas esten cerradas
app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});



