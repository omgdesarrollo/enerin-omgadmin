<?php
require_once '../ds/AccesoDB.php';
class LoginDAO{
    public function consultarPorUsuario($_paramUsuario,$_paramPassword)
    {
        
        try{
            $query="call iniciarSesion('$_paramUsuario','$_paramPassword')";
            
            $db=  AccesoDB::getInstancia();
            $lista=$db->executeQuery($query);
            $rec = NULL;
            if (count($lista)==1){
                $rec=$lista[0];
            }
            return $rec;
            } catch (Exception $e){
                throw $e;
            }
    }
    
    
    public function validarExistenciaDePermisoParaUsuario($ID_USUARIO)
    {
        try
        {
            $query="SELECT COUNT(*) AS Res 
                    FROM usuarios_vistas tbusuarios_vistas
                    JOIN estructura tbestructura ON tbusuarios_vistas.id_estructura = tbestructura.id_estructura
                    JOIN vistas tbvistas ON tbvistas.id_vistas = tbestructura.id_vistas
                    WHERE  tbusuarios_vistas.id_usuario='$ID_USUARIO' AND (tbusuarios_vistas.edit='true' OR tbusuarios_vistas.delete='true' OR tbusuarios_vistas.new='true'
                    OR tbusuarios_vistas.consult='true')";
            $db=  AccesoDB::getInstancia();
            $lista=$db->executeQuery($query);
            
            return $lista[0];
            
        } catch (Exception $ex)
        {
            throw $ex;
            return $ex;
        }
    }
    
    public function validarContratoPorUsuario($ID_USUARIO)
    {
        try
        {
            $query="SELECT count(*) as resultado
                    FROM usuarios_cumplimientos tbusuarios_cumplimientos
                    WHERE tbusuarios_cumplimientos.acceso='true' AND tbusuarios_cumplimientos.ID_USUARIO=$ID_USUARIO";
//            echo json_encode("Entro al sql:".$query);
            $db=  AccesoDB::getInstancia();
            $lista=$db->executeQuery($query);
            
//        echo json_encode("Aqui entro:".$lista);
        
            return $lista[0];
            
        } catch (Exception $ex)
        {
            throw $ex;
            return false;
        }
    }
    
}
?>
