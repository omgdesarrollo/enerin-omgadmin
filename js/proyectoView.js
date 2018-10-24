inicializarFiltros = ()=>
{
    return new Promise((resolve,reject)=>
    {
        filtros = [
            { name: "N°",id:"no", type: "none" },
            { name: "",id:"nombre", type: "text" },
            { name: "",id:"descripcion", type: "text" },
            { name: "",id:"creacion", type: "date" },
            { name: "",id:"actualizacion", type: "date" },
            { name: "",id:"modulo", type: "none" },
            {name:"opcion",id:"opcion",type:"opcion"}
        ];
        resolve();
    });
}

listarDatos = () =>
{
    return new Promise((resolve,reject)=>
    {
        let tempData = [];
        $.ajax({
            url: "../Controller/ProyectosController.php?Op=ListarProyectos",
            type:"GET",
            beforeSend:()=>
            {
                growlWait("Obteniendo Datos","Proyectos");
            },
            success:(data)=>
            {
                if(typeof(data)=="object")
                {
                    dataListado = data;
                    // let tempData="";//version plus
                    if(data.length !=0)
                    {
                        growlSuccess("Datos Obtenidos","Proyectos");
                    }
                    else
                        growlSuccess("Sin Datos","Proyectos");
                    $.each(data,(index,value)=>{
                        // tempData += construirProyectos(value);//version plus
                        tempData.push( reconstruir(value,index+1) );
                    });
                    DataGrid = tempData;
                    gridInstance.loadData();
                    // $("#proyectoListado").html(tempData+cardAgregarProyecto);//version plus
                    // $('.tooltipped').tooltip();//Version plus
                    // instanceTooltip = M.Tooltip.getInstance(elem);//version plus
                }
                else
                    growlError("Error Obtener Datos","Proyectos");
            },
            error:()=>
            {
                gridInstance.loadData();
                growlError("Error","Error en el servidor");                        
            }
        })
    });
}

// construirProyectos = (value)=>//version plus
reconstruir = (value,index)=>
{
    ultimoNumeroGrid = index;
    // let tempData="";
    // tempData = '<div id="proyect_'+value.pk+'" ondrop="drop(event,'+value.pk+')" ondragover="allowDrop(event,'+value.pk+')" class="col s4 m3 l2 xl2">';
    // tempData += "<div style='width:100%' ondblclick='abrirEdicionProyecto("+JSON.stringify(value)+")'" +'class="card sticky-action hoverable tooltipped" data-tooltip="Creado: '+value.creacion+'<br>Responsable: X<br>Actualización: '+value.actualizacion+'" draggable="true">';
    // tempData += '<div class="card-image center-align flow-text">';
    // tempData += '<a class="waves-effect waves-omg"><i class="material-icons blue-text" >image</i></a></div>';
    // tempData += '<div class="card-action">';
    // tempData += '<h6 class="green-text accent-4 truncate lowered">'+value.nombre+'</h6></div></div></div>';

    let tempData = new Object();
    tempData["no"] = index;
    tempData["PK"] = value.pk;
    tempData["nombre"] = value.nombre;
    tempData["descripcion"] = value.descripcion;
    tempData["creacion"] = value.creacion;
    tempData["actualizacion"] = value.actualizacion;
    tempData["modulos"] = "<button onclick='construirModulosProyecto("+JSON.stringify(value)+")'";
    tempData["modulos"] += 'type="button" class="modal-trigger" href="#modalMostrarModulos" style="border:none;background:transparent;cursor:pointer">';
    tempData["modulos"] += '<i class="material-icons blue-text small">view_module</i></button>';
    // tempData["modulos"] = '<button type="button" title="Recargar Datos" class="btn waves-effect waves-light light-blue darken-3 hoverable btn_filter" onclick="refresh();"><i class="material-icons">view_module</i></button>';
    // tempData["responsable"] = value.responsable;//Agrear al DAO
    tempData["delete"] = [];
    tempData["delete"].push({pk:tempData["PK"]});
    tempData["delete"].push({eliminar:1});
    tempData["delete"].push({editar:1});
    return  tempData;
}

abrirEdicionProyecto = (data)=>//version plus
{
    data = JSON.stringify(data);
    $(divIframe).html("<iframe src='proyectoEdicionView.php?data="+data+"'></iframe>");
}

agregarProyecto = (data)=>
{
    let dataPost = "{";
    let bandera = 0;
    let obj = new Object();
    $.each(data,(index,value)=>{
        // if(bandera == 1)
        // {
        //     dataPost += ",";
        // }
        // dataPost += index+":\""+value.val()+"\"";
        // bandera = 1;
        obj[index] = value.val();
    });

    $.ajax({
        url: "../Controller/ProyectosController.php?Op=AgregarProyecto",
        type: "POST",
        data: "datos="+JSON.stringify(obj),
        beforeSend:()=>
        {
            growlWait("Agregar Proyecto","Agregando...");
        },
        success:(resp)=>
        {
            if(resp!=-1)
                console.log("A");
            else
                growlError("Error Agregar Proyecto","No se pudo agregar el proyecto");
        },
        error:()=>
        {
            growlError("Error","Error en el servidor");
        }
    });
}
    // </div>';

construirModulosProyecto = (data)=>
{
    let cardAgregarModulo = '<div class="col s4 m3 l2 xl2">';
    // let cardAgregarModulo = '<div class="col s12 m12 l12 xl12">';
    cardAgregarModulo += '<div onclick="bloquearModalMostrarModulos(1)" style="width:100%;background:#26a69a" href="#modalAgregarModulo" class="waves-effect waves-light white-text card hoverable modal-trigger" style="cursor:pointer">';
    cardAgregarModulo += '<div class="card-image center-align flow-text">';
    cardAgregarModulo += '</div>';
    cardAgregarModulo += '<div class="row center-align" style="margin-bottom:0px"><div class="col s3" style="margin-top:10px"><i class="material-icons white-text">create_new_folder</i></div>';
    cardAgregarModulo += '<div class="col s9 valign-wrapper" style="min-height:45px;max-height:45px;">AGREGAR MODULO</div></div></div></div>';
    let tempData="";
    // console.log(data);
    $.each(data.modulos,(index,value)=>{
        // ondblclick='abrirEdicionModulo("+JSON.stringify(value)+")'
        // ondrop='drop(event,"+value.pk+")'
        // ondragover='allowDrop(event,"+value.pk+")'
        tempData += '<div class="col s4 m3 l2 xl2">';
        tempData += "<div id='cardModulo_"+value.pk+"' style='width:100%;background:powderblue;' ondragstart='allowDrop(event,"+value.pk+")' ondragend='drag(event)' ondragover='dragover(event)' ";
        tempData += "href='#' class='waves-effect waves-omg card hoverable modal-trigger tooltipped' data-tooltip='"+value.descripcion+"' draggable='true' style='cursor:pointer'>";
        tempData += '<div class="card-image center-align flow-text"></div>';
        tempData += '<div class="row center-align" style="margin-bottom:0px"><div class="col s3" style="margin-top:10px"><i class="material-icons blue-text">extension</i></div>';
        tempData += '<div class="col s9 valign-wrapper" style="min-height:45px;max-height:45px;">'+value.nombre+'</div></div></div></div>';
    });
    tempData+=cardAgregarModulo;
    // $("#modalMostrarModulos_footer").append(cardAgregarModulo);
    $("#modalMostrarModulos_content").html(tempData);
    $("#modalMostrarModulos_content")[0]["dataCustom"]=data;
    $("#modalMostrarModulos_title").html(data.nombre);
    $.each(data.modulos,(index,value)=>{
        $("#cardModulo_"+value.pk)[0]["dataCustom"]=value;
        $("#cardModulo_"+value.pk)[0]["eliminarFnCustom"]=[preguntarEliminarModulo];
    });
    reiniciarTooltip();
}

bloquearModalMostrarModulos = (opcion)=>
{
    // console.log($("#modalMostrarModulos_content"));
    // console.log($("#modalAgregarModulo"));
    // ["_handleModalCloseClickBound"]
    // instancess = M_Modal.getInstance($("#modalAgregarModulo"));
    // console.log(instancess);
    // $("#modalAgregarModulo")[0]["M_Modal"]["_handleOverlayClickBound"];
    let b = $("#modalMostrarModulos").css("bottom");
    let d = $("#modalMostrarModulos").css("display");
    opcion==1?
    $("#modalMostrarModulos").attr("style","z-index:1002 !important;opacity:0.5;bottom:"+b+";display:"+d) : 
    (   $("#agregarModulo_nombreInput").val(""),
        $("#agregarModulo_descripcionInput").val(""),
        $("#modalMostrarModulos").attr("style","z-index:1003 !important;opacity:1;bottom:"+b+";display:"+d) );
}

agregarModuloCheck = ()=>
{
    let bandera = 1;
    let mensajeError = "";
    let datosProyecto = new Object();

    datosProyecto["nombre"] = $("#agregarModulo_nombreInput");
    datosProyecto["descripcion"] = $("#agregarModulo_descripcionInput");

    $.each(datosProyecto,(index,value)=>{
        if(value.val()=="")
        {
            bandera = 0;
            mensajeError += "*"+value[0].labels[0].innerHTML+"\n";
        }
    });
    bandera==0?
        growlError("Campos Requeridos",mensajeError):(
            datosProyecto["nombre"] = $("#agregarModulo_nombreInput").val(),
            datosProyecto["descripcion"] = $("#agregarModulo_descripcionInput").val(),
            datosProyecto["fk_proyecto"] = $("#modalMostrarModulos_content")[0]["dataCustom"]["pk"],
            agregarModulo(datosProyecto));
}

agregarModulo = (data)=>
{
    // let obj = new Object();
    // $.each(data,(index,value)=>{
    //     obj[index] = value.val();
    // });

    $.ajax({
        url: "../Controller/ProyectosController.php?Op=AgregarModulo",
        type: "POST",
        data: "datos="+JSON.stringify(data),
        beforeSend:()=>
        {
            growlWait("Agregar Modulo","Agregando...");
        },
        success:(resp)=>
        {
            if(typeof(resp)=="object")
                {
                    if(resp.length!=0)
                    {
                        id_vista = resp[0].fk_proyecto;
                        id_string = "pk";
                        growlSuccess("Agregar Modulo","Modulo Agregado");
                        $.each(dataListado,(index,value)=>{
                            $.each(value,(ind,val)=>
                            {
                                if(ind == id_string)
                                        ( val==id_vista) ? ( dataListado[index]["modulos"].push(resp[0]), construirModulosProyecto(dataListado[index]), 
                                         bloquearModalMostrarModulos(0), $('#modalAgregarModulo.modal').modal('close') ): console.log();
                            });
                        });
                        componerDataGrid();
                        gridInstance.loadData();
                    }
                    else
                        growlError("Error Agregar Modulo","Se agrego el modulo, pero no se pudo agregar a la vista");
                }
            else
            {
                if(resp==-1)
                    growlError("Error Agregar Modulo","No se pudo agregar el modulo");
                if(resp==-2)
                    growlError("Error Agregar Modulo","Se agrego el modulo, pero no se pudo agregar a la vista");
            }
        },
        error:()=>
        {
            growlError("Error","Error en el servidor");
        }
    });
}

componerDataListado = (value)=>// id de la vista documento, listo
{
    id_vista = value.pk;
    id_string = "pk";
    $.each(dataListado,function(indexList,valueList)
    {
        $.each(valueList,function(ind,val)
        {
            if(ind == id_string)
                    ( val==id_vista) ? dataListado[indexList]=value : console.log();
        });
    });
}

componerDataGrid = ()=>//listo
{
    __datos = [];
    $.each(dataListado,function(index,value){
        __datos.push(reconstruir(value,index+1));
    });
    DataGrid = __datos;
}

preguntarEliminarModulo = (pk)=>
{
    console.log("Listo Eliminar: "+pk);
    swal({
        title: "",
        text: "¿Eliminar Modulo?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        }).then((confirmacion)=>{
            if(confirmacion["value"]!=undefined)
            {
                // eliminarServicio(data);
                eliminarModulo(pk);
            }
        });
        $(".swal2-popup").css("font-size","initial");
}

eliminarModulo = (pk)=>
{
    let datos = $("#cardModulo_"+pk)[0]["dataCustom"];
    $.ajax({
        url: "../Controller/ProyectosController.php?Op=EliminarModulo",
        type: "POST",
        data: "PK="+pk,
        beforeSend:()=>
        {
            growlWait("Eliminar Modulo","Eliminando...");
        },
        success:(resp)=>
        {
            let index1=-1;
            let index2=-1;
            (resp==1)
            ?(
                growlSuccess("Eliminar Modulo","Modulo Eliminado"),
                id_vista = datos.fk_proyecto,
                $.each(dataListado,(index,value)=>{
                    if( value["pk"]==id_vista)
                    {
                        index1=index;
                        $.each(value.modulos,(ind,val)=>{
                            if(val["pk"]==pk)
                                index2=ind;
                        });
                    }
                })
            ):  growlError("Error Eliminar Modulo","No se pudo eliminar el modulo");
            if( index2!=-1 )
            {
                dataListado[index1]["modulos"].splice(index2,1);
                construirModulosProyecto(dataListado[index1]);
                componerDataGrid();
                gridInstance.loadData();
            }
        },
        error:()=>
        {
            growlError("Error","Error en el servidor");
        }
    });

}

reiniciarTooltip = ()=>
{
    $('.material-tooltip').remove();
    $('.tooltipped').tooltip();
}