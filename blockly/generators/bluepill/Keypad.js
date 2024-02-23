
/**
 * @fileoverview Code generator for Keypad in HAL layer
 *    
 */
'use strict';

goog.provide('Blockly.Arduino.keypad');

goog.require('Blockly.Arduino');





Blockly.Arduino['keypad_init'] = function(block) {
  var port = block.getFieldValue('PORT');
  var gpio = port.charAt(4); 
  for(var i =0 ;i<7 ; i++){
     var pin = gpio + i;
     Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.INPUT, 'keypad pins');
     }
     
     editFileAtLine("STMCubeProject/HAL/Keypad/Keypad.h", 14, "#define Keypad_PORT     "+port);
     

  var pinMainCode = '\nKeypad_init();';
  Blockly.Arduino.addMain('keypad_' + port, pinMainCode, false);
  
  return "";

};

 Blockly.Arduino['keypad_getKey'] = function(block) {
  
   var pinMainCode = 'Keypad_Get_Key()';

  return [pinMainCode, Blockly.Arduino.ORDER_ATOMIC];
 };


