/**
 * jQuery tools 1.0.0
 *
 * Copyright (c) 2012
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *  
 */

var arregloModel=[];
var cadena_columnas;
var columnaocultar;
var list;
var  showMenuvar;
var intervalo;

$.ajaxSetup({
	type 		: "POST",
	async 	: false,
	/*beforeSend:  function(xmlHttpRequest){
		$.blockUI();
	},
	complete:  function(xmlHttpRequest, status){
		console.log('xxxxx');
		 $.unblockUI();
	},*/
	error 		: function(xhr) {
		if ($("#dAlert").length == 0)
			mgAvisoalert("Ocurrio un error: <strong>"+ xhr.status + " " + xhr.statusText +"</strong>","Error");
		else
			abrirAlert("Ocurrio un error: <strong>"+ xhr.status + " " + xhr.statusText +"</strong>",-1); 
		}
});
$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

jQuery(function($){	$(document).ajaxStart(function(){blockpage();}).ajaxStop(function(){ unBlockpage();});});
	
function blockpage(img){ $('body').append("<div id='blockpage' class='blockpage'></div>");
if (img===undefined)$('body').append("<div id='blockpageimg' class='blockpageimg'><img src=\"../../images/base/loader.gif\"><h4> Espere un momento...</h4></div>");}

function unBlockpage(){ setTimeout(function(){ $("#blockpage").remove();$("#blockpageimg").remove(); }, 200);}

function mgAviso(response){
	var result = jQuery.parseJSON(response.responseText);
	if ($("#dAlert").length == 0)
		mgAvisoalert(result.msj,(result.codigo==0)?"Ok":"Error");
	else
		abrirAlert(result.msj,result.codigo);
	return result.codigo;
}

function mgAvisoalert(mensaje,tipo){ CloseDelay(mensaje,true, tipo ); }	 

function CloseDelay(mensaje,centrar, vtitle ){
	try{				
		if(typeof(centrar)=='undefined')
			centrar=true;				
		var seg = 2200;
		if(typeof(tex)!='undefined')					

		$("#dialogoInfo").remove();		
		mensaje	='<div style="z-index:100" class="imagenmsj '  + vtitle + '"></div>'  + mensaje  ;
		var texto = "<div id='dialogoInfo' >"+mensaje+"</div>";
		$('body').append(texto);				 				
		if(centrar)
			$("#dialogoInfo").dialog({title: "Aviso",modal: true, hide: 'blind',closeOnEscape: false,
				buttons: {Ok: function() {$(this).remove(); }},
				close: function(event, ui){ $(this).remove(); }});
			
		else
		{
			$("#dialogoInfo").dialog({position: ['right','top'],  title: "Aviso",resizable: false ,show:'fold', hide: 'blind' , width: 400,open: function (event, ui) {/*$('#dialogoInfo').css('overflow', 'hidden');*/ $('#dialogoInfo').removeAttr('style'); $('#dialogoInfo').removeAttr('class'); },  close: function(event, ui){ $("#dialogoInfo").remove(); }});
			if (typeof(mensaje)=='undefined' || mensaje=="" )
				$("#dialogoInfo" ).dialog( "option", "height", 23 );
			else
				$("#dialogoInfo" ).dialog( "option", "height", 65 );
		    setTimeout(function (){_closeDialog();}, seg);
		}
	}
	catch(err){
		err=null;
	}
}

function windowsExternal( vtitle, pagina,callback,vheight,vwidth ){
	try{
		$("#dialogoExternal").remove();				
		var texto = "<div id='dialogoExternal' ></div>";
		$('body').append(texto);	
		$("#dialogoExternal").append($("<iframe />").attr
				({id:"frameExternal",name:"frameExternal", "src":pagina,"height": "100%","width": "100%","marginwidth": "0",
					"marginheight": "0","scrolling": "no","frameborder": "0" }
				)).dialog({title: vtitle,modal: true, hide: 'blind',closeOnEscape: false,
				height: vheight ,width: vwidth ,resizable: false, dialogClass: "no-close-external",
				close: function(event, ui){$(this).remove();if( callback ) callback(); }});					
	}
	catch(err){
		err=null;
	}
}

function windowsExternalNoClose( vtitle, pagina,callback,vheight,vwidth ){
	try{
		$("#dialogoExternal").remove();				
		var texto = "<div id='dialogoExternal' style='overflow:hidden' ></div>";
		$('body').append(texto);	
		$("#dialogoExternal").append($("<iframe />").attr
				({id:"frameExternal",name:"frameExternal", "src":pagina,"height": "100%","width": "100%","marginwidth": "0",
					"marginheight": "0","scrolling": "no","frameborder": "0" }
				)).dialog({title: vtitle,modal: true, hide: 'blind',closeOnEscape: false,
				height: vheight ,width: vwidth ,resizable: false, dialogClass: "no-close",
				close: function(event, ui){$(this).remove();if( callback ) callback(); }});					
	}
	catch(err){
		err=null;
	}
}


function _closeDialog(){ $("#dialogoInfo").dialog('close');	 }

function isValidDate(fecha){
    var isValid = true;
    try{
        $.datepicker.parseDate('dd/mm/yy',  fecha, null);
    }
    catch(error){
        isValid = false;
    }
    return isValid;
}

function rangoFechaValido(fechaIni, dateEnd ){
	var validFechaIni=isValidDate(fechaIni);
	var validDateEnd= isValidDate(dateEnd);		
	if (validFechaIni && validDateEnd){
		var a=  $.datepicker.parseDate('dd/mm/yy',  fechaIni, null);
		var b = $.datepicker.parseDate('dd/mm/yy',  dateEnd, null);
	    return (a <= b);
	}
	else{ 			
		return false;
	}
}

function abrirAlert(msj, type){
	$("#msjError").html( msj );
	clearInterval(intervalo);	
	if (type == 0) {
		$( "#dAlert" ).removeClass( "alert alert-info alert alert-danger" ).addClass( "alert alert-success" ).show('slow');
		intervalo=setInterval( cerrar_alert, 2500);}
	else if (type == -1)
		$( "#dAlert" ).removeClass( "alert alert-info alert alert-success" ).addClass( "alert alert-danger" ).show('slow');
	else if (type == -2)
		$( "#dAlert" ).removeClass( "alert alert-danger alert alert-success" ).addClass( "alert alert-info" ).show('slow');
	else if (type == -3){
		$( "#dAlert" ).removeClass( "alert alert-danger alert alert-success" ).addClass( "alert alert-info" ).show('slow');
		intervalo=setInterval( cerrar_alert, 2500);
	}else
		$( "#dAlert" ).removeClass( "alert alert-info alert alert-success" ).addClass( "alert alert-danger" ).show('slow');
}

function cerrar_alert(){  $('#dAlert').fadeOut('slow', function() {}); }

/*--------------fuction of show/hide--------------------*/
function getEdit(pagina) {	

	$.ajax({
	type : "GET",
	dataType:'json',
	cache: false,
	url : "ajax/columnas_editar.php",
	async:false,	
    data : {
    	scolumnas :columnaocultar,
    	pagina:	pagina,
    	scolumnasMostrar:cadena_columnas
    		
		   },
		   success : function(response) {
						}
		   });	
}

function checkTodos (id,pID) {    	 
	$( "#" + pID + " :checkbox").prop('checked', $('#' + id).is(':checked'));
}

function GetLlenadoTabla(npag) {	
		$.ajax({
		type : "GET",
		dataType:'json',
		cache: false,
		url : "ajax/columnas_cargar.php",
		async:false,
		 data : {
			 pagina: npag
		 
			 },			 
				success : function(response) {										
					recorreGrid(response.listaColumna);
					tablahtml( response.listaColumna);}
		 });
}

function recorreGrid(lista) {    	
	for(var i=0;i < lista.length;i++)
	{
		arregloModel [i] = lista[i].colmodel;
	  	    
	  }	
}
function enviar_columnas(nombreTabla,snombrePagina){
    $( "#dialog" ).dialog("close");
    cadena_columnas='';
    columnaocultar='';
    var  i = 0;
    var renglon=[];
    var renglon1=[];

    $(document).ready(function(){});
    
        $("#columnas_c").find(':input').each(function() {
         var elemento= this;
         if(this.checked){
         	//elemento.value; 
         	cadena_columnas += elemento.value;
         	cadena_columnas += ","; 
         	renglon1[i]=  elemento.value;
         	i++;
         }
         else {
        	 columnaocultar += elemento.value;
        	 columnaocultar += ',';
        	 renglon[i]= elemento.value;
        	
        	 i++;
        	 } 
        });
       
   
   	         cadena_columnas = cadena_columnas.substring(0, cadena_columnas.length-1);
   	         columnaocultar = columnaocultar.substring(0, columnaocultar.length-1);
   	         if (columnaocultar!="" || cadena_columnas !="" ) {       	        	 
   	         getEdit(snombrePagina);
   	         }
			 jQuery("#"+ nombreTabla).jqGrid('hideCol',renglon);
			 jQuery("#"+ nombreTabla).jqGrid('showCol',renglon1);   
			// ajustaPantalla(nombreTabla);
}


function Recorremodel (nombreTabla,snombrePagina,arregloModel) {	 
	var colModel= $("#"+ nombreTabla).jqGrid('getGridParam', 'colModel');
	 var colNames= $("#"+ nombreTabla).jqGrid('getGridParam', 'colNames');
	for(var i=0;i < colModel.length;i++)
	{
		
		   var colName = colModel[i]['hidden'];
		   var Name = colModel[i]['name'];
		   var Jsonmap=colModel[i]['jsonmap'];
		   jQuery("#"+ nombreTabla).jqGrid('hideCol',colNames[i]);
		   var bExiste=true;
		   for(var j=0;j < arregloModel.length;j++)
			{
				 if ( arregloModel[j] == Name)
				 {
					bExiste=false; 
					 break;
				 }
			}
			   if (bExiste==true && colName==false){
				   $.ajax({
				    	type : "GET",
				    	dataType:'json',
				    	cache: false,
				    	url : "ajax/columnas_insertar.php",
				    	async:false,	
				        data : {
				        	 	pagina:snombrePagina,
				    	     	colnames: colNames[i],
				    	    	colmodel:Name,
				    	    	jsonmap:Jsonmap,
				    	    	visible:1,
				    	    	orden:i
				        },
				        success : function(response) {}
				   });	
            }
	  }

	};
	
	function GetLlenadoTabla(paramPagina) {	
		$.ajax({
		type : "GET",
		dataType:'json',
		cache: false,
		url : "ajax/columnas_cargarTabla.php",
		async:false,
		 data : {
			 pagina: paramPagina
		 
			 },
		 
				success : function(response) {										
					recorreGrid(response.listaColumna);
					tablahtml( response.listaColumna);}
		 });
	}

function recorreGrid(lista) {    	
	for(var i=0;i < lista.length;i++)
	{
		arregloModel [i] = lista[i].colmodel;
	  	    
	  }	
} 


	  function tablahtml(data){	
	    	var listax='';
	    	$("#columnas_c").empty();
				list = $("#columnas_c");
				$.each(data, function(index, item) {
					if( item.visible == 1)
					{				
						listax+="<tr><td><input type='checkbox'  checked class='xx' value='"+item.colmodel+"'/>" + item.colnames +"</td></tr>" ;}
					else
					{					
						listax+="<tr><td><input type='checkbox'    class='xx' value='"+item.colmodel+"'/>" + item.colnames +"</td></tr>" ;}
				} );
				list.html(listax);
			}
	  
/*Funciones para pantallas que contienen un panel derecho e Izquierdo con opcion de cerrar el panel izquierdo*/
/* !!!Importante��� No modificar la funciones*/
	function cierraSesion(){ $('#dialog-confirm').dialog('open'); 	}
	function cerrarPanel(){
			$('#panel_secundario').fadeOut('slow', function() {
				$('#panel_principal').fadeIn('fast', function() {});
			});
		}
		
	function closeMenu(){
			var options = {};
			$("#sidebar3").height($("body").height()-120 );
			$("#sidebar1" ).hide( 'drop', options, 500, function() {
				$('#sidebar3').show('drop',options,500, function() {});
				showMenuvar	=false;
				$("#sidebar2").trigger('resize');
			} );			
		}
		
	function openMenu(){
			var options = {};
			$("#sidebar1").height($("body").height()-120 );
			$("#sidebar3" ).hide( 'drop', options, 100, function() {
			$('#sidebar1').show('drop',options,500, function() {});
				showMenuvar=true;
				$("#sidebar2").trigger('resize');
			} );		
		}
		
	function resizePanel() {
		 $("body").width($(window).width()).height($(window).height());				
		  if (showMenuvar)
				$("#sidebar1").height($("body").height()-120 );
		  else
		 		$("#sidebar3").height($("body").height()-120 );
		 	 
				$("#sidebar2").height($("body").height()-120 );
				
		  if (showMenuvar)
					$("#sidebar2").width($("body").width()-285 );	
		  else
					$("#sidebar2").width($("body").width()-40 );	
		}
	  
		function InicializarBotones(nuevo,editar,borrar,imprimir,list){		  
			  if(nuevo=='0')  $('#btnNuevo_'+list).addClass('ui-state-disabled');
			  if(editar=='0')   $('#btnEditar_'+list).addClass('ui-state-disabled');
			  if(borrar=='0')  $('#btnBorrar_'+list).addClass('ui-state-disabled');
			  if(imprimir=='0') {  try {$('#btnImprimir_'+list).addClass('ui-state-disabled');}  catch(err) {}  }
			 }
//para la creacion de combos		
		function loadSelect(Myurl,param){
			var Myvar="";
			$.ajax({
				type :"POST",
				url : Myurl,
				data:param,
				async : false,
				success : function(response) {
					Myvar+=":";
					$.each(response, function(index, item) {
						Myvar+=";"+item.sid+":"+item.descripcion;
					});    
				},
				error : function(e) {
					alert(e);
				}
			});
	        return Myvar;		    	   
		}
		
		function reloadFilterGrid(id, values){
			var $select = $(id);                      
		    $select.find('option').remove();
		    var ar = values.split(";");
			ar.forEach(function(item) {
		    	var op = item.split(":");
		        $('<option>').val(op[0]).text(op[1]).appendTo($select);     
		    });
		}
		
		function createFilter(g,i,v,optional){
			var rules=[],filters={groupOp:"AND",rules:[]};
			if (optional!=undefined){rules=rules.concat(optional) };
			
			$.each(i, function(index, value){ 
				if (v[value]!='') rules.push({ field: g.columnIds[value], op:g.opers[value], 	data:v[value] 	}); 
			});
			filters.rules=rules;

		return (rules.length>0)?("filters="+JSON.stringify(filters)):"";	
		}

/* FORMATTER PARA UNA COLUMNA TIPO SELECT QUE PERMITE RETORNAR EL ID DE LA DESCRIPCION DENTRO DE LA CELDA, A PARTIR DE DATOS EN UNA VARIABLE 
 * EN CONJUNTO CON EL SuperSelectUnformatter SE PUEDE CREAR UN SELECT DINAMICO 
 * REQUISITOS:
 * LA VARIABLE DEBE TENER LOS DATOS DE LA FORMA ID:DESCRIPCION; ---> SE PUEDE USAR LoadSelect
 * formatter :superSelectFormatter
 * edittype: 'select', 
	editoptions:{
		 value: function(){return VARIABLE;}
		       }
 * NO USAR jsonmap
 * AL MOMENTO DE ENVIAR LOS DATOS EL ID SE MAPPEA EN EL name DE LA COLUMNA
 * */	    
	    function superSelectFormatter(cellval,opts, model,act){
	    	//alert("format: "+cellval);
	    	var nuevo= opts.colModel.editoptions.value+"";
	    	var com;
	    	var ter;
	    	com=nuevo.indexOf("return");
	    	ter=nuevo.indexOf(";");
	    	var variable=nuevo.substring(com+6,ter);
	    	var contiene=eval(variable);
	    	//alert(contiene);
	    	var sv=""+cellval,ret=[];    	
	    	var so = contiene.split(";");
	    	for(var i=0; i<so.length;i++){
	    	sv = so[i].split(":");
	    	if(sv.length > 2 ) {
	    	sv[1] = jQuery.map(sv,function(n,i){if(i>0) { return n;}}).join(":");
	    	}
	    	//alert($.trim(sv[0])+":"+$.trim(sv[1])+"-->"+$.trim(cellval));
	    	if($.trim(sv[0])==$.trim(cellval)) {
	    	ret[0] = sv[1];
	    	break;
	    	}
	    	}
	    	cellval = ret.join(", ");
	    	return ""===cellval?$.fn.fmatter.defaultFormat(cellval,opts):cellval;
	    }
/* UNFORMATTER PARA UNA COLUMNA TIPO SELECT QUE PERMITE RETORNAR LA DESCRIPCION DEL ID QUE CONTENGA DENTRO DE LA CELDA, A PARTIR DE DATOS EN UNA VARIABLE 
*  EN CONJUNTO CON EL SuperSelectFormatter SE PUEDE CREAR UN SELECT DINAMICO 
*  REQUISITOS:
*  LA VARIABLE DEBE TENER LOS DATOS DE LA FORMA ID:DESCRIPCION; ---> SE PUEDE USAR LoadSelect
*  unformat :superSelectUnformatter
*  edittype: 'select', 
 	editoptions:{
		 value: function(){return VARIABLE;}
   		       }
*  NO USAR jsonmap
* */	    
	    function superSelectUnformatter(cellval,opts, model,act){
	    	//alert("unformat: "+cellval);
	    	var nuevo= opts.colModel.editoptions.value+"";
	    	var com;
	    	var ter;
	    	com=nuevo.indexOf("return");
	    	ter=nuevo.indexOf(";");
	    	var variable=nuevo.substring(com+6,ter);
	    	var contiene=eval(variable);
	    	//alert(contiene);
	    	var sv=""+cellval,ret=[];    	
	    	var so = contiene.split(";");
	    	for(var i=0; i<so.length;i++){
	    	sv = so[i].split(":");
	    	if(sv.length > 2 ) {
	    	sv[1] = jQuery.map(sv,function(n,i){if(i>0) { return n;}}).join(":");
	    	}
	    	//alert($.trim(sv[0])+":"+$.trim(sv[1])+"-->"+$.trim(cellval));
	    	if($.trim(sv[1])==$.trim(cellval)) {
	    	ret[0] = sv[0];
	    	break;
	    	}
	    	}
	    	cellval = ret.join(", ");
	    	return cellval;
	    }
	    
/* FORMATTER PARA UNA COLUMNA TIPO CHECKBOX QUE ELIMINA EL ERROR QUE CUANDO SE HACE CLICK DENTRO DEL CUADRO DEL MISMO CHECKBOX NO SE ACTIVA
 * LA FUNCION DE EDITAR DEL JQGRID 
 * REQUISITOS:
 * formatter: superCheckboxFormatter
 * unformat: superCheckboxUnformatter,
 * edittype: 'checkbox'
 * */
	    function superCheckboxFormatter (cellValue, options) {
	   	 var op = $.extend({}, $.jgrid.formatter.checkbox, options.colModel.formatoptions);
	   	 if ($.fmatter.isEmpty(cellValue) || cellValue === undefined) {
	   	 cellValue = $.fn.fmatter.defaultFormat(cellValue, op);
	   	 }
	   	 cellValue = String(cellValue).toLowerCase();
	   	 if (op.disabled === true) {
	   	 return '<div style="position:relative"><input type="checkbox"' +
	   	 (cellValue.search(/(false|0|no|off)/i) < 0 ? " checked='checked' " : "") +
	   	 ' value="' + cellValue + '" offval="no" disabled="disabled"' +
	   	 '/><div title="' + (options.colName || options.colModel.label || options.colModel.name) +
	   	 '" style="position:absolute;top:0px;left:0px;right:100%;bottom:100%;background:white;width:100%;height:100%;zoom:1;filter:alpha(opacity=0);opacity:0;"></div></div>';
	   	 } else {
	   	 return '<input type="checkbox"' +
	   	 (cellValue.search(/(false|0|no|off)/i) < 0 ? " checked='checked' " : "") +
	   	 'title="' + (options.colName || options.colModel.label || options.colModel.name) + '/>';
	   	 }
	    }
	    function superCheckboxUnformatter (cellValue, options, elem) {
	   	 var cbv = (options.colModel.editoptions) ? options.colModel.editoptions.value.split(":") : ["Yes", "No"];
	   	 return $('input', elem).is(":checked") ? cbv[0] : cbv[1];
	    }

/* FUNCION QUE RETORNA UN OBJECT A PARTIR DE LO QUE CONTENGA UN FORMULARIO
 * REQUISITOS:
 * LOS OBJETOS DENTRO DEL FORMULARIO DEBEN CONTENER EL name QUE SER� EL QUE SE TOMAR� AL MOMENTO DE LA DEVOLUCION DEL OBJECT
 * PARA USARLO SE LLAMAR� DE LA SIGUIENTE MANERA: $("#ID_FORM").serializeObject
 * DEVOLUCION: {name:'LO QUE CONTENGA EL OBJETO'}
 *  
 */
	    
$.fn.serializeObject = function(){
	        var o = {};
	        var a = this.serializeArray();
	        $.each(a, function() {
	            if (o[this.name] !== undefined) {
	                if (!o[this.name].push) {
	                    o[this.name] = [o[this.name]];
	                }
	                o[this.name].push(this.value || '');
	            } else {
	                o[this.name] = this.value || '';
	            }
	        });
	        return o;
	    };
	    
function exportarExcel(dhtml,url,param){
	var cab = new Array();
	var config = new Array();
	var i = dhtml.getColumnsNum();
	for(var x=0;x<i;x++){
		cab.push({label:dhtml.getColLabel(x), width:dhtml.getColWidth(x), hidden:dhtml.isColumnHidden(x)});
		config.push({id:dhtml.getColumnId(x),type:dhtml.getColType(x),hidden:dhtml.isColumnHidden(x)});
	}
	var datos ="{";
	datos+="\"cabecera\":"+JSON.stringify (cab)+",";
	datos+="\"configCabecera\":"+JSON.stringify (config);
	datos+="}";
	console.log(datos);
	var body = document.getElementsByTagName('body')[0];
	var form = document.createElement('form');
		form.setAttribute('id','formExportarExcel');
		form.setAttribute('style','display: hidden');
		form.setAttribute('php',url);
		form.setAttribute('method','POST');
		form.innerHTML = "<input type='hidden' id='datosExportarExcel' name='datos' value=''/>";
		body.appendChild(form);
	$("#datosExportarExcel").val(datos);
	$("#formExportarExcel").submit();
	var nodo = document.getElementById("formExportarExcel");
	if(nodo){
		padre.removeChild(nodo);
		console.log("Eliminado")
	}
	}
function fechaToString(fecha){try{var sp=fecha.split("-"); if(sp[2] === undefined || sp[1] === undefined || sp[0] === undefined) return ""; else return sp[2]+"/"+sp[1]+"/"+sp[0];}catch(ex){return "";} }

function formateaNumero(numero, decimales, separador_decimal, separador_miles){
    numero=parseFloat(numero);
    if(isNaN(numero)){
        return "";
    }

    if(decimales!==undefined){
        // Redondeamos
        numero=numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

    if(separador_miles){
        // A�adimos los separadores de miles
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
        while(miles.test(numero)) {
            numero=numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}

function stringToDate(fecha){
	 var resp = "";
	 try{
		 var d = fecha.split("/");
		 resp = d[2]+"-"+(d[1])+"-"+d[0];
	 }catch(ex){}
	return resp;
}