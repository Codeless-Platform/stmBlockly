/**
 * @fileoverview Code generator for Keypad in HAL layer
 *
 */
'use strict';

goog.provide('Blockly.Arduino.keypad');

goog.require('Blockly.Arduino');

Blockly.Arduino['keypad_init'] = function (block) {
  var port = block.getFieldValue('PORT');
  var ID = block.getFieldValue('ID');

  var C3,
    size = 3;
  var R0 = 'PIN_' + block.getFieldValue('R0').toString().substring(2);
  var R1 = 'PIN_' + block.getFieldValue('R1').toString().substring(2);
  var R2 = 'PIN_' + block.getFieldValue('R2').toString().substring(2);
  var R3 = 'PIN_' + block.getFieldValue('R3').toString().substring(2);
  var C0 = 'PIN_' + block.getFieldValue('C0').toString().substring(2);
  var C1 = 'PIN_' + block.getFieldValue('C1').toString().substring(2);
  var C2 = 'PIN_' + block.getFieldValue('C2').toString().substring(2);
  if (block.getFieldValue('SIZE') === '4x4') {
    C3 = 'PIN_' + block.getFieldValue('C3').toString().substring(2);
    size = 4;
    var pinMainCode = `\nkeypad_t ${ID} = {${R0},${R1},${R2},${R3},${C0},${C1},${C2}, ${C3},4,${port}};\nKeypad_init(&${ID});\n `;
  } else {
    var pinMainCode = `\nkeypad_t ${ID} = {${R0},${R1},${R2},${R3},${C0},${C1},${C2},0,3,${port}};\nKeypad_init(&${ID});\n `;
  }
  for (var i = 0; i < 4; i++) {
    var pin = block.getFieldValue('R' + i);
    Blockly.Arduino.reservePin(
      block,
      pin,
      Blockly.Arduino.PinTypes.INPUT,
      'keypad pins'
    );
  }
  for (var i = 0; i < size; i++) {
    var pin = block.getFieldValue('C' + i);
    Blockly.Arduino.reservePin(
      block,
      pin,
      Blockly.Arduino.PinTypes.INPUT,
      'keypad pins'
    );
  }

  Blockly.Arduino.addMain('keypad_' + ID, pinMainCode, true);

  return '';
};

Blockly.Arduino['keypad_getKey'] = function (block) {
  var ID = block.getFieldValue('ID');
  var pinMainCode = `Keypad_Get_Key(&${ID})`;

  return [pinMainCode, Blockly.Arduino.ORDER_ATOMIC];
};
