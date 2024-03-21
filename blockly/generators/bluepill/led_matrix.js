'use strict';

goog.provide('Blockly.Arduino.ledMatrix');

goog.require('Blockly.Arduino');

Blockly.Arduino['matrix_init'] = function (block) {
  var SPI = block.getFieldValue('SPI');
  var CS = 'PIN_' + block.getFieldValue('CS').toString().substring(2);
  var gpio = block.getFieldValue('CS').charAt(1);
  var pinMainCode = `Led_Matrix_init(${SPI},${CS},GPIO${gpio});\n`;
  Blockly.Arduino.addMain('oled_', pinMainCode, false);
  return '';
};

Blockly.Arduino['matrix_sendString'] = function (block) {
  var data =
    Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var code = `Led_Matrix_writeString(${data});\n`;
  return code;
};
