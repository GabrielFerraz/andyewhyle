Blockly.Blocks['math_test'] = {
  /**
   * Block for random fraction between 0 and 1.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(230);
    this.appendDummyInput()
        .appendField('teste dummy');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP);
  }
};

Blockly.JavaScript['math_test'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  return 'window.alert("Teste do bloco");\n';
};

Blockly.Blocks['direita'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Mover para Direita");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['direita'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'setTimeout(game.moveSub("direita"),1000);';
  return code;
};

Blockly.Blocks['esquerda'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Mover para Esquerda");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['esquerda'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'setTimeout(game.moveSub("esquerda"),1000);';
  return code;
};

Blockly.Blocks['cima'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Mover para Cima");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['cima'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'setTimeout(game.moveSub("cima"),1000);';
  return code;
};

Blockly.Blocks['baixo'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Mover para Baixo");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['baixo'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'setTimeout(game.moveSub("baixo"),1000);';
  return code;
};