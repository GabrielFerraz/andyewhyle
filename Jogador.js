Jogador = function(){
	this.sprite = null;
	this.andando = false;
	this.animacao = 'parado';
	this.inventario = new Inventario();
};

Jogador.prototype = {

	preload: function(){
		game.engine.load.spritesheet('player','assets/playerSprite.png', 102, 166);
		console.log('foi o preload');
	},

	create: function(){
		this.sprite = game.engine.add.sprite(50,550,'player');
		this.sprite.animations.add('direita',[0,1,2,3,4,5,6,7,8,9], 12, true);
		this.sprite.animations.add('esquerda',[10,11,12,13,14,15,16,17,18,19], 12, true);
		this.sprite.animations.add('frente',[20,21,22,23,24,25,26,27,28,29], 12, true);
		this.sprite.animations.add('tras',[30,31,32,33,34,35,36,37,38,39], 12, true);
		this.sprite.animations.add('parado',[41]);
		this.sprite.animations.play('parado');
		this.sprite.anchor.setTo(0.5,1);
		console.log('foi o create');
	},
	
	update: function(){

		if(this.sprite.x != game.mouseClickX || this.sprite.y != game.mouseClickY){
	        this.andando = true;

	    }else{
	        this.andando = false;
	    }

	    if(this.andando){
	        this.sprite.animations.play(this.animacao);
	    }else{
	        this.sprite.animations.play('parado');
    	}	
	},

	teste: function(){
		console.log('mandou o objeto');
	}
};