/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 200);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  // document.getElementById("myDiv").style.display = "block";
}

