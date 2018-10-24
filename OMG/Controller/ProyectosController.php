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

    case "AgregarProyecto":
        header('Content-type: application/json; charset=utf-8');
        $datos = json_decode($_REQUEST["datos"],true);
        $PK = $model->agregarProyecto($datos);
        if($PK >= 0)
        {
            $Lista = $model->listarProyecto($PK);
            echo json_encode($Lista);
        }
        else
            echo $PK;
    break;

    case "AgregarModulo":
        header('Content-type: application/json; charset=utf-8');
        $datos = json_decode($_REQUEST["datos"],true);
        $PK = $model->agregarModulo($datos);
        if($PK >= 0)
        {
            $Lista = $model->listarModulo($PK);
            echo json_encode($Lista);
        }
        else
            echo $PK;
    break;

    
    default: echo -1; break;
    }