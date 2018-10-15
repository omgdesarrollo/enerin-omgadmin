
$(function()
{
    $("#FOLIO_ENTRADA").keyup(function()
    {
        var valuefolioentrada=$(this).val();
        verificarExiste(valuefolioentrada,"folio_entrada");
    });

    $("#btn_guardar").click(function()
    {
        var FOLIO_REFERENCIA=$("#FOLIO_REFERENCIA").val();
        var FOLIO_ENTRADA=$("#FOLIO_ENTRADA").val();
        var FECHA_RECEPCION=$("#FECHA_RECEPCION").val();
        var ASUNTO=$("#ASUNTO").val();
        var REMITENTE=$("#REMITENTE").val();
        var ID_AUTORIDADMODAL=$("#ID_AUTORIDADMODAL").val();
        var ID_TEMAMODAL=$("#ID_TEMAMODAL").val();
        var CLASIFICACION=$("#CLASIFICACION").val();
        var STATUS_DOC=$("#STATUS_DOC").val();
        var FECHA_ASIGNACION=$("#FECHA_ASIGNACION").val();
        var FECHA_LIMITE_ATENCION=$("#FECHA_LIMITE_ATENCION").val();
        var FECHA_ALARMA=$("#FECHA_ALARMA").val();
        var DOCUMENTO=$('#fileupload').fileupload('option', 'url');
        var OBSERVACIONES=$("#OBSERVACIONES").val();
        var MENSAJE_ALERTA=$("#MENSAJE_ALERTA").val();

        datos=[];
        datos.push("");
        datos.push(FOLIO_REFERENCIA);//1
        datos.push(FOLIO_ENTRADA);//2
        datos.push(FECHA_RECEPCION);//3
        datos.push(ASUNTO);//4
        datos.push(REMITENTE);//5
        datos.push(ID_AUTORIDADMODAL);//6
        datos.push(ID_TEMAMODAL);//7
        datos.push(CLASIFICACION);//8
        datos.push(STATUS_DOC);//9
        datos.push(FECHA_ASIGNACION);//10
        datos.push(FECHA_LIMITE_ATENCION);//11
        datos.push(FECHA_ALARMA);//12
        datos.push(DOCUMENTO);//13
        datos.push(OBSERVACIONES);//14
        datos.push(MENSAJE_ALERTA);//15
        console.log(datos);
        todoBien = true;
            
        $('#ValidarFolioEntradaModal').html('');
        $('#ValidarFolioEntradaModal').removeClass("validar_formulario");
        
        $('#ValidarFechaRecepcionModal').html('');
        $('#ValidarFechaRecepcionModal').removeClass("validar_formulario");
        
        $('#ValidarAsuntoModal').html('');
        $('#ValidarAsuntoModal').removeClass("validar_formulario");
        
        $('#ValidarRemitenteModal').html('');
        $('#ValidarRemitenteModal').removeClass("validar_formulario");
        
        $('#ValidarClasificacionModal').html('');
        $('#ValidarClasificacionModal').removeClass("validar_formulario");
        
        $('#ValidarFechaAsignacionModal').html('');
        $('#ValidarFechaAsignacionModal').removeClass("validar_formulario");
        
        $('#ValidarFechaLimiteAtencionModal').html('');
        $('#ValidarFechaLimiteAtencionModal').removeClass("validar_formulario");
        
        $('#ValidarFechaAlarmaModal').html('');
        $('#ValidarFechaAlarmaModal').removeClass("validar_formulario");
        
        if(datos[2]=="")
        {
                todoBien = false;
                $('#ValidarFolioEntradaModal').html('*Campo requerido');
                $('#ValidarFolioEntradaModal').addClass("validar_formulario");
        }
        if(datos[3]=="")
        {
                todoBien = false;
                $('#ValidarFechaRecepcionModal').html('*Campo requerido');
                $('#ValidarFechaRecepcionModal').addClass("validar_formulario");
                
        }
        if(datos[4]=="")
        {
                todoBien = false;
                $('#ValidarAsuntoModal').html('*Campo requerido');
                $('#ValidarAsuntoModal').addClass("validar_formulario");
        }
        if(datos[5]=="")
        {
                todoBien = false;
                $('#ValidarRemitenteModal').html('*Campo requerido');
                $('#ValidarRemitenteModal').addClass("validar_formulario");
        }
        if(datos[8]=="")
        {
                todoBien = false;
                $('#ValidarClasificacionModal').html('*Campo requerido');
                $('#ValidarClasificacionModal').addClass("validar_formulario");
        }
            if(datos[10]!="")
            {
                    asignacionF = new Date(datos[10]);
                    asignacionF = new Date(asignacionF.getFullYear(),asignacionF.getMonth(),asignacionF.getDate());
                    if(datos[11]!="")
                    {
                            limiteF = new Date(datos[11]);
                            limiteF = new Date(limiteF.getFullYear(),limiteF.getMonth(),limiteF.getDate());
                            if(limiteF >= asignacionF)
                            {
                                    // console.log("Limite mayor o igual a la fecha de asignacion");
                                    if(datos[12]!="")
                                    {
                                            alarmaF = new Date(datos[12]);
                                            alarmaF = new Date(alarmaF.getFullYear(),alarmaF.getMonth(),alarmaF.getDate());
                                            if(limiteF < alarmaF)
                                            {
                                                    // console.log("Alarma menor o igual a la fecha de limite");
                                                    todoBien = false;
                                                    $('#ValidarFechaAlarmaModal').html('*La Fecha Alarma no puede ser mayor que la Fecha Limite');
                                                    $('#ValidarFechaAlarmaModal').addClass("validar_formulario");
                                            }
                                            if(alarmaF < asignacionF)
                                            {
                                                    // console.log("Alarma mayor o igual a la fecha de asignacion");
                                                    todoBien = false;
                                                    $('#ValidarFechaAlarmaModal').html('*La Fecha Alarma no puede ser menor que la Fecha Asginacion');
                                                    $('#ValidarFechaAlarmaModal').addClass("validar_formulario");
                                            }
                                    }
                            }
                            else
                            {
                                    // console.log("La fecha limite no puede ser antes de la asignación");
                                    todoBien = false;
                                    $('#ValidarFechaLimiteAtencionModal').html('*La Fecha Limite no puede ser menor que la Fecha Asginacion');
                                    $('#ValidarFechaLimiteAtencionModal').addClass("validar_formulario");
                            }
                    }
                    else
                    {
                            //Campo requerido limite$
                            todoBien = false;
                            $('#ValidarFechaLimiteAtencionModal').html('*Campo requerido');
                            $('#ValidarFechaLimiteAtencionModal').addClass("validar_formulario");
                    }
                    if(datos[3]!="")
                    {
                            recepcionF = new Date(datos[3]);
                            recepcionF = new Date(recepcionF.getFullYear(),recepcionF.getMonth(),recepcionF.getDate());
                            if(recepcionF > asignacionF)
                            {
                                    todoBien = false;
                                    $('#ValidarFechaRecepcionModal').html('*La Fecha de recepcion no puede ser mayor a la fecha de asignacion');
                                    $('#ValidarFechaRecepcionModal').addClass("validar_formulario");
                            }
                    }
            }
            else
            {
                    //campo requerido asignacion
                    todoBien = false;
                    $('#ValidarFechaAsignacionModal').html('*Campo requerido');
                    $('#ValidarFechaAsignacionModal').addClass("validar_formulario");
            }
            // console.log((todoBien) ? " BIEN " : "Tus valores estan mal/ se pintara en el modal todo lo que sea erroneo o incompleto");
            if(todoBien == true)
                    saveToDatabaseDatosFormulario(datos);
            else
                    swal("","Algo fallo, revise sus datos","error");
    });
                                                    
    $("#btn_limpiar").click(function()
    {
        $("#FOLIO_REFERENCIA").val("");
        $("#FOLIO_ENTRADA").val("");
        $("#FECHA_RECEPCION").val("");
        $("#ASUNTO").val("");
        $("#REMITENTE").val("");
        $("#CLASIFICACION").val("");
        $("#STATUS_DOC").val("");
        $("#FECHA_ASIGNACION").val("");
        $("#FECHA_LIMITE_ATENCION").val("");
        $("#FECHA_ALARMA").val("");
        $("#DOCUMENTO").val("");
        $("#OBSERVACIONES").val("");
    });

    // $("tbody").on('click','tr td',(obj)=>{
    //     popup(obj);
    // });
});

function inicializarFiltros()
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
                // { id:"noneUno", type:"none"},
                // { id: "id_principal", visible:false },
                { id: "folio_referencia", name: "Referencia", type: "text"},
                { id: "folio_entrada", name: "Folio Entrada", type: "text"},
                // { name: "fecha_recepcion", title: "Fecha Recepción", type: "text", width, validate: "required" },
                { id: "fecha_recepcion", name: "Fecha Recepción", type: "date"},

                { id: "asunto", name: "Asunto", type: "text"},
                { id: "remitente", name: "Remitente", type: "text"},

                { id: "id_autoridad", name: "Autoridad Remitente", type: "combobox",data:thisAutoridad,descripcion:"clave_autoridad"},

                { id: "id_tema", name: "Numero Tema", type: "combobox", data:thisTemas,descripcion:"no" },

                { id: "nombre", name: "Nombre Tema", type: "text"},
                { id: "nombre_empleado", name: "Responsable Tema", type: "text"},

                { id: "clasificacion", name: "Clasificación", type: "combobox",descripcion:"descripcion",
                        data:[{"clasificacion":1,"descripcion":"Con limite de tiempo"},{"clasificacion":2,"descripcion":"Sin limite de tiempo"},{"clasificacion":3,"descripcion":"Informativo"}]},

                { id: "status_doc",name:"Estatus", type: "combobox", descripcion:"descripcion",
                        data:[{status_doc:"1",descripcion:"PROCESO"},{status_doc:"2",descripcion:"SUSPENDIDO"},{status_doc:"3",descripcion:"TERMINADO"}]
                },

                { id: "fecha_asignacion", name: "Fecha Asignación", type: "date"},
                { id: "fecha_limite_atencion", name: "Fecha Limite Atención", type: "date"},
                { id: "fecha_alarma", name: "Fecha Alarma", type: "date"},
                // { id: "adjuntar_archivo", name: "Adjuntar Archivos", type: "text"},
                { id:"noneDos", type:"none"},
                { id: "observaciones", name: "Observaciones", type: "text"},
                // { id:"delete", name:"Opción", type:"option",sorting:""},
                { id:"opcion",type:"opcion"}
                // { id:"delete", name:"Opción", type:"customControl",sorting:""},
        ];
        resolve();
    });
}

function listarDatos()
{
    return new Promise((resolve,reject)=>
    {
        URL = 'filesDocumento/Entrada/';
        __datos=[];
        $.ajax({
                url:'../Controller/DocumentosEntradaController.php?Op=Listar',
                type: 'GET',
                data:"URL="+URL,
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
                                console.log(__datos);
                                DataGrid = __datos;
                                gridInstance.loadData();
                                resolve();
                        }
                        else
                        {
                                growlSuccess("Solicitud","No Existen Registros de Evidencias");
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

function listarAutoridades()
{
        return new Promise((resolve,reject)=>
        {
                // tempData=[];
                $.ajax({
                        url:'../Controller/AutoridadesRemitentesController.php?Op=mostrarCombo',
                        type: 'GET',
                        success:(autoridades)=>
                        {
                                // tempData = autoridades;
                                thisAutoridad = autoridades;
                                resolve("autoridades");
                        },
                        error:()=>
                        {
                            reject();
                        }
                });
        });
        
}

function listarTemas()
{
        return new Promise((resolve,reject)=>{
                $.ajax({
                        url:'../Controller/TemasOficiosController.php?Op=mostrarCombo',
                        type:'GET',
                        success:(temas)=>
                        {
                                thisTemas = temas;
                                resolve();
                        },
                        error:()=>
                        {
                            reject();
                        }
                });
        });
}

function DocumentoArchivoAgregarModalF()
{
        $('#DocumentolistadoUrl').html(" ");
        $('#DocumentolistadoUrlModal').html(" ");
        $('#DocumentoEntradaAgregarModal').html(ModalCargaArchivo);
        
        $.ajax({
                url:'../Controller/AutoridadesRemitentesController.php?Op=mostrarCombo',
                type: 'GET',
                success:function(autoridades)
                {
                        tempData = "";
                        $.each(autoridades,function(index,value)
                        {
                                tempData += "<option value='"+value.id_autoridad+"'>"+value.clave_autoridad+"</option>";
                        });
                        $("#ID_AUTORIDADMODAL").html(tempData);
                }
        });

        $.ajax({
                url:'../Controller/TemasOficiosController.php?Op=mostrarCombo',
                type:'GET',
                success:function(temas)
                {
                        tempData = "";
                        $.each(temas,function(index,value)
                        {
                                tempData += "<option value='"+value.id_tema+"'>"+value.nombre+"</option>";
                        });
                        $("#ID_TEMAMODAL").html(tempData);
                }
        });
        // $('#fileupload').fileupload();
        $('#fileupload').fileupload({
                url: '../View/'
        });
}

function reconstruir(value,index)//listoooo
{
        tempData = new Object();

        tempData["id_principal"] = [];
        tempData["id_principal"].push({"id_documento_entrada" : value.id_documento_entrada});

        if(value.salida !=0 || value.gantt!=0)
                tempData["id_principal"].push({eliminar : 0});
        else
                tempData["id_principal"].push({eliminar : 1});
        $.each(value.archivosUpload[0],function(index2,value2)
        {
                tempData["id_principal"][1]["eliminar"] = 0;
        });
        tempData["id_principal"].push({editar : 1});

        tempData["folio_referencia"] = value.folio_referencia;

        tempData["folio_entrada"] = value.folio_entrada;

        tempData["fecha_recepcion"] = value.fecha_recepcion;

        tempData["asunto"] = value.asunto;
        tempData["remitente"] = value.remitente;
        
        tempData["id_autoridad"] = value.id_autoridad;

        tempData["id_tema"] = value.id_tema;
                                
        tempData["nombre"] = value.nombre;
        
        tempData["nombre_empleado"] = value.nombre_empleado;
                                
        tempData["clasificacion"] = value.clasificacion;

        tempData["fecha_asignacion"] = value.fecha_asignacion;
        tempData["fecha_limite_atencion"] = value.fecha_limite_atencion;

        tempData["fecha_alarma"] = value.fecha_alarma;

        tempData["status_doc"] = value.status_doc;

        tempData["adjuntar_archivo"] = "<button onClick='mostrar_urls("+value.id_documento_entrada+")' type='button' class='botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls'>";
        tempData["adjuntar_archivo"] += "<i class='fa fa-cloud-upload' style='font-size: 22px'></i></button>";
                                
        tempData["observaciones"] = value.observaciones;
        tempData["delete"] = tempData["id_principal"];
        
        return tempData;
}

function compararFechaAsignacion(val,flimite,falarma)//listo
{
        limiteF = new Date(flimite);
        limiteF = new Date(limiteF.getFullYear(),limiteF.getMonth(),limiteF.getDate());
        asignacionF = new Date(val);
        asignacionF = new Date(asignacionF.getFullYear(),asignacionF.getMonth(),asignacionF.getDate());
//                        recepcionF = new Date(Frecepcion);
//                        recepcionF = new Date(recepcionF.getFullYear(),recepcionF.getMonth(),recepcionF.getDate());
//                        
//                        if(asignacionF<recepcionF)
//                        {
//                                swal("D'oh!", "La fecha de asignacion no debe ser menor que la fecha de recepcion, VERIFICA", "error");
//                                return false;
//                        }
        
        if(asignacionF>limiteF)
        {
                swal("D'oh!", "La fecha de asignacion sobrepasa la fecha limite, VERIFICA", "error");
                return false;
        }
        
        if(falarma!="0000-00-00")
        {
                alarmaF = new Date(falarma);
                alarmaF = new Date(alarmaF.getFullYear(),alarmaF.getMonth(),alarmaF.getDate());
                if(asignacionF>alarmaF)
                {
                        swal("D'oh!", "La fecha de asignacion sobrepasa la fecha de alarma, VERIFICA", "error");
                        return false;
                }
        }
        return true;
}

function compararFechaLimite(val,fasignacion,falarma)//listo
{
        limiteF = new Date(val);
        limiteF = new Date(limiteF.getFullYear(),limiteF.getMonth(),limiteF.getDate());
        asignacionF = new Date(fasignacion);
        asignacionF = new Date(asignacionF.getFullYear(),asignacionF.getMonth(),asignacionF.getDate());
        if(limiteF<asignacionF)
        {
                swal("D'oh!", "La fecha limite no debe ser menor que la fecha de asignacion, VERIFICA", "error");
                return false;
        }
        if(falarma!="0000-00-00")
        {
                alarmaF = new Date(falarma);
                alarmaF = new Date(alarmaF.getFullYear(),alarmaF.getMonth(),alarmaF.getDate());
                if(limiteF<alarmaF)
                {
                        swal("D'oh!", "La fecha limite no puede ser menor que la fecha de alarma, VERIFICA", "error");
                        return false;
                }
        }
        return true;
}

function compararFechaAlarma(val,fasignacion,flimite)//listo
{
        alarmaF = new Date(val);
        alarmaF = new Date(alarmaF.getFullYear(),alarmaF.getMonth(),alarmaF.getDate());
        limiteF = new Date(flimite);
        limiteF = new Date(limiteF.getFullYear(),limiteF.getMonth(),limiteF.getDate());
        asignacionF = new Date(fasignacion);
        asignacionF = new Date(asignacionF.getFullYear(),asignacionF.getMonth(),asignacionF.getDate());
        if(alarmaF<asignacionF)
        {
                swal("D'oh!", "La fecha de alarma no puede ser menor que la fecha de asignacion, VERIFICA", "error");
                return false;
        }
        if(alarmaF>limiteF)
        {
                swal("D'oh!", "La fecha de alarma no puede ser mayor que la fecha limite, VERIFICA", "error");
                return false;
        }
        return true;
}
                

function saveUpdateToDatabase(args)//listo
{
        console.log(args);
        columnas=new Object();
        entro=0;
        id_afectado = args['item']['id_principal'][0];
        region_fiscalTemp = args['previousItem']['region_fiscal'];
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
                if(args['previousItem'][index]!=value && value=="")
                {
                        if(index=="fecha_asignacion" || index=="fecha_limite_atencion")
                                swal("D'oh!", "La fecha de asignacion y la fecha limite no pueden ser vacias, VERIFICA", "error");
                        if(index=="fecha_alarma")
                                columnas[index]="0000-00-00";
                }
                if(index=="folio_entrada" && args['previousItem']["folio_entrada"]!=value)
                       verificar = verificarExiste(value,"folio_entrada");
        });

        if( Object.keys(columnas).length != 0 && verificar==0)
        {
                fechas = true;
                $.each(columnas,(index,value)=>
                {
                        if(index == "fecha_asignacion")
                        {
                                fechas = compararFechaAsignacion(value,args["previousItem"]["fecha_limite_atencion"],args["previousItem"]["fecha_alarma"]);
                        }
                        if(index == "fecha_limite_atencion")
                        {
                                fechas = compararFechaLimite(value,args["previousItem"]["fecha_asignacion"],args["previousItem"]["fecha_alarma"]);
                        }
                        if(index == "fecha_alarma")
                        {
                                fechas = compararFechaAlarma(value,args["previousItem"]["fecha_asignacion"],args["previousItem"]["fecha_limite_atencion"]);
                        }
                });
                if(fechas)
                {
                        $.ajax({
                        url:"../Controller/GeneralController.php?Op=Actualizar",
                        type:"POST",
                        data:'TABLA=documento_entrada'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
                        beforeSend:()=>
                        {
                                growlWait("Actualización","Espere...");
                        },
                        success:(data)=>
                        {
                                if(data==1)
                                {
                                        growlSuccess("Actulización","Se actualizaron los campos");
                                        actualizarDocumentoEntrada(id_afectado.id_documento_entrada);
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
        else
        {
                componerDataGrid();
                gridInstance.loadData();
        }
}

function componerDataListado(value)// id de la vista documento, listo
{
    id_vista = value.id_documento_entrada;
    id_string = "id_documento_entrada";
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
    console.log("jajaja",data);
    swal({
        title: "",
        text: "¿Eliminar Documento Entrada?",
        type: "info",
        showCancelButton: true,
        // closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        }).then((confirmacion)=>{
                if(confirmacion)
                {
                        eliminarDocumentoEntrada(data);
                }
        });
}

 function eliminarDocumentoEntrada(id_afectado)
 {
        $.ajax({
                url:"../Controller/DocumentosEntradaController.php?Op=Eliminar",
                type:"POST",
                data:"ID_DOCUMENTO_ENTRADA="+JSON.stringify(id_afectado),
                // beforeSend
                success:function(data)
                {
                        if(data)
                        {
                                dataListadoTemp=[];
                                dataItem = [];
                                numeroEliminar=0;
                                itemEliminar={};
                                id = id_afectado.id_documento_entrada;
                                $.each(dataListado,function(index,value)
                                {
                                        value.id_documento_entrada != id ? dataListadoTemp.push(value) : (dataItem.push(value), numeroEliminar=index+1);
                                });
                                console.log(dataListadoTemp);
                                itemEliminar = reconstruir(dataItem[0],numeroEliminar);
                                DataGrid = [];
                                dataListado = dataListadoTemp;
                                $.each(dataListado,function(index,value)
                                {
                                        DataGrid.push( reconstruir(value,index+1) );
                                });
                                gridInstance.loadData();
                                growlSuccess("Eliminación","Registro Eliminado");
                        }
                        else
                                growlError("Error Eliminación","Error al Rliminar Registro");
                },
                error:function()        
                {
                        growlError("Error Eliminación","Error del servidor");
                }
        });
 }

function actualizarDocumentoEntrada(id)
{
        url = "filesDocumento/Entrada/";
        $.ajax({
                url:'../Controller/DocumentosEntradaController.php?Op=ListarUno',
                type: 'GET',
                data:'ID_DOCUMENTO='+id+"&URL="+url,
                success:function(datos)
                {
                        if(typeof(datos)=="object")
                        {
                                // growlSuccess("Actulización","Se actualizaron los campos");
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
        
function refresh()
{
        // consultarDatos("../Controller/DocumentosEntradaController.php?Op=Listar");
        // listarDatos(-1);
        // listarTemas().then((res)=>{
        //         listarAutoridades().then((res1)=>{
        //                 inicializarEstructuraGrid().then((res2)=>{
        //                         construirGrid();
        //                         inicializarFiltros().then((res3)=>
        //                         {
        //                                 construirFiltros();
        //                                 listarDatos();
        //                         });
        //                 });
        //         });
        // });
        inicioDocumentoEntrada();
}

function verificarExiste(dataString,cualverificar)
{
        // return new Promise((resolve,reject)=>
        // {
                contador=0;
                $.ajax({
                        type: "POST",
                        url: "../Controller/DocumentosEntradaController.php?Op=verificacionexisteregistro&cualverificar="+cualverificar,
                        data: "registro="+dataString,
                        async:false,
                        success:(data)=>
                        {
                                mensajeerror="";
                                $.each(data,(index,value)=>
                                {
                                        mensajeerror="El Folio de Entrada "+value.folio_entrada+" Ya Existe";
                                        growlError("Actualizacion","El folio de entrada ya existe");
                                        contador++;
                                });
                                // if(contador==0)
                                //         resolve();
                                // else
                                //         reject();

                                $("#ValidarFolioEntradaModal").html(mensajeerror);
                                if(mensajeerror!="")
                                {
                                        $("#ValidarFolioEntradaModal").addClass("validar_formulario");
                                        $("#ValidarFolioEntradaModal").css("background","orange");
                                        $("#btn_guardar").prop("disabled",true);
                                }
                                else
                                {
                                        $("#btn_guardar").prop("disabled",false);
                                }
                        }
                });
                return contador;
        // });
}

function saveToDatabaseDatosFormulario(datos)
{
        $.ajax({
                url: "../Controller/DocumentosEntradaController.php?Op=Guardar",
                type: "POST",
                data:'FOLIO_REFERENCIA='+datos[1]+'&FOLIO_ENTRADA='+datos[2]+'&FECHA_RECEPCION='+datos[3]
                        +'&ASUNTO='+datos[4]+'&REMITENTE='+datos[5]+'&ID_AUTORIDAD='+datos[6]+'&ID_TEMA='+datos[7]+'&CLASIFICACION='+datos[8]
                        +'&STATUS_DOC='+datos[9]+'&FECHA_ASIGNACION='+datos[10]+'&FECHA_LIMITE_ATENCION='+datos[11]+'&FECHA_ALARMA='+datos[12]
                        +'&DOCUMENTO='+datos[13]+'&OBSERVACIONES='+datos[14]+'&MENSAJE_ALERTA='+datos[15],
                // async: false,
                success: function(valores)
                {
                        // consultarInformacion("../Controller/DocumentosEntradaController.php?Op=Listar");
                        if(valores != -1 && valores !=false)
                        {
                                $.ajax({
                                        url: '../Controller/ArchivoUploadController.php?Op=CrearUrl',//crea las carpetas y la sesion url
                                        type: 'GET',
                                        data: 'URL='+valores,
                                        success:function(creado)
                                        {
                                                if(creado)
                                                {
                                                        $('.start').click();
                                                        swalSuccess("Creado con exito");
                                                        $('#create-item .close').click();
                                                        refresh();
                                                }
                                        },
                                        error:function()
                                        {
                                                swalError("Error en el servidor");
                                        }
                                });
                        }
                        else
                                swalError("Error al crear");
                },
                error:function()
                {
                        swalError("Error en el servidor");
                }
        });
}

var ModalCargaArchivo = "<form id='fileupload' method='POST' enctype='multipart/form-data'>";
                ModalCargaArchivo += "<div class='fileupload-buttonbar'>";
                ModalCargaArchivo += "<div class='fileupload-buttons'>";
                ModalCargaArchivo += "<span class='fileinput-button'>";
                ModalCargaArchivo += "<span><a >Agregar Archivos(Click o Arrastrar)...</a></span>";
                ModalCargaArchivo += "<input type='file' name='files[]' multiple></span>";
                ModalCargaArchivo += "<span class='fileupload-process'></span></div>";
                ModalCargaArchivo += "<div class='fileupload-progress' >";
                // ModalCargaArchivo += "<div class='progress' role='progressbar' aria-valuemin='0' aria-valuemax='100'></div>";
                ModalCargaArchivo += "<div class='progress-extended'>&nbsp;</div>";
                ModalCargaArchivo += "</div></div>";
                ModalCargaArchivo += "<table role='presentation'><tbody class='files'></tbody></table></form>";
                
$("#subirArchivos").click(function()
{
        agregarArchivosUrl();
});
months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function mostrar_urls(id_documento_entrada)
{
        var tempDocumentolistadoUrl = "";
        URL = 'filesDocumento/Entrada/'+id_documento_entrada;
        $.ajax({
                url: '../Controller/ArchivoUploadController.php?Op=listarUrls',
                type: 'GET',
                data: 'URL='+URL,
                success: function(todo)
                {
                        if(todo[0].length!=0)
                        {
                                tempDocumentolistadoUrl = "<table class='tbl-qa'><tr><th class='table-header'>Fecha de subida</th><th class='table-header'>Nombre</th><th class='table-header'></th></tr><tbody>";
                                $.each(todo[0], function (index,value)
                                {
                                        nametmp = value.split("^-O-^-M-^-G-^");
                                        fecha = new Date(nametmp[0]*1000);
                                        fecha = fecha.getDate() +" "+ months[fecha.getMonth()] +" "+ fecha.getFullYear() +" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                                        
                                        tempDocumentolistadoUrl += "<tr class='table-row'><td>"+fecha+"</td><td>";
                                        tempDocumentolistadoUrl += "<a href=\""+todo[1]+"/"+value+"\" download='"+nametmp[1]+"'>"+nametmp[1]+"</a></td>";
                                        tempDocumentolistadoUrl += "<td><button style=\"font-size:x-large;color:#39c;background:transparent;border:none;\"";
                                        tempDocumentolistadoUrl += "onclick='borrarArchivo(\""+URL+"/"+value+"\");'>";
                                        tempDocumentolistadoUrl += "<i class=\"fa fa-trash\"></i></button></td></tr>";
                                });
                                tempDocumentolistadoUrl += "</tbody></table>";
                        }
                        if(tempDocumentolistadoUrl == " ")
                        {
                                tempDocumentolistadoUrl = " No hay archivos agregados ";
                        }
                        tempDocumentolistadoUrl = tempDocumentolistadoUrl + "<br><input id='tempInputIdDocumento' type='text' style='display:none;' value='"+id_documento_entrada+"'>";
                        // alert(tempDocumentolistadoUrl);
                        $('#DocumentoEntradaAgregarModal').html(" ");
                        $('#DocumentolistadoUrlModal').html(ModalCargaArchivo);
                        $('#DocumentolistadoUrl').html(tempDocumentolistadoUrl);
                        // $('#fileupload').fileupload();
                        $('#fileupload').fileupload({
                        url: '../View/',
                        });
                }
        });
}

function agregarArchivosUrl()
{
        var ID_DOCUMENTO = $('#tempInputIdDocumento').val();
        url = 'filesDocumento/Entrada/'+ID_DOCUMENTO,
        $.ajax({
                url: "../Controller/ArchivoUploadController.php?Op=CrearUrl",
                type: 'GET',
                data: 'URL='+url,
                success:function(creado)
                {
                        if(creado==true)
                                $('.start').click();
                },
                error:function()
                {
                        swalError("Error del servidor");
                }
        });
}

function borrarArchivo(url)
{
        swal({
                title: "ELIMINAR",
                text: "Confirme para eliminar el documento",
                type: "warning",
                showCancelButton: true,
                // closeOnConfirm: false,
                // showLoaderOnConfirm: true
                confirmButtonText:'SI'
                }).then((res)=>
                {
                        if(res)
                        {
                                var ID_DOCUMENTO = $('#tempInputIdDocumento').val();
                                $.ajax({
                                        url: "../Controller/ArchivoUploadController.php?Op=EliminarArchivo",
                                        type: 'GET',
                                        data: 'URL='+url,
                                        beforeSend:()=>
                                        {
                                                growlWait("Eliminar Archivo","Eliminando Archivo...");
                                        },
                                        success: function(eliminado)
                                        {
                                                // eliminar = eliminado;
                                                if(eliminado)
                                                {
                                                        growlSuccess("Eliminar Archivo","Archivo Eliminado");
                                                        mostrar_urls(ID_DOCUMENTO);
                                                        actualizarDocumentoEntrada(ID_DOCUMENTO);
                                                        // swal("","Archivo eliminado");
                                                        setTimeout(function(){swal.close();},1000);
                                                }
                                                else
                                                        growlError("Error Eliminar","Ocurrio un error al eliminar el archivo");
                                        },
                                        error:function()
                                        {
                                                growlError("Error","Error en el servidor");
                                        }
                                });
                        }
                });
}

                
function CambioStatusDocumentoEntrada()
{
        if ($("#STATUS_DOC").val() == 3)
        {       
                Habilitar_DesabilitarFechas(true);
        }
        else
        {
                if ($("#STATUS_DOC").val() == 1)
                {
                        Habilitar_DesabilitarFechas(false);
                }
                if ($("#STATUS_DOC").val() == 2)
                {
                        Habilitar_DesabilitarFechas(false);
                }
        }
}

function Habilitar_DesabilitarFechas(accion)
{
        $("#FECHA_ASIGNACION").prop("disabled",accion);
        $("#FECHA_LIMITE_ATENCION").prop("disabled",accion);
        $("#FECHA_ALARMA").prop("disabled",accion);
        $("#MENSAJE_ALERTA").prop("disabled",accion);
}