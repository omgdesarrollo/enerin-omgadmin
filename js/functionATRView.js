var myTree;
function showArbol(dataArbol,dataIds){
  //dataIds[ id_nodo,id_tabla,descripcion ]


  //    $("#treeboxbox_tree").html("g");
  // var data1=[];
  // asi debe venir  lo de abajo esta como ejemplo
  // data1.push([1,0,"1111"]);
  // data1.push([2,0,"2222"]);
  
  myTree.deleteChildItems(0);
 
  if(dataArbol.length>0){
    myTree.parse(dataArbol, "jsarray");
  }








  
}








