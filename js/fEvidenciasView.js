var gridInstance,db={};
var si_hay_cambio=false;
var dataRegistro="";
var dataListado=[];
var dataTodo=[];
var __refresh=false;

$(function()
{
    $('#BTN_CREAR_NUEVAEVIDENCIAMODAL').click(function()
    {
        claveRegistro = $("#IDREGISTRO_NUEVAEVIDENCIAMODAL").val();
        claveTema = $("#IDTEMA_NUEVAEVIDENCIAMODAL").val();
        fecha = $("#FECHA_NUEVAEVIDENCIAMODAL").val();
        // console.log(fecha);
        if(claveTema!=-1 && claveRegistro!=-1 && fecha!="")
        {
            $.ajax({
                url:'../Controller/EvidenciasController.php?Op=ChecarDisponiblidad',
                type:'GET',
                data: "ID_REGISTRO="+dataRegistro.id_registro+"&FECHA="+fecha,
                beforeSend:function()
                {
                    growlWait("Crear Evidencia","Creando evidencia");
                },
                success:function(disponible)
                {
                    if(disponible == 0)
                    {
                        URL = 'filesEvidenciaDocumento/';
                        $.ajax
                        ({
                            url: '../Controller/EvidenciasController.php?Op=CrearEvidencia',
                            type: 'POST',
                            data: "ID_REGISTRO="+dataRegistro.id_registro+"&FECHA_CREACION="+fecha+"&URL="+URL,
                            beforesend:function ()
                            {},
                            success:function(data)
                            {
                                (typeof(data)=="object")?
                                (
                                    // console.log(data),
                                    growlSuccess("Crear Evidencia","Evidencia Creada"),
                                    tempData = new Object(),
                                    $.each(data,function(index,value){
                                        tempData = reconstruir(value,ultimoNumeroGrid+1);
                                        enviar_notificacion("Tiene una Evidencia por Validar",value.id_responsable,0,false,"EvidenciasView.php?accion="+value.id_evidencias);//msj,para,tipomsj,atendido,asunto
                                    }),
                                    $("#jsGrid").jsGrid("insertItem",tempData).done(function(){

                                    }),
                                    dataListado.push(data[0]),
                                    DataGrid.push(tempData),
                                    $("#nuevaEvidenciaModal .close").click()
                                )
                                :growlError("Error Crear Evidencia","No se puedo crear la evidencia");
                            },
                            error:function()
                            {
                                growlError("Error Crear Evidencia","Error en el servidor");
                            }
                        });
                    }
                    if(disponible > 0)
                    {
                        swalInfo("Ya se ha cargado esta evidencia hoy");
                        growlError("Crear Evidencia","Ya se ha cargado esta evidencia hoy");
                    }
                    if(disponible < 0)
                        growlError("Error Crear Evidencia","Error al hacer eso cambiar nombre que no se como ponerle");
                },
                error:function()
                {
                    growlError("Error Crear Evidencia","Error en el servidor");
                }
            });
        }
        else
        {
            swal("","Selecciona Correctamente","warning");
        }
    });

    $("#subirArchivos").click(function()
    {
        agregarArchivosUrl();
        $("#subirArchivos").attr("disabled",true);
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

});//CIERRA EL $(FUNCTION())


function inicializarFiltros()
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
            { id:"noneUno", type:"none"},
            { id: "nombre",name:"Tema", type: "text"},
            { id: "registro",name:"Registro", type: "text"},
            { id: "frecuencia",name:"Frecuencia", type: "combobox",data:frecuenciaData,descripcion:"frecuencia"},
            { id: "clave_documento",name:"Clave Documento", type: "text"},
            { id: "fecha_creacion",name:"Fecha Creación", type: "date"},
            // { id: "adjuntar_evidencia",name:"Adjuntar Evidencia", type: "text"},
            { id: "fecha_registro",name:"Fecha Registro", type: "date"},
            { id:"noneDos", type:"none"},
            { id: "usuario",name:"Usuario", type: "text"},
            { id:"noneTres", type:"none"},
            { id:"noneCuatro", type:"none"},
            { id:"noneCinco", type:"none"},
            { id:"noneSeis", type:"none"},
            // { id: "accion_correctiva",name:"Accion Correctiva", type: "text"},
            // { id: "plan_accion",name:"Plan Accion", type: "text"},
            // { id: "desviacion",name:"Desviacion", type: "text"},
            // { id: "validacion",name:"Validacion", type: "text"},
            {name:"opcion",id:"opcion",type:"opcion"}
            // { id:"delete", name:"Opción", type:"customControl",sorting:""},
        ];
        resolve();
    });
}

function listarDatos()
{
    return new Promise((resolve,reject)=>
    {
        URL = 'filesEvidenciaDocumento/';
        __datos=[];
        $.ajax({
            url: '../Controller/EvidenciasController.php?Op=Listar',
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
                    // console.log(__datos);
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
                // console.log(e);
                growlError("Error","Error en el servidor");
                reject();
            }
        });
    });
}

function limpiarNuevaEvidenciaModal()
{
    $("#NOMBRETEMA_NUEVAEVIDENCIA").val("");
    $("#NOMBRETEMA_NUEVAEVIDENCIA").removeAttr("disabled");
    $("#NOMBREREGISTRO_NUEVAEVIDENCIA").val("");
    $("#FECHA_NUEVAEVIDENCIAMODAL").val("");
    $("#FRECUENCIA_NUEVAEVIDENCIAMODAL").html("");
    $("#DOCUMENTO_NUEVAEVIDENCIAMODAL").html("");
    $("#NOMBRE_NUEVAEVIDENCIAMODAL").html("");

}
    
    // function saveSingleToDatabase(Obj,tabla,columna,id,contexto)
    // {
      
    //         if(si_hay_cambio==true){
    //         $("#btnAgregarEvidenciasRefrescar").prop("disabled",true);
            
    //         $(Obj).css("background","#FFF url(../../images/base/loaderIcon.gif) no-repeat right");
            
    //         saveOneToDatabase(Obj.innerHTML,columna,tabla,id,contexto);
            
    //         si_hay_cambio=false;
    //     }
    // }

    var tempo = 1;

    // function saveComboToDatabase(Obj,tabla,columna,id,contexto)
    // {
    //     valortmp = $(Obj)[0];
    //     Objtmp=valortmp[valortmp.selectedIndex].innerHTML;
    //     //poner alerta para valores
    //     // alert(Objtmp);
    //     // setInterval(function()
    //     // {
    //     //     $.ajax({
    //     //         url:'../Controller/EvidenciasController.php?Op=a',
    //     //         success:function(data)
    //     //         {
    //     //             console.log(tempo);
    //     //             tempo++;
    //     //         }
    //     //     });
    //     // },1500);
    //     if(Objtmp!=" ")
    //     {
    //         swal({
    //                 title:"SELECCIONAR",
    //                 text: "Una vez seleccionado no se puede cambiar",
    //                 type: "info",
    //                 showCancelButton: true,
    //                 closeOnConfirm: false,
    //                 showLoaderOnConfirm: true,
    //                 // confirmButtonText: tempo,
    //                 }, function(isConfirm)
    //                 {
    //                     if(isConfirm)
    //                     {
    //                         $('#loader').show();
    //                         saveOneToDatabase(Objtmp,columna,tabla,id,contexto);
    //                     }
    //                     else
    //                         $(Obj)[0].selectedIndex=0;
    //                 }
    //             );
    //     }
    // }

    // function detectarsihaycambio() {
                    
    //     si_hay_cambio=true;
    // }
     
//     function listarDatos()
//     {
//         $.ajax
//         ({
//             url: '../Controller/EvidenciasController.php?Op=Listar',
//             type: 'GET',
//             async:false,
//             beforeSend:function()
//             {
// //                $('#loader').show();
//             },
//             success:function(datos)
//             {
//                 dataListado = datos;
//                 reconstruirTable(datos);
//             },
//             error:function(error)
//             {
// //                $('#loader').hide();
//             }
//         });
//     }
    noArchivo=0;

    // function filterTable(Obj)
    // {
        // console.log($(Obj).attr("placeholder"));
        // console.log($(Obj).attr("type"));
        // console.log(columna);
    // }

    // function loadSpinner()
    // {
    //     // alert("se cargara otro ");
    //     myFunction();
    // }

    function buscarTemas(data)
    {
        cadena = $(data).val().toLowerCase();        
        tempData="";
        if(cadena!="")
        {
            $.ajax({
                url: '../Controller/EvidenciasController.php?Op=BuscarTema',
                type: 'GET',
                data: 'CADENA='+cadena,
                async:false,
                success:function(temas)
                {
                    // console.log(temas);
                    $.each(temas,function(index,value)
                    {
                        // nombre = value.nombre_empleado+" "+value.apellido_paterno+" "+value.apellido_materno;
                        // datos = value.id_tema+"^_^"+value.no+"^_^"+value.nombre+"^_^"+value.descripcion;
                        tempData += "<li role='presentation'><a role='menuitem' tabindex='-1'";
                        tempData += " onClick='seleccionarItemTemas("+JSON.stringify(value)+")'> ";
                        tempData += value.no+" - "+value.nombre+"</a></li>";
                    });
                    $("#dropdownEventTemasEvidencia").html(tempData);
                }
            });
        }
        $("#FRECUENCIA_NUEVAEVIDENCIAMODAL").html("");
        $("#DOCUMENTO_NUEVAEVIDENCIAMODAL").html("");
        $("#NOMBRE_NUEVAEVIDENCIAMODAL").html("");
        $('#NOMBREREGISTRO_NUEVAEVIDENCIA').val("");
        $("#IDTEMA_NUEVAEVIDENCIAMODAL").val(-1);
        $("#dropdownEventRegistroEvidencia").html("");
    }

    function seleccionarItemTemas(usuarioTemas)
    {
        $('#NOMBRETEMA_NUEVAEVIDENCIA').val(usuarioTemas.no+" - "+usuarioTemas.nombre);
        $("#IDTEMA_NUEVAEVIDENCIAMODAL").val(usuarioTemas.id_tema);
    }

    function seleccionarItemRegistro(Registros)
    {
        $('#NOMBREREGISTRO_NUEVAEVIDENCIA').val(Registros.registro);
        $('#NOMBRETEMA_NUEVAEVIDENCIA').attr("disabled","true");
        $("#IDREGISTRO_NUEVAEVIDENCIAMODAL").val(Registros.id_registro);
        $("#FRECUENCIA_NUEVAEVIDENCIAMODAL").html(Registros.frecuencia);
        $("#DOCUMENTO_NUEVAEVIDENCIAMODAL").html(Registros.documento);
        $("#NOMBRE_NUEVAEVIDENCIAMODAL").html(Registros.nombre);
        dataRegistro=Registros;
        // console.log(dataRegistro);
    }

    function buscarRegistros(Obj)
    {
        idTema = $("#IDTEMA_NUEVAEVIDENCIAMODAL").val();
        cadena = $(Obj).val().toLowerCase();
        // alert();
        tempData="";
        if(idTema!=-1)
        {
            if(cadena!="")
            {
                $.ajax({
                    url: '../Controller/EvidenciasController.php?Op=BuscarRegistro',
                    type: 'GET',
                    data: 'ID_TEMA='+idTema+"&CADENA="+cadena,
                    async:false,
                    success:function(registros)
                    {
                        $.each(registros,function(index,value)
                        {
                            // nombre = value.nombre_empleado+" "+value.apellido_paterno+" "+value.apellido_materno;
                            // datos = value.id_tema+"^_^"+value.no+"^_^"+value.nombre+"^_^"+value.descripcion;
                            tempData += "<li role='presentation'><a role='menuitem' tabindex='-1'";
                            tempData += "onClick='seleccionarItemRegistro("+JSON.stringify(value)+")'>";
                            tempData += value.registro+"</a></li>";
                        });
                        $("#dropdownEventRegistroEvidencia").html(tempData);
                    },
                    error:function()
                    {
                        swalError("Error en el servidor");
                    }
                });
            }
            else
            {
                $("#FRECUENCIA_NUEVAEVIDENCIAMODAL").html("");
                $("#DOCUMENTO_NUEVAEVIDENCIAMODAL").html("");
                $("#NOMBRE_NUEVAEVIDENCIAMODAL").html("");
                $('#NOMBRETEMA_NUEVAEVIDENCIA').removeAttr("disabled");
                $("#IDREGISTRO_NUEVAEVIDENCIAMODAL").val(-1);
            }
        }
        else
        {
            swal("","Debe seleccionar tema primero","info");
        }
    }

    // function construir(usuarioTemas)
    // {
    //     tempData = "<tr id='idTema_"+usuarioTemas.id_tema+"' >";
    //     tempData += "<td>"+usuarioTemas.no+"</td>";
    //     tempData += "<td>"+usuarioTemas.nombre+"</td>";
    //     tempData += "<td>"+usuarioTemas.descripcion+"</td>";
    //     tempData += "<td>";
    //     tempData += "<button style=\"font-size:x-large;color:#39c;background:transparent;border:none;\"";
    //     tempData += "onclick='eliminarTema("+usuarioTemas.id_tema+");'>";
    //     tempData += "<i class=\"fa fa-trash\"></i></button></td></tr>";
    //     return tempData;
    // }

    // function getClavesDocumento(Obj)
    // {
    //     tempData="";
    //     cadena = $(Obj).val();
    //     if(cadena!="")
    //     {
    //         $.ajax
    //         ({
    //             url: '../Controller/EvidenciasController.php?Op=getClavesDocumentos',
    //             type: 'GET',
    //             data: "CADENA="+cadena,
    //             success:function(data)
    //             {
    //                 if(data!="")
    //                 tempData += "<option value=''></option>";
    //                 $.each(data,function(index,value)
    //                 {
    //                     apellidos = value.NOMBRE_EMPLEADO;
    //                     if(value.APELLIDO_PATERNO!=null)
    //                     {
    //                         apellidos += " "+value.APELLIDO_PATERNO+" "+value.APELLIDO_MATERNO;
    //                     }
    //                     tempData += "<option value='"+value.CLAVE_DOCUMENTO+"+=$="+value.DOCUMENTO;
    //                     tempData += "+=$="+apellidos+"+=$="+value.ID_DOCUMENTO+"'>";
    //                     tempData += value.CLAVE_DOCUMENTO+"</option>";
    //                 });
    //                 $('#CLAVE_NUEVAEVIDENCIAMODAL').html(tempData);
    //             }
    //         });
    //     }
    //     else
    //     {
    //         tempData = "<option>Sin especificar</option>";
    //         $('#CLAVE_NUEVAEVIDENCIAMODAL').html(tempData);
    //     }
    // }

    // function select_clavesModal(Obj)
    // {
    //     tempData = $(Obj).prop("value");
    //     tempData = tempData.split("+=$=");
    //     if(tempData.length == 4)
    //     {
    //         $('#CLAVE_NUEVAEVIDENCIAMODAL2').html(tempData[0]);
    //         $('#DOCUMENTO_NUEVAEVIDENCIAMODAL').html(tempData[1]);
    //         $('#NOMBRE_NUEVAEVIDENCIAMODAL').html(tempData[2]);
    //         $('#ID_NUEVAEVIDENCIAMODAL').val(tempData[3]);
    //     }
    //     else
    //     {
    //         $('#CLAVE_NUEVAEVIDENCIAMODAL2').html("");
    //         $('#DOCUMENTO_NUEVAEVIDENCIAMODAL').html("");
    //         $('#NOMBRE_NUEVAEVIDENCIAMODAL').html("");
    //     }
    // }

    // function filterTableAsunt()
    // {
    //     var input, filter, table, tr, td, i;
    //     input = document.getElementById("idInputAsunto");
    //     filter = input.value.toUpperCase();
    //     table = document.getElementById("idTable");
    //     tr = table.getElementsByTagName("tr");

    //     for (i = 0; i < tr.length; i++)
    //     {
    //         td = tr[i].getElementsByTagName("td")[4];
    //         if (td)
    //         {
    //             if (td.innerHTML.toUpperCase().indexOf(filter) > -1)
    //             {
    //                 tr[i].style.display = "";
    //             }else
    //             {
    //                 tr[i].style.display = "none";
    //             }
    //         }
    //     }
    // }
//    function getDataTable()
//    {        
//        // $('#bodyTable').html(data);
//        $.ajax
//        ({
//            url: '../Controller/EvidenciasController.php?Op=getDataTable',
//            type: 'GET',
//            // data: '',
//            success:function(dataT)
//            {
//                reconstruirTable(dataT);
//            }
//        });
//    }

//     function reconstruirTab(datos)
//     {
//         __datos=[];
//         $.each(datos,function(index,value)
//         {
            
//             // $.ajax({
//             //         url: '../Controller/ArchivoUploadController.php?Op=CrearUrl',
//             //         type: 'GET',
//             //         data: 'URL='+URL,
//             //         });
//             // $.ajax({
//             //       url: '../Controller/ArchivoUploadController.php?Op=listarUrls',
//             //       type: 'GET',
//             //       data: 'URL='+URL,
//             //       async:false,
//                 //   success: function(todo)
//                 //   {
//                         __datos.push(reconstruir(value,index++));
//                 //   }
//                 // });
//         });
// //        moverA();
// //            mover()
//         return __datos;   
//     }

// function construir(datosF)
// {
//     jsGrid.fields.customControl = MyCControlField;
//     db=
//     {
//         loadData: function(filter)
//         {
//             if(datosF!=undefined)
//             {
//                 return listarDatosTodos(datosF);
//             }
//             else
//             {
//                 return listarDatosTodos();
//             }
//         },
//         insertItem: function(item)
//         {
//             return item;
//         }
//     }; 
//     window.db = db;
//     $("#grid").jsGrid({
        // loadIndicator:
        // { 
        //     show:function()
        //     {
        //         console.log ( "carga iniciada" );
        //         $("#loader").show();
        //     },
        //     hide:function()
        //     {
        //         console.log ( "carga terminada" );
        //         $("#loader").hide();
        //     }
        // },
//         onInit: function(args)
//         {
            
// //            gridInstance=args;
//             jsGrid.ControlField.prototype.editButton=false;
//             jsGrid.Grid.prototype.autoload=true;
//         },
//         onDataLoading: function(args)
//         {
            
// //                 loadBlockUi();
//         },
//         onDataLoaded:function(args)
//         {
//             $("#loader").hide();
//         },
//         onRefreshing: function(args)
//         {},
//         width: "100%",
//         height: "300px",
//         inserting:false,
//         heading: true,
//         sorting: true,
//         paging: true,
//         autoload:true,
//         pageSize: 10,
//         pageButtonCount: 5,
//         updateOnResize: true,
//         confirmDeleting: true,
//         controller:db,
//         rowClick: function(args)
//         {
//             // console.log(args);
//         },
//         pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
//         fields:
//         [
//             { name: "id_principal", type: "text",fields:"f", width: "auto",visible:false },
//             { name: "validador", type: "text",fields:"f", width: "auto",visible:false },
//             { name: "no", title:"No",type: "text", width: 28 },
//             { name: "requisito",title:"Requisito", type: "text", width: 150 },
//             { name: "registro",title:"Registro", type: "text", width: 150  },
//             { name: "frecuencia",title:"Frecuencia", type: "text", width: 120  },
//             { name: "clave_documento",title:"Clave Documento", type: "text",  width: 128 },
//             { name: "adjuntar_evidencia",title:"Adjuntar Evidencia", type: "text",  width: 140 },
//             { name: "fecha_registro",title:"Fecha Registro", type: "text", width: 120 },
//             { name: "usuario",title:"Usuario", type: "text", width:150 },
//             { name: "accion_correctiva",title:"Accion Correctiva", type: "text", width: 130},
//             { name: "plan_accion",title:"Plan Accion", type: "text", width: 170 },
//             { name: "desviacion",title:"Desviacion", type: "text", width: 120},
//             {name: "validacion",title:"Validacion", type: "text", width: 200 },
//             {name:"delete", title:"Opcion", type: "customControl" },
//             {name:"eliminar",title:"Opcion",visible:false}
//         ],
//         onOptionChanged:function(a)
//         {},
//         // onItemDeleted: function(args)
//         // {
//         //     id_afectado = "";
//         //     if(args["item"]["eliminar"]=="si")
//         //     {
//         //         $.each(args["item"]["id_principal"][0],function(index,value)
//         //         {
//         //             id_afectado = value;
//         //         });
//         //         eliminarEvidencia(id_afectado);
//         //     }
//         // },
//         // onItemDeleting: function(args)
//         // {
//         //     alert("YO");
//         //     id_afectado = "";
//         //     if(args["item"]["validador"]== "1")
//         //     {
//         //         $.each(args["item"]["id_principal"][0],function(index,value)
//         //         {
//         //             id_afectado = value;
//         //         });
//         //         if(args["item"]["eliminar"]=="si")
//         //             eliminarEvidenciaGrid(id_afectado);
//         //         else
//         //         {
//         //             args.cancel = true;
//         //             swalError("Error no se puede Eliminar ya contiene archivos adjuntos");
//         //         }
//         //     }
//         //     else
//         //         swalInfo("Tu no eres responsable de la evidencia");
//         // },
//         onItemInserting: function(args)
//         {},
//         onItemInserted:function (args)
//         {}
//     });
// }

// var MyCControlField = function(config)
// {
//         // data = {};
//     jsGrid.Field.call(this, config);
//     // console.log(this);
// };
 
// MyCControlField.prototype = new jsGrid.Field
// ({        
//         css: "date-field",
//         align: "center",
//         sorter: function(date1, date2)
//         {
//                 console.log("haber cuando entra aqui");
//                 console.log(date1);
//                 console.log(date2);
//         },
//         itemTemplate: function(value,todo)
//         {
//             // console.log(todo);
//             // console.log(value);
//             if(todo.eliminar=="no")
//                 return "";
//             else
//                 return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-delete-button', type:'button',onClick:"preguntarEliminar("+JSON.stringify(todo)+")"});
//         },
//         insertTemplate: function(value)
//         {
//         },
//         editTemplate: function(value)
//         {
//         },
//         insertValue: function()
//         {
//         },
//         editValue: function()
//         {
//         }
// });

function preguntarEliminar(data)
{
    // console.log(data);
    swal({
        title: "",
        text: "¿Eliminar Evidencia?",
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
                eliminarEvidencia(data.id_evidencias);
            }
        });
}

function refresh()
{
    promesaInicializarFiltros = inicializarFiltros();
    promesaInicializarFiltros.then((resolve)=>
    {
        construirFiltros();
        listarDatos();
    });
//    ejecutarPrimeraVez=false;
//    ejecutando=false;
//    clearInterval(intervalA);
//    clearTimeout(timeOutA);
////    switch(evaluar){
////        case "refreshBoton":
            // loadBlockUi();
            // $("#grid").jsGrid("render").done(function()
            // {
//                swalSuccess("Datos Cargados Exitosamente");
            // });
////        break;
    }

// function loadBlockUi()
// {
//      $.blockUI({message: '<img src="../../images/base/loader.GIF" alt=""/><span style="color:#FFFFFF">Espere Por Favor</span>', css: { 
//                        border: 'none', 
//                        padding: '15px', 
//                        backgroundColor: '#000', 
//                        '-webkit-border-radius': '10px', 
//                        '-moz-border-radius': '10px', 
//                        opacity: .5, 
//                        color: '#fff' 
//                         },overlayCSS: { backgroundColor: '#000000',opacity:0.1,cursor:'wait'} }); 

//                    setTimeout($.unblockUI, 2000);  
// }

// function listarDatosTodos(datosF)
// {
//     if(datosF==undefined)
//     {
//         URL = 'filesEvidenciaDocumento/';
//         d=[];
//         $.ajax
//         ({
//             url: '../Controller/EvidenciasController.php?Op=Listar',
//             type: 'GET',
//             async:false,
//             data:"URL="+URL,
//             beforeSend:function()
//             {},
//             success:function(datos)
//             {
//                 dataListado = datos;
//                 d=reconstruirTab(datos);
//             },
//             error:function(error)
//             {}
//         });
//     }
//     else
//     {
//         d = reconstruirTab(datosF);
//     }
//     return d;
// }

// function reconstruirTable(datosF)
// {
//     construir(datosF);
// }
    
    
// function eliminarEvidenciaGrid(args,id_evidencias)//listo jsgrid
// {
//     $.ajax({
//         url: '../Controller/EvidenciasController.php?Op=EliminarEvidencia',
//         type: 'POST',
//         data: 'ID_EVIDENCIA='+id_evidencias,
//         async:false,
//         success:function(eliminado)
//         {
//             if(eliminado==true){swalSuccess("Se elimino la evidencia");}else{swalError("No se pudo eliminar"); args.cancel = true;  }
//         },
//         error:function()
//         {
//             swalError("Error del servidor");
//         }
//     });
// }

    // function reconstruirTable(data)
    // {
    // }

// function confirmarBorrarRegistroEvidencia()
// {
//     swal({
//         title: "ELIMINAR",
//         text: "Al eliminar este registro se eliminara toda la evidencia registrada. ¿Desea continuar?",
//         type: "warning",
//         showCancelButton: true,
//         closeOnConfirm: false,
//         showLoaderOnConfirm: true,
//         confirmButtonText: "Eliminar",
//         cancelButtonText: "Cancelar",
//         },
//         function(res)
//         {
//             if(res){
//                 swal("","Eliminacion Exitosa","success");
//             }
//             else{
//                 swal("","Error Al Eliminar","Error");
//             }
//         });
// }
        



    // function reconstruirRow(id)//eliminar cuando quede jsgrid
    // {
    //     cargaUno=1;
    //     tempData = "";
    //     $.ajax({
    //         url: "../Controller/EvidenciasController.php?Op=ListarEvidencia",
    //         type: 'GET',
    //         data: 'ID_EVIDENCIA='+id,
    //         success:function(datos)
    //         {
    //             URL = 'filesEvidenciaDocumento/'+id;
    //             $.ajax({
    //                 url: '../Controller/ArchivoUploadController.php?Op=listarUrls',
    //                 type: 'GET',
    //                 data: 'URL='+URL,
    //                 // async: false,
    //                 success: function(todo)
    //                 {
    //                     $.each(datos,function(index,value)
    //                     {
    //                         tempData = reconstruir(todo,value,cargaUno);
    //                         $('#registro_'+id).html(tempData);
    //                         $('#loader').hide();
    //                         swal("","Modificado","success");
    //                         setTimeout(function(){swal.close();},1000);
    //                     });
    //                 },
    //                 error:function()
    //                 {
    //                     swal("","Error del servidor","error");
    //                     setTimeout(function(){swal.close();},1000);
    //                 }
    //             });
    //         },
    //         error:function()
    //         {
    //             swal("","Error del servidor","error");
    //             setTimeout(function(){swal.close();},1000);
    //         }
    //     });
    // }

function reconstruir(value,index)//listo jsgrid
{
    ultimoNumeroGrid = index;
    tempData = new Object();
    tempArchivo="";
    noCheck = "<i class='fa fa-times-circle-o' style='font-size: xx-large;color:red;cursor:pointer' aria-hidden='true'></i>";
    yesCheck = "<i class='fa fa-check-circle-o' style='font-size: xx-large;color:#02ff00;cursor:pointer' aria-hidden='true'></i>";
    noMsj = "<i class='fa fa-file-o' style='font-size: xx-large;color:#6FB3E0;cursor:pointer' aria-hidden='true'></i>";
    yesMsj = "<i class='ace-icon fa fa-file-text-o icon-animated-bell' style='font-size: xx-large;color:#02ff00;cursor:pointer' aria-hidden='true'></i>";
    denegado = "<i class='fa fa-ban' style='font-size: xx-large;color:red;' aria-hidden='true'></i>";
        nametmp="";
        tempData["id_principal"] = [];
        tempData["id_principal"].push({'id_evidencias':value.id_evidencias});
        // tempData["delete"] = [{'id_evidencias':value.id_evidencias,"validador":value.validador }];
        // tempData["delete"] = value.validador;
        tempData["validador"] = value.validador;
        tempData["no"] = index;
        tempData["nombre"] = value.nombre;
        // tempData["requisito"] = value.requisito;
        tempData["registro"] = value.registro;
        tempData["frecuencia"] = value.frecuencia;
        tempData["clave_documento"] = value.clave_documento;
        tempData["fecha_creacion"] = getSinFechaFormato(value.fecha_creacion);
        
        tempData["adjuntar_evidencia"] = "<button onClick='mostrar_urls("+value.id_evidencias+","+value.validador+","+value.validacion_supervisor+","+value.id_usuario+");'";
        tempData["adjuntar_evidencia"] += " type='button' class='botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls'>";
        tempData["adjuntar_evidencia"] += "<i class='fa fa-cloud-upload' style='font-size: 22px'></i></button>";
        
        $.each(value.archivosUpload[0],function(index2,value2)
        {
            tempArchivo="a";
            nametmp = value2.split("^-O-^-M-^-G-^");
            fecha = getFechaStamp(nametmp[0]);
            // fecha = new Date(nametmp[0]*1000);
            // fecha = fecha.getDate() +" "+ months[fecha.getMonth()] +" "+ fecha.getFullYear() +" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
            tempData["fecha_registro"] = fecha;

            tempData["usuario"] = value.usuario;

            tempData["accion_correctiva"] = "<button style='font-size:x-large;color:#39c;background:transparent;border:none;' onClick='MandarNotificacion("+value.id_responsable+","+value.responsable+",\""+value.accion_correctiva+"\","+value.id_evidencias+","+value.validador+");' data-toggle='modal' data-target='#MandarNotificacionModal'>";
            if(value.accion_correctiva!="")
            {
                tempData["accion_correctiva"] += yesMsj+"</button>";
            }
            else
            {
                tempData["accion_correctiva"] += noMsj+"</button>";
            }
            
            tempData["plan_accion"] = "<button id='btn_cargaGantt' class='botones_vista_tabla' onClick='cargarprogram("+value.id_evidencias+","+value.validacion_supervisor+");'>";
            if(value.validacion_supervisor=="true")
                tempData["plan_accion"] += "Vizualizar";
            else
                tempData["plan_accion"] += "Registrar";
            
            tempData["plan_accion"] += "</button>";

            tempData["desviacion"] = "<button style='font-size:x-large;color:#39c;background:transparent;border:none;' onClick='MandarNotificacionDesviacion("+value.id_usuario+","+value.responsable+",\""+value.desviacion+"\","+value.id_evidencias+");' data-toggle='modal' data-target='#MandarNotificacionModal'>";
            if(value.desviacion!="")
            {
                tempData["desviacion"] += yesMsj+"</button>";
            }
            else
            {
                tempData["desviacion"] += noMsj+"</button>";
            }
            
            if(value.responsable=="1")
            {                    
                tempData["validacion"] = "<button style='font-size:x-large;color:#39c;background:transparent;border:none;' onClick='validarEvidencia(this,\"evidencias\",\"validacion_supervisor\",\"id_evidencias\","+value.id_evidencias+","+value.id_usuario+")'>";
                if(value.validacion_supervisor=="true")
                    tempData["validacion"] += yesCheck+"</button>";
                else
                    tempData["validacion"] += noCheck+"</button>";
            }
            else
            {
                if(value.validacion_supervisor=='true')
                {
                    tempData["validacion"] = "<button style='font-size:x-large;color:#39c;background:transparent;border:none;' onClick='swalInfo(\"Validadopor el responsable\")'>";
                    tempData["validacion"] += yesCheck+"</button>";
                }
                else
                {
                    tempData["validacion"] = "<button style='font-size:x-large;color:#39c;background:transparent;border:none;'  onClick='swalInfo(\"Aun no validado\")'>";
                    tempData["validacion"] += noCheck+"</button>";
                }
            }
        });
        if(tempArchivo=="")
        {
                tempData["fecha_registro"]="";
                tempData["usuario"]=value.usuario;
                tempData["accion_correctiva"]="";
                tempData["plan_accion"]="";
                tempData["desviacion"]="";
                tempData["validacion"]="";
                if(value.validador=="1")
                    tempData["id_principal"].push({eliminar:1});
                    // tempData["delete"]=tempData["id_principal"];
                else
                    tempData["id_principal"].push({eliminar:0});
                    // tempData["delete"]=tempData["id_principal"];
        }
        else
            // tempData["opcion"]="";
            tempData["id_principal"].push({eliminar:0});
            // tempData["delete"]=tempData["id_principal"];

    tempData["id_principal"].push({editar:0});//si quieres que edite 1, si no 0
    tempData["delete"]=tempData["id_principal"];
    return tempData;
}


function reconstruirExcel(value,index)
{
    tempData = new Object();
    tempData["No"] = index;
    tempData["Tema"] = value.nombre;
    tempData["Registro"] = value.registro;
    tempData["Frecuencia"] = value.frecuencia;
    tempData["Clave del Documento"] = value.clave_documento;
    tempData["Fecha Evidencia"] = value.fecha_creacion;
    
    if(value.archivosUpload[0].length==0)
    {
        tempData["Fecha Registro"] = "";
        tempData["Archivos Adjuntos"] = "No";           
    }else{
        $.each(value.archivosUpload[0],function(index2,value2)
        {   
            console.log(value2);
            tempArchivo="a";
            nametmp = value2.split("^-O-^-M-^-G-^");
            fecha = getFechaStamp(nametmp[0]);
            
            tempData["Fecha Registro"] = fecha;
            tempData["Archivos Adjuntos"] = "Si";                                   
        });
    }
        
    tempData["Usuario"] = value.usuario;
    tempData["Accion Correctiva"] = value.accion_correctiva;
    if(value.programa_cargado==0)
    {
        tempData["Plan Accion"] = "No";
    }else{
        tempData["Plan Accion"] = "Si";
    }
    tempData["Desviacion"] = value.desviacion;
    if(value.validacion_supervisor=="true")
    {
        tempData["Validacion"] = "Si";
    }else{
        tempData["Validacion"] = "No";
    }
    return tempData
}

function eliminarEvidencia(id_evidencias)
{
    $.ajax({
        url: '../Controller/EvidenciasController.php?Op=EliminarEvidencia',
        type: 'POST',
        data: 'ID_EVIDENCIA='+id_evidencias,
        success:function(eliminado)
        {
            if(eliminado==true)
            {
                dataListadoTemp=[];
                dataItem = [];
                numeroEliminar=0;
                itemEliminar={};
                $.each(dataListado,function(index,value)
                {
                    value.id_evidencias != id_evidencias ? dataListadoTemp.push(value) : (dataItem.push(value), numeroEliminar=index+1);//en el primer value.id_xxxx es el id por el cual se elimino la evidencia, id_evidencias es el que se recibe por parametro entrada
                });
                // itemEliminar = reconstruir(dataItem[0],numeroEliminar);
                DataGrid = [];
                dataListado = dataListadoTemp;
                if(dataListado.length == 0 )
                    ultimoNumeroGrid=0;
                $.each(dataListado,function(index,value)
                {
                    DataGrid.push( reconstruir(value,index+1) );
                });
                gridInstance.loadData();
                growlSuccess("Eliminar","Se elimino la evidencia");
                swal.close();
            }
            else
            {
                growlError("Error Eliminar","No se pudo eliminar la evidencia");
                swal.close();
            }
        },
        error:function()
        {
            growlError("Error Eliminar","Error en el servidor");
            swal.close();
        }
    });
}

    // function validarEvidencia(checkbox,tabla,column,context,id,idPara)
    // {

    // }
function validarEvidencia(checkbox,tabla,column,context,id,idPara)
{
    Obj = $(checkbox);
    Obj = Obj[0].children;
    ($(Obj).hasClass('fa-times-circle-o'))?valor=true:valor=false;
    $.ajax({
            url: "../Controller/EvidenciasController.php?Op=ModificarColumna",
            type: "POST",
            data: "COLUMNA="+column+"&ID_CONTEXTO="+context+"&ID_EVIDENCIA="+id+"&VALOR="+valor,
            beforeSend:function()
            {
                growlWait( "Validación",  valor==true? "Validando evidencia" :"Desvalidando evidencia" );
            },
            success: function(data)
            {
                if(data==true)
                {
                    growlSuccess( "Validación",  valor==true? "Evidencias validada" :"Evidencias desvalidada" );
                    actualizarEvidencia(id);
                    enviar_notificacion( ((valor==true)?
                        "Ha sido validada una Evidencia por ":
                        "Ha sido desvalidada una Evidencia por "),idPara,0,false,"EvidenciasView.php?accion="+id);
                }
                else
                    growlError( valor==true? ("Error Validación","No se pudo validar la evidencia"):("Error Desvalidación", "No se pudo desvalidar la evidencia"));
            },
            error:function()
            {
                growlError( valor==true? "Error Validación":"Error Desvalidación", "Error en el servidor");
            }
        });
}

function actualizarEvidencia(id)
{
    URL = 'filesEvidenciaDocumento/';
    $.ajax({
        url: "../Controller/EvidenciasController.php?Op=ListarEvidencia",
        type: 'GET',
        data: 'ID_EVIDENCIA='+id+"&URL="+URL,
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

function MandarNotificacionDesviacion(idPara,responsable,msj,idEvidencia)
{
    if(responsable==1)
    {
        tempData = "<button onClick='notificar("+idPara+","+idEvidencia+",\"desviacion\")' type='submit' id='subirArchivos'  class='btn crud-submit btn-info form-control'>Enviar</button>";
        $("#BTNENVIAR_MANDARNOTIFICACIONMODAL").html(tempData);
        $("#textAreaNotificacionModal").val(msj);
        $("#myModalLabelMandarNotificacion").html("Enviar Desviación");
    }
    else
    {
        $("#BTNENVIAR_MANDARNOTIFICACIONMODAL").html("");
        $("#textAreaNotificacionModal").val(msj);
        $("#myModalLabelMandarNotificacion").html("Desviación Recibida");
    }
}

function MandarNotificacion(idPara,responsable,msj,idEvidencia,validador)
{
    if(responsable!=1 || validador==1)
    {
        tempData = "<button onClick='notificar("+idPara+","+idEvidencia+",\"accion_correctiva\")' type='submit' id='subirArchivos'  class='btn crud-submit btn-info form-control'>Enviar</button>";
        $("#BTNENVIAR_MANDARNOTIFICACIONMODAL").html(tempData);
        $("#textAreaNotificacionModal").val(msj);
        $("#myModalLabelMandarNotificacion").html("Enviar Accion Correctiva");
    }
    else
    {
        $("#BTNENVIAR_MANDARNOTIFICACIONMODAL").html("");
        $("#textAreaNotificacionModal").val(msj);
        $("#myModalLabelMandarNotificacion").html("Accion Correctiva Recibida");
    }
}

function notificar(idPara,idEvidencia,columna)
{
    mensaje = $("#textAreaNotificacionModal").val();
    if(columna=='accion_correctiva')
        enviar_notificacion("Ha recibido una Acción Correctiva de ",idPara,0,false,"EvidenciasView.php?accion="+idEvidencia);//msj,para,tipomsj,atendido,asunto
    else
//        enviar_notificacion("Ha recibido una Desviación de ",idPara,0,false,"EvidenciasView.php?accion="+idEvidencia);//msj,para,tipomsj,atendido,asunto
        enviar_notificacion("Tiene una Evidencia por Validar ",idPara,0,false,"EvidenciasView.php?accion="+idEvidencia);//msj,para,tipomsj,atendido,asunto
    $.ajax({
            url: '../Controller/EvidenciasController.php?Op=MandarAccionCorrectiva',
            type: 'GET',
            data: 'ID_EVIDENCIA='+idEvidencia+'&MENSAJE='+mensaje+'&COLUMNA='+columna,
            success:function(enviado)
            {
                (enviado==true)?(
                    swalSuccess("Accion correctiva enviada"),
                    reconstruirRow(idEvidencia)
                    ):swalError("No se pudo enviar accion correctiva");
            },
            error:function()
            {
                swalError("Error en el servidor");
            }
        });
}

function enviar_notificacion(mensaje,para,tipoMensaje,atendido,asunto)
{
    $.ajax({
        url:"../Controller/NotificacionesController.php?Op=EnviarNotificacionHibry",
        data: "PARA="+para+"&MENSAJE="+mensaje+"&ATENDIDO="+atendido+"&TIPO_MENSAJE="+tipoMensaje+"&ASUNTO="+asunto,
        success:function(response)
        {
        (response==true)?(
            growlSuccess("Notificación","Se ha notificado")
            // swalSuccess("Se notifico del cambio "),
            //  refresh()
            )
        :growlError("Error Notificación","No se pudo notificar");
        
        },
        error:function()
        {
        growlError("Error Notificación","Error en el servidor");
        // swalError("Error en el servidor");
        }
    });
}

    // function saveOneToDatabase(valor,columna,tabla,id,contexto)
    // {
    //     $.ajax({
    //             url: "../Controller/GeneralController.php?Op=ModificarColumna",
    //             type: 'GET',
    //             data: 'TABLA='+tabla+'&COLUMNA='+columna+'&VALOR='+valor+'&ID='+id+'&ID_CONTEXTO='+contexto,
    //             success: function(modificado)
    //             {
    //                 if(modificado==true)
    //                 {
    //                     reconstruirRow(id);
    //                     // $('#loader').hide();
    //                     // swal("","Modificado","success");
    //                     // setTimeout(function(){swal.close();},1000);
    //                 }
    //                 else
    //                 {
    //                     $('#loader').hide();
    //                     swal("","Ocurrio un error al modificar", "error");
    //                 }
    //               $("#btnAgregarEvidenciasRefrescar").prop("disabled",false);  
    //             },
    //             error:function()
    //             {
    //                 $('#loader').hide();
    //                 swal("","Ocurrio un error al modificar", "error");
    //                 $("#btnAgregarEvidenciasRefrescar").prop("disabled",false);
    //             }
    //         });
    // }
    
    // function saveCheckToDatabase(Obj,columna,tabla,id)
    // {

    // }

    var ModalCargaArchivo = "<form id='fileupload' method='POST' enctype='form-data'>";
        ModalCargaArchivo += "<div class='fileupload-buttonbar'>";
        ModalCargaArchivo += "<div class='fileupload-buttons'>";
        ModalCargaArchivo += "<span class='fileinput-button'>";
        ModalCargaArchivo += "<span id='spanAgregarDocumento'><a >Agregar Archivos(Click o Arrastrar)...</a></span>";
        ModalCargaArchivo += "<input type='file' name='files[]' ></span>";
        ModalCargaArchivo += "<span class='fileupload-process'></span></div>";
        ModalCargaArchivo += "<div class='fileupload-progress' >";
        // ModalCargaArchivo += "<div class='progress' role='progressbar' aria-valuemin='0' aria-valuemax='100'></div>";
        ModalCargaArchivo += "<div class='progress-extended'>&nbsp;</div>";
        ModalCargaArchivo += "</div></div>";
        ModalCargaArchivo += "<table role='presentation'><tbody class='files'></tbody></table></form>";

function mostrar_urls(id_evidencia,validador,validado,id_para)
{
    var tempDocumentolistadoUrl = "";
    URL = 'filesEvidenciaDocumento/'+id_evidencia;
    $.ajax({
        url: '../Controller/ArchivoUploadController.php?Op=listarUrls',
        type: 'GET',
        data: 'URL='+URL,
        async:false,
        success: function(todo)
        {
            if(todo[0].length!=0)
            {
                tempDocumentolistadoUrl = "<table class='tbl-qa'><tr><th class='table-header'>Fecha de subida</th><th class='table-header'>Nombre</th><th class='table-header'></th></tr><tbody>";
                $.each(todo[0], function (index,value)
                {
                    nametmp = value.split("^-O-^-M-^-G-^");
                    name = nametmp[1];
                    fecha = getFechaStamp(nametmp[0]);
                    // fecha = new Date(nametmp[0]*1000);
                    // fecha = fecha.getDate()+" "+ months[fecha.getMonth()] +" "+ fecha.getFullYear() +" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                    // $.each(nametmp, function(index,value)
                    // {
                    //     if(index!=0)
                    //         (index==1)?name=value:name+="-"+value;
                    // });
                    tempDocumentolistadoUrl += "<tr class='table-row'><td>"+fecha+"</td><td>";
                    tempDocumentolistadoUrl += "<a download='"+name+"' href=\""+todo[1]+"/"+value+"\" target='blank'>"+name+"</a></td><td>";
                    if(validador=="1")
                    {
                        if(validado==false)
                        {
                            tempDocumentolistadoUrl += "<button style=\"font-size:x-large;color:#39c;background:transparent;border:none;\"";
                            tempDocumentolistadoUrl += "onclick='borrarArchivo(\""+URL+"/"+value+"\");'>";
                            tempDocumentolistadoUrl += "<i class=\"fa fa-trash\"></i></button>";
                        }
                    }
                    tempDocumentolistadoUrl += "</td></tr>";
                });
                tempDocumentolistadoUrl += "</tbody></table>";
            }
            if(tempDocumentolistadoUrl == "")
            {
                tempDocumentolistadoUrl = " No hay archivos agregados ";
                if(validador=="1")
                {
                    if(validado==false)
                    {
                        $('#DocumentolistadoUrlModal').html(ModalCargaArchivo);
                    }
                }
            }
            else
            {
                $('#DocumentolistadoUrlModal').html("");
            }
            tempDocumentolistadoUrl = tempDocumentolistadoUrl + "<br><input id='tempInputIdEvidenciaDocumento' type='text' style='display:none;' value='"+id_evidencia+"'>"
            tempDocumentolistadoUrl = tempDocumentolistadoUrl + "<br><input id='tempInputIdParaDocumento' type='text' style='display:none;' value='"+id_para+"'>";
            // console.log(tempDocumentolistadoUrl);
            $('#DocumentolistadoUrl').html(tempDocumentolistadoUrl);
            $('#fileupload').fileupload
            ({
                url: '../View/',
            });
            $("#subirArchivos").removeAttr("disabled");
        }
    });
}
    //         else
    //         {
    //           swal("","Error del servidor","error");
    //           $('#loader').hide();
    //         }
    //       }
    //     });
    // }
    // function aumentador()
    // {
    //     alert();
    //     $.ajax({
    //         // url:"../Controller/GeneralController.php?a",
    //         success:function()
    //         {
    //             valor--;
    //         }
    //     });
    // }
    // valor = 8;
function borrarArchivo(url,id_para)
{
    // setInterval(aumentador(), 3000);
    swal({
        title: "ELIMINAR",
        text: "Al eliminar este documento se eliminara toda la evidencia registrada. ¿Desea continuar?",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
    },function()
    {
        var ID_EVIDENCIA_DOCUMENTO = $('#tempInputIdEvidenciaDocumento').val();
        $.ajax({
            url: "../Controller/ArchivoUploadController.php?Op=EliminarArchivo",
            type: 'POST',
            data: 'URL='+url,
            success: function(eliminado)
            {
            if(eliminado)
            {
                growlSuccess("Eliminacion de Archivo","Archivo Eliminado");
                mostrar_urls(ID_EVIDENCIA_DOCUMENTO,"1",false,id_para);
                actualizarEvidencia(ID_EVIDENCIA_DOCUMENTO);
                // setTimeout(function(){
                    swal.close();
                // },1000);
                //  refresh();
            }
            else
            {
                growlError("Error Rliminar Archivo","No se pudo eliminar el archivo");
            }
                //porner los growl
                // swal("","Ocurrio un error al elimiar el documento", "error");
            },
            error:function()
            {
                growlError("Error Eliminar Archivo","Error en el servidor");
            //   swal("","Ocurrio un error al elimiar el documento", "error");
            }
        });
    });
}

function agregarArchivosUrl()
{
    var ID_EVIDENCIA_DOCUMENTO = $('#tempInputIdEvidenciaDocumento').val();
    url = 'filesEvidenciaDocumento/'+ID_EVIDENCIA_DOCUMENTO,
    $.ajax({
        url: "../Controller/ArchivoUploadController.php?Op=CrearUrl",
        type: 'GET',
        data: 'URL='+url,
        success:function(creado)
        {
            if(creado)
            {
                growlWait("Subir Archivo","Cargando Archivo Espere...");
                $('.start').click();
            }
        },
        error:function()
        {
            // swal("","Error del servidor","error");
            growlError("Error Eliminar Archivo","Error en el servidor");
        }
      });
}

// function mostrarRegistros(id_documento)
// {
//     ValoresRegistros = "<ul>";
//         //alert("Registros"+id_documento);
//     $.ajax
//     ({
//         url:"../Controller/EvidenciasController.php?Op=MostrarRegistrosPorDocumento",
//         type: 'POST',
//         data: 'ID_DOCUMENTO='+id_documento,
//         success:function(responseregistros)
//         {
//             $.each(responseregistros, function(index,value)
//             {
//                 ValoresRegistros+="<li>"+value.registros+"</li>";                   
//             });
//             ValoresRegistros += "</ul>";
//             $('#RegistrosListado').html(ValoresRegistros);   
//         }
//     })
// }

intervalA="";
timeOutA="";
mover = '<?php echo $accion; ?>';
// contador=1;
cambio=1;
ejecutando=false;
ejecutarPrimeraVez=true;
    
function moverA()
{
    if(mover!="-1" && ejecutando==false && ejecutarPrimeraVez==true)
    {
        if($("#registro_"+mover)[0]!=undefined)
        {
            ejecutando=true;
            window.location = "#registro_"+mover;
            ObjB = $("#registro_"+mover)[0];
            css = $(ObjB).css("background");
            intervalA = setInterval(function()
            {
                if(cambio==1)
                {
                    $(ObjB).css("background","#DEB887");
                    cambio=0;
                }
                else
                {
                    $(ObjB).css("background",css);
                    cambio=1;
                }
            },500);
            timeOutA = setTimeout(function(){
                clearInterval(intervalA);
                $(ObjB).css("background",css);
                ejecutando=false;
                // contador=1;
                ejecutarPrimeraVez=false;
            },10000);
        }
        else
        {
            swalInfo("El registro al que desea acceder no existe");
        }
    }
}

function swalError(msj)
{
    swal({
            title: '',
            text: msj,
            showCancelButton: false,
            showConfirmButton: false,
            type:"error"
        });
    setTimeout(function(){swal.close();$('#agregarUsuario .close').click()},1500);
    $('#loader').hide();
}

function componerDataListado(value)// id de la vista documento, listo
{
    id_vista = value.id_evidencias;
    id_string = "id_evidencias";
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
//    listarDatosGrid();
//    construirGrid(dataTodo);
//    listarDatos();

//      construir(dataTodo);
function cargarprogram(v,validado)
{
//    alert("el valor de la evidencia es "+v);
//alert("e:  "+validado);
//    window.location.href="GanttEvidenciaView.php?id_evid="+v;
     window.open("GanttEvidenciaView.php?id_evid="+v,'_blank');

}