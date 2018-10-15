primero = true;
function construirFiltros()
{
    tempData = "";
    // $('.jsgrid-filter-row').removeAttr("style",'display:none');
    // $('.jsgrid-filter-row').addClass("display-none");
    $(".jsgrid-filter-row").html("");
    if(primero)
    {
        $("#headerOpciones").append("<button type='button' title='Abrir Filtro' class='btn btn-info style-filter' onClick='mostrarFiltros()'><i class='ace-icon fa fa-sort'></i></button>");
        $("#headerOpciones").append("<button type='button' title='Buscar Filtro ' class='btn btn-info style-filter' onClick='filtroSupremo()'><i class='ace-icon fa fa-search'></i></button>");
        $("#headerOpciones").append("<button type='button' title='Limpiar Filtro' class='btn btn-info style-filter' onClick='limpiarFiltros()'><i class='ace-icon fa fa-filter'></i></button>");
        $("#headerOpciones").append("<button type='button' title='Registro de Sucesos' class='btn btn-info style-filter' onClick='mostrarOcultarGrowl()'><i class='ace-icon fa fa-exchange'></i></button>");
        primero=false;
    }
    $.each(filtros,function(index,value)
    {
        tempData += "<td class='jsgrid-cell' style='background:aliceblue'>";
        if(value.type == "date")
        {
            tempData += "<input id='"+value.id+"' type='text' onkeyup='pressEnter()' style='width: 100%;display:none;'>";
            tempData += "<input id='"+value.id+"_date' type='date' onChange='construirFiltroSelect(this,\""+value.id+"\")' style='width:100%;margin:2px;'>";
        }
        if(value.type == "text")
        {
            tempData += "<input id='"+value.id+"' type='text' onkeyup='pressEnter(event)' style='width:100%;'>";
        }
        if(value.type == "combobox")
        {
            tempData += "<input id='"+value.id+"' type='text' onkeyup='pressEnter()' style='width:100%;display:none'>";
            tempData += construirFiltrosCombobox(value.data,value.name,value.id,value.descripcion);
        }
        if(value.type == "opcion")
        {
            tempData += "<input id='"+value.id+"' type='text' onkeyup='pressEnter()' style='width:100%;display:none'>";
            tempData += "<input class='jsgrid-button jsgrid-clear-filter-button' type='button' onClick='limpiarFiltros()'>";
            tempData += "<input class='jsgrid-button jsgrid-search-button' type='button' title='Search' onClick='filtroSupremo()'>";
        }
        if(value.type == "none")
        {
            tempData += "<input id='"+value.id+"' type='text' onkeyup='pressEnter()' style='width:100%;display:none'>";
        }
        tempData += "</td>"
        $(".jsgrid-filter-row").html(tempData);
    });
}

function construirFiltrosCombobox(datos,name,id,descripcion)
{
    // console.log(datos);
    tempData="";
    tempData = "<select id='"+id+"_combobox' onChange='construirFiltroSelect(this,\""+id+"\")' style='margin:2px;'>";
    tempData += "<option value='-1'> --   Todos   -- </option>";
    $.each(datos,function(index,value)
    {
            tempData += "<option value='"+value[id]+"'>"+value[descripcion]+"</option>";
    });
    tempData += "</select>";
    return tempData;
}

function construirFiltroSelect(Obj,id)
{
    // console.log(Obj,id);
    val = $(Obj).val();
    if(val=="-1")
        $("#"+id).val("");
    else
    {
        $("#"+id).val(val);
    }
    // filtroSupremo();
}

function pressEnter(ev)
{
    if(ev.keyCode == 13)
    {
        filtroSupremo();
    }
}

function filtroSupremo()
{
    $("#jsGrid").jsGrid("cancelEdit");
    newData = [];
    $.each(filtros,function(index,value)
    {
        ($("#"+value.id).val()!="") ? newData.push(value):console.log();
    });
    DataFinal=dataListado;
    $.each(newData,function(index,value)
    {
        DataTemp=[];
        // console.log(newData);
        $.each(dataListado,function(indexList,valueList)
        {
            $.each(valueList,function(ind,val)
            {
                if(ind==value.id)
                {
                    if(typeof(val)!="number")
                    {
                        ( val.toLowerCase().indexOf( $("#"+value.id).val().toLowerCase() ) != -1 ) ? DataTemp.push(valueList) :  console.log();
                    }
                    else
                        ( val == ( $("#"+value.id).val() ) ) ? DataTemp.push(valueList) :  console.log();
                }
            });
        });
        dataT=[];
        $.each(DataFinal,function(indF,valF)
        {
            $.each(DataTemp,function(indT,valT)
            {
                ( JSON.stringify(valF).indexOf( JSON.stringify(valT) ) != -1 ) ?  dataT.push(valF): console.log();
            });
        });
        if(DataFinal.length!=0)
            DataFinal=dataT;
    });
    aplicarFiltro(DataFinal);
}

function aplicarFiltro(DataFinal)
{
    // console.log(DataFinal);
    __datos=[];
    $.each(DataFinal,function (index,value)
    {
        __datos.push( reconstruir(value,index+1) );
    });
    if(DataFinal.length!=0)
        $("#jsGrid").jsGrid("openPage",1);
    DataGrid = __datos;
    gridInstance.loadData();
    $(".jsgrid-grid-body").css({"height":"171px"});
}

function mostrarFiltros()
{
    // $(".jsgrid-filter-row").slideToggle();
    // // $(".jsgrid-filter-row").animate({height:"toggle"});
    val = $('.jsgrid-filter-row').css("display");
    if(val == "none")
    {
        $('.jsgrid-filter-row').css("display","");
    //         $('.jsgrid-filter-row').slideDown();
    }
    else
    {
        $('.jsgrid-filter-row').css("display","none");
    //     $('.jsgrid-filter-row').slideUp();
    }
    // alert("A");
    // setTimeout(
        lol();
        // ,200);
}

function limpiarFiltros()
{
    $.each(filtros,function(index,value)
    {
        $("#"+value.id).val("");
        if(value.type="date")
        {
            $("#"+value.id+"_date").val("");
        }
        if(value.type="combobox")
        {
            $("#"+value.id+"_combobox").val("");
        }
    });
    filtroSupremo();
}