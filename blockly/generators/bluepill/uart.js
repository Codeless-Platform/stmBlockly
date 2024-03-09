/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino serial blocks.
 *     Arduino Serial library docs: https://www.arduino.cc/en/Reference/Serial
 *
 * TODO: There are more functions that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Arduino.uart');

goog.require('Blockly.Arduino');

Blockly.Arduino['uart_init'] = function (block) {
  var uartID = block.getFieldValue('UART_ID');
  var baudRate = block.getFieldValue('SPEED');
  var mainCode = `\nUSART_pinConfig_t USART_pinConfig = {USART_TXRXEN,USART_BaudRate_${baudRate} ,USART_StopBits_1,USART_DataLength8,USART_Parity_None,USART_FlowControl_NONE,Disable,NULL}; 
                   \nUSART_init(&USART_pinConfig, ${uartID});\n USART_SetPins(${uartID});\n`;
  Blockly.Arduino.addMain('uart_' + uartID, mainCode, true);
  var code = '';
  return code;
};

Blockly.Arduino['uart_write'] = function (block) {
  var uartID = block.getFieldValue('UART_ID');
  var content =
    Blockly.Arduino.valueToCode(
      block,
      'CONTENT',
      Blockly.Arduino.ORDER_ATOMIC
    ) || '0';
  var code = `\nUSART_SendString(${uartID}, ${content});\n`;
  return code;
};

Blockly.Arduino['uart_recieve'] = function (block) {
  var uartID = block.getFieldValue('UART_ID');
  var content =
    Blockly.Arduino.valueToCode(
      block,
      'CONTENT',
      Blockly.Arduino.ORDER_ATOMIC
    ) || '0';
  var declarationCode = 'uint16 ' + content + ';\n';
  Blockly.Arduino.addDeclaration('uart_', declarationCode);

  var code = `\nUSART_ReceiveString(${uartID}, &${content});\n`;
  return code;
};
