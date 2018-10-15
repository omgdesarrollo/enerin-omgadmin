	var intervalo;
	var $requerido				=null;
	var formulario				= null;
	
	var oper						="add";
	 var listadoFolios			=[];
	 var pos_var=0;
	function inicializarFormulario( bNuevo,bEditar,bBorrar ,bImprimir){
		$("#btnNuevo").button({ icons : { primary : "ui-icon-document" }, text : false });
		$("#btnGuardar").button({ icons : { primary : "ui-icon-disk" }, text : false });
	    $("#btnBorrar").button({ icons : { primary : "ui-icon-trash" }, text : false });
		$("#btnImprimir").button({ icons : { primary : "ui-icon-print" }, text : false });	

		if (bNuevo!='1' && bEditar!='1' ) $("#btnGuardar").addClass("ui-state-disabled").prop( "disabled", true );
		if (bBorrar!='1') $("#btnBorrar").addClass("ui-state-disabled").prop( "disabled", true );
		if (bImprimir!='1')	 $("#btnImprimir").addClass("ui-state-disabled").prop( "disabled", true );
		
		$("#forma").cancelSubmit = true;
		//Cargar elementos del formulario en variables para no leer cada que se usen debido a que afectan el performance
		formulario				= $("#forma").find('input,select,textarea');
		
		if (bNuevo!='1' && bEditar!='1' ) {deshabilitaFormulario(); $("#btnNuevo").addClass("ui-state-disabled").prop( "disabled", true );}
	}
	function crearBtnMulti(){
		$("#btnInicio").button({ icons:{ primary: "ui-icon-seek-first" }, text: false }).css("height", "20px").css("width", "20px");
		$("#btnUltimo").button({ icons:{ primary: "ui-icon-seek-end" }, text: false }).css("height", "20px").css("width", "20px");
		$("#btnAdelante").button({ icons:{ primary: "ui-icon-seek-next" }, text: false }).css("height", "20px").css("width", "20px");
		$("#btnAtras").button({ icons:{ primary: "ui-icon-seek-prev" }, text: false }).css("height", "20px").css("width", "20px");
	}
	
	function limpiarFormulario(callback){
		formulario.each(function() {
			switch (this.type) {
			case 'password':
			case 'select-multiple':
			case 'select-one':
			case 'text':
			case 'hidden':
			case 'textarea':
				$(this).val('');
				break;
			case 'checkbox':
			case 'radio':
				this.checked = false;
			}
		});
		cerrar_alert();
		oper	="add";	
		if ($requerido!=null) $requerido.removeClass( "has-error" );
		if ( callback!=null)callback();
	}
	
	function deshabilitaFormulario(){
		formulario.each(function() {
			$(this).attr('disabled', 'disabled');
		});
	}
	
	function habilitaFormulario(){
		formulario.each(function() {
			$(this).removeAttr('disabled', 'disabled');
		});
	}
	
	function populaFormulario(obj){
		formulario.each(function() {
			var elemento = this;
			try{
				if(elemento.type == "select-one" || elemento.type == "text" || elemento.type == "textarea" || elemento.type == "password" || elemento.type  == "hidden"){
					try{
					if($(elemento).attr("class").indexOf('fecha') != -1){
						var sp = eval("obj."+elemento.name).toString().split("-");
						$("#"+elemento.id).val(sp[2]+"/"+sp[1]+"/"+sp[0]);
					}else{
						$("#"+elemento.id).val(eval("obj."+elemento.name));
					}
					}catch(ex){
						$("#"+elemento.id).val(eval("obj."+elemento.name));
					}
				}else if(elemento.type == "radio"){
						$('input[name="'+elemento.name+'"][value="'+eval("obj."+elemento.name)+'"]').prop("checked", true);
				}else if(elemento.type == "checkbox"){
						var bol = eval("obj."+elemento.name);
						if(bol.toString() == "0")
							bol = false;
						else if(bol.toString() == "1")
							bol = true;
						$("#"+elemento.id).prop("checked", bol);
				}
			}catch(ex){}
	    });
	}
	
	function validaFormulario(bimp){
		var error = "";
		valido=true;
		if ($requerido!=null) $requerido.removeClass( "has-error" );
		var sel;
		formulario.each(function() {
			if($(this).attr("class") === undefined)
				return;
			var clase = $(this).attr("class");
			var alt = $(this).attr("alt");
			sel = this;
			if(clase.indexOf("requerido") != -1 && $(this).val() == ""){
				error = "<Strong><em>" + alt  +  '</em></Strong> es un dato requerido para guardar la informaci\xf3n';
				return false;
			}else{
				if($(this).val() != ""){
					if(clase.indexOf("numero") != -1 && !(/^([0-9])*$/.test($(this).val())) ){
						error = "<Strong><em>" + alt  +  '</em></Strong> debe contener un dato en formato num\xe9rico';
						return false;
					}
					if(clase.indexOf("decimal") != -1 && !(/^([0-9])*[.]?[0-9]*$/.test($(this).val())) ){
						error = "<Strong><em>" + alt  +  '</em></Strong> debe contener un dato en formato decimal';
						return false;
					}
					if(clase.indexOf("fecha") != -1 && !(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test($(this).val())) ){
						error = "<Strong><em>" + alt +  '</em></Strong> debe contener un dato en formato dd/mm/yyyy';
						return false;
					}
				}
			}
		});
		if(bimp === undefined){
			$("#dAlert").hide('slow');
			clearInterval(intervalo);
			if(error != ""){
				abrirAlert( error,-1);
				valido = false;
				$requerido = $(sel);
				$requerido.addClass( "has-error" );		
				$(sel).focus();
				return false; 	
			}	
			return valido;
		}else{
			return error;
		}
	}
	
	function abrirDialogo(paramNameDialog){ $(paramNameDialog).dialog('open'); }
	function crearAutoCompletar(e,t,o,a,n){$(t).autocomplete({source:function(t,a){$.ajax({url:e,type:"GET",global:!1,async:!1,data:{term:t.term.toUpperCase()},success:function(e){void 0!=n&&(e=e.data),a($.map(e,function(e){return{label:e[o],value:e[o],result_var:e}}))}})},minLength:2,select:function(e,o){$(t).val(o.item.label),a&&a(o.item.result_var)},response:function(e,t){},open:function(){$(this).removeClass("ui-corner-all").addClass("ui-corner-top")},close:function(){$(this).removeClass("ui-corner-top").addClass("ui-corner-all")},autoFocus:!0})}
	/*
	function crearAutoCompletar(myUrl,nameObject,nameField, callback ){
		$(nameObject).autocomplete(
				{
					source : function(request, response) {
						$.ajax({
							url 		: myUrl,
							type 		: "GET",
							global 	: false,
							async 	: false,
							data 		: {term : request.term.toUpperCase() },
							success 	: function(data) {
								response($.map(data, function(item) {	
									return {
										label			: item[nameField],
										value		 	: item[nameField],
										result_var	: item 
										};
								}));								
							}
						});
					},
					minLength : 2,
					select : function(event, ui) {
						$(nameObject).val(ui.item.label);
						if( callback )
							callback(ui.item.result_var);
					},
					response: function(event, ui) {
						//$(this).element.attr( "title", $(this).val() + " no tuvo ninguna coincidencia" ).tooltip( "open" );
			           if (ui.content.length === 0) abrirAlert("<em>No se encontraron coincidencias</em></strong>",-1);			          
			           else cerrar_alert();
			        },
					open : function() { 	$(this).removeClass("ui-corner-all").addClass("ui-corner-top"); 	},
					close : function() { 	$(this).removeClass("ui-corner-top").addClass("ui-corner-all"); 	},
					autoFocus: true
				});
	}*/
	
	function habilitarBtn(bTipo){
		if (bTipo){
			$('#btnInicio').removeAttr('disabled');  
			$('#btnAtras').removeAttr('disabled');  
			$('#btnAdelante').removeAttr('disabled');  
			$('#btnUltimo').removeAttr('disabled');  		
		}else	{
			$('#btnInicio').attr('disabled', 'disabled');
			$('#btnAtras').attr('disabled', 'disabled');
			$('#btnAdelante').attr('disabled', 'disabled');
			$('#btnUltimo').attr('disabled', 'disabled');
			} 	}
	
	function getIndexFolio(folio){
		for (var i = 0; i < (listadoFolios.length); i++) {			 
			 if (listadoFolios[i]==folio)
				 return i;
		}
		return 0;
	}
	
	function moverRegistro(nTipo,calback){
		var sizeLista=listadoFolios.length-1;
		var bConsultar=false;
		
		if (nTipo ==0){
			pos_var	=0;bConsultar=true;}
		else if ((nTipo ==1)&&((pos_var-1)>=0))
			{pos_var	= pos_var -1;bConsultar=true;}
		else if(((nTipo ==2)&&((pos_var+1)<=sizeLista)))
			{pos_var	= pos_var +1;bConsultar=true;}
		else if (nTipo ==3)
			{pos_var	=sizeLista;bConsultar=true;}
		else if (nTipo ==4)
			bConsultar=true;
		
		if (bConsultar){
			nPos = pos_var + 1;
			sizeLista++;
			$("#txtInfo").val(nPos.toString() + " de " + sizeLista.toString() +"");
			try {
				$("#folio").val(listadoFolios[pos_var]);		
				if (calback) calback(); 
				}catch(err){}		
		}
	}
	
	function inicializarpaginas(calback){
		if (listadoFolios.length>0){
			pos_var	=listadoFolios.length-1;
			moverRegistro(0,calback);	
			habilitarBtn(true);				
		}else
			habilitarBtn(false);
	}
	
	function getDataRowsGrid(dp){    	
		var cols=dp.obj.columnIds,valid=true,data=[],dato,opers=[]; 	
		dp.obj.editStop();

		$.each(dp.updatedRows, function(index, id){ 
			dp.set_invalid(id,false); 
			valid=dp.checkBeforeUpdate(id);    	
			if(valid){ 
				dato=dp._getRowData(id);   
				status=dp.getState(id);
				opers.push(((status=='updated')?'edit':((status=='inserted')?'add':'del')));
	    		var obj={};
	    		$.each(cols, function(index, key){ if (dp._columns[index])	obj[key]=dato[key]; 		});
	    		if (! $.isEmptyObject(obj) )data.push(obj); 
			} else return false; });	      	
		return { valid: valid, 	process: ((dp.updatedRows.length>0)?true:false), sids: dp.updatedRows.slice(), 	request: data, opers:opers};	    
	}
	
	function processGridUpdateRows(dp,sids,response,oper){
	 	$.each(response, function(index, value){ 
	 		dp.setUpdated(sids[index], false, "");						
	 		if (oper==='del') dp.callEvent("deleteCallback",[sids[index], sids[index], null]);     
	 		else if  (oper==='add' || oper==='edit'){
	 			var o=JSON.parse(value);
	 			for (var key in o) 
	 				dp.obj.cellById(sids[index],dp.obj.getColIndexById(key)).setValue(o[key]);
	 		}
			});
	 }
	function clearDeleteRow(dp){  	$.each(sids, function(index, value){
		if (dp.getState(value)==='deleted')
		dp.setUpdated(value, false, "deleted");	
		});  }

	function markDeleteRow(dp){
		dp.obj.editStop();
		var sids=(dp.obj.getSelectedRowId()==null)?[]:dp.obj.getSelectedRowId().split(",");	
		$.each(sids, function(index, id){ 
			if (dp.getState(id)==='inserted') {
				dp._invalid[id]=false;		
				dp.callEvent("deleteCallback",[{"status":"ok"}, id, null]);   }
			else
				dp.setUpdated(id, true, "deleted");	
			});	 
	}
	