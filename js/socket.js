
function conexionSocketC()
{
    ws = new WebSocket("ws://192.168.1.72:8686");
    // console.log(ws);

    ws.onopen = () =>
    {
        clearInterval(intervalFunc);
        console.log("conectado al servidor con socket");
    }

    ws.onmessage = e =>
    {
        // const msg = JSON.parse();
        console.log("Aqui");
    }

    ws.onerror = e =>
    {
        console.log("sin conexion");
        console.log(e);
    }

    ws.onclose = e =>
    {
        console.log("Conexion cerrada");
        // console.log(e);
    }
    return false;
}