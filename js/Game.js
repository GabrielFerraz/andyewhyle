Game = function (){
	this.engine = null;
	this.jogador = null;
	this.cenas = null;
	this.cenaAtual = null;
	this.mouseClickX = null;
	this.mouseClickY = null;
	this.textbox = null;
};

Game.prototype = {

	preload: function(){
		// for (var i = this.cenas.length - 1; i >= 0; i--) {
		// 	this.cenas[i].preload();
		// };
		this.cena = new Cena([new Computador('pc', 'assets/pc1.png',30,295,70,70),
							  new Chao([799,405,676,405,676,420,423,420,423,405,256,405,256,420,125,420,145,442,252,442,252,468,799,468])],
							  [new Objeto('mesa', 'assets/lateralMesaComando.png',144,417,222,106)],
							  "assets/bg_sub.png");
	    this.cena.preload();
	 	// this.cenaAtual = this.cenas[0];
	    this.jogador = new Jogador();
	    this.jogador.preload();
	    this.textbox = new TextBox();
	    this.textbox.preload();
	},

	create: function(){
		this.cena.create();
    	this.jogador.create();
    	this.cena.carregaElementosSobre();
    	Blockly.inject(document.getElementById('blockly'),
		{path: './', toolbox: document.getElementById('toolbox'), trashcan: true});
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
	},

	runCode: function(){
		var code = Blockly.JavaScript.workspaceToCode();
		Blockly.JavaScript.addReservedWords('code');
		var code = Blockly.JavaScript.workspaceToCode();
		try {
			eval(code);
		} catch (e) {
			alert(e);
		};
		
		//-------------------//
		for(var i = this.cena.elementos.length - 1; i>=0; i--){
			if(this.cena.elementos[i] instanceof Computador){
				tween = this.cena.elementos[i].tweenQueue.shift();
				tween.delay(0);
				tween.start();
			}
		}
		//------------------//
		//Blockly.mainWorkspace.clear();
		//document.getElementById('block').style.zIndex = '1';
		//document.getElementById("jogo").style.zIndex = '9999';
	},

	moveSub: function(direcao){
		for(var i = this.cena.elementos.length - 1; i>=0; i--){
			if(this.cena.elementos[i] instanceof Computador){
				this.cena.elementos[i].move(direcao);
			}
		}
	},

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
		this.sprite = game.engine.add.sprite(150,450,'player');
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

};




/**
* A classe Cena serve para instanciar os elementos da fase, sendo eles os objetos, e o cenário
* 
* @class Cena
* @constructor
* @param {Array} elementos - Array contendo todos os objetos interagíveis com o jogador
* @param {String} cenario - Array contendo a string do caminho do cenário
*/
Cena = function(elementos, elementosSobre, cenario){
	this.elementos = elementos;
	this.elementosSobre = elementosSobre;
	this.cenario = cenario;
	
};

Cena.prototype = {
	
	preload: function(){
		game.engine.load.image('cenario', this.cenario);
	    for (var i = this.elementos.length - 1; i >= 0; i--) {
	    	this.elementos[i].preload();
	    };
	    for (var i = this.elementosSobre.length - 1; i >= 0; i--) {
	    	this.elementosSobre[i].preload();
	    };
	},

	create: function(){
		game.engine.add.sprite(0, 0, 'cenario');

		for (var i = this.elementos.length - 1; i >= 0; i--) {
			this.elementos[i].create();
		};
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
	},

	limpaCena: function(){
		this.temporario = this.elementos;
	},

	carregaElementosSobre: function(){
		for (var i = this.elementosSobre.length - 1; i >= 0; i--) {
			this.elementosSobre[i].create();
		};
	},



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

	preload: function(){

	},

	create: function(){

	},
	
	update: function(pointer){

        console.log(pointer.withinGame);
		
		if(this.area.isPointInPoly(pointer)){
            console.log(game.jogador.andando);
            console.log(game.jogador);
			console.log('X:'+pointer.x+' Y:'+pointer.y);
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
	this.largura = largura;
	this.altura = altura;
	this.area = null;
	this.sprite = null;
};

Objeto.prototype = {
	
	preload: function(){
		game.engine.load.image(this.nome,this.caminhoDoSprite);
	},

	create: function(){
		this.sprite = game.engine.add.sprite(this.x, this.y, this.nome);
		this.sprite.anchor.setTo(0.5,0.5);
		this.area = new Poligono([this.x, this.y, this.x, this.y + this.largura, this.x + this.altura, this.y + this.largura, this.x + this.altura, this.y])
	},

	update: function(pointer){
		if (this.area.isPointInPoly(pointer)&& (game.engine.physics.arcade.distanceToXY(game.jogador.sprite, this.x, this.y) < 150)) {
				console.log('objeto');
				game.cena.removeObjeto(this.nome);
		};
	},

	clear: function(){
		this.sprite.kill();
		this.area = null;
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
	this.defaultXml = 
		'<xml>' +
		'<block type="cima" id="28" inline="false" x="40" y="20">' +
		'</block>' +
		'</xml>'; 

	this.newTree = 	'<xml>'+
				'<block type="cima"></block>' +
				'<block type="baixo"></block>' +
				'<block type="direita"></block>' +
				'<block type="esquerda"></block>' +
				'</xml>';
	this.caminho = [[ , , , , ,1],
				 	[1,1, ,1, ,3],
				 	[2,1, ,1, ,1],
				 	[ , , ,1, ,1]];
	this.posSub = {x:5,y:1};
	this.colidiu = false;
	this.sub = null;
	this.tweenQueue = [];
	this.tweenColisao = null;
	};


Computador.prototype = {

	preload: function(){
		game.engine.load.image(this.nome,this.caminhoDoSprite);
		game.engine.load.image('pc_sub','assets/pc_sub.png');
		game.engine.load.image('sub','assets/sub.png');
		game.engine.load.image('colide','assets/colide.png');
	},

	create: function(){
		this.sprite = game.engine.add.sprite(this.x, this.y, this.nome);
		// this.sprite.anchor.setTo(0.5,0.5);
	},

	update: function(pointer){
		if (this.area.isPointInPoly(pointer)&& (game.engine.physics.arcade.distanceToXY(game.jogador.sprite, this.x, this.y) < 200)) {
				console.log('computador');
				this.pc_sub = game.engine.add.sprite(401,0,'pc_sub');
				this.sub = game.engine.add.sprite(700,185,'sub');
				Blockly.updateToolbox(this.newTree);
				var xml = Blockly.Xml.textToDom(this.defaultXml);
				Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
				document.getElementById('button').innerHTML = ' <button type="button" onclick="game.runCode()">Run</button> ';
				document.getElementById('block').style.zIndex = '9999';
				document.getElementById("jogo").style.zIndex = '2';
				
		};

	},


	animacao: function(){
		if(this.tweenQueue.length != 0){
			tween = this.tweenQueue.shift();
			tween.start();
		}
	},

	updateWorkspace: function(){
		this.defaultXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
	},

	colisao: function(){
		timer = new Phaser.Timer(game.engine,true);
		timer.add(1000,function(){
			this.sub.kill();
			this.colide = game.engine.add.sprite(450+(this.posSub['x']*50),135+(this.posSub['y']*50),'colide');
			c
		},this);
		timer.start();
		this.tweenColisao = game.engine.add.tween(this.colide).to({ x: 450+(this.posSub['x']*50), y: 135+(this.posSub['y']*50) },1000, Phaser.Easing.Linear.None,false,2000);
		this.tweenColisao.onComplete.addOnce(function(){
			this.sub.reset(700,185);
			this.posSub = {x:5,y:1};
			this.colide.kill();
			this.colidiu = false;
		}, this);
		this.tweenQueue.push(this.tweenColisao);
	},

	move: function(direcao){
		if(this.colidiu == false){
			if(direcao == 'cima'){
				this.posSub['y'] -= 1;
				if(this.posSub['y'] >= 0 && this.posSub['y']< 4 
					&& this.caminho[this.posSub['y']][this.posSub['x']] != 1){
					tween = game.engine.add.tween(this.sub).to({ x: 450+(this.posSub['x']*50), y: 135+(this.posSub['y']*50) },1, Phaser.Easing.Linear.None,false,1000);
					tween.onComplete.addOnce(function(){	
						this.animacao();
					}, this);
					this.tweenQueue.push(tween);
				}else{
					if(this.caminho[this.posSub['y']][this.posSub['x']] == 1){
						this.colisao();
					}
				}
			}else if(direcao == 'baixo'){
				this.posSub['y'] += 1;
				if(this.posSub['y'] >= 0 && this.posSub['y']< 4 
					&& this.caminho[this.posSub['y']][this.posSub['x']] != 1){
					tween = game.engine.add.tween(this.sub).to({ x: 450+(this.posSub['x']*50), y: 135+(this.posSub['y']*50) },1, Phaser.Easing.Linear.None,false, 1000);
					tween.onComplete.addOnce(function(){
						this.animacao();
					}, this) ;
					this.tweenQueue.push(tween);
				}else{
					if(this.caminho[this.posSub['y']][this.posSub['x']] == 1){
						tween = this.tweenQueue[this.tweenQueue.length-1];
						tween.onComplete.removeAll();
						tween.onComplete.addOnce(function(){
							this.colisao();
						},this);
					}
				}
			}else if(direcao == 'esquerda'){
				this.posSub['x'] -= 1;
				if(this.posSub['x'] >= 0 && this.posSub['x']< 6 
					&& this.caminho[this.posSub['y']][this.posSub['x']] != 1){
					tween = game.engine.add.tween(this.sub).to({ x: 450+(this.posSub['x']*50), y: 135+(this.posSub['y']*50) },1, Phaser.Easing.Linear.None,false,1000);
				console.log(tween);
					tween.onComplete.addOnce(function(){
						this.animacao();
					}, this);
					this.tweenQueue.push(tween);
				}else{
					if(this.caminho[this.posSub['y']][this.posSub['x']] == 1){
						tween = this.tweenQueue[this.tweenQueue.length-1];
						tween.onComplete.removeAll();
						tween.onComplete.addOnce(function(){
							this.colisao();
						},this);
					}
				}
			}else if(direcao == 'direita'){
				this.posSub['x'] += 1;
				if(this.posSub['x'] >= 0 && this.posSub['x']< 6 
					&& this.caminho[this.posSub['y']][this.posSub['x']] != 1){
					tween = game.engine.add.tween(this.sub).to({ x: 450+(this.posSub['x']*50), y: 135+(this.posSub['y']*50) },1, Phaser.Easing.Linear.None,false, 1000);
					tween.onComplete.addOnce(function(){
						this.animacao();
					}, this);
					this.tweenQueue.push(tween);
				}else{
					if(this.caminho[this.posSub['y']][this.posSub['x']] == 1){
						tween = this.tweenQueue[this.tweenQueue.length-1];
						tween.onComplete.removeAll();
						tween.onComplete.addOnce(function(){
							this.colisao();
						},this);
					}
				}
			}
		}
	},

	

};

TextBox = function(){
	this.linhas = new Array();
	this.sprite = null;
	this.string = null;
	this.slice = 11;
};

TextBox.prototype = {
	preload: function(){
		game.engine.load.bitmapFont('carrier','assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
		game.engine.load.image('textbox', 'assets/textbox3.png');
	},

	create: function(string){
		this.sprite = game.engine.add.sprite(21,405, 'textbox');
		this.string = string;
		posY = 463;
		this.linhas[0] = game.engine.add.bitmapText(53, 427, 'carrier',this.string.substring(0, 10), 19);
		for (var i = 1; i < 4; i++) {
			this.linhas[i] = game.engine.add.bitmapText(76, posY, 'carrier',this.string.substring(this.slice, this.slice + 30), 19);
			this.slice +=30;
			posY += 36;
		};
	},

	next: function(){
		for (var i = 1; i < 4; i++) {
			this.linhas[i] = this.string.substring(this.slice, this.slice + 31);
			this.slice +=31;
		};
	}

}






Fase1 = function(){

};

Fase1.prototype = {

	preload: function(){

	},

	create: function(){

	},

	update: function(){

	}
}

Fase2 = function(){

};

Fase2.prototype = {

	preload: function(){

	},

	create: function(){

	},

	update: function(){
		
	}
}

Fase3 = function(){

};

Fase3.prototype = {

	preload: function(){

	},

	create: function(){

	},

	update: function(){
		
	}
}

Menu = function(){

}

Menu.prototype = {
	preload: function(){

	},

	create: function(){

	},

	update: function(){
		
	}
}