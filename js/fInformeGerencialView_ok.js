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
    return new Promise((resolve,reject)=>
    {
        filtros =[
                {id:"noneUno",type:"none"},
                {id:"folio_entrada",type:"text"},
                {id:"clave_autoridad",type:"text"},
                {id:"asunto",type:"text"},
                {id:"nombre_completo",type:"text"},
                {id:"fecha_asignacion",type:"date"},
                {id:"fecha_limite_atencion",type:"date"},
                {id:"fecha_alarma",type:"date"},
//                {id:"status_doc",type:"text"},
                {id:"status_doc",type:"combobox",descripcion:"descripcion",
                data:[
                        {"status_doc":"En Proceso","descripcion":"En Proceso"},
                        {"status_doc":"Suspendido","descripcion":"Suspendido"},
                        {"status_doc":"Terminado","descripcion":"Terminado"}
                    ]
                },
//                {id:"condicion",type:"text"},
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
                {name:"opcion",id:"opcion",type:"opcion"}
             ];
         resolve();
    });
}

function listarDatos()
{
    return new Promise((resolve,reject)=>
    {
        var __datos=[],__datosExcel=[];
        $.ajax({
            url:"../Controller/InformeGerencialController.php?Op=Listar",
            type:"GET",
            beforeSend:function()
            {
                growlWait("Solicitud","Solicitando Datos...");
            },
            success:function(data)
            {
//                console.log(data);
                if(typeof(data)=="object")
                {
//                    console.log(data);
                    growlSuccess("Solicitud","Registros obtenidos");
                    dataListado = data;
                    $.each(data,function (index,value)
                    {
                        __datos.push( reconstruir(value,index+1) );
                    });
                    DataGrid = __datos;
                    gridInstance.loadData();
                    
//                    $.each(data,function (index,value)
//                    {
//                        __datosExcel.push( reconstruirExcel(value,index+1) );
//                    });
//                    DataGridExcel=__datosExcel
                    
                    resolve();
                }else{
                    growlSuccess("Solicitud","No Existen Registros");
                    reject();
                }
            },
            error:function(e)
            {
                console.log(e);
                growlError("Error","Error en el servidor");
                reject();
            }
        });
        
    });
}

function reconstruir(value,index)
{
    tempData = new Object();
//    tempData["id_principal"] = [{'id_tema':value.id_tema}],
    tempData["no"]= index;
    tempData["folio_entrada"] = value.folio_entrada,
    tempData["clave_autoridad"] = value.clave_autoridad,
    tempData["asunto"] = value.asunto,
    tempData["nombre_completo"] = value.nombre_completo,
    tempData["fecha_asignacion"] = getSinFechaFormato(value.fecha_asignacion),
    tempData["fecha_limite_atencion"] = getSinFechaFormato(value.fecha_limite_atencion),
    tempData["fecha_alarma"] = getSinFechaFormato(value.fecha_alarma),
    tempData["status_doc"] = value.status_doc,
    tempData["condicion"] = value.condicion
//    tempData["delete"] = "0";
    return tempData;
}


function reconstruirExcel(value,index)
{
    tempData = new Object();
//    tempData["id_principal"] = [{'id_tema':value.id_tema}],
    tempData["No"]= index;
    tempData["Folio de Entrada"] = value.folio_entrada,
    tempData["Autoridad Remitente"] = value.clave_autoridad,
    tempData["Asunto"] = value.asunto,
    tempData["Responsable del Tema"] = value.nombre_completo,
    tempData["Fecha de Asignacion"] = getSinFechaFormato(value.fecha_asignacion),
    tempData["Fecha Limite de Atencion"] = getSinFechaFormato(value.fecha_limite_atencion),
    tempData["Fecha de Alarma"] = getSinFechaFormato(value.fecha_alarma),
    tempData["Status"] = value.status_doc,
    tempData["Condicion"] = value.condicion
//    tempData["delete"] = "0";
    return tempData;
}

//IniciaGrafica Informes
function loadChartView(bclose)
{
//    console.log("Entro al loadChartView");
    a=0, b=0, c=0, d=0, e=0;
    $.ajax({
        url:"../Controller/InformeGerencialController.php?Op=Listar",
        type:"GET",
        success:function(data)
        {
//            console.log(data);
            $.each(data,function(index,value)
            {
                if(value.condicion=="En Tiempo")
                {
                  a++;   
                }
                if(value.condicion=="Alarma Vencida")
                {
                  b++;   
                }
                if(value.condicion=="Tiempo Limite")
                {
                  c++;   
                }
                if(value.condicion=="Tiempo Vencido")
                {
                  d++;   
                }
                if(value.condicion=="Suspendido")
                {
                  e++;   
                }
            });
        }
    });
    
//    $("#graficaInformeGerencial").html("");
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    
    function drawChart() {
        var data = google.visualization.arrayToDataTable([

          ['Status', 'Cantidad'],
          ['En proceso(En Tiempo)', a],
          ['En proceso(Alarma Vencida)',b],
          ['En proceso(Tiempo Limite)', c],
          ['En proceso(Tiempo Vencido)', d],
          ['Suspendido', e]
//          ['Terminado', f]
        ]);

        var options = {
          title: 'Documentos de Entrada',
          is3D: true,
          "width":660,
          "height":340
        };

        var chart = new google.visualization.PieChart(document.getElementById('graficaInformeGerencial'));
        chart.draw(data, options);
    }  
} //Finaliza Grafica Informes