'use strict';

goog.provide('Blockly.Arduino.oled');

goog.require('Blockly.Arduino');

Blockly.Arduino['oled_init'] = function (block) {
  var I2C = block.getFieldValue('I2C');
  var pinMainCode = `oled_Init(${I2C});\n`;
  Blockly.Arduino.addMain('oled_', pinMainCode, false);
  return '';
};
Blockly.Arduino['oled_sendString'] = function (block) {
  var data =
    Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var fonts = block.getFieldValue('FONT');
  var color = block.getFieldValue('COLOR') === 'White' ? 1 : 0;

  var code = `oled_writeString(${data},&${fonts},${color});\n`;
  return code;
};
//clear
Blockly.Arduino['oled_clear'] = function (block) {
  return `oled_Clear();\n`;
};

// go to x , y
Blockly.Arduino['oled_goto'] = function (block) {
  var x =
    Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var y =
    Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';

  var code = `oled_GotoXY(${x}, ${y});\n`;
  return code;
};

Blockly.Arduino['oled_UpdateScreen'] = function (block) {
  return `oled_UpdateScreen();\n`;
};

Blockly.Arduino['oled_Scroll'] = function (block) {
  var dir = block.getFieldValue('SCROLL');
  var code;
  var x =
    Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var y =
    Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';

  if (dir === 'Left') {
    code = `oled_ScrollLeft(${x}, ${y});\n`;
  } else if (dir === 'Right') {
    code = `oled_ScrollRight(${x}, ${y});\n`;
  } else if (dir === 'diagonal Left') {
    code = `oled_Scrolldiagleft(${x}, ${y});\n`;
  } else if (dir === 'diagonal Right') {
    code = `oled_Scrolldiagright(${x}, ${y});\n`;
  }

  return code;
};
Blockly.Arduino['oled_StopScroll'] = function (block) {
  return `oled_Stopscroll();\n`;
};

Blockly.Arduino['oled_Draw'] = function (block) {
  var x1 =
    Blockly.Arduino.valueToCode(block, 'X1', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var y1 =
    Blockly.Arduino.valueToCode(block, 'Y1', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var shape = block.getFieldValue('SHAPE');
  var color = block.getFieldValue('COLOR') === 'White' ? 1 : 0;
  var filled = block.getFieldValue('FILLED') === 'TRUE' ? 1 : 0;

  var code;
  var arr = getXY(shape);
  if (filled) {
    // fill functions
    if (shape === 'Line') {
      code = `oled_DrawLine(${x1},${y1},${arr[0]},${arr[1]},${color});\n`;
    } else if (shape === 'Triangle') {
      code = `oled_DrawTriangle(${x1},${y1},${arr[0]},${arr[1]},${arr[2]},${arr[3]},${color});\n`;
    } else if (shape === 'Rectangle') {
      code = `oled_DrawFilledRectangle(${x1},${y1},${arr[0]},${arr[1]},${color});\n`;
    } else if (shape === 'Circle') {
      code = `oled_DrawFilledCircle(${x1},${y1},${arr[0]},${color});\n`;
    }
  } else {
    // no fill functions
    if (shape === 'Line') {
      code = `oled_DrawLine(${x1},${y1},${arr[0]},${arr[1]},${color});\n`;
    } else if (shape === 'Triangle') {
      code = `oled_DrawTriangle(${x1},${y1},${arr[0]},${arr[1]},${arr[2]},${arr[3]},${color});\n`;
    } else if (shape === 'Rectangle') {
      code = `oled_DrawRectangle(${x1},${y1},${arr[0]},${arr[1]},${color});\n`;
    } else if (shape === 'Circle') {
      code = `oled_DrawCircle(${x1},${y1},${arr[0]},${color});\n`;
    }
  }

  function getXY(shape) {
    var x2 =
      Blockly.Arduino.valueToCode(block, 'X2', Blockly.Arduino.ORDER_ATOMIC) ||
      '0';
    var y2 =
      Blockly.Arduino.valueToCode(block, 'Y2', Blockly.Arduino.ORDER_ATOMIC) ||
      '0';
    var x3 =
      Blockly.Arduino.valueToCode(block, 'X3', Blockly.Arduino.ORDER_ATOMIC) ||
      '0';
    var y3 =
      Blockly.Arduino.valueToCode(block, 'Y3', Blockly.Arduino.ORDER_ATOMIC) ||
      '0';
    var r =
      Blockly.Arduino.valueToCode(
        block,
        'Radius',
        Blockly.Arduino.ORDER_ATOMIC
      ) || '0';
    var arr = [];
    switch (shape) {
      case 'Line':
      case 'Rectangle':
        arr = [x2, y2];
        break;
      case 'Triangle':
        arr = [x2, y2, x3, y3];
        break;
      case 'Circle':
        arr = [r];
        break;
    }
    return arr;
  }
  return code;
};

Blockly.Arduino['oled_drawBitmap'] = function (block) {
  var x =
    Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var y =
    Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';

  var width =
    Blockly.Arduino.valueToCode(block, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var Height =
    Blockly.Arduino.valueToCode(
      block,
      'HEIGHT',
      Blockly.Arduino.ORDER_ATOMIC
    ) || '0';

  var Data =
    Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';

  var color = block.getFieldValue('COLOR') === 'White' ? 1 : 0;

  var code = `oled_DrawBitmap(${x},${y},${Data},${width},${Height},${color});\n`;

  return code;
};
