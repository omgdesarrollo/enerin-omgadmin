<?php
require_once '../ds/AccesoDB.php';

class EmpleadoDAO{
    public function listarEmpleados($baseAdmin)
    {
        try{
            $query="SELECT tbempleado.pk, tbempleado.nombre, tbempleado.apellidos, tbempleado.email, tbusuario.usuario
            FROM empleado tbempleado
            LEFT JOIN usuario tbusuario ON tbusuario.pk = tbempleado.fk_usuario";
            
            $db=  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function listarEmpleado($baseAdmin,$pk)
    {
        try{
            $query="SELECT tbempleado.pk, tbempleado.nombre, tbempleado.apellidos, tbempleado.email, tbusuario.usuario
            FROM empleado tbempleado
            LEFT JOIN usuario tbusuario ON tbusuario.pk = tbempleado.fk_usuario WHERE tbempleado.pk = $pk";
            // echo $query;
            $db=  AccesoDB::getInstancia($baseAdmin);
            // echo 2;
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function agregarEmpleado($baseAdmin,$nombre,$apellidos,$email)
    {
        try{
            $query="INSERT INTO empleado (nombre,apellidos,email) VALUES('$nombre','$apellidos','$email')";
            $db=  AccesoDB::getInstancia($baseAdmin);
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

    public function agregarUsuario($baseAdmin,$usuario,$contra)
    {
        try{
            $query="INSERT INTO usuario (usuario,contra) VALUES('$usuario','$contra')";
            $db=  AccesoDB::getInstancia($baseAdmin);
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

    public function actualizarUsuarioEmpleado($baseAdmin,$fk_usuario,$pk)
    {
        try{
            $query="UPDATE empleado SET fk_usuario = $fk_usuario WHERE pk = $pk";
            $db=  AccesoDB::getInstancia($baseAdmin);
            $exito = $db->executeUpdateRowsAfected($query);
            return $exito;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function eliminarEmpleado($baseAdmin,$PK)
    {
        try{
            $query="DELETE FROM empleado WHERE pk = $PK";
            $db =  AccesoDB::getInstancia($baseAdmin);
            $exito = $db->executeUpdateRowsAfected($query);
            return $exito;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function editarEmpleado($baseAdmin,$query)
    {
        try{
            $db =  AccesoDB::getInstancia($baseAdmin);
            $exito = $db->executeUpdateRowsAfected($query);
            return $exito;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }
}