<?php
require_once '../dao/LoginDAO.php';
require_once '../Pojo/dataBasePojo.php';

class LoginModel{
    public function validar($usuario,$contrasena)
    {
        try{
            $dao = new LoginDAO();
            $pojo = new dataBasePojo();
            $baseAdmin = $pojo->getconfigBase();

            $rec["usuario"] = $dao->validar($baseAdmin,$usuario,$contrasena);
            if($rec["usuario"]==NULL)
            {
                return -1;
                // throw new Exception("Usuario no existe !!!!!");
            }
            return $rec;
        }  catch (Exception $e)
        {
            throw  $e;
            return -1;
        }
    }
}

?>