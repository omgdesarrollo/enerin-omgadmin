
function inicializarFiltros()
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
            {id:"noneUno", type:"none"},
            // { id: "no", name:"No.", type: "text"},
            { id: "clave_documento", name:"Clave Documento", type: "text"},
            { id: "documento", name:"Documento", type: "text"},
            { id: "responsable_documento", name:"Responsable Documento", type: "text"},
            { id: "tema_responsableBTN",namename:"Temas y Resposables", type: "none"},
            { id: "mostrar_urlsBTN", name:"Archivo Adjunto", type: "none"},
            { id: "requisitosBTN", name:"Requisitos", type: "none"},
            { id: "registrosBTN", name:"Registros", type: "none"},
            { id: "validacion_documento_responsable", name:"Validación Resposable Documento", type: "none"},
            { id: "validacion_tema_responsable", name:"Validación Resposable Tema", type: "none"},
            { id: "observaciones", name:"Observaciones", type: "none"},
            // { id: "desviacion_mayor", name:"Desviación Mayor", type: "none"},
            {name:"opcion",id:"opcion",type:"opcion"}
//             construirValidacionDCombo
// construirValidacionTCombo
        ];
        resolve();
    });
}

// function construirGrid(__datos)
// {
//     // $("#jsGrid").html("");
//     // $("#jsGrid").jsGrid("destroy");
//     jsGrid.fields.FValidacionDocumento = fieldValidacionDocumento;
//     jsGrid.fields.FValidacionTema = fieldValidacionTema;
//     $("#jsGrid").jsGrid({
//         // onInit: function(args)
//         // {
//             // jsGrid.ControlField.prototype.editButton=true;
//             //  jsGrid.ControlField.prototype.deleteButton=false;
//         //     jsGrid.Grid.prototype.autoload=true;
//         // },
//         // onDataLoading: function(args)
//         // {
//         //     $("#loader").show();
//         // },
//         // onDataLoaded:function(args)
//         // {
//         //     $("#loader").hide();
//         // },
//         width: "100%",
//         height: "300px",
//         editing: false,
//         heading: true,
//         sorting: true,
//         paging: true,
//         pageSize: 5,
//         pageButtonCount: 5,
//         data: __datos,
//         fields: 
//         [
//             { name: "id_principal",visible:false},
//             { name: "no", title:"No.", type: "text", width: 40},
//             { name: "clave_documento", title:"Clave Documento", type: "text", width: 100},
//             { name: "documento", title:"Documento", type: "text", width: 130},
//             { name: "responsable_documento", title:"Responsable Documento", type: "text", width: 130},
//             { name: "tema_responsableBTN", title:"Temas y Resposables", type: "text", width: 100},
//             { name: "mostrar_urlsBTN", title:"Archivo Adjunto", type: "text", width: 127},
//             { name: "requisitosBTN", title:"Requisitos", type: "text", width: 92,},
//             { name: "registrosBTN", title:"Registros", type: "text", width: 92,},
//             { name: "validacion_documento_responsable", title:"Validación Resposable Documento", type: "FValidacionDocumento", width: 100},
//             { name: "validacion_tema_responsable", title:"Validación Resposable Tema", type: "FValidacionTema", width: 100},
//             { name: "observaciones", title:"Observaciones", type: "text", width: 112},
//             { name: "desviacion_mayor", title:"Desviación Mayor", type: "text", width: 90},
//             // {name:"cancel", type:"control", }
//         ],
//         // onItemUpdated: function(args)
//         // {
//         //     console.log(args);
//         //     columnas={};
//         //     id_afectado=args["item"]["id_principal"][0];
//         //     $.each(args["item"],function(index,value)
//         //     {
//         //         if(args["previousItem"][index] != value && value!="")
//         //         {
//         //             if(index!="id_principal" && !value.includes("<button"))
//         //             {
//         //                     columnas[index]=value;
//         //             }
//         //         }
//         //     });
//         //     if(Object.keys(columnas).length!=0)
//         //     {
//         //         $.ajax({
//         //                 url: '../Controller/GeneralController.php?Op=Actualizar',
//         //                 type:'GET',
//         //                 data:'TABLA=empleados'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
//         //                 success:function(exito)
//         //                 {
//         //                     console.log(exito);
//         //                 }
//         //         });
//         //     }
//         // }
//     });
// }

var fieldValidacionDocumento = function(config)
{
    jsGrid.Field.call(this, config);
};

var fieldValidacionTema = function(config)
{
    jsGrid.Field.call(this, config);
};

fieldValidacionDocumento.prototype = new jsGrid.Field
({
        css: "date-field",
        align: "center",
        sorter: function(date1, date2)
        {
                console.log("haber cuando entra aqui");
                console.log(date1);
                console.log(date2);
        },
        itemTemplate: function(value,todo)
        {
            // console.log(todo);
            noClass = "fa-times-circle-o";
            yesClass = "fa-check-circle-o";
            tempData = "";
            if(value=="true")
            {
                tempData = "<i class='fa "+yesClass+"' style='color:#02ff00;";
            }
            else
            {
                tempData = "<i class='fa "+noClass+"' style='color:red;";
            }
            tempData += "font-size: xx-large;cursor:pointer' aria-hidden='true'";
            if(todo.permiso_total=="1" || todo.soy_responsable=="0")
                tempData += "onClick='validarDocumentoR(this,\"validacion_documento_responsable\","+todo.id_principal[0].id_validacion_documento+","+todo.id_documento+")'";
            else
            {
                // if(todo.soy_responsable=="1")
                    // tempData += "onClick='validarDocumentoR(this,\"validacion_documento_responsable\","+todo.id_principal[0].id_validacion_documento+","+todo.id_documento+","+todo.no+")'";
                // else
                    tempData += "onClick='noAcceso(this)'";
            }
            tempData += "></i>";
            return tempData;
            // return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-delete-button', type:'button',onClick:"preguntarEliminar("+JSON.stringify(todo)+")"});

        },
        insertTemplate: function(value)
        {
            // console.log("insertTemplate");
            // return value;
        },
        editTemplate: function(value,todo)
        {
            noClass = "fa-times-circle-o";
            yesClass = "fa-check-circle-o";
            tempData = "";
            if(value=="true")
            {
                tempData = "<i class='fa "+yesClass+"' style='color:#02ff00;";
            }
            else
            {
                tempData = "<i class='fa "+noClass+"' style='color:red;";
            }
            tempData += "font-size: xx-large;cursor:pointer' aria-hidden='true'";
            if(todo.permiso_total=="1" || todo.soy_responsable=="0")
                tempData += "onClick='validarDocumentoR(this,\"validacion_documento_responsable\","+todo.id_principal[0].id_validacion_documento+","+todo.id_documento+")'";
            else
            {
                // if(todo.soy_responsable=="1")
                    // tempData += "onClick='validarDocumentoR(this,\"validacion_documento_responsable\","+todo.id_principal[0].id_validacion_documento+","+todo.id_documento+","+todo.no+")'";
                // else
                    tempData += "onClick='noAcceso(this)'";
            }
            tempData += "></i>";
            return tempData;
        },
        insertValue: function()
        {
            // console.log("insertValue");
        },
        editValue: function()
        {
            // console.log("editValue");
        }
});

fieldValidacionTema.prototype = new jsGrid.Field
({
        css: "date-field",
        align: "center",
        sorter: function(date1, date2)
        {
                console.log("haber cuando entra aqui");
                console.log(date1);
                console.log(date2);
        },
        itemTemplate: function(value,todo)
        {
            console.log(todo);
            console.log(todo.id_validacion_documento);
            no = "fa-times-circle-o";
            yes = "fa-check-circle-o";
            tempData = "";
            if(todo.validacion_tema_responsable=="true")
            {
                tempData = "<i class='fa "+yes+"' style='color:#02ff00;";
            }
            else
            {
                tempData = "<i class='fa "+no+"' style='color:red;";
            }
            tempData += "font-size: xx-large;cursor:pointer' aria-hidden='true'";
            
            if(todo.soy_responsable==1)
                tempData += "onClick='validarTemaR(this,\"validacion_tema_responsable\","+todo.id_principal[0].id_validacion_documento+","+todo.id_documento+","+todo.id_usuarioD+")'";
            else
                tempData += "onClick='noAcceso(this)'";
            tempData += "></i>";
            return tempData;
            // return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-delete-button', type:'button',onClick:"preguntarEliminar("+JSON.stringify(todo)+")"});
        },
        insertTemplate: function(value)
        {
            // console.log("insertTemplate");
            // return value;
        },
        editTemplate: function(value,todo)
        {
            no = "fa-times-circle-o";
            yes = "fa-check-circle-o";
            tempData = "";
            if(todo.validacion_tema_responsable=="true")
            {
                tempData = "<i class='fa "+yes+"' style='color:#02ff00;";
            }
            else
            {
                tempData = "<i class='fa "+no+"' style='color:red;";
            }
            tempData += "font-size: xx-large;cursor:pointer' aria-hidden='true'";
            
            if(todo.soy_responsable==1)
                tempData += "onClick='validarTemaR(this,\"validacion_tema_responsable\","+todo.id_validacion_documento+","+todo.id_documento+","+todo.id_usuarioD+")'";
            else
                tempData += "onClick='noAcceso(this)'";
            tempData += "></i>";
            return tempData;
        },
        insertValue: function()
        {
            // console.log("insertValue");
        },
        editValue: function()
        {
            // console.log("editValue");
        }
});

function listarDatos()//listo
{
    return new Promise((resolve,reject)=>{
        URL = 'filesValidacionDocumento/';
        var __datos=[];
        $.ajax({
            url:'../Controller/ValidacionDocumentosController.php?Op=ListarTodo',
            type:"GET",
            data:'URL='+URL,
            beforeSend:function()
            {
                growlWait("Solicitud","Solicitando Datos Validación Documentos");
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
                // console.log(e);
                growlError("Error","Error en el servidor");
                reject();
            }
        });
    });
}

function listarUno(idValidacionDocumento)//aun no
{
    tempData="";
    $.ajax({
        url: '../Controller/ValidacionDocumentosController.php?Op=ListarUno',
        type:'GET',
        data:'ID_VALIDACION_DOCUMENTO='+idValidacionDocumento,
        success:function(documentos)
        {
            tempData = new Object();
            $.each(documentos,function(index,value)
            {
                // tempData += construirValidacionDocumento(value,index++);
                tampData = reconstruir(value,ultimoNumeroGrid+1);
            });
            // $("#registroDocumento_"+idValidacionDocumento).html(tempData);
            console.log(tempData);
            $("#jsGrid").jsGrid("updateItem", tempData).done
            (function(){
                alert();
            });
        },
        error:function()
        {
            swalError("Error en el servidor");
        }
    });
}

function actualizarValidacionDocumento(idValidacionDocumento)//listo
{
    $.ajax({
        url: '../Controller/ValidacionDocumentosController.php?Op=ListarUno',
        type:'GET',
        data:'ID_VALIDACION_DOCUMENTO='+idValidacionDocumento,
        success:function(datos)
        {
            $.each(datos,function(index,value){
                componerDataListado(value);
            });
            componerDataGrid();
            gridInstance.loadData();
        },
        error:function()
        {
            growlError("Error al refrescar la vista","Error en el servidor, actualize la vista");
        }
    });
}

function reconstruir(documento,index)//listo
{
    no = "fa-times-circle-o";
    yes = "fa-check-circle-o";
    tempData = new Object();

    ultimoNumeroGrid = index;
    tempData["no"] = index;
    tempData["id_principal"] = [];
    tempData["id_principal"].push({"id_validacion_documento":documento.id_validacion_documento});
    
    tempData["id_documento"] = documento.id_documento;
    tempData["id_usuarioD"] = documento.id_usuarioD;
    tempData["soy_responsable"] = documento.soy_responsable;
    tempData["permiso_total"] = documento.permiso_total;
    tempData["clave_documento"] = documento.clave_documento;
    tempData["documento"] = documento.documento;
    tempData["responsable_documento"] = documento.responsable_documento;


    tempData["tema_responsableBTN"] = "<button onClick='mostrarTemaResponsable("+documento.id_documento+");' type='button' class='btn btn-success btn_agregar' data-toggle='modal' data-target='#mostrar-temaresponsable'>";
    tempData["tema_responsableBTN"] += "<i class='ace-icon fa fa-book' style='font-size: 20px;'></i>Ver</button>";

    if(documento.permiso_total == 1 || documento.soy_responsable == 0)
        tempData["mostrar_urlsBTN"] = "<button onClick='mostrar_urls("+documento.id_validacion_documento+",\""+documento.validacion_documento_responsable+"\");' type='button' class='botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls' style='width:100%'>";
    else
        tempData["mostrar_urlsBTN"] = "<button onClick='mostrar_urls("+documento.id_validacion_documento+",\"true\");' type='button' class=' botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls' style='width:100%'>";
    
    // console.log(tempData["mostrar_urlsBTN"]);
    // if(documento.soy_reponsable == "1")
    //     tempData["mostrar_urlsBTN"] = "<button onClick='mostrar_urls("+documento.id_validacion_documento+",\"true\");' type='button' class='btn btn-primary' data-toggle='modal' data-target='#create-itemUrls'>";
    // else
    // {
    //     if(documento.permiso_total == 1)
    //     {
    //         tempData["mostrar_urlsBTN"] = "<button onClick='mostrar_urls("+documento.id_validacion_documento+",\""+documento.validacion_documento_responsable+"\");' type='button' class='btn btn-primary' data-toggle='modal' data-target='#create-itemUrls'>";
    //     }
    //     else
    //     {
    //         tempData["mostrar_urlsBTN"] = "<button onClick='mostrar_urls("+documento.id_validacion_documento+",\"false\");' type='button' class='btn btn-primary' data-toggle='modal' data-target='#create-itemUrls'>";
    //     }
    // }

    // if(documento.permiso_total == 1)
    // {
    //     if(documento.soy_responsable==1)
    //         tempData["mostrar_urlsBTN"] = "<button onClick='mostrar_urls("+documento.id_validacion_documento+",\"true\");' type='button' class='btn btn-primary' data-toggle='modal' data-target='#create-itemUrls'>";
    //     else
    //         tempData["mostrar_urlsBTN"] = "<button onClick='mostrar_urls("+documento.id_validacion_documento+",\""+documento.validacion_documento_responsable+"\");' type='button' class='btn btn-primary' data-toggle='modal' data-target='#create-itemUrls'>";
    // }
    // else
    //     tempData["mostrar_urlsBTN"] = "<button onClick='mostrar_urls("+documento.id_validacion_documento+",\"false\");' type='button' class='btn btn-primary' data-toggle='modal' data-target='#create-itemUrls'>"

    tempData["mostrar_urlsBTN"] += "<i class='fa fa-cloud-upload' style='font-size: 22px'></i></button>";

    tempData["requisitosBTN"] = "<button onClick='mostrarRequisitos("+documento.id_documento+");' type='button' class='btn btn-success btn_agregar' data-toggle='modal' data-target='#mostrar-requisitos'>";
    tempData["requisitosBTN"] += "<i class='ace-icon fa fa-book' style='font-size: 20px;'></i>Ver</button>";

    tempData["registrosBTN"] = "<button onClick='mostrarRegistros("+documento.id_documento+");' type='button' class='btn btn-success btn_agregar' data-toggle='modal' data-target='#mostrar-registros'>";
    tempData["registrosBTN"] += "<i class='ace-icon fa fa-book' style='font-size: 20px;'></i>Ver</button>";

    tempData["validacion_documento_responsable"] = documento.validacion_documento_responsable;

    // if(documento.validacion_documento_responsable=="true")
    // {
    //     tempData["validacion_documento_responsable"] = "<i class='fa "+yes+"' style='color:#02ff00;";
    // }
    // else
    // {
    //     tempData["validacion_documento_responsable"] = "<i class='fa "+no+"' style='color:red;";
    // }
    // tempData["validacion_documento_responsable"] += "font-size: xx-large;cursor:pointer' aria-hidden='true'";
    // if(documento.permiso_total==1)
    //     tempData["validacion_documento_responsable"] += "onClick='validarDocumentoR(this,\"validacion_documento_responsable\","+documento.id_validacion_documento+","+documento.id_documento+")'";
    // else
    // {
    //     if(documento.soy_responsable==0)
    //     tempData["validacion_documento_responsable"] += "onClick='validarDocumentoR(this,\"validacion_documento_responsable\","+documento.id_validacion_documento+","+documento.id_documento+")'";
    //     else
    //     tempData["validacion_documento_responsable"] += "onClick='noAcceso(this)'";
    // }
    // tempData["validacion_documento_responsable"] += "></i>";

    tempData["validacion_tema_responsable"] = documento.validacion_tema_responsable;

    // if(documento.validacion_tema_responsable=="true")
    // {
    //     tempData["validacion_tema_responsable"] = "<i class='fa "+yes+"' style='color:#02ff00;";
    // }
    // else
    // {
    //     tempData["validacion_tema_responsable"] = "<i class='fa "+no+"' style='color:red;";
    // }
    // tempData["validacion_tema_responsable"] += "font-size: xx-large;cursor:pointer' aria-hidden='true'";
    
    // if(documento.soy_responsable==1)
    //     tempData["validacion_tema_responsable"] += "onClick='validarTemaR(this,\"validacion_tema_responsable\","+documento.id_validacion_documento+","+documento.id_documento+","+documento.id_usuarioD+")'";
    // else
    //     tempData["validacion_tema_responsable"] += "onClick='noAcceso(this)'";
    // tempData["validacion_tema_responsable"]+="></i>";

    // tempData+="<td>";
    tempData["observaciones"] = "<i data-toggle='modal' data-target='#mostrar-observaciones' onClick='mostrarObservacionesInicio("+documento.id_validacion_documento+")' class='ace-icon fa fa-comments' style='font-size:20px;cursor:pointer'></i>";
    tempData["desviacion_mayor"] = "X";
    tempData["id_principal"].push({eliminar:0});
    tempData["id_principal"].push({editar:0});//si quieres que edite 1, si no 0
    tempData["delete"] = tempData["id_principal"];
    return tempData;
}


function reconstruirExcel(documento,index)//listo
{
    tempData = new Object();
    tempData["No"] = index;
    tempData["Clave Dcumento"] = documento.clave_documento;
    tempData["Documento"] = documento.documento;
    tempData["Responsable del Documento"] = documento.responsable_documento;
    tempData["Tema"] = documento.nombre_tema;
    tempData["Responsable del Tema"] = documento.responsable_tema;
    if(documento.archivosUpload[0].length==0)
    {
        tempData["Archivo Adjunto"] = "No";
    }else{
        $.each(documento.archivosUpload[0],function(index,value){
            tempData["Archivo Adjunto"] = "Si";
        });        
    }
    
    tempData["Requisitos"]="";   
    $.each(documento['detalles_excel']["0"]['requisitos'],(index,value)=>{
        tempData["Requisitos"] += "<li>"+value['requisito']+"<li>";                                
    });
    
    tempData["Registros"]="";
        $.each(documento['detalles_excel']["1"]['registros'],(index,value)=>{
            tempData["Registros"] += "<li>"+value['registro']+"<li>";                                
        });
        
    if(documento['validacion_documento_responsable']=="false")
    {
        tempData["Validacion Responsable Documento"]="No";
    }else{
        tempData["Validacion Responsable Documento"]="Si";
    }
    if(documento['validacion_tema_responsable']=="false")
    {
        tempData["Validacion Responsable Tema"]="No";
    }else{
        tempData["Validacion Responsable Tema"]="Si";
    }
                
    return tempData;
}

// function reconstruirTable(_datos)
// {
//     __datos=[];
//     console.log(_datos);
//     $.each(_datos,function(index,value)
//     {
//         __datos.push(reconstruir(value,index));
//     });
//     // $("#jsGrid").jsGrid("loadData");
//     construirGrid(__datos);
//     $("#loader").hide();
// }

function mostrar_urls(id_validacion_documento,detenerCargas)//listo
{
    // $('#div_subirArchivos').html("");
    $("#subirArchivos").attr("style","display:none");
    var tempDocumentolistadoUrl = "";
    URL = 'filesValidacionDocumento/'+id_validacion_documento;   
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
                    fecha = fecha.getDate() +" "+ months[fecha.getMonth()] +" "+ fecha.getFullYear().toString().slice(2,4) +" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                    
                    tempDocumentolistadoUrl += "<tr class='table-row'><td>"+fecha+"</td><td>";
                    tempDocumentolistadoUrl += "<a href=\""+todo[1]+"/"+value+"\" download='"+nametmp[1]+"'>"+nametmp[1]+"</a></td>";
                    if(detenerCargas!="true")
                    {
                        tempDocumentolistadoUrl += "<td><button style=\"font-size:x-large;color:#39c;background:transparent;border:none;\"";
                        tempDocumentolistadoUrl += "onclick='borrarArchivo(\""+URL+"/"+value+"\");'>";
                        tempDocumentolistadoUrl += "<i class=\"fa fa-trash\"></i></button></td></tr>";
                    }
                    else
                        tempDocumentolistadoUrl += "<td></td>";
                });
                tempDocumentolistadoUrl += "</tbody></table>";
            }
            if(tempDocumentolistadoUrl == "")
            {
                    tempDocumentolistadoUrl = " No hay archivos agregados ";
            }
            tempDocumentolistadoUrl = tempDocumentolistadoUrl + "<br><input id='tempInputIdValidacionDocumento' type='text' style='display:none;' value='"+id_validacion_documento+"'>";                  
        
            if(detenerCargas!="true")
            {
                // $('#div_subirArchivos').html("<button type='submit' id='subirArchivos'  class='btn crud-submit btn-info'>Adjuntar Archivo</button>");
                // $("#subirArchivos").attr("style","display:none");
                $("#subirArchivos").removeAttr("style","display:none");
                $('#DocumentolistadoUrlModal').html(ModalCargaArchivo);
            }
            else
            {
                $('#DocumentolistadoUrlModal').html("");
                // $("#subirArchivos").removeAttr("style","display:none");
            }
            $('#DocumentolistadoUrl').html(tempDocumentolistadoUrl);
            $('#fileupload').fileupload
            ({
                url: '../View/',
            });
        }
    });
}

function agregarArchivosUrl()//listo
{
    var ID_VALIDACION_DOCUMENTO = $('#tempInputIdValidacionDocumento').val();
    url = 'filesValidacionDocumento/'+ID_VALIDACION_DOCUMENTO,
    $.ajax({
        url: "../Controller/ArchivoUploadController.php?Op=CrearUrl",
        type: 'GET',
        data: 'URL='+url,
        success:function(creado)
        {
            if(creado)
            $('.start').click();
        },
        error:function()
        {
            growlError("Error Agregar Archivo","Error en el servidor");
        }
    });
}

function borrarArchivo(url)//listo
{
    swal({
        title: "ELIMINAR",
        text: "Confirme para eliminar el documento",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true
    },function()
    {
        var ID_VALIDACION_DOCUMENTO = $('#tempInputIdValidacionDocumento').val();
        $.ajax({
        url: "../Controller/ArchivoUploadController.php?Op=EliminarArchivo",
        type: 'POST',
        data: 'URL='+url,
        success: function(eliminado)
        {
            if(eliminado)
            {
                modificarArchivos(ID_VALIDACION_DOCUMENTO,-1);
                mostrar_urls(ID_VALIDACION_DOCUMENTO);
                // actualizarValidacionDocumento(ID_VALIDACION_DOCUMENTO);
                // swalSuccess("Eliminar Archivo","Archivo eliminado");
                growlSuccess("Eliminar Archivo","Archivo eliminado");
                // setTimeout(function(){swal.close();},1000);
            }
            else
                growlError("Error Eliminar Archivo","Ocurrio un error al elimiar el documento");
        },
        error:function()
        {
            growlError("Error Elimnar Archivo","Error en el servidor");
        }
        });
    });
}

function validarDocumentoR(Obj,columna,idValidacionDocumento,idDocumento)
{
    GetValidacionTema = ({
        url:'../Controller/ValidacionDocumentosController.php?Op=GetValidacionTema',
        type:'GET',
        data:'ID_VALIDACION_DOCUMENTO='+idValidacionDocumento,
    });

    GetExisteArchivo = ({
        url:'../Controller/ValidacionDocumentosController.php?Op=GetExisteArchivo',
        type:'GET',
        data:'ID_VALIDACION_DOCUMENTO='+idValidacionDocumento,
    });
    
    $.ajax(GetValidacionTema).done(function(validado)
    {
        if(validado==false)
        {
                $.ajax(GetExisteArchivo).done(function(existenArchivos)
                {
                    if(existenArchivos==true)
                    {
                        validar(idValidacionDocumento,columna,Obj).then((validarR)=>
                        {
                            $.ajax({
                                url:'../Controller/ValidacionDocumentosController.php?Op=ObtenerTemayResponsable',
                                type:'GET',
                                data:'ID_DOCUMENTO='+idDocumento,
                                success:function(responsables)
                                {
                                    $.each(responsables,function(index,value)
                                    {
                                        (validarR)?
                                        enviar_notificacion("Ha sido validado un documento por el responsable del documento",value.id_usuario,0,false,"ValidacionDocumentosView.php?accion="+idValidacionDocumento)//msj,para,tipomsj,atendido,asunto
                                        :
                                        enviar_notificacion("Ha sido desvalidado un documento por el responsable del documento",value.id_usuario,0,false,"ValidacionDocumentosView.php?accion="+idValidacionDocumento);//msj,para,tipomsj,atendido,asunto
                                    });
                                },
                                error:()=>{
                                    growlError("Error Notificar","Error en el servidor");
                                }

                            });
                        },
                        (error)=>
                        {});
                    }
                    if(existenArchivos==false)
                    {
                        swal("","Debe de adjuntar un archivo antes de Validar","info");
                    }
                });
        }
        if(validado==true)
            swal("","Imposible desvalidar, Ha sido validado por el responsable del tema","info");
        if(validado==-1)
            growlError("Error Validación","Error en el servidor");
    })
    .fail(function()
    {
        growlError("Error validación","Error en el servidor");
    });
}

function validarTemaR(Obj,columna,idValidacionDocumento,idDocumento,idPara)
{
    getValidacionDocumento = $.ajax({
        url:'../Controller/ValidacionDocumentosController.php?Op=GetValidacionDocumento',
        type:'GET',
        data:'ID_VALIDACION_DOCUMENTO='+idValidacionDocumento,
    });
    
    getValidacionDocumento.done(function(validado)
    {
        if(validado==true)
        {
            validar(idValidacionDocumento,columna,Obj).then((validarR)=>
            {
                $.ajax({
                    url:'../Controller/ValidacionDocumentosController.php?Op=ObtenerTemayResponsable',
                    type:'GET',
                    data:'ID_DOCUMENTO='+idDocumento,
                    success:function(responsables)
                    {
                        $.each(responsables,function(index,value)
                        {
                            if(value.id_usuario!=idUsuario)
                            {
                                (validarR)?
                                enviar_notificacion("Ha sido validado un documento por el responsable de Tema",value.id_usuario,0,false,"ValidacionDocumentosView.php?accion="+idValidacionDocumento)//msj,para,tipomsj,atendido,asunto
                                :
                                enviar_notificacion("Ha sido desvalidado un documento por el responsable de Tema",value.id_usuario,0,false,"ValidacionDocumentosView.php?accion="+idValidacionDocumento);//msj,para,tipomsj,atendido,asunto
                            }                                
                        });
                    },
                    error:()=>{
                        growlError("Error Notificar","Error en el servidor");
                    }
                });

                (validarR)?(
                    enviar_notificacion("Ha sido validado un documento por el responsable de Tema",idPara,0,false,"ValidacionDocumentosView.php?accion="+idValidacionDocumento)//msj,para,tipomsj,atendido,asunto
                    ):(
                    enviar_notificacion("Ha sido desvalidado un documento por el responsable de Tema",idPara,0,false,"ValidacionDocumentosView.php?accion="+idValidacionDocumento)
                    );

            },(error)=>{});
        }
        if(validado==false)
            swalError("Esperando validacion Responsable del documento");
        if(validado==-1)
            alert("Error en el servidor");
    })
    .fail(function()
    {
        swalError("Error en el servidor");
    });
}

function validar(idValidacionDocumento,columna,Obj)
{
    return new Promise((resolve,reject)=>
    {
        no = "fa-times-circle-o";
        yes = "fa-check-circle-o";
        valor=false;
        ($(Obj).hasClass(no))?valor=true:valor=false;
        // exitoT=false;
        $.ajax({
                url: '../Controller/ValidacionDocumentosController.php?Op=ModificarColumna',
                type: 'POST',
                data: 'ID_VALIDACION_DOCUMENTO='+idValidacionDocumento+'&COLUMNA='+columna+'&VALOR='+valor,
                async:false,
                success:function(exito)
                {
                    // exitoT = valor;
                    resolve(valor);
                    if(exito)
                    {
                        // $(Obj).removeClass( (valor)?no:yes );
                        // $(Obj).addClass( (valor)?yes:no );
                        // $(Obj).css("color", (valor)?"#02ff00":"red" );
                        swalSuccess( (valor) ? ("Validación","Validado") : ("Desvalidación","Desvalidado") );
                        actualizarValidacionDocumento(idValidacionDocumento);
                        // listarValidacionDocumento(idValidacionDocumento,no);
                        //aqui mandar notificacion
                    }
                },
                error:function()
                {
                    swalError("Error en el servidor");
                    reject();
                }
            });
    });
}

function enviar_notificacion(mensaje,para,tipoMensaje,atendido,asunto)//listo, pero se puede hacer mas factible, mandado todo en un solo ajax sin ejecutar tantos
{
    $.ajax({
        url:"../Controller/NotificacionesController.php?Op=EnviarNotificacionHibry",
        data: "PARA="+para+"&MENSAJE="+mensaje+"&ATENDIDO="+atendido+"&TIPO_MENSAJE="+tipoMensaje+"&ASUNTO="+asunto,
        success:function(response)
        {
            growlSuccess("Notificar", (response==true)? "Se notifico del cambio" : "No se pudo notificar");
        },
        error:function()
        {
            growlError("Error Notificación","Error en el servidor");
        }
    });
}

function noAcceso(Obj)
{
    no = "fa-times-circle-o";
    yes = "fa-check-circle-o";
    valor=false;
    ($(Obj).hasClass(no))?valor=false:valor=true;
    swalInfo( ((valor)?"Validado por el responsable del documento":"Esperando la validación del responsable del documento") );
}

function modificarArchivos(idValidacionDocumento,valor)//listo
{
    $.ajax({
        url:'../Controller/ValidacionDocumentosController.php?Op=ModificarArchivos',
        type:'GET',
        data:'ID_VALIDACION_DOCUMENTO='+idValidacionDocumento+'&VALOR='+valor,
    });
}

function refresh()
{
    inicializarFiltros().then((resolve2)=>
    {
        construirFiltros();
    });
    listarDatos();
    // $("#btnrefrescar").attr("disabled",true);
    // promesaBuscarRegionesFiscales = buscarRegionesFiscales();
    // promesaBuscarRegionesFiscales.then((resolve)=>{
    //     inicializarFiltros();
    //     listarDatosPromesa = listarDatos();
    //     listarDatosPromesa.then((result)=>
    //     {
    //         $("#btnrefrescar").removeAttr("disabled");
    //     },(error)=>{
    //         growlError("ERROR!","Error al intentar refrescar datos");
    //         $("#btnrefrescar").removeAttr("disabled");
    //     });
    // },(error)=>{
    //     growlError("ERROR!","Error al intentar refrescar datos");
    //     $("#btnrefrescar").removeAttr("disabled");
    // });

    // enviarWB();
}

function componerDataListado(value)// id de la vista documento, listo
{
    id_vista = value.id_validacion_documento;
    id_string = "id_validacion_documento";
    $.each(dataListado,function(indexList,valueList)
    {
        $.each(valueList,function(ind,val)
        {
            if(ind == id_string)
                    ( val==id_vista) ? dataListado[indexList]=value : console.log();
        });
    });
}

function componerDataGrid()
{
    __datos = [];
    $.each(dataListado,function(index,value){
        __datos.push(reconstruir(value,index+1));
    });
    DataGrid = __datos;
}

function mostrarRequisitos(id_documento)//listo
{
    ValoresRequisitos = "<ul>";

    $.ajax ({
        url: "../Controller/ValidacionDocumentosController.php?Op=MostrarRequisitosPorDocumento",
        type: 'POST',
        data: 'ID_DOCUMENTO='+id_documento,
        success:function(responserequisitos)
        {
            $.each(responserequisitos,function(index,value)
            {
                //alert("Hast aqui"+value.requisito);
            ValoresRequisitos+="<li>"+value.requisito+"</li>";                                       

            });
            ValoresRequisitos += "</ul>";     
            $('#RequisitosListado').html(ValoresRequisitos);
        }
    });
}

function mostrarRegistros(id_documento)//listo
{
    ValoresRegistros = "<ul>";
    $.ajax ({
        url:"../Controller/ValidacionDocumentosController.php?Op=MostrarRegistrosPorDocumento",
        type: 'POST',
        data: 'ID_DOCUMENTO='+id_documento,
        success:function(responseregistros)
        {
            $.each(responseregistros,function(index,value){
                ValoresRegistros+="<li>"+value.registro+"</li>"; 
            });
            ValoresRegistros += "</ul>";
            $('#RegistrosListado').html(ValoresRegistros);
        }
    });
}

function mostrarTemaResponsable(idDocumento)//listo
{
    tempData = "";
    $.ajax({
        url:'../Controller/ValidacionDocumentosController.php?Op=ObtenerTemayResponsable',
        type:'GET',
        data:'ID_DOCUMENTO='+idDocumento,
        success:function(responsables)
        {
            $.each(responsables,function(index,value)
            {
                // if(value.nombre!=null)
                // {
                    tempData += "<tr><td>"+value.nombre+"</td>";
                    tempData += "<td>"+value.responsable_tema+"</td></tr>";
                // }
            });
            $("#tbodyValidacionDocumentosModal").html(tempData);
        }
    });
}