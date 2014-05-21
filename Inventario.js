Inventario = function(){
	this.objetos = [];
	this.posicaoObjeto = 50;
}

Inventario.prototype = {
	
	addObjeto: function(objeto){
		console.log("entrou aqui");
		this.objetos.push(objeto);
		objeto.sprite.reset(this.posicaoObjeto,37);
		console.log(objeto.sprite);
		this.posicaoObjeto += 50;
	}
}