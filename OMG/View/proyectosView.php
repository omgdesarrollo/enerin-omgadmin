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
        <div class="row">
            <div class="col s4 m3 l2 xl2">
                <div class="card hoverable" draggable="true">
                    <div class="card-image center-align flow-text">
                        <a class="waves-effect waves-omg"><i class="material-icons blue-text" >image</i></a>
                        <!-- <span><img src="nohay.jpg"></img></span> -->
                    </div>
                    <!-- <div class="card-content">
                        <p>OMG-CUM</p>
                    </div> -->
                    <div class="card-action">
                        <h6 class="green-text accent-4 truncate lowered">OMG-APP</h6>
                    </div>
                </div>
            </div>

            <div class="col s4 m3 l2 xl2">
                <div class="card hoverable" draggable="true">
                    <div class="card-image center-align flow-text">
                        <a class="waves-effect waves-omg"><i class="material-icons blue-text">image</i></a>
                    <!-- <i class="material-icons blue-text">supervisor_account</i> -->
                        <!-- <span class="card-title">Card Title</span> -->
                    </div>
                    <!-- <div class="card-content">
                        <p>OMG-CUM</p>
                    </div> -->
                    <div class="card-action">
                        <h6 class="green-text accent-4 truncate">OMG-APP ADMIN</h6>
                    </div>
                </div>
            </div>

            <div class="col s4 m3 l2 xl2">
                <div class="card hoverable" draggable="true">
                    <div class="card-image center-align flow-text">
                        <a class="waves-effect waves-omg"><i class="material-icons blue-text">create_new_folder</i></a>
                    <!-- <i class="material-icons blue-text">supervisor_account</i> -->
                        <!-- <span class="card-title">Card Title</span> -->
                    </div>
                    <!-- <div class="card-content">
                        <p>OMG-CUM</p>
                    </div> -->
                    <div class="card-action">
                        <h6 class="blue-text truncate">AGREGAR PROYECTO</h6>
                    </div>
                </div>
            </div>

        </div>
    </body>
    <script>
        // $(document).ready(function(){
        //     $('.collapsible').collapsible();
        // });

    </script>
</html>