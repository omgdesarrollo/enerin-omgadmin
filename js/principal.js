
abrirProyectos = ()=>
{
    $("#divIframe").html("<iframe id='frameprueba' src='proyectosView.php'></iframe>");
    $("#navegacionCrumb").html("<a onclick='abrirProyectos()' class='breadcrumb' style='cursor:pointer'>Proyectos<i class='material-icons left'>refresh<i></a>");
}

abrirClientes = ()=>
{
    $("#divIframe").html("<iframe id='frameprueba' src='clientesView.php'></iframe>");
    $("#navegacionCrumb").html("<a onclick='abrirClientes()' class='breadcrumb' style='cursor:pointer'>Clientes<i class='material-icons left'>refresh<i></a>");
}

abrirEmpleados = ()=>
{
    $("#divIframe").html("<iframe id='frameprueba' src='empleadosView.php'></iframe>");
    $("#navegacionCrumb").html("<a onclick='abrirEmpleados()' class='breadcrumb' style='cursor:pointer'>Empleados<i class='material-icons left'>refresh<i></a>");
}

abrirNotificaciones = ()=>
{
    $("#divIframe").html("<iframe id='frameprueba' src='notificacionesView.php'></iframe>");
    $("#navegacionCrumb").html("<a onclick='abrirNotificaciones()' class='breadcrumb' style='cursor:pointer'>Notificaciones<i class='material-icons left'>refresh<i></a>");
}

abrirMejoras = ()=>
{
    $("#divIframe").html("<iframe id='frameprueba' src='mejorasView.php'></iframe>");
    $("#navegacionCrumb").html("<a onclick='abrirMejoras()' class='breadcrumb' style='cursor:pointer'>Mejoras<i class='material-icons left'>refresh<i></a>");
}

getElement_navegacionCrumb=()=>//no usado
{
    return $("#navegacionCrumb");
}

getDivIframe = ()=>//no usado
{
    return $("#divIframe");
}

cambioMenu = (obj)=>
{
    $(".waves-omg").removeClass("no-active");
    $("li").css("background","");
    $("i.green-text").removeClass("green-text");
    $("i").addClass("blue-text");
    let parent = $(obj.currentTarget).parent();
    $(parent).css("background","gainsboro");
    $(obj.currentTarget).addClass("no-active");
    let i = $(obj.currentTarget).find("i");
    $(i).removeClass("blue-text");
    $(i).addClass("green-text");
}

cerrarSesion = ()=>
{
    swal({
    title: "",
    text: "¿Cerrar Sesión?",
    type: "question",
    showCancelButton: true,
    // closeOnConfirm: false,
    // showLoaderOnConfirm: true,
    confirmButtonText: "Cerrar",
    cancelButtonText: "Quedarse",
    }).then((confirmacion)=>{
        if(confirmacion["value"]!=undefined)
        {
            window.location = "Logout.php";
        }
    });
    $(".swal2-popup").css("font-size","initial");
    // console.log(window);
}

abrirInfoUSuario = ()=>
{
    swal({
        title: "",
        text: "EN CONSTRUICCIÓN ;)",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "OK",
        }).then((confirmacion)=>{
            if(confirmacion["value"]!=undefined)
            {}
        });
        $(".swal2-popup").css("font-size","initial");
}