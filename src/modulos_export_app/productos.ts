// import electron
const electron = require("electron");
const ipc = electron.ipcRenderer;
// import conexion con la base de datos
let connect = require("./database_connection.js")


// interface de los productos
class productos {
    Id?: number;
    Nombre:string;
    Tipo: string;
    Color: string;
    Cantidad: number;
    Medida?: string | null;
    Costo_unitario?: number | null;
    Proveedor?: string;
    Favorito?:boolean;
    Vendido?: boolean;
    En_espera?: boolean;
    No_vendido?: boolean;
    

// constructor
    constructor(
        id:number | undefined,
        nombre:string,
        tipo:string,
        color:string,
        cantidad: number,
        medida?:string | null,
        costo_unitario?: number | null,
        Proveedor?: string,
        favorito?: boolean,
        vendido?:boolean,
        en_espera?:boolean,
        no_vendido?:boolean
        
    ){
        this.Id = id;
        this.Nombre = nombre;
        this.Tipo = tipo;
        this.Color = color;
        this.Cantidad = cantidad;
        this.Medida = medida;
        this.Costo_unitario = costo_unitario
        this.Proveedor = Proveedor;
        this.Favorito = favorito;
        this.Vendido = vendido;
        this.En_espera = en_espera;
        this.No_vendido = no_vendido;
    }
// constructor

relacion_cantidad_costounitario(cantidad:number, costo:number):number{
    return cantidad * costo;
}
}


// ARRAYS
/* array general de productos */
var array_productos: Array<productos> = []; 

/* arrays indexof*/

var array_nombre: string[]  = [];
var array_tipo: string[] = [];
var array_color: string[] = [];
var array_proveedores: string[] = [];





                // GET function productos

// table elemento
const tabla = document.getElementById("tabla")!

function create_table_row(nuevo_prod:productos, img:HTMLImageElement): void{   
    let tbody = <HTMLTableSectionElement>document.getElementById('table-body')!;
    // rows = cabecilla de tabla, su valor sera el id del producto
    let row = document.createElement("tr");
    row.className = "table_rows_products";
    row.id = JSON.stringify(nuevo_prod.Id);
    tbody.appendChild(row);
    // row entrara al cuerpo de la tabla

    // nombre producto
    let name = document.createElement("th");
    name.innerHTML = nuevo_prod.Nombre;
    row.appendChild(name);
    name.addEventListener("dblclick", (e) => {
        e.preventDefault();
        let element = <HTMLTableHeaderCellElement> e.target;
        let parentID = element!.parentElement?.id!;

        let paragraph = `Cambiar nombre = ${nuevo_prod.Nombre}`;
        create_update_input("nombre", paragraph, "text", parentID);
    });
    // nombre producto

    // tipo producto
    let type = document.createElement("th");
    type.innerHTML = nuevo_prod.Tipo;
    row.appendChild(type);
    type.addEventListener("dblclick", (e) => {
        e.preventDefault();
        let element = <HTMLTableHeaderCellElement> e.target;
        let parentID = element!.parentElement?.id!;

        let paragraph = `Cambiar tipo = ${nuevo_prod.Tipo}`;
        create_update_input("tipo", paragraph, "text", parentID);
    })
    // tipo producto

    // color producto
    let color = document.createElement("th");
    color.innerHTML = nuevo_prod.Color;
    row.appendChild(color);
    color.addEventListener("dblclick", (e) => {
        e.preventDefault();
        let element = <HTMLTableHeaderCellElement> e.target;
        let parentID = element!.parentElement?.id!;

        let paragraph = `Cambiar color = ${nuevo_prod.Color}`;
        create_update_input("color", paragraph, "text", parentID);
    })
    // color producto

    // cantidad producto
    let cantidad = document.createElement("th");
    cantidad.innerHTML = JSON.stringify(nuevo_prod.Cantidad);
    row.appendChild(cantidad);
    cantidad.addEventListener("dblclick", (e) => {
        e.preventDefault();
        

        let element = <HTMLTableHeaderCellElement> e.target!;
        let parent = element.parentElement!;
        let parentID = parent.id;
        let product_new = new productos(
            undefined,
            parent.children[0].innerHTML,
            parent.children[1].innerHTML,
            parent.children[2].innerHTML,
            parseInt(parent.children[3].innerHTML),
            undefined,
            parseInt(parent.children[5].innerHTML),
            undefined
        );
        console.log(product_new);
       create_update_input_for_cantidad("cantidad", "number", product_new, parentID);
    })
    // cantidad producto

    // medida producto
    let medida = document.createElement("th");
    medida.innerHTML = nuevo_prod.Medida!;
    row.appendChild(medida);
    medida.addEventListener("dblclick", (e) => {
        e.preventDefault();
        let element = <HTMLTableHeaderCellElement> e.target;
        let parentID = element!.parentElement?.id!;

        let paragraph = `Cambiar medida = ${nuevo_prod.Medida}`;
        create_update_input("medida", paragraph, "text", parentID);
    })
    // medida producto

    // costo unitario producto
    let costo_unitario = document.createElement("th");
    costo_unitario.innerHTML = JSON.stringify(nuevo_prod.Costo_unitario);
    row.appendChild(costo_unitario);
    costo_unitario.addEventListener("dblclick", function(e){
        e.preventDefault();
        let element = <HTMLTableHeaderCellElement> e.target;
        let parentID = element!.parentElement?.id!;

        let paragraph = `Cambiar costo unitario = ${nuevo_prod.Costo_unitario}`
        create_update_input("costo_unitario", paragraph, "number", parentID);
    })
    // costo unitario producto

    // costo total producto
    let costo = document.createElement("th");
    costo.innerHTML = JSON.stringify(nuevo_prod.relacion_cantidad_costounitario(nuevo_prod.Cantidad, nuevo_prod.Costo_unitario!));
    row.appendChild(costo);
    // costo total producto

    // proveedor producto
    let proveedor = document.createElement("th");
    proveedor.innerHTML = nuevo_prod.Proveedor!;
    row.appendChild(proveedor);
    proveedor.addEventListener("dblclick", function(e){
        e.preventDefault();
        let element = <HTMLTableHeaderCellElement> e.target;
        let parentID = element!.parentElement?.id!;

        let parent = element.parentElement!;
        let product_new = new productos(
            undefined,
            parent.children[0].innerHTML,
            parent.children[1].innerHTML,
            parent.children[2].innerHTML,
            parseInt(parent.children[3].innerHTML),
            undefined,
            parseInt(parent.children[5].innerHTML),
            undefined
        );
        
        create_update_proveedores("proveedor", "string", product_new, parentID);
    })
    // proveedor producto

    // options
    let options = document.createElement("th");
    options.id = JSON.stringify(nuevo_prod.Id);
    options.className = "option";
    options.onclick = option
    let span = document.createElement("span");
    span.className = "spans";
    span.appendChild(img);
    options.appendChild(span);
    row.appendChild(options);

    // vendido or not that is the question

    switch(true){
        case nuevo_prod.Favorito:
             row.style.border = "solid #FFDD94";
             break;
         case nuevo_prod.Vendido:
             row.style.border = "solid #86E3CE";
             break;
         case nuevo_prod.En_espera:
             row.style.border = "solid #55DDFF";
             break;
         case nuevo_prod.No_vendido:
             row.style.border = "solid #FA897B";
             break;
    }    
}


function get_productos(){
  connect.query('SELECT * FROM `productos`', async function(error:any, result:any, fields:any){
    if(error){
        throw error
    }else{   
       for (let index = 0; index < result.length; index++) {
                function return_the_truth(resultado:number):boolean{ // funcion que determina que es falso o verdadero con respecto a vendido, en espera y no vendido
                    if(resultado === 0){
                        return false
                    }else{
                        return true
                    }
           }
           var nuevo_prod = new productos(
                result[index].id,
                result[index].nombre,
                result[index].tipo,
                result[index].color,
                result[index].cantidad,
                result[index].medida,
                result[index].costo_unitario,
                result[index].proveedor,
                return_the_truth(result[index].favorito),
                return_the_truth(result[index].vendido),
                return_the_truth(result[index].en_espera),
                return_the_truth(result[index].no_vendido)
           );
           let img = document.createElement("img");
           img.src = "./icons/elipsis.svg";
            // create table row crea el inventario fisico
           create_table_row(nuevo_prod, img);

            // pushea los productos que entran al array general de productos
           array_productos.push(nuevo_prod);

            // arrays donde van a estar los resultados nomas nombre, tipo, color, proveedor
            array_nombre.push(nuevo_prod.Nombre);
            array_tipo.push(nuevo_prod.Tipo);
            array_color.push(nuevo_prod.Color);
            array_proveedores.push(nuevo_prod.Proveedor!);

       }
       console.log(array_productos); 
    } 
});  
}

get_productos();

let reload = document.getElementById("reload_button")!;

function reload_get_products(){
     // reload function delete and create tbody
     let tbody = <HTMLTableSectionElement> document.getElementById('table-body')!;
     tbody.remove();
     // borro tbody de la tabla y vuelvo a crearlo para que la funcion pueda resetearse
     let body = document.createElement("tbody");
     body.id = 'table-body';
     tabla.appendChild(body);

    //  delete arrays
    let number_delete_array = array_productos.length;
    array_productos.splice(0, number_delete_array);

    console.log(array_productos);

     setTimeout(function(){
        get_productos(); 
     }, 300);
}

reload.addEventListener("click", function(e:Event){
    e.preventDefault();
    reload_get_products();
})

                // POST function /*SE HARA EN LA CARPETA ./AGREGAR_PRODUCTOS/PRODUCTOS_POST*/ 


// abrir agregar_producto.html
let agregar_producto_btn = document.getElementById("agregar_productos_btn")!;

agregar_producto_btn.addEventListener("click", function(event){
    event.preventDefault();
    ipc.send('open_agregar_producto.html');
})



// boton opciones en cada <tr>

function option(event:any){
    event.preventDefault();

    const body = document.getElementsByTagName("body")[0];
    const script = document.getElementById("last_element_script")!;
    let th = event.target.parentElement;
    let parentElement:HTMLTableRowElement = th.parentElement;
    let number_ID = th.parentElement!.id;
    let positionY = JSON.stringify(event.clientY);

    console.log(body.lastElementChild);
    console.log(script);
    
    
    if(body.lastElementChild === script){
    // menu
    let menu = document.createElement("div");
    menu.className = "menu_option";
    body.appendChild(menu);
    menu.style.position = "absolute";
    menu.style.left = "86vw";
    menu.style.top = `${positionY}px`;

    
    // option delete
    let menu_delete = document.createElement("span");
    menu_delete.className = "delete";
    menu_delete.innerHTML = "Borrar producto";
    menu.appendChild(menu_delete);
    menu_delete.addEventListener("click", function(event){
        event.preventDefault();
        delete_products(number_ID);

        setTimeout(function(){
            menu.remove();
            reload_get_products(); 
        }, 500);
    });
    
    // option favorite
    let menu_fav = document.createElement("span");
    menu_fav.className = "fav";
    menu_fav.innerHTML = "Favorito";
    menu.appendChild(menu_fav);
    menu_fav.addEventListener("click", function(e){
        e.preventDefault();
        UPDATE_marks(1,0,0,0, number_ID);
        setTimeout(function(){
            menu.remove();
            reload_get_products(); 
        }, 500);
    })

    // option tag vendido
    let menu_sell = document.createElement("span");
    menu_sell.className = "sell";
    menu_sell.innerHTML = "Vendido";
    menu.appendChild(menu_sell);
    menu_sell.addEventListener("click", function(e){
        e.preventDefault();
        UPDATE_marks(0,1,0,0, number_ID);
        setTimeout(function(){
            menu.remove();
            reload_get_products(); 
        }, 500);
    })

    // option tag en espera
    let menu_waiting = document.createElement("span");
    menu_waiting.className = "waiting";
    menu_waiting.innerHTML = "En espera";
    menu.appendChild(menu_waiting);
    menu_waiting.addEventListener("click", function(e){
        e.preventDefault();
        UPDATE_marks(0,0,1,0, number_ID);
        setTimeout(function(){
            menu.remove();
            reload_get_products(); 
        }, 500);
    })

    // option tag no vendido
    let menu_unsold = document.createElement("span");
    menu_unsold.className = "unsold";
    menu_unsold.innerHTML = "No vendido";
    menu.appendChild(menu_unsold);
    menu_unsold.addEventListener("click", function(e){
        e.preventDefault();
        UPDATE_marks(0,0,0,1, number_ID);
        setTimeout(function(){
            menu.remove();
            reload_get_products(); 
        }, 500);
    })

    }else{
        let menu = document.getElementsByClassName("menu_option")[0];
        menu.remove();
    }
}

// function mysql delete (funciona)

function delete_products(number_id: any): any{
    connect.query(`DELETE FROM productos WHERE id = ${number_id}`, function(error:any, results:any, fields:any){
        if(error){ throw error };
        console.log("numberid", number_id, "result",  results);
    })
}
// funcion UPDATE favorito, vendido, en espera, no vendido

function UPDATE_marks(number1:number, number2:number, number3:number, number4:number, ID:any): void {
    let prod = array_productos.find(element => element.Id == parseInt(ID));

    console.log(array_productos);
    console.log(number1, number2, number3, number4, ID);
    
    if(prod?.Favorito == true && number1 == 1 || prod?.Vendido == true && number2 == 1 || prod?.En_espera == true && number3 == 1 || prod?.No_vendido == true && number4 == 1){
        // call 
        connect.query(`UPDATE productos SET favorito = ?, vendido = ?, en_espera = ?, no_vendido = ? WHERE id = ?`,[0, 0, 0, 0, ID], (error:any, results:any, fields:any) => {
            if(error){ throw error }
            else{
                console.log(results);
            }
        })

    }else{
        // call
        connect.query(`UPDATE productos SET favorito = ?, vendido = ?, en_espera = ?, no_vendido = ? WHERE id = ?`,[number1, number2, number3, number4, ID], (error:any, results:any, fields:any) => {
            if(error){ throw error }
             else{
                console.log(results);
            }
    })}
}


// function UPDATE productos 

function create_update_input (SPAN:string, PARAGRAPH:string, string_or_number:string, ID:string) {
    const body = document.getElementsByTagName("body")[0];

    let create_window = document.createElement("div");
    body.appendChild(create_window);
    create_window.className = "update_window";
    let span = document.createElement("span");
    let paragraph = document.createElement("p");
    let update_inputs = <HTMLInputElement>document.createElement("input");
    let modificar = document.createElement("button");
    let cancelar = document.createElement("button");

    // create window append child
    create_window.appendChild(span);
    create_window.appendChild(paragraph);
    create_window.appendChild(update_inputs);
    create_window.appendChild(modificar);
    create_window.appendChild(cancelar);

    // html-inner
    span.innerHTML = SPAN;
    paragraph.innerHTML = PARAGRAPH;
    modificar.innerHTML = "Modificar";
    cancelar.innerHTML = "Cancelar";
    update_inputs.type = string_or_number;

    // function update
    modificar.addEventListener("click", function(e){
        e.preventDefault();
        let value = update_inputs.value;

        connect.query(`UPDATE productos SET ${SPAN} = ? WHERE id = ?`,[value, ID],function(error:any, results:any, fields:any){
            if(error){ throw error}
            else{
                console.log(results);
            }
            create_window.remove();
            reload_get_products();
        })
    });
    // funcion cancelar
    cancelar.addEventListener("click", function(e){
        e.preventDefault();
        create_window.remove();
        reload_get_products();
    });
} // funciona bien y esta terminada

function create_update_input_for_cantidad (SPAN:string, string_or_number:string, producto:productos, ID:string) {
    const body = document.getElementsByTagName("body")[0];

    let create_window = document.createElement("div");
    body.appendChild(create_window);
    create_window.className = "update_window";
    let span = document.createElement("span");
    let paragraph = document.createElement("p");
    let update_inputs = <HTMLInputElement>document.createElement("input");
    let modificar = document.createElement("button");
    let cancelar = document.createElement("button");

    // create window append child
    create_window.appendChild(span);
    create_window.appendChild(paragraph);
    create_window.appendChild(update_inputs);
    create_window.appendChild(modificar);
    create_window.appendChild(cancelar);

    // html-inner
    let cantidad = producto.Cantidad;

    span.innerHTML = SPAN;
    paragraph.innerHTML = `Cambiar cantidad = ${cantidad}`;
    modificar.innerHTML = "Modificar";
    cancelar.innerHTML = "Cancelar";
    update_inputs.type = string_or_number;

    // function update
    modificar.addEventListener("click", function(e){
        e.preventDefault();
        let value = update_inputs.value;
        
        connect.query(`UPDATE productos SET ${SPAN} = ? WHERE id = ?`,[value , ID],function(error:any, results:any, fields:any){
            if(error){ throw error}
            else{
                console.log(results);
            }
            create_window.remove();
            reload_get_products();
        })
    })
    
    // funcion cancelar
    cancelar.addEventListener("click", function(e){
        e.preventDefault();
        create_window.remove();
        reload_get_products();
    });
}


function create_update_proveedores (SPAN:string, string_or_number:string, producto:productos, ID:string) {
    const body = document.getElementsByTagName("body")[0];

    let create_window = document.createElement("div");
    body.appendChild(create_window);
    create_window.className = "update_window";
    let span = document.createElement("span");
    let paragraph = document.createElement("p");
    let update_inputs = <HTMLSelectElement>document.createElement("select");
    let modificar = document.createElement("button");
    let cancelar = document.createElement("button");

    // create window append child
    create_window.appendChild(span);
    create_window.appendChild(paragraph);
    create_window.appendChild(update_inputs);
    create_window.appendChild(modificar);
    create_window.appendChild(cancelar);

    // html-inner
    let proveedor = producto.Proveedor;

    span.innerHTML = SPAN;
    paragraph.innerHTML = `Cambiar proveedor = ${proveedor}`;
    modificar.innerHTML = "Modificar";
    cancelar.innerHTML = "Cancelar";
    
    // get proveedores options
    connect.query('SELECT nombre FROM proveedores', function(error:any, results:any, fields:any){
        if(error){ throw error}
        else{
          console.log(results.nombre)
            for (let index = 0; index < results.length; index++) {
                let create_option_element = <HTMLOptionElement> document.createElement("option");
                create_option_element.innerHTML = results[index].nombre;
                update_inputs.appendChild(create_option_element);
            }
        }
    })

    // function update
    modificar.addEventListener("click", function(e){
        e.preventDefault();
        let value = update_inputs.value;
        
        connect.query(`UPDATE productos SET ${SPAN} = ? WHERE id = ?`,[value , ID],function(error:any, results:any, fields:any){
            if(error){ throw error}
            else{
                console.log(results);
            }
            create_window.remove();
            reload_get_products();
        })
    })
    
    // funcion cancelar
    cancelar.addEventListener("click", function(e){
        e.preventDefault();
        create_window.remove();
        reload_get_products();
    });
}



// create_search_bar

let search_input = <HTMLInputElement> document.getElementById("search_input")!;
let array_btns_search: Array<string> = ["tipo", "color", "proveedor", "favorito", "vendido", "en espera", "no vendido"];
let array_main_div: Array<string> = ["nombre", "tipo", "color", "cantidad", "medida", "costo unitario", "costo total", "proveedor"];
const body_last_element = body.lastElementChild;
const header = document.getElementById("header");

search_input.addEventListener("dblclick", function(e){
    if(body.lastElementChild === body_last_element){
        e.preventDefault()
        let section_search = document.createElement("section");
        body.appendChild(section_search);
        section_search.id = "search_bar";

        // div 0 donde van los indexof de posibles resultados
        let div0 = document.createElement("div");
        div0.className = "div0";

        //div 1 donde van los tags
        let div1 = document.createElement("div");
        section_search.appendChild(div1);
        div1.className = "div1";

        //div 2 donde va la lista main 
        let div2 = document.createElement("div");
        section_search.appendChild(div2);
        div2.className = "div2";

        // div 3 donde van los resultados
        let div3 = document.createElement("div");
        section_search.appendChild(div3);
        div3.className = "div3";

        // tag_container
        let container_tag = document.createElement("span");
        container_tag.innerHTML = "nombre:";
        container_tag.id = "container_tag";
        header?.appendChild(container_tag);

        // nuevas dimensiones de search input
        search_input.style.width = "40vw";
        search_input.style.left = "10%"

        // crea btns tags
        for (let index = 0; index < array_btns_search.length; index++) {
                let btn = document.createElement("button");
                btn.innerHTML = array_btns_search[index];
                div1.appendChild(btn);

                btn.addEventListener("click", function(e){
                    e.preventDefault;
                    let evento = (<HTMLButtonElement>e.target);
                    container_tag.innerHTML = evento.textContent! + ":";
                })
        }

        // div2 producto main
       
        for (let index = 0; index < array_main_div.length; index++) {
            let element = array_main_div[index];

            let spans = document.createElement("span");
            spans.innerHTML = element;
            div2.appendChild(spans);
        }

        //  div0 posibles resultados

        let array_index_of: string[] = [];

        search_input.addEventListener("input", function(e){

            if(search_input.value.length >= 2 && search_input.value.length <=6){
                // tag: valor que busca
                let tag = container_tag.textContent;
                // value: valor del momento que es mayor o igual a 3 y puede cambiar
                let value = search_input.value;

                switch(tag){
                    case "nombre:":
                        array_nombre.forEach((element, index) => {
                            let elemento = array_nombre[index];
                            let indice = element.indexOf(value);
                            let search_elemento_repeat = array_index_of.indexOf(elemento);
                            // problema: me muestra todos los resultados, necesito tener un solo ejemplo de cada uno
                            console.log(search_elemento_repeat);
                            
                            if(value !== "" && indice !== -1 && search_elemento_repeat == -1){
                                array_index_of.push(elemento);      
                            }

                            console.log(array_index_of);

                        })
                        
                        break;
                    case "tipo:":

                        array_tipo.forEach((element, index) => {
                            let elemento = array_tipo[index];
                            let indice = element.indexOf(value);
                            let search_elemento_repeat = array_index_of.indexOf(elemento);
                            // problema: me muestra todos los resultados, necesito tener un solo ejemplo de cada uno
                            console.log(search_elemento_repeat);
                            
                            if(value !== "" && indice !== -1 && search_elemento_repeat == -1){
                                array_index_of.push(elemento);      
                            }

                            console.log(array_index_of);

                        })

                        break;
                    case "color:":

                        array_color.forEach((element, index) => {
                            let elemento = array_color[index];
                            let indice = element.indexOf(value);
                            let search_elemento_repeat = array_index_of.indexOf(elemento);
                            // problema: me muestra todos los resultados, necesito tener un solo ejemplo de cada uno
                            console.log(search_elemento_repeat);
                            
                            if(value !== "" && indice !== -1 && search_elemento_repeat == -1){
                                array_index_of.push(elemento);      
                            }

                            console.log(array_index_of);

                        })

                        break;
                    case "proveedor:":

                        array_proveedores.forEach((element, index) => {
                            let elemento = array_proveedores[index];
                            let indice = element.indexOf(value);
                            let search_elemento_repeat = array_index_of.indexOf(elemento);
                            // problema: me muestra todos los resultados, necesito tener un solo ejemplo de cada uno
                            console.log(search_elemento_repeat);
                            
                            if(value !== "" && indice !== -1 && search_elemento_repeat == -1){
                                array_index_of.push(elemento);      
                            }

                            console.log(array_index_of);

                        })

                        break;
                    }
                }else{
                let number_length_index_of = array_index_of.length;
                array_index_of.splice(0, number_length_index_of);
                }

                // promesa setea resolver o rechazar segun una condicion que implementa que el indef_of_array tenga un elemento y el div0 no tenga childrens

                var promesa_index_of_array = new Promise( function(resolve, reject){

                    if(array_index_of.length !== 0 && div0.childElementCount === 0){
                        resolve("estan los terminos para empezar a fabricar el div 0");
                    }
                    else if(search_input.value.length <= 1){
                        reject("no dan los terminos para empezar");
                    }
                })
                // si la condicion se acepta corre esta funcion
                promesa_index_of_array.then(function(response){

                    console.log(response);

                    // comportamiento de div3, div 2 y div1
                    div3.style.top = "60px";
                    div3.style.position = "relative";
                    div2.style.top = "60px";
                    div2.style.position = "relative";
                    div1.style.top = "60px";
                    div1.style.position = "relative";

                     // titulo 
                     let paragraph = document.createElement("p");
                     paragraph.innerHTML = "sugerencias:";
                     div0.appendChild(paragraph);
                     // titulo

                     for (let index = 0; index < array_index_of.length; index++) {
                         const element = array_index_of[index];
                         // crea los botones de sugerencias
                         var sug_btn = document.createElement("button");
                         sug_btn.className = "sug_btn";
                         sug_btn.innerHTML = element;
                         div0.appendChild(sug_btn);
                         sug_btn.onclick = sug_btn_function;
                     }

                 section_search.appendChild(div0);
                })
                // si no se acepta corre esta funcion
                promesa_index_of_array.catch(function(error){

                    // comportamiento de div3, div 2 y div1
                    div3.style.top = "0px";
                    div3.style.position = "static";
                    div3.style.zIndex = "2"
                    div2.style.top = "0px";
                    div2.style.position = "static";
                    div2.style.zIndex = "2";
                    div1.style.top = "0px";
                    div1.style.position = "static";
                    div1.style.zIndex = "2";

                    console.log(error);
                    
                    div0.childNodes.forEach(element =>{
                        div0.removeChild(element);
                    })

                })

        })

       
        // crea resultados previsibles div3

        search_input.addEventListener("keypress", function(e){
            
            if(e.key === "Enter"){

             
            let value_in_input = search_input.value;
            let array_new_productos : Array<productos> = [];
                
                // tengo que poder cambiar el tag mannn
                let tag = container_tag.textContent;
                

                switch(tag){
                    case "nombre:":
                        let filter_nombre = array_productos.filter(element => element.Nombre === value_in_input);
                        filter_nombre.forEach(element => array_new_productos.push(element));
                        console.log(array_new_productos);
                        break;
                    case "tipo:":
                        let filter_tipo = array_productos.filter(element => element.Tipo === value_in_input);
                        filter_tipo.forEach(element => array_new_productos.push(element));
                        break;
                    case "color:":
                        let filter_color = array_productos.filter(element => element.Color === value_in_input);
                        filter_color.forEach(element => array_new_productos.push(element));
                        break;
                    case "proveedor:":
                        let filter_proveedor = array_productos.filter(element => element.Proveedor === value_in_input);
                        filter_proveedor.forEach(element => array_new_productos.push(element));
                        break;
                    case "favorito:":
                        let filter_fav = array_productos.filter(element => element.Favorito == true);
                        filter_fav.forEach(element => array_new_productos.push(element));
                        break;
                    case "vendido:":
                        let filter_vendido = array_productos.filter(element => element.Vendido == true);
                        filter_vendido.forEach(element => array_new_productos.push(element));
                        break;
                    case "en espera:":
                        let filter_en_espera = array_productos.filter(element => element.En_espera == true);
                        filter_en_espera.forEach(element => array_new_productos.push(element));
                        break;
                    case "no vendido:":
                        let filter_no_vendido = array_productos.filter(element => element.No_vendido == true);
                        filter_no_vendido.forEach(element => array_new_productos.push(element));
                        break;
                }

                console.log(array_new_productos);
        
                for (let index = 0; index < array_new_productos.length; index++) {
                         
                let producto_element: productos = array_new_productos[index]
                
                // div contenedor de spans con informacion producto
                let producto_div = document.createElement("div")
                // SPANS
                            // span nombre
                let span1 = document.createElement("span");
                span1.innerHTML = producto_element.Nombre;
                producto_div.appendChild(span1);
        
                            // span tipo
                let span2 = document.createElement("span");
                span2.innerHTML = producto_element.Tipo;
                producto_div.appendChild(span2)
        
                            // span color
                let span3 = document.createElement("span");
                span3.innerHTML = producto_element.Color;
                producto_div.appendChild(span3);
        
                            // span cantidad
                let span4 = document.createElement("span");
                span4.innerHTML = JSON.stringify(producto_element.Cantidad);
                producto_div.appendChild(span4);
        
                            // span medida
                let span5 = document.createElement("span");
                span5.innerHTML = producto_element.Medida!;
                producto_div.appendChild(span5);
        
                            // span costo_unitario
                let span6 = document.createElement("span");
                span6.innerHTML = JSON.stringify(producto_element.Costo_unitario);
                producto_div.appendChild(span6);
        
                            // span costo total
                let span7 = document.createElement("span");
                span7.innerHTML = JSON.stringify(producto_element.relacion_cantidad_costounitario(producto_element.Cantidad, producto_element.Costo_unitario!));
                producto_div.appendChild(span7);
                
                            // span proveedores
                let span8 = document.createElement("span");
                span8.innerHTML = producto_element.Proveedor!;
                producto_div.appendChild(span8);
                // SPANS
                
                div3.appendChild(producto_div);

                div3.addEventListener("click", function(e){
                    e.preventDefault();
        
                    search_input.style.width = "50vw";
                    search_input.style.left = "3%";
                    search_input.value = "";
                    section_search.remove();
                    container_tag.remove();

                    // reload function delete and create tbody
                    let tbody = <HTMLTableSectionElement> document.getElementById('table-body')!;
                    tbody.remove();
                    // borro tbody de la tabla y vuelvo a crearlo para que la funcion pueda resetearse
                    let body = document.createElement("tbody");
                    body.id = 'table-body';
                    tabla.appendChild(body);

                    for (let index = 0; index < array_new_productos.length; index++) {
                        const element = array_new_productos[index];

                        let img = document.createElement("img");
                        img.src = "./icons/elipsis.svg";

                        create_table_row(element , img);
                        
                    }
                });


            }}
        })
    }else{
        let section_search = body.lastElementChild!;
            search_input.style.width = "50vw";
            search_input.style.left = "3%";
            header?.lastElementChild?.remove();
            section_search.remove();
    }
})


// funcion sug_btn (botones que tienen las sugerencias de busqueda)

function sug_btn_function(event:Event){
    // utiliza el texto interior del boton y se lo pasa a la barra de busqueda
    event.preventDefault();
    let btn = (<HTMLButtonElement>event.target).innerHTML;
    search_input.value = btn;
}



// function tags function

function search_tag(tag:string, array:Array<productos>, div:HTMLDivElement){
                                                                             
    let value_in_input = search_input.value;
    let array_new_productos : Array<productos> = [];

    for (let index = 0; index < array.length; index++) {   
        switch(tag){
            case "nombre":
                let filter_nombre = array_productos.filter(element => element.Nombre === value_in_input);
                filter_nombre.forEach(element => array_new_productos.push(element));
            case "tipo":
                let filter_tipo = array_productos.filter(element => element.Tipo === value_in_input);
                filter_tipo.forEach(element => array_new_productos.push(element));
            case "color":
                let filter_color = array_productos.filter(element => element.Color === value_in_input);
                filter_color.forEach(element => array_new_productos.push(element));
            case "proveedor":
                let filter_proveedor = array_productos.filter(element => element.Proveedor === value_in_input);
                filter_proveedor.forEach(element => array_new_productos.push(element));
            case "favorito":
                let filter_fav = array_productos.filter(element => element.Favorito);
                filter_fav.forEach(element => array_new_productos.push(element));
            case "vendido":
                let filter_vendido = array_productos.filter(element => element.Vendido);
                filter_vendido.forEach(element => array_new_productos.push(element));
            case "en espera":
                let filter_en_espera = array_productos.filter(element => element.En_espera);
                filter_en_espera.forEach(element => array_new_productos.push(element));
            case "no vendido":
                let filter_no_vendido = array_productos.filter(element => element.No_vendido);
                filter_no_vendido.forEach(element => array_new_productos.push(element));
        }


        let producto_element: productos = array_new_productos[index]
        
        // div contenedor de spans con informacion producto
        let producto_div = document.createElement("div")
        // SPANS
                    // span nombre
        let span1 = document.createElement("span");
        span1.innerHTML = producto_element.Nombre;
        producto_div.appendChild(span1);

                    // span tipo
        let span2 = document.createElement("span");
        span2.innerHTML = producto_element.Tipo;
        producto_div.appendChild(span2)

                    // span color
        let span3 = document.createElement("span");
        span3.innerHTML = producto_element.Color;
        producto_div.appendChild(span3);

                    // span cantidad
        let span4 = document.createElement("span");
        span4.innerHTML = JSON.stringify(producto_element.Cantidad);
        producto_div.appendChild(span4);

                    // span medida
        let span5 = document.createElement("span");
        span5.innerHTML = producto_element.Medida!;
        producto_div.appendChild(span5);

                    // span costo_unitario
        let span6 = document.createElement("span");
        span6.innerHTML = JSON.stringify(producto_element.Costo_unitario);
        producto_div.appendChild(span6);

                    // span costo total
        let span7 = document.createElement("span");
        span7.innerHTML = JSON.stringify(producto_element.relacion_cantidad_costounitario(producto_element.Cantidad, producto_element.Costo_unitario!));
        producto_div.appendChild(span7);
        
                    // span proveedores
        let span8 = document.createElement("span");
        span8.innerHTML = producto_element.Proveedor!;
        producto_div.appendChild(span8);
        // SPANS
        
        div.appendChild(producto_div);
    }
} 








// mandar request a main.js para poder abrir proveedores

let proveedores_btn = document.getElementById("proveedores_btn")!;

proveedores_btn.addEventListener("click", function(e){
    e.preventDefault();
    ipc.send('open_proveedores.html');
})