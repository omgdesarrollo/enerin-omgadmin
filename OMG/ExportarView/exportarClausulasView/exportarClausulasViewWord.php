<?php
session_start();
require_once '../../util/Session.php';

//establecemos el timezone para obtener la hora local
date_default_timezone_set('America/Mexico_city');
 
//la fecha y hora de exportación sera parte del nombre del archivo Excel
$fecha = date("d-m-Y H:i:s");
 
//Inicio de exportación en Excel
header('Content-type: application/vnd.ms-word');

header("Content-Disposition: attachment; filename=Reporte_Temas-$fecha.doc"); //Indica el nombre del archivo resultante
header("Pragma: no-cache");
header("Expires: 0");
 
    

$Lista = Session::getSesion("listarClausulas");
$table="";

foreach($Lista as $filas){
    
    $table.="<tr><td style='border-style: solid;'>".$filas['clausula']."</td>"
            . "<td style='border-style: solid;'>".$filas['descripcion_clausula']."</td>"
            . "<td style='border-style: solid;'>".$filas['sub_clausula']."</td>"
            . "<td style='border-style: solid;'>".$filas['descripcion_sub_clausula']."</td>"
            . "<td style='border-style: solid;'>".$filas['nombre_empleado']." ".$filas['apellido_paterno']." ".$filas['apellido_materno']."</td>"
            . "<td style='border-style: solid;'>".$filas['descripcion']."</td>"
            . "<td style='border-style: solid;'>".$filas['plazo']."</td><tr>";
}


echo "<table >
            <tr>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                No.Tema
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Tema
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                No.Sub-Tema
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Sub-Tema
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Responsable del Tema
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Descripcion
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Plazo
                </th>
            </tr>".utf8_decode($table)."

 
    </table>";

    
?>


