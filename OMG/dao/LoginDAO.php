<?php
require_once '../ds/AccesoDB.php';
class LoginDAO{
    public function validar($baseAdmin,$_paramUsuario,$_paramPassword)
    {
        
        try{
            $query="call iniciarSesion('$_paramUsuario','$_paramPassword')";
            
            $db=  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            $rec = NULL;
            if (count($lista)==1)
            {
                $rec = $lista[0];
            }
            return $rec;
            } catch (Exception $e){
                throw $e;
            }
    }
}
?>
