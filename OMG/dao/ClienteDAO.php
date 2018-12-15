<?php
require_once '../ds/AccesoDB.php';

class ClienteDAO{
    public function listarClientes($baseAdmin)
    {
        try{
            $query="SELECT tbcliente.pk, tbcliente.nombre_corto, tbcliente.nombre_completo,
            tbcliente.fk_empleado, IFNULL(CONCAT(tbempleado.nombre,' ',tbempleado.apellidos),'SIN RESPONSABLE') responsable
            -- CONCAT(tbempleado.nombre,' ',tbempleado.apellidos) responsable
            FROM cliente tbcliente
            LEFT JOIN empleado tbempleado ON tbempleado.pk = tbcliente.fk_empleado";
            
            $db=  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function listarCliente($baseAdmin,$ID_CLIENTE)
    {
        try{
            $query="SELECT tbcliente.pk, tbcliente.nombre_corto, tbcliente.nombre_completo,
            tbcliente.fk_empleado, IFNULL(CONCAT(tbempleado.nombre,' ',tbempleado.apellidos),'SIN RESPONSABLE') responsable
            -- CONCAT(tbempleado.nombre,' ',tbempleado.apellidos) responsable
            FROM cliente tbcliente
            LEFT JOIN empleado tbempleado ON tbempleado.pk = tbcliente.fk_empleado
            WHERE tbcliente.pk = $ID_CLIENTE";
            
            $db=  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function agregarCliente($baseAdmin,$nombre_corto,$nombre_completo,$fecha_inicio,$fecha_termino)
    {
        try{
            $query="INSERT INTO cliente(nombre_corto,nombre_completo,fecha_inicio,fecha_termino) VALUES('$nombre_corto','$nombre_completo','$fecha_inicio','$fecha_termino')";
            echo $query;
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

    public function editarCliente($baseAdmin,$query)
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

    public function listarClienteProyectos($baseAdmin,$ID_CLIENTE)
    {
        try{
            $query="SELECT tbproyecto.pk pk_proyecto, tbproyecto.nombre nombre_proyecto, tbcliente_proyecto.server,
            tbcliente_proyecto.fecha_inicio, tbcliente_proyecto.fecha_termino,
            tbcliente_proyecto.user, tbcliente_proyecto.pass, tbcliente_proyecto.db
            FROM proyecto tbproyecto
            JOIN cliente_proyecto tbcliente_proyecto ON tbcliente_proyecto.fk_proyecto = tbproyecto.pk
            WHERE tbcliente_proyecto.fk_cliente = 0";
            
            $db=  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function listarClienteModulos($baseAdmin,$ID_CLIENTE)
    {
        try{
            $query="SELECT tbcliente_modulo.fk_modulo, tbcliente_modulo.permiso
            FROM cliente tbcliente
            JOIN cliente_modulo tbcliente_modulo ON tbcliente_modulo.fk_cliente = tbcliente.pk
            WHERE tbcliente.pk = $ID_CLIENTE";
            
            $db=  AccesoDB::getInstancia($baseAdmin);
            $lista = $db->executeQuery($query);
            return $lista;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    public function agregarProyectoAlCliente($baseAdmin,$FECHA_INICIO,$FECHA_TERMINO,$PK_PROYECTO,$PK_CLIENTE)
    {
        try{
            $query="INSERT INTO cliente_proyecto(fk_proyecto,fk_cliente,fecha_inicio,fecha_termino) VALUES($PK_PROYECTO,$PK_CLIENTE,'$FECHA_INICIO','$FECHA_TERMINO')";
            $db=  AccesoDB::getInstancia($baseAdmin);
            $exito = $db->executeUpdateRowsAfected($query);
            return $exito;
            } catch (Exception $e){
                throw $e;
                return -1;
            }
    }

    // public function listarClienteProyectosAdquiridos($baseAdmin,$PK_CLIENTE)
    // {
    //     try{
    //         $query="SELECT tbproyecto.pk pk_proyecto, tbproyecto.nombre nombre_proyecto, tbmodulo.pk pk_modulo, tbmodulo.nombre nombre_modulo,
    //             tbmodulo.descripcion descripcion_modulo, tbcliente_modulo.permiso permiso_modulo
    //             FROM proyecto tbproyecto
    //             JOIN modulo tbmodulo ON tbmodulo.fk_proyecto = tbproyecto.pk
    //             JOIN cliente_modulo tbcliente_modulo ON tbcliente_modulo.fk_modulo = tbmodulo.pk
    //             WHERE tbcliente_modulo.fk_cliente = $PK_CLIENTE";
            
    //         $db=  AccesoDB::getInstancia($baseAdmin);
    //         $lista = $db->executeQuery($query);
    //         return $lista;
    //         } catch (Exception $e){
    //             throw $e;
    //             return -1;
    //         }
    // }
    
}
?>