'use strict';

goog.provide('Blockly.Blocks.ledMatrix');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.ledMatrix.HUE = 170;

Blockly.Blocks['matrix_init'] = {
  init: function () {
    var SPI_instant = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.spi
    );
    this.setColour(Blockly.Blocks.ledMatrix.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.MATRIX_INIT)
      .appendField(SPI_instant, 'SPI')
      .appendField('CS: ')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'CS'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    var ToolTipMsg = Blockly.Msg.MATRIX_INIT_TTL.replace('%1', 'PA7')
      .replace('%2', 'PA6')
      .replace('%3', 'PA5');
    this.setTooltip(ToolTipMsg);
    var thisBlock = this;
    SPI_instant.setValidator(function (newValue) {
      if (newValue === 'SPI1') {
        var ToolTipMsg = Blockly.Msg.MATRIX_INIT_TTL.replace('%1', 'PA7')
          .replace('%2', 'PA6')
          .replace('%3', 'PA5');
        thisBlock.setTooltip(ToolTipMsg);
      } else {
        var ToolTipMsg = Blockly.Msg.MATRIX_INIT_TTL.replace('%1', 'PB13')
          .replace('%2', 'PB14')
          .replace('%3', 'PB15');
        thisBlock.setTooltip(ToolTipMsg);
      }
    });
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
