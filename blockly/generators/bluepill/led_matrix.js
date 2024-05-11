'use strict';

goog.provide('Blockly.Arduino.ledMatrix');

goog.require('Blockly.Arduino');

Blockly.Arduino['matrix_init'] = function (block) {
  var SPI = block.getFieldValue('SPI');
  var ID = block.getFieldValue('ID');
  var CS = 'PIN_' + block.getFieldValue('CS').toString().substring(2);
  var gpio = block.getFieldValue('CS').charAt(1);
  var pinMainCode = `led_matrix_t matrix_pinConfig${ID} = {${SPI},${CS},GPIO${gpio}};
  Led_Matrix_init(&matrix_pinConfig${ID});`;
  Blockly.Arduino.addMain('matrix_' + ID, pinMainCode, false);
  return '';
};

Blockly.Arduino['matrix_sendString'] = function (block) {
  var ID = block.getFieldValue('ID');
  var data =
    Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var code = `Led_Matrix_writeString(${data},&matrix_pinConfig${ID});\n`;
  return code;
};
