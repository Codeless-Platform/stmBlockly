'use strict';

goog.provide('Blockly.Arduino.ledMatrix');

goog.require('Blockly.Arduino');

Blockly.Arduino['matrix_init'] = function (block) {
  var SPI = block.getFieldValue('SPI');
  var ID = block.getFieldValue('ID');
  var CS = 'PIN_' + block.getFieldValue('CS').toString().substring(2);
  var gpio = block.getFieldValue('CS').charAt(1);
  // Reserve SPI pins MOSI, MISO, and SCK
  var spiPins =
    SPI == 'SPI1'
      ? ['PA7', 'PA6', 'PA5']
      : ['PB13', 'PB14', 'PB15'];
   var spiPinType = ['MOSI','MISO','SCK']   
  for (var i = 0; i < spiPins.length; i++) {
    Blockly.Arduino.reservePin(
      block,
      spiPins[i],
      Blockly.bluepill.PinTypes[spiPinType[i]],
      'SPI pin '+spiPinType[i]
    );
  }
  Blockly.Arduino.reservePin(
    block,
    block.getFieldValue('CS'),
    Blockly.bluepill.PinTypes.LED_CS,
    'Led Matrix CS'
  );
  var pinMainCode = `led_matrix_t ${ID} = {${SPI},${CS},GPIO${gpio}};
  Led_Matrix_init(&${ID});`;
  Blockly.Arduino.addMain('matrix_' + ID, pinMainCode, true);
  return '';
};

Blockly.Arduino['matrix_sendString'] = function (block) {
  var ID = block.getFieldValue('ID');
  var data =
    Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var code = `Led_Matrix_writeString(${data},&${ID});\n`;
  return code;
};
