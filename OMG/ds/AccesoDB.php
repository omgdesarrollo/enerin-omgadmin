<?php
require_once '../util/Util.php';
class AccesoDB {

    // Variable que representa la conexion  con el servidor
    private $cn = null;    
    // Implementacion del patrón Singleton
    private static  $instancia = null;
    
    public static function getInstancia() {
               
        if( self::$instancia == null ) {
                self::$instancia = new AccesoDB();
        }
        return self::$instancia;
    }

    // Metodo privado que retorna la conexion con el servidor
    private function getConnection() {
        // Datos de conexion
        $parametros = parse_ini_file("../conf/conexion.ini");
        $server = $parametros["01"];
        $user = $parametros["02"];
        $pass=$parametros["03"];
        $db=$parametros["04"];
        if($this->cn == null) {
            try {
                $this->cn = mysqli_connect($server,$user,$pass,$db);
                 mysqli_set_charset($this->cn, 'utf8');
                if($this->cn) {
//                    echo 'ok';
                }
                else {                     
                    throw new Exception("No se tiene acceso al servidor o la Base de datos no existe.");
                }
            } catch( Exception $e ) {
                throw $e;
            }
        }
        return $this->cn;
    }

    // Ejecuta una consulta y retorna el resultado como un arreglo
    public function executeQuery($query ) {
        try {
            $cn = $this->getConnection();
            // mysql_query("SET NAMES 'utf8'");
            $rs = mysqli_query($cn,$query);
            
            if(mysqli_errno($cn)) {
                throw new Exception(mysqli_error($cn));
            }
            $lista = array();
            while ($row = mysqli_fetch_assoc($rs)) {
                    $lista[] = $row;
            }
           
            mysqli_free_result($rs); 
            //agrego esta linea para que pueda realizar 
            //dos consultas a la vez en la BD
            mysqli_next_result($this->cn);
             //viendo si debo comentarla
//            mysqli_close();
             //termina el de viendo si debo comentarla
            return $lista;
        } catch( Exception $e ) {
            Util::save_log( $e, $query );
            throw $e;
        }
    }
//    public function executeQueryUpdate($query){
//     try{
//         $cn=$this->getConnection();
//         $rs = mysqli_query($cn,$query);
//            if(mysqli_errno($cn)) {
//                throw new Exception(mysqli_error($cn));
//            }
//            $lista = array();
//            while ($row = mysqli_fetch_assoc($rs)) {
//                    $lista[] = $row;
//            }
//            mysqli_free_result($rs); 
//            //agrego esta linea para que pueda realizar 
//            //dos consultas a la vez en la BD
//            mysqli_next_result($this->cn);
////            mysqli_close();      
//     } catch (Exception $ex) {
//            Util::save_log( $ex, $query );
//            throw $ex;
//     }   
//    }
    
    function executeQueryUpdate($query) {
        $cn=$this->getConnection();
        $result = mysqli_query($this->cn,$query);        
		return $result;
    }
    function executeUpdateRowsAfected($query)
    {
        $cn=$this->getConnection();
        $result = mysqli_query($this->cn,$query);
        $result2 = mysqli_affected_rows($cn);
		return $result2;
    }
}


?>
