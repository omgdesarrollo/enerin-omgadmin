$(function()
{
    var $btnDLtoExcel = $('#toExcel'); 
    $btnDLtoExcel.on('click', function () 
    {   
        __datosExcel=[]
        $.each(dataListado,function (index,value)
            {
                // console.log("Entro al datosExcel");
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

    // $("#BTN_ANTERIOR_GRAFICAMODAL").click(function()
    // {
    //     // google.charts.setOnLoadCallback(drawChart);
    //     // if(activeChart != 0)
    //     // {
    //     //     alert("anterior");
    //     //     $(this).html("Anterior");
    //     //     activeChart = 0;
    //     //     selectChart();
    //     // }
    //     // else
    //     // {
    //         // alert("primero");
    //         // $(this).html("Anterior");
    //         activeChart = -1;
    //         graficar();
    //     // }
    // });

}); //SE CIERRA EL $(FUNCTION())


function inicializarFiltros()
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
            { id:"noneUno", type:"none"},
            { id: "clave_documento",name:"clave_documento", type: "text"},
            { id: "documento",name:"documento", type: "text"},
            { id: "nombrecompleto",name:"nombrecompleto", type: "text"},
            { id:"noneDos", type:"none"},
            { id:"noneTres", type:"none"},
            { id:"noneCuatro", type:"none"},
//            { id: "status",name:"status", type: "text"},
            { id: "estatus",name:"validacion_tema_responsable", type: "combobox",
                data:[{estatus:0,descripcion:"Sin Asignar"},{estatus:1,descripcion:"En Proceso"},{estatus:2,descripcion:"Validado"}],descripcion:"descripcion"},
            {name:"opcion",id:"opcion",type:"opcion"}
            // 3075264647556791394195
            // { id:"delete", name:"Opción", type:"customControl",sorting:""},
        ];
        resolve();
    });
}

function listarDatos()
{

    return new Promise((resolve,reject)=>
    {
        URL = 'filesValidacionDocumento/';
        __datos=[];
        $.ajax({
//            url: '../Controller/EvidenciasController.php?Op=Listar',
            url:'../Controller/InformeValidacionDocumentosController.php?Op=listarparametros(v,nv,sd)',
            type: 'GET',
            data:'URL='+URL,
            beforeSend:function()
            {
                growlWait("Solicitud","Solicitando Datos...");
            },
            success:function(data)
            {
                if(typeof(data)=="object")
                {
                    growlSuccess("Solicitud","Registros obtenidos");
                    dataListado = data.info;
                    $.each(data.info,function (index,value)
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
                    growlSuccess("Solicitud","No Existen Registros De Validacion Documentos");
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

   var gridInstance,db={};


    var si_hay_cambio=false;
    dataRegistro="";
    dataListado=[];
    dataTodo=[];
    __refresh=false;




function refresh()
{
    promesaInicializarFiltros = inicializarFiltros();
    promesaInicializarFiltros.then((resolve)=>
    {
        construirFiltros();
        listarDatos();
    });
}
  
function reconstruir(value,index)//listo jsgrid
{
    ultimoNumeroGrid = index;
    tempData = new Object();
    tempData["id_principal"] = [];
    tempData["id_principal"].push({'id_validacion_documento':value.id_validacion_documento});
    tempData["no"] = index; 
    tempData["clave_documento"] = value.clave_documento; 
    tempData["documento"] = value.documento; 
    tempData["nombrecompleto"] = value.nombrecompleto; 
    tempData["temasmodal"]="<button onClick='mostrarTemaResponsable("+value.id_documento+");' type='button' class='btn btn-success btn_agregar' data-toggle='modal' data-target='#mostrar-temaresponsable'><i class='ace-icon fa fa-book' style='font-size: 20px;'></i>Ver</button>";
    tempData["requisitosmodal"]="<button onClick='mostrarRequisitos("+value.id_documento+");' type='button' class='btn btn-success btn_agregar' data-toggle='modal' data-target='#mostrar-requisitos'><i class='ace-icon fa fa-book' style='font-size: 20px;'></i>Ver</button>";
    
    
    tempData["estatus"]= value.estatus == 0 ? "Sin Asignar" : value.estatus == 1 ? "En Proceso" : "Validado";
    
    tempData["archivoAdjunto"]="<button onClick='mostrar_urls("+value.id_validacion_documento+");' type='button' class='botones_vista_tabla' data-toggle='modal' data-target='#create-itemUrls'><i class='fa fa-cloud-upload' style='font-size: 22px'></i></button>";

    tempData["id_principal"].push({eliminar:0})
    tempData["id_principal"].push({editar:0});//si quieres que edite 1, si no 0
    tempData["delete"]=tempData["id_principal"];
    return tempData;
}


function reconstruirExcel(value,index)//listo jsgrid
{
//    ultimoNumeroGrid = index;
    tempData = new Object();
//    tempData["id_principal"] = [];
//    tempData["id_principal"].push({'id_validacion_documento':value.id_validacion_documento});
    tempData["No"] = index; 
    tempData["Clave del Documento"] = value.clave_documento; 
    tempData["Nombre del Documento"] = value.documento; 
    tempData["Responsable"] = value.nombrecompleto;
    if(value['temas_responsables'].length==0)
    {
        tempData["Tema"] = "";
        tempData["Responsable del Tema"] = "";        
    }else{
        $.each(value['temas_responsables'],function(index2,value2){
            
            tempData["Tema"] = value2.nombre_tema;
            tempData["Responsable del Tema"] = value2.nombre_completotema;
        });
    }
    if(value['requisitos'].length==0)
    {
        tempData["Requisito"] = "";
    }else{
        $.each(value['requisitos'],function(index2,value2){
            tempData["Requisito"] = value2.requisito;
        });
    }
    if(value.archivosUpload[0].length==0 )
    {
       tempData["Archivo Adjunto"] = "No"; 
    }else{
        $.each(value.archivosUpload[0],function(index2,value2){
            tempData["Archivo Adjunto"] = "Si";
        });
    }
    tempData["Estatus"]=(value.validacion_tema_responsable=="false")?"En Proceso":"Validado";

    return tempData;
}

function mostrarTemaResponsable(id_documento)
{
    ValoresTemaResponsable = "<table class='tbl-qa'>\n\
                                <tr>\n\
                                    <th class='table-header'>Tema</th>\n\
                                    <th class='table-header'>Responsable del Tema</th>\n\
                                </tr>\n\
                                <tbody>";
    $.ajax ({
        url:"../Controller/InformeValidacionDocumentosController.php?Op=MostrarTemayResponsable",
        type:'POST',
        data:'ID_DOCUMENTO='+id_documento,
        success:function(responseTemayResponsable)
        {
            $.each(responseTemayResponsable,function(index,value){
              ValoresTemaResponsable+="<tr><td>"+value.nombre_tema+"</td>" ;
              ValoresTemaResponsable+="<td>"+value.nombre_completotema+"</td></tr>";  

            });

            ValoresTemaResponsable += "</tbody></table>";
            $('#TemayResponsableListado').html(ValoresTemaResponsable);
        }

    })

}

function mostrarRequisitos(id_documento)
{
        ValoresRequisitos = "<ul>";

        $.ajax ({
            url: "../Controller/InformeValidacionDocumentosController.php?Op=MostrarRequisitosPorDocumento",
            type: 'POST',
            data: 'ID_DOCUMENTO='+id_documento,
            success:function(datosRequisitos)
            {
               $.each(datosRequisitos,function(index,value){
                
                ValoresRequisitos+="<li>"+value.requisito+"</li>";                                       

               });
           ValoresRequisitos += "</ul>";     
               $('#RequisitosListado').html(ValoresRequisitos);
            }
        });
}

function mostrar_urls(id_validacion_documento)//listo
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
                });
                tempDocumentolistadoUrl += "</tbody></table>";
            }
            if(tempDocumentolistadoUrl == "")
            {
                    tempDocumentolistadoUrl = " No hay archivos agregados ";
            }
            tempDocumentolistadoUrl = tempDocumentolistadoUrl + "<br><input id='tempInputIdValidacionDocumento' type='text' style='display:none;' value='"+id_validacion_documento+"'>";                  
        
           
            $('#DocumentolistadoUrl').html(tempDocumentolistadoUrl);
            $('#fileupload').fileupload
            ({
                url: '../View/',
            });
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
        var id_validacion_documento = $('#tempInputIdEvidenciaDocumento').val();
        $.ajax({
            url: "../Controller/ArchivoUploadController.php?Op=EliminarArchivo",
            type: 'POST',
            data: 'URL='+url,
            success: function(eliminado)
            {
            if(eliminado)
            {
                growlSuccess("Eliminacion de Archivo","Archivo Eliminado");
                mostrar_urls(id_validacion_documento,"1",false,id_para);
                actualizarEvidencia(id_validacion_documento);
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
    var id_validacion_documento = $('#tempInputIdEvidenciaDocumento').val();
    url = 'filesEvidenciaDocumento/'+id_validacion_documento,
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

function cargarprogram(v,validado)
{
//    alert("el valor de la evidencia es "+v);
//alert("e:  "+validado);
    window.location.href="GanttEvidenciaView.php?id_evid="+v;
}

function graficar()
{
    let dataGrafica=[];
    let validados = 0;
    let validados_data = [];
    let proceso = 0;
    let proceso_data = [];
    let sin_asignar = 0;
    let sin_asignar_data = [];
    let tituloGrafica = "VALIDACIÓN DOCUMENTOS";
    let bandera = 0;

    $.each(dataListado,(index,value)=>{
        if(value.estatus == 0)
        {
            sin_asignar++;
            $.each(value.temas_responsables,(ind,val)=>{
                sin_asignar_data.push(value);
            });
        }
        if(value.estatus == 1)
        {
            proceso++;
            $.each(value.temas_responsables,(ind,val)=>{
                proceso_data.push(value);
            })
        }
        if(value.estatus == 2)
        {
            validados++;
            $.each(value.temas_responsables,(ind,val)=>{
                validados_data.push(value);
            });
        }
    });
    
    if(sin_asignar!=0)
        dataGrafica.push(["Sin Asignar",sin_asignar,">> Documentos:"+sin_asignar.toString(),JSON.stringify(sin_asignar_data),1]);
    if(proceso!=0)
        dataGrafica.push(["En Proceso",proceso,">> Documentos:"+proceso.toString(),JSON.stringify(proceso_data),1]);
    if(validados!=0)
        dataGrafica.push(["Validados",validados,">> Documentos:"+validados.toString(),JSON.stringify(validados_data),1]);

    $.each(dataGrafica,function(index,value){
        if(value[1] != 0)
            bandera=1;
    });

    if(bandera == 0)
    {
        dataGrafica.push([ "NO EXISTEN DOCUMENTOS",1,"SIN DOCUMENTOS","[]"]);
        tituloGrafica = "NO EXISTEN DOCUMENTOS";
    }
    construirGrafica(dataGrafica,tituloGrafica);
}

function graficar2(datos,concepto)
{
    let lista = new Object();
    let dataGrafica = [];
    let tituloGrafica = "DOCUMENTOS POR TEMA";

    datos = JSON.parse(datos);
    $.each(datos,(index,value)=>{
        $.each(value.temas_responsables,(ind,val)=>{
            if(lista[val.id_tema]==undefined)
            {
                lista[val.id_tema]=[];
                lista[val.id_tema]["id_tema"] = val.id_tema;
                lista[val.id_tema]["no_tema"] = val.no;
                lista[val.id_tema]["nombre_tema"] = val.nombre_tema;
                lista[val.id_tema]["tema_responsable"] = val.nombre_completotema;
                lista[val.id_tema]["documentos"]=[];
            }
            lista[val.id_tema]["documentos"].push(value);
        });
    });
    
    $.each(lista,(index,value)=>{
        dataGrafica.push(["Tema: "+value.no_tema,value.documentos.length,">> Tema:\n"+value.nombre_tema+"\n>> Responsable:\n"+value.tema_responsable+"\n>> Documentos:"+value.documentos.length,JSON.stringify(value.documentos),2]);
    });
    construirGrafica(dataGrafica,tituloGrafica);
}

graficar3 = (datos,concepto)=>
{
    let lista = new Object();
    let dataGrafica = [];
    let tituloGrafica = "DETALLES DE DOCUMENTOS";

    datos = JSON.parse(datos);
    $.each(datos,(index,value)=>{
        if(lista[value.id_documento]==undefined)
            lista[value.id_documento]=[];
        lista[value.id_documento].push(value);
    });
    
    $.each(lista,(index,value)=>{
        dataGrafica.push(["Documento: "+value[0].clave_documento,value.length,">> Documento:\n"+value[0].documento+"\n>> Responsable:\n"+value[0].nombrecompleto+"\n>> Documentos:"+value.length,"[]",-1]);
    });
    construirGrafica(dataGrafica,tituloGrafica);
}
