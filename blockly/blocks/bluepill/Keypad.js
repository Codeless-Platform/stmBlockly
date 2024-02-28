"use strict";

goog.provide("Blockly.Blocks.keypad");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.keypad.HUE = 380;

Blockly.Blocks["keypad_init"] = {
  init: function () {
    this.setColour(Blockly.Blocks.keypad.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.KEYPAD_INIT_PORT)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.full_ports),
        "PORT"
      )
      .appendField(Blockly.Msg.KEY_R0)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "R0"
      )
      .appendField(Blockly.Msg.KEY_R1)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "R1"
      )
      .appendField(Blockly.Msg.KEY_R2)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "R2"
      );
    this.appendDummyInput()
      .appendField(Blockly.Msg.KEY_R3)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "R3"
      )
      .appendField(Blockly.Msg.KEY_C0)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "C0"
      )
      .appendField(Blockly.Msg.KEY_C1)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "C1"
      )
      .appendField(Blockly.Msg.KEY_C2)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "C2"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.KEYPAD_TTL);
  },
};

Blockly.Blocks["keypad_getKey"] = {
  init: function () {
    this.setColour(Blockly.Blocks.keypad.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.KEYPAD_READ);
    this.setOutput(true, Blockly.Types.CHARACTER.output);
    this.setTooltip(Blockly.Msg.KEYPAD_READ_TTL);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.CHARACTER;
  },
};
