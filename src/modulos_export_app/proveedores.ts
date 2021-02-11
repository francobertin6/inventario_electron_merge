const body = document.getElementById("body")!;
// import conexion con la base de datos
let database_connect_proveedores = require("./database_connection.js")

let btn_create_proveedor = document.getElementById("agregar_productos")!;

// btn div_dropdown key
let first_div = document.getElementById("first_div")!;
let second_div = document.getElementById("second_div")!;

let div_dropdown = document.getElementById("dropdown_key")!;

div_dropdown.addEventListener("click", function(e){
    e.preventDefault();
    if(first_div.style.display == "none" && second_div.style.display == "none"){
    first_div.style.display = "block";
    second_div.style.display = "block";
    } else{
        first_div.style.display = "none";
        second_div.style.display = "none";
    }
})

// function post proveedores
btn_create_proveedor.addEventListener("click", function(e){
    e.preventDefault();

    // inputs value
    let nombre = <HTMLInputElement> document.getElementById("nombre")!;
    let textarea = <HTMLTextAreaElement> document.getElementById("descripcion")!;
    let email = <HTMLInputElement> document.getElementById("email")!;
    let telefono = <HTMLInputElement> document.getElementById("telefono")!;

    
    // obj
    var obj = {
        nombre: nombre.value,
        descripcion: textarea.value,
        email: email.value,
        telefono: telefono.value
    }

    console.log(obj);

    database_connect_proveedores.query('INSERT INTO proveedores SET ?', obj, function(error:any, results: any, fields:any){
        if(error){
            throw error;
        }
    })

    nombre.value = "";
    textarea.value = "";
    email.value = "";
    telefono.value = "";

    let section_proveedores = document.getElementById("proveedores_list")!;
    section_proveedores.remove();

    let new_section_proveedores = document.createElement("section");
    body.appendChild(new_section_proveedores);
    new_section_proveedores.id = "proveedores_list";
    get_proveedores();
})

//  class proveedores
class proveedores{
    Id:number;
    Nombre:string;
    Telefono?: number | null;
    Email?: string | null;
    Descripcion?: string | null;

    constructor(
        id:number,
        nombre: string,
        telefono?: number | null,
        email?: string | null,
        descripcion?: string | null
    ){
        this.Id = id;
        this.Nombre = nombre;
        this.Telefono = telefono;
        this.Email = email;
        this.Descripcion = descripcion;
    }
}

// function create proveedores (get_proveedores() = obtener los datos de la base, create_proveedores() = usar los datos de los proveedores)
function get_proveedores(){
database_connect_proveedores.query('SELECT * FROM `proveedores`', function(error:any, results:any, fields:any){
    if(error){ throw error}
    else{
        for (let index = 0; index < results.length; index++) {
            let prov =  new proveedores(
                results[index].id,
                results[index].nombre,
                results[index].telefono,
                results[index].email,
                results[index].descripcion
            )
            create_proveedores(prov);
        }
    }
})}



function create_proveedores(proveedores:proveedores){
    let section_proveedores = document.getElementById('proveedores_list')!;
    let number_id = JSON.stringify(proveedores.Id);

    // create div
    let div_proveedor = document.createElement("div");
    div_proveedor.className = JSON.stringify(proveedores.Id);
    section_proveedores.appendChild(div_proveedor);
    div_proveedor.className = "main_div";

    // create first div 
    let div1 = document.createElement("div");
    div1.className = "nombre_telefono_email";
    div_proveedor.appendChild(div1);

    // create proveedor name
    let label_nombre = document.createElement("label");
    label_nombre.innerHTML = "Nombre:";
    div1.appendChild(label_nombre);

    let paragraph_nombre = document.createElement("p");
    paragraph_nombre.innerHTML = proveedores.Nombre;
    div1.appendChild(paragraph_nombre);

    // create proveedor telefono
    let label_telefono = document.createElement("label");
    label_telefono.innerHTML = "Telefono:";
    div1.appendChild(label_telefono);

    let paragraph_telefono = document.createElement("p");
    paragraph_telefono.innerHTML = JSON.stringify(proveedores.Telefono);
    div1.appendChild(paragraph_telefono);

    // create proveedor email
    let label_email = document.createElement("label");
    label_email.innerHTML = "Email:";
    div1.appendChild(label_email);

    let paragraph_email = document.createElement("p");
    paragraph_email.innerHTML = proveedores.Email!;
    div1.appendChild(paragraph_email);

    // create second div
    let div2 = document.createElement("div");
    div2.className = "descripcion";
    div_proveedor.appendChild(div2);

    // create proveedor descripcion
    let label_descripcion = document.createElement("label");
    label_descripcion.innerHTML = "Descripcion";
    div2.appendChild(label_descripcion);

    let paragraph_descripcion = document.createElement("p");
    paragraph_descripcion.innerHTML = proveedores.Descripcion!;
    div2.appendChild(paragraph_descripcion);

    // create delete button
    let btn_delete = document.createElement("button");
    btn_delete.innerHTML = "borrar proveedor";
    btn_delete.className = "btn btn-default";
    btn_delete.id = JSON.stringify(proveedores.Id);
    div2.appendChild(btn_delete);
    btn_delete.addEventListener("click", function(e){
        e.preventDefault();
        database_connect_proveedores.query(`DELETE FROM proveedores WHERE id = ${number_id}`, (error:any, results:any, fields:any) => {
            if(error){ throw error}
        })

        // remove and reload get_proveedores
        section_proveedores.remove();
        let new_Section = document.createElement("section");
        new_Section.id = "proveedores_list";
        body.appendChild(new_Section);
        
        get_proveedores()
    })
}


get_proveedores();