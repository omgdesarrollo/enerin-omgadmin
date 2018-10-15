$(function()
{
    $("#TAREA").keyup(function()
    {
        var valueTarea=$(this).val();
        verificarExiste(valueTarea,"tarea");
    });
    $("#btn_crearTarea").click(function()
    {
        tareaDatos=new Object();
        tareaDatos.referencia = $("#REFERENCIA").val();
        tareaDatos.tarea = $("#TAREA").val();
        tareaDatos.id_empleado = $("#ID_EMPLEADOMODAL").val();
        tareaDatos.fecha_creacion = $("#FECHA_CREACION").val();
        tareaDatos.fecha_alarma = $("#FECHA_ALARMA").val();
        tareaDatos.fecha_cumplimiento = $("#FECHA_CUMPLIMIENTO").val();
        tareaDatos.status_tarea = $("#STATUS_TAREA").val();
        tareaDatos.observaciones = $("#OBSERVACIONES").val();
        tareaDatos.archivo_adjunto = $('#fileupload').fileupload('option', 'url');
        tareaDatos.mensaje="Se le asigno la tarea: "+$("#TAREA").val()+" por el Usuario: ";
        tareaDatos.reponsable_plan= $("#ID_EMPLEADOMODAL").val();
        tareaDatos.tipo_mensaje= 0;
        tareaDatos.atendido= 'false';
        listo=
            (
//                tareaDatos.referencia!=""?
                tareaDatos.tarea!=""?
                tareaDatos.id_empleado!=""?
                tareaDatos.fecha_creacion!=""?
                tareaDatos.fecha_alarma!=""?
                tareaDatos.fecha_cumplimiento!=""?
                tareaDatos.status_tarea!=""?
//                tareaDatos.observaciones!=""?
                true: false: false: false: false: false: false                                                               
            );
        
            listo ? insertarTareas(tareaDatos):swalError("Completar campos");
    });
    
    $("#btn_limpiarModalTarea").click(function()
    {
        $("#CONTRATO").val("");
        $("#TAREA").val("");
        $("#ID_EMPLEADOMODAL").val("");
        $("#FECHA_CREACION").val("");
        $("#FECHA_ALARMA").val("");
        $("#FECHA_CUMPLIMIENTO").val("");
        $("#OBSERVACIONES").val("");        
    });
    
    
    $("#subirArchivos").click(function()
    {
        agregarArchivosUrl();
    });
    
//    $("#btn_informe").click(function()
//    {
//        loadChartView(true);
//    });

    var $btnDLtoExcel = $('#toExcel'); 
    $btnDLtoExcel.on('click', function () 
    {
//        console.log("Entro al excelexportHibrido");
        $("#listjson").excelexportHibrido({
            containerid: "listjson"
            , datatype: 'json'
            , dataset: DataGridExcel
            , columns: getColumns(DataGridExcel)
        });
    });      

}); //CIERRA $(function())

var thisEmpleados=[]; 

function inicializarFiltros()
{    
    filtros =[
            {id:"noneUno",type:"none"},
            {id:"referencia",type:"text"},
            {id:"tarea",type:"text"},
            {id:"id_empleado",type:"combobox",data:listarEmpleados(),descripcion:"nombre_completo"},
            {id:"fecha_creacion",type:"date"},
            {id:"fecha_alarma",type:"date"},
            {id:"fecha_cumplimiento",type:"date"},
//            {id:"status_tarea",type:"text"},
            {id:"status_tarea",type: "combobox",descripcion:"descripcion",
                data:[{"status_tarea":"1","descripcion":"En Proceso"},{"status_tarea":"2","descripcion":"Suspendido"},{"status_tarea":"3","descripcion":"Terminado"}]
            },
            
            {id:"observaciones",type:"text"},
            {id:"archivo_adjunto",type:"text"},
            {id:"registrar_programa",type:"text"},
            {id:"avance_programa",type:"text"},
            {id:"noneDos",type:"none"},
            {name:"opcion",id:"opcion",type:"opcion"}
         ];    
}


function construirGrid()
{
    jsGrid.fields.customControl = MyCControlField;
    db={
            loadData: function()
            {
                return DataGrid;
            },
            insertItem: function(item)
            {
                return item;
            },
        };
    
    $("#jsGrid").jsGrid({
        onInit: function(args)
        {
            gridInstance=args.grid;
            jsGrid.Grid.prototype.autoload=true;
        },
        onDataLoading: function(args)
        {
//            loadBlockUi();
        },
        onDataLoaded:function(args)
        {
            $('.jsgrid-filter-row').removeAttr("style",'display:none');
            
        },
        onRefreshing: function(args) {
        },
        
        width: "100%",
        height: "300px",
        autoload:true,
        heading: true,
        sorting: true,
        editing: true,
        paging: true,
        controller:db,
        pageLoading:false,
        pageSize: 5,
        pageButtonCount: 5,
        updateOnResize: true,
        confirmDeleting: true,
        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
//        filtering:false,
//        data: __datos,
        fields: 
        [
            { name: "id_principal",visible:false},
            { name:"no",title:"No",width:40},
            { name: "referencia",title:"Referencia", type: "textarea",width:200},
            { name: "tarea",title:"Pendiente", type: "textarea", validate: "required",width:200 },
//            { name: "id_empleado",title:"Responsable del Plan", type: "text", validate: "required" },
            { name: "id_empleado",title:"Responsable", type: "select", width:200,
                items:EmpleadosCombobox,
                valueField:"id_empleado",
                textField:"nombre_completo"
            },
            { name: "fecha_creacion",title:"Fecha de Creacion", type: "text", validate: "required", width:150,editing: false},
            { name: "fecha_alarma",title:"Fecha de Alarma", type: "text", validate: "required", width:150,},
            { name: "fecha_cumplimiento",title:"Fecha de Cumplimiento", type: "text", validate: "required", width:190,editing: false},
//            { name: "status_tarea",title:"status_tarea", type: "text", validate: "required"},
            { name: "status_tarea", title:"Estatus", type: "select", width:150,valueField:"status_tarea",textField:"descripcion",
                items:[{"status_tarea":"1","descripcion":"En Proceso"},{"status_tarea":"2","descripcion":"Suspendido"},{"status_tarea":"3","descripcion":"Terminado"}]
            },
            { name: "observaciones",title:"Observaciones", type: "textarea", width:150,},
            { name: "archivo_adjunto",title:"Archivo Adjunto", type: "text", validate: "required",width:150,editing:false },
            { name: "registrar_programa",title:"Programa", type: "text", validate: "required",width:160, editing:false },
            { name: "avance_programa",title:"Avance del Programa", type: "text", validate: "required",width:150, editing:false },      
            { name:"delete", title:"Opción", type:"customControl",sorting:""}
        ],
        onItemUpdated: function(args)
        {
            console.log(args);
            columnas={};
            id_afectado=args["item"]["id_principal"][0];
            id_empleadoActual=args["item"]["id_empleado"];
            id_empleadoAnterior=args["previousItem"]["id_empleado"];
            tarea=args["item"]["tarea"];
            
//            console.log("el nuevo: "+id_empleadoActual);
//            console.log("el que estaba: "+id_empleadoAnterior);
//            console.log("La: "+tarea);
            
            $.each(args["item"],function(index,value)
            {
                    if(args["previousItem"][index] != value && value!="")
                    {
                            if(index!="id_principal" && !value.includes("<button") && index!="delete")
                            {
                                    columnas[index]=value;
                            }
                    }
            });
            if(Object.keys(columnas).length!=0)
            {
                    $.ajax({
                            url: '../Controller/GeneralController.php?Op=Actualizar',
                            type:'GET',
                            data:'TABLA=tareas'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
//                            data:'COLUMNAS='+JSON.stringify(columnas)+"&ID="+JSON.stringify(id_afectado),
                            success:function(datos)
                            {
//                                console.log(datos);
                                if(id_empleadoActual==id_empleadoAnterior)
                                {
                                    enviarNotificacionWhenUpdate(id_empleadoActual,tarea);
                                } else{
                                    if(id_empleadoActual!=id_empleadoAnterior)
                                    {
                                        enviarNotificacionWhenRemoveTarea(id_empleadoAnterior,tarea);
                                        enviarNotificacionWhenRemoveTareaAlNuevoUsuario(id_empleadoActual,tarea);
                                    }
                                }
                                mostrarTareasEnAlarma();
                                mostrarTareasVencidas();
                                refresh();
                                swal("","Actualizacion Exitosa!","success");
                                setTimeout(function(){swal.close();},1000);
                            },
                            error:function()
                            {
                                swal("","Error en el servidor","error");
                                setTimeout(function(){swal.close();},1500);
                            }
                    });
            }
        },
        
        onItemDeleting: function(args) 
        {

        }
        
    });
    
}


var MyCControlField = function(config)
{
    jsGrid.Field.call(this, config);
};


MyCControlField.prototype = new jsGrid.Field
({
        css: "date-field",
        align: "center",
        sorter: function(date1, date2)
        {
            console.log("haber cuando entra aqui");
            console.log(date1);
            console.log(date2);
            // return 1;
        },
        itemTemplate: function(value,todo)
        {
//            console.log(value,todo);            
            if(value[0]['existe_programa']!="0" || value[0]['existe_archivo']!=0)
                return "";
            else
                return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-delete-button ',title:"Eliminar", type:'button',onClick:"preguntarEliminar("+JSON.stringify(todo)+")"});
        },
        insertTemplate: function(value)
        {
        },
        editTemplate: function(value)
        {
            val = "<input class='jsgrid-button jsgrid-update-button' type='button' title='Actualizar' onClick='aceptarEdicion()'>";
            val += "<input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancelar Edición' onClick='cancelarEdicion()'>";
            return val;
        },
        insertValue: function()
        {
        },
        editValue: function()
        {
        }
});


function cancelarEdicion()
{
    $("#jsGrid").jsGrid("cancelEdit");
}

function aceptarEdicion()
{
    gridInstance.updateItem();
}


function listarDatos()
{
    var __datos=[],__datosExcel=[];
    datosParamAjaxValues={};
    datosParamAjaxValues["url"]="../Controller/TareasController.php?Op=Listar&URL=Tareas/";
    datosParamAjaxValues["type"]="GET";
    datosParamAjaxValues["async"]=false;
    
    var variablefunciondatos=function obtenerDatosServer(data)
    {
        dataListado = data;
        $.each(data,function(index,value)
        {
            __datos.push(reconstruir(value,index+1));
        });
        
        $.each(data,function(index,value)
        {
            __datosExcel.push(reconstruirExcel(value,index+1));
        });
        DataGridExcel= __datosExcel;
    }
    var listfunciones=[variablefunciondatos];
    ajaxHibrido(datosParamAjaxValues,listfunciones);
    DataGrid = __datos;
}

//PARA FILTROS
function reconstruirTable(_datos)
{
    __datos=[];
    $.each(_datos,function(index,value)
    {
        __datos.push(reconstruir(value,index++));
        
    });
    construirGrid(__datos);
}


function reconstruir(value,index)
{
    tempData=new Object();
    ultimoNumeroGrid = index;
    tempData["id_principal"]= [{'id_tarea':value.id_tarea}];
    tempData["no"]= index;  
    tempData["referencia"]=value.referencia;
    tempData["tarea"]=value.tarea;
    tempData["id_empleado"]=value.id_empleado;
    tempData["fecha_creacion"]= getSinFechaFormato(value.fecha_creacion);
    tempData["fecha_alarma"]= getSinFechaFormato(value.fecha_alarma);
    tempData["fecha_cumplimiento"]= getSinFechaFormato(value.fecha_cumplimiento);
    tempData["status_tarea"]=value.status_tarea;
    tempData["observaciones"]=value.observaciones;
    tempData["archivo_adjunto"] = "<button onClick='mostrar_urls("+value.id_tarea+")' type='button' class='btn btn-info botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls'>";
    tempData["archivo_adjunto"] += "<i class='fa fa-cloud-upload' style='font-size: 20px'></i> Adjuntar</button>";
    if(value.existe_programa!=0)
        tempData["registrar_programa"]="<button id='btn_cargaGantt' class='btn btn-info botones_vista_tabla' onClick='cargarprogram("+value.id_tarea+")'>Vizualizar</button>";
    else
        tempData["registrar_programa"]="<button id='btn_cargaGantt' class='btn btn-info botones_vista_tabla' onClick='cargarprogram("+value.id_tarea+")'>Registrar</button>";
    tempData["avance_programa"]=(value.avance_programa*100).toFixed(2)+"%";
    tempData["delete"]= [{"existe_programa":value.existe_programa,"existe_archivo":value.archivosUpload[0].length}];
    return tempData;
}

function reconstruirExcel(value,index)
{
    tempData=new Object();
    tempData["No"]= index;  
    tempData["Referencia"]=value.referencia;
    tempData["Tarea"]=value.tarea;
    tempData["Responsable del Plan"]=value.nombre_completo;
    tempData["Fecha de Creacion"]= getSinFechaFormato(value.fecha_creacion);
    tempData["Fecha Alarma"]= getSinFechaFormato(value.fecha_alarma);
    tempData["Fecha de Cumplimiento"]= getSinFechaFormato(value.fecha_cumplimiento);
    if(value.status_tarea==1)
    {
        tempData["Status"]="En Proceso";
    }
    if(value.status_tarea==2)
    {
        tempData["Status"]="Suspendido";
    }
    if(value.status_tarea==3)
    {
        tempData["Status"]="Terminado";
    }
    tempData["Observaciones"]=value.observaciones;
//    tempData["archivo_adjunto"] = "<button onClick='mostrar_urls("+value.id_tarea+")' type='button' class='btn btn-info botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls'>";
//    tempData["archivo_adjunto"] += "<i class='fa fa-cloud-upload' style='font-size: 20px'></i> Adjuntar</button>";
//    tempData["registrar_programa"]="<button id='btn_cargaGantt' class='btn btn-info botones_vista_tabla' onClick='cargarprogram("+value.id_tarea+")'>Cargar Programa</button>";    
    tempData["Avance del Programa"]=(value.avance_programa*100).toFixed(2)+"%";
//    tempData["delete"]= [{"existe_programa":value.existe_programa,"existe_archivo":value.archivosUpload[0].length}];
    return tempData;
}


function archivoyComboboxparaModal()
{
  $('#DocumentolistadoUrl').html(" ");
  $('#DocumentolistadoUrlModal').html(" ");
  $('#DocumentoEntradaAgregarModal').html(ModalCargaArchivo);
  
  $.ajax({
      url:"../Controller/TareasController.php?Op=empleadosConUsuario",
      type:"GET",
      success:function(empleados)
      {
          tempData="";
          $.each(empleados,function(index,value)
          {
              tempData+="<option value='"+value.id_empleado+"'>"+value.nombre_completo+"</option>";
          }); 
          
          $("#ID_EMPLEADOMODAL").html(tempData);
      }
  });
  
  $('#fileupload').fileupload({
                url: '../View/'
        });
  
}


function listarEmpleados()
{
    $.ajax({
        url:"../Controller/EmpleadosController.php?Op=nombresCompletos",
        type:"GET",
        async:false,
        success:function(empleadosComb)
        {
            EmpleadosCombobox=empleadosComb;
        }
    });
    return EmpleadosCombobox;
}


function insertarTareas(tareaDatos)
{
    console.log(tareaDatos);
    $.ajax({
        url:"../Controller/TareasController.php?Op=Guardar",
        type:"POST",
        data:"tareaDatos="+JSON.stringify(tareaDatos),
        async:false,
        success:function(datos)
        {
//            alert("valor datos: "+datos);
//            console.log(datos);
            if(typeof(datos) == "object")
            {
                
//                console.log(datos);
                tempData;
                swalSuccess("Tarea Creada");                
                $.each(datos,function(index,value)
                {
                   tempData= reconstruir(value,ultimoNumeroGrid+1);  
//                   console.log(value.id_empleado); 
                });
                console.log(tempData);
                
                $("#jsGrid").jsGrid("insertItem",tempData).done(function()
                {
                    $("#crea_tarea .close ").click();
                });
                mostrarTareasEnAlarma();
                mostrarTareasVencidas();
                
            } else{
                if(datos==0)
                {
                    swalError("Error, No se pudo crear la Tarea");                    
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

function verificarExiste(dataString,cualverificar)
{

$.ajax({
    url: "../Controller/TareasController.php?Op=verificarTarea&cualverificar="+cualverificar,
    type: "POST",
    data: "cadena="+dataString,
    success: function(data) 
    {    
        mensajeerror="";

        $.each(data, function (index,value) {
            mensajeerror=" La Tarea "+value.tarea+" Ya Existe";
        });
        $("#msgerrorTarea").html(mensajeerror);
        if(mensajeerror!=""){
            $("#msgerrorTarea").css("background","orange");
            $("#msgerrorTarea").css("width","190px");
            $("#msgerrorTarea").css("color","white");
            $("#btn_crearTarea").prop("disabled",true);
        }else{
            $("#btn_crearTarea").prop("disabled",false);
        }
    }
    })
}


function mostrar_urls(id_tarea)
{
        var tempDocumentolistadoUrl = "";
        URL = 'Tareas/'+id_tarea;
        $.ajax({
                url: '../Controller/ArchivoUploadController.php?Op=listarUrls',
                type: 'GET',
                data: 'URL='+URL+'&SIN_CONTRATO=',
                async:false,
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
                        tempDocumentolistadoUrl = tempDocumentolistadoUrl + "<br><input id='tempInputIdDocumento' type='text' style='display:none;' value='"+id_tarea+"'>";
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

var ModalCargaArchivo = "<form id='fileupload' method='POST' enctype='multipart/form-data'>";
                ModalCargaArchivo += "<div class='fileupload-buttonbar'>";
                ModalCargaArchivo += "<div class='fileupload-buttons'>";
                ModalCargaArchivo += "<span class='fileinput-button'>";
                ModalCargaArchivo += "<span><a >Agregar Archivos(Click o Arrastrar)...</a></span>";
                ModalCargaArchivo += "<input type='file' name='files[]' multiple></span>";
                ModalCargaArchivo += "<span class='fileupload-process'></span></div>";
                ModalCargaArchivo += "<div class='fileupload-progress' >";
                ModalCargaArchivo += "</div></div>";
                ModalCargaArchivo += "<table role='presentation'><tbody class='files'></tbody></table></form>";
                

months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];


function agregarArchivosUrl()
{
        var ID_TAREA = $('#tempInputIdDocumento').val();
        url = 'Tareas/'+ID_TAREA,
        $.ajax({
                url: "../Controller/ArchivoUploadController.php?Op=CrearUrl",
                type: 'GET',
                data: 'URL='+url+'&SIN_CONTRATO=',
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
                text: "Confirme para eliminar el Archivo",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true
                }, function()
                {
                        var ID_TAREA = $('#tempInputIdDocumento').val();
                        $.ajax({
                                url: "../Controller/ArchivoUploadController.php?Op=EliminarArchivo",
                                type: 'GET',
                                data: 'URL='+url+'&SIN_CONTRATO=',
                                success: function(eliminado)
                                {
                                        // eliminar = eliminado;
                                        if(eliminado)
                                        {
                                                mostrar_urls(ID_TAREA);
                                                refresh();
                                                swal("","Archivo eliminado");
                                                setTimeout(function(){swal.close();},1000);
                                        }
                                        else
                                                swal("","Ocurrio un error al eliminar el archivo", "error");
                                },
                                error:function()
                                {
                                        swal("","Ocurrio un error al elimiar el archivo", "error");
                                }
                        });
                });
}


function preguntarEliminar(data)
{
    // valor = true;
    swal({
        title: "",
        text: "¿Eliminar Registro?",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        },
        function(confirmacion)
        {
            if(confirmacion)
            {
                eliminarRegistro(data);
            }
            else
            {
            }
        });
        // return eliminarRegistro(data.id_principal[0].id_contrato);
}

function eliminarRegistro(item)
{
//    alert("Entro a la funcion eliminar: "+item);
    id_afectado= item['id_principal'][0];
    id_empleadoActual=item["id_empleado"];
    tarea=item["tarea"];
//    console.log("ID Eliminado: "+id_empleadoActual);
//    console.log("TArea Eliminada: "+tarea);  
    
    $.ajax({
        url:"../Controller/TareasController.php?Op=Eliminar",
        type:"POST",
        data:"ID_TAREA="+JSON.stringify(id_afectado),
        success:function(data)
        {
//            alert("Entro al success "+data);
            if(data==false)
            {
                swalError("La Tarea tiene cargado un Programa");
                
            }else{
                if(data==true)
                {
                    refresh();
                    swalSuccess("Se elimino correctamente La Tarea");
                    enviarNotificacionWhenDeleteTarea(id_empleadoActual,tarea);
                }
            }
        },
        error:function()        
        {
//            swal("","Error en el servidor","error");
//            setTimeout(function(){swal.close();},1500);
              swalSuccess("Error en el servidor");
        }
    });
}


function refresh()
{
   listarEmpleados();
   listarDatos();
   inicializarFiltros();
   construirFiltros();
   gridInstance.loadData();
   $(".jsgrid-grid-body").css({"height":"171px"});
}

function loadSpinner()
{
    myFunction();
}


function enviarNotificacionWhenUpdate(id_empleado,tarea)

{
        $.ajax({
            url:"../Controller/TareasController.php?Op=enviarNotificacionWhenUpdate",
            data: "ID_EMPLEADO="+id_empleado+"&TAREA="+tarea,
            success:function(response)
            {
//            (response==true)?(
//                growlSuccess("Notificación","Se notifico del cambio")
//                // swalSuccess("Se notifico del cambio "),
//                //  refresh()
//                )
//            :growlError("Error Notificación","No se pudo notificar el cambio");
            
            },
            error:function()
            {
//            growlError("Error Notificación","Error en el servidor");
            // swalError("Error en el servidor");
            }
        });
}


function enviarNotificacionWhenRemoveTarea(id_empleadoAnterior,tarea)

{
        $.ajax({
            url:"../Controller/TareasController.php?Op=enviarNotificacionWhenRemoveTarea",
            data: "ID_EMPLEADO="+id_empleadoAnterior+"&TAREA="+tarea,
            success:function(response)
            {
            
            },
            error:function()
            {

            }
        });
}


function enviarNotificacionWhenRemoveTareaAlNuevoUsuario(id_empleadoActual,tarea)

{
        $.ajax({
            url:"../Controller/TareasController.php?Op=enviarNotificacionWhenRemoveTareaAlNuevoUsuario",
            data: "ID_EMPLEADO="+id_empleadoActual+"&TAREA="+tarea,
            success:function(response)
            {
            
            },
            error:function()
            {
                
            }
        });
}


function enviarNotificacionWhenDeleteTarea(id_empleadoActual,tarea)
{
    $.ajax({
            url:"../Controller/TareasController.php?Op=enviarNotificacionWhenDeleteTarea",
            data: "ID_EMPLEADO="+id_empleadoActual+"&TAREA="+tarea,
            success:function(response)
            {
            
            },
            error:function()
            {
                
            }
        });   
}

 function mostrarTareasEnAlarma()
 {
     $.ajax({
         url:"../Controller/NotificacionesTareasController.php?Op=tareasEnAlarma",
         type:"GET",
         success:function()
         {
             
         }
     });
 }
 
 
  function mostrarTareasVencidas()
 {
     $.ajax({
         url:"../Controller/NotificacionesTareasController.php?Op=tareasVencidas",
         type:"GET",
         success:function()
         {
             
         }
     });
 }

function loadBlockUi()
{
    $.blockUI({message: '<img src="../../images/base/loader.GIF" alt=""/><span style="color:#FFFFFF"> Espere Por Favor</span>', css:
    { 
        border: 'none', 
        padding: '15px', 
        backgroundColor: '#000', 
        '-webkit-border-radius': '10px', 
        '-moz-border-radius': '10px', 
        opacity: .5, 
        color: '#fff' 
    },overlayCSS: { backgroundColor: '#000000',opacity:0.1,cursor:'wait'} }); 
    setTimeout($.unblockUI, 2000);
}

//area de gantt
function cargarprogram(value){
//    alert("d  "+value);
//    window.location.href="Gantt_TareasView.php?id_tarea="+value;
    
    
    window.open("Gantt_TareasView.php?id_tarea="+value,'_blank');
}//finaliza area de gantt


//IniciaGrafica Informes
var a=0, b=0, c=0, d=0;
function obtenerDatos(bclose)
{
    a=0, b=0, c=0, d=0;
//    console.log("Entro al loadChartView");
   
   return new Promise(function(resolve,reject){ 
    $.ajax({
        url:"../Controller/TareasController.php?Op=datosGrafica",
        type:"GET",
        success:function(data)
        {
//              $("#graficaTareas").html("");
//            console.log(data);
                
            $.each(data,function(index,value)
            {
                if(value.status=="Tarea vencida")
                {
                  a++;   
                }
                if(value.status=="Alarma vencida")
                {
                  b++;   
                }
                if(value.status=="En tiempo")
                {
                  c++;   
                }
                if(value.status=="Suspendido")
                {
                  d++;   
                }
//                if(value.status=="Terminado")
//                {
//                  e++;   
//                }
            });
            resolve();
        }
    });
    
   });
//    
  

   
   
    
} //Finaliza Grafica Informes

function loadChartView(){
    
    
    obtenerDatos().then(function (){
        dibujarGrafica();
    })
}


function dibujarGrafica(){
    
        google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    
    function drawChart() {
        var data = google.visualization.arrayToDataTable([

          ['Status', 'Cantidad'],
          ['En proceso(En Tiempo)', c],
          ['En proceso(Alarma Vencida)',b],
          ['En proceso(Tiempo Vencido)', a],
          ['Suspendido', d]
//          ['Terminado', e]
        ]);

        var options = {
          title: 'Tareas',
          is3D: true,
          "width":660,
          "height":340
        };

        var chart = new google.visualization.PieChart(document.getElementById('graficaTareas'));
        chart.draw(data, options);
    } 
    
}














