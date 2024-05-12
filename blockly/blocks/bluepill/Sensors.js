'use strict';

goog.provide('Blockly.Blocks.sensors');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.sensors.HUE = 180;

Blockly.Blocks['sensors_LM35'] = {
  init: function () {
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.READLM35)
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
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analog');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'ADC', 'ADC');
  },
};

Blockly.Blocks['sensors_PIR'] = {
  init: function () {
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.PIR_READ)
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

Blockly.Blocks['sensors_ultrasonic'] = {
  init: function () {
    var trig = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.digitalPins
    );
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ULTRASONIC_READ)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'echo'
      )
      .appendField(Blockly.Msg.ULTRASONIC_TRIG)
      .appendField(trig, 'trig');
    this.setOutput(true, Blockly.Types.DECIMAL.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
    trig.setValue('PA1');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.DECIMAL;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'echo',
      'digitalPins'
    );
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'trig',
      'digitalPins'
    );
  },
};
