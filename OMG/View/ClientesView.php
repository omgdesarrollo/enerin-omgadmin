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
        <script src="../../js/is.js" type="text/javascript"></script>

        <script src="../../js/ClientesView.js" type="text/javascript"></script>
        <script src="../../js/fGridComponent.js" type="text/javascript"></script>

        <style>
        </style>
    </head>

    <body>
        <div id="headerOpciones" style="position:fixed;width:100%;margin: 10px 0px 0px 0px;padding: 0px 0px 0px 5px;">
            <button id="btn_modalAgregarCliente" type="button" class="waves-effect waves-light hoverable btn modal-trigger" href="#modalAgregarCliente">
                Agregar Cliente
            </button>
        </div>

        <br><br><br>
        <div id="jsGrid"></div>

        <div id="modalAgregarCliente" class="modal" style="min-height:auto;">
            <div id="" class="modal-content">
                <div class="row">
                    <div class="input-field col s12 m12 l12 xl12 light-blue-text text-darken-3">
                        <input id="nombreCortoClienteInputAdd" type="text" class="autocomplete">
                        <label for="nombreCortoClienteInputAdd">NOMBRE CORTO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 m12 l12 xl2 light-blue-text text-darken-3">
                        <input id="nombreCompletoClienteInputAdd" type="text" class="autocomplete">
                        <label for="nombreCompletoClienteInputAdd">NOMBRE COMPLETO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 m12 l12 xl12 light-blue-text text-darken-3">
                        <input id="fechaInicioClienteInputAdd" type="text" class="datepicker">
                        <label for="fechaInicioClienteInputAdd">FECHA INICIO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 m12 l12 xl12 light-blue-text text-darken-3">
                        <input id="fechaTerminoClienteInputAdd" type="text" class="datepicker">
                        <label for="fechaTerminoClienteInputAdd">FECHA TERMINO</label>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <a class="modal-close waves-effect waves-red red-text btn-flat">DESCARTAR</a>
                <a id="agregarProyectoInput" class="waves-effect waves-green blue-text btn-flat">ACEPTAR</a>
            </div>
        </div>

    </body>

    <script>
        $(document).ready(function(){
            $('.modal').modal({dismissible:false});

            $('.timepicker').timepicker({twelveHour:false});
            
            $('.datepicker').datepicker({format:"yyyy-mm-dd",i18n:{cancel:"DESCARTAR",months:monthsLarge,monthsShort:months,weekdays:weekdays,weekdaysAbbrev:weekdaysAbrev,weekdaysShort:weekdaysCorto} });
            
            $('textarea').characterCounter();
        });

        $(()=>{
            $("#btn_modalAgregarCliente").on("click",()=>{
                $("#nombreCortoClienteInputAdd").val("");
                $("#nombreCortoClienteInputAdd").focus();
                $("#nombreCompletoClienteInputAdd").val("");
                $("#fechaInicioClienteInputAdd").val("");
                $("#fechaTerminoClienteInputAdd").val("");
            });

            $("#fechaInicioClienteInputAdd").on("focus",()=>{
                $("#fechaInicioClienteInputAdd").click();
            });
            $("#fechaTerminoClienteInputAdd").on("focus",()=>{
                $("#fechaTerminoClienteInputAdd").click();
            });
        });

        var DataGrid=[];
        var dataListado=[];
        var filtros=[];
        var db={};
        var gridInstance;
        var ultimoNumeroGrid=0;

        var MyDateField = function(config)
        {
            jsGrid.Field.call(this, config);
        };
 
        MyDateField.prototype = new jsGrid.Field//componer de acuerdo al dato necesario
        ({
            css: "date-field",
            align: "center",
            sorter: function(date1, date2)
            {},
            itemTemplate: function(value)
            {
                return getSinFechaFormato(value);
            },
            insertTemplate: function(value)
            {},
            editTemplate: function(value,data)
            {
                fecha="0000-00-00";
                if(value!=fecha)
                {
                        fecha=value;
                }
                // $("#editarFechaGrid_CreacionInput")[0]["dataCustom"] = data;
                // this._inputDate = $("<input>").attr({id:"grid_fechaCreacion_"+data.PK,onClick:"gridFechaEditarProyecto(this)",type:"text",value:fecha,style:"margin:-5px;width:145px"});
                // grid_fechaActualizacion_
                // $('.datepicker').datepicker({format:"yyyy-mm-dd"});
                // return this._inputDate;
            },
            insertValue: function()
            {},
            editValue: function(val)
            {
                value = this._inputDate[0].value;
                if(value=="")
                        return "0000-00-00";
                else
                        return $(this._inputDate).val();
            }
        });

        var customsFieldsGridData=[
            {field:"customControl",my_field:MyCControlField},
            {field:"date",my_field:MyDateField},
            // {field:"dateTime",my_field:MyDateTimeField},
        ];

        estructuraGrid = [
            { name: "PK",visible:false},
            { name: "fk_empleado",visible:false },
            { name: "no", title:"N°", type: "text", width: 60, editing:false},
            { name: "nombre_corto", title:"Nombre Corto", type: "text", width: 160},
            { name: "nombre_completo", title:"Nombre Completo", type: "text", width: 180},
            { name: "fecha_inicio",title:"Fecha Inicio", type:"date", width:170,},
            { name: "fecha_termino", title:"Fecha Termino", type: "dateTime", width: 170},
            { name: "responsable", title:"Responsable", type: "text", width: 80, editing:false},
            { name:"delete", title:"Opción", type:"customControl",sorting:""},
        ];

        construirGrid();

        inicializarFiltros().then((resolve2)=>
        {
            construirFiltros();
            listarDatos();
        },(error)=>
        {
            growlError("Error!","Error al construir la vista, recargue la página");
        });
    </script>

</html>