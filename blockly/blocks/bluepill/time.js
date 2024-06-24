/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Time functions.
 *     The arduino built in functions syntax can be found in
 *     http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.time');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.time.HUE = 140;

Blockly.Blocks['time_delay'] = {
  /**
   * Delay block definition
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendValueInput('DELAY_TIME_MILI')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_TIME_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  },
};

Blockly.Blocks['infinite_loop'] = {
  /**
   * Waits forever, end of program.
   * @this Blockly.Block
   */
  init: function () {
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_TIME_INF);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.ARD_TIME_INF_TIP);
  },
};

//New Blocks
Blockly.Blocks['time_clkInit'] = {
  init: function () {
    let source = [['HSI'], ['HSE'], ['PLL_HSI'], ['PLL_HSE']];
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.CLK_INIT)
      .appendField(
        new Blockly.FieldDropdown(source, this.updateSource_.bind(this)),
        'SOURCE'
      );
    this.updateSource_(this.source);
    this.setFieldValue('HSI', 'SOURCE');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.CLK_INIT_TTL);
  },
  updateSource_: function (option) {
    this.source = option;
    this.removeSource_();
    let MUL = [
      ['x2'],
      ['x3'],
      ['x4'],
      ['x5'],
      ['x6'],
      ['x7'],
      ['x8'],
      ['x9'],
      ['x10'],
      ['x11'],
      ['x12'],
      ['x13'],
      ['x14'],
      ['x15'],
      ['x16'],
    ];
    switch (option) {
      case 'HSE':
        this.appendDummyInput('EXT')
          .appendField(Blockly.Msg.CLK_EXT)
          .appendField(
            new Blockly.FieldDropdown([['Crystal'], ['RC']]),
            'OSCILLATOR'
          );
        this.setFieldValue('Crystal', 'OSCILLATOR');
        break;
      case 'PLL_HSE':
        this.appendDummyInput('PLL_HSE')
          // .appendField(Blockly.Msg.EXT_DIV)
          // .appendField(new Blockly.FieldDropdown([['/1'], ['/2']]), 'DIV')
          .appendField(Blockly.Msg.CLK_MUL)
          .appendField(new Blockly.FieldDropdown(MUL), 'MUL');
        // this.setFieldValue('/1', 'DIV');
        this.setFieldValue('x2', 'MUL');
        break;
      case 'PLL_HSI':
        this.appendDummyInput('PLL_HSI')
          .appendField(Blockly.Msg.CLK_MUL)
          .appendField(new Blockly.FieldDropdown(MUL), 'MUL');
        this.setFieldValue('x2', 'MUL');
        break;
      default:
        break;
    }
  },
  removeSource_: function () {
    var inputNamesToRemove = ['EXT', 'PLL_HSE', 'PLL_HSI'];
    for (var i = 0; i < inputNamesToRemove.length; i++) {
      var inputName = inputNamesToRemove[i];
      if (this.getInput(inputName)) {
        this.removeInput(inputName); // removes any field defined by this.appendValueInput
      }
    }
  },
};

Blockly.Blocks['time_clockEN'] = {
  init: function () {
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.CLK_EN)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.peripherals),
        'PERIPHRAL'
      )
      .appendField(Blockly.Msg.CLK_FOR);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.CLK_EN_TIP);
  },
};

Blockly.Blocks['time_clockDisable'] = {
  init: function () {
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.CLK_DIS)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.peripherals),
        'PERIPHRAL'
      )
      .appendField(Blockly.Msg.CLK_FOR);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.CLK_DIS_TIP);
  },
};
