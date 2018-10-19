<?php
session_start();
require_once '../Model/ProyectoModel.php';
require_once '../util/Session.php';


$Op=$_REQUEST["Op"];
$model = new ProyectoModel();

switch ($Op) {
	case 'ListarProyectos':
        $Lista=$model->listarProyectos();
        header('Content-type: application/json; charset=utf-8');
        echo json_encode( $Lista);
    break;
    
    default: echo -1; break;
    }