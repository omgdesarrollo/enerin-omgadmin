obtenerDatosArbol();  
id_seleccionado="";

 $(function(){
     
     $("#btn_guardar").click(function(e){
         e.preventDefault();
         
         var formData = {"NO":$('#NO').val(),"NOMBRE":$('#NOMBRE').val(),"DESCRIPCION":$('#DESCRIPCION').val(),
                         "PLAZO":$('#PLAZO').val(),"NODO":0,"ID_EMPLEADOMODAL":$('#ID_EMPLEADOMODAL').val()};            
         
         $.ajax({
             url:'../Controller/TemasOficiosController.php?Op=GuardarNodo',
             type:'POST',
             data:formData,
             success:function()
             {
                swal("","El Tema se ha creado correctamente","success");
                setTimeout(function(){swal.close();},1500);
                obtenerDatosArbol();
                $('#create-itemTema .close').click();
             }
         });
                
     });
     
     
     $("#btn_guardar_SubTema").click(function(e){
         e.preventDefault();
         
         var formData = {"NO":$('#NO_SUBTEMA').val(),"NOMBRE":$('#NOMBRE_SUBTEMA').val(),"DESCRIPCION":$('#DESCRIPCION_SUBTEMA').val(),
                         "PLAZO":$('#PLAZO_SUBTEMA').val(),"NODO":id_seleccionado,"ID_EMPLEADOMODAL":""};            
         
         $.ajax({
             url:'../Controller/TemasOficiosController.php?Op=GuardarNodo',
             type:'POST',
             data:formData,
             success:function()
             {
                swal("","El Sub-Tema se ha creado correctamente","success");
                setTimeout(function(){swal.close();},1500);
                obtenerDatosArbol();
                obtenerHijos(id_seleccionado);
                $('#create-itemSubTema .close').click();
             }
         });
                
     });
     
    $("#btn_limpiar_tema").click(function(){
         $("#NO").val("");
         $("#NOMBRE").val("");
         $("#DESCRIPCION").val("");
         $("#PLAZO").val("");                 
     });
     
     $("#btn_limpiar_SubTema").click(function(){
         $("#NO_SUBTEMA").val("");
         $("#NOMBRE_SUBTEMA").val("");
         $("#DESCRIPCION_SUBTEMA").val("");
         $("#PLAZO_SUBTEMA").val("");         
     });
     
     
     
     
 }); //CIERRA EL $FUNCTION                      
                          
                          
var myLayout = new dhtmlXLayoutObject({
			parent: "layout_here",
			pattern: "3W",
			cells: [
				{id: "a", width: 240, text: "Temas"},
				{id: "b", width: 600, text: "Sub-Temas"},
                                {id: "c", text: "Detalles"}
				
			]
		});
                
myTree = new dhtmlXTreeObject('treeboxbox_tree', '100%', '100%',0);
myTree.setImagePath("../../codebase/imgs/dhxtree_material/");
            

                
myLayout.cells("a").attachObject("treeboxbox_tree");

var myToolbar = myLayout.cells("a").attachToolbar({
			iconset: "awesome",
			items: [
                                {id:"agregar", type: "button", text: "Agregar Temas", img: "fa fa-plus-square"},
				{id:"eliminar", type: "button", text: "Eliminar", img: "fa fa-trash-o"}
			]
		});

myToolbar.attachEvent("onClick", function(id){
    //your code here
//    alert("hola"+id);
    evaluarToolbarSeccionA(id);

});

function evaluarToolbarSeccionA(id)
{
    if(id=="agregar")
    {
//        alert("entro en agregar");
        $('#create-itemTema').modal('show');
    } 
    if(id=="eliminar")
    {
        if(id_seleccionado=="")
        {
            swal("","Seleccione un Tema","error");
            setTimeout(function(){swal.close();},1500);
        }else{
//            var level = myTree.getLevel(id_seleccionado);
            var subItems= myTree.getSubItems(id_seleccionado);
            if(subItems=="")
            {
                eliminarNodo();
            }else{
//                alert("no se puede eliminar tiene descendencia");
                swal("","El Tema tiene Sub-Temas","error");
                setTimeout(function(){swal.close();},1500);  
            }
        }    
    }   
}


function eliminarNodo()
{
    $.ajax({
        url:'../Controller/TemasOficiosController.php?Op=Eliminar',
        data:'ID='+id_seleccionado,
        success:function(response)
        {
            if(response==true){
                swal("","Se elimino correctamente el Dato","success");
                setTimeout(function(){swal.close();},1500);
                obtenerDatosArbol(); 
                limpiar("#contenidoDetalles");
                limpiar("#contenido");
                id_seleccionado="";
            }else{
//                alert("Error no se puede eliminar el tema tiene requisitos");
                swal("","El Tema esta asignado a un Documento de Entrada","error");
                setTimeout(function(){swal.close();},1500);
            }
        }
    });
}
function limpiar(id_div){
    $(""+id_div).html("");
}

function obtenerDatosArbol()
    {
        $.ajax({
            url:'../Controller/TemasOficiosController.php?Op=Listar',
            success:function(data)
            { 
//                alert("tiene algo el arbol");
             contruirArbol(data);   
//             load(2);
             
            },error:function (){
//                alert("entro en el erro");
            }
        });
    }

function contruirArbol(dataArbol)
    {
        myTree.deleteChildItems(0);
        if(dataArbol.length>0){
        myTree.parse(dataArbol, "jsarray");
        }
    }

                

//            myTree.enableHighlighting(true);

//dataArbol=[["1","0","de"],["2","1","fes"],["3","1","el texto es de la siguiente manera que se puede trabajar "],["5","0","de"]];


myTree.attachEvent("onClick", function(id){
//    var id2 = myTree.getSelectedId();
//    alert("f  "+id2);
    // your code here
    obtenerHijos(id);
    
    id_seleccionado=id;
    return true;
});

  
myLayout.cells("b").attachObject("contenido");

var myToolbar = myLayout.cells("b").attachToolbar({
			iconset: "awesome",
			items: [
                                {id:"agregar", type: "button", text: "Agregar Subtema", img: "fa fa-plus-square"}
			]
		});
                
myToolbar.attachEvent("onClick", function(id){
    //your code here
    //alert("hola"+id);
    evaluarToolbarSeccionB(id);

});

function evaluarToolbarSeccionB(id)
{
//    alert("Este es el ID:"+id)
    if(id_seleccionado=="")
    {
        swal("","Seleccione un Tema","error");
        setTimeout(function(){swal.close();},1500);
    } else {
    if(id=="agregar")
    {
//        alert("entro en agregar");
        $('#create-itemSubTema').modal('show');
    } 
    if(id=="eliminar")
    {
        alert("entro en eliminar");
    }
    }
}


    
    function obtenerHijos(id)
    {
//        alert("Este es el ID Hijo:"+id);
       $("#contenido").html("<div style='font-size:30px' class='fa fa-refresh fa-spin'></div>"); 
        $.ajax({
            url:'../Controller/TemasOficiosController.php?Op=ListarHijos',
            type:'POST',
            data:'ID='+id,
            success:function(data)
            {
                construirSubDirectorio(data.datosHijos);
                construirDetalleSeleccionado(data,id);
            }
        });
    }
        
    
    function construirSubDirectorio(data)
    {
        
        tempData1="<div class='table-responsive'><table class='table table-bordered'><thead><tr class='info' id='registro_' name='registro_'>\n\
                    <th>No</th>\n\
                    <th>Subtema</th>\n\
                    <th>Descripcion</th>\n\
                    <th>Plazo</th>\n\
                    </tr></thead><tbody></tbody>";
                $.each(data, function(index,value){
                    tempData1+="<tr><td contenteditable='true' onClick='showEdit(this)' onBlur=\"saveToDatabase(this,'no',"+value.id_tema+")\">"+value.no+"</td>";
                    tempData1+="<td contenteditable='true' onClick='showEdit(this)' onBlur=\"saveToDatabase(this,'nombre',"+value.id_tema+")\" >"+value.nombre+"</td>";
                    tempData1+="<td contenteditable='true' onClick='showEdit(this)' onBlur=\"saveToDatabase(this,'descripcion',"+value.id_tema+")\">"+value.descripcion+"</td>";
                    tempData1+="<td contenteditable='true' onClick='showEdit(this)' onBlur=\"saveToDatabase(this,'plazo',"+value.id_tema+")\">"+value.plazo+"</td></tr>";
//                    tempData1+="<td>"+value.nombre_empleado+" "+value.apellido_paterno+" "+value.apellido_materno+"</td></tr>";
                });
            tempData1+="</table></div>";    
                $("#contenido").html(tempData1);
    }
        
     
   myLayout.cells("c").attachObject("contenidoDetalles");
   
   
    function construirDetalleSeleccionado(data,id)
    {
        var level = myTree.getLevel(id);
//        alert("este es el nivel:"+level);
        tempData2="<div class='table-responsive'><table class='table table-bordered'><thead><tr class='danger'><th>Datos</th><th>Detalles</th></tr></thead><tbody></tbody>";
                    $.each(data.detalles, function(index,value){
                        tempData2+="<tr><td class='info'>No</td><td contenteditable='true' onClick='showEdit(this)' onBlur=\"saveToDatabase(this,'no',"+value.id_tema+")\">"+value.no+"</td></tr>";
                        tempData2+="<tr><td class='info'>Tema</td><td contenteditable='true' onClick='showEdit(this)' onBlur=\"saveToDatabase(this,'nombre',"+value.id_tema+")\">"+value.nombre+"</td></tr>";
                        tempData2+="<tr><td class='info'>Descripcion</td><td contenteditable='true' onClick='showEdit(this)' onBlur=\"saveToDatabase(this,'descripcion',"+value.id_tema+")\">"+value.descripcion+"</td></tr>";
//                        if(level==1)
 //                       tempData2+="<tr><td class='info'>Responsable</td><td>"+value.nombre_empleado+" "+value.apellido_paterno+" "+value.apellido_materno+"</td></tr>";
                        tempData2+='<tr><td class="info">Responsable</td><td><select class="select" onchange="saveComboToDatabase(\'id_empleado\',this,'+value.id_tema+')">'; 
                            if(level==1){
                                $.each(data.comboEmpleados, function(index2,value2)
                                {
                                       tempData2 += "<option value='"+value2.id_empleado+"'";
                                    if(value.id_empleado==value2.id_empleado)
                                       tempData2+="selected";
                                       tempData2+=">"+value2.nombre_empleado+" "+value2.apellido_paterno+" "+value2.apellido_materno+"</option>";                            
                                });
                        tempData2+='</select></td></tr>';
                            }
                    });
        tempData2+="</table></div>";
   
        $("#contenidoDetalles").html(tempData2);
    }
    
    
    function saveToDatabase(ObjetoThis,columna,id) {
//        alert("entro al save");            
        
            $(ObjetoThis).css("background","#FFF url(../../images/base/loaderIcon.gif) no-repeat right");
            $.ajax({
                    url: "../Controller/GeneralController.php?Op=ModificarColumna",
                    type: "POST",
                    data:'TABLA=temas &COLUMNA='+columna+' &VALOR='+ObjetoThis.innerHTML+' &ID='+id+' &ID_CONTEXTO=id_tema',
                    success: function(data)
                    {
                        $(ObjetoThis).css("background","");
                    }   
            });        
}

function saveComboToDatabase(column,val,idTema)
{
    valorobjeto= val[val.selectedIndex].value;
//    console.log(valorobjeto);
    
    $.ajax({
        url: "../Controller/GeneralController.php?Op=ModificarColumna",
        type: "POST",
        data:'TABLA=temas &COLUMNA='+column+' &VALOR='+valorobjeto+' &ID='+idTema+' &ID_CONTEXTO=id_tema',
        success: function(data){   
                swal("","Actualizacion Exitosa!", "success");
                setTimeout(function(){swal.close();},1000);
        }   
   });

}

function load(carga){
    
    if(carga==1){
        $("#loader").show();
    }
    if(carga==2){
        $("#loader").hide();
    }
}


