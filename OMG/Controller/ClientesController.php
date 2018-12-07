<?php
session_start();
require_once '../Model/ClienteModel.php';
require_once '../util/Session.php';


$Op=$_REQUEST["Op"];
$model = new ClienteModel();

switch ($Op) {
	case 'ListarClientes':
        $Lista=$model->listarClientes();
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($Lista);
    break;

    default: echo -1; break;
    }
?>