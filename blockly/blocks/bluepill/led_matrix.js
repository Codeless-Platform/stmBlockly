'use strict';

goog.provide('Blockly.Blocks.ledMatrix');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.ledMatrix.HUE = 170;

Blockly.Blocks['matrix_init'] = {
  init: function () {
    this.setColour(Blockly.Blocks.ledMatrix.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.MATRIX_INIT)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.spi),
        'SPI'
      )
      .appendField('CS: ')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'CS'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.MATRIX_INIT_TTL);
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'SPI', 'spi');
  },
};

Blockly.Blocks['matrix_sendString'] = {
  init: function () {
    this.setColour(Blockly.Blocks.ledMatrix.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.TEXT.checkList)
      .appendField(Blockly.Msg.MATRIX_STRING);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};
