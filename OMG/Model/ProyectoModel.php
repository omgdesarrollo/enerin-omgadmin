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
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }
}

?>