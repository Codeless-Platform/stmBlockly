/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Time blocks.
 *     Arduino built-in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.time');

goog.require('Blockly.Arduino');


/**
 * Code generator for the delay Arduino block.
 * Arduino code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['time_delay'] = function(block) {
  var delayTime = Blockly.Arduino.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'delay_ms(' + delayTime + ');\n';
  return code;
};



/**
 * Code generator for the wait forever (end of program) block
 * Arduino code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['infinite_loop'] = function(block) {
  return 'while(true);\n';
};

// New block 
/**
 * 
 */
Blockly.Arduino['time_clockEN'] = function(block) {
  var peripheralID = block.getFieldValue('PERIPHRAL');
  var busID= 'APB2_ID';
  if((peripheralID == 'USART2') || (peripheralID == 'USART3') || (peripheralID == 'SPI2') || (peripheralID == 'I2C2')||(peripheralID == 'I2C1'))
      busID = 'APB1_ID'
  var pinMainCode = '\nRCC_CLK_EN(' + busID + ','+ peripheralID+ '_ID);\n';
  Blockly.Arduino.addMain('time_' +peripheralID, pinMainCode, false);
  return "";
};


Blockly.Arduino['time_clockDisable'] = function(block) {
  var peripheralID = block.getFieldValue('PERIPHRAL');
  var busID= 'APB2_ID';
  if((peripheralID == 'USART2') || (peripheralID == 'USART3') || (peripheralID == 'SPI2') || (peripheralID == 'I2C2')||(peripheralID == 'I2C1'))
      busID = 'APB1_ID'
  var Code = 'RCC_CLK_RST(' + busID + ','+ peripheralID+ '_ID);\n';
  Blockly.Arduino.addMain('time' +peripheralID, Code, false);
  return "";
};