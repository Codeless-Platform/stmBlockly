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

goog.provide('Blockly.Blocks.io');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.io.HUE = 250;

Blockly.Blocks['io_writePin'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function () {
    // this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
      .appendField(Blockly.Msg.ARD_DIGITALWRITE)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'PIN'
      )
      .appendField(Blockly.Msg.ARD_WRITE_TO)
      .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'PIN',
      'digitalPins'
    );
  },
};

Blockly.Blocks['io_readPin'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function () {
    // this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_DIGITALREAD)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'PIN'
      );
    this.setOutput(true, Blockly.Types.UINT8.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.UINT8;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'PIN',
      'digitalPins'
    );
  },
};

Blockly.Blocks['io_builtin_led'] = {
  /**
   * Block for setting built-in LED to a state.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
      .appendField(Blockly.Msg.ARD_BUILTIN_LED)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.builtinLed),
        'BUILT_IN_LED'
      )
      .appendField(Blockly.Msg.ARD_WRITE_TO)
      .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_BUILTIN_LED_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'BUILT_IN_LED',
      'builtinLed'
    );
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.BOOLEAN;
  },
};

Blockly.Blocks['io_highlow'] = {
  /**
   * Block for creating a pin state.
   * @this Blockly.Block
   */
  init: function () {
    // this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        [Blockly.Msg.PIN_HIGH, 'PIN_HIGH'],
        [Blockly.Msg.PORT_HIGH, 'PORT_HIGH'],
        [Blockly.Msg.PIN_LOW, 'PIN_LOW'],
        [Blockly.Msg.PORT_LOW, 'PORT_LOW'],
      ]),
      'STATE'
    );
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.ARD_HIGHLOW_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.BOOLEAN;
  },
};
// New Blocks
Blockly.Blocks['io_togglePin'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_TOGGLEPIN)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'PIN'
      );
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'PIN',
      'digitalPins'
    );
  },
};

Blockly.Blocks['io_writePort'] = {
  init: function () {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
      .appendField(Blockly.Msg.WRITE_PORT)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.ports),
        'PORT'
      )
      .appendField(Blockly.Msg.PORT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.WRITE_PORT_TIP);
  },
};

Blockly.Blocks['io_readPort'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function () {
    // this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.READ)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.ports),
        'PORT'
      )
      .appendField(Blockly.Msg.READ_PORT);
    this.setOutput(true, Blockly.Types.UINT16.output);
    this.setTooltip(Blockly.Msg.READ_PORT_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.UINT16;
  },
};

Blockly.Blocks['io_readAnalogPin'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function () {
    // this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.READANALOG)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analog),
        'PIN'
      )
      .appendField(Blockly.Msg.ADC)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.ADC),
        'ADC'
      );
    this.setOutput(true, Blockly.Types.UINT16.output);
    this.setTooltip(Blockly.Msg.READANALOG_TTL);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.UINT16;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  },
};
Blockly.Blocks['io_writePwm'] = {
  init: function () {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('PWM').appendField(Blockly.Msg.WRITE_PWM);
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
      'digitalPins'
    );
  },
};
