<?php
session_start();
require_once '../Model/EmpleadoModel.php';
require_once '../util/Session.php';


$Op=$_REQUEST["Op"];
$model = new EmpleadoModel();

switch ($Op) {
	case 'Listar':
        $Lista = $model->listarEmpleados();
        header('Content-type: application/json; charset=utf-8');
        echo json_encode( $Lista);
    break;

    case 'AgregarEmpleado':
        header('Content-type: application/json; charset=utf-8');
        $datos = json_decode($_REQUEST["datos"],true);
        $Lista = $model->agregarEmpleado($datos);
        echo json_encode( $Lista );
    break;

    case 'EliminarEmpleado':
        // header('Content-type: application/json; charset=utf-8');
        $PK = json_decode($_REQUEST["PK"],true);
        $exito = $model->eliminarEmpleado($PK);
        echo json_encode( $exito );
    break;

    case 'AgregarUsuario':
        header('Content-type: application/json; charset=utf-8');
        $datos = json_decode($_REQUEST["datos"],true);
        $exito = $model->agregarUsuario($datos);
        echo json_encode( $exito );
    break;

    case "EditarEmpleado":
        header('Content-type: application/json; charset=utf-8');
        $datos = json_decode($_REQUEST["datos"],true);
        $Lista = $model->editarEmpleado($datos);
        if($Lista >= 0)
        {
            $Lista = $model->listarEmpleado($datos["PK"]);
        }
        echo json_encode( $Lista );
    break;

    default: echo -1; break;
}