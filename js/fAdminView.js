
function inicializarFiltros()
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
            { id: "no", type: "none"},
            { id: "nombre_usuario", type: "text",},
            { id: "nombre", title:"Nombre", type: "text"},
            { id: "correo", title:"Correo", type: "text"},
            { id: "categoria", title:"Categoria", type: "text"},
            { id: "permisos", title:"Vistas", type: "none"},
            { id: "temas", title:"Temas", type: "none"},
            { id: "cumplimientos", title:"Contratos", type: "none"},
            { id:"opcion",type:"opcion"}
        ];
        resolve();
    });
}

function reconstruir(value,index)
{
    tempData = new Object();
    ultimoNumeroGrid = index;

    tempData["id_principal"] = [{id_usuario:value.id_usuario}];
    tempData["no"] = index;
    tempData["nombre_usuario"] = value.nombre_usuario;
    tempData["nombre"] = value.nombre;
    tempData["correo"] = value.correo;
    tempData["categoria"] = value.categoria;

    tempData["permisos"] = "<button onClick='modificarPermisos("+value.id_usuario+");' type='button' class='btn btn_agregar btn-success'";
    tempData["permisos"] += "data-toggle='modal' data-target='#modificarPermisos'>";
    tempData["permisos"] += "<i class='ace-icon fa fa-pencil' style='font-size: 20px;'></i></button>";

    tempData["temas"] = "<button onClick='modificarTemas("+value.id_usuario+");' type='button' class='btn btn_agregar btn-success'";
    tempData["temas"] += "data-toggle='modal' data-target='#modificarTemas'>";
    tempData["temas"] += "<i class='ace-icon fa fa-book' style='font-size: 20px;'></i></button>";

    tempData["cumplimientos"] = "<button onClick='abrirCumplimientos("+value.id_usuario+");' type='button' class='btn btn_agregar btn-success'";
    tempData["cumplimientos"] += "data-toggle='modal' data-target='#permisosContratos'>";
    tempData["cumplimientos"] += "<i class='ace-icon fa fa-book' style='font-size: 20px;'></i></button>";

    tempData["delete"] = tempData["id_principal"];
    tempData["delete"].push({eliminar:0});
    tempData["delete"].push({editar:0});
    return tempData;
}

function listarDatos()
{
    return new Promise((resolve,reject)=>
    {
        __datos=[];
        $.ajax({
            url: '../Controller/AdminController.php?Op=Listar',
            type:"GET",
            beforeSend:function()
            {
                growlWait("Solicitud","Solicitando Datos...");
            },
            success:function(data)
            {
                if(typeof(data)=="object")
                {
                    growlSuccess("Solicitud","Registros obtenidos");
                    dataListado = data;
                    $.each(data,function (index,value)
                    {
                        __datos.push( reconstruir(value,index+1) );
                    });
                    DataGrid = __datos;
                    gridInstance.loadData();
                    resolve();
                }
                else
                {
                    growlSuccess("Solicitud","No Existen Registros");
                    reject();
                }
            },
            error:function(e)
            {
                console.log(e);
                growlError("Error","Error en el servidor");
                reject();
            }
        });
    });
}

function refresh()
{
    inicializarFiltros().then((resolve)=>
    {
        construirFiltros();
        listarDatos();
    },(error)=>
    {
        growlError("Error!","Error al construir la vista, recargue la página");
    });
    // console.log(gridInstance);
    // console.log($(gridInstance));
}