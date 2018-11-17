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

        <script src="../../js/proyectoView.js" type="text/javascript"></script>
        <script src="../../js/fGridComponent.js" type="text/javascript"></script>

        <style>
            /* no uso */
            .collapsible
            {
                /* margin:10px 0 0 10px; */
                border:none;
            }

            /* contenedor de modulos */
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
        <!-- <ul class="collapsible">
            <li class="active">
                <div class="collapsible-header waves-effect waves-omg"><i class="material-icons blue-text">work</i>PROYECTOS</div>
                <div class="collapsible-body
                ">
                    <span>
                        <div class="row">
                            <div>
                        </div>
                    </span>
                </div>
            </li>

            <li>
                <div class="collapsible-header waves-effect waves-omg"><i class="material-icons blue-text">supervisor_account</i>CLIENTES</div>
                <div class="collapsible-body">
                    <span>En construccion de la vista</span>
                </div>
            </li>

        </ul> -->
        <!-- <div id="headerOpciones" class="row" style="position:fixed;width:100%;margin: 10px 0px 0px 0px;padding: 0px 25px 0px 5px;"></div> -->
        <!-- <div class="row"> -->
        
        <!-- BOTONES DE HERRAMIENTAS -->
        <div id="headerOpciones" style="position:fixed;width:100%;margin: 10px 0px 0px 0px;padding: 0px 0px 0px 5px;">
            <button type="button" class="waves-effect waves-light hoverable btn modal-trigger" href="#modalAgregarProyecto">
                Nuevo Proyecto
            </button>
        </div>
        <br><br><br>
        <!-- JSGRID-->
        <div id="jsGrid"></div>
        <!-- <div id="proyectoListado" class="row"></div>//version plus -->
        
        <!-- AGREGAR PROYECTO-->
        <div id="modalAgregarProyecto" class="modal" style="min-height:auto;">
            <div id="modal_contentID" class="modal-content">
                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="nombreProyectoInput" type="text" class="autocomplete">
                        <label for="nombreProyectoInput">NOMBRE PROYECTO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <textarea id="descripcionProyectoInput" class="materialize-textarea" data-length="250"></textarea>
                        <label for="descripcionProyectoInput">DESCRIPCIÓN</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="fechaProyectoInput" type="text" class="datepicker">
                        <label for="fechaProyectoInput">FECHA CREACIÓN</label>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <a class="modal-close waves-effect waves-red red-text btn-flat">DESCARTAR</a>
                <a id="agregarProyectoInput" class="waves-effect waves-green blue-text btn-flat">ACEPTAR</a>
            </div>
        </div>

        <!-- AGREGAR MODULO -->
        <div id="modalAgregarModulo" class="modal modal-fixed-footer" style="min-height:auto">
            <div id="modal_contentID" class="modal-content center-align">
                <h6>AGREGAR MODULO</h6>
                <br><br>
                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="agregarModulo_nombreInput" type="text" class="autocomplete" style="text-transform: uppercase">
                        <label for="agregarModulo_nombreInput">NOMBRE MODULO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <textarea id="agregarModulo_descripcionInput" class="materialize-textarea" data-length="250"></textarea>
                        <label for="agregarModulo_descripcionInput">DESCRIPCIÓN</label>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <a id="agregarModulo_DescartarButton" onclick="bloquearModalMostrarModulos(0)" class="modal-close waves-effect waves-red red-text btn-flat">DESCARTAR</a>
                <a id="agregarModulo_AceptarButton" class="waves-effect waves-green blue-text btn-flat">ACEPTAR</a>
            </div>
        </div>

        <!-- EDITAR MODULO -->
        <div id="modalEditarModulo" class="modal modal-fixed-footer" style="min-height:auto">
            <div id="modal_contentID" class="modal-content center-align">
                <h6>EDITAR MODULO</h6>
                <br><br>
                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <input id="editarModulo_nombreInput" type="text" class="autocomplete" style="text-transform: uppercase">
                        <label for="editarModulo_nombreInput">NOMBRE MODULO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <textarea id="editarModulo_descripcionInput" class="materialize-textarea" data-length="250"></textarea>
                        <label for="editarModulo_descripcionInput">DESCRIPCIÓN</label>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <a id="editarModulo_DescartarButton" onclick="bloquearModalMostrarModulos(0)" class="modal-close waves-effect waves-red red-text btn-flat">DESCARTAR</a>
                <a id="editarModulo_AceptarButton" class="waves-effect waves-green blue-text btn-flat">ACEPTAR</a>
            </div>
        </div>

        <!-- MOSTRAR MODULOS -->
        <div id="modalMostrarModulos" class="modal bottom-sheet modal-fixed-footer">
            <div class="modal-content" style="padding-bottom:0px">
                <h5 id="modalMostrarModulos_title"></h5>
                <div id="modalMostrarModulos_content" class="row"></div>
            </div>

            <div class="modal-footer">
                <a class="btn-flat grey-text lighten-1" ondragover='dragover(event)' ondrop="drop(event)" style="cursor:default"><i id="modalMostrarModulo_delete" class="material-icons">delete_forever</i></a>
                <!-- <a id="modalMostrarModulo_delete" class="waves-effect waves-red btn-flat red-text" ondragover='allowDrop(event)' ondrop="drop(event)"><i class="material-icons">delete_forever</i></a> -->
                <a class="modal-close waves-effect waves-red btn-flat red-text">Cerrar</a>
            </div>
        </div>

        <!-- CAMBIAR FECHA Y HORA ACTUALIZACION GRID -->
        <div id="modalEditarFechaGrid" class="modal" style="min-height:auto">
            <div id="modal_contentID" class="modal-content center-align">
                <h6>CAMBIAR FECHA ACTUALIZACIÓN</h6>
                <br><br>
                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <!-- <input id="agregarModulo_nombreInput" type="text" class="autocomplete" style="text-transform: uppercase"> -->
                        <input id="editarFecha_fechaInput" type="text" class="datepicker" style="display:''"></input>
                        <label for="editarFecha_fechaInput">FECHA</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <!-- <textarea id="agregarModulo_descripcionInput" class="materialize-textarea" data-length="250"></textarea> -->
                        <input id="editarHora_horaInput" type="text" class="timepicker" style="display:''"></input>
                        <label for="editarHora_horaInput">HORA</label>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
            <!-- onclick="bloquearModalMostrarModulos(0)" -->
                <a id="editarFecha_DescartarButton" class="modal-close waves-effect waves-red red-text btn-flat">DESCARTAR</a>
                <a id="editarFecha_AceptarButton" class="waves-effect waves-green blue-text btn-flat">ACEPTAR</a>
            </div>
        </div>

        <!-- VCAMBIAR FECHA CREACION GRID -->
        <input id="editarFechaGrid_CreacionInput" type="text" class="datepicker" style="display:none"></input>
    </body>
    <script>
        var DataGrid=[];//grid datos del grid
        var dataListado=[];//grid datos del servidor, usado en el filtro
        var filtros=[];//grid busqueda de datos
        var db={};//grid
        var gridInstance;//grid objecto para acceder a valor y funciones del objecto grid
        var ultimoNumeroGrid=0;//grid contador para la numeracion del grid y usado en eliminacion

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
                $("#editarFechaGrid_CreacionInput")[0]["dataCustom"] = data;
                this._inputDate = $("<input>").attr({id:"grid_fechaCreacion_"+data.PK,onClick:"gridFechaEditarProyecto(this)",type:"text",value:fecha,style:"margin:-5px;width:145px"});
                // grid_fechaActualizacion_
                // $('.datepicker').datepicker({format:"yyyy-mm-dd"});
                return this._inputDate;
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

        var MyDateTimeField = function(config)
        {
            jsGrid.Field.call(this, config);
        };
 
        MyDateTimeField.prototype = new jsGrid.Field//campo personalizado para el grid, formato de fecha y hora en modal externo
        ({
            css: "date-field",
            align: "center",
            sorter: function(date1, date2)
            {},
            itemTemplate: function(value)
            {
                // console.log("AA",value);
                return getFechaFormatoH(value);
            },
            insertTemplate: function(value)
            {},
            editTemplate: function(value,data)
            {
                // console.log("AA",data);
                let time = data.actualizacion.split(" ");
                fecha="0000-00-00 00:00:00";
                if(value!=fecha)
                {
                        fecha=value;
                }
                $("#editarFecha_fechaInput").val(time[0]);
                $("#editarHora_horaInput").val(time[1]);
                $("#modalEditarFechaGrid")[0]["dataCustom"] = data;
                return this._inputDate = $("<input>").attr({id:"grid_fechaActualizacion_"+data.PK,value:value,type:"text",class:"modal-trigger",href:"#modalEditarFechaGrid"})
            },
            insertValue: function()
            {},
            editValue: function()
            {
                value = this._inputDate[0].value;
                if(value=="")
                        return "0000-00-00";
                else
                        return $(this._inputDate).val();
            }
        });

        var customsFieldsGridData=[//lista para guardar los campos personalizados del grid
            {field:"customControl",my_field:MyCControlField},//campo por defecto para las opciones de edicion y eliminacion
            {field:"date",my_field:MyDateField},
            {field:"dateTime",my_field:MyDateTimeField},
        ];//grid

        estructuraGrid = [//estructura que llevara la visualizacion del grid
            { name: "PK",visible:false},
            { name: "no", title:"N°", type: "text", width: 60, editing:false},
            { name: "nombre", title:"Nombre Proyecto", type: "text", width: 160},
            { name: "descripcion", title:"Descripción", type: "text", width: 180},
            { name: "creacion",title:"Fecha Creación", type:"date", width:170,},
            { name: "actualizacion", title:"Fecha Actualización", type: "dateTime", width: 170},
            { name: "modulos", title:"Modulos", type: "text", width: 80, editing:false},
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
            // $("#modalEditarFechaGrid.modal").modal({dismissible:false,options:{
            //     onOpenEnd:()=>{
            //         alert("A");
            //         $("#editarHora_horaInput").focus();
            //         $("#editarFecha_fechaInput").focus();
            //     }
            // }});
            // $('.tooltipped').tooltip();
        //     $('.collapsible').collapsible();

            $('.timepicker').timepicker({twelveHour:false});//inicializacion del objecto de modal de seleccion de hora de materialize
            
            $('.datepicker').datepicker({format:"yyyy-mm-dd",i18n:{cancel:"DESCARTAR",months:monthsLarge,monthsShort:months,weekdays:weekdays,weekdaysAbbrev:weekdaysAbrev,weekdaysShort:weekdaysCorto} });//inicializacion del objecto de modal de seleccion de fechas de materialize
            
            $('textarea').characterCounter();//inicializacion para la etiqueta de textarea para contador de caracteres sobre el campo
        });

        // var navegacionCrumb = $(window.parent)[0].getElement_navegacionCrumb();
        // var divIframe = $(window.parent)[0].getDivIframe();
        // var instanceTooltip;//version plus

        $(()=>{

            $("#agregarProyectoInput").on("click",()=>{//funcion para comprobar si los campos no estan vacios antes de agregar un proyecto
                let bandera = 1;
                let mensajeError = "";
                let datosProyecto = new Object();

                datosProyecto["nombre"] = $("#nombreProyectoInput");
                datosProyecto["descripcion"] = $("#descripcionProyectoInput");
                datosProyecto["fecha"] = $("#fechaProyectoInput");
            
                $.each(datosProyecto,(index,value)=>{
                    if(value.val()=="")
                    {
                        bandera = 0;
                        mensajeError += "*"+value[0].labels[0].innerHTML+"\n";
                    }
                });
                bandera==0?
                    growlError("Campos Requeridos",mensajeError):agregarProyecto(datosProyecto);
            });

            $("#fechaProyectoInput").on("focus",()=>{//funcion ejecutada al ganar el foco el campo de fecha en el modal de agregar proyecto
                $("#fechaProyectoInput").click();//abre el modal de seleccion de fecha
            });

            $("#agregarModulo_nombreInput , #agregarModulo_descripcionInput").keypress((evt)=>{//funcion cuando se presiona una tecla en los campos del modal agregar modulo ejecuta el codigo...
                if(evt.which == 13)//comprueba si la tecla oprimida sea "ENTER"
                    agregarModuloCheck();
            });

            $("#agregarModulo_AceptarButton").on("click",()=>{
                agregarModuloCheck();
            });

            $("#editarModulo_AceptarButton").on("click",()=>{
                editarModuloCheck();
            });

            $("#editarFecha_AceptarButton").on("click",()=>{
                editarFechaCheck();
            });

            $("#editarFecha_fechaInput").on("focus",()=>{//funcion ejecutada al ganar el foco el campo de fecha en el modal de editar proyecto
                $("#editarFecha_fechaInput").click();//auto click
            });

            $("#editarHora_horaInput").keyup((evt)=>{//funcion ejecutada al presionar una tecla en el campo de hora en el modal de editar proyecto
                $("#editarHora_horaInput").click();//auto click
            });

            $("#editarFechaGrid_CreacionInput").change(()=>{//funcion que al cambiar el valor del campo intermediario para el valor de fecha creacion del grid
                let data = $("#editarFechaGrid_CreacionInput")[0]["dataCustom"];
                $("#grid_fechaCreacion_"+data.PK).val( $("#editarFechaGrid_CreacionInput").val() );

            });

            // $("#editarFecha_AceptarButton").on("click",()=>{
                
            // });

            // $('#modalEditarFechaGrid.timepicker').timepicker('open',()=>{
            //     alert("A");
            //     $("#editarHora_horaInput").focus();
            //     $("#editarFecha_fechaInput").focus();
            //     $("#editarFecha_fechaInput").focusout();
            // });

            // $("#modalEditarFechaGrid").on("open",()=>{
            //     alert("A");
            //     $("#editarHora_horaInput").focus();
            //     $("#editarFecha_fechaInput").focus();
            //     $("#editarFecha_fechaInput").focusout();
            // });
            


            // $("#getFechaInput").on()

            // $("#modalMostrarModulo_delete").on("focus",()=>{
            //     alert("s");
            //     $("i").css("font-size","20px");
            // });
            

            // $("div.col.s4.m3.l2.xl2").on("click",(obj)=>{
            //     alert("");
            //     console.log(obj);
            // });
            // $(navegacionCrumb).on("click",()=>{
                // s

            // });
            // $(navegacionCrumb).on("click",(obj)=>{
            //     let element = obj.target.html;
            //     console.log(obj);
            //     if(element == "Proyectos")
            //         window.history.go(-1);
            // });
        });

        // $(navegacionCrumb).html("<a onclick='abrirProyectos()' class='breadcrumb'>Proyectos</a>");

        // var cardAgregarProyecto = '<div class="col s4 m3 l2 xl2">';
        // cardAgregarProyecto += '<div style="width:100%" href="#modal1" class="waves-effect waves-omg card hoverable modal-trigger" draggable="true" style="cursor:pointer">';
        // cardAgregarProyecto += '<div class="card-image center-align flow-text">';
        // cardAgregarProyecto += '<a><i class="material-icons blue-text">create_new_folder</i></a></div>';
        // cardAgregarProyecto += '<div class="card-action">';
        // cardAgregarProyecto += '<h6 class="blue-text truncate">AGREGAR PROYECTO</h6></div></div></div>';


        // drag and drop
        var select = -1;//id del elemento seleccionado
        var style_modalMostrarModulo_delete;//estilo origial del elemento selecionado
        allowDrop = (ev,id)=>//al seleccionar para mover el elemento
        {
            if(select == -1)
            {
                style_modalMostrarModulo_delete = $("#modalMostrarModulo_delete").css("font-size");
                select = id;
            }
            $("#modalMostrarModulo_delete").css("font-size","35px");
            $("#modalMostrarModulo_delete").css("color","red");
        }

        dragover = (ev)=>//al mover el elemento
        {
            ev.preventDefault();
        }

        drag = (ev)=>//al soltar el elemento
        {
            select = -1;
            $("#modalMostrarModulo_delete").css("font-size",style_modalMostrarModulo_delete);
            $("#modalMostrarModulo_delete").css("color","");
        }

        drop = (ev)=>//al soltar el elemento sobre un elemento especifico
        {
            ev.preventDefault();
            $("#cardModulo_"+select)[0]["eliminarFnCustom"][0](select);
        }


    </script>
</html>