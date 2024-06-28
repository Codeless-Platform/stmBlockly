/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Digital and Analogue input and output
 *     functions. The Arduino function syntax can be found at
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: maybe change this to a "PIN" BlocklyType
 */
'use strict';

goog.provide('Blockly.Blocks.tone');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.tone.HUE = 380;

Blockly.Blocks['set_tone'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/Buzzer');
    this.setColour(Blockly.Blocks.tone.HUE);
    this.appendValueInput('PWM').appendField(Blockly.Msg.SET_TONE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.PIN_PWM)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwm),
        'PIN'
      )
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.PWM_TTL);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'PIN',
      'pwm'
    );
  },
};

Blockly.Blocks['no_tone'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/Buzzer');
    this.setColour(Blockly.Blocks.tone.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.NO_TONE)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwm),
        'PIN'
      )
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.PWM_TTL);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'PIN',
      'pwm'
    );
  },
};
