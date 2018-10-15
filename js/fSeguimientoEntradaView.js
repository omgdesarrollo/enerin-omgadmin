
$(function()
{
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
    return new Promise((resolve,reject)=>
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
            {id:"id_empleado",type:"combobox",data:listarEmpleados(),descripcion:"nombre_completoplan"},
            {id:"noneDos",type:"none"},
            {id:"noneTres",type:"none"},
            {id:"noneCuatro",type:"none"},
            {name:"opcion",id:"opcion",type:"opcion"}
                ];
        resolve();    
    });        
}


function listarDatos()
{
    return new Promise((resolve,reject)=>
    {
        URL = 'filesDocumento/Entrada/';
        var __datos=[];
        $.ajax(
        {
            url:"../Controller/SeguimientoEntradasController.php?Op=Listar",
            type:"GET",
            data:"URL="+URL,
            beforeSend:function()
            {
                growlWait("Solicitud","Solicitando Datos...");
            },
            success:function(data)
            {
                if(typeof(data)=="object")
                {
                    dataListado = data;
                    $.each(data,function(index,value)
                    {
                        __datos.push(reconstruir(value,index++));
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
    tempData["id_empleado"]=value.id_empleado;
    
    tempData["archivo_adjunto"] = "<button onClick='mostrar_urls("+value.id_documento_entrada+")' type='button' class='botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls'>";
    tempData["archivo_adjunto"] += "<i class='fa fa-cloud-upload' style='font-size: 22px'></i></button>";
    
    if(value.avance_programa!=null)
        tempData["registrar_programa"]="<button id='btn_cargaGantt' class='botones_vista_tabla' onClick='cargadePrograma("+JSON.stringify({"id_documento_entrada":value.id_documento_entrada,"folio_entrada":value.folio_entrada})+")'>Vizualizar</button>";
    else
        tempData["registrar_programa"]="<button id='btn_cargaGantt' class='botones_vista_tabla' onClick='cargadePrograma("+JSON.stringify({"id_documento_entrada":value.id_documento_entrada,"folio_entrada":value.folio_entrada})+")'>Cargar</button>";

    tempData["avance_programa"]=(value.avance_programa*100).toFixed(2)+"%"; 
    tempData["id_principal"].push({eliminar : 0});
    tempData["id_principal"].push({editar : 1});
    tempData["delete"]= tempData["id_principal"] ;
    
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
    tempData["Condicion"]=value.condicion;    
    tempData["Responsable del Plan"]=value.nombre_completoplan;
    
    if(value.archivosUpload[0].length==0)
        tempData["Archivo Adjunto"]="No";
    else
        tempData["Archivo Adjunto"]="Si";
        
    tempData["Avance del Programa"]=(value.avance_programa*100).toFixed(2)+"%";
    
    return tempData;
}


function saveUpdateToDatabase(args)//listo
{
        columnas=new Object();
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
                data:'TABLA=seguimiento_entrada'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
                beforeSend:()=>
                {
                        growlWait("Actualización","Espere...");
                },
                success:(data)=>
                {
                        if(data==1)
                        {
                                growlSuccess("Actulización","Se actualizaron los campos");
                                actualizarSeguimientoEntrada(id_afectado.id_seguimiento_entrada);
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

function actualizarSeguimientoEntrada(id_seguimiento_entrada)
{
    URL = 'filesDocumento/Entrada/';
    $.ajax({
        url:'../Controller/SeguimientoEntradasController.php?Op=listarSeguimientoEntrada',
        type: 'POST',
        data:'ID_SEGUIMIENTO_ENTRADA='+id_seguimiento_entrada+"&URL="+URL,
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
    id_vista = value.id_seguimiento_entrada;
    id_string = "id_seguimiento_entrada";
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

function listarThisEmpleados()
{
    return new Promise((resolve,reject)=>
    {
        $.ajax(
            {
                url:"../Controller/SeguimientoEntradasController.php?Op=responsablePlan",
                type:"GET",
                success:function(empleados)
                {
                    thisEmpleados = empleados;
                    resolve();
                    
                },
                error:function(er)
                {
                    reject(er);
                }

            });
    });
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
}