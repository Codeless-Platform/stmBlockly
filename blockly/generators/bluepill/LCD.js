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
    var pins = ['d4', 'd5', 'd6', 'd7', 'RS', 'EN'].map((pin) => {
      return 'PIN_' + block.getFieldValue(pin).toString().substring(2);
    });
    var SIZE = 'LCD_' + block.getFieldValue('SIZE');
    reservePinLCD(type[ID],this)
    var pinMainCode = `LCD_t ${ID} = {FOUR_BIT_MODE, ${SIZE}, ${gpio}, ${gpio}, ${pins[5]}, ${pins[4]}, ${pins[0]}, ${pins[1]}, ${pins[2]}, ${pins[3]}};
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
    reservePinLCD(type[ID],this)
    var pinMainCode = `LCD_I2C_t ${ID} = {${SIZE},${I2C},${address},${rows},${cols}};
    lcd_I2C_init(&${ID});\n`;
    Blockly.Arduino.addMain('lcd_' + ID, pinMainCode, true);

    return '';
  }
};
function reservePinLCD(type,obj){
  if(type == 'Standard'){

    var dPins = ['d4', 'd5', 'd6', 'd7'];
    var pinTypes = ['D4', 'D5', 'D6', 'D7'];

for (var i = 0; i < dPins.length; i++) {
  var pin = obj.getFieldValue(dPins[i]);
  Blockly.Arduino.reservePin(
    obj,
    pin,
    Blockly.bluepill.PinTypes[pinTypes[i]], 
    'LCD pin '+dPins[i] 
  );
}

var RS = obj.getFieldValue('RS');
Blockly.Arduino.reservePin(
  obj,
  RS,
  Blockly.bluepill.PinTypes.RS,
  'LCD pin RS'
);

var EN = obj.getFieldValue('EN');
Blockly.Arduino.reservePin(
  obj,
  EN,
  Blockly.bluepill.PinTypes.EN,
  'LCD pin EN'
);

  }else{
    var i2cPins = {
      I2C1: ['PB7', 'PB6'],
      I2C2: ['PB11', 'PB10'],
    };    
    var pins;
    if (obj.getFieldValue('I2C')=='I2C1') {
      pins = i2cPins['I2C1'];
    } else {
      pins = i2cPins['I2C2']; // Default to I2C1 pins if I2C type is not found
    }
    Blockly.Arduino.reservePin(obj, pins[0], Blockly.bluepill.PinTypes.SDA, 'I2C SDA Pin');
    Blockly.Arduino.reservePin(obj, pins[1], Blockly.bluepill.PinTypes.SCL, 'I2C SCL Pin');
    
  }

}


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
