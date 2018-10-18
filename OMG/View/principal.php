<?php
    session_start();
    require_once '../util/Session.php';
    // require_once 'rutasArchivos.php';
    //$error=Session::eliminarSesion("error");
    //$usuario=Session::eliminarSesion("usuario");
    if (!Session:: existeSesion("usuarioOMG_ADMIN"))
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

        <link href="../../assets/googleApi/icon.css" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="../../assets/materialize/css/materialize.min.css"  media="screen,projection"/>
        <script type="text/javascript" src="../../assets/materialize/js/materialize.min.js"></script>


        <link href="../../assets/vendors/jGrowl/jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
        <script src="../../assets/vendors/jGrowl/jquery.jgrowl.js" type="text/javascript"></script>

        <script src="../../js/is.js" type="text/javascript"></script>

        <style>
            .sidenav .divider
            {
                margin:0px !important;
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
            /* iframe
            {
                min-height:100%;
                width:100%;
                border:none;
            }
            .divIframe
            {
                width:100%;
                height:680px;
                padding:0px;
                -webkit-box-shadow : 0px 11px 30px -5px rgba(0,0,0,0.4);
                -moz-box-shadow : 0px 11px 30px -5px rgba(0,0,0,0.4);
                box-shadow : 0px 11px 30px -5px rgba(0,0,0,0.4);
            }
            .divMenu
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
    <!-- <div class="row">
        <div class="col s12">
            <ul id="" class="tabs">
                <li class="tab col s3"><a href="#test-swipe-1"><i class="material-icons blue-text">work</i><br> PROYECTOS</a></li>
                <li class="tab col s3"><a class="active" href="#test-swipe-2">Test 2</a></li>
                <li class="tab col s3"><a href="#test-swipe-3">Test 3</a></li>
            </ul>
        <div/>

        <div id="test-swipe-1" class="col s12 blue">Test 1</div>
        <div id="test-swipe-2" class="col s12 red">Test 2</div>
        <div id="test-swipe-3" class="col s12 green">Test 3</div>
    </div> -->
    <div class="navbar-fixed">
        <nav class="navbar white">
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo grey-text text-darken-4">Home</a>
                <ul id="nav-mobile" class="right">
                    <li>
                        <a class="waves-effect waves-omg flow-text" href="#!"><i class="material-icons blue-text">exit_to_app</i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <ul id="sidenav-left" class="sidenav sidenav-fixed">
        <li><a class="logo-container">ADMINISTRACIÓN<i class="material-icons blue-text">flash_on</i></a></li>
        <li>
            <a class="waves-effect waves-omg flow-text" href="#!"><i class="material-icons blue-text">work</i>Proyectos<i class="material-icons right">send</i></a>
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
        </div>
        <div class="col s12 m12 l10 xl10">
            <!-- <nav> -->
                <a href="#slide-out" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <!-- </nav> -->
    <!-- <div class="container"> -->
    
        </div></div>
    </body>
    <script>
        // $(document).ready(function(){
        //     $('.tabs').tabs();
        // });

        $(document).ready(function(){
            $('.sidenav').sidenav();
        });

        $(()=>{
            $(".btn-menu").click((t)=>{
                $(".btn-menu").css("background","transparent");
                $(t.currentTarget).css("background","burlywood");
            });
        });
    </script>
</html>