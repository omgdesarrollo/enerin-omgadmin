var app=angular.module('omgApp',[]);

app.controller('empleadosCtrl',function($scope){
//  this.dataEmpleados=datosEmpleados;  
$scope.dataEmpleados=datosEmpleados;  
    
$scope.guardarEmpleado=function (){
   
}
});





var datosEmpleados={
   numeracion:"NO",
   nombre_Empleado :"NOMBRE",
   apellido_paterno:"APELLIDO PATERNO",
   apellido_materno:"APELLIDO MATERNO",
   categoria:"CATEGORIA",
   email:"EMAIL",
   fecha_creacion:"FECHA CREACION"
} ;
