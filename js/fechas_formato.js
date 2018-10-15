
months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function getSinFechaFormato(value)//listo
{
    fecha="0000-00-00";
    if(value!=fecha)
    {
        date = new Date(value);
        date.setSeconds(86400);//86400 segundos son un dia
        fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
        return fecha;
    }
    else
        return "Sin fecha";
}

function getFechaFormatoH(value)
{
    fecha="0000-00-00";
    // console.log(this);
    this[this.name] = value;
    // console.log(data);
    if(value!=fecha)
    {
            date = new Date(value);
            min = date.getMinutes();
            min = min < 10 ? "0"+min : min;
            seg = date.getSeconds();
            // date.setSeconds(86400+seg);//86400 segundos son un dia
            seg = seg < 10 ? "0"+seg : seg;
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4) +" "+date.getHours()+":"+min+":"+seg;
            return fecha;
    }
    else
            return "Sin fecha";
}

function getFechaStamp(value)
{
    var fecha = new Date(value*1000);
    min = fecha.getMinutes();
    min = min < 10 ? "0"+min : min;
    seg = fecha.getSeconds();
    // date.setSeconds(86400+seg);//86400 segundos son un dia
    seg = seg < 10 ? "0"+seg : seg;
    return (fecha.getDate() +" "+ months[fecha.getMonth()] +" "+ fecha.getFullYear().toString().slice(2,4) +" "+fecha.getHours()+":"+min+":"+seg);
}

