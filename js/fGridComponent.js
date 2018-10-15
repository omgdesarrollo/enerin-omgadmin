
// $(document).ready(()=>{
    
//     lol();
// });
// var heightGrid;
var banderaEditEstado=0;
$(function(){
    // $(document).ready(()=>{
        // console.log("function body");
    $("tbody").on('click','tr td',(obj)=>{
        // console.log("function body");
        obj = obj.currentTarget;
        if(myPop != undefined)
        {
            myPop.unload();
            myPop=null;
        }
        // if($(obj).hasClass("jsgrid-cell"))
        // {
            text = $(obj).html();
            if(!text.includes("<button") && !text.includes("<input") && !text.includes("<a") && !text.includes("<select") && !text.includes("<i") && !text.includes("<textarea"))
            {
                pos = $(obj).offset();
                myPop = new dhtmlXPopup();
                myPop.attachHTML(text);
                myPop.show(0,-20,0,20);
                tamWindow = $(window).width()/2;
                $(".dhx_popup_material").css({
                    "max-width":"50%",left:"25%",height:"min-content","z-index":1050
                });
                tam = $($(".dhx_popup_material")).width()/2;

                $(".dhx_popup_material").css("left",tamWindow-tam);
                $(".dhx_popup_arrow").css("left",tam-9+"px");
                
                $(".dhx_popup_area").css({
                "-webkit-box-shadow":"0px 11px 30px -5px rgba(0,0,0,0.4)",
                    "-moz-box-shadow": "0px 11px 30px -5px rgba(0,0,0,0.4)",
                    "box-shadow": "0px 11px 30px -5px rgba(0,0,0,0.4)"
                });

            }
        // }
    });
    console.log($("tbody"));
    // });
});

function inyectar_librerias()
{
    let librerias = "<link href='../../assets/dhtmlxSuite_v51_std/codebase/dhtmlx.css' rel='stylesheet' type='text/css'/>";
    librerias += "<script src='../../assets/dhtmlxSuite_v51_std/codebase/dhtmlx.js' type='text/javascript'></script>";
    librerias +="<link href='../../assets/dhtmlxSuite_v51_std/codebase/fonts/font_roboto/roboto.css' rel='stylesheet' type='text/css'/>";
    librerias += "<link href='../../assets/jsgrid/jsgrid-theme.min.css' rel='stylesheet' type='text/css'/>";
    librerias += "<link href='../../assets/jsgrid/jsgrid.min.css' rel='stylesheet' type='text/css'/>";
    librerias += "<script src='../../assets/jsgrid/jsgrid.min.js' type='text/javascript'></script>";
    librerias += "<script src='../../js/filtroSupremo.js' type='text/javascript'></script>";
    librerias += "<link href='../../css/filtroSupremo.css' rel='stylesheet' type='text/css'/>";
    librerias += "<link href='../../css/jsgridconfiguration.css' rel='stylesheet' type='text/css'/>";

    let style = ".jsgrid-header-row>.jsgrid-header-cell {";
    style += "background-color:#307ECC; font-family: 'Roboto Slab';";
    style += "font-size: 1.2em; color: white; font-weight: normal;}";

    $("head").append(librerias);
    // $("style").append(style);
}
inyectar_librerias();

function lol()
{
    var tam1A,tam2A;
    Frame = $(this)[0].frameElement;
    // $("#jsGrid").jsGrid("refresh");
    // console.log($(window.parent).height());
    if($(window.parent).height()<720)
    {
        tam1A = 740 - 190;
        tam2A = tam1A - 42;
        $(Frame).css("height",tam2A-6+"px");
        $("#jsGrid").css("height","390px");
        gridInstance.height = 390 + "px";
        let val = $('.jsgrid-filter-row').css("display");
        if(val != "none")
        {
            gridInstance._body[0].style.height = 260 +"px";
            $(".jsgrid-grid-body").css("height", 260 + "px");
        }
        else
        {
            gridInstance._body[0].style.height = 318.8 +"px";
            $(".jsgrid-grid-body").css("height", 318.8 +"px");
        }
        $(".jsgrid-pager-container").css({
            top: 465 + "px",
            position:"fixed",
            // left:(leftT/2)-(tamPager/2)
            left:20
        });
    }
    else
    {
        tam1A = $(window.parent).height() - 190;
        tam2A = tam1A - 42;
        $(Frame).css("height",tam2A-6+"px");
        t = $(window.parent).height() - 718;

        $("#jsGrid").css("height", t + 380 +"px");
        gridInstance.height = t + 380 + "px";

        let val = $('.jsgrid-filter-row').css("display");
        if(val != "none")
        {
            $(".jsgrid-grid-body").css("height", (t + 235) + "px");
            gridInstance._body[0].style.height = (t + 235) +"px";
        }
        else
        {
            $(".jsgrid-grid-body").css("height", (t + 293.8) +"px");
            gridInstance._body[0].style.height = (t + 293.8) +"px";
        }
        $(".jsgrid-pager-container").css({
            top: t + 445 + "px",
            position:"fixed",
            // left:(leftT/2)-(tamPager/2)
            left:20
        });
        // console.log($(".jsgrid-grid-body"));
        // gridInstance._body[0].style.height = t + 210 +"px";
        // gridInstance._body[0].style.height = "max-container";
        // gridInstance._body[0].style.height = 80 +"%";
        
        // $(".jsgrid-grid-body").css("height", t + 210 +"px");
        // console.log(gridInstance);
        // $(".jsgrid-grid-body").css("height",($(window.parent).height() - 720 + 215) +"px");
        
    }
    // console.log("Reconstruir tamaños");
}

$(window.parent).resize(()=>{
    lol();
});
var myPop = undefined;
// $("td.jsgrid-cell").(()=>{
//     alert("");
//     if($(this).hasClass("jsgrid-cell"))
//     {
//         text = $(this).html();
//         // console.log(!text.includes("<button") && !text.includes("<input"));
//         if(!text.includes("<button") && !text.includes("<input") && !text.includes("<a") && !text.includes("<select") && !text.includes("<i"))
//         {
//             myPop = new dhtmlXPopup();
//             myPop.attachHTML(text);
//             myPop.show(20,20,300,200);
//         //     swal("",text,"info");
//             // $(obj).attr("title",text);
//             // $(obj).popover();

//         }
//     }
// });

function customsFieldsGrid()
{
    $.each(customsFieldsGridData,function(index,value)
    {
        jsGrid.fields[value.field] = value.my_field;
    });
}

function construirGrid()
{
    customsFieldsGrid();
    db=
    {
        loadData: function()
        {
            if(DataGrid.length == 0)
                $(".jsgrid-grid-header").css("overflow-x","auto");
            else
                $(".jsgrid-grid-header").css("overflow-x","hidden");
            return DataGrid;
        },
        updateItem:function()
        {
            // alert("5");
        }
    };
    
    $("#jsGrid").jsGrid({
        onInit: (args)=>
        {
            // alert("1");
            gridInstance=args.grid;
            // console.log(gridInstance);
            jsGrid.Grid.prototype.editButton=true;
            jsGrid.Grid.prototype.autoload=true;
        },
        onDataLoading: (args)=>
        {
            // alert("2");
            // lol();
            // loadBlockUi();
        },
        onDataLoaded:(args)=>
        {
            // alert("3");
            // setTimeout(function(){lol();},200);
            $('.jsgrid-filter-row').removeAttr("style",'display:none');
            setTimeout(()=>{lol();},100);
            // $(".jsgrid-grid-body").attr("style","height:53.44228935%");
            // $(window.parent).resizeTo($(window.parente).width(),$(window.parente).height()-200);
            // this.resizeTo($(window.parente).width(),$(window.parente).height()-200);
            // window.open("A","B","width=400,height=400");
            // $(".jsgrid-grid-header").attr("style","overflow-x:auto");
        },
        onPageChanged:()=>
        {
            // $('.jsgrid-filter-row').removeAttr("style",'display:none');
            setTimeout(() => {
                lol();
            },10);
        },
        rowDoubleClick:(args)=>
        {
            // console.log("W");
            $("#jsGrid").jsGrid("editItem",$(".jsgrid-selected-row")[0]);
        },
        rowClick:(args)=>
        {
            // obj = args.event.target;
            // if(myPop != undefined)
            // {
            //     myPop.unload();
            //     myPop=null;
            // }
            // if($(obj).hasClass("jsgrid-cell"))
            // {
            //     text = $(obj).html();
            //     if(!text.includes("<button") && !text.includes("<input") && !text.includes("<a") && !text.includes("<select") && !text.includes("<i"))
            //     {
            //         pos = $(obj).offset();

            //         myPop = new dhtmlXPopup();
            //         myPop.attachHTML(text);
            //         myPop.show(0,-20,0,20);
            //         tamWindow = $(window).width()/2;
            //         $(".dhx_popup_material").css({
            //             "max-width":"50%",left:"25%",height:"min-content",
            //         });
            //         tam = $($(".dhx_popup_material")).width()/2;

            //         $(".dhx_popup_material").css("left",tamWindow-tam);
            //         $(".dhx_popup_arrow").css("left",tam-9+"px");
                    
            //         $(".dhx_popup_area").css({
            //         "-webkit-box-shadow":"0px 11px 30px -5px rgba(0,0,0,0.4)",
            //             "-moz-box-shadow": "0px 11px 30px -5px rgba(0,0,0,0.4)",
            //             "box-shadow": "0px 11px 30px -5px rgba(0,0,0,0.4)"
            //         });

            //     }
            // }
            // console.log($(".jsgrid-selected-row")[0]);
            // $("#jsGrid").jsGrid("editItem",$(".jsgrid-selected-row")[0]);
            // var a = $("#jsGrid").jsGrid("rowByItem",$(".jsgrid-selected-row")[0]);
            // alert("B");
            if(banderaEditEstado==0)
                $("#jsGrid").jsGrid("cancelEdit");
            else
                banderaEditEstado=0;
            // console.log("A");
        },
        width: "100%",
        height: "300px",
        autoload: true,
        heading: true,
        sorting: true,
        editing: true,
        paging: true,
        controller:db,
        pageLoading: false,
        pageSize: 10,
        pageButtonCount: 5,
        updateOnResize: true,
        confirmDeleting: false,
        noDataContent:"No Existen Registros",
        pagerFormat: "     Paginas: {first}  {prev} {pages} {next} {last}   {pageIndex} de {pageCount}",
        pagePrevText: "Anterior",
        pageNextText: "Siguiente",
        pageFirstText: "Principio",
        pageLastText: "Final",
        fields: estructuraGrid,
        pageLoading: false,
        pageIndex:1,
        onItemDeleted:function(args)
        {
            // console.log("deleted");
            // console.log(args);
            // console.log(argsGlobal);
            // // if(preguntarEliminar(args.item))
            //     // args.cancel = true;
        },
        onItemDeleting:function(args)
        {
            // console.log("deleting");
            // console.log(args);
            // argsGlobal = args;
            // preguntarEliminar(args.item);
            // if(ifeliminar==0)
            // {
            //     args.cancel = true;
            //     ifeliminar=1;
            // }
            // else
            //     gridInstance.onItemDeleted(args);
            // args.cancel = preguntarEliminar(args.item);
                //  = true;
            // console.log("jajaja");
        }
        ,
        onItemUpdated:function(args)
        {
            // console.log("aqui entro");
            saveUpdateToDatabase(args);
        },
        onItemInserted:(args)=>
        {
            $(".jsgrid-grid-header").css("overflow-x","hidden");
            // console.log(args);
        }
    });
}

var MyCControlField = function(config)
{
    jsGrid.Field.call(this, config);
};
 
MyCControlField.prototype = new jsGrid.Field
({
        css: "date-field",
        align: "center",
        sorter: function(date1, date2)
        {
            // console.log("haber cuando entra aqui");
            // console.log(date1);
            // console.log(date2);
            // return 1;
        },
        itemTemplate: function(value,todo)
        {
            var returnTemp="<a></a>";
            // console.log(value);
            // value == 0 ? returnTemp = "" : returnTemp = this._inputDate = $("<input>").attr( {class:'jsgrid-button jsgrid-delete-button ',title:"Eliminar", type:'button',onClick:"preguntarEliminar("+JSON.stringify(todo)+")"});
            if(value[2]["editar"]==1)
                returnTemp += "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Editar' onClick='modoEditar()'>";
            if(value[1]["eliminar"]==1)
                returnTemp += "<input class='jsgrid-button jsgrid-delete-button' type='button' title='Eliminar' onClick='preguntarEliminar("+JSON.stringify(value[0])+")'>";
            // returnTemp += "<input type='label' value='"+JSON.stringify(todo)+"' style='display:false'>";
            // console.log(returnTemp);
            return returnTemp;
        },
        insertTemplate: function(value)
        {
        },
        editTemplate: function(value)
        {
            var val = "<a></a>";
            // console.log(value);
            if(value[2]["editar"]==1)
            {
                val += "<input class='jsgrid-button jsgrid-update-button' type='button' title='Actualizar' onClick='aceptarEdicion()'>";
                val += "<input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancelar Edición' onClick='cancelarEdicion()'>";
            }
            else
            {
                if(value[1]["eliminar"]==1)
                    val += "<input class='jsgrid-button jsgrid-delete-button' type='button' title='Eliminar' onClick='preguntarEliminar("+JSON.stringify(value[0])+")'>";
            }
            return val;
        },
        insertValue: function()
        {
        },
        editValue: function()
        {
        }
});

function aceptarEdicion()
{
    gridInstance.updateItem();
}

function cancelarEdicion()
{
    $("#jsGrid").jsGrid("cancelEdit");
    
}

function modoEditar()
{
    // $("#jsGrid").jsGrid("updateItem");
    // $("#grid").jsGrid("updateItem");
    // console.log(gridInstance);
    // gridInstance.rowDoubleClick();
    banderaEditEstado=1;
    $("#jsGrid").jsGrid("editItem",$(".jsgrid-selected-row")[0]);
    // console.log($(".jsgrid-row")[0]);
}

// function loadBlockUi()
// {
//     $.blockUI({message: '<img src="../../images/base/loader.GIF" alt=""/><span style="color:#FFFFFF"> Espere Por Favor</span>', css:
//     { 
//         border: 'none', 
//         padding: '15px', 
//         backgroundColor: '#000', 
//         '-webkit-border-radius': '10px', 
//         '-moz-border-radius': '10px', 
//         opacity: .5, 
//         color: '#fff' 
//     },overlayCSS: { backgroundColor: '#000000',opacity:0.1,cursor:'wait'} }); 
//     setTimeout($.unblockUI, 2000);
// }