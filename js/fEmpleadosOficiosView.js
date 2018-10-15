$(function()
{
    $("#btn_crearEmpleado").click(function()
    {
        empleadoDatos=new Object();
        empleadoDatos.nombre_empleado = $("#NOMBRE_EMPLEADO").val();
        empleadoDatos.apellido_paterno = $("#APELLIDO_PATERNO").val();
        empleadoDatos.apellido_materno = $("#APELLIDO_MATERNO").val();
        empleadoDatos.categoria = $("#CATEGORIA").val();
        empleadoDatos.email = $("#CORREO").val();
        
        listo=
            (
                empleadoDatos.nombre_empleado!=""?
                empleadoDatos.apellido_paterno!=""?
                empleadoDatos.apellido_materno!=""?
                empleadoDatos.categoria!=""?        
                true: false: false: false: false                      
            );   
                listo ? insertarEmpleado(empleadoDatos) : swalError("Completar campos");
    });

    $("#btn_limpiarEmpleado").click(function()
    {
        $("#NOMBRE_EMPLEADO").val("");
        $("#APELLIDO_PATERNO").val("");
        $("#APELLIDO_MATERNO").val("");
        $("#CATEGORIA").val("");
        $("#CORREO").val("");
    });

    $("#CORREO").keyup(function()
    {
        correo = $("#CORREO").val();
        $("#btn_crearEmpleado").attr("disabled",true);
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        correoEmail = regex.test(correo) ? true : false;
        if(correoEmail)
        {
            $.ajax({
                url:'../Controller/EmpleadosOficiosController.php?Op=VerificaCorreo',
                type:'GET',
                data:'CORREO='+correo,
                success:function(disponible)
                {
                    if(disponible != 0)
                    {
                        swalError("Correo no disponible");
                        $("#CORREO").val(correo.slice(0,-1));
                        correoEmail=false;
                    }
                    else
                    // {
                        $("#btn_crearEmpleado").removeAttr("disabled");
                        // $.ajax({
                        //     url:'../Controller/EmpleadosController.php?Op=VerificaCorreoWeb',
                        //     type:'GET',
                        //     data:'CORREO='+correo,
                        //     success:function(exito)
                        //     {
                                
                        //     }
                        // });
                    // }
                },
                error:function()
                {
                    swalError("Error en el servidor");
                }
            });
        }
    });
    
    
    var $btnDLtoExcel = $('#toExcel'); 
    $btnDLtoExcel.on('click', function () 
    {
        __datosExcel=[]
        $.each(dataListado,function (index,value)
        {
            console.log("Entro al datosExcel");
            __datosExcel.push( reconstruirExcel(value,index+1) );
        });
        DataGridExcel= __datosExcel;
//        console.log("Entro al excelexportHibrido");
        $("#listjson").excelexportHibrido({
            containerid: "listjson"
            , datatype: 'json'
            , dataset: DataGridExcel
            , columns: getColumns(DataGridExcel)
        });
    });
    
}); //CIERRA EL $(FUNCTION())


var correoEmail=false;


function inicializarFiltros()
{
    return new Promise((resolve,reject)=>
    {
        filtros =[
            {'name':'No',id:'noneUno',type:'none'},
            {'name':'Nombre','id':'nombre_empleado',type:'text'},
            {'name':'Apellido Paterno','id':'apellido_paterno',type:'text'},
            {'name':'Apellido Materno','id':'apellido_materno',type:'text'},
            {'name':'Categoria','id':'categoria',type:'text'},
            {'name':'Correo','id':'correo',type:'text'},
            {'name':'Fecha Creación','id':'fecha_creacion',type:'date'},
            {name:"opcion",id:"opcion",type:"opcion"}
        ];
        resolve();
    });
}


function listarDatos()
{
    return new Promise((resolve,reject)=>
    {
        var __datos=[];
        $.ajax(
        {
            url:"../Controller/EmpleadosOficiosController.php?Op=Listar",
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
                    
                    $.each(data,function(index,value)
                    {
                        __datos.push(reconstruir(value,index+1));
                    });                    
                    DataGrid = __datos;
                    gridInstance.loadData();
                    resolve();
                }else{
                    growlSuccess("Solicitud","No Existen Registros");
                    reject();
                }               
            },
            error:function()
            {
                growlError("Error","Error en el servidor");
                reject();
            }
        });
    });    
}

function reconstruir(value,index)
{
    ultimoNumeroGrid = index;
    tempData = new Object();
    tempData["id_principal"] = [{'id_empleado':value.id_empleado}];
    tempData["no"]= index;
    tempData["nombre_empleado"] = value.nombre_empleado;
    tempData["apellido_paterno"] = value.apellido_paterno;
    tempData["apellido_materno"] = value.apellido_materno;
    tempData["categoria"] = value.categoria;
    tempData["correo"] = value.correo;
    tempData["fecha_creacion"] =getFechaFormatoH(value.fecha_creacion);
//    tempData["cancel"]=false;
    tempData["id_principal"].push({eliminar : 0});
    tempData["id_principal"].push({editar : 1});
    tempData["delete"]= tempData["id_principal"] ;
    return tempData;
}

function reconstruirExcel(value,index)
{
    tempData = new Object();
//    tempData["id_principal"] = [{'id_empleado':value.id_empleado}];
    tempData["No"]= index;
    tempData["Nombre"] = value.nombre_empleado;
    tempData["Apellido Paterno"] = value.apellido_materno;
    tempData["Apellido Materno"] = value.apellido_paterno;
    tempData["Categoria"] = value.categoria;
    tempData["Correo Electronico"] = value.correo;
    tempData["Fecha de Creacion"] =getFechaFormatoH(value.fecha_creacion);
//    tempData["cancel"]=false;
    return tempData;
}


function insertarEmpleado(empleadoDatos)
{
    if(correoEmail)
    {
        $.ajax({
            url:'../Controller/EmpleadosOficiosController.php?Op=Guardar',
            type:'POST',
            data:'EmpleadoDatos='+JSON.stringify(empleadoDatos),
            async:false,
            success:function(datos)
            {
                if( typeof(datos) == "object")
                {
                    tempData;
                    swalSuccess("Empleado Creado");
                    $.each(datos,function(index,value)
                    {
                        tempData = reconstruir(value,ultimoNumeroGrid+1);
                    });
                    console.log(tempData);
                    
                    $("#jsGrid").jsGrid("insertItem",tempData).done(function()
                    {
//                        $("#crea_empleado .close ").click();
                    });
                    dataListado.push(datos[0]),
                    DataGrid.push(tempData),
                    $("#crea_empleado .close ").click();
                }
                else
                {
                    if( datos == 0 )
                        swalError("Error, No se pudo crear");
                    else
                    {
                        swalInfo("Creado, Pero no listado, Actualice");
                    }
                }
            },
            error:function()
            {
                swalError("Error en el servidor");
            }
        });
    }
    else
    {
        swalInfo("El correo no es correcto");
    }
}

function saveUpdateToDatabase(args)//listo
{
        columnas=new Object();
        entro=0;
        id_afectado = args['item']['id_principal'][0];
        verificar = 0;
        $.each(args['item'],(index,value)=>
        {
                if(args['previousItem'][index]!=value && value!="")
                {
                        if(index!='id_principal' && !value.includes("<button") && index!="delete")
                        {
                                columnas[index]=value;
                        }
                }
        });
        
        if( Object.keys(columnas).length != 0 && verificar==0)
        {
            
            $.ajax({
                url:"../Controller/GeneralController.php?Op=Actualizar",
                type:"POST",
                data:'TABLA=empleados'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
                beforeSend:()=>
                {
                        growlWait("Actualización","Espere...");
                },
                success:(data)=>
                {
                        if(data==1)
                        {
                                growlSuccess("Actulización","Se actualizaron los campos");
                                actualizarEmpleado(id_afectado.id_empleado);
                        }
                        else
                        {
                                growlError("Actualización","No se pudo actualizar");
                                componerDataGrid();
                                gridInstance.loadData();
                        }
                },
                error:function()
                {
                        componerDataGrid();
                        gridInstance.loadData();
                        growlError("Error","Error del servidor");
                }
            });
        }
        else
        {
                componerDataGrid();
                gridInstance.loadData();
        }
}


 function actualizarEmpleado(id_empleado)
{
        $.ajax({
                url:'../Controller/EmpleadosOficiosController.php?Op=ListarEmpleado',
                type: 'GET',
                data:'ID_EMPLEADO='+id_empleado,
                success:function(datos)
                {
                        if(typeof(datos)=="object")
                        {
                            $.each(datos,function(index,value){
                                    componerDataListado(value);
                            });
                            componerDataGrid();
                            gridInstance.loadData();
                        }
                        else
                        {
                                growlError("Actualizar Vista","No se pudo actualizar la vista, refresque");
                                componerDataGrid();
                                gridInstance.loadData();
                        }
                },
                error:function()
                {
                        componerDataGrid();
                        gridInstance.loadData();
                        growlError("Error","Error del servidor");
                }
        });
}


function componerDataListado(value)// id de la vista documento, listo
{
    id_vista = value.id_empleado;
    id_string = "id_empleado";
    $.each(dataListado,function(indexList,valueList)
    {
        $.each(valueList,function(ind,val)
        {
            if(ind == id_string)
                    ( val==id_vista) ? dataListado[indexList]=value : console.log();
        });
    });
}

function componerDataGrid()//listo
{
    __datos = [];
    $.each(dataListado,function(index,value){
        __datos.push(reconstruir(value,index+1));
    });
    DataGrid = __datos;
}


function refresh()
{
    listarDatos();
    inicializarFiltros();
    construirFiltros();
    gridInstance.loadData();
}

