
var RegionesFiscalesComboDhtml;
var contratoComboDhtml;
var ubicacionComboDhtml;
var tagPatinComboDhtml;
var tagMedidorComboDhtml;
var tipoMedidorComboDhtml;
var clasificacionComboDhtml;
var hidrocarburoComboDhtml;
var id_catalogop;
var tag_medidor;

$(function (){
        
    $("#btn_guardar_reportediario").click(function()
    {
        var FECHA_CREACION= $("#INPUT_FECHA_NUEVOREGISTRO").val();
        var ID_CATALOGOP=id_catalogop;
        
//        alert("FECHA_CREACION: "+FECHA_CREACION+ "ID_CATALOGOP: "+ID_CATALOGOP);
        
        datos=[];
        datos.push(FECHA_CREACION);
        datos.push(ID_CATALOGOP);
        
        listo=
            (
               FECHA_CREACION!=""?
               ID_CATALOGOP!=""?
               true: false: false
            );
            
//            alert("valor listo: "+listo);
           listo ?  insertarReporte(datos):swalError("Completar campos");
   
    });
    
    $("#btn_limpiar").click(function(){
                   
          $("#INPUT_FECHA_NUEVOREGISTRO").val("");
          RegionesFiscalesComboDhtml.setComboText("");
          contratoComboDhtml.setComboText("");
          ubicacionComboDhtml.setComboText("");
          tagPatinComboDhtml.setComboText("");
          tagMedidorComboDhtml.setComboText("");
          tipoMedidorComboDhtml.setComboText("");
          clasificacionComboDhtml.setComboText("");
          hidrocarburoComboDhtml.setComboText("");
    });
    

    RegionesFiscalesComboDhtml.attachEvent("onChange", function(value, text)
    {
            region_fiscal=text;
            selectItemCombo(value,text);
    }); 
    RegionesFiscalesComboDhtml.attachEvent("onOpen", function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    ubicacionComboDhtml.attachEvent("onChange", function(value, text)
    {
        ubicacion=text;
        selectItemComboUbicacion(value,text);
    });
    ubicacionComboDhtml.attachEvent("onOpen", function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    tagPatinComboDhtml.attachEvent("onChange", function(value, text)
    {
        tag_patin=text;
        selectItemComboTagPatin(value,text);
    });
    
    tagPatinComboDhtml.attachEvent("onOpen", function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    tagMedidorComboDhtml.attachEvent("onChange", function(value, text)
    {
        tag_medidor=text;
        selectItemComboTagMedidor(value,text);
    });  
    tagMedidorComboDhtml.attachEvent("onOpen", function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
}); //CIERRA $(FUNCTION())


function inicializarFiltros()
{
    filtros =[
            {id:"noneUno",type:"none"},
            {id:"clave_contrato",type:"text"},
            {id:"region_fiscal",type:"text"},
            {id:"ubicacion",type:"text"},
            {id:"tag_patin",type:"text"},
            {id:"tipo_medidor",type:"text"},
            {id:"tag_medidor",type:"text"},
            {id:"clasificacion",type:"text"},
            {id:"hidrocarburo",type:"text"},
            {id:"omgc1",type:"date"},
            {id:"omgc2",type:"text"},
            {id:"omgc3",type:"text"},
            {id:"omgc4",type:"text"},
            {id:"omgc5",type:"text"},
            {id:"omgc6",type:"text"},
            {id:"omgc7",type:"text"},
            {id:"omgc8",type:"text"},
            {id:"omgc9",type:"text"},
            {id:"omgc10",type:"text"},
            {id:"omgc11",type:"text"},
            {id:"omgc12",type:"text"},
            {id:"omgc13",type:"text"},
            {id:"omgc14",type:"text"},
            {id:"omgc15",type:"text"},
            {id:"omgc16",type:"text"},
            {id:"omgc17",type:"text"},
            {name:"opcion",id:"opcion",type:"opcion"}
            ];
}
              

function selectItemCombo(value,text)
{
    buscarPorRegionFiscal(text);
}


function buscarPorRegionFiscal(cadena)
{
    datosDhtmlContrato=[];
    datosDhtmlUbicacion=[];
//    datosDhtmlTagPatig=[];
    $.ajax({
        url:'../Controller/ReportesController.php?Op=buscarID',
        type:'GET',
        data:'CADENA='+cadena,
        async:false,
        success:function(datos)
        {
            $.each(datos,function(index,value)
            {
//                if(index==0)
                datosDhtmlContrato.push({value:index,text:value.clave_contrato});
                datosDhtmlUbicacion.push({value:index,text:value.ubicacion});
            });
        },
        error:function()
        {
            swalError("Error en el servidor");
        }
    });
    
     

    contratoComboDhtml.clearAll();
    contratoComboDhtml.addOption(datosDhtmlContrato);
    ubicacionComboDhtml.clearAll();
    ubicacionComboDhtml.addOption(datosDhtmlUbicacion);

    contratoComboDhtml.getOptionsCount()!=0 ?
    ( contratoComboDhtml.selectOption(0),contratoComboDhtml.disable(),clave_contrato = contratoComboDhtml.getSelectedText()) : (clave_contrato="",contratoComboDhtml.enable());
}


//PRIMERA VISTA EN EL MODAL
function buscarRegionesFiscales()
{
    datosDhtml=[];
    $.ajax({
        url:'../Controller/ReportesController.php?Op=buscarRegionFiscal',
        type:'GET',
        async:false,
        success:function(datos)
        {
            $.each(datos,function(index,value)
            {
                datosDhtml.push({value:index,text:value.region_fiscal});
            });
        },
        error:function()
        {
            swalError("Error en el servidor");
        }
    });
    RegionesFiscalesComboDhtml = new dhtmlXCombo({
        parent: "INPUT_REGIONFISCAL_NUEVOREGISTRO",
        width: 540,
        filter: true,
        name: "combo",
        index:"2000",
        items:datosDhtml,
    });
    
    contratoComboDhtml = new dhtmlXCombo({
        parent: "INPUT_CONTRATO_NUEVOREGISTRO",
        width: 540,
        filter: true,
        name: "combo",
        items:[],
    });
    contratoComboDhtml.attachEvent("onOpen",function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    ubicacionComboDhtml = new dhtmlXCombo({
        parent: "INPUT_UBICACION_NUEVOREGISTRO",
        width: 540,
        filter: true,
        name: "combo",
        items:[],
    });
    ubicacionComboDhtml.attachEvent("onOpen",function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    tagPatinComboDhtml = new dhtmlXCombo({
    parent: "INPUT_TAGPATIN_NUEVOREGISTRO",
    width: 540,
    filter: true,
    name: "combo",
    items:[],
    });
    tagPatinComboDhtml.attachEvent("onOpen",function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    tagMedidorComboDhtml = new dhtmlXCombo({
    parent: "INPUT_TAGMEDIDOR_NUEVOREGISTRO",
    width: 540,
    filter: true,
    name: "combo",
    items:[],
    });
    tagMedidorComboDhtml.attachEvent("onOpen",function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    tipoMedidorComboDhtml = new dhtmlXCombo({
    parent: "INPUT_TIPOMEDIDOR_NUEVOREGISTRO",
    width: 540,
    filter: true,
    name: "combo",
    items:[],
    });
    tipoMedidorComboDhtml.attachEvent("onOpen",function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    clasificacionComboDhtml = new dhtmlXCombo({
    parent: "INPUT_CLASIFICACION_NUEVOREGISTRO",
    width: 540,
    filter: true,
    name: "combo",
    items:[],
    });
    clasificacionComboDhtml.attachEvent("onOpen",function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
    
    hidrocarburoComboDhtml = new dhtmlXCombo({
    parent: "INPUT_HIDROCARBURO_NUEVOREGISTRO",
    width: 540,
    filter: true,
    name: "combo",
    items:[],
    });
    hidrocarburoComboDhtml.attachEvent("onOpen",function()
    {
        this.DOMlist.style.zIndex = 2000;
    });
}

function selectItemComboUbicacion(value,text)
{
    buscarTagPatinPorUbicacion(text);
}


function buscarTagPatinPorUbicacion(ubicacion)
{
//    alert("hasta aqui");
    datosDhtmlTagPatin=[];
        $.ajax({
        url:'../Controller/ReportesController.php?Op=obtenerTagPatin',
        type:'GET',
        data:'UBICACION='+ubicacion,
        async:false,
        success:function(datosTagPatin)
        {
            $.each(datosTagPatin,function(index,value){
//                alert(value.tag_patin);
//                if(index==0)
                datosDhtmlTagPatin.push({value:index,text:value.tag_patin});                
            });
            
        },
        error:function()
        {
            swalError("Error en el servidor");
        }
    });
    
    tagPatinComboDhtml.clearAll();
    tagPatinComboDhtml.addOption(datosDhtmlTagPatin);
}


function selectItemComboTagPatin(value,text)
{
//    alert("entro al selectItemComboTagPatin");
    buscarTagMedidorPorTagPatin(text);
}


function buscarTagMedidorPorTagPatin(tagPatin)
{
//    alert(tagPatin);
    datosDhtmlTagMedidor=[];
    $.ajax({
        url:'../Controller/ReportesController.php?Op=obtenerTagMedidor',
        type:'GET',
        data:'TAG_PATIN='+tagPatin,
        async:false,
        success:function(datosTagMedidor)
        {
            $.each(datosTagMedidor,function(index,value){
//                alert(value.tag_medidor);
//                if(index==0)
                datosDhtmlTagMedidor.push({value:index,text:value.tag_medidor});                
            });
            
        },
        error:function()
        
        {
            swalError("Error en el servidor");
        }
    });
    
    tagMedidorComboDhtml.clearAll();
    tagMedidorComboDhtml.addOption(datosDhtmlTagMedidor);
}


function selectItemComboTagMedidor(value,text)
{
//    alert("entro al selectItemComboTagPatin");
    buscarTipoMedidorYOtrosDatosPorTagMedidor(text);
}


function buscarTipoMedidorYOtrosDatosPorTagMedidor(tagMedidor)
{
    datosDhtmlTipoMedidor=[];
    datosDhtmlClasificacion=[];
    datosDhtmlHidrocarburo=[];
    $.ajax({
        url:'../Controller/ReportesController.php?Op=obtenerTipoMedidor',
        type:'GET',
        data:'TAG_MEDIDOR='+tagMedidor,
        async:false,
        success:function(datosTipoMedidor)
        {
            $.each(datosTipoMedidor,function(index,value){
//                alert(value.tipo_medidor);
                id_catalogop=value.id_catalogop;
//                alert(id_catalogop);
                if(index==0)
                    datosDhtmlTipoMedidor.push({value:index,text:value.tipo_medidor});
                    datosDhtmlClasificacion.push({value:index,text:value.clasificacion});
                    datosDhtmlHidrocarburo.push({value:index,text:value.hidrocarburo});                            
            });
            
        },
        error:function()
        {
            swalError("Error en el servidor");
        }
    });
    
    tipoMedidorComboDhtml.clearAll();
    tipoMedidorComboDhtml.addOption(datosDhtmlTipoMedidor);
    clasificacionComboDhtml.clearAll();
    clasificacionComboDhtml.addOption(datosDhtmlClasificacion);
    hidrocarburoComboDhtml.clearAll();
    hidrocarburoComboDhtml.addOption(datosDhtmlHidrocarburo);
    
    tipoMedidorComboDhtml.getOptionsCount()!=0 ?
    ( tipoMedidorComboDhtml.selectOption(0),tipoMedidorComboDhtml.disable(),tipo_medidor = tipoMedidorComboDhtml.getSelectedText()) : (tipo_medidor="",tipoMedidorComboDhtml.enable());
    clasificacionComboDhtml.getOptionsCount()!=0 ?
    ( clasificacionComboDhtml.selectOption(0),clasificacionComboDhtml.disable(),clasificacion = clasificacionComboDhtml.getSelectedText()) : (clasificacion="",clasificacionComboDhtml.enable());
    hidrocarburoComboDhtml.getOptionsCount()!=0 ?
    ( hidrocarburoComboDhtml.selectOption(0),hidrocarburoComboDhtml.disable(),hidrocarburo = hidrocarburoComboDhtml.getSelectedText()) : (hidrocarburo="",hidrocarburoComboDhtml.enable());
}


function insertarReporte(datos)
{
    $.ajax({
        url:"../Controller/ReportesController.php?Op=Guardar",
        type:"POST",
        data:"FECHA_CREACION="+datos[0]+"&ID_CATALOGOP="+datos[1],
        async:false,
        success:function(datos)
        {
             tempData;
//            alert("Entro al success: "+datos);
            if(typeof(datos) == "object")
            {
//                alert("Entro aqui al IF");
                swalSuccess("Reporte Creado");                
                $.each(datos,function(index,value)
                {
                   console.log(value); 
                   tempData= reconstruir(value,ultimoNumeroGrid+1);  
                });
//                console.log(tempData);
                
                $("#jsGrid").jsGrid("insertItem",tempData).done(function()
                {
                    $("#nuevoReporteModal .close ").click();
                });
                
            } else{
                if(datos==0)
                {
                    swalError("Ya existe un Reporte Creado en esta Fecha");                    
                } else{
                    swalInfo("Creado, Pero no listado, Actualice");
                }                
            }
        },
        error:function()
        {
//            alert("Entro al error");
        }
    });
    
}


function construirGrid()
{
    jsGrid.fields.customControl = MyCControlField;
        db=
        {
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
             jsGrid.ControlField.prototype.deleteButton=false;
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
        height: "350px",
        autoload:true,
        heading: true,
        sorting: true,
        editing: true,
//        sorter:true,
        paging: true,
        controller:db,
        pageLoading:false,
        pageSize: 10,
        pageButtonCount: 5,
        updateOnResize: true,
        confirmDeleting: true,
        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
        fields: [
                { name:"id_principal", visible:false},
                { name:"no",title:"No",width:60},
                { name:"clave_contrato", title: "ID del Contrato o Asignación", type: "text", width: 150, validate: "required", "editing": false},
                { name:"region_fiscal", title: "Region Fiscal", type: "text", width: 150, validate: "required", "editing": false},
                { name:"ubicacion", title: "Ubicación del Punto de Medición", type: "text", width: 150, validate: "required", "editing": false},
                { name:"tag_patin", title: "Tag del Patin de Medición", type: "text", width: 130, validate: "required","editing": false },
                { name:"tipo_medidor", title: "Tipo de Medidor", type: "text", width: 150, validate: "required", "editing": false},    
                { name:"tag_medidor", title: "Tag del Medidor", type: "text", width: 130, validate: "required", "editing": false},
                { name:"clasificacion", title: "Clasificación del Sistema de Medición", type: "text", width: 150, validate: "required", "editing": false},
                { name:"hidrocarburo", title: "Tipo de Hidrocarburo", type: "text", width: 150, validate: "required", "editing": false},
                { name:"omgc1", title: "Fecha Produccion", type: "text", width: 150, validate: "required", "editing": false},
                { name:"omgc2", title: "Presion", type: "text", width: 150},
                { name:"omgc3", title: "Temperatura", type: "text", width: 150},
                { name:"omgc4", title: "Produccion de Petroleo", type: "text", width: 150},
                { name:"omgc5", title: "°AP(PETROLEO)I", type: "text", width: 150},
                { name:"omgc6", title: "%S(PETROLEO)", type: "text", width: 150},
                { name:"omgc7", title: "Sal", type: "text", width: 150},
                { name:"omgc8", title: "%H20(PETROLEO)", type: "text", width: 150},
                { name:"omgc9", title: "Produccion de condensado Medido Neto", type: "text", width: 190},
                { name:"omgc10", title: "°API(CONDENSADO)", type: "text", width: 170},
                { name:"omgc11", title: "%S(CONDENSADO)", type: "text", width: 170},
                { name:"omgc12", title: "%H20(CONDENSADO)", type: "text", width: 180},
                { name:"omgc13", title: "Produccion de gas medido", type: "text", width: 180},
                { name:"omgc14", title: "Poder Calorifico de gas", type: "text", width: 180},
                { name:"omgc15", title: "Peso Molecular de gas", type: "text", width: 150},
                { name:"omgc16", title: "Energia de gas", type: "text", width: 150},
                { name:"omgc17", title: "Eventos", type: "text", width: 150},
//                { name:"omgc18", title: "Fecha Real Reporte", type: "text", width: 190},
                
                { name:"delete", title:"Opción", type:"customControl",sorting:"" }
        ],
        
        onItemUpdated: function(args)
        {
            console.log(args);
            columnas={};
            id_afectado=args["item"]["id_principal"][0];
//            alert("ID afectado");
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
                            data:'TABLA=omg_reporte_produccion'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
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
//            return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-delete-button ',title:"Eliminar", type:'button',onClick:"preguntarEliminar("+JSON.stringify(todo)+")"});
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


function listarDatos()//listarDatos
{
    __datos=[];
    datosParamAjaxValues={};
    datosParamAjaxValues["url"]="../Controller/ReportesController.php?Op=listar&data=2";
    datosParamAjaxValues["type"]="POST";
    datosParamAjaxValues["async"]=false;
    var variablefunciondatos=function obtenerDatosServer(data)
    {
        dataListado = data;
        $.each(data,function (index,value)
        {
            __datos.push( reconstruir(value,index++) );
        });
    }
    var listfunciones=[variablefunciondatos];
    ajaxHibrido(datosParamAjaxValues,listfunciones);
    DataGrid = __datos;
//    return 1;
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
    tempData = new Object();
    ultimoNumeroGrid = index;
    tempData["id_principal"] = [{"id_reporte":value.id_reporte}];
    tempData["no"] = index;
    tempData["clave_contrato"] = value.clave_contrato;
    tempData["region_fiscal"] = value.region_fiscal;
    tempData["ubicacion"] = value.ubicacion;
    tempData["tag_patin"] = value.tag_patin;
    tempData["tipo_medidor"] = value.tipo_medidor;
    tempData["tag_medidor"] = value.tag_medidor;
    tempData["clasificacion"] = value.clasificacion;
    tempData["hidrocarburo"] = value.hidrocarburo;
    tempData["omgc1"] = value.omgc1;
    tempData["omgc2"] = value.omgc2;
    tempData["omgc3"] = value.omgc3;
    tempData["omgc4"] = value.omgc4;
    tempData["omgc5"] = value.omgc5;
    tempData["omgc6"] = value.omgc6;
    tempData["omgc7"] = value.omgc7;
    tempData["omgc8"] = value.omgc8;
    tempData["omgc9"] = value.omgc9;
    tempData["omgc10"] = value.omgc10;
    tempData["omgc11"] = value.omgc11;
    tempData["omgc12"] = value.omgc12;
    tempData["omgc13"] = value.omgc13;
    tempData["omgc14"] = value.omgc14;
    tempData["omgc15"] = value.omgc15;
    tempData["omgc16"] = value.omgc16;
    tempData["omgc17"] = value.omgc17;
//    tempData["omgc18"] = value.omgc18;
    tempData["delete"] = "1";
    return tempData;
}















function precargados()
    {
     var _data=""; 
//     var  clave_contrato='<input list="opcionescontratos" name="eleccioncontratos" /><datalist id="opcionescontratos">'
         clave_contrato="<select>";
//        region_fiscal='<input list="opciones" name="opciones" /><datalist id="opciones"><option </datalist>';
        region_fiscal="<select>";
        pm="<select>";
        tpm="<select>";
        tm="<select>";
        clasificacionsistemamedicion="<select>";
        th="<select>";
        
        $.ajax({
            url : '../Controller/ReportesController.php?Op=listar&data=2',
            async:false,
            success 	: function(r)
            {
//                console.log(r);
//                                    $("#contrato").val(r["clave_cumplimiento"]);
                $.each(r,function (index,value)
                {
                    clave_contrato+="<option value="+value['clave_contrato']+">"+value['clave_contrato']+"</option>";
                   region_fiscal+="<option value="+value['region_fiscal']+">"+value['region_fiscal']+"</option>";
                    pm+="<option value="+value['ubicacion']+">"+value["ubicacion"]+"</option>";
                    tpm+="<option value="+value['tag_patin']+">"+value["tag_patin"]+"</option>";
                    tm+="<option value="+value['tipo_medidor']+">"+value["tipo_medidor"]+"</option>";
                    clasificacionsistemamedicion+="<option value="+value['clasificacion']+">"+value["clasificacion"]+"</option>";
                    th+="<option value="+value['hidrocarburo']+">"+value["hidrocarburo"]+"</option>";
                });
//                clave_contrato+="</datalist>"
                $("#clave_contrato").html(clave_contrato);
                $("#contrato").html(clave_contrato);
                $("#region_fiscal").html(region_fiscal);
                $("#pm").html(pm);
                $("#tpm").html(tpm);
                $("#tm").html(region_fiscal);
                  $("#clasificacionsistemamedicion").html(clasificacionsistemamedicion);
                     $("#th").html(th);
//                jBoxReportes.html.form=_data;
                
//                $("#clasificacionsistemamedicion").html(clasificacionsistemamedicion);
//                $("#th").html(th);
            }
        });
    }


function refresh()
{  
    alert("Entro al refresh");
    listarDatos();
   inicializarFiltros();
   construirFiltros();
   gridInstance.loadData();
   $(".jsgrid-grid-body").css({"height":"171px"});
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


