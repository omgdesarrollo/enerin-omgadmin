var $popUp,$estatuspopUp,$dhxWins;
function createDataProcessor(e,a){var t=new dataProcessor;  t.styles.invalid="color:#FA5882;";	t.styles.invalid_cell ="color:#FA5882;";     return t.setUpdateMode("off"),t.enableDataNames(!0),void 0!=a&&(t.editable=a),t.init(e),t}
function processGrid(dp,sids,response,oper){ 	$.each(response, function(index, value){ dp.setUpdated(sids[index], false, "");	if (oper==='del') dp.callEvent("deleteCallback",[sids[index], sids[index], null]); 	});  }
function delDataGrid(e,t,l){var d,n=t,o=0,a=[],s=[];return e.obj.editStop(),$.each(null==e.obj.getSelectedRowId()?[]:e.obj.getSelectedRowId().split(","),function(t,u){status=e.getState(u),"inserted"==status?e.callEvent("deleteCallback",[u,u,null]):(d=e._getRowData(u),s.push(u),e.setUpdated(u,!0,"deleted"),$.each(n,function(e,t){a.push(l+"["+o+"]."+t+"="+encodeURIComponent(d[t]))}),a.push(l+"_op["+o+"]=del"),o++)}),{valid:s.length>0?!0:!1,process:s.length>0?!0:!1,sids:s,request:a.join("&")}}
function populaSelect (sel, obj,c,d){  	$(sel).empty().append( "<option value=''>Seleccione</option>"); 	$.each(obj, function(index, item) { $(sel).append("<option value='"+item[c]   +"'>" + item[d] + "</option>");});    }
function clearProcessor(){ for (i = 0; i < arguments.length; i++) { arguments[i].updatedRows=[];}}
//Inicializa toolbar
function inicializarToolbar(parent,bNuevo,bEditar,bBorrar ,bImprimir,bRefresh,data,extraimp){
	var items=	[
	          	 {type: "button", id: "nuevo", img: "new.gif",img_disabled: "new_dis.gif",tooltip:"Nuevo"},
	          	 {type: "button", id: "guardar", img: "save.gif",img_disabled: "save_dis.gif" ,tooltip:"Guardar"}, 
	          	 {type: "button", id: "borrar", img: "borrar.png",img_disabled: "borrar_dis.png",tooltip:"Borrar"},
	          	 {type: "separator", id: "sep1"},
	          	(extraimp==null)?{type: "button", id: "imprimir", img: "print.gif",img_disabled: "print_dis.gif"}:{type: "buttonSelect", id: "imprimir", img: "print.gif",img_disabled: "print_dis.gif",options:extraimp}
	          	 ].concat(bRefresh?[{type: "button", id: "refrescar", img: "refreshtb.png",img_disabled: "refreshtb.png"}]:[])
	          	 .concat((data==null)?[]:data);	
	tb = new dhtmlXToolbarObject({ parent: parent, icons_path: "./imagenes/base/", items:items});    
	$("#forma").cancelSubmit = true;
	formulario				= $("#forma").find('input,select,textarea');

	"1"!=bNuevo&&"1"!=bEditar&&(tb.disableItem("guardar"),deshabilitaFormulario()),"1"!=bBorrar&&tb.disableItem("borrar"),"1"!=bImprimir&&tb.disableItem("imprimir");
	
	$.each(items, function(i, o) { 
		if (o.tooltip!=undefined) 	tb.setItemToolTip(o.id, o.tooltip); 
	});

}
/*Crea un toolbar(objeto tb) para la autorización
 * El botón id = guardar_firma
 * El radio name = autorizar value = 1: Autorizar, 0: Rechazar
 * el textarea id = txtObservaciones*/
function inicializarToolbarFirmante(parent){
	var htmlObservaciones =  "<fieldset id='dObservaciones' style='display:none'>";
	htmlObservaciones += "<legend><b>Motivo de Rechazo</b></legend>";
	htmlObservaciones += "<table style='width: 100%;' >";
	htmlObservaciones += "<tr><td><textarea id='txtObservaciones'></textarea></td></tr>";
	htmlObservaciones += "</table></fieldset>";
	$("#"+parent).after(htmlObservaciones);	
	
	var items=	[{type: "button", id: "guardar_firma", img: "save.gif",img_disabled: "save_dis.gif" ,tooltip:"Guardar"}];	
	tb = new dhtmlXToolbarObject({ parent: parent, icons_path: "./imagenes/base/", items:items});
	$.each(items, function(i, o) { 
		if (o.tooltip!=undefined) 	tb.setItemToolTip(o.id, o.tooltip); 
	});
	tb.addText('autorizar',2,'<input style="width:15px;" id="rdAceptar" name="autorizar" type="radio" value=1 onchange="$(\'#dObservaciones\').hide()"/>Autorizar');
	tb.addText('rechazar',3,'<input style="width:15px;" id="rdAceptar" name="autorizar" type="radio" value=0 onchange="$(\'#dObservaciones\').show()"/>Rechazar');
}
/*Obtiene los datos de la opcion de autorización de folio
 * tipo = 2: Autorizante, 3: Autorizante Vo. Bo.
 * retorna Objeto 
 * si tipo = 2 --> folio.autorizado = 1: Autorizar ó 0: Rechazar
 * si tipo = 3 --> folio.autorizadoVoBo = 1: Autorizar ó 0: Rechazar
 * si se rechaza retorna folio.observacion con el valor de textarea*/
function obtenerResultadoFirmante(tipo){
	var datos ={};
	var r =$("input:radio[name=autorizar]:checked").val();
	if(tipo==2){
		datos['folio.autorizado'] = r;
	}else if(tipo==3){
		datos['folio.autorizadoVoBo'] = r;
	}
	if(r==0){
		datos['folio.observacion'] = $("#txtObservaciones").val();
	}
	
	tb.disableItem("guardar_firma");
	return datos;
}

function getDataGrid(dp,arrayname){    	
	var cols=(dp.editable===undefined)?dp.obj.columnIds:dp.editable,item=0,request="",valid=true,data=[],dato; 	
	dp.obj.editStop();

	$.each(dp.updatedRows, function(index, id){ 
		dp.set_invalid(id,false); 
		valid=dp.checkBeforeUpdate(id);    	
		status=dp.getState(id);
		if(valid){ 
			dato=dp._getRowData(id);    
    		if (arrayname===undefined){	
    			var obj={};
    			$.each(cols, function(index, key){  obj[key]=dato[key]; });
    			if (! $.isEmptyObject(obj) )data.push(obj); 
    		}else{
	    		$.each(cols, function(index, key){ data.push(arrayname+"["+item+"]."+ key + "="+encodeURIComponent(dato[key])); });
	    		data.push(arrayname+"_op["+item+"]="+((status=='updated')?'edit':((status=='inserted')?'add':'del'))); 
    			item++; }
		} else return false;
	});	      	
	return {valid: valid, process: ((dp.updatedRows.length>0)?true:false), sids: dp.updatedRows.slice(), request: ((arrayname===undefined)?data:data.join("&"))};	    
}
/*Agrega texto en el dhtmlXPopup con nombre $popUP y lo hace visible cambiando el $estatuspopUp = false
 * inp = objeto donde hará referencia el popUp
 * texto = texto que se mostratá en el popUp*/
function showPopup(inp,texto) {
	$popUp.attachHTML(texto);
	if (!$popUp.isVisible()) {var x = window.dhx4.absLeft(inp); var y = window.dhx4.absTop(inp); var w = inp.offsetWidth;var h = inp.offsetHeight; $popUp.show(x,y,w,h);}
	$estatuspopUp=false;
}
/*
 * Inicializa un dhtmlxPopup
 * $popUp = Objeto dhtmlXPoup
 * $estatuspopUp = boolean que indica el uso del objeto, true = oculto, false = visible*/
function inicializarPopup(){
	$popUp = new dhtmlXPopup();
	$popUp.attachEvent("onHide", function(){$estatuspopUp=true;});
	$estatuspopUp = true;
}
/*
 * retorna el objeto celda del dhtmlXGrid
 * myGrid = dhtmlXGrid
 * id= id de la fila
 * ind = id de la columna*/
function getObjectCell(myGrid,id,ind){
	return myGrid.cellById(id, ind).cell;
}
/*
 * Retorna el nombre de la cabecera
 * dp = DataProcessor del dhtmlXGrid
 * cellIndex = indicador de la celda dentro del dhtmlXGrid
 * */
function getHeaderGrid(dp,cellIndex){
	return dp.obj.hdrLabels[cellIndex];
}
/*Valida que el dato escrito tenga el formato hh:mm,
 * si el dato está vacio abrirá el popUp haciendo referencia en la celda con el texto "El dato en +nombreHeaderColumn+ es requerido",
 * si el dato no está vacio y el formato no se cumple se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe tener el formato hh:mm"
 * value = dato capturado
 * id = id fila
 * ind = id columna
 * Nota: se recomienda su uso en el setVerificator() del dataProcessor del grid*/
function is_time(value,id,ind){
	if($popUp==undefined){inicializarPopup();}
	if(value=="") if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> es requerido");return false;}
	var res=(/^(0\d|1\d|2[0-3]):([0-5]\d)$/.test(value));
	if(res)	return true;
	else if($estatuspopUp){showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe tener el formato hh:mm");return false;}
}
/*Valida que el dato escrito sea tenga el formato hh:mm y permite datos en blanco
 * si el formato no se cumple se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe tener el formato hh:mm"
 * value = dato capturado
 * id = id fila
 * ind = id columna
 * Nota: se recomienda su uso en el setVerificator() del dataProcessor del grid*/
function is_time_empty(value,id,ind){
	if($popUp==undefined){inicializarPopup();}
	var res=(/^(0\d|1\d|2[0-3]):([0-5]\d)$/.test(value));
	if(res)	return true;
	else if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe tener el formato hh:mm");return false;}
}
/*Valida que el dato no esté vacio
 * si el dato está vacio se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ es requerido"
 * value = dato capturado
 * id = id fila
 * ind = id columna
 * Nota: se recomienda su uso en el setVerificator() del dataProcessor del grid*/
function not_empty(value,id,ind){
	if($popUp==undefined){inicializarPopup();}
	var res=(value!="");
	if(res)	return true;
	else if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> es requerido");return false;}
}
/*Valida que el dato escrito sea un numero entero o decimal
 * si el dato está vacio abrirá el popUp haciendo referencia en la celda con el texto "El dato en +nombreHeaderColumn+ es requerido",
 * si el dato no está vacio, el número es negativo o es cero, se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe ser un número mayor a cero"
 * si el dato no está vacio y no es un numero se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe ser un número"
 * value = dato capturado
 * id = id fila
 * ind = id columna
 * Nota: se recomienda su uso en el setVerificator() del dataProcessor del grid*/
function is_number(value,id,ind){
	if($popUp==undefined){inicializarPopup();}
	if(value=="") if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> es requerido");return false;}
	var numero = !isNaN(value)?(value!==""?parseFloat(value):""):"-";
	if(numero!=="" && numero !=="-"){
		if(numero<=0){ if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe ser un número mayor a <b>cero</b>");return false;}}else{return true;}
	}else if(numero==="-"){ if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe ser un número");return false;}}
}
/*Valida que el dato escrito sea un numero entero o decimal y permite datos en blanco
 * si el número es negativo o cero se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe ser un número mayor a cero"
 * si el formato no se cumple se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe ser un número"
 * value = dato capturado
 * id = id fila
 * ind = id columna
 * Nota: se recomienda su uso en el setVerificator() del dataProcessor del grid*/
function is_number_empty(value,id,ind){
	if($popUp==undefined){inicializarPopup();}
	var numero = !isNaN(value)?(value!==""?parseFloat(value):""):"-";
	if(numero!=="" && numero !=="-"){
		if(numero<=0){if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe ser un número mayor a <b>cero</b>");return false;}}
		else{return true;}}else if(numero==="-"){ 
		if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe ser un número");	return false;}
		}else{return true;}
}
/*Valida que el dato escrito sea un numero entero o decimal
 * si el dato está vacio abrirá el popUp haciendo referencia en la celda con el texto "El dato en +nombreHeaderColumn+ es requerido",
 * si el dato no está vacio, el número es negativo, se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe ser un número mayor o igual cero"
 * si el dato no está vacio y no es un numero se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe ser un número"
 * value = dato capturado
 * id = id fila
 * ind = id columna
 * Nota: se recomienda su uso en el setVerificator() del dataProcessor del grid*/
function is_number_zero(value,id,ind){
	if($popUp==undefined){inicializarPopup();}
	if(value=="") if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> es requerido");return false;}
	var numero = !isNaN(value)?(value!==""?parseFloat(value):""):"-";
	if(numero!=="" && numero !=="-"){
		if(numero<0){ if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+((this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))==""?this.getColLabel(ind,1):(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind)))+"</b> debe ser un número mayor o igual <b>cero</b>");return false;}}else{return true;}
	}else if(numero==="-"){ if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe ser un número");return false;}}
}
/*Valida que el dato escrito sea un numero entero o decimal, permite datos en blanco y cero
 * si el dato no está vacio, el número es negativo, se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe ser un número mayor o igual a cero"
 * si el dato no está vacio y no es un numero se abrirá el popUp haciendo referencia en la celda con el texto "El dato ingresado en +nombreHeaderColumn+ debe ser un número"
 * value = dato capturado
 * id = id fila
 * ind = id columna
 * Nota: se recomienda su uso en el setVerificator() del dataProcessor del grid*/
function is_number_zero_empty(value,id,ind){
	if($popUp==undefined){inicializarPopup();}
	var numero = !isNaN(value)?(value!==""?parseFloat(value):""):"-";
	if(numero!=="" && numero !=="-"){
		if(numero<0){if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe ser un número mayor o igual a <b>cero</b>");return false;}}
		else{return true;}}else if(numero==="-"){ 
		if($estatuspopUp){this.selectRow(this.getRowIndex(id),true,false,true);showPopup(getObjectCell(this,id,ind),"El dato ingresado en <b>"+(this.getColLabel(ind)==""?(this.getColLabel(ind,1)==""?this.getColLabel(ind,2):this.getColLabel(ind,1)):this.getColLabel(ind))+"</b> debe ser un número");	return false;}
		}else{return true;}
}
function clearProcessor(){
	 for (i = 0; i < arguments.length; i++) {arguments[i].updatedRows=[];}    	 
}
/*limpia y agregar opciones de seleccion a un objeto dhtmlxCombo dentro de un dhtmlXGrid
 * gr = dhtmlXGrid
 * i = index de la columna del dhtmlXGrid
 * data = arrayList con los datos para las opciones del combo*/
function addComboGrid(gr,i,data){
	cmb = gr.getColumnCombo(i);	cmb.clearAll();	cmb.addOption(data); cmb.readonly(true);
}
/*Retorna un arreglo con el formato para el dhtmlxCombo del dhtmlXGrid
 * url = url donde obtendrán los datos con el formato List<ListaCombo> */
function arrayListCombo(u){
	var lista=[];
	$.ajax({url:u, async: false, success: function(response) {$.each(response, function(index, valor){var a = {};a.value=valor.sid;	a.text=(valor.descripcion==undefined?"":valor.descripcion);lista.push(a);});}});
	return lista;
}
/*limpia y agregar opciones de seleccion a un objeto dhtmlxCombo
 * dhtlxCombo = objeto inicializado del dhtlxCombo
 * url = url donde obtendrán los datos con el formato List<ListaCombo> */
function createCombo(dhtmlxCombo,url){
	var lista=[];
	 $.ajax({
			url 		: url,
			async		: false,
			success 	: function(response) {		
	    	 $.each(response, function(index, value){
	    		var a=[];
	    		a.push(value.sid)
	    		a.push(value.descripcion)
				lista.push(a);
			 });
				}
		});
	 dhtmlxCombo.clearAll();
	 dhtmlxCombo.addOption(lista);
}
/*agrega una mascara para la edición de una celda del dhtmlXGrid
 * dp = dataProcessor del dhtmlXGrid
 * colLabel = header de la columna al que le agregará la mascara
 * dmask = mácara a agregar
 * Nota: la mascara ya tiene que estar inicializada, se realizó para el attachEvent "onEditCell" del dhtmlXGrid*/
function addMaskGrid(stage,cInd,indexColumn,dmask){
	if(cInd==indexColumn && stage==1)
		$(".dhx_combo_edit").mask("?"+dmask);
}
/*Completa los dígitos para el formato de hora
 * grid = dhtmlXGrid
 * stage = estatus de la edicion
 * rId = id fila
 * cInd = id Columna
 * nValue = valor nuevo en la edicion de la celda
 * indexColumn = columna donde se agregará la funcion de completar
 * Nota: se realizó para el attachEvent "onEditCell" del dhtmlXGrid */
function fullTime(grid,stage,rId,cInd,nValue,indexColumn){
	if (cInd==indexColumn && stage===2){var valor = "";	for(var i=0;i<5;i++){if(nValue.substring(i,i+1)!="_" && nValue.substring(i,i+1)!=":"){valor +=nValue.substring(i,i+1);}}
	switch(valor.length){
	case 1: valor = "0"+valor+":00"; break;
	case 2:	if(parseInt(valor)>=24){valor = "23:59";}else{valor = valor+":00";}break; 
	case 3: if(parseInt(valor)>=240){valor = "23:59";}else{valor = valor.substring(0,2)+":"+valor.substring(2,3)+"0";}break; 
	case 4: if(parseInt(valor)>=2400){valor = "23:59";}else{valor = valor.substring(0,2)+":"+valor.substring(2,4);} break;}
	grid.cellById(rId,cInd).setValue(valor);}
}

/*Crea y retorna un Dialog*/
function createDialogFind(obj,titulo,ancho,alto,resize,bar){
	if($dhxWins==null)
		$dhxWins = new dhtmlXWindows();
	var sid=(new Date()).valueOf();
	var w = $dhxWins.createWindow({id:sid,text:titulo,width:ancho,  height:alto,  center:true,resize: resize,park:false,modal:false	});
	w.button("close").attachEvent("onClick", function(){w.hide(); w.setModal(false); return false; });w.setIconCss("iconimr"); 	w.centerOnScreen();
	if(bar)
		w.attachStatusBar({text: "<div id='" + obj + "'></div>",	paging: true	});
	return w;
}