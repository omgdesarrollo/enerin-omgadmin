<?php
session_start();
require_once '../../util/Session.php';

//establecemos el timezone para obtener la hora local
date_default_timezone_set('America/Mexico_city');
 
//la fecha y hora de exportación sera parte del nombre del archivo Excel
$fecha = date("d-m-Y H:i:s");
 
//Inicio de exportación en Excel
header('Content-type: application/vnd.ms-word');

header("Content-Disposition: attachment; filename=Reporte_ValidacionDocumentos-$fecha.doc"); //Indica el nombre del archivo resultante
header("Pragma: no-cache");
header("Expires: 0");
 
    

$Lista = Session::getSesion("listarValidacionDocumentos");
$table="";
$requisitos="";
$i=0;
$i2=0;
$entrar=false;
$limite=sizeof($Lista);


foreach($Lista as $in=>$filas){
    $requisitos="";
    if($i2<$limite)
    {
        foreach ($Lista as $index2=>$filas2){
            if($Lista[$i2]['id_validacion_documento']==$filas2['id_validacion_documento'])
            {
                $requisitos.=$filas2['requisito']."<br>";
                $i=$index2;
                $entrar=true;
            }       
        }
        if($entrar)
        {
        $table.="<tr><td style='border-style: solid;'>".$Lista[$i]['clave_documento']."</td>"
                . "<td style='border-style: solid;'>".$Lista[$i]['documento']."</td>"
                . "<td style='border-style: solid;'>".$Lista[$i]['nombre_empleado_documento']." ".$Lista[$i]['apellido_paterno_documento']." ".$Lista[$i]['apellido_materno_documento']."</td>"
                . "<td style='border-style: solid;'>".$requisitos."</td>"
                . "<td style='border-style: solid;'>".$Lista[$i]['registros']."</td>"
//                . "<td style='border-style: solid;'>"."if($Lista[$i]['validacion_documento_responsable']=='true')echo 'si'; echo 'no'"."</td>"
                . "<td style='border-style: solid;'>".$Lista[$i]['observacion_documento']."</td>"
                . "</tr>";
        }
        $i2=$i+1;
    }
}

echo "<table>
            <tr>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Clave Documento
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Nombre Documento
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Responsable del documento
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Requisitos
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Registros
                </th>
                <th style='background:#CCC; color:#000;border-style: solid;'>
                Observaciones
                </th>
            </tr>".utf8_decode($table)."

 
    </table>";

    
?>


