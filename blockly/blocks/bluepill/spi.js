/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino SPI library.
 *     The Arduino SPI functions syntax can be found in:
 *     http://arduino.cc/en/Reference/SPI
 */
'use strict';

goog.provide('Blockly.Blocks.spi');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.spi.HUE = 170;
function getCurrentValuePresentSPI(block,id){
  if (!block.currentValuePresent) {
    var field = block.getField('SPI_ID');
    var fieldValue = field.getValue();
    var dataArray = Blockly.Arduino.Boards.selected.spi;
    field.menuGenerator_ = dataArray;
    for (var i = 0; i < dataArray.length; i++) {
      if (fieldValue == dataArray[i][1]) {
        block.currentValuePresent = true;
      }}
  }
  if(block.currentValuePresent) {
    block.setWarningText(null, id);
  } 
}
Blockly.Blocks['spi_init'] = {
  init: function () {
    this.addHelperUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/MCAL/SPI')

    this.currentValuePresent = true;
    var SPI_instant = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.spi
    );
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.SPI_SETUP)
      .appendField(SPI_instant, 'SPI_ID')
      .appendField(Blockly.Msg.SPI_SETUP_CONF);
    this.appendDummyInput()
      .appendField(Blockly.Msg.SPI_MODE)
      .appendField(
        new Blockly.FieldDropdown([
          [Blockly.Msg.SPI_MODE_MASTER, 'MASTER'],
          [Blockly.Msg.SPI_MODE_SALVE, 'SLAVE'],
        ]),
        'SPI_MODE'
      );
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.appendDummyInput()
      .appendField(Blockly.Msg.SPI_SETUP_MODE)
      .appendField(
        new Blockly.FieldDropdown([
          [Blockly.Msg.SPI_SETUP_MODE0, 'SPI_MODE0'],
          [Blockly.Msg.SPI_SETUP_MODE1, 'SPI_MODE1'],
          [Blockly.Msg.SPI_SETUP_MODE2, 'SPI_MODE2'],
          [Blockly.Msg.SPI_SETUP_MODE3, 'SPI_MODE3'],
        ]),
        'SPI_CLK'
      )
      .appendField('CS: ')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'CS'
      );
    var ToolTipMsg = Blockly.Msg.SPI_INIT_TIP.replace('%1', 'PA7')
      .replace('%2', 'PA6')
      .replace('%3', 'PA5');
    this.setTooltip(ToolTipMsg);
    var thisBlock = this;
    SPI_instant.setValidator(function (newValue) {
      if (newValue === 'SPI1') {
        var ToolTipMsg = Blockly.Msg.SPI_INIT_TIP.replace('%1', 'PA7')
          .replace('%2', 'PA6')
          .replace('%3', 'PA5');
        thisBlock.setTooltip(ToolTipMsg);
      } else {
        var ToolTipMsg = Blockly.Msg.SPI_INIT_TIP.replace('%1', 'PB13')
          .replace('%2', 'PB14')
          .replace('%3', 'PB15');
        thisBlock.setTooltip(ToolTipMsg);
      }
    });
  },
  /**
   * Returns the selected SPI instance.
   * @return {!string} SPI instance name.
   * @this Blockly.Block
   */
  getSpiSetupInstance: function () {
    return this.getFieldValue('SPI_ID');
  },
  /**
   * Updates the content of the the board SPI related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    this.currentValuePresent =Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'SPI_ID', 'spi','SPI_INIT');
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
    getCurrentValuePresentSPI(this,'SPI_INIT')
  },
  getDuplicateBlock: function () {
    var thisInstanceName = this.getFieldValue('SPI_ID');
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var count = 0;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] != this) {
        var func = blocks[i].getSpiSetupInstance;
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
        'duplicateSPI'
      );
    } else {
      this.setWarningText(null, 'duplicateSPI');
    }
  },
};

Blockly.Blocks['spi_RXTX'] = {
  /**
   * Block for for the spi transfer. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function () {
    this.addHelperUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/MCAL/SPI')
    this.currentValuePresent = true;
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.spi),
      'SPI_ID'
    );
    this.appendValueInput('SPI_DATA')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.SPI_TRANS_VAL);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.SPI_TRANS_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function (event) {
    if (
      !this.workspace ||
      event.type == Blockly.Events.MOVE ||
      event.type == Blockly.Events.UI
    ) {
      return; // Block deleted or irrelevant event
    }
    this.isInitBlockPresent()
    getCurrentValuePresentSPI(this,'SPI_TXRX')
  },
  isInitBlockPresent: function(){
    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SPI_ID');

    // Iterate through top level blocks to find a setup instance for the SPI id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0, length_ = blocks.length; x < length_; x++) {
      var func = blocks[x].getSpiSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(
        Blockly.Msg.SPI_TRANS_WARN1.replace('%1', thisInstanceName),
        'spi_init'
      );
    } else {
      this.setWarningText(null, 'spi_init');
    }
  },
  /**
   * Retrieves the type of the selected variable, Arduino code returns a byte,
   * for now set it to integer.
   * @return {!string} Blockly type.
   */
  getBlockType: function () {
    return Blockly.Types.UINT16;
  },
  /**
   * Updates the content of the the board SPI related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    this.currentValuePresent = Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'SPI_ID', 'spi','SPI_TXRX');
  },
};
