/**
 * @fileoverview Code generator for Keypad in HAL layer
 *
 */
'use strict';

goog.provide('Blockly.Arduino.lcd');

goog.require('Blockly.Arduino');
var type = [];
Blockly.Arduino['lcd_init'] = function (block) {
  var ID = block.getFieldValue('ID');
  type[ID] = block.getFieldValue('TYPE');
  if (type[ID] == 'Standard') {
    var port = block.getFieldValue('PORT');
    var gpio = 'GPIO' + port.charAt(4);
    var D4 = 'PIN_' + block.getFieldValue('d4').toString().substring(2);
    var D5 = 'PIN_' + block.getFieldValue('d5').toString().substring(2);
    var D6 = 'PIN_' + block.getFieldValue('d6').toString().substring(2);
    var D7 = 'PIN_' + block.getFieldValue('d7').toString().substring(2);
    var RS = 'PIN_' + block.getFieldValue('RS').toString().substring(2);
    var EN = 'PIN_' + block.getFieldValue('EN').toString().substring(2);
    var SIZE = 'LCD_' + block.getFieldValue('SIZE');

    for (var i = 4; i < 8; i++) {
      var pin = block.getFieldValue('d' + i);
      Blockly.Arduino.reservePin(
        block,
        pin,
        Blockly.Arduino.PinTypes.OUTPUT,
        'LCD pins'
      );
    }
    pin = block.getFieldValue('RS');
    Blockly.Arduino.reservePin(
      block,
      pin,
      Blockly.Arduino.PinTypes.OUTPUT,
      'LCD pins'
    );
    pin = block.getFieldValue('EN');
    Blockly.Arduino.reservePin(
      block,
      pin,
      Blockly.Arduino.PinTypes.OUTPUT,
      'LCD pins'
    );
    var pinMainCode = `
    LCD_t ${ID}= {FOUR_BIT_MODE,${SIZE},${gpio},${gpio},${EN},${RS},${D4},${D5},${D6},${D7}};
    lcd_init(&${ID});`;
    Blockly.Arduino.addMain('lcd_' + ID, pinMainCode, true);

    return '';
  } else if (type[ID] == `I2C`) {
    var SIZE = 'LCD_' + block.getFieldValue('SIZE');
    var I2C = block.getFieldValue('I2C');
    var address = block.getFieldValue('ADDRESS');
    var cols = 16,
      rows = 2;
    if (SIZE == 'LCD_4x16') rows = 4;
    else if (SIZE == 'LCD_4x20') {
      rows = 4;
      cols = 20;
    }
    var pinMainCode = `LCD_I2C_t ${ID} = {${SIZE},${I2C},${address},${rows},${cols}};
    lcd_I2C_init(&${ID});\n`;
    Blockly.Arduino.addMain('lcd_' + ID, pinMainCode, true);

    return '';
  }
};
//send char

Blockly.Arduino['lcd_sendChar'] = function (block) {
  var ID = block.getFieldValue('ID');
  var data =
    Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var code =
    type[ID] == 'Standard'
      ? `lcd_Send_Char(${data},&${ID});\n`
      : `lcd_I2C_Send_Char(&${ID},${data});\n`;
  return code;
};
// send string

Blockly.Arduino['lcd_sendString'] = function (block) {
  var ID = block.getFieldValue('ID');
  var data =
    Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var code =
    type[ID] == 'Standard'
      ? `lcd_send_String(${data},&${ID});\n`
      : `lcd_I2C_send_String(&${ID},${data});\n`;
  return code;
};
// send Number

Blockly.Arduino['lcd_sendNumber'] = function (block) {
  var ID = block.getFieldValue('ID');
  var data =
    Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var code =
    type[ID] == 'Standard'
      ? `lcd_display_Real_number(${data},&${ID});\n`
      : `lcd_I2C_display_Real_number(&${ID},${data});\n`;

  return code;
};

// clear screen

Blockly.Arduino['lcd_clear'] = function (block) {
  var ID = block.getFieldValue('ID');
  return type[ID] == 'Standard'
    ? `lcd_Clear_Screen(&${ID});\n`
    : `lcd_I2C_Clear_Screen(&${ID});\n`;
};

// go to x , y
Blockly.Arduino['lcd_goto'] = function (block) {
  var ID = block.getFieldValue('ID');
  var x =
    Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var y =
    Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';

  var code =
    type[ID] == 'Standard'
      ? `lcd_GOTO_XY(${x}, ${y},&${ID});\n`
      : `lcd_I2C_GOTO_XY(&${ID},${x}, ${y});\n`;
  return code;
};
