Objeto = function(nome, caminhoDoSprite, posX, posY, largura, altura){
	this.nome = nome;
	this.caminhoDoSprite = caminhoDoSprite;
	this.x = posX;
	this.y = posY;
	this.area = new Poligono([posX, posY, posX, posY + largura, posX + altura, posY + largura, posX + altura, posY]);
	this.sprite = null;
}

Objeto.prototype = {
	
	preload: function(){
		game.engine.load.image(this.nome,this.caminhoDoSprite);
	},

	create: function(){
		this.sprite = game.engine.add.sprite(this.x, this.y, this.nome);
		this.sprite.anchor.setTo(0.5,0.5);
	},

	update: function(pointer){
		if (this.area.isPointInPoly(pointer)&& (game.engine.physics.arcade.distanceToXY(game.jogador.sprite, this.x, this.y) < 150)) {
				console.log('objeto');
				game.cena.removeObjeto(this.nome);
		};
	}
}; 