

function loadDataSideBarCatalogoInformacion(lista){
//         mySidebar = myLayout.cells("a").attachSidebar();
//   console.log(lista);
   
   list=[];
   
   $.each(lista,function(index,value){
       
       
       if(value["nombre"]=="EmpleadosView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            list.push({id: "empleados", text: "Registros de Personal", icon: "empleados.jpg"});
        }
   }
       if(value["nombre"]=="TemasView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            list.push( {id: "temas", text: "Temas", icon: "temas.jpg"});
        }
   }
       if(value["nombre"]=="DocumentosView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            list.push({id: "documentos", text: "Documentos", icon: "documentosn.jpg"});
        }
   }
       if(value["nombre"]=="AsignacionTemasRequisitosView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            list.push({id: "asignaciontemasrequisitos", text: "Asignacion de Tema - Requisito - Documento", icon: "asignacionrequisitos.png"});
        }
   }
       
   }) ;
   

  
    mySidebar = new dhtmlXSideBar({
        parent: "sidebarObj",
        icons_path: "../../images/base/",    
                                template:'tiles',
        width: 350,
        items:list
      });       

        
                     var evid=    mySidebar.attachEvent("onSelect", function(id, value){
                             
                                   switch(id){
                                       case "empleados":
//                                            consultarInformacion("../Controller/EmpleadosController.php?Op=Listar");                                           
                                            $("#sidebarObjV").load('InyectarVistasView.php #empleados');
//                                                  mySidebar.detachEvent(evid);
                                            //$("#sidebarObjV").load('EmpleadosView.php');
                                       break;  


                                       case "temas":
                                            consultarInformacion("../Controller/EmpleadosController.php?Op=mostrarcombo");
                                            $("#sidebarObjV").load('InyectarVistasView.php #temas');
                                       break;
                                     

                                       case "documentos":             
//                                             consultarInformacion("../Controller/EmpleadosController.php?Op=mostrarcombo");
//                                             consultarInformacion("../Controller/DocumentosController.php?Op=Listar");
//                                             consultarInformacion("../Controller/DocumentosEntradaController.php?Op=Alarmas");
                                            $("#sidebarObjV").load('InyectarVistasView.php #documentos');
                                       break;
                                       

                                       case "asignaciontemasrequisitos":
//                                             consultarInformacion("../Controller/AsignacionTemasRequisitosController.php?Op=Listar");
//                                             consultarInformacion("../Controller/ClausulasController.php?Op=mostrarcombo");
//                                             consultarInformacion("../Controller/DocumentosController.php?Op=mostrarcombo");                                             
                                            $("#sidebarObjV").load('InyectarVistasView.php #asignaciontemasrequisitos');
                                       break;


//                                       case "asignaciondocumentostemas":
//                                             
//                                             consultarInformacion("../Controller/AsignacionTemasRequisitosController.php?Op=mostrarcombo");                                          
//                                             consultarInformacion("../Controller/DocumentosController.php?Op=mostrarcombo");
//                                             consultarInformacion("../Controller/ClausulasController.php?Op=mostrarcombo");
//                                             consultarInformacion("../Controller/ClausulasController.php?Op=Listar");
//                                             consultarInformacion("../Controller/AsignacionTemasRequisitosController.php?Op=Listar");
//                                             consultarInformacion("../Controller/AsignacionDocumentosTemasController.php?Op=Listar");
//                                             
//                                            $("#sidebarObjV").load('InyectarVistasView.php #asignaciondocumentostemas');                                                                                 
//                                       break;
                                   }
      });
      

      
                        
    }




function loadDataSideBarOficiosCatalogos(lista){
    var listOficiosCatalogos=[];
       $.each(lista,function(index,value){
       
       
       if(value["nombre"]=="EmpleadosView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            listOficiosCatalogos.push({id: "empleadosoficios", text: "Registros de Personal", icon: "empleados.jpg"});
        }
   }
       if(value["nombre"]=="EntidadesReguladorasView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            listOficiosCatalogos.push( {id: "autoridadesRemitentes", text: "Autoridad Remitente", icon: "entidadreguladora.png"});
        }
   }
       if(value["nombre"]=="TemasView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            listOficiosCatalogos.push({id: "temasoficios", text: "Temas", icon: "temas.jpg"});
        }
   }
       
   }) ;
   
    mySidebar = new dhtmlXSideBar({
        parent: "sidebarObj",
        icons_path: "../../images/base/",    
                                template:'tiles',
        width: 350,
        items: listOficiosCatalogos
      });

                                 
                         mySidebar.attachEvent("onSelect", function(id, value){
                                   switch(id){
                                       case "empleadosoficios":
//                                            consultarInformacion("../Controller/EmpleadosOficiosController.php?Op=Listar");                                           
                                            $("#sidebarObjV").load('InyectarVistasView.php #empleadosoficios');
                                            //$("#sidebarObjV").load('EmpleadosView.php');
                                       break;  
                                       

                                       case "autoridadesRemitentes":
//                                            consultarInformacion("../Controller/EntidadesReguladorasController.php?Op=Listar");
                                            $("#sidebarObjV").load('InyectarVistasView.php #autoridadesRemitentes');
                                       break;
                                       

                                       case "cumplimientos":
                                             consultarInformacion("../Controller/CumplimientosController.php?Op=Listar");
                                            $("#sidebarObjV").load('InyectarVistasView.php #cumplimientos');
                                       break;
                                      

                                       case "temasoficios":
//                                            consultarInformacion("../Controller/ClausulasController.php?Op=Listar");
                                            consultarInformacion("../Controller/EmpleadosController.php?Op=mostrarcombo");
                                            $("#sidebarObjV").load('InyectarVistasView.php #temasoficios');                             
                                       break;
                                   }
      });
                        
    }




function loadDataSideBarOficiosDocumentacion(lista)
{
//    console.log(lista);
 var listDocumentacion=[];
       $.each(lista,function(index,value){
       
       
       if(value["nombre"]=="DocumentoEntradaView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            listDocumentacion.push({id: "documentosEntrada", text: "Documento entrada", icon: "documentoentrada.png"});
        }
   }
       if(value["nombre"]=="DocumentoSalidaView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            listDocumentacion.push( {id: "documentosSalida", text: "Documento salida", icon: "documentosalida.png"});
        }
   }

       
   }) ;
    
    
   
    mySidebar = new dhtmlXSideBar({
        parent: "sidebarObj",
        icons_path: "../../images/base/",    
                                template:'tiles',
        width: 350,
        items: listDocumentacion
      });

                                 
                         mySidebar.attachEvent("onSelect", function(id, value){
                                   switch(id){
                                       case "documentosEntrada":
                                            // consultarInformacion("../Controller/DocumentosEntradaController.php?Op=Listar");
                                            // consultarInformacion("../Controller/CumplimientosController.php?Op=mostrarcombo");
                                            // consultarInformacion("../Controller/AutoridadesRemitentesController.php?Op=mostrarCombo");
                                            // consultarInformacion("../Controller/TemasOficiosController.php?Op=mostrarCombo");
                                            // consultarInformacion("../Controller/DocumentosEntradaController.php?Op=Alarmas");
                                            $("#sidebarObjV").load('InyectarVistasView.php #documentosEntrada');
                                       break;  
                                       

                                       case "documentosSalida":
                                            // consultarInformacion("../Controller/DocumentosSalidaController.php?Op=Listar");
                                            // consultarInformacion("../Controller/DocumentosEntradaController.php?Op=mostrarcombo");
                                            $("#sidebarObjV").load('InyectarVistasView.php #documentosSalida');
                                       break;
                                                                              
                                   }
      });
                        
}
    
    function loadDataInformeGerencial(){
//         mySidebar = myLayout.cells("a").attachSidebar();
   
   
//        consultarInformacion("../Controller/DocumentosEntradaController.php?Op=Listar");
//        consultarInformacion("../Controller/SeguimientoEntradasController.php?Op=Listar");
//        consultarInformacion("../Controller/InformeGerencialController.php?Op=Listar");
        $("#sidebarObjV").load('InyectarVistasView.php #informegerencial');
                            
    }
    
    function loadDataSideBarCumplimientosDocumentos(){
        
        
        consultarInformacion("../Controller/ValidacionDocumentosController.php?Op=Listar");
        $("#sidebarObjV").load('InyectarVistasView.php #validaciondocumentos');                       
    }           
    
    function loadDataSideBarCumplimientosEvidencias()
    
    {
        $("#sidebarObjV").load('InyectarVistasView.php #seguimientoevidencias');
    }
    
    function loadDataSideBarProcesos(lista)
    {
        console.log(lista);
        var listReportes=[];
        
           $.each(lista,function(index,value){
       
       
       if(value["nombre"]=="CatalogoProduccionView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            listReportes.push({id: "catalogoProcesos", text: "Catalogo", icon: "catalogoProcesos.png"});
        }
   }
       if(value["nombre"]=="ReportesProduccionView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            listReportes.push( {id: "reportesProcesos", text: "Reportes", icon: "reportesProcesos.png"});
        }
   }
       if(value["nombre"]=="GeneradorReporteView.php"){
//       console.log("entro ");
        if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
            listReportes.push({id: "generadorReporte", text: "Generador de Reporte", icon: "reportesProcesos.png"});
        }
   }
       
   }) ;
        
        
        
        mySidebar = new dhtmlXSideBar({
        parent: "sidebarObj",
        icons_path: "../../images/base/",    
                                template:'tiles',
        width: 350,
        items:listReportes
      });                         
        mySidebar.attachEvent("onSelect", function(id, value){
                  switch(id){
                      case "catalogoProcesos":
                            if(window.top.$("#gom").val()!="")
                                $("#sidebarObjV").load('InyectarVistasView.php #SeleccionCatalogoView'); 
                            else
                               $.jGrowl("Error", { header: 'Error' });
                      break;  
                      case "reportesProcesos":
                           if(window.top.$("#gom").val()!="")
                                $("#sidebarObjV").load('InyectarVistasView.php #SeleccionReporteView'); 
                            else
                               $.jGrowl("Error", { header: 'Error' });
//                        $("#sidebarObjV").load('InyectarVistasView.php #reportes'); 
                      break;
                       case "generadorReporte":
                           if(window.top.$("#gom").val()!="")
                                $("#sidebarObjV").load('InyectarVistasView.php #generadorReporte'); 
                            else
                               $.jGrowl("Error", { header: 'Error' });
//                        $("#sidebarObjV").load('InyectarVistasView.php #reportes'); 
                      break;
                  }
      });
    }
    
    
    function loadDataSideBarTareas(list)
    {
        var listTareas=[];
         $.each(list,function(index,value){
             
                if(value["nombre"]=="EmpleadosTareasView.php"){
                    if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
                        listTareas.push({id: "empleadosTareas", text: "Registros de Personal", icon: "empleados.jpg"});
                    }
                }
                
                 if(value["nombre"]=="TareasView.php"){
                    if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
                        listTareas.push({id: "tareas", text: "Registros de Temas", icon: "registrarTareas.png"});
                    }
                }
                
                
//               listTareas.push({id: "empleadosTareas", text: "Empleados", icon: "empleados.jpg"});
             
             
         });
//         [
//          {id: "empleadosTareas", text: "Empleados", icon: "empleados.jpg"},
//          {id: "tareas", text: "Registrar Tareas", icon: "registrarTareas.png"}
//          
//            
//        ]
        console.log(list);
        mySidebar = new dhtmlXSideBar({
        parent: "sidebarObj",
        icons_path: "../../images/base/",    
                                template:'tiles',
        width: 350,
        items: listTareas
      });

                                 
        mySidebar.attachEvent("onSelect", function(id, value){
                  switch(id){
                      case "empleadosTareas":
                            $("#sidebarObjV").load('InyectarVistasView.php #empleadosTareas'); 
                      break;  


                      case "tareas":
                           $("#sidebarObjV").load('InyectarVistasView.php #tareas');
                      break;

                  }
      });
    }
    
            
    
    function loadDataSideBarContratos()
    {
        $("#sidebarObjV").load('InyectarVistasView.php #cambiarcontrato');
    }
    
    
    function loadDataSideBarInformeCumplimientos(list)
    {
        var listInformes=[];
        console.log(list);
                $.each(list,function(index,value){
             
                if(value["nombre"]=="InformeValidacionDocumentosView.php"){
                    if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
                        listInformes.push({id: "informesValidacionDocumentos", text: "Inf. De Documentos", icon: "documentos.png"});
                    }
                }
                
                 if(value["nombre"]=="InformeEvidenciasView.php"){
                    if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
                        listInformes.push({id: "informesEvidencias", text: "Inf. Evidencias", icon: "operaciones.png"});
                    }
                }
                 if(value["nombre"]=="ConsultasView.php"){
                    if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
                        listInformes.push( {id: "consultas", text: "Consultas", icon: "consultas.png"});
                    }
                }

             
             
         }); 
        mySidebar = new dhtmlXSideBar({
        parent: "sidebarObj",
        icons_path: "../../images/base/",    
        template:'tiles',
        width: 350,
        items:listInformes
      });

//             $("#informesValidacionDocumentos").click(function (){
//                 alert("le ");
//             });                    
        mySidebar.attachEvent("onSelect", function(id, value){
                  switch(id){
                      case "informesValidacionDocumentos":
                           $("#sidebarObjV").load('InyectarVistasView.php #informesValidacionDocumentos');
                      break;  
                      case "informesEvidencias":
                           $("#sidebarObjV").load('InyectarVistasView.php #informesEvidencias');
                      break;
                      
                      case "consultas":
                           $("#sidebarObjV").load('InyectarVistasView.php #consultas');
                      break;

                  }
      });
        
    }
    
    
    function loadViewUsuario()
    {
        $("#sidebarObjV").load('InyectarVistasView.php #administrarUsuario');
    }
    function loadDataSideBarAjustesUsuario(lista){
//         mySidebar = myLayout.cells("a").attachSidebar();

var listAjusteUsuarios=[];
               $.each(lista,function(index,value){
             
                if(value["nombre"]=="AdminView.php"){
                    if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
                        listAjusteUsuarios.push( {id: "permisos", text: "Permisos", icon: "cumplimientos.png"});
                    }
                }
                
                if(value["nombre"]=="UsuarioAjustesView"){
                    if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
                        listAjusteUsuarios.push( {id: "ajustes", text: "Cambiar Contraseña", icon: "ajustes.png"});
                    }
                }
                
                if(value["nombre"]=="ControlTemasView.php"){
                    if(value["consult"]=="true" ||value["delete"]=="true" ||value["edit"]=="true" ||value["new"]=="true" ){
                        listAjusteUsuarios.push( {id: "control", text: "Control de Temas", icon: "controlTemas.png"});
                    }
                }            
         }); 


   console.log(lista);
    mySidebar = new dhtmlXSideBar({
        parent: "sidebarObj",
        icons_path: "../../images/base/",    
                                template:'tiles',
        width: 350,
        items: listAjusteUsuarios
      });

                                 
                         mySidebar.attachEvent("onSelect", function(id, value){
                                   switch(id){
                                       case "permisos":
                                            $("#sidebarObjV").load('InyectarVistasView.php #administrarUsuario');
                                       break;  
                                       
                                       case "ajustes":
                                            $("#sidebarObjV").load('InyectarVistasView.php #ajustesUsuario');
                                       break;
                                       
                                       case "control":
                                            $("#sidebarObjV").load('InyectarVistasView.php #controlTemas');
                                       break;
                                                                              
                                   }
      });
      
                        
    }
    
    
    
    
    
    