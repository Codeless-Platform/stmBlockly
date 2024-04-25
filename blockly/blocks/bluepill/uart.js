/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for the Arduino serial communication functions.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: There are more function that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Blocks.uart');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.uart.HUE = 160;

Blockly.Blocks['uart_init'] = {
  init: function () {
    var uart_instant = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.uart
    );
    this.setColour(Blockly.Blocks.uart.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.UART_INIT)
      .appendField(uart_instant, 'UART_ID')
      .appendField(Blockly.Msg.UART_SPEED)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.uartSpeed),
        'SPEED'
      )
      .appendField(Blockly.Msg.UART_BPS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    var ToolTipMsg = Blockly.Msg.UART_INIT_TTP.replace('%1', 'PA9').replace(
      '%2',
      'PA10'
    );
    this.setTooltip(ToolTipMsg);

    var thisBlock = this;
    uart_instant.setValidator(function (newValue) {
      if (newValue === 'USART1') {
        ToolTipMsg = Blockly.Msg.UART_INIT_TTP.replace('%1', 'PA9').replace(
          '%2',
          'PA10'
        );
        thisBlock.setTooltip(ToolTipMsg);
      } else if (newValue === 'USART2') {
        ToolTipMsg = Blockly.Msg.UART_INIT_TTP.replace('%1', 'PA2').replace(
          '%2',
          'PA3'
        );
        thisBlock.setTooltip(ToolTipMsg);
      } else {
        ToolTipMsg = Blockly.Msg.UART_INIT_TTP.replace('%1', 'PB10').replace(
          '%2',
          'PB11'
        );
        thisBlock.setTooltip(ToolTipMsg);
      }
    });
  },

  getSerialSetupInstance: function () {
    return this.getFieldValue('UART_ID');
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'UART_ID', 'uart');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'SPEED',
      'uartSpeed'
    );
  },
};

Blockly.Blocks['uart_write'] = {
  init: function () {
    this.setColour(Blockly.Blocks.uart.HUE);
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.uart),
        'UART_ID'
      )
      .appendField(Blockly.Msg.UART_WRITE);
    this.appendValueInput('CONTENT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.UART_WRITE_TTP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of serial_setup and attaches a warning to this
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
    var thisInstanceName = this.getFieldValue('UART_ID');
    // Iterate through top level blocks to find setup instance for the serial id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getSerialSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
          break;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(
        Blockly.Msg.UART_PRINT_WARN.replace('%1', thisInstanceName),
        'uart_init'
      );
    } else {
      this.setWarningText(null, 'uart_init');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'UART_ID', 'uart');
  },
};

Blockly.Blocks['uart_recieve'] = {
  init: function () {
    this.setColour(Blockly.Blocks.uart.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.UART_READ)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.uart),
        'UART_ID'
      );
    this.appendValueInput('CONTENT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.UART_READ_TTP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of serial_setup and attaches a warning to this
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
    var thisInstanceName = this.getFieldValue('UART_ID');
    // Iterate through top level blocks to find setup instance for the serial id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getSerialSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
          break;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(
        Blockly.Msg.UART_PRINT_WARN.replace('%1', thisInstanceName),
        'uart_init'
      );
    } else {
      this.setWarningText(null, 'uart_init');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'UART_ID', 'uart');
  },
};
