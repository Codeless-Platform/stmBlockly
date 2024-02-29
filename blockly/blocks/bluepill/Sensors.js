"use strict";

goog.provide("Blockly.Blocks.sensors");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.sensors.HUE = 180;

Blockly.Blocks["sensors_LM35"] = {
  init: function () {
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.READLM35)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analog),
        "PIN"
      )
      .appendField(Blockly.Msg.ADC)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.ADC),
        "ADC"
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
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, "PIN", "sensors");
  },
};
