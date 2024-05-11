/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Implements the required data for functions for selecting
 *     amongst different Arduino boards.
 */
'use strict';

goog.provide('Blockly.Arduino.Boards');

goog.require('Blockly.Arduino');

/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the digital IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     digital IO pins.
 */
Blockly.Arduino.Boards.generateDigitalIo = function (pinStart, pinEnd) {
  var digitalIo = [];
  for (var i = pinStart; i < pinEnd + 1; i++) {
    digitalIo.push([i.toString(), i.toString()]);
  }
  return digitalIo;
};

Blockly.Arduino.Boards.generateDigitalIostm32 = function () {
  var digitalIo = [];
  for (var i = 0; i < 16; i++) {
    if (i == 13 || i == 14) continue;
    digitalIo.push(['PA' + i.toString(), 'PA' + i.toString()]);
  }

  for (var i = 16; i < 32; i++) {
    if (i - 16 == 2) continue;
    digitalIo.push(['PB' + (i - 16).toString(), 'PB' + (i - 16).toString()]);
  }

  for (var i = 32; i < 35; i++) {
    digitalIo.push(['PC' + (i - 19).toString(), 'PC' + (i - 19).toString()]);
  }
  return digitalIo;
};

/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the analogue IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     analogue IO pins.
 */
Blockly.Arduino.Boards.generateAnalogIo = function (pinStart, pinEnd) {
  var analogIo = [];
  for (var i = pinStart; i < pinEnd + 1; i++) {
    analogIo.push(['A' + i.toString(), 'A' + i.toString()]);
  }
  return analogIo;
};

Blockly.Arduino.Boards.generateAnalogIostm32 = function () {
  var analogIo = [];

  for (var i = 0; i < 8; i++) {
    analogIo.push(['PA' + i.toString(), 'PA' + i.toString()]);
  }

  for (var i = 8; i < 10; i++) {
    analogIo.push(['PB' + (i - 8).toString(), 'PB' + (i - 8).toString()]);
  }

  return analogIo;
};

/**
 * Creates a new Board Profile copying all the attributes from an existing
 * profile, with the exception of the name, and optionally the description and
 * compiler flag.
 * @param {!string} name_ Mandatory new name of the new board profile.
 * @param {string=} description Optional new description of the new profile.
 * @param {string=} compilerFlag Optional new description of the new profile.
 * @return {!Object} Duplicated object with the different argument data.
 */
Blockly.Arduino.Boards.duplicateBoardProfile = function (
  originalBoard,
  name_,
  description,
  compilerFlag
) {
  return {
    name: name_,
    description: description || originalBoard.description,
    compilerFlag: compilerFlag || originalBoard.compilerFlag,
    analogPins: originalBoard.analogPins,
    digitalPins: originalBoard.digitalPins,
    ports: originalBoard.ports, // EDITED HERE
    periphrals: originalBoard.periphrals,
    pwmPins: originalBoard.pwmPins,
    serial: originalBoard.serial,
    serialPins: originalBoard.serialPins,
    serialSpeed: originalBoard.serialSpeed,
    spi: originalBoard.spi,
    spiPins: originalBoard.spiPins,
    spiClockDivide: originalBoard.spiClockDivide,
    i2c: originalBoard.i2c,
    i2cPins: originalBoard.i2cPins,
    i2cSpeed: originalBoard.i2cSpeed,
    builtinLed: originalBoard.builtinLed,
    interrupt: originalBoard.interrupt,
  };
};

/** Object to contain all  board profiles. */
Blockly.Arduino.Boards.profiles = new Object();

/**  BluePill board profile (stm32) */
Blockly.Arduino.Boards.profiles.stm32f103c6 = {
  name: 'stm32F103C6',
  description: 'stm32 standard compatible board',
  compilerFlag: 'stm32duino:STM32F1:genericSTM32F103C',
  digitalPins: Blockly.Arduino.Boards.generateDigitalIostm32(),
  ports: [
    ['GPIOA', 'GPIOA'],
    ['GPIOB', 'GPIOB'],
    ['GPIOC', 'GPIOC'],
  ], // edited here
  full_ports: [
    ['GPIOA', 'GPIOA'],
    ['GPIOB', 'GPIOB'],
  ], // edited here
  peripherals: [
    ['GPIOA', 'GPIOA'],
    ['GPIOB', 'GPIOB'],
    ['GPIOC', 'GPIOC'],
    ['USART1', 'USART1'],
    ['USART2', 'USART2'],
    ['SPI1', 'SPI1'],
    ['I2C1', 'I2C1'],
  ],
  analog: [
    ['PA0', 'PA0'],
    ['PA1', 'PA1'],
    ['PA2', 'PA2'],
    ['PA3', 'PA3'],
    ['PA4', 'PA4'],
    ['PA5', 'PA5'],
    ['PA6', 'PA6'],
    ['PA7', 'PA7'],
    ['PB0', 'PB0'],
    ['PB1', 'PB1'],
  ],
  ADC: [
    ['ADC1', 'ADC1'],
    ['ADC2', 'ADC2'],
  ],
  uart: [
    ['USART1', 'USART1'],
    ['USART2', 'USART2'],
  ],
  uartSpeed: [
    ['2400', '2400'],
    ['9600', '9600'],
    ['19200', '19200'],
    ['57600', '57600'],
    ['115200', '115200'],
    ['230400', '230400'],
  ],
  spi: [['SPI1', 'SPI1']],
  spiPins: {
    SPI: [
      ['MOSI', 'PA7'],
      ['MISO', 'PA6'],
      ['SCK', 'PA5'],
    ],
  },
  spiClockDivide: [
    ['2 (36MHz)', 'SPI_CLOCK_DIV2'],
    ['4 (18MHz)', 'SPI_CLOCK_DIV4'],
    ['8 (9MHz)', 'SPI_CLOCK_DIV8'],
    ['16 (4.5MHz)', 'SPI_CLOCK_DIV16'],
    ['32 (2.25MHz)', 'SPI_CLOCK_DIV32'],
    ['64 (1.125MHz)', 'SPI_CLOCK_DIV64'],
    ['128 (562.5KHz)', 'SPI_CLOCK_DIV128'],
  ],
  i2c: [['I2C1', 'I2C1']],
  i2cPins: {
    Wire: [
      ['SDA', 'PB7'],
      ['SCL', 'PB6'],
    ],
  },
  i2cSpeed: [
    ['100kHz', '100000L'],
    ['400kHz', '400000L'],
  ],
  builtinLed: [['LED_BUILTIN', 'PC13']],
  interrupt: [
    ['interrupt0', 'PA0'],
    ['interrupt1', 'PA1'],
    ['interrupt2', 'PA2'],
    ['interrupt3', 'PA3'],
    ['interrupt4', 'PA4'],
    ['interrupt5', 'PA5'],
    ['interrupt6', 'PA6'],
    ['interrupt7', 'PA7'],
    ['interrupt8', 'PB0'],
    ['interrupt9', 'PB1'],
    ['interrupt10', 'PB2'],
    ['interrupt11', 'PB10'],
    ['interrupt12', 'PB11'],
    ['interrupt13', 'PB12'],
    ['interrupt14', 'PB13'],
    ['interrupt15', 'PB14'],
    ['interrupt16', 'PB15'],
    ['interrupt17', 'PB3'],
    ['interrupt18', 'PB4'],
    ['interrupt19', 'PB5'],
    ['interrupt20', 'PB8'],
    ['interrupt21', 'PB9'],
    ['interrupt22', 'PC10'],
    ['interrupt23', 'PC11'],
    ['interrupt24', 'PC12'],
    ['interrupt25', 'PC13'],
    ['interrupt26', 'PC14'],
    ['interrupt27', 'PC15'],
    ['interrupt28', 'PC6'],
    ['interrupt29', 'PC7'],
    ['interrupt30', 'PC8'],
    ['interrupt31', 'PC9'],
  ],
  pwm: [
    ['PA0', 'PA0'],
    ['PA2', 'PA2'],
    ['PA3', 'PA3'],
    ['PA6', 'PA6'],
    ['PA8', 'PA8'],
    ['PA9', 'PA9'],
    ['PA10', 'PA10'],
    ['PB0', 'PB0'],
    ['PB1', 'PB1'],
  ],
};

Blockly.Arduino.Boards.profiles.stm32f103c8 = {
  name: 'stm32F103C8',
  description: 'stm32 standard compatible board',
  compilerFlag: 'stm32duino:STM32F1:genericSTM32F103C',
  digitalPins: Blockly.Arduino.Boards.generateDigitalIostm32(),
  ports: [
    ['GPIOA', 'GPIOA'],
    ['GPIOB', 'GPIOB'],
    ['GPIOC', 'GPIOC'],
  ],
  full_ports: [
    ['GPIOA', 'GPIOA'],
    ['GPIOB', 'GPIOB'],
  ],
  peripherals: [
    ['GPIOA', 'GPIOA'],
    ['GPIOB', 'GPIOB'],
    ['GPIOC', 'GPIOC'],
    ['USART1', 'USART1'],
    ['USART2', 'USART2'],
    ['USART3', 'USART3'],
    ['SPI1', 'SPI1'],
    ['SPI2', 'SPI2'],
    ['I2C1', 'I2C1'],
    ['I2C2', 'I2C2'],
  ],
  analog: [
    ['PA0', 'PA0'],
    ['PA1', 'PA1'],
    ['PA2', 'PA2'],
    ['PA3', 'PA3'],
    ['PA4', 'PA4'],
    ['PA5', 'PA5'],
    ['PA6', 'PA6'],
    ['PA7', 'PA7'],
    ['PB0', 'PB0'],
    ['PB1', 'PB1'],
  ],
  ADC: [
    ['ADC1', 'ADC1'],
    ['ADC2', 'ADC2'],
  ],
  uart: [
    ['USART1', 'USART1'],
    ['USART2', 'USART2'],
    ['USART3', 'USART3'],
  ],
  uartSpeed: [
    ['2400', '2400'],
    ['9600', '9600'],
    ['19200', '19200'],
    ['57600', '57600'],
    ['115200', '115200'],
    ['230400', '230400'],
  ],
  spi: [
    ['SPI1', 'SPI1'],
    ['SPI2', 'SPI2'],
  ],
  spiClockDivide: [
    ['2 (36MHz)', 'SPI_CLOCK_DIV2'],
    ['4 (18MHz)', 'SPI_CLOCK_DIV4'],
    ['8 (9MHz)', 'SPI_CLOCK_DIV8'],
    ['16 (4.5MHz)', 'SPI_CLOCK_DIV16'],
    ['32 (2.25MHz)', 'SPI_CLOCK_DIV32'],
    ['64 (1.125MHz)', 'SPI_CLOCK_DIV64'],
    ['128 (562.5KHz)', 'SPI_CLOCK_DIV128'],
  ],
  i2c: [['I2C1', 'I2C1'],['I2C2','I2C2']],
  i2cSpeed: [
    ['100kHz', '100000L'],
    ['400kHz', '400000L'],
  ],
  builtinLed: [['LED_BUILTIN', 'PC13']],
  interrupt: [
    ['interrupt0', 'PA0'],
    ['interrupt1', 'PA1'],
    ['interrupt2', 'PA2'],
    ['interrupt3', 'PA3'],
    ['interrupt4', 'PA4'],
    ['interrupt5', 'PA5'],
    ['interrupt6', 'PA6'],
    ['interrupt7', 'PA7'],
    ['interrupt8', 'PB0'],
    ['interrupt9', 'PB1'],
    ['interrupt10', 'PB2'],
    ['interrupt11', 'PB10'],
    ['interrupt12', 'PB11'],
    ['interrupt13', 'PB12'],
    ['interrupt14', 'PB13'],
    ['interrupt15', 'PB14'],
    ['interrupt16', 'PB15'],
    ['interrupt17', 'PB3'],
    ['interrupt18', 'PB4'],
    ['interrupt19', 'PB5'],
    ['interrupt20', 'PB8'],
    ['interrupt21', 'PB9'],
    ['interrupt22', 'PC10'],
    ['interrupt23', 'PC11'],
    ['interrupt24', 'PC12'],
    ['interrupt25', 'PC13'],
    ['interrupt26', 'PC14'],
    ['interrupt27', 'PC15'],
    ['interrupt28', 'PC6'],
    ['interrupt29', 'PC7'],
    ['interrupt30', 'PC8'],
    ['interrupt31', 'PC9'],
  ],
  pwm: [
    ['PA0', 'PA0'],
    ['PA2', 'PA2'],
    ['PA3', 'PA3'],
    ['PA6', 'PA6'],
    ['PA8', 'PA8'],
    ['PA9', 'PA9'],
    ['PA10', 'PA10'],
    ['PB0', 'PB0'],
    ['PB1', 'PB1'],
    ['PB6', 'PB6'],
    ['PB7', 'PB7'],
    ['PB8', 'PB8'],
    ['PB9', 'PB9'],
  ],
};
/** Set default profile to Arduino standard-compatible board */
Blockly.Arduino.Boards.selected = Blockly.Arduino.Boards.profiles.stm32f103c8;

/**
 * Changes the Arduino board profile selected, which trigger a refresh of the
 * blocks that use the profile.
 * @param {Blockly.Workspace} workspace Workspace to trigger the board change.
 * @param {string} newBoard Name of the new profile to set.
 */
Blockly.Arduino.Boards.changeBoard = function (workspace, newBoard) {
  if (Blockly.Arduino.Boards.profiles[newBoard] === undefined) {
    console.log('Tried to set non-existing Arduino board: ' + newBoard);
    return;
  }
  Blockly.Arduino.Boards.selected = Blockly.Arduino.Boards.profiles[newBoard];
  // Update the pin out of all the blocks that uses them
  var blocks = workspace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    var updateFields = blocks[i].updateFields;
    if (updateFields) {
      updateFields.call(blocks[i]);
    }
  }
};

/**
 * Refreshes the contents of a block Field Dropdown.
 * This is use to refresh the blocks after the board profile has been changed.
 * @param {!Blockly.Block} block Generated code.
 * @param {!string} fieldName Name of the block FieldDropdown to refresh.
 * @param {!string} boardKey Name of the board profile property to fetch.
 */
Blockly.Arduino.Boards.refreshBlockFieldDropdown = function (
  block,
  fieldName,
  boardKey
) {
  var field = block.getField(fieldName);
  var fieldValue = field.getValue();
  var dataArray = Blockly.Arduino.Boards.selected[boardKey];
  field.menuGenerator_ = dataArray;

  var currentValuePresent = false;
  for (var i = 0; i < dataArray.length; i++) {
    if (fieldValue == dataArray[i][1]) {
      currentValuePresent = true;
    }
  }
  // If the old value is not present any more, add a warning to the block.
  if (!currentValuePresent) {
    block.setWarningText(
      'The old ' + fieldValue + ' is no longer available.',
      'bPin'
    );
  } else {
    block.setWarningText(null, 'bPin');
  }
};
