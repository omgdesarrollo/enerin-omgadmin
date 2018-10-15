

function listarTemas()
{
    $.ajax({
        
        url:'../Controller/TemasController.php?Op=Listar',
        success:function(data)
        {
            $.each(data,function(index,value){
//               alert(value);
               console.log(value);
            });
        }
    });
}

