
comprobarCamposVacios = (datos,fn)=>
{
    let bandera = 1;
    let mensajeError = "";
    $.each(datos,(index,value)=>{
        if(value.val()=="")
        {
            bandera = 0;
            mensajeError += "*"+value[0].labels[0].innerHTML+"<br>";
        }
    });
    bandera==0?
        growlError("Campos Requeridos",mensajeError):fn(datos);
}

comprobarCamposVaciosValor = (datos,fn)=>
{
    let bandera = 1;
    let mensajeError = "";
    $.each(datos,(index,value)=>{
        if(value=="")
        {
            bandera = 0;
            // mensajeError += "*"+value[0].labels[0].innerHTML+"<br>";
            mensajeError += "*"+index+"<br>";
        }
    });
    bandera==0?
        growlError("Campos Requeridos",mensajeError):fn(datos);
}