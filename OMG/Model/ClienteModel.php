<?php
require_once '../dao/ClienteDAO.php';
require_once '../Pojo/dataBasePojo.php';

class ClienteModel{
    public function listarClientes()
    {
        try{
            $dao = new ClienteDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $rec = $dao->listarClientes($baseAdmin);
            // foreach($rec as $key=>$value)
            // {
            //     $rec[$key]["modulos"] = $dao->getModulos($baseAdmin,$value["pk"]);
            // }
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }
}
?>