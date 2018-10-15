
$(function(){
    
    $("#btn_guardar").click(function()
    {
       autoridadesDatos=new Object();
       autoridadesDatos.clave_autoridad = $("#CLAVE_AUTORIDAD").val();
       autoridadesDatos.descripcion = $("#DESCRIPCION").val();
       autoridadesDatos.direccion = $("#DIRECCION").val();
       autoridadesDatos.telefono = $("#TELEFONO").val();
       autoridadesDatos.extension = $("#EXTENSION").val();
       autoridadesDatos.email = $("#EMAIL").val();
       autoridadesDatos.direccion_web = $("#DIRECCION_WEB").val();
       
       listo=
            (
            autoridadesDatos.clave_autoridad!=""?
            autoridadesDatos.descripcion!=""?
            autoridadesDatos.direccion!=""?
            autoridadesDatos.telefono!=""?
            autoridadesDatos.extension!=""?
            autoridadesDatos.email!=""?
            autoridadesDatos.direccion_web!=""?
            true: false: false: false: false: false: false: false 
            );          
            listo ? insertarAutoridad(autoridadesDatos) : swalError("Completar campos");
    });
    
    
    $("#btn_limpiar").click(function()
    {
        $("#CLAVE_AUTORIDAD").val("");
        $("#DESCRIPCION").val();
        $("#DIRECCION").val();
        $("#TELEFONO").val();
        $("#EXTENSION").val();
        $("#EMAIL").val();
        $("#DIRECCION_WEB").val();
    });
    
}); //CIERRA EL FUNCTION


function inicializarFiltros()
{
    return new Promise((resolve,reject)=>
    {
        filtros =[
            {id:"noneUno",type:"none"},
            {id:"clave_autoridad",type:"text"},
            {id:"descripcion",type:"text"},
            {id:"direccion",type:"text"},
            {id:"telefono",type:"text"},
            {id:"extension",type:"text"},
            {id:"email",type:"text"},
            {id:"direccion_web",type:"text"},          
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
            url:"../Controller/AutoridadesRemitentesController.php?Op=Listar",
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
//    console.log("este es el value: "+value);
    tempData=new Object();
    ultimoNumeroGrid = index;
    tempData["id_principal"]= [{'id_autoridad':value.id_autoridad}];
    tempData["no"]= index;  
    tempData["clave_autoridad"]=value.clave_autoridad;
    tempData["descripcion"]=value.descripcion;
    tempData["direccion"]=value.direccion;
    tempData["telefono"]=value.telefono;
    tempData["extension"]=value.extension;
    tempData["email"]=value.email;
    tempData["direccion_web"]=value.direccion_web;
    if(value.verificacion_documento_entrada==0 && value.verificacion_documento_salida_sinfolio==0)
    {
        tempData["id_principal"].push({eliminar : 1});        
    }else{
        tempData["id_principal"].push({eliminar : 0});
    }        
    tempData["id_principal"].push({editar : 1});
    tempData["delete"]= tempData["id_principal"] ;
//    tempData["delete"]= [{"resultado":value.resultado}];
    
    return tempData;
}


function insertarAutoridad(autoridadesDatos)
{
//    alert("Entro a la funcion guardar");
        $.ajax({
        url:"../Controller/AutoridadesRemitentesController.php?Op=Guardar",
        type:"POST",
        data:"autoridadDatos="+JSON.stringify(autoridadesDatos),
        async:false,
        success:function(datos)
        {
//            alert("valor datos: "+datos);
//            console.log(datos);
            if(typeof(datos) == "object")
            {
                tempData;
                swalSuccess("Autoridad Creada");                
                $.each(datos.autoridades,function(index,value)
                {
                   tempData= reconstruir(value,ultimoNumeroGrid+1);  
                });
                
                $("#jsGrid").jsGrid("insertItem",tempData).done(function()
                {
                    
                });
                    dataListado.push(datos[0]),
                    DataGrid.push(tempData),
                    $("#crea_autoridad .close ").click();
                
            } else{
                if(datos==0)
                {
                    swalError("Error, No se pudo crear el Documento");                    
                } else{
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


function saveUpdateToDatabase(args)//listo
{
        columnas=new Object();
//        entro=0;
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
                data:'TABLA=autoridad_remitente'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
                beforeSend:()=>
                {
                        growlWait("Actualización","Espere...");
                },
                success:(data)=>
                {
                        if(data==1)
                        {
                                growlSuccess("Actulización","Se actualizaron los campos");
                                actualizarAutoridad(id_afectado.id_autoridad);
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

function actualizarAutoridad(id_autoridad)
{
        $.ajax({
                url:'../Controller/AutoridadesRemitentesController.php?Op=listarAutoridad',
                type: 'GET',
                data:'ID_AUTORIDAD='+id_autoridad,
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
                    growlError("Error","Error del servidor");
                    componerDataGrid();
                    gridInstance.loadData();
                }
        });
}


function componerDataListado(value)// id de la vista documento, listo
{
    id_vista = value.id_autoridad;
    id_string = "id_autoridad";
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


function preguntarEliminar(data)
{
//     console.log("jajaja",data);
    swal({
        title: "",
        text: "¿Eliminar Autoridad?",
        type: "info",
        showCancelButton: true,
        // closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        }).then((confirmacion)=>{
                if(confirmacion)
                {
                        eliminarAutoridad(data);
                }
        });
}

 function eliminarAutoridad(id_afectado)
 {
        $.ajax({
                url:"../Controller/AutoridadesRemitentesController.php?Op=Eliminar",
                type:"POST",
                data:"ID_AUTORIDAD="+id_afectado.id_autoridad,
                beforeSend:()=>
                {
                        growlWait("Eliminación Autoridad","Eliminando...");
                },
                success:(res)=>
                {
                        // console.log(data);
                        if(res >= 0)
                        {
                                dataListadoTemp=[];
                                dataItem = [];
                                numeroEliminar=0;
                                itemEliminar={};
                                id = id_afectado.id_autoridad;
                                $.each(dataListado,function(index,value)
                                {
                                        value.id_autoridad != id ? dataListadoTemp.push(value) : (dataItem.push(value), numeroEliminar=index+1);
                                });
                                // console.log(dataListadoTemp);
                                // itemEliminar = reconstruir(dataItem[0],numeroEliminar);este esra para el eliminar directo en grid
                                DataGrid = [];
                                dataListado = dataListadoTemp;
                                if(dataListado.length == 0 )
                                        ultimoNumeroGrid=0;
                                $.each(dataListado,function(index,value)
                                {
                                        DataGrid.push( reconstruir(value,index+1) );
                                });

                                gridInstance.loadData();
                                growlSuccess("Eliminación","Registro Eliminado");
                        }
                        else
                                growlError("Error Eliminación","Error al Eliminar Registro");
                },
                error:()=>
                {
                        growlError("Error Eliminación","Error del Servidor");
                }
        });
 }


function refresh(){
    listarDatos();
    inicializarFiltros();
    construirFiltros();
    gridInstance.loadData();
}


