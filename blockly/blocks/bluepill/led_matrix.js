'use strict';

goog.provide('Blockly.Blocks.ledMatrix');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.ledMatrix.HUE = 170;

Blockly.Blocks['matrix_init'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    var SPI_instant = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.spi
    );
    this.setColour(Blockly.Blocks.ledMatrix.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.MATRIX_INIT)
      .appendField(list, 'ID')
      .appendField(SPI_instant, 'SPI')
      .appendField('CS: ')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'CS'
      );
    list.setValue('1');
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
  getMatrixInstance: function () {
    return this.getFieldValue('ID');
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'SPI', 'spi');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'CS', 'digitalPins');
  },
  onchange: function (event) {
    var thisInstanceName = this.getFieldValue('ID');
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var count = 0;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] != this) {
        var func = blocks[i].getMatrixInstance;
        if (func) {
          var blockInstanceName = func.call(blocks[i]);
          if (thisInstanceName === blockInstanceName) {
            count++;
          }
        }
      }
    }
    console.log(count);
    if (count > 0) {
      this.setWarningText('This block is duplicated.', 'duplicateMatrix');
    } else {
      this.setWarningText(null, 'duplicateMatrix');
    }
  },
};

Blockly.Blocks['matrix_sendString'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    this.setColour(Blockly.Blocks.ledMatrix.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.TEXT.checkList)
      .appendField(Blockly.Msg.MATRIX_STRING);
    this.appendDummyInput()
      .appendField('on led matrix#')
      .appendField(list, 'ID');
    list.setValue('1');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function (event) {
    if (
      !this.workspace ||
      event.type == Blockly.Events.MOVE ||
      event.type == Blockly.Events.UI
    ) {
      return; // Block deleted or irrelevant event
    }

    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('ID');
    // Iterate through top level blocks to find setup instance for the serial id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var InstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getMatrixInstance;
      if (func) {
        var BlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == BlockInstanceName) {
          InstancePresent = true;
          break;
        }
      }
    }

    if (!InstancePresent) {
      this.setWarningText(
        Blockly.Msg.UART_PRINT_WARN.replace('%1', 'LedMatrix'+thisInstanceName),
        'matrix_init'
      );
    } else {
      this.setWarningText(null, 'matrix_init');
    }
  },
};
