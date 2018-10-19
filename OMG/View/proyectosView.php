<!DOCTYPE html>

<html>
    <head>
        <title>ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <script src="../../js/jquery.min.js" type="text/javascript"></script>

        <link href="../../css/settingsView.css" rel="stylesheet" type="text/css"/>
        <link href="../../assets/vendors/jGrowl/jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
        <script src="../../assets/vendors/jGrowl/jquery.jgrowl.js" type="text/javascript"></script>

        <link href="../../assets/googleApi/icon.css" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="../../assets/materialize/css/materialize.min.css"  media="screen,projection"/>
        <script type="text/javascript" src="../../assets/materialize/js/materialize.min.js"></script>


        <script src="../../js/is.js" type="text/javascript"></script>
        <script src="../../js/principal.js" type="text/javascript"></script>

        <style>
            .collapsible
            {
                /* margin:10px 0 0 10px; */
                border:none;
            }
            .card
            {
                min-height:100px;
                max-height:100px;
            }
            .card-action 
            {
                /* height:40px; */
                padding:0px !important;
                text-align:center;
            }
            h6
            {
                text-transform: uppercase;
            }
            i{
                font-size:-webkit-xxx-large !important;
            }
            .tooltip-content
            {
                text-align:left;
            }
            .prefix.active
            {
                color: #3399cc !important;
            }
            label.active
            {
                color: #3399cc !important;
            }
            /* @media only screen and (min-width:1200px){
                a
                {
                    font-size:16px;
                }
            } */
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
        <div id="proyectoListado" class="row"></div>
        
        <!-- Modal Structure agregar Proyecto-->
        <div id="modal1" class="modal">
            <div class="modal-content">
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

    </body>
    <script>
        $(document).ready(function(){
            // $('.tooltipped').tooltip();
        //     $('.collapsible').collapsible();
            $('.modal').modal();
            $('.datepicker').datepicker();
            $('textarea').characterCounter();
        });

        var navegacionCrumb = $(window.parent)[0].getElement_navegacionCrumb();
        var divIframe = $(window.parent)[0].getDivIframe();

        $(()=>{
            $("#agregarProyectoInput").on("click",()=>{
                let nombre = $("#nombreProyectoInput").val();
                let descripcion = $("#descripcionProyectoInput").val();
                let fecha = $("#fechaProyectoInput").val();
                agregarProyecto();
            });
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

        $(navegacionCrumb).html("<a onclick='abrirProyectos()' class='breadcrumb'>Proyectos</a>");

        var cardAgregarProyecto = '<div class="col s4 m3 l2 xl2">';
        cardAgregarProyecto += '<div style="width:100%" href="#modal1" class="waves-effect waves-omg card hoverable modal-trigger" draggable="true" style="cursor:pointer">';
        cardAgregarProyecto += '<div class="card-image center-align flow-text">';
        cardAgregarProyecto += '<a><i class="material-icons blue-text">create_new_folder</i></a></div>';
        cardAgregarProyecto += '<div class="card-action">';
        cardAgregarProyecto += '<h6 class="blue-text truncate">AGREGAR PROYECTO</h6></div></div></div>';

        listarProyectos = () =>
        {
            return new Promise((resolve,reject)=>
            {
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
                            let tempData="";
                            if(data.length !=0)
                            {
                                growlSuccess("Datos Obtenidos","Proyectos");
                            }
                            else
                                growlSuccess("Sin Datos","Proyectos");
                            $.each(data,(index,value)=>{
                                tempData += construirProyectos(value);
                            });
                            $("#proyectoListado").html(tempData+cardAgregarProyecto);
                            $('.tooltipped').tooltip();

                        }
                        else
                            growlError("Error Obtener Datos","Proyectos");
                    },
                    error:()=>
                    {
                        growlError("Error","Error en el servidor");                        
                    }
                })
            });
        }
        listarProyectos();

        construirProyectos = (value)=>
        {
            let tempData="";
            tempData = '<div class="col s4 m3 l2 xl2">';
            tempData += "<div style='width:100%' ondblclick='abrirEdicionProyecto("+JSON.stringify(value)+")'" +'class="card sticky-action hoverable tooltipped" data-tooltip="Creado: '+value.creacion+'<br>Responsable: X<br>Actualización: '+value.actualizacion+'" draggable="true">';
            tempData += '<div class="card-image center-align flow-text">';
            tempData += '<a class="waves-effect waves-omg"><i class="material-icons blue-text" >image</i></a></div>';
            tempData += '<div class="card-action">';
            tempData += '<h6 class="green-text accent-4 truncate lowered">'+value.nombre+'</h6></div></div></div>';
            return  tempData;
        }

        abrirEdicionProyecto = (data)=>
        {
            data = JSON.stringify(data);
            $(divIframe).html("<iframe src='proyectoEdicionView.php?data="+data+"'></iframe>");
        }

        agregarProyecto = ()=>
        {
            s
        }

    </script>
</html>