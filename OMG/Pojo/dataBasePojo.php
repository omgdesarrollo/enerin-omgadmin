<?php
    class dataBasePojo{
        private static $configBase = array(
            "server"=>"localhost",
            "user"=>"root",
            "pass"=>"",
            "db"=>"databaseomgadmin"
        );
        
        public static function getconfigBase(){
            return self::$configBase;
        }
    }
?>