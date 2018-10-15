<?php
session_start();
require_once '../../util/Session.php';

date_default_timezone_set('America/Mexico_city');

$fecha = date("d-m-Y H:i:s");

header("Content-Disposition: attachment; filename=Reporte_Documentos-$fecha.xls"); //Indica el nombre del archivo resultante
header("Pragma: no-cache");
header("Expires: 0");


$Lista = Session::getSesion("listarDocumentos");
$table="";

foreach($Lista as $filas){
    
    $table.="<tr><td style='border-style: solid;'>".$filas['clave_documento']."</td>"
            . "<td style='border-style: solid;'>".$filas['documento']."</td>"
            . "<td style='border-style: solid;'>".$filas['nombre_empleado']." ".$filas['apellido_paterno']." ".$filas['apellido_materno']."</td>"
            . "<td style='border-style: solid;'>".$filas['registros']."</td><tr>";
}


echo "<table >
            <tr>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Clave del Documento
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Nombre del Documento
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Responsable del Documento
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Registros
                </th>
            </tr>".utf8_decode($table)."

 
    </table>";


?>

