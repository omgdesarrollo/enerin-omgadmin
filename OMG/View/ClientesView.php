<!DOCTYPE html>

<html>
    <head>
        <title>ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <script src="../../js/jquery.js" type="text/javascript"></script>

        <link href="../../css/settingsView.css" rel="stylesheet" type="text/css"/>
        <script src="../../js/requerimientoCampos.js" type="text/javascript"></script>

        <script src="../../js/draggable.js" type="text/javascript"></script>

        <link href="../../assets/vendors/jGrowl/jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
        <script src="../../assets/vendors/jGrowl/jquery.jgrowl.js" type="text/javascript"></script>

        <script src="../../assets/swal/sweetalert2.all.min.js" type="text/javascript"></script>

        <link href="../../assets/googleApi/icon.css" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="../../assets/materialize/css/materialize.min.css"  media="screen,projection"/>
        <script type="text/javascript" src="../../assets/materialize/js/materialize.min.js"></script>

        <script src="../../js/fechas_formato.js" type="text/javascript"></script>
        <script src="../../js/is.js" type="text/javascript"></script>

        <script src="../../js/componentsMaterialize.js" type="text/javascript"></script>
        <script src="../../js/ClientesView.js" type="text/javascript"></script>
        <script src="../../js/fGridComponent.js" type="text/javascript"></script>

        <style>
            .jsgrid-cell>select
            {
                display:initial !important;
            }
            .tab
            {
                border-radius:0px 20px 0px 20px;
                border-right:2px solid blue;
            }
            .tab:hover
            {
                border-right:6px solid blue;
            }
            .tab a
            {
                color: #c4c4c4 !important;
            }
            .tab a:hover
            {
                color:white !important;
            }
            .tab a.active
            {
                color:white !important;
            }
            #contenidoMostrarModulosExistentes,#contenidoMostrarModulosAgregados
            {
                overflow:scroll;
                height:380px;
            }
            .indicator
            {
                background-color:green !important;
            }
            .card
            {
                min-height:45px;
                max-height:45px;
            }
            /* contenedor de modulos no se usa */
            .card-action 
            {
                padding:0px !important;
                text-align:center;
            }
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
                    <div class="input-field col s12 m12 l12 xl12 light-blue-text text-darken-3">
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
                <a id="agregarProyectoBtn" class="waves-effect waves-green blue-text btn-flat">ACEPTAR</a>
            </div>
        </div>

        <div id="modalAgregarResponsable" class="modal" style="min-height:auto;">
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

        <div id="modalAdministrarProyectos" class="modal" style="min-height:auto;">
            <div id="modal_contentID" class="modal-content">
                <div class="row">
                    <a class='dropdown-trigger btn' href='#' data-target='dropdownProyectos' style="width:100%">PROYECTOS</a>
                    <ul id='dropdownProyectos' class='dropdown-content'>
                    </ul>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <span id="nombreAdministrarP"></span>
                        <span id="userAdministrarP"></span>
                        <span id="serverAdministrarP"></span>
                        <span id="dbAdministrarP"></span>
                        <span id="passAdministrarP"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="FechaInicio_AdministrarProyectos" type="text" class="datepicker"></input>
                        <label for="FechaInicio_AdministrarProyectos">FECHA INICIO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="FechaTermino_AdministrarProyectos" type="text" class="datepicker"></input>
                        <label for="FechaTermino_AdministrarProyectos">FECHA TERMINO</label>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <a class="modal-close waves-effect waves-red red-text btn-flat">DESCARTAR</a>
                <a id="administrarProyectosBtn" class="waves-effect waves-green blue-text btn-flat">AGREGAR</a>
            </div>
        </div>

        <div id="modalMostrarModulos" class="modal bottom-sheet modal-fixed-footer">
            <div class="modal-content" style="padding-bottom:0px;overflow:hidden">
                <!-- <h5 id="modalMostrarModulos_title"></h5> -->
                <div id="modalMostrarModulos_content" class="row">
                    <div>
                        <div id="contenidoTabsMostrarModulosTitle" class="col s12 m12 l12 xl12">
                            <!-- <ul class="tabs">
                                <li class="tab light-blue darken-3"><a class="waves-effect waves-light" href="#contenidoTabsMostrarModulos">Test 1</a></li>
                                <li class="tab light-blue darken-3"><a class="waves-effect waves-light" href="#contenido2">Test 1</a></li>
                            </ul> -->
                        </div>
                    </div>
                    <div class="col s12 m12 l12 xl12">

                        <div class="col s6 m6 l6 xl6" style="border-left:2px solid green;border-right:2px solid green;">
                            <h6 style="text-align:center">NO AGREGADOS</h6>
                            <div id="contenidoMostrarModulosExistentes" ondragover='dragover(event,this)' ondrop="drop(event,this,agregarModuloAlCliente)" class="col s12 m12 l12 xl12">
                                
                                <!-- <div class="col s6 m6 l4 xl4" style="">
                                    <div ondblclick='editarModuloAccion(this)' id='cardModulo_value.pk' style='width:100%;background:powderblue;' ondragstart='allowDrop(event,this)' ondragend='drag(event)'
                                    class='waves-effect waves-omg card hoverable tooltipped' data-tooltip='uunooo' draggable='true' style='cursor:pointer'>
                                        <div class="card-image center-align flow-text"></div>
                                            <div class="col s9 truncate" style="min-height:45px;max-height:45px;margin-0px;margin-top:10px;width:auto">
                                                <i class="material-icons blue-text left">extension</i>'+valuenombre+'
                                            </div>
                                    </div>
                                </div> -->

                                <!-- <div class="col s6 m6 l4 xl4" style="">
                                    <div ondblclick='editarModuloAccion(this)' id='cardModulo_value.pk' style='width:100%;background:powderblue;' ondragstart='allowDrop(event,this)' ondragend='drag(event)'
                                    class='waves-effect waves-omg card hoverable tooltipped' data-tooltip='dooos' draggable='true' style='cursor:pointer'>
                                        <div class="card-image center-align flow-text"></div>
                                        <div class="col s9 truncate" style="min-height:45px;max-height:45px;margin-0px;margin-top:10px;width:auto">
                                            <i class="material-icons blue-text left">extension</i>'+valuenombre+'
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>

                        <div class="col s6 m6 l6 xl6" style="border-left:2px solid green;border-right:2px solid green;">
                            <h6 style="text-align:center">AGREGADOS</h6>
                            <div id="contenidoMostrarModulosAgregados" ondragover='dragover(event,this)' ondrop="drop(event,this,quitarModuloAlCliente)" class="col s12 m12 l12 xl12">
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <!-- <a id="modalMostrarModulo_delete" class="waves-effect waves-red btn-flat red-text" ondragover='allowDrop(event)' ondrop="drop(event)"><i class="material-icons">delete_forever</i></a> -->
                <a class="modal-close waves-effect waves-red btn-flat red-text">Cerrar</a>
            </div>
        </div>

        <input id="editarFechaGrid_CreacionInput" type="text" class="datepicker" style="display:none"></input>
    </body>

    <script>
        $("#FechaInicio_AdministrarProyectos")[0]["fecha"] = "";
        $("#FechaTermino_AdministrarProyectos")[0]["fecha"] = "";
        $(document).ready(function(){
            $('.modal').modal({dismissible:false});

            $('.timepicker').timepicker({twelveHour:false});
            
            $('.datepicker').datepicker({format:"yyyy-mm-dd",
                i18n:{cancel:"DESCARTAR",months:monthsLarge,monthsShort:months,weekdays:weekdays,weekdaysAbbrev:weekdaysAbrev,weekdaysShort:weekdaysCorto},
                // onClose:()=>{}
            });

            // $("#FechaInicio_AdministrarProyectos").on("focus",()=>{
                $($('#FechaInicio_AdministrarProyectos')[0]["M_Datepicker"]["doneBtn"]).on("click",()=>{
                    $("#FechaInicio_AdministrarProyectos")[0]["fecha"] = $("#FechaInicio_AdministrarProyectos").val();
                    // console.log($("#FechaInicio_AdministrarProyectos").val());
                    // console.log($("#FechaInicio_AdministrarProyectos")[0]["Fecha"]);
                });//iniciar un custom de fechas para evitar cambios por html o vista, seguridadLabels 0.1

                $($('#FechaTermino_AdministrarProyectos')[0]["M_Datepicker"]["doneBtn"]).on("click",()=>{
                    $("#FechaTermino_AdministrarProyectos")[0]["fecha"] = $("#FechaTermino_AdministrarProyectos").val();
                    // console.log($("#FechaTermino_AdministrarProyectos")[0]["Fecha"]);
                    // console.log( $("#FechaTermino_AdministrarProyectos") );
                }); 
            // });
            

            $('textarea').characterCounter();

             $('.dropdown-trigger').dropdown();

             $('.tabs').tabs();

             $('.tooltipped').tooltip();
        });

        $(()=>{
            // $('a').on("click",function(){
            //     console.log("ADSADS");
            //     growlSuccess("A","C");
            // });

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

            $("#agregarProyectoBtn").on("click",()=>{
                let datosCliente = new Object();
                datosCliente["nombre_corto"] = $("#nombreCortoClienteInputAdd");
                datosCliente["nombre_completo"] = $("#nombreCompletoClienteInputAdd");
                datosCliente["fecha_inicio"] = $("#fechaInicioClienteInputAdd");
                datosCliente["fecha_termino"] = $("#fechaTerminoClienteInputAdd");
                comprobarCamposVacios(datosCliente,guardarCliente);
            });

            $("#editarFechaGrid_CreacionInput").change(()=>{
                let obj = $("#editarFechaGrid_CreacionInput")[0]["elementDestinoDate"];
                $(obj)[0]["dateFecha"] = $("#editarFechaGrid_CreacionInput").val();
                $(obj).val( $("#editarFechaGrid_CreacionInput").val() );
            });

            $("#administrarProyectosBtn").on("click",()=>{
                let pk_proyecto = $("#FechaInicio_AdministrarProyectos")[0]["id_proyecto"];
                if(pk_proyecto!="" && pk_proyecto!=undefined)
                {
                    let datosProyecto = new Object();
                    datosProyecto["FECHA INICIO"] = $("#FechaInicio_AdministrarProyectos")[0]["fecha"];
                    datosProyecto["FECHA TERMINO"] = $("#FechaTermino_AdministrarProyectos")[0]["fecha"];
                    comprobarCamposVaciosValor(datosProyecto,agregarProyectoAlCliente);
                }
                else
                {
                    growlError("Error","Seleccione Un Proyecto");
                }
            });

        });

        var DataGrid=[];
        var dataListado=[];
        var filtros=[];
        var db={};
        var gridInstance;
        var ultimoNumeroGrid=0;
        var empleados = [];
        var estructuraGrid;

        // var MyDateField = function(config)
        // {
        //     jsGrid.Field.call(this, config);
        // };
 
        // MyDateField.prototype = new jsGrid.Field//componer de acuerdo al dato necesario
        // ({
        //     css: "date-field",
        //     align: "center",
        //     sorter: function(date1, date2)
        //     {},
        //     itemTemplate: function(value)
        //     {
        //         return getSinFechaFormato(value);
        //     },
        //     insertTemplate: function(value)
        //     {},
        //     editTemplate: function(value,data)
        //     {
        //         fecha="0000-00-00";
        //         if(value!=fecha)
        //         {
        //                 fecha=value;
        //         }
        //         $("#editarFechaGrid_CreacionInput")[0]["dataCustom"] = data;
        //         this._inputDate = $("<input>").attr({id:"grid_fechaCreacion_"+data.PK,onClick:"gridFechaEditarProyecto(this)",type:"text",value:fecha,style:"margin:-5px;width:145px"});
        //         // grid_fechaActualizacion_
        //         // $('.datepicker').datepicker({format:"yyyy-mm-dd"});
        //         return this._inputDate;
        //     },
        //     insertValue: function()
        //     {},
        //     editValue: function(val)
        //     {
        //         value = this._inputDate[0].value;
        //         if(value=="")
        //                 return "0000-00-00";
        //         else
        //                 return $(this._inputDate).val();
        //     }
        // });

        var MyDateField = function(config)
        {
            jsGrid.Field.call(this, config);
        };
 
        MyDateField.prototype = new jsGrid.Field//campo personalizado para el grid, formato de fecha
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
                this._inputDate = $("<input>").attr({id:"grid_fechaCreacion",onClick:"gridFechaEditarProyecto(this)",type:"text",value:fecha,style:"margin:-5px;width:145px"});
                return this._inputDate;
            },
            insertValue: function()
            {},
            editValue: function()
            {
                value = $(this._inputDate)[0]["dateFecha"];
                if(value=="")
                        return "0000-00-00";
                else
                        return value;
            }
        });

        var comboboxResponsableField = function(config)
        {
            jsGrid.Field.call(this, config);
        };
 
        comboboxResponsableField.prototype = new jsGrid.Field//componer de acuerdo al dato necesario
        ({
            css: "date-field",
            align: "center",
            sorter: function(date1, date2)
            {},
            itemTemplate: function(value)
            {
                return value;
            },
            insertTemplate: function(value)
            {},
            editTemplate: function(value,data)
            {
                // temporal = $("<div>").append($("<a>",{class:'waves-effect waves-omg flow-text trigger',href:'#modalAgregarResponsable'}).append( $("<i>",{class:'material-icons',html:'person_add'})))
                // tempData["responsable"] = value.responsable==null? $(temporal).html()
                // $("#editarFechaGrid_CreacionInput")[0]["dataCustom"] = data;
                // this._inputDate = $("<input>").attr({id:"grid_fechaCreacion_"+data.PK,onClick:"gridFechaEditarProyecto(this)",type:"text",value:fecha,style:"margin:-5px;width:145px"});
                // grid_fechaActualizacion_
                // $('.datepicker').datepicker({format:"yyyy-mm-dd"});
                // return this._inputDate;
                // tempData = $()
                return tempData;
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
            {field:"comboboxResponsable",my_field:comboboxResponsableField},
            
        ];

        construirEstructuraGrid = ()=>
        {
            estructuraGrid = [
                { name: "PK",visible:false},
                { name: "fk_empleado",visible:false },
                { name: "no", title:"N°", type: "text", width: 60, editing:false},
                { name: "nombre_corto", title:"Nombre Corto", type: "text", width: 150},
                { name: "nombre_completo", title:"Nombre Completo", type: "text", width: 180},
                // { name: "fecha_inicio",title:"Fecha Inicio", type:"date", width:160},
                // { name: "fecha_termino", title:"Fecha Termino", type: "date", width: 160},
                { name: "responsable", title:"Responsable", type:"select",items:empleados, valueField:"value", textField:"nombre" , width: 170},
                { name: "proyectos", title:"Proyectos", type:"text", width: 170},
                { name: "modulos", title:"Administrar Modulos", type:"text", width: 170},
                { name:"delete", title:"Opción", type:"customControl",sorting:""},
            ];
        }

        listarEmpleados().then((resolve)=>{
            // console.log(empleados);
            construirEstructuraGrid();
            construirGrid();
            inicializarFiltros().then((resolve2)=>
            {
                construirFiltros();
                listarDatos();
            },(error)=>
            {
                growlError("Error!","Error al construir la vista, recargue la página");
            });
        },(error1,erro2)=>{
            growlError(error1,errro2);
        });

    </script>

</html>