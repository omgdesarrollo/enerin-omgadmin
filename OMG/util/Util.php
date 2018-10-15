<?php
class Util{
    //archivo de log de errores
    const LOG_FILE="../log/omg.log";
    //graba los datos de una excepcion en el log de errores
    public static function  save_log(Exception $e,$query=""){
        $mensaje="File: ".$e->getFile()."\n".
                "Line: ".$e->getLine()."\n".
                "Code: ".$e->getCode()."\n".
                "Message: ".$e->getMessage()."\n".
                "Query: ".$query."\n\n";
        error_log($mensaje, 3,  self::LOG_FILE);
    }
}
/* tipos de registro de error_log()
 0 message es enviado al registro del sistema de php usando el mecanismo
 * de registro del sistema operativo o un archivo de que directiva
 * de configuracion  este establecida en error_log. esta es la opcio predeterminada
 1 message es enviado por email a la direccion del parametro destinado
 * este es el unico tipo de mensaje donde se usa el cuarto parametero extra_headers.
 2 ya no es una opcion
 3messaje es añadido al inicio del archivo destino.no se añade
 * automaticamente una nueva linea al final de la cadena message.
 4 message es enviado directamente al gestor de registro de SAPI
 */
?>

