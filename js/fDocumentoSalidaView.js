$(function()
{
    $("#subirArchivos").click(function()
    {
//        alert("es");
        agregarArchivosUrl();
    });
    $("#btn_guardar").click(function()
    {
        documentoSalidaDatos=new Object();
        documentoSalidaDatos.id_documento_entrada = $("#ID_DOCUMENTO_ENTRADA").val();
        documentoSalidaDatos.folio_salida = $("#FOLIO_SALIDA").val();
        documentoSalidaDatos.fecha_envio = $("#FECHA_ENVIO").val();
        documentoSalidaDatos.asunto = $("#ASUNTO").val();
        documentoSalidaDatos.destinatario = $("#DESTINATARIO").val();
//        documentoSalidaDatos.archivo_adjunto = $('#fileupload').fileupload('option', 'url');
        documentoSalidaDatos.observaciones = $("#OBSERVACIONES").val();
        listo=
            (
               documentoSalidaDatos.id_documento_entrada!=""?
               documentoSalidaDatos.folio_salida!=""?
               documentoSalidaDatos.fecha_envio!=""?
               documentoSalidaDatos.asunto!=""?
               documentoSalidaDatos.destinatario!=""?
               documentoSalidaDatos.observaciones!=""?
               true: false: false: false: false: false: false
            );

               listo ?  insertarDocumentoSalida(documentoSalidaDatos):swalError("Completar campos");
    });

    $("#btn_limpiar").click(function()
    {
        $("#ID_DOCUMENTO_ENTRADA").val("");
        $("#FOLIO_SALIDA").val("");
        $("#FECHA_ENVIO").val("");
        $("#ASUNTO").val("");
        $("#DESTINATARIO").val("");
        $("#OBSERVACIONES").val("");              
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
//            console.log("Entro al excelexportHibrido");
        $("#listjson").excelexportHibrido({
            containerid: "listjson"
            , datatype: 'json'
            , dataset: DataGridExcel
            , columns: getColumns(DataGridExcel)
        });
    });
    
}); //CIERRA $(FUNCTION())


//function inicializarFiltros()
//{
//    filtros =[
//            {id:"noneUno",type:"none"},
////            {id:"folio_entrada",type:"text"},
//            {id:"id_documento_entrada",type:"combobox",data:listarFoliosDeEntrada(),descripcion:"folio_entrada"},
//            {id:"folio_salida",type:"text"},
//            {id:"nombre_empleado",type:"text"},
////            {id:"id_empleado",type:"combobox",data:listarEmpleados(),descripcion:"nombre_completo"},
//            {id:"fecha_envio",type:"date"},
//            {id:"asunto",type:"text"},
//            {id:"destinatario",type:"text"},
//            {id:"clave_autoridad",type:"text"},
//            {id:"archivo_adjunto",type:"text"},
//            {id:"observaciones",type:"text"},
//            {name:"opcion",id:"opcion",type:"opcion"}
//            ];
//}


//function construirGrid()
//{
//    jsGrid.fields.customControl = MyCControlField;
//    db={
//            loadData: function()
//            {
//                return DataGrid;
//            },
//            insertItem: function(item)
//            {
//                return item;
//            },
//        };
 
//    $("#jsGrid").jsGrid({
//        onInit: function(args)
//        {
//            gridInstance=args.grid;
//            jsGrid.Grid.prototype.autoload=true;
//        },
//        onDataLoading: function(args)
//        {
//            loadBlockUi();
//        },
//        onDataLoaded:function(args)
//        {
//            $('.jsgrid-filter-row').removeAttr("style",'display:none');
//        },
//        onRefreshing: function(args) {
//        },
//        
//        width: "100%",
//        height: "300px",
//        autoload:true,
//        heading: true,
//        sorting: true,
//        editing: true,
//        paging: true,
//        controller:db,
//        pageLoading:false,
//        pageSize: 5,
//        pageButtonCount: 5,
//        updateOnResize: true,
//        confirmDeleting: true,
//        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
////        filtering:false,
////        data: __datos,
//        fields: 
//        [
//            { name: "id_principal",visible:false},
//            { name:"no",title:"No",width:20},
////            { name: "folio_entrada",title:"Folio de Entrada", type: "text", validate: "required" },
//
//            { name: "id_documento_entrada",title:"Folio de Entrada", type: "select",
//                items:DocumentoEntradasComboBox,
//                valueField:"id_documento_entrada",
//                textField:"folio_entrada"
//            },
//
//
//            { name: "folio_salida",title:"Folio de Salida", type: "text", validate: "required" },
//            { name: "id_empleado",title:"Responsable del Tema", type: "text", validate: "required",width:150,editing: false},
////            { name: "id_empleado",title:"Responsable del Tema", type: "select",
////                items:EmpleadosCombobox,
////                valueField:"id_empleado",
////                textField:"nombre_completo"
////            },
//            { name: "fecha_envio",title:"Fecha de Envio", type: "date", validate: "required" },
//            { name: "asunto",title:"Asunto", type: "text", validate: "required" },
//            { name: "destinatario",title:"Destinatario", type: "text", validate: "required" },
//            { name: "clave_autoridad",title:"Autoridad Remitente", type: "text", validate: "required",editing: false},
//            { name: "archivo_adjunto",title:"Archivo Adjunto", type: "text", validate: "required",width:110,editing: false},
//            { name: "observaciones",title:"Observaciones", type: "text", validate: "required" },            
//            { name:"delete", title:"Opción", type:"customControl",sorting:""}
//        ],
//        onItemUpdated: function(args)
//        {
//            console.log(args);
//            columnas={};
//            id_afectado=args["item"]["id_principal"][0];
//            $.each(args["item"],function(index,value)
//            {
//                if(args["previousItem"][index] != value && value!="")
//                {
//                        if(index!="id_principal" && !value.includes("<button") && index!="delete")
//                        {
//                                columnas[index]=value;
//                        }
//                }
//            });
//            if(Object.keys(columnas).length!=0)
//            {
//                    $.ajax({
//                            url: '../Controller/GeneralController.php?Op=Actualizar',
//                            type:'GET',
//                            data:'TABLA=documento_salida'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
//                            success:function(exito)
//                            {
//                                refresh();
//                                swal("","Actualizacion Exitosa!","success");
//                                setTimeout(function(){swal.close();},1000);
//                            },
//                            error:function()
//                            {
//                                swal("","Error en el servidor","error");
//                                setTimeout(function(){swal.close();},1500);
//                            }
//                    });
//            }
//        },
//        
//        onItemDeleting: function(args) 
//        {
//
//        }
//        
//    });
//}


//var MyCControlField = function(config)
//{
//    jsGrid.Field.call(this, config);
//};
//
//
//MyCControlField.prototype = new jsGrid.Field
//({
//        css: "date-field",
//        align: "center",
//        sorter: function(date1, date2)
//        {
//            console.log("haber cuando entra aqui");
//            console.log(date1);
//            console.log(date2);
//            // return 1;
//        },
//        itemTemplate: function(value,todo)
//        {
////            alert(value,todo);
//
//            if(value[0]['existe_archivo']!=0)
//                return "";
//            else
//                return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-delete-button ',title:"Eliminar", type:'button',onClick:"preguntarEliminar("+JSON.stringify(todo)+")"});
//        },
//        insertTemplate: function(value)
//        {
//        },
//        editTemplate: function(value)
//        {
//            val = "<input class='jsgrid-button jsgrid-update-button' type='button' title='Actualizar' onClick='aceptarEdicion()'>";
//            val += "<input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancelar Edición' onClick='cancelarEdicion()'>";
//            return val;
//        },
//        insertValue: function()
//        {
//        },
//        editValue: function()
//        {
//        }
//});


//function cancelarEdicion()
//{
//    $("#jsGrid").jsGrid("cancelEdit");
//}
//
//function aceptarEdicion()
//{
//    gridInstance.updateItem();
//}


//function listarDatos()
//{
//    __datos=[];    
//    datosParamAjaxValues={};
//    datosParamAjaxValues["url"]="../Controller/DocumentosSalidaController.php?Op=Listar&URL=filesDocumento/Salida/";
//    datosParamAjaxValues["type"]="POST";
//    datosParamAjaxValues["async"]=false;
//    
//    var variablefunciondatos=function obtenerDatosServer (data)
//    {
//        if(typeof(data)=="object")
//        {
//            growlSuccess("Solicitud","Registros obtenidos");
//            dataListado = data;
//            $.each(data,function(index,value)
//            {
//                __datos.push(reconstruir(value,index+1));
//                
//            });
//             DataGrid = __datos;
//            gridInstance.loadData();
//            resolve();
//        
//        }
//
//    }
//    
//    
//    var listfunciones=[variablefunciondatos];
//    ajaxHibrido(datosParamAjaxValues,listfunciones);
//    DataGrid = __datos;
//}

//
//function reconstruirTable(_datos)
//{
//    __datos=[];
//    $.each(_datos,function(index,value)
//    {
//        __datos.push(reconstruir(value,index++));
//    });
//    construirGrid(__datos);
//}


//function reconstruir(value,index)
//{
//    tempData=new Object();
//    ultimoNumeroGrid = index;
//    tempData["id_principal"]= [{'id_documento_salida':value.id_documento_salida}];
//    tempData["no"]= index;
//    tempData["id_documento_entrada"]=value.id_documento_entrada;
//    tempData["folio_salida"]=value.folio_salida;
//    tempData["id_empleado"]= value.nombre_empleado;
//    tempData["fecha_envio"]=value.fecha_envio;
//    tempData["asunto"]=value.asunto;
//    tempData["destinatario"]=value.destinatario;
//    tempData["clave_autoridad"]=value.clave_autoridad;
//    tempData["archivo_adjunto"] = "<button onClick='mostrar_urls("+value.id_documento_salida+")' type='button' class='btn btn-info' data-toggle='modal' data-target='#create-itemUrls'>";
//    tempData["archivo_adjunto"] += "<i class='fa fa-cloud-upload' style='font-size: 20px'></i> Mostrar</button>";
//    tempData["observaciones"]=value.observaciones;
//    tempData["delete"]="1";
//    tempData["delete"]= [{"existe_archivo":value.archivosUpload[0].length}];
//    return tempData;
//}

function documentosEntradaComboboxparaModal()
{
  $.ajax({
      url:"../Controller/DocumentosEntradaController.php?Op=mostrarcombo",
      type:"GET",
      success:function(documentosEntrada)
      {
          tempData="";
          tempData+="<option value='-1'>SIN FOLIO DE ENTRADA</option>";
          $.each(documentosEntrada,function(index,value)
          {
              tempData+="<option value='"+value.id_documento_entrada+"'>"+value.folio_entrada+"</option>";

          }); 
          
          $("#ID_DOCUMENTO_ENTRADA").html(tempData);
      }
  });  
}



function listarFoliosDeEntrada()
{
//    alert("listarFoliosDeEntrada");
    $.ajax({
        url:"../Controller/DocumentosSalidaController.php?Op=listarFoliosEntrada",
        type:"GET",
        async:false,
        success:function(foliosEntrada)
        {
            DocumentoEntradasComboBox=foliosEntrada;
        }
    });
    return DocumentoEntradasComboBox;
}


function insertarDocumentoSalida(documentoSalidaDatos)
{
//    alert("Entro a la funcion guardar");
        URL = "filesDocumento/Salida/";
        $.ajax({
        url:"../Controller/DocumentosSalidaController.php?Op=Guardar",
        type:"POST",
        data:"documentoSalidaDatos="+JSON.stringify(documentoSalidaDatos)+"&URL="+URL,
        // async:false,
        beforeSend:()=>
        {
            growlWait("Crear Documento Salida","Guardando Registro...");
        },
        success:function(datos)
        {
//            alert("valor datos: "+datos);
//            console.log(datos);
            if(typeof(datos) == "object")
            {
                growlSuccess("Crear Documento Salida","Registro Creado");
                tempData = new Object();
//                 swalSuccess("Documento Creado");
                // console.log(datos);
                $.each(datos,function(index,val)
                {
                //   console.log(val.archivosUpload[0].length); 
                   tempData = reconstruir(val,ultimoNumeroGrid+1);
                });
                
                $("#jsGrid").jsGrid("insertItem",tempData).done(function()
                {
                    dataListado.push(datos[0]);
                    $("#crea_documentoSalida .close ").click();
                });
                componerDataGrid();
            }
            else
            {
                if(datos==0)
                // {
                    growlError("Error Creando Documento Salida","No se pudo crear el documento de salida");
                    // swalError("Error, No se pudo crear el Documento");
                // }
                else
                {
                    growlSuccess("Crear Documento Salida","Registro Creado, pero no listado, Actualice");
                    swalInfo("Creado, Pero no listado, Actualice");
                }
            }
        },
        error:function()
            {
                // swalError("Error en el servidor");
                growlError("Error Creando Documento Salida","Error en el servidor");
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
//                ModalCargaArchivo += "<div class='fileupload-progress' >";
                ModalCargaArchivo += "</div></div>";
                ModalCargaArchivo += "<table role='presentation'><tbody class='files'></tbody></table></form>";
                

// months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  
  
  function mostrar_urls(id_documento_salida)
{
        var tempDocumentolistadoUrl = "";
        URL = 'filesDocumento/Salida/'+id_documento_salida;
        $.ajax({
                url: '../Controller/ArchivoUploadController.php?Op=listarUrls',
                type: 'GET',
                data: 'URL='+URL,
                async:false,
                success: function(todo)
                {
                        if(todo[0].length!=0)
                        {
                                tempDocumentolistadoUrl = "<table class='tbl-qa' style='width:100%'><tr><th class='table-header'>Fecha de subida</th><th class='table-header'>Nombre</th><th class='table-header'></th></tr><tbody>";
                                $.each(todo[0], function (index,value)
                                {
                                        nametmp = value.split("^-O-^-M-^-G-^");
                                        // fecha = new Date(nametmp[0]*1000);
                                        // fecha = fecha.getDate() +" "+ months[fecha.getMonth()] +" "+ fecha.getFullYear() +" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                                        fecha = getFechaStamp(nametmp[0]);
                                        
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
                        tempDocumentolistadoUrl = tempDocumentolistadoUrl + "<br><input id='tempInputIdDocumentoSalida' type='text' style='display:none;' value='"+id_documento_salida+"'>";
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
  
        var ID_DOCUMENTO_SALIDA = $('#tempInputIdDocumentoSalida').val();
        url = 'filesDocumento/Salida/'+ID_DOCUMENTO_SALIDA,
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
                text: "Confirme para eliminar el documento de salida",
                type: "warning",
                showCancelButton: true,
                // closeOnConfirm: false,
                // showLoaderOnConfirm: true
                confirmButtonText:'SI'
                }).then((res)=>
                {
                        if(res)
                        {
                             var ID_DOCUMENTO= $('#tempInputIdDocumentoSalida').val();
//                                var ID_DOCUMENTO = $('#tempInputIdDocumento').val();
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
        
        
        
        
        
        
//        
//      swal({
//          title: "ELIMINAR",
//          text: "Confirme para eliminar el documento",
//          type: "warning",
//          showCancelButton: true,
//          closeOnConfirm: false,
//          showLoaderOnConfirm: true
//        },function()
//        {
//          var ID_DOCUMENTO_SALIDA = $('#tempInputIdDocumentoSalida').val();
//          $.ajax({
//            url: "../Controller/ArchivoUploadController.php?Op=EliminarArchivo",
//            type: 'POST',
//            data: 'URL='+url,
//            success: function(eliminado)
//            {
//              if(eliminado)
//              {
//                mostrar_urls(ID_DOCUMENTO_SALIDA);
//                swal("","Archivo eliminado");
//                setTimeout(function(){swal.close();},1000);
//              }
//              else
//                swal("","Ocurrio un error al elimiar el documento", "error");
//            },
//            error:function()
//            {
//              swal("","Ocurrio un error al elimiar el documento", "error");
//            }
//          });
//        });
    }

