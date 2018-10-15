<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UsuarioPojo
 *
 * @author francisco
 */
class UsuarioPojo {
   
    private $nombre_Usuario;
    
    
    public function getNombreUsuario(){
        return $this->nombre_Usuario;
    }
    public function setNombreUsuario($nombre_Usuario){
        $this->nombre_Usuario=$nombre_Usuario;
    }
    
}
