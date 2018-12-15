var select = -1;//id del elemento seleccionado
var style_modalMostrarModulo_delete;//estilo origial del elemento selecionado
var $obj_selected;

allowDrop = (ev,obj)=>//al seleccionar para mover el elemento
{
    console.log("1");
    // if($obj_selected == undefined)
    // {
        // style_modalMostrarModulo_delete = $("#modalMostrarModulo_delete").css("font-size");
        // select = id;
        $obj_selected = obj;
    // }
    // $("#modalMostrarModulo_delete").css("font-size","35px");
    // $("#modalMostrarModulo_delete").css("color","red");
}

dragover = (ev,obj)=>//al mover el elemento
{
    // console.log("2");
    let origen = $($obj_selected).parent();
    let destino1 = $(obj)[0]["id"];
    let destino2 = $( $( $($obj_selected).parent()).parent())[0]["id"];
    if(destino1 != destino2)
    {
        ev.preventDefault();
    }
    else
    {
        // console.log("No se movera dentro del mismo segmento");
    }
}

drag = (ev)=>//al soltar el elemento
{
    console.log("3");
    // select = -1;
    // $("#modalMostrarModulo_delete").css("font-size",style_modalMostrarModulo_delete);
    // $("#modalMostrarModulo_delete").css("color","");
}

drop = (ev,obj,opcion)=>//al soltar el elemento sobre un elemento especifico
{
    ev.preventDefault();
    // console.log("4");
    let origen = $($obj_selected).parent();
    // let destino1 = $(obj)[0]["id"];
    // let destino2 = $( $( $($obj_selected).parent()).parent())[0]["id"];
    // if(destino1 != destino2)
    // {
    // console.log($($obj_selected).parent());
    opcion().then((resolve)=>
    {
        if(resolve=1)
            $(origen).appendTo($(obj));
    });

    // }
    // else
    // {
        // console.log("No se movera dentro del mismo segmento");
    // }
    // $("#cardModulo_"+select)[0]["eliminarFnCustom"][0](select);
}