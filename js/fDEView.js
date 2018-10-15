
  function datosInformacion()
 {
  $.ajax({
   url:"../Controller/DocumentosEntradaController.php?Op=Listar",
   method:"POST",
   
   success:function(data)
   {
    for(var count=0; count<data.length; count++)
    {
     var html_data = '<tr><td>'+data[count].clave_cumplimiento+'</td>';
     html_data += '<td data-name="folio_referencia" class="folio_referencia" data-type="text" data-pk="'+data[count].id_documento_entrada+'">'+data[count].folio_referencia+'</td>';
     html_data += '<td data-name="folio_entrada" class="folio_entrada" data-type="text" data-pk="'+data[count].id_documento_entrada+'">'+data[count].folio_entrada+'</td>';
     html_data += '<td data-name="fecha_recepcion" class="fecha_recepcion" data-type="text" data-pk="'+data[count].id_documento_entrada+'">'+data[count].fecha_recepcion+'</td>';
     html_data += '<td data-name="asunto" class="asunto" data-type="text" data-pk="'+data[count].id_documento_entrada+'">'+data[count].asunto+'</td></tr>';
     $('#datosGenerales').append(html_data);
    }
   }
  })
 }




$('#datosGenerales').editable({
       container: 'body',
       selector: 'td.folio_referencia',
       url: "../Controller/DocumentosEntradaController.php?Op=Modificar",
       title: 'Folio Referencia',
       type: "POST",
       dataType: 'json',
       validate: function(value){
        if($.trim(value) == '')
        {
         return 'Este Campo es Requerido';
        }
       }
});
    
    
    $('#datosGenerales').editable({
       container: 'body',
       selector: 'td.folio_entrada',
       url: "../Controller/DocumentosEntradaController.php?Op=Modificar",
       title: 'Folio Entrada',
       type: "POST",
       dataType: 'json',
       validate: function(value){
        if($.trim(value) == '')
        {
         return 'Este Campo es Requerido';
        }
       }
});




