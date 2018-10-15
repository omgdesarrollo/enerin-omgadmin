
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
    return new Promise((resolve,reject)=>
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
        resolve();    
    });        
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


function listarDatos()//listarDatos
{
//    console.log("Entro a listarDatos");
    return new Promise((resolve,reject)=>
    {
        __datos=[];
        $.ajax(
        {
            url:"../Controller/ReportesController.php?Op=listar&data=2",
            type:"GET",
            beforeSend:function()
            {
                growlWait("Solicitud","Solicitando Datos...");
            },
            success:function(data)
            {
                if(typeof(data=="object"))
                {
                    dataListado = data;
                    $.each(data,function (index,value)
                    {
                        __datos.push( reconstruir(value,index+1) );
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
    tempData["id_principal"].push({eliminar : 0});
    tempData["id_principal"].push({editar : 1});
    tempData["delete"]= tempData["id_principal"] ;
    return tempData;
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
                    
                });
                    dataListado.push(datos[0]),
                    DataGrid.push(tempData),
                    $("#nuevoReporteModal .close ").click();
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

function saveUpdateToDatabase(args)//listo
{
        columnas=new Object();
//        entro=0;
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
                data:'TABLA=omg_reporte_produccion'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
                beforeSend:()=>
                {
                        growlWait("Actualización","Espere...");
                },
                success:(data)=>
                {
                        if(data==1)
                        {
                                growlSuccess("Actulización","Se actualizaron los campos");
                                actualizarReporte(id_afectado.id_reporte);
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

function actualizarReporte(id_reporte)
{
        $.ajax({
                url:'../Controller/ReportesController.php?Op=listarReporte',
                type: 'GET',
                data:'ID_REPORTE='+id_reporte,
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
                        growlError("Error","Error del servidor");
                        componerDataGrid();
                        gridInstance.loadData();
                        
                }
        });
}


function componerDataListado(value)// id de la vista documento, listo
{
    id_vista = value.id_reporte;
    id_string = "id_reporte";
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


function refresh()
{
    listarDatos();
    inicializarFiltros();
    construirFiltros();
    gridInstance.loadData();
}



