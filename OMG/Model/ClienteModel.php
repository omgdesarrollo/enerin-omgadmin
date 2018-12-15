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

    public function listarCliente($ID_CLIENTE)
    {
        try{
            $dao = new ClienteDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();
            $lista = $dao->listarCliente($baseAdmin,$ID_CLIENTE);
            return $lista;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function agregarCLiente($DATOS)
    {
        try{
            $dao = new ClienteDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $id_lista = $dao->agregarCliente($baseAdmin,$DATOS["nombre_corto"],$DATOS["nombre_completo"],$DATOS["fecha_inicio"],$DATOS["fecha_termino"]);
            if($id_lista>=0)
            {
                $id_lista = $dao->listarCliente($baseAdmin,$id_lista);
            }
            return $id_lista;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function editarCliente($datos)
    {
        try{
            $dao = new ClienteDAO();
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
                    $query = "UPDATE cliente SET ";
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
            $exito = $dao->editarCliente($baseAdmin,$query);
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function listarClienteProyectos($ID_CLIENTE)
    {
        try{
            $dao = new ClienteDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();
            $lista = $dao->listarClienteProyectos($baseAdmin,$ID_CLIENTE);
            return $lista;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function listarClienteModulos($ID_CLIENTE)
    {
        try{
            $dao = new ClienteDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();
            $lista = $dao->listarClienteModulos($baseAdmin,$ID_CLIENTE);
            return $lista;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    public function agregarProyectoAlCliente($DATA,$PK_PROYECTO,$PK_CLIENTE)
    {
        try{
            $dao = new ClienteDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();
            $exito = $dao->agregarProyectoAlCliente($baseAdmin,$DATA["FECHA INICIO"],$DATA["FECHA TERMINO"],$PK_PROYECTO,$PK_CLIENTE);
            return $exito;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }

    // public function listarClienteProyectosAdquiridos($PK)
    // {
    //     try{
    //         $dao = new ClienteDAO();
    //         $pojo = new dataBasePojo();
    //         $baseAdmin = $pojo->getconfigBase();
    //         $lista = $dao->listarClienteProyectosAdquiridos($baseAdmin,$PK);
    //         return $lista;
    //     }  catch (Exception $e)
    //     {
    //         throw  $e;
    //         return -1;
    //     }
    // }
    
}
?>