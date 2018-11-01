<?php
require_once '../dao/EmpleadoDAO.php';
require_once '../Pojo/dataBasePojo.php';

class EmpleadoModel{
    public function listarEmpleados()
    {
        try{
            $dao = new EmpleadoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $rec = $dao->listarEmpleados($baseAdmin);
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function listarEmpleado($PK)
    {
        try{
            $dao = new EmpleadoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $rec = $dao->listarEmpleado($baseAdmin,$PK);
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function agregarEmpleado($datos)
    {
        try{
            $dao = new EmpleadoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $exito = $dao->agregarEmpleado($baseAdmin,$datos["nombre"],$datos["apellidos"],$datos["email"]);
            if($exito>=0)
            {
                $exito = $dao->listarEmpleado($baseAdmin,$exito);
            }
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function eliminarEmpleado($PK)
    {
        try{
            $dao = new EmpleadoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $exito = $dao->eliminarEmpleado($baseAdmin,$PK);
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function agregarUsuario($datos)
    {
        try{
            $dao = new EmpleadoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $exito = $dao->agregarUsuario($baseAdmin,$datos["usuario"],$datos["contra"]);
            if($exito>=0)
            {
                $exito = $dao->actualizarUsuarioEmpleado($baseAdmin,$exito,$datos["pk"]);
                $exito = $dao->listarEmpleado($baseAdmin,$datos["pk"]);
            }
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function editarEmpleado($datos)
    {
        try{
            $dao = new EmpleadoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();
            $query = "";
            $size = sizeof($datos)-1;
            $bandera=1;
            // echo $size;
            // var_dump($datos);
            foreach($datos as $key=>$value)
            {
                if($query=="")
                {
                    $query = "UPDATE empleado SET ";
                }else
                {
                    if($size==$bandera)
                        $query .= ", ";
                }
                if($key != "PK")
                    $query .= " $key = '$value'";
                $bandera++;
            }
            $query .= " WHERE PK = ".$datos["PK"];
            // echo $query;
            $exito = $dao->editarEmpleado($baseAdmin,$query);
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }
}