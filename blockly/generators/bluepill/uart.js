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
  var globalCode = 'USART_pinConfig_t USART_pinConfig;\n';
  Blockly.Arduino.addInclude('uart_', globalCode);
  var uartPins = {
    USART1: ['PA9', 'PA10'],
    USART2: ['PA2', 'PA3'],
    USART3: ['PB10', 'PB11'],
  };
  var pin = uartPins[uartID] || uartPins['USART1'];
  
  Blockly.Arduino.reservePin(
    block,
    pin[0],
    Blockly.bluepill.PinTypes.TX,
    'UART TX pin'
  );
  Blockly.Arduino.reservePin(
    block,
    pin[1],
    Blockly.bluepill.PinTypes.RX,
    'UART RX pin'
  );
 
  var mainCode = ` USART_pinConfig.BaudRate = USART_BaudRate_${baudRate};
  USART_pinConfig.DataLength = USART_DataLength8;
  USART_pinConfig.FlowControl = USART_FlowControl_NONE;
  USART_pinConfig.IRQ_Enable = Disable;
  USART_pinConfig.P_CallBack_Fun = NULL;
  USART_pinConfig.Parity = USART_Parity_None;
  USART_pinConfig.StopBits = USART_StopBits_1;
  USART_pinConfig.USART_Mode =USART_TXRXEN;
  USART_init(&USART_pinConfig, ${uartID});
  USART_SetPins(${uartID});\n`;
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
