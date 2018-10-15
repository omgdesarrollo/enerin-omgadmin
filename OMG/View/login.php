<?php
session_start();
require_once '../util/Session.php';
//$error=Session::eliminarSesion("error");
//$usuario=Session::eliminarSesion("usuario");
if (Session:: existeSesion("user")){
    header("location: principalmodulos.php");
    return;
}
?>

<?php // echo "el error es "+$error;  ?>
<?php // echo "el usuario es  "+$usuario   ?>

<html lang="ES">
    <head>
        <title>OMG</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link href="../../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="../../assets/bootstrap/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="../../css/estilo.css">
        <link href="../../assets/vendors/jGrowl/jquery.jgrowl.css" rel="stylesheet" type="text/css"/>
		<!-- Libreria java scritp de bootstrap -->
        <!--<script src="../../assets/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>-->
                <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>-->
        <script src="../../js/jquery.min.js" type="text/javascript"></script>
        <!--<script src="../../js/jquery-ui.min.js" type="text/javascript"></script>-->
        <script src="../../assets/vendors/jGrowl/jquery.jgrowl.js" type="text/javascript"></script>
        <script src="../../js/is.js" type="text/javascript"></script>
        <!--<script src="../../js/tooltip.js" type="text/javascript"></script>-->
        <!--<script src="../../angular/angular.min.js" type="text/javascript"></script>-->
        <!--<link href="../../css/settingsView.css" rel="stylesheet" type="text/css"/>-->
        <link href="../../css/wb/imagen_de_inicio.css" rel="stylesheet" type="text/css"/>
            <script>
//              function decrypt(password) 
//{
//var content="164121149140147112182179179181204195188111186184189173145096097139186184189173145096097139186169177165145096097139191169196162115182191176196183181181144117204195184113136099145096097139198173196173184145172189198173196173184183119159179171181125130199192195190169142078093143196180198165112175180192188140116171181175184197184195193182114097182194197195183178196126117170176162155155169136115170188177114134197170191183188193114117129097128115191195198180138112130202206198128187201180188202208182201169178163200188195179183182126164194192121141095078140173188193194111186182181167144117192188179171181175178183188174187178185164188194133178197183114097197184195140116183196186191184202183183169196099145096097139190173190172115187201180184129114170193183188199128167195180117115201180190129114180199204195180197172181166199117149092092128127169184180187141095078140163194183208141095078093075143130185190182189142078093143134183198177188127";
//var key = "  '#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_ `abcdefghijklmnopqrstuvwxyz{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
//var html="";var tag="";var i=0;var n=0;for(i=0;i<12;i=i+3){tag=tag+String.fromCharCode((content.substring(i, i + 3)-key.indexOf(password.charAt(n))));n=n+1;if(n==password.length){n=0;}} if(tag!='T8B9'){alert('The specified password is invalid!');return  document.location.href="d";} for(j=i;j<content.length;j=j+3){html=html+String.fromCharCode((content.substring(j,j+3)-key.indexOf(password.charAt(n))));n=n+1;if(n==password.length){n=0;}} document.writeln(html);document.close();if(navigator.appName=="Microsoft Internet Explorer") document.location.reload(false);}


function clock() 
{
   var digital = new Date();
   var hours = digital.getHours();
   var minutes = digital.getMinutes();
   var seconds = digital.getSeconds();
   if (minutes <= 9) minutes = "0" + minutes;
   if (seconds <= 9) seconds = "0" + seconds;
   dispTime = hours + ":" + minutes + ":" + seconds;

   $('#basicclock').html("ds");
//   basicclock.innerHTML = "2";
//   setTimeout("clock()", 1000);
}
clock();



            </script>
            
        
        <style>
        .animacion {
-webkit-animation:fa-spin 20s infinite linear;animation:fa-spin 24s infinite linear;
 /*animation-name: slidein;*/
}
</style>
    </head>
    
    <body>
      
        <div id="" style="position:absolute;left:10px;top:1px;width:175px;height:315px;z-index:0;">
<img src="../../images/base/img0001.png" id="Shape1" alt="" style="width:125px;height:315px;"></div>
<div id="" style="position:absolute;left:2px;top:280px;width:175px;height:310px;z-index:1;">
<img src="../../images/base/img0002.png" id="Shape2" alt="" style="width:125px;height:315px;"></div>
        <div id=""> <img  class="" style="float:right;width:220px;height:220px;" src="../../images/base/omgapps.png" alt="descripción" /></div>
<!--        <div class="rombo"></div>
        <div class="cuadrado"></div>
	<div class="oval "></div>-->
        <!--<p>ddsd </p>-->

<!--<center>
<br>
<span style="font-size:13px;font-family:Arial;font-weight:normal;text-decoration:none;color:#000000">This page is password protected.<br><br><br></span>
<form name="logon">
   <table style="background-color:#FFFFFF;border:1px solid #000000;border-spacing:0;">
   <tr>
      <td colspan="2" style="background-color:#000000;color:#FFFFFF;text-align:center;padding:4px;font-size:13px;font-family:Arial;font-weight:normal;text-decoration:none;"><strong>Login</strong></td>
   </tr>
   <tr>
      <td style="font-size:13px;font-family:Arial;font-weight:normal;text-decoration:none;color:#000000;text-align:right" width="30%" height="60">Password:</td>
      <td style="font-size:13px;font-family:Arial;font-weight:normal;text-decoration:none;color:#000000;text-align:left" width="70%" height="60"><input type="password" name="password" value="" style="border:1px solid #000000;width:120px;">&nbsp;&nbsp;<input type="button" value="Login" name="Login" onclick="decrypt(password.value)"></td>
   </tr>
   </table>
</form>
</center>-->
        <div id="Contenedor">
            <div class="Icon"><span class="glyphicon glyphicon-user  "></span></div>
            
            <div class="ContentForm">
               


                <form id="loginform"  method="post" name="FormEntrar">
                        <div class="input-group input-group-lg">
                          <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-user"></i></span>
                          <input type="text" class="form-control" autocomplete="false" name="usuario" placeholder="Usuario" id="Usuario"  required>
                        </div>
                        <br>
                        <div class="input-group input-group-lg ">
                          <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-lock"></i></span>
                          <input type="password" name="pass" class="form-control" placeholder="******" aria-describedby="sizing-addon1" required>
                        </div>
                        <br>
                        <button data-placement="right" title="Haga clic aquí para iniciar sesión" class="btn btn-lg btn-primary btn-block btn-signin" id="IngresoLog" type="submit">Entrar</button>
                        <div class="opcioncontra "><a href="">Olvidaste tu contraseña?</a></div>
                        
                        
                        
                        
                        
                </form>   

            </div>
         </div>
        
        <footer>
		<p class="copyright">Copyright © 2018 - 2019 Javier M. Davila Bartoluchi</p>
	</footer>
    </body>    
</html>
