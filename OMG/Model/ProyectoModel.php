<?php
require_once '../dao/ProyectoDAO.php';
require_once '../Pojo/dataBasePojo.php';

class ProyectoModel{
    public function listarProyectos()
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $rec = $dao->listarProyectos($baseAdmin);
            foreach($rec as $key=>$value)
            {
                $rec[$key]["modulos"] = $dao->getModulos($baseAdmin,$value["pk"]);
            }
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function listarProyecto($PK)
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $lista = array();
            $baseAdmin = $pojo->getconfigBase();

            $rec = $dao->listarProyecto($baseAdmin,$PK);
            foreach($rec as $key=>$value)
            {
                $rec[$key]["modulos"] = $dao->getModulos($baseAdmin,$value["pk"]);
            }
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function agregarProyecto($datos)
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $rec = $dao->agregarProyecto($baseAdmin,$datos["nombre"],$datos["descripcion"],$datos["fecha"]);
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function agregarModulo($datos)
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();
            // var_dump($datos);
            $rec = $dao->agregarModulo($baseAdmin,$datos["nombre"],$datos["descripcion"],$datos["fk_proyecto"]);
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function listarModulo($PK)
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $lista = array();
            $baseAdmin = $pojo->getconfigBase();

            $lista = $dao->listarModulo($baseAdmin,$PK);
            return $lista;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function eliminarModulo($PK)
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $exito = $dao->eliminarModulo($baseAdmin,$PK);
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function editarModulo($datos)
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $exito = $dao->editarModulo($baseAdmin,$datos["pk"],$datos["nombre"],$datos["descripcion"]);
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function editarProyecto($datos)
    {
        try{
            $dao = new ProyectoDAO();
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
                    $query = "UPDATE proyecto SET ";
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
            $exito = $dao->editarProyecto($baseAdmin,$query);
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function eliminarProyecto($PK)
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $exito = $dao->eliminarProyecto($baseAdmin,$PK);
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }
    
}

?>