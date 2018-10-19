<?php
    session_start();
    require_once '../util/Session.php';
    // require_once 'rutasArchivos.php';
    //$error=Session::eliminarSesion("error");
    //$usuario=Session::eliminarSesion("usuario");
    if (!Session::existeSesion("usuarioOMG_ADMIN"))
    {
        header("location: login.php");
        return;
    }
?>
<!DOCTYPE html>

<html>
    <head>
        <title>ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <script src="../../js/jquery.min.js" type="text/javascript"></script>

        <link href="../../assets/vendors/jGrowl/jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
        <script src="../../assets/vendors/jGrowl/jquery.jgrowl.js" type="text/javascript"></script>

        <link href="../../assets/googleApi/icon.css" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="../../assets/materialize/css/materialize.min.css"  media="screen,projection"/>
        <script type="text/javascript" src="../../assets/materialize/js/materialize.min.js"></script>


        <script src="../../js/is.js" type="text/javascript"></script>
        <script src="../../js/principal.js" type="text/javascript"></script>

        <style>
            /* .navbar-fixed
            {
                background: rgba(0,137,235,1);
            } */
            .sidenav .divider
            {
                margin:0px !important;
                /* margin-bottom:10px !important; */
            }
            .waves-effect.waves-omg .waves-ripple
            {
                background-color: #3399cc;
            }
            .blue-text
            {
                color: #3399cc !important;
            }
            .sidenav li>a
            {
                padding: 0 0 0 32px;
            }
            @media only screen and (min-width: 993px)
            {
                body.has-fixed-sidenav
                {
                    padding-left: 300px;
                }
            }
            @media only screen and (min-width: 993px)
            {
                .has-fixed-sidenav .navbar-fixed nav.navbar
                {
                    width: calc(100% - 300px);
                    left: 300px;
                }
            }
            nav.navbar
            {
                padding: 0 20px;
            }
            a.brand-logo
            {
                font-size:18px;
            }
            /* header, main, footer
            {
                padding-left: 300px;
            } */
            /* @media only screen and (min-width : 992px)
            {
                .sidenav.sidanav-fixed
                {
                    transform:translateX(0) !important;
                }
            } */
            /* body {
                flex-direction: column;
                margin: 0;
                margin-bottom: 40px;
                background: #00c4ff26
            } */
            /* .active li
            {
                background: red !important;
                border:1px solid black;
            } */
            iframe
            {
                min-height:100%;
                width:100%;
                border:none;
            }
            #divIframe
            {
                width:100%;
                padding:0px;
                -webkit-box-shadow : 0px 11px 30px -5px rgba(0,0,0,0.4);
                -moz-box-shadow : 0px 11px 30px -5px rgba(0,0,0,0.4);
                box-shadow : 0px 11px 30px -5px rgba(0,0,0,0.4);
            }
            .breadcrumb
            {
                color: #3399cc !important;
                text-decoration:underline;
            }
            .breadcrumb:before
            {
                color: #3399cc !important;
            }
            /* a .breadcrumb
            {
                text-decoration:underline;
            } */
            /* .divMenu
            {
                width:96%;
            }
            .btn-menu
            {
                font-size: xx-large !important;
                background:transparent;
                border-bottom:1px solid;
            }
            .btn-menu:active
            {
                background:burlywood;
            }
            .font-awesome
            {
                font-family:FontAwesome;
            } */
        </style>
    </head>
    <body class="has-fixed-sidenav">
        <div class="navbar-fixed">
            <nav class="navbar white">
                <div class="nav-wrapper">
                <!-- <div class="col s10"> -->
                    <!-- <a href="#!" class="breadcrumb">First</a>
                    <a href="#!" class="breadcrumb">Second</a>
                    <a href="#!" class="breadcrumb">Third</a> -->
                <!-- </div> -->
                    <!-- <a href="#!" class="brand-logo grey-text text-darken-4"><i class="material-icons black-text">account_box</i> -->
                    <!-- php -->
                    <!-- // echo Session::getSesion("usuarioOMG_ADMIN")["usuario"]["nombre"] -->
                    <!-- // ?> -->
                <!-- </a> -->
                        <ul id="nav-mobile" class="right">
                            <li>
                                <a id="cerrarSesion" class="waves-effect waves-omg flow-text" href="#!"><i class="material-icons blue-text">exit_to_app</i></a>
                            </li>
                        </ul>
                        <a data-target="sidenav-left" class="sidenav-trigger left"><i class="material-icons black-text">menu</i></a>
                        <div id="navegacionCrumb"></div>
                </div>
            </nav>
        </div>
        <ul id="sidenav-left" class="sidenav sidenav-fixed">
            <li><a class="logo-container" style="margin:8px;text-decoration:none">ADMINISTRACIÓN<i class="material-icons blue-text">flash_on</i></a></li>
            <li><div class="divider"></div></li>

            <li>
                <a id="fnViewProyectos" class="waves-effect waves-omg " onclick=""><i class="material-icons blue-text">work</i>Proyectos<i class="material-icons right">send</i></a>
            </li>
            <li><div class="divider"></div></li>

            <li>
                <a class="waves-effect waves-omg" href="#!"><i class="material-icons blue-text">supervisor_account</i>Responsables<i class="material-icons right">send</i></a>
            </li>
            <li><div class="divider"></div></li>

            <li>
                <a class="waves-effect waves-omg" href="#!"><i class="material-icons blue-text">people</i>Usuarios<i class="material-icons right">send</i></a>
            </li>
            <li><div class="divider"></div></li>

            <li>
                <a class="waves-effect waves-omg" href="#!"><i class="material-icons blue-text">notifications</i>Notificaciones<i class="material-icons right">send</i></a>
            </li>
            <li><div class="divider"></div></li>

            <li>
                <a class="waves-effect waves-omg" href="#!"><i class="material-icons blue-text">cloud_upload</i>Mejoras<i class="material-icons right">send</i></a>
            </li>
        </ul>
        <div id="divIframe">
        </div>
    </body>
    <script>
        // $(document).ready(function(){
        //     $('.tabs').tabs();
        // });
        var history;
        console.log(window);
        $(document).ready(function(){
            $('.sidenav').sidenav();
            $('.modal').modal();
            windowTam = $(window).height();
            $("#divIframe").css("height",(windowTam-70)+"px")
        });

        $(()=>{            
            // $(".btn-menu").click((t)=>{
            //     $(".btn-menu").css("background","transparent");
            //     $(t.currentTarget).css("background","burlywood");
            // });
        });

        $("#cerrarSesion").on("click",()=>{
            cerrarSesion();
        });

        $("#fnViewProyectos").on("click",()=>{
            abrirProyectos();
        });

        cerrarSesion = ()=>
        {
            window.location = "Logout.php";
            // console.log(window);
        }

        
    </script>
</html>