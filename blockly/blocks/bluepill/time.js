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
  init: function() {
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendValueInput('DELAY_TIME_MILI')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};


Blockly.Blocks['infinite_loop'] = {
  /**
   * Waits forever, end of program.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_INF);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.ARD_TIME_INF_TIP);
  }
};

//New Blocks

Blockly.Blocks['time_clockEN'] = {
  init: function() {
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CLK_EN)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.peripherals), 'PERIPHRAL')
        .appendField(Blockly.Msg.CLK_FOR)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.CLK_EN_TIP);
  },
  
};


Blockly.Blocks['time_clockDisable'] = {
  init: function() {
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CLK_DIS)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.peripherals), 'PERIPHRAL')
        .appendField(Blockly.Msg.CLK_FOR)
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.CLK_DIS_TIP);
  },
  
};

