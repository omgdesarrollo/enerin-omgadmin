<?php
require_once '../dao/LoginDAO.php';
require_once '../Model/AdminModel.php';

class LoginModel{
    //valida los datos del usuario.
    //retorna el registro del usuario como un arreglo asociativo
    public function  validar($usuario,$clave){
        try{
            $dao=new LoginDAO();
            $modelAdmin=new AdminModel();

            
            $rec["usuario"]=$dao->consultarPorUsuario($usuario,$clave);
            
            
//            echo "valor rec:".json_encode($rec["usuario"]);
            
            if($rec["usuario"]==NULL){
            throw new Exception("Usuario no existe !!!!!");
            }
            if($rec["usuario"]["CONTRA"]!=$clave){
            throw  new Exception("Clave Incorrecta!!!!!");
            }
            
        if($dao->validarExistenciaDePermisoParaUsuario($rec["usuario"]["ID_USUARIO"])["Res"]!=0){
                $rec["accesos"]= $modelAdmin->listarUsuarioVistas($rec["usuario"]["ID_USUARIO"]);
            } else {
                $rec["accesos"]="";
            }
            
            if($dao->validarContratoPorUsuario($rec["usuario"]["ID_USUARIO"])["resultado"]!=0){
                $rec["contrato"]="si";
            }else{
                $rec["contrato"]="no";
            }
                        
            return $rec;
    }  catch (Exception $e){
        throw  $e;
    }
    }
    
    public function validarContratoPorUsuario($ID_USUARIO)
    {
        try
        {
            $dao=new LoginDAO();
            $rec= $dao->validarContratoPorUsuario($ID_USUARIO);
            
            return $rec;
        } catch (Exception $ex)
        {
            throw $ex;
            return false;
        }
    }
}

?>