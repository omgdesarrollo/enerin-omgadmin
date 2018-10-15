<?php
session_start();
require_once '../../util/Session.php';

date_default_timezone_set('America/Mexico_city');

$fecha = date("d-m-Y H:i:s");

header("Content-Disposition: attachment; filename=Reporte_Empleados-$fecha.xls"); //Indica el nombre del archivo resultante
header("Pragma: no-cache");
header("Expires: 0");


$Lista = Session::getSesion("listarEmpleados");
$table="";

foreach($Lista as $filas){
    
    $table.="<tr><td style='border-style: solid;'>".$filas['nombre_empleado']." ".$filas['apellido_paterno']." ".$filas['apellido_materno']."</td>"
            . "<td style='border-style: solid;'>".$filas['categoria']."</td>"
            . "<td style='border-style: solid;'>".$filas['correo']."</td>"
            . "<td style='border-style: solid;'>".$filas['fecha_creacion']."</td><tr>";
}


echo "<table >
            <tr>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Nombre del Empleado
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Categoria
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Email
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Fecha Creacion
                </th>
            </tr>".utf8_decode($table)."

 
    </table>";


?>

