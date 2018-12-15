inicializarFiltros = ()=>
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
            { name: "N°",id:"no", type: "none" },
            { name: "",id:"nombre_corto", type: "text" },
            { name: "",id:"nombre_completo", type: "text" },
            // { name: "",id:"fecha_inicio", type: "none" },
            // { name: "",id:"fecha_termino", type: "none" },
            { name: "",id:"responsable", type: "none" },
            { name: "",id:"proyectos", type: "none" },
            { name: "",id:"modulos", type: "none" },
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

listarEmpleados = ()=>
{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: "../Controller/EmpleadosController.php?Op=Listar",
            type:"GET",
            success:(data)=>
            {
                if(typeof(data)=="object")
                {
                    empleados.push({"value":-1,"nombre":"SIN RESPONSABLE"});
                    $.each(data,(index,value)=>{
                        empleados.push({"value":value.pk,"nombre":(value.nombre+" "+value.apellidos)})
                    });
                    resolve();
                }
                else
                    reject("Error Obtener Datos","Empleados");
            },
            error:()=>
            {
                reject("Error","Error en el servidor");
            }
        });
    });
}

reconstruir = (value,index)=>
{
    ultimoNumeroGrid = index;
    let tempBtn = "";
    let tempBtn2 = "";

    let tempData = new Object();
    tempData["delete"] = [];
    tempData["no"] = index;
    tempData["PK"] = value.pk;
    tempData["nombre_corto"] = value.nombre_corto;
    tempData["nombre_completo"] = value.nombre_completo;
    // tempData["fecha_inicio"] = value.fecha_inicio;
    // tempData["fecha_termino"] = value.fecha_termino;
    tempData["responsable"] = value.fk_empleado==null?-1:value.fk_empleado;
    // tempData["proyectos"] = value.pk;
    tempBtn = $("<a>",{class:"waves-effect waves-omg flow-text modal-trigger",href:"#modalAdministrarProyectos",onclick:"abrirModalAdministrarProyectos(this)"});
    $(tempBtn)[0]["customData"] = value.pk;
    $(tempBtn).append("<i class='material-icons'>business_center</i>");
    tempData["proyectos"] = tempBtn;


    tempBtn2 = $("<a>",{class:"waves-effect waves-omg flow-text modal-trigger",href:"#modalMostrarModulos",onclick:"abrirModalMostrarModulos(this)"});
    $(tempBtn2)[0]["customData"] = value.pk;
    $(tempBtn2).append("<i class='material-icons'>apps</i>");
    tempData["modulos"] = tempBtn2;
    // tempData["responsable"] = value.responsable==null? " <a class='waves-effect waves-omg flow-text modal-trigger' href='#modalAgregarUsuario'><i class='material-icons'>person_add</i></a>" : value.responsable;
    // temporal = $("<div>").append($("<a>",{class:'waves-effect waves-omg flow-text trigger',href:'#modalAgregarResponsable'}).append( $("<i>",{class:'material-icons',html:'person_add'})))
    // tempData["responsable"] = value.responsable==null? $(temporal).html()
    // " <a class='waves-effect waves-omg flow-text modal-trigger' href='#modalAgregarUsuario'><i class='material-icons'>person_add</i></a>"
    
    // : value.responsable;
    // $(tempData["responsable"])[0]["dataCustom"]=value;

    // tempData["usuario"] = value.usuario == null? '<a'+" onclick='pasarDatosAgregarUsuario("+JSON.stringify(value)+")'"+' id="cerrarSesion" class="waves-effect waves-omg flow-text modal-trigger" href="#modalAgregarUsuario" ><i class="material-icons red-text">accessibility</i></a>':
    // value.usuario;
    // '<a id="cerrarSesion" class="waves-effect waves-omg flow-text" href="#!">'+value.usuario+'</a>';
    
    tempData["delete"].push({pk:tempData["PK"]});
    value.usuario==null? tempData["delete"].push({eliminar:1}) : tempData["delete"].push({eliminar:0});
    tempData["delete"].push({editar:1});
    return  tempData;
}

guardarCliente = (data)=>
{
    console.log(data);
    data.nombre_corto = $(data.nombre_corto).val();
    data.nombre_completo = $(data.nombre_completo).val();
    data.fecha_inicio = $(data.fecha_inicio).val();
    data.fecha_termino = $(data.fecha_termino).val();
    $.ajax({
        url: "../Controller/ClientesController.php?Op=AgregarCliente",
        type: "POST",
        data: "DATA="+JSON.stringify(data),
        beforeSend:()=>
        {
            growlWait("Agregar Usuario","Agregando...");
        },
        success:(resp)=>
        {
            if(typeof(resp)=="object")
            {
                resp.length==0?
                    growlError("Error Agregar Usuario","Se Agrego El Usuario Pero No Se Pudo Actualizar La Vista")
                :
                (
                    growlSuccess("Agregar Usuario","Se Agrego El Usuario"),
                    componerDataListado(resp[0]),
                    componerDataGrid(),
                    gridInstance.loadData()
                )
            }
            else
                growlError("Error Agregar Usuario","No Se Pudo Agregar Usuario");
        },
        error:()=>
        {
            growlError("Error","Error en el servidor");
        }
    });
}

saveUpdateToDatabase = (args)=>
{
    // console.log(args);
    // console.log("saveUpdatetodatabase");
    let columnas = new Object();
    let PK = args["item"]["PK"];
    $.each(args["item"],(index,value)=>{
        if(index!="PK" && index!="modulos" && index!="delete")
        {
            if( value!=args["previousItem"][index] )
                columnas[index] = value;
        }
    });
    // console.log(columnas);
    if(Object.keys(columnas).length != 0)
    {
        columnas["PK"] = PK;
        $.ajax({
            url: "../Controller/ClientesController.php?Op=EditarCliente",
            type: "GET",
            data: "datos="+JSON.stringify(columnas),
            beforeSend:()=>
            {
                growlWait("Editando","...");
            },
            success:(resp)=>
            {
                typeof(resp)=="object"? resp.length > 0 ?(
                    growlSuccess("Editar","Cliente Editado"),
                    $.each(dataListado,(index,value)=>{
                        if(value["pk"] == PK)
                        {
                            dataListado[index] = resp[0];
                        }
                    })
                ): growlError("Error Editar Cliente","Se edito el cliente pero fallo al mostrar en la vista") : growlError("Error Editar","Error al editar el cliente");
                // console.log(dataListado);
                componerDataGrid();
                gridInstance.loadData();
            },
            error:()=>
            {
                growlError("Error","Error en el servidor");
                componerDataGrid();
                gridInstance.loadData();
            }
        });
    }
    else
    {
        componerDataGrid();
        gridInstance.loadData();
    }
}

gridFechaEditarProyecto = (obj)=>
{
    $("#editarFechaGrid_CreacionInput")[0]["elementDestinoDate"] = obj;
    $("#editarFechaGrid_CreacionInput").click();
}

componerDataListado = (value)=>// id de la vista documento, listo
{
    id_vista = value.pk;
    id_string = "pk";
    $.each(dataListado,function(indexList,valueList)
    {
        $.each(valueList,function(ind,val)
        {
            if(ind == id_string)
                    ( val==id_vista) ? dataListado[indexList]=value : console.log();
        });
    });
}

componerDataGrid = ()=>//listo
{
    __datos = [];
    $.each(dataListado,function(index,value){
        __datos.push(reconstruir(value,index+1));
    });
    DataGrid = __datos;
}

abrirModalAdministrarProyectos = (obj)=>
{
    let pk = $(obj)[0]["customData"];
    $("#dropdownProyectos")[0]["pk_cliente"] = "";
    $("#FechaInicio_AdministrarProyectos")[0]["id_proyecto"] = "";
    $("#nombreAdministrarP").html("");
    $("#userAdministrarP").html("");
    $("#serverAdministrarP").html("");
    $("#dbAdministrarP").html("");
    $("#passAdministrarP").html("");
    $("#FechaInicio_AdministrarProyectos").val("");
    desactivarLabel("FechaInicio_AdministrarProyectos");
    $("#FechaTermino_AdministrarProyectos").val("");
    desactivarLabel("FechaTermino_AdministrarProyectos");

    $.ajax({
        url: "../Controller/ClientesController.php?Op=ListarProyectosPermisos",
        type:"GET",
        data:"PK_CLIENTE="+pk,
        beforeSend:()=>
        {
            // growlWait("","");
        },
        success:(data)=>
        {
            if(typeof(data)=="object")
            {
                if(data.length !=0)
                {
                    let tempData = "";
                    $("#dropdownProyectos")[0]["pk_cliente"] = pk;
                    $("#dropdownProyectos").html("");
                    $.each(data,(index,value)=>{
                        if(value.user!=undefined)
                            tempData = $("<li>").append($("<a>",{onclick:'llenarInfoProyecto(this)'}).append(value.nombre+" -> ADQUIRIDO"));
                        else
                            tempData = $("<li>").append($("<a>",{onclick:'llenarInfoProyecto(this)'}).append(value.nombre+" -> NO ADQUIRIDO"));
                        $(tempData)[0]["customData"] = new Object(value);
                        $("#dropdownProyectos").append(tempData);
                    });
                }
                // else
                //     growlSuccess("","");
            }
            else
                growlError("Error Obtener Datos","");
        },
        error:()=>
        {
            gridInstance.loadData();
            growlError("Error","Error en el servidor");                        
        }
    })
}

llenarInfoProyecto = (obj)=>
{
    data = $(obj).parent()[0]["customData"];
    $("#FechaInicio_AdministrarProyectos")[0]["id_proyecto"] = data.pk;
    if(data.user!=undefined)
    {
        $("#nombreAdministrarP").html(data.nombre+"-> PROYECTO ADQUIRIDO");
        $("#userAdministrarP").html(data.user);
        $("#serverAdministrarP").html(data.server);
        $("#dbAdministrarP").html(data.db);
        $("#passAdministrarP").html(data.pass);
        $("#FechaInicio_AdministrarProyectos").val(data.fecha_inicio);
        $componentsMaterialize.activarLabel("FechaInicio_AdministrarProyectos");
        $("#FechaTermino_AdministrarProyectos").val(data.fecha_termino);
        $componentsMaterialize.activarLabel("FechaTermino_AdministrarProyectos");
    }
    else
        $("#nombreAdministrarP").html(data.nombre+"-> PROYECTO NO ADQUIRIDO");
}

agregarFechaInicio = ()=>
{
    console.log("KADS");
}

agregarProyectoAlCliente = (data)=>
{
    let pk_cliente = $("#dropdownProyectos")[0]["pk_cliente"];
    let pk_proyecto = $("#FechaInicio_AdministrarProyectos")[0]["id_proyecto"];
    if(pk_cliente!="")
    {
        $.ajax({
            url: "../Controller/ClientesController.php?Op=AgregarProyectoAlCliente",
            type: "POST",
            data: "PK_PROYECTO="+pk_proyecto+"&PK_CLIENTE="+pk_cliente+"&DATA="+JSON.stringify(data),
            beforeSend:()=>
            {
                growlWait("Agregar Proyecto","Agregando...");
            },
            success:(resp)=>
            {
                if(resp>0)
                {
                    growlSuccess("Agregar Proyecto","Proyecto Agregado");
                    $('#modalAdministrarProyectos.modal').modal('close');
                }
                else
                    growlError("Error Agregar Proyecto","No se pudo agregar el proyecto");
            },
            error:()=>
            {
                growlError("Error","Error en el servidor");
            }
        });
    }
}

abrirModalMostrarModulos = (obj)=>
{
    let pk = $(obj)[0]["customData"];
    $("#modalMostrarModulos")[0]["PK_CLIENTE"] = pk;
    $.ajax({
        url: "../Controller/ClientesController.php?Op=ListarProyectosPermisos",
        type:"GET",
        data:"PK_CLIENTE="+pk,
        beforeSend:()=>
        {
            // growlWait("","");
        },
        success:(data)=>
        {
            if(typeof(data)=="object")
            {
                if(data.length !=0)
                {
                    console.log(data);
                    let tempData = $("<ul>",{'class':'tabs'});
                    let tempData2 = "";
                    let bandera = 0;
                    $.each(data,(index,value)=>{
                        if(value.user!=undefined)
                        {
                            bandera = 1;
                            tempData2 = $("<a>",{'class':'waves-effect waves-light','onclick':'construirModulosDeProyectos(this)'}).html(value.nombre);
                            $(tempData2)[0]["customDataProyecto"] = value;
                            tempDataTodo = $(tempData).append( $("<li>",{'class':'tab light-blue darken-3'}).append( tempData2 ) );
                        }
                    });
                    bandera==1?$("#contenidoTabsMostrarModulosTitle").html(tempData):growlSuccess("","No hay proyectos agregados al cliente");;
                }
                else
                {
                    growlSuccess("","No Hay Proyectos Agregados");
                }
            }
            else
                growlError("Error Obtener Datos","");
        },
        error:()=>
        {
            gridInstance.loadData();
            growlError("Error","Error en el servidor");                        
        }
    })
}

agregarModuloAlCliente = (data)=>
{
    let pk = $("#modalMostrarModulos")[0]["PK_CLIENTE"];
    return new Promise((resolve,reject)=>{
        resolve(1);
    });
}

quitarModuloAlCliente = (data)=>
{
    return new Promise((resolve,reject)=>{
        resolve(1);
    });
}

construirModulosDeProyectos = (obj)=>
{
    // console.log(obj);
    // console.log($(obj));
    let data = $(obj)[0]["customDataProyecto"];
    growlSuccess("","EN CONSTRUCCION");
    let tempData = "";
    let divCard = "";
    let divText = "";
    $.each(data.modulos,(index,value)=>{
        tempData = $("<div>",{'class':'col s6 m6 l4 xl4'});
        divCard = $("<div>",{'class':'waves-effect waves-omg card hoverable tooltipped','style':'width:100%;background:powderblue;cursor:pointer','ondragstart':'allowDrop(event,this)',
                        'ondragend':'drag(event)','data-tooltip':value.nombre,'draggable':'true'});

        $(divCard)[0]["customData"] = value;
        
        $(divCard).append("<div class='card-image center-align flow-text'></div>");

        divText = $("<div>",{'class':'col s9 truncate','style':'min-height:45px;max-height:45px;margin-0px;margin-top:10px;width:auto'
                            }).append( "<i class='material-icons blue-text left'>extension</i>"+value.nombre );

        $(divCard).append( $(divText) );

        $(tempData).append( $(divCard) );

        if(value.permiso!=undefined)
            $("#contenidoMostrarModulosAgregados").append($(tempData));
        else
            $("#contenidoMostrarModulosExistentes").append($(tempData));
    });
    // contenidoMostrarModulosExistentes
    // contenidoMostrarModulosAgregados
    // <div class="col s6 m6 l4 xl4" style="">
    // <div ondblclick='editarModuloAccion(this)' id='cardModulo_value.pk' style='width:100%;background:powderblue;' ondragstart='allowDrop(event,this)' ondragend='drag(event)'
    // class='waves-effect waves-omg card hoverable tooltipped' data-tooltip='uunooo' draggable='true' style='cursor:pointer'>
    //     <div class="card-image center-align flow-text"></div>
    //         <div class="col s9 truncate" style="min-height:45px;max-height:45px;margin-0px;margin-top:10px;width:auto">
    //             <i class="material-icons blue-text left">extension</i>'+valuenombre+'
    //         </div>
    //     </div>
    // </div>
}