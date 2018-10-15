  var gridInstance,gridInstanceMolares;
$(function (){
	
});
function listarDatos()//listarDatos
{
    __datos=[];
    datosParamAjaxValues={};
    datosParamAjaxValues["url"]="../Controller/ReportesController.php?Op=listar&data=2";
    datosParamAjaxValues["type"]="POST";
    datosParamAjaxValues["async"]=true;
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

function construirGridGenerador()
{
//    jsGrid.fields.customControl = MyCControlField;
        db=
        {
            loadData: function()
            {
                return DataGrid;
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
//            loadBlockUi();
               
        },
        onDataLoaded:function(args)
        {
//            $('.jsgrid-filter-row').removeAttr("style",'display:none');
        },
        width: "100%",
        height: "300px",
        autoload:true,
        heading: true,
        sorting: true,
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
                { name:"clave_contrato", title: "ID del Contrato o Asignación", type: "text", width: 150, validate: "required" },
                { name:"region_fiscal", title: "Región Fiscal", type: "text", width: 150, validate: "required" },
                { name:"ubicacion", title: "Ubicación del Punto de Medición", type: "text", width: 150, validate: "required" },
                { name:"tag_patin", title: "Tag del Patín de Medición", type: "text", width: 130, validate: "required" },
                { name:"tipo_medidor", title: "Tipo de Medidor", type: "text", width: 150, validate: "required" },    
                { name:"tag_medidor", title: "Tag del Medidor", type: "text", width: 130, validate: "required" },
                { name:"clasificacion", title: "Clasificación del Sistema de Medición", type: "text", width: 150, validate: "required" },
                { name:"hidrocarburo", title: "Tipo de Hidrocarburo", type: "text", width: 150, validate: "required" },
                { name:"omgc1", title: "Fecha [dd/mm/aaaa]", type: "text", width: 150, validate: "required" },
                { name:"omgc2", title: "Presion[kg/cm2]", type: "text", width: 150, validate: "required" },
                { name:"omgc3", title: "Temperatura[°C]", type: "text", width: 150, validate: "required" },
                { name:"omgc4", title: "Producción de petróleo medido neto [bls]", type: "text", width: 150, validate: "required" },
                { name:"omgc5", title: "°API", type: "text", width: 150, validate: "required"},
                { name:"omgc6", title: "%S", type: "text", width: 150, validate: "required"},
                { name:"omgc7", title: "Sal[Lb/Mbls]", type: "text", width: 150, validate: "required" },
                { name:"omgc8", title: "%H2O", type: "text", width: 150, validate: "required" },
                { name:"omgc9", title: "Produccion de condensado Medido Neto", type: "text", width: 190, validate: "required" },
                { name:"omgc10", title: "°API", type: "text", width: 170, validate: "required" },
                { name:"omgc11", title: "%S", type: "text", width: 170, validate: "required" },
                { name:"omgc12", title: "%H2O", type: "text", width: 180, validate: "required" },
                { name:"omgc13", title: "Producción de gas medido [MMPC]", type: "text", width: 180, validate: "required" },
                { name:"omgc14", title: "Poder Calorífico de Gas [BTU/PC]", type: "text", width: 180, validate: "required" },
                { name:"omgc15", title: "Peso Molecular de Gas [Lb/mol]", type: "text", width: 150, validate: "required" },
                { name:"omgc16", title: "Energía de Gas [MMBTU]", type: "text", width: 150, validate: "required" },
                { name:"omgc17", title: "Eventos", type: "text", width: 150, validate: "required" }
//                { name:"omgc18", title: "Fecha Real Reporte", type: "text", width: 190, validate: "required" }               
//                { name:"delete", title:"Opción", type:"customControl" }
        ]
    
    });
}

function reconstruir(value,index)
{
    tempData = new Object();
    tempData["no"] = index;
    tempData["id_principal"] = [{"id_contrato":value.id_contrato}];
    tempData["region_fiscal"] = value.region_fiscal;
    tempData["clave_contrato"] = value.clave_contrato;
    tempData["ubicacion"] = value.ubicacion;
    tempData["tag_patin"] = value.tag_patin;
    tempData["tipo_medidor"] = value.tipo_medidor;
    tempData["tag_medidor"] = value.tag_medidor;
    tempData["clasificacion"] = value.clasificacion;
    tempData["hidrocarburo"] = value.hidrocarburo;
    tempData["omgc1"] = value.omgc1;
    tempData["omgc2"] = truncarDecimales(value.omgc2,4); 
    tempData["omgc3"] = truncarDecimales(value.omgc3,4);
    tempData["omgc4"] = truncarDecimales(value.omgc4,4);
    tempData["omgc5"] = truncarDecimales(value.omgc5,4);
    tempData["omgc6"] = truncarDecimales(value.omgc6,4);
    tempData["omgc7"] = truncarDecimales(value.omgc7,4);
    tempData["omgc8"] = truncarDecimales(value.omgc8,4);
    tempData["omgc9"] = truncarDecimales(value.omgc9,4);
    tempData["omgc10"] =truncarDecimales(value.omgc10,4);
    tempData["omgc11"] =truncarDecimales(value.omgc11,4);
    tempData["omgc12"] =truncarDecimales(value.omgc12,4);
    tempData["omgc13"] =truncarDecimales(value.omgc13,4);
    tempData["omgc14"] =truncarDecimales(value.omgc14,4);
    tempData["omgc15"] =truncarDecimales(value.omgc15,4);
    tempData["omgc16"] =truncarDecimales(value.omgc16,4);
    tempData["omgc17"] = value.omgc17;
//    tempData["omgc18"] = value.omgc18;
    tempData["delete"] = "1";
    return tempData;
}


function reconstruirExcel(value,index)
{
    tempData = new Object();
//    tempData["no"] = index;
//    tempData["id_principal"] = [{"id_contrato":value.id_contrato}];
    tempData["ID del Contrato o Asignacion"] = value.clave_contrato;
    tempData["Region Fiscal"] = value.region_fiscal;
    tempData["Ubicacion del Punto de Medicion"] = value.ubicacion;
    tempData["Tag del Patin  de Medicion"] = value.tag_patin;
    tempData["Tipo de Medidor"] = value.tipo_medidor;
    tempData["Tag del Medidor"] = value.tag_medidor;
    tempData["Clasificacion del Sistema de Medicion"] = value.clasificacion;
    tempData["Tipo de Hidrocarburo"] = value.hidrocarburo;
    tempData["Fecha [dd/mm/aaaa]"] = value.omgc1;
    tempData["Presion[kg/cm2]"] = value.omgc2;
    tempData["Temperatura[°C]"] = value.omgc3;
    tempData["Produccion de Petroleo Medido Neto[bls]"] = value.omgc4;
    tempData["°API"] = value.omgc5;
    tempData["%S"] = value.omgc6;
    tempData["Sal[Lb/Mbls]"] = value.omgc7;
    tempData["%H2O"] = value.omgc8;
    tempData["Produccion de Condensado Medido Neto[bls]"] = value.omgc9;
    tempData["°API"] = value.omgc10;
    tempData["%S"] = value.omgc11;
    tempData["%H2O"] = value.omgc12;
    tempData["Produccion de Gas Medido[MMPC]"] = value.omgc13;
    tempData["Poder Calorifico de Gas[BTU/PC]"] = value.omgc14;
    tempData["Peso Molecular de Gas[Lb/mol]"] = value.omgc15;
    tempData["Energia de Gas[MMBTU]"] = value.omgc16;
    tempData["Eventos"] = value.omgc17;
//    tempData["omgc18"] = value.omgc18;
//    tempData["delete"] = "1";
    return tempData;
}


function construirGridGeneradorMolares()
{
//	jsGrid.fields.customControl = MyCControlField;
        db=
        {
            loadData: function()
            {
                return DataGridMolares;
            },
        };
    $("#jsGridMolares").jsGrid({
         onInit: function(args)
         {
             gridInstanceMolares=args.grid;
             jsGrid.Grid.prototype.autoload=true;
             jsGrid.ControlField.prototype.deleteButton=false;
             jsGrid.ControlField.prototype.editButton=false;
         },
        onDataLoading: function(args)
        {
//            loadBlockUi();              
        },
        onDataLoaded:function(args)
        {
//            $('.jsgrid-filter-row').removeAttr("style",'display:none');
        },
        width: "100%",
        height: "300px",
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
                { name:"omg2c1", title: "MOLAR 1", type: "text", width: 150 },
                { name:"omg2c2", title: "MOLAR 2", type: "text", width: 150},
                { name:"omg2c3", title: "MOLAR 3", type: "text", width: 150},
                { name:"omg2c4", title: "MOLAR 4", type: "text", width: 150},
                { name:"omg2c5", title: "MOLAR 5", type: "text", width: 150},
                { name:"omg2c6", title: "MOLAR 6", type: "text", width: 150},
                { name:"omg2c7", title: "MOLAR 7", type: "text", width: 150},
                { name:"omg2c8", title: "MOLAR 8", type: "text", width: 150 },
                { name:"omg2c9", title: "MOLAR 9", type: "text", width: 190},
                { name:"omg2c10", title: "MOLAR 10", type: "text", width: 170},
                { name:"omg2c11", title: "MOLAR 11", type: "text", width: 170},
                {type:"control"}
//                { name:"opciones", title:"Opción", type:"customControl",sorting:""}
                
//                { name:"omgc18", title: "Fecha Real Reporte", type: "text", width: 190, validate: "required" }               
//                { name:"delete", title:"Opción", type:"customControl" }
        ],
        rowClick: function(args) {
        	showDetallesDialogo("Editar Molar",args.item);
        },
        onItemUpdated: function(args)
        {
//            console.log(args);
//            columnas={};
//            id_afectado=args["item"]["id_porcentaje"][0];
//            $.each(args["item"],function(index,value)
//            {
//                if(args["previousItem"][index] != value && value!="")
//                {
//                        if(index!="id_porcentaje" && !value.includes("<button") && index!="delete")
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
//                            data:'TABLA=documentos'+'&COLUMNAS_VALOR='+JSON.stringify(columnas)+"&ID_CONTEXTO="+JSON.stringify(id_afectado),
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
        }
    });    
}
var showDetallesDialogo = function(dialogType, molares) {
//    $("#name").val(client.Name);
//    $("#age").val(client.Age);
//    $("#address").val(client.Address);
//    $("#country").val(client.Country);
//    $("#married").prop("checked", client.Married);

//    formSubmitHandler = function() {
//        saveClient(client, dialogType === "Add");
//    };
	console.log(molares);
	
//	$('#dialogoEdicionMolares').on('click', (e) => {
//	    e.preventDefault();
//		alert("f");
//		$('#dialogoEdicionMolares').trigger("click");
	    $("#dialogoEdicionMolares").dialog("open");

//	});
	
//	$("#omg2c1").val("f");
//	$("#dialogoEdicionMolares").dialog();
////	$("#dialogoEdicionMolares").dialog("option", "width", 600);
////	$("#dialogoEdicionMolares").dialog("option", "height", 300);
//	$("#dialogoEdicionMolares").dialog("open");
	
};


//var MyCControlField = function(config)
//{
//    jsGrid.Field.call(this, config);
//};


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
//            return this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-edit-button ',title:"Editar", type:'button'});
//
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
//    $("#jsGridMolares").jsGrid("cancelEdit");
//}
//
//function aceptarEdicion()
//{
//	gridInstanceMolares.updateItem();
//}






function reconstruirMolares(value,index)
{
    tempData ={};
    tempData["no"] = index;
    tempData["id_porcentaje"] = [{"id_porcentaje":value.id_porcentaje}];
    tempData["omg2c1"] = value.omg2c1;
    tempData["omg2c2"] = value.omg2c2;
    tempData["omg2c3"] = value.omg2c3;
    tempData["omg2c4"] = value.omg2c4;
    tempData["omg2c5"] = value.omg2c5;
    tempData["omg2c6"] = value.omg2c6;
    tempData["omg2c7"] = value.omg2c7;
    tempData["omg2c8"] = value.omg2c8;
    tempData["omg2c9"] = value.omg2c9;
    tempData["omg2c10"] = value.omg2c10;
    tempData["omg2c11"] = value.omg2c11;
    tempData["opciones"] = value.omg2c11;
    return tempData;
}


  function truncarDecimales (x, posiciones = 0) {
        var s = x.toString()
        var l = s.length
        var decimalLength = s.indexOf('.') + 1
        var numStr = s.substr(0, decimalLength + posiciones)
        return Number(numStr)
    }








