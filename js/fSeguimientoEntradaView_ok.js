
$(function(){
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

}); //LLAVE CIERRE FUNCTION



function inicializarFiltros()
{
    filtros =[
            {id:"noneUno",type:"none"},
            {id:"folio_entrada",type:"text"},
            {id:"clave_autoridad",type:"text"},
            {id:"asunto",type:"text"},
            {id:"id_empleadotema",type:"combobox",data:listarEmpleados(),descripcion:"nombre_completotema"},
            {id:"fecha_asignacion",type:"date"},
            {id:"fecha_limite_atencion",type:"date"},
            {id:"fecha_alarma",type:"date"},
            {id:"status_doc",type:"combobox",descripcion:"descripcion",
                data:[
                        {"status_doc":"1","descripcion":"En Proceso"},
                        {"status_doc":"2","descripcion":"Suspendido"},
                        {"status_doc":"3","descripcion":"Terminado"}
                    ]
            },
//            {id:"condicion",type:"text"},
            {id:"condicion",type:"combobox",descripcion:"descripcion",
                data:[
                        {"condicion":"Alarma Vencida","descripcion":"Alarma Vencida"},
                        {"condicion":"En Tiempo","descripcion":"En Tiempo"},
                        {"condicion":"Suspendido","descripcion":"Suspendido"},
                        {"condicion":"Terminado","descripcion":"Terminado"},
                        {"condicion":"Tiempo Limite","descripcion":"Tiempo Limite"},
                        {"condicion":"Tiempo Vencido","descripcion":"Tiempo Vencido"}
                    ]
            },
            {id:"id_empleadoplan",type:"combobox",data:listarEmpleados(),descripcion:"nombre_completoplan"},
            {id:"noneDos",type:"none"},
            {id:"noneTres",type:"none"},
            {id:"noneCuatro",type:"none"},
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
            loadBlockUi();
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
            { name:"no",title:"No",width:50},
            { name: "folio_entrada",title:"Folio de Entrada", type: "text", validate: "required",width:180,editing:false},
            { name: "clave_autoridad",title:"Autoridad Remitente", type: "text", validate: "required",width:180,editing:false},
            { name: "asunto",title:"Asunto", type: "text", validate: "required",width:180,editing:false},
            { name: "id_empleadotema",title:"Responsable del Tema", type: "text", validate: "required",width:250,editing:false},
            { name: "fecha_asignacion",title:"Fecha de Asignacion", type: "text", validate: "required",width:180,editing:false},            
            { name: "fecha_limite_atencion",title:"Fecha Limite de Atencion", type: "text", validate: "required",width:200,editing:false},            
            { name: "fecha_alarma",title:"Fecha de Alarma", type: "text", validate: "required",width:160,editing:false},
            { name: "status_doc",title:"Estatus", type: "text",width:110, validate: "required",editing:false},
            { name: "condicion",title:"Condición", type: "text", validate: "required",width:140,editing:false},
            { name: "id_empleadoplan",title:"Responsable del Plan", type: "select",width:250,
                items:EmpleadosCombobox,
                valueField:"id_empleadoplan",
                textField:"nombre_completoplan"
            },
            { name: "archivo_adjunto",title:"Archivo Adjunto", type: "text", validate: "required",width:140, editing:false },            
            { name: "registrar_programa",title:"Programa", type: "text", validate: "required",width:110, editing:false },
            { name: "avance_programa",title:"Avance del Programa", type: "text", validate: "required",width:170,editing:false },           
            { name:"delete", title:"Opción", type:"customControl",sorting:""}
        ],
        onItemUpdated: function(args)
        {
            console.log(args);
            columnas={};
            id_afectado=args["item"]["id_principal"][0];
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
                            data:'TABLA=seguimiento_entrada'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
                            success:function(exito)
                            {
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
//            alert(value,todo);
//            if(value[0]['reg']!="0" || value[0]['validado']!=0)
//                return "";
//            else
//                return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-delete-button ',title:"Eliminar", type:'button',onClick:"preguntarEliminar("+JSON.stringify(todo)+")"});
            return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-edit-button ',title:"Editar", type:'button'});
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
    datosParamAjaxValues["url"]="../Controller/SeguimientoEntradasController.php?Op=Listar";
    datosParamAjaxValues["type"]="POST";
    datosParamAjaxValues["async"]=false;
    
    var variablefunciondatos=function obtenerDatosServer (data)
    {
        dataListado = data;
        $.each(data,function(index,value)
        {
            __datos.push(reconstruir(value,index++));
        });
        
        $.each(data,function(index,value)
        {
            __datosExcel.push(reconstruirExcel(value,index++));
        });
        
        DataGridExcel=__datosExcel;
    }
    
    
    var listfunciones=[variablefunciondatos];
    ajaxHibrido(datosParamAjaxValues,listfunciones);
    DataGrid = __datos;
}


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
    tempData["id_principal"]= [{'id_seguimiento_entrada':value.id_seguimiento_entrada}];
    tempData["no"]= index;
    tempData["folio_entrada"]=value.folio_entrada;
    tempData["clave_autoridad"]=value.clave_autoridad;
    tempData["asunto"]=value.asunto;
    tempData["id_empleadotema"]=value.nombre_completotema;
    tempData["fecha_asignacion"]= getSinFechaFormato(value.fecha_asignacion);
    tempData["fecha_limite_atencion"]= getSinFechaFormato(value.fecha_limite_atencion);
    tempData["fecha_alarma"]= getSinFechaFormato(value.fecha_alarma);
        if(value.status_doc== "1")
        {
            tempData["status_doc"]="En Proceso";
        };
        if(value.status_doc== "2")
        {
            tempData["status_doc"]="Supendido";
        };
        if(value.status_doc== "3")
        {
        	
            tempData["status_doc"]="Terminado";
        };
//        valGantt.push({"id_documento_entrada":value.id_documento_entrada,"folio_entrada":value.folio_entrada});
    tempData["condicion"]=value.condicion;    
    tempData["id_empleadoplan"]=value.id_empleadoplan;
    tempData["archivo_adjunto"] = "<button onClick='mostrar_urls("+value.id_documento_entrada+")' type='button' class='botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls'>";
    tempData["archivo_adjunto"] += "<i class='fa fa-cloud-upload' style='font-size: 22px'></i></button>";
    if(value.avance_programa!=null)
        tempData["registrar_programa"]="<button id='btn_cargaGantt' class='botones_vista_tabla' onClick='cargadePrograma("+JSON.stringify({"id_documento_entrada":value.id_documento_entrada,"folio_entrada":value.folio_entrada})+")'>Vizualizar</button>";
    else
        tempData["registrar_programa"]="<button id='btn_cargaGantt' class='botones_vista_tabla' onClick='cargadePrograma("+JSON.stringify({"id_documento_entrada":value.id_documento_entrada,"folio_entrada":value.folio_entrada})+")'>Cargar</button>";

    tempData["avance_programa"]=(value.avance_programa*100).toFixed(2)+"%";    
//    tempData["delete"]= [{"reg":value.reg,"validado":value.validado}];

//este lo voy a checar no borrar
//var n2 = 12.398491;
//n2 = parseFloat(n2);
//alert('Con redondeo: ' + parseFloat(n2).toFixed(2));
//var a2 = Math.floor(n2 * 100) / 100;
//alert('Sin redondeo: ' + a2.toFixed(2));
 //aqui termina lo que voy a a checar
// var a2 = Math.floor(n2 * 100) / 100;
//alert('Sin redondeo: ' + a2.toFixed(2));
// aqui termina lo que voy a a checar
 
 
    return tempData;
}



function reconstruirExcel(value,index)
{
    tempData=new Object();
//    ultimoNumeroGrid = index;
//    tempData["id_principal"]= [{'id_seguimiento_entrada':value.id_seguimiento_entrada}];
    tempData["No"]= index;
    tempData["Folio de Entrada"]=value.folio_entrada;
    tempData["Autoridad Remitente"]=value.clave_autoridad;
    tempData["Asunto"]=value.asunto;
    tempData["Responsable del Tema"]=value.nombre_completotema;
    tempData["Fecha de Asignacion"]= getSinFechaFormato(value.fecha_asignacion);
    tempData["Fecha Limite de Atencion"]= getSinFechaFormato(value.fecha_limite_atencion);
    tempData["Fecha de alarma"]= getSinFechaFormato(value.fecha_alarma);
        if(value.status_doc== "1")
        {
            tempData["Status"]="En Proceso";
        };
        if(value.status_doc== "2")
        {
            tempData["Status"]="Supendido";
        };
        if(value.status_doc== "3")
        {
            tempData["Status"]="Terminado";
        };
//        valGantt.push({"id_documento_entrada":value.id_documento_entrada,"folio_entrada":value.folio_entrada});
    tempData["Condicion Logica"]=value.condicion;    
    tempData["Responsable del Plan"]=value.nombre_completoplan;
//    tempData["archivo_adjunto"] = "<button onClick='mostrar_urls("+value.id_documento_entrada+")' type='button' class='btn btn-info' data-toggle='modal' data-target='#create-itemUrls'>";
//    tempData["archivo_adjunto"] += "<i class='fa fa-cloud-upload' style='font-size: 20px'></i> Mostrar</button>";
//    tempData["registrar_programa"]="<button id='btn_cargaGantt' class='btn btn-info' onClick='cargadePrograma("+JSON.stringify({"id_documento_entrada":value.id_documento_entrada,"folio_entrada":value.folio_entrada})+")'>Cargar Programa</button>";
    tempData["Avance del Programa"]=(value.avance_programa*100).toFixed(2)+"%";    
//    tempData["delete"]= [{"reg":value.reg,"validado":value.validado}]; 
    return tempData;
}


function listarEmpleados()
{
    $.ajax({
        url:"../Controller/SeguimientoEntradasController.php?Op=nombresCompletos",
        type:"GET",
        async:false,
        success:function(empleadosComb)
        {
            EmpleadosCombobox=empleadosComb;
        }
    });
    return EmpleadosCombobox;
}

months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

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
//                                        tempDocumentolistadoUrl += "<td><button style=\"font-size:x-large;color:#39c;background:transparent;border:none;\"";
//                                        tempDocumentolistadoUrl += "onclick='borrarArchivo(\""+URL+"/"+value+"\");'>";
//                                        tempDocumentolistadoUrl += "<i class=\"fa fa-trash\"></i></button></td></tr>";
                                });
                                tempDocumentolistadoUrl += "</tbody></table>";
                        }
                        if(tempDocumentolistadoUrl == " ")
                        {
                                tempDocumentolistadoUrl = " No hay archivos agregados ";
                        }
                        tempDocumentolistadoUrl = tempDocumentolistadoUrl + "<br><input id='tempInputIdDocumento' type='text' style='display:none;' value='"+id_documento_entrada+"'>";
                        // alert(tempDocumentolistadoUrl);
//                        $('#DocumentoEntradaAgregarModal').html(" ");
//                        $('#DocumentolistadoUrlModal').html(ModalCargaArchivo);
                        $('#DocumentolistadoUrl').html(tempDocumentolistadoUrl);
                        // $('#fileupload').fileupload();
//                        $('#fileupload').fileupload({
//                        url: '../View/',
//                        });
                }
        });
}


function cargadePrograma(val){
window.open("GanttView.php?id_documento_entrada="+val.id_documento_entrada+"&folio_entrada="+val.folio_entrada,"_blank");
//    window.location.href=" GanttView.php?id_documento_entrada="+val.id_documento_entrada+"&folio_entrada="+val.folio_entrada;
      
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