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

Blockly.Blocks['spi_init'] = {
  init: function () {
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.SPI_SETUP)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.spi),
        'SPI_ID'
      )
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
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    // this.appendDummyInput()
    //   .appendField(Blockly.Msg.SPI_SETUP_DIVIDE)
    //   .appendField(
    //     new Blockly.FieldDropdown(
    //       Blockly.Arduino.Boards.selected.spiClockDivide
    //     ),
    //     'SPI_CLOCK_DIVIDE'
    //   );
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
      );
    this.setTooltip(Blockly.Msg.SPI_INIT_TIP);
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
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'SPI_ID', 'spi');
  },
};

Blockly.Blocks['spi_RXTX'] = {
  /**
   * Block for for the spi transfer. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function () {
  
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

};
