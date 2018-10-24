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

    public function listarProyecto()
    {
        try{
            $dao = new ProyectoDAO();
            $pojo = new dataBasePojo();
            $lista = array();
            $baseAdmin = $pojo->getconfigBase();

            $rec = $dao->listarProyecto($baseAdmin,$PK);
            foreach($rec as $key=>$value)
            {
                $rec[$key]["modulos"] = $dao->getModulos($value["pk"]);
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
}

?>