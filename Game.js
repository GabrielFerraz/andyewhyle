Game = function (){
	this.engine = null;
	this.jogador = null;
	this.cena = null;
	this.mouseClickX = null;
	this.mouseClickY = null;
};

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
};










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










Cena = function(){
	this.elementos = [new Objeto('diamante', 'assets/diamond.png', 200,300, 32, 28), new Objeto('star', 'assets/star.png', 400, 300, 24, 22),
					  new Computador('comp','assets/firstaid.png', 500, 300, 32, 32)];
	this.fundo = null;
	
};

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










Inventario = function(){
	this.objetos = [];
	this.posicaoObjeto = 50;
};

Inventario.prototype = {
	
	addObjeto: function(objeto){
		console.log("entrou aqui");
		this.objetos.push(objeto);
		objeto.sprite.reset(this.posicaoObjeto,37);
		console.log(objeto.sprite);
		this.posicaoObjeto += 50;
	}
};











Chao = function(pontos){
	this.area = new Poligono(pontos);
};

Chao.prototype = {
	
	update: function(pointer){

        console.log(pointer.withinGame);
		
		if(this.area.isPointInPoly(pointer)){
            console.log(game.jogador.andando);
            console.log(game.jogador);
			console.log(pointer.y);
			var duration = (game.engine.physics.arcade.distanceToPointer(game.jogador.sprite, pointer) / 200) * 1000;
            console.log(game.engine.physics.arcade.angleToPointer(game.jogador.sprite,pointer));
            var angulo = game.engine.physics.arcade.angleToPointer(game.jogador.sprite,pointer);
            if(angulo>-0.79 && angulo < 0.79){
                game.jogador.animacao = 'direita';
            }else if(angulo>-2.36 && angulo < -0.79){
                game.jogador.animacao = 'tras';
            }else if(angulo>0.79 && angulo < 2.36){
                game.jogador.animacao = 'frente';
            }else{
                game.jogador.animacao = 'esquerda';
            }
            var tween = game.engine.add.tween(game.jogador.sprite).to({ x: pointer.x, y: pointer.y }, duration, Phaser.Easing.Linear.None,true);
            tween.isRunning = true;
            console.log(tween);
            console.log('duration');
            game.jogador.andando = true;
		}else{
            game.mouseClickX = game.jogador.sprite.x;
            game.mouseClickY = game.jogador.sprite.y;
        }
	}
};









Objeto = function(nome, caminhoDoSprite, posX, posY, largura, altura){
	this.nome = nome;
	this.caminhoDoSprite = caminhoDoSprite;
	this.x = posX;
	this.y = posY;
	this.area = new Poligono([posX, posY, posX, posY + largura, posX + altura, posY + largura, posX + altura, posY]);
	this.sprite = null;
};

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









Poligono = function (points) {

    /**
    * @property {number} type - The base object type.
    */

    //if points isn't an array, use arguments as the array
    if (!(points instanceof Array))
    {
        points = Array.prototype.slice.call(arguments);
    }

    //if this is a flat array of numbers, convert it to points
    if (typeof points[0] === 'number')
    {
        var p = [];

        for (var i = 0, len = points.length; i < len; i += 2)
        {
            p.push(new Phaser.Point(points[i], points[i + 1]));
        }
    	console.log('constructor');
        points = p;
    }

    /**
    * @property {array<Phaser.Point>|array<number>} points - The array of Points.
    */
    this.points = points;

};

Poligono.prototype = {


    /**
    * Checks whether the x and y coordinates are contained within this polygon.
    *
    * @method Poligono#isPointInPoly
    * @param {Array} pt - The X and Y values of the coordinate to test.
    * @return {boolean} True if the coordinates are within this polygon, otherwise false.
    */
    isPointInPoly: function (pt){
        for(var c = false, i = -1, l = this.points.length, j = l - 1; ++i < l; j = i)
            ((this.points[i].y <= pt.y && pt.y < this.points[j].y) || (this.points[j].y <= pt.y && pt.y < this.points[i].y))
                && (pt.x < (this.points[j].x - this.points[i].x) * (pt.y - this.points[i].y) / (this.points[j].y - this.points[i].y) + this.points[i].x)
            && (c = !c);
        return c;
    }

};









Computador = function(nome, caminhoDoSprite, posX, posY, largura, altura){
	this.nome = nome;
	this.caminhoDoSprite = caminhoDoSprite;
	this.x = posX;
	this.y = posY;
	this.area = new Poligono([posX, posY, posX, posY + largura, posX + altura, posY + largura, posX + altura, posY]);
	this.sprite = null;
};

Computador.prototype = {

	preload: function(){
		game.engine.load.image(this.nome,this.caminhoDoSprite);
	},

	create: function(){
		this.sprite = game.engine.add.sprite(this.x, this.y, this.nome);
		// this.sprite.anchor.setTo(0.5,0.5);
	},

	update: function(pointer){
		if (this.area.isPointInPoly(pointer)) {
				console.log('computador');
				Blockly.inject(document.getElementById('blockly'),
        		{path: './', toolbox: document.getElementById('toolbox'), trashcan: true});
        		var defaultXml =
        			'<xml>' +
        			'<block type="variables_set" id="31" inline="true" x="143" y="36">' +
						'<field name="VAR">bli</field>' +
						'<value name="VALUE">' +
							'<block type="math_number" id="32">' +
								'<field name="NUM">0</field>' +
							'</block>' +
						'</value>' +
					'</block>' +
					'</xml>';
				var xml = Blockly.Xml.textToDom(defaultXml);
				Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);

		};
	}

};

