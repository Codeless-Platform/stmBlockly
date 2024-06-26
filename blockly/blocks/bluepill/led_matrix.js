'use strict';

goog.provide('Blockly.Blocks.ledMatrix');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.ledMatrix.HUE = 170;

Blockly.Blocks['matrix_init'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LED_MATRIX')
    this.currentValuePresent = true;
    var list = new Blockly.FieldInstance(
      'MATRIX',
      Blockly.Msg.MATRIX_DEFAULT_NAME,
      false,
      false,
      false
    );
    var SPI_instant = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.spi
    );
    this.setColour(Blockly.Blocks.ledMatrix.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.MATRIX_INIT)
      .appendField(list, 'ID')
      .appendField('SPI instance')
      .appendField(SPI_instant, 'SPI')
      .appendField('CS: ')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'CS'
      );
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
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
    this.currentValuePresent =Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'SPI', 'spi',this.getFieldValue('ID'));
  },
  onchange: function (event) {
    if (
      !this.workspace ||
      event.type == Blockly.Events.MOVE ||
      event.type == Blockly.Events.UI
    ) {
      return; // Block deleted or irrelevant event
    }
    this.getDuplicateBlock()
   this.getCurrentValuePresent()
    
  },
  getDuplicateBlock: function(){
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

    if (count > 0) {
      this.setWarningText(
        'this block is duplicated, Create new instance or delete duplicates.',
        'duplicateMatrix'
      );
    } else {
      this.setWarningText(null, 'duplicateMatrix');
    }
  },
  getCurrentValuePresent: function(){
    if (!this.currentValuePresent) {
      var field = this.getField('SPI');
      var fieldValue = field.getValue();
      var dataArray = Blockly.Arduino.Boards.selected.spi;
      field.menuGenerator_ = dataArray;
      for (var i = 0; i < dataArray.length; i++) {
        if (fieldValue == dataArray[i][1]) {
          this.currentValuePresent = true;
        }}
    }
    if(this.currentValuePresent) {
      var id = this.getFieldValue('ID')
      this.setWarningText(null,id);
    } 
  },
};

Blockly.Blocks['matrix_sendString'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LED_MATRIX')
    var list = new Blockly.FieldInstance(
      'MATRIX',
      Blockly.Msg.MATRIX_DEFAULT_NAME,
      false,
      false,
      false
    );
    this.setColour(Blockly.Blocks.ledMatrix.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.TEXT.checkList)
      .appendField(Blockly.Msg.MATRIX_STRING);
    this.appendDummyInput().appendField('on ').appendField(list, 'ID');
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
        Blockly.Msg.PRINT_WARN.replace('%1', thisInstanceName),
        'matrix_init'
      );
    } else {
      this.setWarningText(null, 'matrix_init');
    }
  },
};
