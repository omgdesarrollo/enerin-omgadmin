google.charts.load('current', {'packages':['corechart']});

$(function()
{
    $("#BTN_ANTERIOR_GRAFICAMODAL").click(function()
    {
        if(activeChart>1)
        {
            activeChart-=2;
            selectChart();
        }
        else
        {
            activeChart = -1;
            graficar();
        }
    });
});

function inicializaChartjs()
{
    let modal = '<div class="modal draggable fade" id="Grafica" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
        modal += '<div class="modal-dialog sizeChart" role="document" style="text-align: -webkit-center;">';
        modal +=     '<div class="modal-content">';
        modal +=         '<div class="modal-header">';
        modal +=             '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
        modal +=                 '<span aria-hidden="true" class="closeLetra">X</span>';
        modal +=             '</button>';
        modal +=             '<h4 class="modal-title" id="myModalLabelNuevaEvidencia">Indicador de Cumplimiento</h4>';
        modal +=         '</div>';

        modal +=         '<div class="modal-body">';
        modal +=             '<div id="graficaPie" ></div>';
        modal +=         '</div>';
        modal +=         '<div class="form-group" method="post" style="text-align:center" id="BTNS_GRAFICAMODAL">';
        modal +=             '<button type="submit" id="BTN_ANTERIOR_GRAFICAMODAL" class="btn crud-submit btn-info" style="width:90%" >Recargar</button>';
        modal +=         '</div>';
        modal +=     '</div>';
        modal += '</div>';
        modal += '</div>';
    let cssChart = "div.google-visualization-tooltip{";
        cssChart += "background:bisque; border-radius:5px;";
        cssChart += "position:fixed; top:60px !important;";
        cssChart += "left:1% !important; min-width:200px;";
        cssChart += "max-width:400px;";
        cssChart += "-webkit-box-shadow: 0px 11px 30px -5px rgba(0,0,0,0.4);";
        cssChart += "-moz-box-shadow: 0px 11px 30px -5px rgba(0,0,0,0.4);";
        cssChart += "box-shadow: 0px 11px 30px -5px rgba(0,0,0,0.4);}";
        cssChart += "div.ltr{";
        cssChart += "width:-webkit-fill-available !important;";
        cssChart += "height:80% !important;}";
        cssChart += "circle{ r:4; }";
        cssChart += "text{ cursor:pointer; }";
    $("#jsChart").html(modal);
    $("style").append(cssChart);
}

function construirGrafica(dataGrafica,tituloGrafica)//funcion sin cambio
{
    estructuraGrafica = chartEstructura(dataGrafica);
    opcionesGrafica = chartOptions(tituloGrafica);
    instanceGrafica = drawChart(dataGrafica,estructuraGrafica,opcionesGrafica);
    chartsCreados[activeChart]={grafica:instanceGrafica,data:estructuraGrafica};
}

function chartEstructura(dataGrafica)//funcion sin cambio
{
    data = new google.visualization.DataTable();
    data.addColumn('string', 'nombre');
    data.addColumn('number', 'valor');
    data.addColumn({type:"string",role:"tooltip"});
    data.addColumn('string','datos');
    data.addColumn('number','fn');
    data.addRows(dataGrafica);
    return data;
}

function chartOptions(tituloGrafica)//funcion sin cambio
{
    var options = 
    {
        legend:{
                position:"labeled",alignment:"start",
                textStyle:
                {
                    color:"black", fontSize:14, bold:true
                }
            },
        pieSliceText:"none",
        title: tituloGrafica,
        tooltip:{textStyle:{color:"#000000"},text:"none",isHtml:true},
        // pieSliceText:"",
        titleTextStyle:{color:"black"},
        'is3D':true,
        slices: { 
            1: {offset: 0.02,color:"#80ffbf"},
            3: {offset: 0.02,color:"#bfff80"},
            0: {offset: 0.02,color:"#ffbf80"},
            4: {offset: 0.02,color:"#ff80bf"},
            2: {offset: 0.02,color:"#bf80ff"},
        },
        backgroundColor:"",
        "width":800,
        "height":400
    };
    return options;
}

function drawChart(dataGrafica,data,options)//funcion sin cambio
{
    grafica = new google.visualization.PieChart(document.getElementById('graficaPie'));
    grafica.draw(data, options);
    activeChart++;
    if(activeChart!=0)
        $("#BTN_ANTERIOR_GRAFICAMODAL").html("Anterior");
    else
        $("#BTN_ANTERIOR_GRAFICAMODAL").html("Recargar");
        google.visualization.events.addListener(grafica, 'select', selectChart);
    return grafica;
}

function selectChart()
{
    var select = chartsCreados[activeChart].grafica.getSelection()[0];
    if(select != undefined)
    {
        dataNextGrafica = chartsCreados[activeChart].data.getValue(select.row,3);
        concepto = chartsCreados[activeChart].data.getValue(select.row,0);
        fn = chartsCreados[activeChart].data.getValue(select.row,4);
        if(fn>=0)
            chartsFunciones[fn](dataNextGrafica,concepto);
    }
}