
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
            { name:"no",title:"No",width:40},
            { name: "clave_autoridad",title:"Clave de la Autoridad", type: "text", validate: "required", width:120},
            { name: "descripcion",title:"Descripcion", type: "text", validate: "required" },
            { name: "direccion",title:"Direccion", type: "text", validate: "required" },
            { name: "telefono",title:"Telefono", type: "text", validate: "required" },
            { name: "extension",title:"Extension", type: "text", validate: "required" },
            { name: "email",title:"Email", type: "text", validate: "required" },
            { name: "direccion_web",title:"Direccion Web", type: "text", validate: "required" },
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
                            data:'TABLA=autoridad_remitente'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
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
            console.log(value,todo);
            if(value[0]['resultado']!=0)
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
//    alert("Entra a listarDatos");
    __datos=[];
    datosParamAjaxValues={};
    datosParamAjaxValues["url"]="../Controller/AutoridadesRemitentesController.php?Op=Listar";
    datosParamAjaxValues["type"]="POST";
    datosParamAjaxValues["async"]=false;
    
    var variablefunciondatos=function obtenerDatosServer(data)
    {
        dataListado = data;
        $.each(data.autoridades,function(index,value)
        {
            __datos.push(reconstruir(value,index+1));
        });
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
    tempData["delete"]= [{"resultado":value.resultado}];
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
//                console.log("Este es el value: "+value); 
                   tempData= reconstruir(value,ultimoNumeroGrid+1);  
                });
//                console.log("este es el tempData: "+tempData);
                
                $("#jsGrid").jsGrid("insertItem",tempData).done(function()
                {
                    $("#crea_autoridad .close ").click();
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

                url:"../Controller/AutoridadesRemitentesController.php?Op=Eliminar",
                type:"POST",
                data:"ID_AUTORIDAD="+JSON.stringify(id_afectado),
                success:function(data)
                {
//                    alert("Entro al success "+data);
                    if(data==false)
                    {
//                        swal("","El Documento esta validado o asignado a un Registro","error");
//                        setTimeout(function(){swal.close();},1500);
                        swalError("La Autoridad esta cargada en Documento de Entrada");
                    }else{
                        if(data==true)
                        {
                            refresh();
//                            actualizarDespuesdeEditaryEliminar();
//                            swal("","Se elimino correctamente el Documento","success");
//                            setTimeout(function(){swal.close();},1500);
                            swalSuccess("Se elimino correctamente la Autoridad");
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


function refresh(){
    listarDatos();
    inicializarFiltros();
    construirFiltros();
    gridInstance.loadData();
}




function loadSpinner(){
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


