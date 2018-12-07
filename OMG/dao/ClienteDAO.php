<?php
require_once '../ds/AccesoDB.php';

class ClienteDAO{
    public function listarClientes($baseAdmin)
    {
        try{
            $query="SELECT tbcliente.pk, tbcliente.nombre_corto, tbcliente.nombre_completo,
            tbcliente.fecha_inicio, tbcliente.fecha_termino,
            tbcliente.fk_empleado, CONCAT(tbempleado.nombre,' ',tbempleado.apellidos) responsable
            FROM cliente tbcliente
            JOIN empleado tbempleado ON tbempleado.pk = tbcliente.fk_empleado";
            
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