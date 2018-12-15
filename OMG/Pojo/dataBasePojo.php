<?php
    class dataBasePojo{
        private static $configBase = array(
            // "server"=>"198.71.228.11",
            // "user"=>"useromgbd",
            // "pass"=>"enerinomg1*:*",
            // "db"=>"databaseomgadmin"
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