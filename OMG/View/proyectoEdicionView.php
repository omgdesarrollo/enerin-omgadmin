<!DOCTYPE html>
<?php
    var_dump($_REQUEST["data"]);
?>
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

        <style></style>
    </head>
    <body>
        Nueva Edicion
    </body>
    <script>
        var navegacionCrumb = $(window.parent)[0].getElement_navegacionCrumb();
        var divIframe = $(window.parent)[0].getDivIframe();
        var history = window.history;
        $(navegacionCrumb).append('<a onclick="backHistory('+history+','+-1+')" class="breadcrumb">Edicion</a>');

    </script>
</html>