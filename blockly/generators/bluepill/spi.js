/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino ode generator for SPI library blocks.
 *     The Arduino SPI library docs: http://arduino.cc/en/Reference/SPI
 */
'use strict';

goog.provide('Blockly.Arduino.spi');

goog.require('Blockly.Arduino');

/**
 * Code generator for the SPI configuration block. It does not add any LoC to
 * the loop(), but it generates code for the setup() function.
 * Arduino code: #include <SPI.h>
 *               setup() { SPI.setBitOrder(X);
 *                         SPI.setDataMode(Y);
 *                         SPI.setClockDivider(Z);
 *                         SPI.begin(); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['spi_init'] = function (block) {
  var spiId = block.getFieldValue('SPI_ID');
  var spiMode = block.getFieldValue('SPI_MODE');
  var spiClk = block.getFieldValue('SPI_CLK');
  var CS = block.getFieldValue('CS');
  var gpio = 'GPIO' + CS.charAt(1);
  var pinnumber = 'PIN_' + CS.slice(2);

  var SPI_Polarity, SPI_Phase;
  if (spiClk == 'SPI_MODE0') {
    SPI_Polarity = 'SPI_CLK_Polarity_0';
    SPI_Phase = 'SPI_CLK_Phase_1st';
  } else if (spiClk == 'SPI_MODE1') {
    SPI_Polarity = 'SPI_CLK_Polarity_0';
    SPI_Phase = 'SPI_CLK_Phase_2nd';
  } else if (spiClk == 'SPI_MODE2') {
    SPI_Polarity = 'SPI_CLK_Polarity_1';
    SPI_Phase = 'SPI_CLK_Phase_1st';
  } else if (spiClk == 'SPI_MODE3') {
    SPI_Polarity = 'SPI_CLK_Polarity_1';
    SPI_Phase = 'SPI_CLK_Phase_2nd';
  }
  var mainCode = `\nSPI_PinConfig_t SPI_pinConfig;
	SPI_pinConfig.Commuincation_Mode = SPI_Direction_2Lines_RXTX;
	SPI_pinConfig.Data_Size = SPI_Data8;
	SPI_pinConfig.Frame_Format = SPI_Frame_MSB;
	SPI_pinConfig.BaudRate = SPI_BaudRate_8;
	SPI_pinConfig.CLK_Polarity = ${SPI_Polarity};
	SPI_pinConfig.CLK_Phase = ${SPI_Phase};\n`;
  if (spiMode == 'MASTER') {
    mainCode += `SPI_pinConfig.SPI_Mode = SPI_Mode_Master;
    SPI_pinConfig.NSS =  SPI_NSS_Soft_set;
    SPI_pinConfig.IRQ_Enable = SPI_IRQ_EN_None;
    SPI_pinConfig.P_CallBackFun = NULL;
  
    // Configure SS pin
    GPIO_PinConfig_t GPIO_pinConfig;
    GPIO_pinConfig.MODE = MODE_OUTPUT_PP;
    GPIO_pinConfig.Output_Speed = SPEED_10M;
    GPIO_pinConfig.Pin_Number = ${pinnumber};
    GPIO_init(${gpio}, &GPIO_pinConfig);
    GPIO_WritePin(${gpio}, ${pinnumber}, PIN_HIGH);`;

    // write high as idle case
  } else if (spiMode == 'SLAVE') {
    mainCode += `	SPI_pinConfig.SPI_Mode = SPI_Mode_Slave;
    SPI_pinConfig.NSS = SPI_NSS_Hard_Slave;
    SPI_pinConfig.IRQ_Enable = SPI_IRQ_EN_None;
    SPI_pinConfig.P_CallBackFun = NULL;`;
  }
  mainCode += `	SPI_init(&SPI_pinConfig, ${spiId});
	SPI_GPIO_SetPins(${spiId});`;
  Blockly.Arduino.addMain('spi_', mainCode, true);
  return '';
};

/**
 * Code generator for the SPI transfer block.
 * SPI bus can have several slaves, which are selected using a digital output
 * as a SS pin. This digital pin will be configured as a normal output.
 * Arduino code: #include <SPI.h>
 *               setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, HIGH);
 *                       SPI.transfer(0);
 *                       digitalWrite(X, LOW); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */

Blockly.Arduino['spi_RXTX'] = function (block) {
  var spiId = block.getFieldValue('SPI_ID');
  var spiData =
    Blockly.Arduino.valueToCode(
      block,
      'SPI_DATA',
      Blockly.Arduino.ORDER_ATOMIC
    ) || '0';
  var declarationCode = 'uint16 ' + spiData + ';\n';
  Blockly.Arduino.addDeclaration('uart_', declarationCode);
  if (spiId == 'SPI1') {
    var code = `GPIO_WritePin(GPIOA, PIN_4, PIN_LOW);
   SPI_RXTX(SPI1, &${spiData}, Pollingenable);
   GPIO_WritePin(GPIOA, PIN_4, PIN_HIGH);
    `;
  } else {
    var code = `GPIO_WritePin(GPIOA, PIN_12, PIN_LOW);
    SPI_RXTX(SPI2, &${spiData}, Pollingenable);
    GPIO_WritePin(GPIOA, PIN_12, PIN_HIGH);  `;
  }
  // Reserve SPI pins MOSI, MISO, and SCK
  var spiPins =
    spiId == 'SPI1'
      ? ['PA4', 'PA5', 'PA6', 'PA7']
      : ['PB12', 'PB13', 'PB14', 'PB15'];
  for (var i = 0; i < spiPins.length; i++) {
    Blockly.Arduino.reservePin(
      block,
      spiPins[i],
      Blockly.Arduino.PinTypes.SPI,
      'SPI pins'
    );
  }
  return code;
};
