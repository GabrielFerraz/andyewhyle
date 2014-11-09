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

Blockly.Blocks['var'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput("NAME")
        .setCheck(["Boolean", "Number", "String"])
        .appendField("var")
        .appendField(new Blockly.FieldDropdown([["int", "INT"], ["bool", "BOOL"], ["car", "CHAR"]]), "TIPO")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(" =  ");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['var'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_tipo = block.getFieldValue('TIPO');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};


Blockly.Blocks['op'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendValueInput("INPUT1")
        .setCheck("Number")
        .appendField(" ");
    this.appendDummyInput()
        .appendField(" ")
        .appendField(new Blockly.FieldDropdown([["+", "SOMA"], ["-", "SUBT"], ["*", "MULT"], ["/", "DIV"]]), "OPERACAO");
    this.appendValueInput("INTPUT2")
        .setCheck("Number")
        .appendField(" ");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.JavaScript['op'] = function(block) {
  var value_input1 = Blockly.JavaScript.valueToCode(block, 'INPUT1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_intput2 = Blockly.JavaScript.valueToCode(block, 'INTPUT2', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operacao = block.getFieldValue('OPERACAO');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['var2'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("deslocamento =");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['var2'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};

Blockly.Blocks['decdeslocamento'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("var int deslocamento");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['decvalor1'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("var int valor1");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['decvalor2'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("var int valor2");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['atrvalor1'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("valor1 = 3");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['atrvalor2'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("valor2 = 5");
    this.setPreviousStatement(true);S
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['valor1'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("valor1");
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.Blocks['valor2'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("valor2");
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};