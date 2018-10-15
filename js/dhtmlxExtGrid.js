dhtmlXGridObject.prototype.hideColumns= function(){	for (i = 0; i < arguments.length; i++) { this.setColumnHidden(arguments[i],true);	} }
dhtmlXGridObject.prototype.formatCurrency=function(){	for (i = 0; i < arguments.length; i++) { this.setNumberFormat("0,000.00",arguments[i],".",",");	} }
dhtmlXGridObject.prototype.__extraParam=function(){	var data=[]; for (var key in this.customParam) {	data.push(key +'=' + encodeURIComponent(this.customParam[key]));   } return data.join('&');}

dhtmlXGridObject.prototype.__extraFilters=function(indexes,values){
	var r=this.customFilter.slice();
	for (i = 0; i < indexes.length; i++) { 	if (values[i]!='') r.push({ field: this.columnIds[indexes[i]], op:this.op[indexes[i]],data:values[i]}); }	
	return (r.length>0)?'filters='+encodeURIComponent(JSON.stringify({groupOp:'AND',rules:r})):''
}

dhtmlXGridObject.prototype.enableToolBarPager=function(idobj){
	this.enablePaging(true,100,null,idobj);
 	this.setPagingWTMode(true,true,true,[100,200,300,500])
 	this.setPagingSkin("toolbar");
} 
dhtmlXGridObject.prototype.initExtend=function(myUrl,editable,customFilter,customParam,fndata){
	var dhtmlGrid = this;
	this.opers();
	this.customFilter=customFilter;
	this.customParam=customParam;
	this.URL=myUrl;
	this.lastURL="";
	editable&&this.enableEditEvents(!0,!0,!0);
	this.setStyle("","font: 11px arial, sans-serif;","","");
	this.attachEvent("onXLS", function(grid_obj){  blockpage();return true; });
	this.attachEvent("onXLE", function(grid_obj,count){  if (fndata!=null) fndata(grid_obj,count); unBlockpage(); });
	
	this.attachEvent("onFilterStart", function(indexes,values){
		a=this.__extraFilters(indexes,values);
		b=this.__extraParam();
		u=this.URL;
		u+=(a!='')?( ( (u.indexOf("?")!=-1)?"&":"?")  +a ):'';
		u+=(b!='')?( ( (u.indexOf("?")!=-1)?"&":"?")  +b ):'';
		/* paginado */
		if(this.page!=undefined){
		if(this.eventPage!=undefined && !this.eventPage)
			this.page=1;
		u+=(this.rows!=undefined)?( ( (u.indexOf("?")!=-1)?"&":"?")  +"rows="+this.rows ):'';
		u+=(this.page!=undefined)?( ( (u.indexOf("?")!=-1)?"&":"?")  +"page="+this.page ):'';
			this.eventPage=true;
			this.clearAddRowListObject(u,null);
			this.eventPage=false;
		}else{
			this.clearAndLoad( u,null,'js' );	
		}
		this.lastURL=u;
		return false;	});
}

dhtmlXGridObject.prototype.resetFilters = function(){
    if (!!this.filters){
        for(var i=0;i<this.filters.length;i++){
            if (!!this.filters[i][0]) {
            	if(this.filters[i][0].firstChild!=null){
            		this.filters[i][0].firstChild.value="";
            	}
                this.filters[i][0].old_value="";
                this.filters[i][0].value="";
            }
        }
        this.filterBy(0,"");
    }
};

dhtmlXGridObject.prototype.addButtonsPager= function(o){	
	this.btnpager={ };	
	if (this.aToolBar===undefined) this.parse([],'js');
	 for(var i=0;i<o.length;i++){
		this.aToolBar.addButton(o[i].id, i, o[i].text, o[i].img,  o[i].img);	
		if (o[i].tooltip!=undefined) 	this.aToolBar.setItemToolTip(o[i].id, o[i].tooltip); 
		this.btnpager[o[i].id]=o[i].callback; }
	var grx001=this;
	this.aToolBar.addSeparator("sep0000", (o.length-1+1));
	this.aToolBar.attachEvent("onClick", function(id){	grx001.btnpager[id](grx001);	});
}

dhtmlXGridObject.prototype.reload= function(fn){
	if (this.filters!=undefined) this.resetFilters();	
	a=this.__extraFilters([],[]);
	b=this.__extraParam();
	u=this.URL;
	u+=(a!='')?( ( (u.indexOf("?")!=-1)?"&":"?")  +a ):'';
	u+=(b!='')?( ( (u.indexOf("?")!=-1)?"&":"?")  +b ):'';
	/* paginado */
	if(this.page!=undefined){
		this.page=1;
	u+=(this.rows!=undefined)?( ( (u.indexOf("?")!=-1)?"&":"?")  +"rows="+this.rows ):'';
	u+=(this.page!=undefined)?( ( (u.indexOf("?")!=-1)?"&":"?")  +"page=1"):'';
	this.eventPage=true;
	this.clearAddRowListObject(u,fn);
	this.eventPage=false;
	}else{
		this.clearAndLoad( u,fn,'js' );
	}	
	this.lastURL=u;
}

dhtmlXGridObject.prototype.opers = function(){
	if(this.op==undefined){
	var arrayOpers = [];
	var i = this.columnIds.length;
	for(var x=0;x<i;x++){
		arrayOpers[x] = "cn";
	}
	this.op = arrayOpers;
	}
}

dhtmlXGridObject.prototype._in_header_date_filter=function(t,i,d){
	var self = this;
	var idfecha = (new Date()).valueOf();
	var idSelect = (new Date()).valueOf();
	t.innerHTML="<div style='width:90%; margin-right: auto; margin-left: auto;'><div style='width:35%; float:left;'><select id='"+idSelect+"'><option value='eq'>=</option><option value='ge'>>=</option><option value='le'><=</option></select></div><div style='width:65%;float:left;'><input type='text' id='"+idfecha+"'></div></div>";
	t.onclick=t.onmousedown=function(a){
	       return(a||event).cancelBubble=!0
	}
	t.onselectstart=function(){
	       return event.cancelBubble=!0
	}	
	var f = getChildElement(t.firstChild.childNodes[1],idfecha+"");
	var s = getChildElement(t.firstChild.childNodes[0],idSelect+"")
	calendar = new dhtmlXCalendarObject([f]);
	calendar.setDateFormat("%d/%m/%Y");
	calendar.attachEvent("onClick",function(date){
    	self.filterByAll();
	});
	
	this.makeFilter(f,i);
	
	f._filter=function(){
        var a=this.value;
        if(a=="")
        	return "";
        self.op[i] = getChildElement(t.firstChild.childNodes[0],idSelect+"").value;
        return a;
     }
     s.onchange = function(){
    	 if(a!="")
    		 self.filterByAll();
     }
     return "";
}

dhtmlXGridObject.prototype._in_header_datetime_filter=function(t,i,d){
	var self = this;
	var idfecha = (new Date()).valueOf();
	var idSelect = (new Date()).valueOf();
	t.innerHTML="<div style='width:90%; margin-right: auto; margin-left: auto;'><div style='width:35%; float:left;'><select id='"+idSelect+"'><option value='eq'>=</option><option value='ge'>>=</option><option value='le'><=</option></select></div><div style='width:65%;float:left;'><input type='text' id='"+idfecha+"'></div></div>";
	t.onclick=t.onmousedown=function(a){
	       return(a||event).cancelBubble=!0
	}
	t.onselectstart=function(){
	       return event.cancelBubble=!0
	}	
	var f = getChildElement(t.firstChild.childNodes[1],idfecha+"");
	var s = getChildElement(t.firstChild.childNodes[0],idSelect+"")
	calendar = new dhtmlXCalendarObject([f]);
	calendar.setDateFormat("%d/%m/%Y %H:%i");
	calendar.attachEvent("onClick",function(date){
    	self.filterByAll();
	});
	
	this.makeFilter(f,i);
	
	f._filter=function(){
        var a=this.value;
        if(a=="")
        	return "";
        self.op[i] = getChildElement(t.firstChild.childNodes[0],idSelect+"").value;
        return a;
     }
     s.onchange = function(){
    	 if(a!="")
    		 self.filterByAll();
     }
     return "";
}
 
 function parseDate(input) {
   var parts = input.split('/');
   return new Date(parts[2], parts[0]-1, parts[1]).getTime();
 }

 function getChildElement(element,id) {
    for (i=0;i<element.childNodes.length;i++){
       if (element.childNodes[i].id == id)
          return element.childNodes[i];
    }
    return null;
 }
 
 dhtmlXGridObject.prototype._in_header_number_filter=function(t,i,d){
	 var self = this;
	 var idText = (new Date()).valueOf();
	 var idSelect = (new Date()).valueOf();
	 t.innerHTML="<div style='width:90%; margin-right: auto; margin-left: auto;'><div style='width:35%; float:left;'><select id='"+idSelect+"'><option value='eq'>=</option><option value='gt'>></option><option value='ge'>>=</option><option value='lt'><</option><option value='le'><=</option></select></div><div style='width:65%;float:left;'><input type='text' id='"+idText+"'></div></div>";
	 t.onclick=t.onmousedown=function(a){
		 return(a||event).cancelBubble=!0
	 }
	 t.onselectstart=function(){
	     return event.cancelBubble=!0
	 }	
	 var txt = getChildElement(t.firstChild.childNodes[1],idText+"");
	 var s = getChildElement(t.firstChild.childNodes[0],idSelect+"");
	 this.makeFilter(txt,i);
		
	 txt._filter=function(){
		 var a=this.value;
	     if(a=="")
	       	return "";
	     self.op[i] = getChildElement(t.firstChild.childNodes[0],idSelect+"").value;
	     return a;
	 }
	 s.onchange = function(){
		 if(a!="")
			 self.filterByAll();
	 }
	 return "";
}
 
dhtmlXGridObject.prototype._in_header_combocustom_filter=function(t,i,d){
	if(this[this.columnIds[i]]!=undefined){
	var self = this;
	var array = this[this.columnIds[i]];
	var idSelect = (new Date()).valueOf();
	var html = "<div style='width:90%; margin-right: auto; margin-left: auto;'><select id='"+idSelect+"'><option value=''> </option>";
	for(var x=0;x<array.length;x++){
		html+="<option value='"+array[x].value+"'>"+array[x].text+"</option>";
	}
	html+="</select></div>";
	 t.innerHTML=html;
	 var s = getChildElement(t.firstChild,idSelect+"");
	 if (!self.filters) self.filters=[];
	 self.filters.push([t.firstChild,i]);
	 s.onchange = function(){
		self.filters[i][0].value=s.value;
		self.filterByAll();
	 }
	self.opers();
	self.op[i] = "eq";
	}else{
		t.innerHTML="<div style='width:100%; padding-left:2px; overflow:hidden; ' class='combo'></div>";
		t.onselectstart=function(){ return (event.cancelBubble=true); }
		t.onclick=t.onmousedown=function(e){ (e||event).cancelBubble=true; return true; }
		this.makeFilter(t.firstChild,i);
	}
}
 
 dhtmlXGridObject.prototype.addRowListObject=function(list){
	 
	this.parse(list,'js');
 }
 
 dhtmlXGridObject.prototype.clearAddRowListObject=function(url,callback){
	 var data ={};
	 if(this.eventPage==undefined||!this.eventPage){
		 data.rows=100;
		 data.page=1;
	 }
	 var dhtmlxGrid = this;
		 dhtmlxGrid.clearAll();
			$.ajax({
				url:url,
				data: data,
				async:true,
				success: function(response) {
					dhtmlxGrid.addRowListObject(response.data);
					dhtmlxGrid.toolbarPagerConfig(response);
					if (response['userdata']!=undefined){
					    for (var key in response['userdata']) {
					    	dhtmlxGrid.setUserData("",key,response['userdata'][key]);
					    }			
				}
					}});
			 if( callback ) callback();		
 }
 /************ paginado ****************/
 dhtmlXGridObject.prototype.enableToolBarPager2=function(parent,o){
	 var dhtmlxGrid = this;
	 dhtmlxGrid.rows=100;
	 dhtmlxGrid.page=1;
     	       
	var items=	[{type: "button", id: "leftabs",img: "ar_left_abs.gif",img_disabled: "ar_left_abs_dis.gif"},
	          	 {type: "button", id: "left", img: "ar_left.gif",img_disabled: "ar_left_dis.gif"},
	          	 {type: "text", id: "TitlePerpagernum1", text: "Página", width:100},
	          	 {type: "buttonInput", id: "perpagernum", value:"1", width:20},
	          	 {type: "text", id: "TitlePerpagernum2", text: "de", width:15},
	          	 {type: "text", id: "pagernum", text: "1", width:20},
	          	 {type: "button", id: "right", img: "ar_right.gif",img_disabled: "ar_right_dis.gif"},
	          	 {type: "button", id: "rightabs", img: "ar_right_abs.gif",img_disabled: "ar_right_abs_dis.gif"},
	          	 {type: "buttonSelect", id: "pages", img: "paging_rows.gif", mode:"select",width:"65",selected:"pages_100", 
	    	       options:[
	    	           {id: "pages_100", type: "button", text: "100", img: "paging_page.gif"},
	    	           {id: "pages_200", type: "button", text: "200", img: "paging_page.gif"},
	    	           {id: "pages_300", type: "button", text: "300", img: "paging_page.gif"},
	    	           {id: "pages_400", type: "button", text: "400", img: "paging_page.gif"},
	    	           {id: "pages_500", type: "button", text: "500", img: "paging_page.gif"}]},
	    	     {type: "text", id: "results", text: "Sin registros que mostrar", width:150},
	          	 ];	
	dhtmlxGrid.toolbarPager = new dhtmlXToolbarObject({ parent: parent, icons_path: "./include/css/imgs/dhxgrid_skyblue/", items:items});
	dhtmlxGrid.toolbarPager.btnpager={ };	
	for(var i=0;i<o.length;i++){
		dhtmlxGrid.toolbarPager.addButton(o[i].id, i, o[i].text, o[i].img,  o[i].img);	
		if (o[i].tooltip!=undefined)dhtmlxGrid.toolbarPager.setItemToolTip(o[i].id, o[i].tooltip); 
		dhtmlxGrid.toolbarPager.btnpager[o[i].id]=o[i].callback; }
	dhtmlxGrid.toolbarPager.addSeparator("sep0000", (o.length-1+1));
	//this.toolbarPager=toolbarPager;
	dhtmlxGrid.toolbarPager.attachEvent("onClick", function(id){
		if(dhtmlxGrid.toolbarPager.btnpager[id]!=undefined)dhtmlxGrid.toolbarPager.btnpager[id](dhtmlxGrid.toolbarPager);
		dhtmlxGrid.eventPage=true;
		switch(id){
		case "leftabs":
			dhtmlxGrid.toolbarPager.enableItem("left");
			dhtmlxGrid.toolbarPager.enableItem("leftabs");
			dhtmlxGrid.toolbarPager.disableItem("rightabs");
			dhtmlxGrid.toolbarPager.disableItem("right");
			dhtmlxGrid.toolbarPager.setValue("perpagernum",1);
			dhtmlxGrid.page = 1;
			if(dhtmlxGrid.filters!=undefined){
				dhtmlxGrid.filterByAll();	
			}else{
				dhtmlxGrid.eventPageReload();
			}
			break;
		case "left":
			dhtmlxGrid.toolbarPager.enableItem("left");
			dhtmlxGrid.toolbarPager.enableItem("leftabs");
			if(dhtmlxGrid.page==2){
				dhtmlxGrid.toolbarPager.disableItem("rightabs");
				dhtmlxGrid.toolbarPager.disableItem("right");
			}
			dhtmlxGrid.toolbarPager.setValue("perpagernum",(dhtmlxGrid.page-1));
			dhtmlxGrid.page = dhtmlxGrid.page-1;
			if(dhtmlxGrid.filters!=undefined){
				dhtmlxGrid.filterByAll();	
			}else{
				dhtmlxGrid.eventPageReload();
			}
			break;
		case "right":
			dhtmlxGrid.toolbarPager.enableItem("rightabs");
			dhtmlxGrid.toolbarPager.enableItem("right");
			if(dhtmlxGrid.page==parseInt(dhtmlxGrid.toolbarPager.getItemText("pagernum"))){
				dhtmlxGrid.toolbarPager.disableItem("left");
				dhtmlxGrid.toolbarPager.disableItem("leftabs");
			}
			dhtmlxGrid.toolbarPager.setValue("perpagernum",(dhtmlxGrid.page+1));
			dhtmlxGrid.page = dhtmlxGrid.page+1;
			if(dhtmlxGrid.filters!=undefined){
				dhtmlxGrid.filterByAll();	
			}else{
				dhtmlxGrid.eventPageReload();
			}
			break;
		case "rightabs":
			dhtmlxGrid.toolbarPager.enableItem("rightabs");
			dhtmlxGrid.toolbarPager.enableItem("right");
			dhtmlxGrid.toolbarPager.disableItem("left");
			dhtmlxGrid.toolbarPager.disableItem("leftabs");
			dhtmlxGrid.toolbarPager.setValue("perpagernum",parseInt(dhtmlxGrid.toolbarPager.getItemText("pagernum")));
			dhtmlxGrid.page = parseInt(dhtmlxGrid.toolbarPager.getItemText("pagernum"));
			if(dhtmlxGrid.filters!=undefined){
				dhtmlxGrid.filterByAll();	
			}else{
				dhtmlxGrid.eventPageReload();
			}
			break;
		default:
			if(id.indexOf("pages")!=-1){
				var pagerValue = parseInt(id.split("_")[1]);
				var records=dhtmlxGrid.records;
				var total = parseInt(dhtmlxGrid.toolbarPager.getItemText("pagernum"));
				var nuevoTotal = records/pagerValue;
				nuevoTotal = nuevoTotal-parseInt(nuevoTotal.toFixed(0))>0?parseInt(nuevoTotal.toFixed(0))+1:parseInt(nuevoTotal.toFixed(0));
				if(pagerValue!=dhtmlxGrid.rows){
					if(dhtmlxGrid.page>nuevoTotal){
						dhtmlxGrid.page=nuevoTotal;
					}
					dhtmlxGrid.rows=pagerValue;
					if(dhtmlxGrid.filters!=undefined){
						dhtmlxGrid.filterByAll();	
					}else{
						dhtmlxGrid.eventPageReload();
					}
				}
			}
			break;
		}
		dhtmlxGrid.eventPage=false;
	});
	dhtmlxGrid.toolbarPager.attachEvent("onEnter", function(id, value){
		dhtmlxGrid.eventPage=true;
	    if(id=="perpagernum"){
	    	var numero = !isNaN(value)?(value!==""?parseInt(value):1):1;
	    	if(numero<0){
	    		numero=1;
	    	}
	    	if(numero>parseInt(dhtmlxGrid.toolbarPager.getItemText("pagernum")))
	    			numero = parseInt(dhtmlxGrid.toolbarPager.getItemText("pagernum"));
	    	dhtmlxGrid.page=numero;
	    	if(dhtmlxGrid.filters!=undefined){
				dhtmlxGrid.filterByAll();	
			}else{
				dhtmlxGrid.eventPageReload();
			}
	    }
	    dhtmlxGrid.eventPage=false;
	});
}
 
dhtmlXGridObject.prototype.toolbarPagerConfig= function(response){
	 var toolbarPager = this.toolbarPager!=undefined?this.toolbarPager:null;
	 if(toolbarPager!=null){
		 var total = response.total;
		 var page = response.page;
		 var records = response.records;
		 var rows = this.rows;
		 this.records = records;
		 this.page=response.page;
		 var optionPages = toolbarPager.getAllListOptions("perpagernum");
		 toolbarPager.setItemText("pagernum", total);
		 
		 if(total==1 || total==0){
			toolbarPager.disableItem("rightabs");
			toolbarPager.disableItem("right");
			toolbarPager.disableItem("left");
			toolbarPager.disableItem("leftabs");
		 }else if(page==1){
			toolbarPager.enableItem("rightabs");
			toolbarPager.enableItem("right");
			toolbarPager.disableItem("left");
			toolbarPager.disableItem("leftabs");
		 }else if(page==total){
			toolbarPager.disableItem("rightabs");
			toolbarPager.disableItem("right");
			toolbarPager.enableItem("left");
			toolbarPager.enableItem("leftabs");
		 }else{
			toolbarPager.enableItem("rightabs");
			toolbarPager.enableItem("right");
			toolbarPager.enableItem("left");
			toolbarPager.enableItem("leftabs");
		 }
		 var countInicio = (rows*(page-1)+1);
		 var countFinal = (countInicio+response.data.length-1);
		 if(countFinal>0){
			 toolbarPager.setItemText("results", "<b>Mostrando</b> "+countInicio+" - "+ countFinal+" <b>de</b> "+records);
			 toolbarPager.setValue("perpagernum",page);
		 }else{
			 toolbarPager.setItemText("results", "Sin registros que mostrar");
			 toolbarPager.setValue("perpagernum",1);
		 }
	 }
 }
dhtmlXGridObject.prototype.eventPageReload = function(){
	b=this.__extraParam();
	u=this.URL;
	u+=(a!='')?( ( (u.indexOf("?")!=-1)?"&":"?")  +a ):'';
	u+=(b!='')?( ( (u.indexOf("?")!=-1)?"&":"?")  +b ):'';
	/* paginado */
	if(this.eventPage!=undefined && !this.eventPage)
		this.page=1;
	u+=(this.rows!=undefined)?( ( (u.indexOf("?")!=-1)?"&":"?")  +"rows="+this.rows ):'';
	u+=(this.page!=undefined)?( ( (u.indexOf("?")!=-1)?"&":"?")  +"page="+this.page ):'';
	this.eventPage=true;
	this.clearAddRowListObject(u,null);
	this.eventPage=false;
 }
 /**************************************/
 /********* Exportación a Exel *********/
dhtmlXGridObject.prototype.exportToExcel = function(url){
	var dhtmlx = this;
	console.log(dhtmlx);
	var config = [];
	var columnasAgrupadas = 0;
	var head = {};
	var aHead = false;
	if(dhtmlx.hdrBox.childNodes[1].childNodes[0].childNodes.length>2){
		aHead = true;
		for(var i=0;i<dhtmlx.hdrBox.childNodes[1].childNodes[0].childNodes.length;i++){
			head[dhtmlx.getColumnId(dhtmlx.hdrBox.childNodes[1].childNodes[0].childNodes[2].childNodes[i]._cellIndex)] = dhtmlx.hdrBox.childNodes[1].childNodes[0].childNodes[2].childNodes[i].childNodes[0].innerHTML;
		}
	}
	var i = dhtmlx.getColumnsNum();
		for(var x=0;x<i;x++){
			var fila={};
			fila.hdrLabels=dhtmlx.hdrLabels[x];
			
			if(aHead){
				if(head[dhtmlx.getColumnId(x)]!=undefined)
					fila.aHead=head[dhtmlx.getColumnId(x)];
				else
					fila.aHead="#rspan";
			}
			else
				fila.aHead="#rspan";
			
			fila.columnIds=dhtmlx.getColumnId(x);
			fila.widths=dhtmlx.getColWidth(x);
			fila.colAlign=dhtmlx.cellAlign[x];
			fila.colTypes=dhtmlx.getColType(x);
			fila.hidden=dhtmlx.isColumnHidden(x);
			config.push(fila);
		}
		var datos ="{";
		datos+="\"configuracion\":"+JSON.stringify (config);
		datos+="}";
		exportOpen('POST', url, datos);
 }

exportOpen = function(verb, url, data, target) {
	  var form = document.createElement("form");
	  form.action = url;
	  form.method = verb;
	  form.target = target || "_self";
	  form.style.display = 'none';
	  form.setAttribute('id','formExportarExcel');
	  if (data) {
		     var input = document.createElement("textarea");
		     input.name = "json";
		     input.value = data;
		     form.appendChild(input);
		  }
	  document.body.appendChild(form);
	  form.submit();
	  var nodo = document.getElementById("formExportarExcel");
		if(nodo){
			nodo.parentNode.removeChild(nodo);
			console.log("Eliminado")
		}

	};
 /**************************************/
	function eXcell_fecha(cell){ 
	    if (cell){ this.cell = cell;this.grid = this.cell.parentNode.grid;}
	    this.edit = function(){}  
	    this.isDisabled = function(){ return true; }
	    this.setValue=function(val){var date = new Date(parseInt(val));this.setCValue(window.dhx4.date2str(date, '%d/%m/%Y') ,val); }
	};
	eXcell_fecha.prototype = new eXcell;