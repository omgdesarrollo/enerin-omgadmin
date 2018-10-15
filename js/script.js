function seleccionarTodo(unCheck){
	var checks = document.getElementsByTagName('input');
	if(!unCheck.checked){
	//Deseleccionar todo
		for (i = 0; i < checks.length; i++ ) {
			checks[i].setAttribute('checked',''); // para IE
			checks[i].removeAttribute('checked'); // para firefox
		}
	}
	else{
	//Seleccionar todo
		for (i = 0; i < checks.length; i++ ) {
			checks[i].setAttribute('checked','checked');
		}
	}// fin del else
}// fin del function