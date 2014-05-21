Game = function (){
	this.engine = null;
	this.jogador = null;
	this.cena = null;
	this.mouseClickX = null;
	this.mouseClickY = null;
}

Game.prototype = {

	preload: function(){
		this.cena = new Cena();
	    this.cena.preload();
	    this.jogador = new Jogador();
	    this.jogador.preload();
	},

	create: function(){
		this.cena.create();
    	this.jogador.create();
	},
	
	update: function(){
		this.jogador.update();
    	this.engine.input.onDown.add(this.notifyObservers, this);
	},

	setEngine: function(engine){
		this.engine = engine;	
	},

	notifyObservers: function(pointer){
		console.log(this.cena.elementos.length);
		this.mouseClickX = pointer.x;
		this.mouseClickY = pointer.y;
        for (var i = this.cena.elementos.length - 1; i >= 0; i--) {

            this.cena.elementos[i].update(pointer);
        };
	}
}

