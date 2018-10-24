<?php
require_once '../ds/AccesoDB.php';

class ProyectoDAO{
    public function listarProyectos($baseAdmin)
    {
        try{
            $query="SELECT tbproyecto.pk, tbproyecto.nombre, tbproyecto.descripcion, 
            tbproyecto.creacion, tbproyecto.actualizacion FROM proyecto tbproyecto";
            
            $db=  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function listarProyecto($baseAdmin,$PK)
    {
        try{
            $query="SELECT tbproyecto.pk, tbproyecto.nombre, tbproyecto.creacion, tbproyecto.actualizacion FROM proyecto tbproyecto WHERE tbproyecto.PK = $PK";
            $db =  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function getModulos($baseAdmin,$PK)
    {
        try{
            $query="SELECT tbmodulo.pk, tbmodulo.nombre, tbmodulo.descripcion,tbmodulo.fk_proyecto
            FROM modulo tbmodulo WHERE tbmodulo.fk_proyecto = $PK";
            $db =  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function agregarProyecto($baseAdmin,$nombre,$descripcion,$fecha)
    {
        try{
            $query="INSERT INTO PROYECTO (nombre,creacion,descripcion) VALUES ('$nombre','$fecha','$descripcion')";
            $db = AccesoDB::getInstancia($baseAdmin);
            
            $exito = $db->executeUpdateRowsAfected($query);
            if($exito>0)
                $exito = $db->executeQuery("SELECT LAST_INSERT_ID()")[0]["LAST_INSERT_ID()"];
            else
                $exito = -2;
            return $exito;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function agregarModulo($baseAdmin,$nombre,$descripcion,$fk_proyecto)
    {
        try{
            $query="INSERT INTO modulo (nombre,descripcion,fk_proyecto) VALUES (UPPER('$nombre'),'$descripcion',$fk_proyecto)";
            $db = AccesoDB::getInstancia($baseAdmin);
            $exito = $db->executeUpdateRowsAfected($query);
            if($exito>0)
                $exito = $db->executeQuery("SELECT LAST_INSERT_ID()")[0]["LAST_INSERT_ID()"];
            else
                $exito = -2;
            return $exito;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function listarModulo($baseAdmin,$PK)
    {
        try{
            $query="SELECT tbmodulo.pk, tbmodulo.nombre, tbmodulo.descripcion, tbmodulo.fk_proyecto
            FROM modulo tbmodulo WHERE tbmodulo.pk = $PK";
            $db =  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function eliminarModulo($baseAdmin,$PK)
    {
        try{
            $query="DELETE FROM modulo WHERE pk = $PK";
            $db =  AccesoDB::getInstancia($baseAdmin);
            $exito = $db->executeUpdateRowsAfected($query);
            return $exito;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }
}
?>
