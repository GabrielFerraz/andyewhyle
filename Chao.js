Chao = function(pontos){
	this.area = new Poligono(pontos);
}

Chao.prototype = {
	
	update: function(pointer){

        console.log(pointer.withinGame);
		
		if((this.area.isPointInPoly(pointer)) && (pointer.withinGame == true)){
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