<?php
session_start();
require_once '../Model/ClienteModel.php';
require_once '../Model/ProyectoModel.php';
require_once '../util/Session.php';


$Op=$_REQUEST["Op"];
$model = new ClienteModel();
$modelProyectos = new ProyectoModel();

switch ($Op) {
	case 'ListarClientes':
        $Lista=$model->listarClientes();
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($Lista);
    break;

    case 'AgregarCliente':
        header('Content-type: application/json; charset=utf-8');
        $DATOS = json_decode($_REQUEST["DATA"],true);
        $Lista = $model->agregarCLiente($DATOS);
        echo json_encode($Lista);
    break;

    case 'EditarCliente':
        header('Content-type: application/json; charset=utf-8');
        $datos = json_decode($_REQUEST["datos"],true);
        $Lista = $model->editarCliente($datos);
        if($Lista >= 0)
        {
            $Lista = $model->listarCliente($datos["PK"]);
        }
        echo json_encode($Lista);
    break;

    case 'ListarProyectosPermisos':
        $Lista = $modelProyectos->listarProyectos();
        $ProyectosC = $model->listarClienteProyectos($_REQUEST["PK_CLIENTE"]);
        $ModulosC = $model->listarClienteModulos($_REQUEST["PK_CLIENTE"]);
        foreach($ProyectosC as $key => $value)
        {
            foreach($Lista as $k => $v)
            {
                if($value["pk_proyecto"] == $v["pk"])
                {
                    $Lista[$k]["user"] = $value["user"];
                    $Lista[$k]["server"] = $value["server"];
                    $Lista[$k]["pass"] = $value["pass"];
                    $Lista[$k]["db"] = $value["db"];
                    $Lista[$k]["fecha_inicio"] = $value["fecha_inicio"];
                    $Lista[$k]["fecha_termino"] = $value["fecha_termino"];
                }
                foreach($ModulosC as $k => $v)
                {
                    foreach($v["modulos"] as $index => $val)
                    {
                        if($val["pk"] == $v["fk_modulo"])
                            $Lista[$k]["modulos"][$index]["permiso"] = $v["permiso"];
                    }
                }
            }
        }
        header('Content-type: application/json; charset=utf-8');
        echo json_encode( $Lista);
    break;
        
    case 'AgregarProyectoAlCliente':
        header('Content-type: application/json; charset=utf-8');
        $DATA = json_decode($_REQUEST["DATA"],true);
        $exito = $model->agregarProyectoAlCliente($DATA,$_REQUEST["PK_PROYECTO"],$_REQUEST["PK_CLIENTE"]);
        // var_dump($DATA);
        echo $exito;
    break;

    // case 'ListarClienteProyectosAdquiridos':
    //     header('Content-type: application/json; charset=utf-8');
    //     $PK = $_REQUEST["PK_CLIENTE"];
    //     $lista = $model->listarClienteProyectosAdquiridos($PK);
    //     echo json_encode($lista);
    // break;

    default: echo -1; break;
    }
?>