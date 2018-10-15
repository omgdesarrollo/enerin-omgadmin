
$(function(){
                                                                              
    $("#CLAVE_DOCUMENTO").keyup(function()
    {
        var valueclavedocumento=$(this).val();

        verificarExiste(valueclavedocumento,"clave_documento");

    });

    $("#btn_guardar").click(function()
    {
        documentoDatos=new Object();
        documentoDatos.clave_documento = $("#CLAVE_DOCUMENTO").val();
        documentoDatos.documento = $("#DOCUMENTO").val();
        documentoDatos.id_empleado = $("#ID_EMPLEADOMODAL").val();

        listo=
            (
               documentoDatos.clave_documento!=""?
               documentoDatos.documento!=""?
               documentoDatos.id_empleado!=""?
               true: false: false: false
            );

               listo ?  insertarDocumento(documentoDatos):swalError("Completar campos");
    });


    $("#btn_limpiar").click(function()
    {

              $("#CLAVE_DOCUMENTO").val("");
              $("#DOCUMENTO").val("");
    //          $("#REGISTROS").val("");


    });
    
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
            {id:"clave_documento",type:"text"},
            {id:"documento",type:"text"},
            {id:"id_empleado",type:"combobox",data:listarEmpleados(),descripcion:"nombre_completo"},
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
            { name:"no",title:"No",width:20},
            { name: "clave_documento",title:"Clave del Documento",type: "textarea", validate: "required" },
            { name: "documento",title:"Documento",type: "textarea", validate: "required" },
            { name: "id_empleado",title:"Responsable del Documento", type: "select",
                items:EmpleadosCombobox,
                valueField:"id_empleado",
                textField:"nombre_completo"
            },
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
                            data:'TABLA=documentos'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
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
            if(value[0]['reg']!="0" || value[0]['validado']!=0)
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
    datosParamAjaxValues["url"]="../Controller/DocumentosController.php?Op=Listar";
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
        DataGridExcel= __datosExcel;
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
    tempData["id_principal"]= [{'id_documento':value.id_documento}];
    tempData["no"]= index;
    tempData["clave_documento"]=value.clave_documento;
    tempData["documento"]=value.documento;
    tempData["id_empleado"]=value.id_empleado;
    tempData["delete"]= [{"reg":value.reg,"validado":value.validado}];
    return tempData;
}

function reconstruirExcel(value,index)
{
//    console.log(value);
    tempData=new Object();
//    ultimoNumeroGrid = index;
//    tempData["id_principal"]= [{'id_documento':value.id_documento}];
    tempData["No"]= index;
    tempData["Clave del Documento"]=value.clave_documento;
    tempData["Documento"]=value.documento;
    tempData["Responsable del Documento"]=value.nombre_empleado+" "+value.apellido_paterno+" "+value.apellido_materno;
//    tempData["delete"]= [{"reg":value.reg,"validado":value.validado}];
    return tempData;
}


//function empleadosComboboxparaModal()
//{
//  
//  $.ajax({
//      url:"../Controller/EmpleadosController.php?Op=mostrarcombo",
//      type:"GET",
//      success:function(empleados)
//      {
//          tempData="";
//          $.each(empleados,function(index,value)
//          {
////                tempData+="<option value='"+value.id_empleado+"'>"+value.nombre_empleado+" "+value.apellido_paterno+" "+value.apellido_materno+"</option>";
//                tempData+="<option value='"+value.id_empleado+"'>"+value.nombre_completo+"</option>";
//          }); 
//          
//          $("#ID_EMPLEADOMODAL").html(tempData);
//      }
//  });   
//}


function listarEmpleados()
{
    $.ajax({
        url:"../Controller/DocumentosController.php?Op=nombresCompletos",
        type:"GET",
        async:false,
        success:function(empleadosComb)
        {
            EmpleadosCombobox=empleadosComb;
            tempData="";
            $.each(empleadosComb,function(index,value)
            {
  //                tempData+="<option value='"+value.id_empleado+"'>"+value.nombre_empleado+" "+value.apellido_paterno+" "+value.apellido_materno+"</option>";
                  tempData+="<option value='"+value.id_empleado+"'>"+value.nombre_completo+"</option>";
            }); 

            $("#ID_EMPLEADOMODAL").html(tempData);
        }
    });
    return EmpleadosCombobox;
}

function insertarDocumento(documentoDatos)
{
//    alert("Entro a la funcion guardar");
        $.ajax({
        url:"../Controller/DocumentosController.php?Op=Guardar",
        type:"POST",
        data:"documentoDatos="+JSON.stringify(documentoDatos),
        async:false,
        success:function(datos)
        {
//            alert("valor datos: "+datos);
//            console.log(datos);
            if(typeof(datos) == "object")
            {
                tempData;
                swalSuccess("Documento Creado");                
                $.each(datos,function(index,value)
                {
//                   console.log("Este es el value: "+value); 
                   tempData= reconstruir(value,ultimoNumeroGrid+1);  
                });
//                console.log(tempData);
                
                $("#jsGrid").jsGrid("insertItem",tempData).done(function()
                {
                    $("#crea_documento .close ").click();
                });
                
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


function verificarExiste(dataString,cualverificar)
{

$.ajax({
    type: "POST",
    url: "../Controller/DocumentosController.php?Op=verificacionexisteregistro&cualverificar="+cualverificar,
    data: "registro="+dataString,
    success: function(data) {    
    mensajeerror="";

        $.each(data, function (index,value) {
            mensajeerror=" El Documento "+value.clave_documento+" Ya Existe";
        });
    $("#msgerrorclave").html(mensajeerror);
        if(mensajeerror!=""){
            $("#msgerrorclave").css("background","orange");
            $("#msgerrorclave").css("width","190px");
            $("#msgerrorclave").css("color","white");
            $("#btn_guardar").prop("disabled",true);
        }else{
            $("#btn_guardar").prop("disabled",false);
        }



        }
    })
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
                id_afectado=item['id_principal'][0];
    
            $.ajax({

                url:"../Controller/DocumentosController.php?Op=Eliminar",
                type:"POST",
                data:"ID_DOCUMENTO="+JSON.stringify(id_afectado),
                success:function(data)
                {
//                    alert("Entro al success "+data);
                    if(data==false)
                    {
//                        swal("","El Documento esta validado o asignado a un Registro","error");
//                        setTimeout(function(){swal.close();},1500);
                        swalError("El Documento esta validado o asignado a un Registro");
                    }else{
                        if(data==true)
                        {
                            refresh();
//                            actualizarDespuesdeEditaryEliminar();
//                            swal("","Se elimino correctamente el Documento","success");
//                            setTimeout(function(){swal.close();},1500);
                            swalSuccess("Se elimino correctamente La Tarea");
                        }
                    }
                },
                error:function()        
                {
                    swal("","Error en el servidor","error");
                    setTimeout(function(){swal.close();},1500);
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
}

function loadSpinner()
{
    myFunction();
}


function actualizarDespuesdeEditaryEliminar()
{
   listarEmpleados();
   listarDatos();
   gridInstance.loadData();
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