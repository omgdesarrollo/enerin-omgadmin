$(()=>{
    $("#btn_logearse").click(()=>{//funcion para recolectar datos e iniciar sesion
        logearse();
    });
    $("#usuarioInput").keypress((evt)=>{
        if(evt.which == 13)
            logearse();
    });
    $("#contrasenaInput").keypress((evt)=>{
        if(evt.which == 13)
            logearse();
    });
});

logearse = ()=>
{
    let usuario = $("#usuarioInput").val();
    let contrasena = $("#contrasenaInput").val();
    let msj = "";
    usuario != "" ? contrasena != "" ? iniciarSesion(usuario,contrasena) : 
    msj = "Campo de contraseña requerido" : 
    contrasena != "" ? msj = "Campo de usuario requerido" : msj = "Campos de usuario y contraseña requeridos";
    if(msj!="")
        growlError("",msj);
}

iniciarSesion = (usuario,contrasena)=>
{
    // alert(usuario+" - "+contrasena);
    $.ajax({
        url: '../Controller/LoginController.php',
        type: 'POST',
        data: 'usuario='+usuario+"&contrasena="+contrasena,
        beforeSend:()=>
        {
            growlWait("Inicio de sesión","...");
        },
        success:(response)=>
        {
            if(response!=-1)
                window.location = "principal.php";
            else
                growlError("Inicio de sesión","Usuario o contraseña incorrectos");
        },
        error:(er)=>
        {
            // console.log(er);
            growlError("Inicio de sesión","Error del servidor");
        }
    });
};
