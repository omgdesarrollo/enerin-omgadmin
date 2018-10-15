<?php
session_start();
require_once '../../util/Session.php';

//establecemos el timezone para obtener la hora local
date_default_timezone_set('America/Mexico_city');
 
//la fecha y hora de exportación sera parte del nombre del archivo Excel
$fecha = date("d-m-Y H:i:s");
 
//Inicio de exportación en Excel
header('Content-type: application/vnd.ms-word');

header("Content-Disposition: attachment; filename=Reporte_Empleados-$fecha.doc"); //Indica el nombre del archivo resultante
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


