inicializarFiltros = ()=>
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
            { name: "N°",id:"no", type: "none" },
            { name: "",id:"nombre", type: "text" },
            { name: "",id:"apellidos", type: "text" },
            { name: "",id:"email", type: "text" },
            { name: "",id:"usuario", type: "none" },
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
            url: "../Controller/EmpleadosController.php?Op=Listar",
            type:"GET",
            beforeSend:()=>
            {
                growlWait("Obteniendo Datos","Empleados");
            },
            success:(data)=>
            {
                if(typeof(data)=="object")
                {
                    dataListado = data;
                    if(data.length !=0)
                    {
                        growlSuccess("Datos Obtenidos","Empleados");
                    }
                    else
                        growlSuccess("Sin Datos","Empleados");
                    $.each(data,(index,value)=>{
                        tempData.push( reconstruir(value,index+1) );
                    });
                    DataGrid = tempData;
                    gridInstance.loadData();
                }
                else
                    growlError("Error Obtener Datos","Empleados");
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
    tempData["nombre"] = value.nombre;
    tempData["apellidos"] = value.apellidos;
    tempData["email"] = value.email;

    tempData["usuario"] = value.usuario == null? '<a'+" onclick='pasarDatosAgregarUsuario("+JSON.stringify(value)+")'"+' id="cerrarSesion" class="waves-effect waves-omg flow-text modal-trigger" href="#modalAgregarUsuario" ><i class="material-icons red-text">accessibility</i></a>':
    // value.usuario;
    '<a id="cerrarSesion" class="waves-effect waves-omg flow-text" href="#!">'+value.usuario+'</a>';
    
    tempData["delete"].push({pk:tempData["PK"]});
    value.usuario==null? tempData["delete"].push({eliminar:1}) : tempData["delete"].push({eliminar:0});
    tempData["delete"].push({editar:1});
    return  tempData;
}

agregarUsuarioCheck = ()=>
{
    let datosUsuario = new Object();
    let mensajeError = "";
    let bandera = 1;
    datosUsuario["usuario"] = $("#usuarioUsuarioInput");
    datosUsuario["contra"] = $("#contrasenaUsuarioInput");
    datosUsuario["contra2"] = $("#contrasena2UsuarioInput");

    datosUsuario["contra"].val() != datosUsuario["contra2"].val()? growlError("Error Contraseña","Las Contraseñas no Coinciden")
    :(
        $.each(datosUsuario,(index,value)=>{
            if(value.val()=="")
            {
                bandera = 0;
                mensajeError += "*"+value[0].labels[0].innerHTML+"<br>";
            }
        }),
        bandera==0?growlError("Campos Requeridos",mensajeError):(
            datosUsuario["usuario"] = $("#usuarioUsuarioInput").val(),
            datosUsuario["contra"] = $("#contrasenaUsuarioInput").val(),
            datosUsuario["pk"] = $("#modalAgregarUsuario")[0]["dataCustom"]["pk"],
            agregarUsuario(datosUsuario)
        )
    );
}

pasarDatosAgregarUsuario = (data)=>
{
    $("#modalAgregarUsuario")[0]["dataCustom"] = data;
    // console.log( $("#modalAgregarUsuario") );
}

agregarUsuario = (data)=>
{
    $.ajax({
        url: "../Controller/EmpleadosController.php?Op=AgregarUsuario",
        type: "POST",
        data: "datos="+JSON.stringify(data),
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

componerDataGrid = ()=>//listo
{
    __datos = [];
    $.each(dataListado,function(index,value){
        __datos.push(reconstruir(value,index+1));
    });
    DataGrid = __datos;
}

componerDataListado = (value)=>
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

agregarEmpleadoCheck = ()=>
{
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let datosEmpleado = new Object();
    let mensajeError = "";
    let bandera = 1;

    datosEmpleado["nombre"] = $("#nombreEmpleadoInput");
    datosEmpleado["apellidos"] = $("#apellidosEmpleadoInput");
    datosEmpleado["email"] = $("#emailEmpleadoInput");

    correoEmail = regex.test(datosEmpleado["email"].val()) ? true : false;
    correoEmail?(
    $.each(datosEmpleado,(index,value)=>{
        if(value.val()=="")
        {
            bandera = 0;
            mensajeError += "*"+value[0].labels[0].innerHTML+"<br>";
        }
    }),
    bandera==0?growlError("Campos Requeridos",mensajeError):(
        datosEmpleado["nombre"] = $("#nombreEmpleadoInput").val(),
        datosEmpleado["apellidos"] = $("#apellidosEmpleadoInput").val(),
        datosEmpleado["email"] = $("#emailEmpleadoInput").val(),
        agregarEmpleado(datosEmpleado)
    )):growlError("Error Email","Email invalido");
}

agregarEmpleado = (data)=>
{
    $.ajax({
        url: "../Controller/EmpleadosController.php?Op=AgregarEmpleado",
        type: "POST",
        data: "datos="+JSON.stringify(data),
        beforeSend:()=>
        {
            growlWait("Agregar Empleado","Agregando...");
        },
        success:(resp)=>
        {
            if(typeof(resp)=="object")
            {
                resp.length==0?
                    growlError("Error Agregar Empleado","Se Agrego El Usuario Pero No Se Pudo Agregar A La Vista")
                :
                (
                    growlSuccess("Agregar Usuario","Se Agrego El Usuario"),
                    dataListado.push(resp[0]),
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

preguntarEliminar = (data)=>
{
    swal({
        title: "",
        text: "¿Eliminar Empleado?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Descartar",
        }).then((confirmacion)=>{
            if(confirmacion["value"]!=undefined)
            {
                eliminarEmpleado(data.pk);
            }
        });
        $(".swal2-popup").css("font-size","initial");
}

eliminarEmpleado = (pk)=>
{
    $.ajax({
        url: "../Controller/EmpleadosController.php?Op=EliminarEmpleado",
        type: "POST",
        data: "PK="+pk,
        beforeSend:()=>
        {
            growlWait("Eliminar Empleado","Eliminando...");
        },
        success:(resp)=>
        {
            let index1=-1;
            (resp==1)
            ?(
                growlSuccess("Eliminar Empleado","Empleado Eliminado"),
                $.each(dataListado,(index,value)=>{
                    if( value["pk"]==pk)
                    {
                        index1=index;
                    }
                })
            ):  growlError("Error Eliminar Empleado","No se pudo eliminar el Empleado");
            if( index1!=-1 )
            {
                dataListado.splice(index1,1);
                componerDataGrid();
                gridInstance.loadData();
            }
        },
        error:()=>
        {
            growlError("Error","Error en el servidor");
        }
    });
}

saveUpdateToDatabase = (args)=>
{
    let columnas = new Object();
    let PK = args["item"]["PK"];
    $.each(args["item"],(index,value)=>{
        if(index!="PK" && index!="modulos" && index!="delete")
        {
            if( value!=args["previousItem"][index] )
                columnas[index] = value;
        }
    });
    if(Object.keys(columnas).length != 0)
    {
        columnas["PK"] = PK;
        $.ajax({
            url: "../Controller/EmpleadosController.php?Op=EditarEmpleado",
            type: "POST",
            data: "datos="+JSON.stringify(columnas),
            beforeSend:()=>
            {
                growlWait("Editando Empleado","...");
            },
            success:(resp)=>
            {
                typeof(resp)=="object"? resp.length > 0 ?(
                    growlSuccess("Editar Empleado","Empleado Editado"),
                    $.each(dataListado,(index,value)=>{
                        if(value["pk"] == PK)
                        {
                            dataListado[index] = resp[0];
                        }
                    })
                ): growlError("Error Editar Empleado","Se edito el empleado pero fallo al mostrar en la vista") : growlError("Error Editar Empleado","Error al editar el empleado");
                console.log(dataListado);
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