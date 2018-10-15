(function ($) {
    var $defaults = {
        containerid: null
        , datatype: 'table'
        , dataset: null
        , columns: null
        , returnUri: false
	, locale: 'en-MX'   
        , worksheetName: ""
        , encoding: "utf-8"
    };
    var $settings = $defaults;
    $.fn.excelexportHibrido = function (options) {
        $settings = $.extend({}, $defaults, options);
        var gridData = [];
        var excelData;
        return Initialize();
		
	function Initialize() {
            var type = $settings.datatype.toLowerCase();

            BuildDataStructure(type);
            switch (type) {//AUN CONSTRUYENDO PARA PODER SOPORTAR CUALQUIER ORIGEN DE DATOS PARA EXPORTAR A EXCEL FVAZCONCELOS
                case 'table':
                    excelData = Export(ConvertFromTable());
                    break;
                case 'json':
                    if(origenDeDatosVista=="asignacionTemaRequisito")
                    {
                        excelData = Export(ConvertDataStructureToTableAsignacionTemaRequisito());
                    }
                    if(origenDeDatosVista=="consultas")
                    {
                        excelData = Export(ConvertDataStructureToTableConsultas());
                    }
                    if(origenDeDatosVista=="controlTemas")
                    {
                        excelData = Export(ConvertDataStructureToTableControlTemas());
                    }
                    if(origenDeDatosVista=="documentos")
                    {
                        excelData = Export(ConvertDataStructureToTableDocumentos());
                    }
                    if(origenDeDatosVista=="documentoSalida")
                    {
                        excelData = Export(ConvertDataStructureToTableDocumentoSalida());
                    }
                    if(origenDeDatosVista=="empleados")
                    {
                        excelData = Export(ConvertDataStructureToTableEmpleados());
                    }
                    if(origenDeDatosVista=="evidencias")
                    {
                        excelData = Export(ConvertDataStructureToTableEvidencias());
                    }
                    if(origenDeDatosVista=="informeEvidencias")
                    {
                        excelData = Export(ConvertDataStructureToTableInformeEvidencias());
                    }
                    if(origenDeDatosVista=="informeGerencial")
                    {
                        excelData = Export(ConvertDataStructureToTableInformeGerencial());
                    }
                    if(origenDeDatosVista=="informeValidacionDocumentos")
                    {
                        excelData = Export(ConvertDataStructureToTableInformeValidacionDocumentos());
                    }
                    if(origenDeDatosVista=="reportes")
                    {
                       excelData = Export(ConvertDataStructureToTable()); 
                    }
                    if(origenDeDatosVista=="Seguimiento")
                    {
                       excelData = Export(ConvertDataStructureToTableSeguimiento()); 
                    }
                    if(origenDeDatosVista=="tareas")
                    {
                        excelData = Export(ConvertDataStructureToTableTareas());
                    }
                    if(origenDeDatosVista=="validacionDocumentos")
                    {
                        excelData = Export(ConvertDataStructureToTableTareasValidacionDocumentos());
                    }
                    
                    
                    break;
                
//                case 'jsonTareas':
//                    console.log("Entro al case");
//                    excelData = Export(ConvertDataStructureToTableTareas());
//                    break;
                    
                case 'xml':
                    excelData = Export(ConvertDataStructureToTable());
                    break;
                case 'jsGrid':
                    excelData = Export(ConvertDataStructureToTable());
                    break;
            }
            if ($settings.returnUri) {
                return excelData;
            }
            else {

                if (!isBrowserIE())
                {
                    window.open(excelData);
                }      
            }
        }
        function BuildDataStructure(type) {
            switch (type) {
                case 'table':
                    break;
                case 'json':
//                    alert();
                    gridData = $settings.dataset;
                    break;
                case 'xml':
                    $($settings.dataset).find("row").each(function (key, value) {
                        var item = {};

                        if (this.attributes != null && this.attributes.length > 0) {
                            $(this.attributes).each(function () {
                                item[this.name] = this.value;
                            });

                            gridData.push(item);
                        }
                    });
                    break;
                case 'jsGrid':
                    $($settings.dataset).find("rows > row").each(function (key, value) {
                        var item = {};

                        if (this.children != null && this.children.length > 0) {
                            $(this.children).each(function () {
                                item[this.tagName] = $(this).text();
                            });
                            gridData.push(item);
                        }
                    });
                    break;
            }
        }

        function ConvertFromTable() {
            var result = $('<div>').append($('#' + $settings.containerid).clone()).html();            
            return result;
        }
        
                function ConvertDataStructureToTableAsignacionTemaRequisito() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Requisitos y Registros Asignados</th></tr>\n\
                          <tr><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function ConvertDataStructureToTableConsultas() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Consultas</th></tr>\n\
                          <tr><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function ConvertDataStructureToTableControlTemas() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Temas</th></tr>\n\
                          <tr><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        
        function ConvertDataStructureToTableDocumentos() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Documentos</th></tr>\n\
                          <tr><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function ConvertDataStructureToTableDocumentoSalida() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Documentos de Salida</th></tr>\n\
                          <tr><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        
        function ConvertDataStructureToTableEmpleados() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Personal</th></tr>\n\
                          <tr><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function ConvertDataStructureToTableEvidencias() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Evidencias</th></tr>\n\
                          <tr><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function ConvertDataStructureToTableInformeEvidencias() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Informe Evidencias</th></tr>\n\
                          <tr><td></td><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function ConvertDataStructureToTableInformeGerencial() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Informe Gerencial</th></tr>\n\
                          <tr><td></td><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        
        function ConvertDataStructureToTableInformeValidacionDocumentos() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Informe Validacion Documentos</th></tr>\n\
                          <tr><td></td><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }

        function ConvertDataStructureToTable() 
        {
            alert("dg");
            var result = "<table id='tabledata'";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th ";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function ConvertDataStructureToTableSeguimiento() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Seguimiento Documentos de Entrada</th></tr>\n\
                          <tr><td></td><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function ConvertDataStructureToTableTareas() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Control de Pendientes Especiales</th></tr>\n\
                          <tr><td></td><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
                function ConvertDataStructureToTableTareasValidacionDocumentos() 
        {
//            alert("d");
            months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            fecha="0000-00-00";
            date = new Date();
            fecha = date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear().toString().slice(2,4);
            
            
            var result = "<table>\n\
                          <tr><th></th><th></th><th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'>Validacion</th></tr>\n\
                          <tr><td></td><td></td><td style='border:solid 1px #000000;'><center>"+fecha+"</center></td>\n\
                          <tr>\n\
                          </table>";
            result += "<table id='tabledata'";
            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th style='background:#307ECC; color:#ffffff; border:solid 1px #000000;'";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td style='border:solid 1px #000000;'";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'; ";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";

            return result;
        }
        
        function Export(htmltable) { /* METODO PARA EXPORTAR DE UNA TABLA HTML FVAZCONCELOS*/

            if (isBrowserIE()) {
        
                exportToExcelIE(htmltable);
            }
            else {
                var excelFile = "<html xml:lang=" + $defaults.locale + " xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
                excelFile += "<head>";
                excelFile += '<meta http-equiv="Content-type" content="text/html;charset=' + $defaults.encoding + '" />';
                excelFile += "<!--[if gte mso 9]>";
                excelFile += "<xml>";
                excelFile += "<x:ExcelWorkbook>";
                excelFile += "<x:ExcelWorksheets>";
                excelFile += "<x:ExcelWorksheet>";
                excelFile += "<x:Name>";
                excelFile += "{worksheet}";
                excelFile += "</x:Name>";
                excelFile += "<x:WorksheetOptions>";
                excelFile += "<x:DisplayGridlines/>";
                excelFile += "</x:WorksheetOptions>";
                excelFile += "</x:ExcelWorksheet>";
                excelFile += "</x:ExcelWorksheets>";
                excelFile += "</x:ExcelWorkbook>";
                excelFile += "</xml>";
                excelFile += "<![endif]-->";
                excelFile += "</head>";
                excelFile += "<body>";
                excelFile += htmltable.replace(/"/g, '\'');
                excelFile += "</body>";
                excelFile += "</html>";
                var uri = "data:application/vnd.ms-excel;base64,";
                var ctx = { worksheet: $settings.worksheetName, table: htmltable };
                return (uri + base64(format(excelFile, ctx)));
            }
        }

        function base64(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        }

        function format(s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; });
        }

        function isBrowserIE() {
            var msie = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
            if (msie > 0) {  // SI ES INTERNET EXPLORER RETORNA TRUE FVAZCONCELOS
                return true;
            }
            else {  //SI ES OTRO NAVEGADOR RETORNA FALSE FVAZCONCELOS
                return false;
            }
        }

        function exportToExcelIE(table) {
            var el = document.createElement('div');
            el.innerHTML = table;

            var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
            var textRange; var j = 0;
            var tab;
                  

            if ($settings.datatype.toLowerCase() == 'table') {            
                tab = document.getElementById($settings.containerid);  // OBTENER TABLA              
            }
            else{
                tab = el.children[0]; // OBTENER TABLA
            }
            for (j = 0 ; j < tab.rows.length ; j++) {
                tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
            }

            tab_text = tab_text + "</table>";          
            //VIENDO TODAVIA SI DEBO USAR ESTAS LINEAS
//            tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
//            tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
//            tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
            //TERMINA SI DEBO USAR ESTAS LINEAS
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");

            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // SI INTERNET EXPLORER
            {
                txtArea1.document.open("txt/html", "replace");
                txtArea1.document.write(tab_text);
                txtArea1.document.close();
                txtArea1.focus();
                sa = txtArea1.document.execCommand("SaveAs", true, "download");
            }
            else                
                sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
            return (sa);
        }
        
    };
})(jQuery);

function getColumns(paramData){

	var header = [];
	$.each(paramData[0], function (key, value) {
		var obj = {}
		obj["headertext"] = key;
		obj["datatype"] = "string";
		obj["datafield"] = key;
		header.push(obj);
	}); 
	return header;
}
