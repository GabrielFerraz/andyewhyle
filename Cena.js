Cena = function(){
	this.elementos = [new Objeto('diamante', 'assets/diamond.png', 200,300, 32, 28), new Objeto('star', 'assets/star.png', 400, 300, 24, 22)];
	this.fundo = null;
	
}

Cena.prototype = {
	
	preload: function(){
		game.engine.load.image('fundo', 'assets/cena1.png');
	    for (var i = this.elementos.length - 1; i >= 0; i--) {
	    	this.elementos[i].preload();
	    };
	},

	create: function(){
		game.engine.add.sprite(0, 0, 'fundo');
		for (var i = this.elementos.length - 1; i >= 0; i--) {
			this.elementos[i].create();
		};
		this.elementos.push(new Chao([0,600,94,380,697,380,800,600]));

	},
	
	update: function(){	
	},

	removeObjeto: function(nome){
		for (var i = this.elementos.length - 1; i >= 0; i--) {
			if((this.elementos[i].nome) &&  (this.elementos[i].nome == nome)){
				var objeto = this.elementos.splice(i,1);
				game.jogador.inventario.addObjeto(objeto[0]);
			}
		};
	}

}; 