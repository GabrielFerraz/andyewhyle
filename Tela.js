Tela = function(objeto){
	this.objeto = objeto;
}

Tela.prototype = {
	
	update: function(){
		console.log('objeto');
		objeto.teste();
	},

}; 