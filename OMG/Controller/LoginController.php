<?php
//este controlador solo atiende un requerimiento
//el requerimiento que atiende es el de inicio de sesion

    session_start();
    require_once '../Model/LoginModel.php';
    require_once '../util/Session.php';
    try{
        header('Content-type: application/json; charset=utf-8');

        $usuario = $_REQUEST["usuario"];
        $contrasena = $_REQUEST["contrasena"];

        $model = new LoginModel();

        $user = $model->validar($usuario,$contrasena);
        if($user != -1)
            Session::setSesion("usuarioOMG_ADMIN", $user);
        echo json_encode($user);
        // echo $user;
    }catch(Exception $er)
    {
        throw $er;
        echo $er;
    }
?>