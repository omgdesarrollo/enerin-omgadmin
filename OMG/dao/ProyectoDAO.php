<?php
require_once '../ds/AccesoDB.php';

class ProyectoDAO{
    public function listarProyectos($baseAdmin)
    {
        try{
            $query="SELECT tbproyecto.pk, tbproyecto.nombre, tbproyecto.creacion, tbproyecto.actualizacion FROM proyecto tbproyecto";
            
            $db=  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }
}
?>
