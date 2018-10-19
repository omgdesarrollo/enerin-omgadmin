<?php

session_start();
require_once '../util/Session.php';
//$error=Session::eliminarSesion("error");
//$usuario=Session::eliminarSesion("usuario");
if (Session:: existeSesion("usuarioOMG_ADMIN")){
    header("location: principal.php");
    return;
}
?>

<?php // echo "el error es "+$error;  ?>
<?php // echo "el usuario es  "+$usuario   ?>

<html lang="ES">
    <head>
        <title>OMG</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <link href="../../assets/googleApi/icon.css" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="../../assets/materialize/css/materialize.min.css"  media="screen,projection"/>
        <script type="text/javascript" src="../../assets/materialize/js/materialize.min.js"></script>

        <script src="../../js/jquery.min.js" type="text/javascript"></script>

        <link href="../../assets/vendors/jGrowl/jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
        <script src="../../assets/vendors/jGrowl/jquery.jgrowl.js" type="text/javascript"></script>

        <script src="../../js/is.js" type="text/javascript"></script>
        <script></script>
        <style>

        .col.s12 > .btn { width:100% }
         .prefix.active
        {
            color: #3399cc !important;
        }
        label.active
        {
            color: #3399cc !important;
        }
        body {
            flex-direction: column;
            margin: 0;
            margin-bottom: 40px;
            background: #00c4ff26
        }
        main {
            flex: 1 0 auto;
        }

        html {
            min-height: 100%;
            position: relative;
        }

        footer {
            background-color: black;
            position: absolute;
            bottom: 0;
            width: 100%;
            height:50px;
            color: white;
            padding-top:0px !important;
        }

        @media only screen and (min-width:100px){
            text-footer{
                font-size:11px;
            }
        }
        @media only screen and (min-width:400px){
            text-footer{
                font-size:13px;
            }
        }
        @media only screen and (min-width:800px){
            text-footer{
                font-size:15px;
            }
        }
        @media only screen and (min-width:1200px){
            text-footer{
                font-size:16px;
            }
        }

        </style>
    </head>
    
    <body>
      
    <div class="container">
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row">
            <div class="col l3 m2 s1"></div>
            <div class="col l6 m8 s10">
                <div class="row center-align">
                    <img src="../../images/base/enerinLogo.png" alt="" class="" style="height:20%">
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <i class="material-icons prefix">person</i>
                        <input id="usuarioInput" type="text" class="autocomplete">
                        <label for="usuarioInput">USUARIO</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 light-blue-text text-darken-3">
                        <i class="material-icons prefix ">vpn_key</i>
                        <input id="contrasenaInput" type="password" class="autocomplete">
                        <label for="contrasenaInput">CONTRASEÑA</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <button id="btn_logearse" class="btn waves-effect waves-light light-blue darken-3" type="submit" name="action">ACCEDER
                            <i class="material-icons right light-blue-text text-darken-3">send</i>
                        </button>
                    </div>
                </div>

            </div>
            <div class="col l3 m2 s1"></div>
        </div>
    </div>

    <footer class="page-footer grey valign-wrapper">
        <div class="container center-align truncate">
            <text-footer class="black-text">
                  Copyright © 2018 - 2019 Javier M. Davila Bartoluchi
            </text-footer>
        </div>      
    </footer>

    </body>    
</html>
