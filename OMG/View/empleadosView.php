<!DOCTYPE html>

<html>
    <head>
        <title>ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <script src="../../js/jquery.min.js" type="text/javascript"></script>

        <link href="../../css/settingsView.css" rel="stylesheet" type="text/css"/>

        <link href="../../assets/vendors/jGrowl/jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
        <script src="../../assets/vendors/jGrowl/jquery.jgrowl.js" type="text/javascript"></script>

        <script src="../../assets/swal/sweetalert2.all.min.js" type="text/javascript"></script>

        <link href="../../assets/googleApi/icon.css" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="../../assets/materialize/css/materialize.min.css"  media="screen,projection"/>
        <script type="text/javascript" src="../../assets/materialize/js/materialize.min.js"></script>

        <script src="../../js/fechas_formato.js" type="text/javascript"></script>

        <script src="../../js/empleadoView.js" type="text/javascript"></script>
        <script src="../../js/fGridComponent.js" type="text/javascript"></script>

        <style>
        </style>
    </head>

    <body>
        <div id="headerOpciones" style="position:fixed;width:100%;margin: 10px 0px 0px 0px;padding: 0px 0px 0px 5px;">
            <button type="button" class="waves-effect waves-light hoverable btn modal-trigger" href="#modalAgregarEmpleado">
                nuevo empleado
            </button>
        </div>
        <br><br><br><br><rb>
        <!-- JSGRID-->
        <div id="jsGrid"></div>
        <!-- AGREGAR EMPLEADO -->
        <div id="modalAgregarEmpleado" class="modal" style="min-height:auto;">
            <div id="modal_contentID" class="modal-content">
                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="nombreEmpleadoInput" type="text" class="autocomplete">
                        <label for="nombreEmpleadoInput">NOMBRE</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="apellidosEmpleadoInput" type="text" class="autocomplete">
                        <label for="apellidosEmpleadoInput">APELLIDOS</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="emailEmpleadoInput" type="text" class="autocomplete">
                        <label for="emailEmpleadoInput">EMAIL</label>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <a class="modal-close waves-effect waves-red red-text btn-flat">DESCARTAR</a>
                <a id="agregarEmpeladoBtn" class="waves-effect waves-green blue-text btn-flat">ACEPTAR</a>
            </div>
        </div>

        <div id="modalAgregarUsuario" class="modal" style="min-height:auto;">
            <div id="modal_contentID" class="modal-content">
                <br>
                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="usuarioUsuarioInput" type="text" class="autocomplete">
                        <label for="usuarioUsuarioInput">USUARIO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="contrasenaUsuarioInput" type="password" class="autocomplete">
                        <label for="contrasenaUsuarioInput">CONTRASEÑA</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="contrasena2UsuarioInput" type="password" class="autocomplete">
                        <label for="contrasena2UsuarioInput">RESPETIR CONTRASEÑA</label>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <a class="modal-close waves-effect waves-red red-text btn-flat">DESCARTAR</a>
                <a id="agregarUsuarioBtn" class="waves-effect waves-green blue-text btn-flat">ACEPTAR</a>
            </div>
        </div>
    </body>

    <script>
        var DataGrid=[];//grid datos del grid
        var dataListado=[];//grid datos del servidor, usado en el filtro
        var filtros=[];//grid busqueda de datos
        var db={};//grid
        var gridInstance;//grid objecto para acceder a valor y funciones del objecto grid
        var ultimoNumeroGrid=0;//grid contador para la numeracion del grid y usado en eliminacion

        var customsFieldsGridData=[//lista para guardar los campos personalizados del grid
            {field:"customControl",my_field:MyCControlField},//campo por defecto para las opciones de edicion y eliminacion
            // {field:"configUser",my_field:MyConfigUserField},
            // {field:"date",my_field:MyDateField},
            // {field:"dateTime",my_field:MyDateTimeField},
        ];//grid

        estructuraGrid = [//estructura que llevara la visualizacion del grid
            { name: "PK",visible:false},
            { name: "no", title:"N°", type: "text", width: 60, editing:false},
            { name: "nombre", title:"Nombre", type: "text", width: 160},
            { name: "apellidos", title:"Apellidos", type: "text", width: 180},
            { name: "email",title:"Email", type:"text", width:170,},
            { name: "usuario",title:"Usuario", type:"text", width:170,editing:false},
            { name:"delete", title:"Opción", type:"customControl",sorting:""},
        ];//grid

        construirGrid();//funcion para construir el grid visualmente

        inicializarFiltros().then((resolve2)=>//funcion promesa para crear la estructura de los campos del filtro
        {
            construirFiltros();//funcion para contruir los campos de filtro en el grid
            listarDatos();//listar los datos del servidor y base de datos a la vista para el grid
        },(error)=>//en caso de error en la promesa "inicializarFiltros"
        {
            growlError("Error!","Error al construir la vista, recargue la página");
        });

        $(document).ready(function(){
            $('.modal').modal({dismissible:false});//inicializacion del objeto modal de materialize
        });

        $(()=>{
            $("#agregarUsuarioBtn").click(()=>{
                agregarUsuarioCheck();
            });

            $("#agregarEmpeladoBtn").click(()=>{
                agregarEmpleadoCheck();
            });

        });

    </script>

</html>