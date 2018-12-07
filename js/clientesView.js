inicializarFiltros = ()=>
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
            { name: "N°",id:"no", type: "none" },
            { name: "",id:"nombre_corto", type: "text" },
            { name: "",id:"nombre_completo", type: "text" },
            { name: "",id:"fecha_inicio", type: "none" },
            { name: "",id:"fecha_termino", type: "none" },
            { name: "",id:"responsable", type: "none" },
            {name:"opcion",id:"opcion",type:"opcion"}
        ];
        resolve();
    });
}

listarDatos = () =>
{
    return new Promise((resolve,reject)=>
    {
        let tempData = [];
        $.ajax({
            url: "../Controller/ClientesController.php?Op=ListarClientes",
            type:"GET",
            beforeSend:()=>
            {
                growlWait("Obteniendo Datos","Clientes");
            },
            success:(data)=>
            {
                if(typeof(data)=="object")
                {
                    dataListado = data;
                    if(data.length !=0)
                    {
                        growlSuccess("Datos Obtenidos","Clientes");
                    }
                    else
                        growlSuccess("Sin Datos","Clientes");
                    $.each(data,(index,value)=>{
                        tempData.push( reconstruir(value,index+1) );
                    });
                    DataGrid = tempData;
                    gridInstance.loadData();
                }
                else
                    growlError("Error Obtener Datos","Clientes");
            },
            error:()=>
            {
                gridInstance.loadData();
                growlError("Error","Error en el servidor");                        
            }
        })
    });
}

reconstruir = (value,index)=>
{
    ultimoNumeroGrid = index;

    let tempData = new Object();
    tempData["delete"] = [];
    tempData["no"] = index;
    tempData["PK"] = value.pk;
    tempData["nombre_corto"] = value.nombre_corto;
    tempData["nombre_completo"] = value.nombre_completo;
    tempData["fecha_inicio"] = value.fecha_inicio;
    tempData["fecha_termino"] = value.fecha_termino;
    tempData["responsable"] = value.responsable;

    // tempData["usuario"] = value.usuario == null? '<a'+" onclick='pasarDatosAgregarUsuario("+JSON.stringify(value)+")'"+' id="cerrarSesion" class="waves-effect waves-omg flow-text modal-trigger" href="#modalAgregarUsuario" ><i class="material-icons red-text">accessibility</i></a>':
    // value.usuario;
    '<a id="cerrarSesion" class="waves-effect waves-omg flow-text" href="#!">'+value.usuario+'</a>';
    
    tempData["delete"].push({pk:tempData["PK"]});
    value.usuario==null? tempData["delete"].push({eliminar:1}) : tempData["delete"].push({eliminar:0});
    tempData["delete"].push({editar:1});
    return  tempData;
}