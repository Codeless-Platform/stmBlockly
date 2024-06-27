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
function getCurrentValuePresentUart(block,id){
  if (!block.currentValuePresent) {
    var field = block.getField('UART_ID');
    var fieldValue = field.getValue();
    var dataArray = Blockly.Arduino.Boards.selected.uart;
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
Blockly.Blocks['uart_init'] = {
  init: function () {
    this.currentValuePresent = true;
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
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
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
   this.currentValuePresent= Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'UART_ID', 'uart','UART_INIT');
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
    getCurrentValuePresentUart(this,'UART_INIT')
  },
  getDuplicateBlock: function(){
    var thisInstanceName = this.getFieldValue('UART_ID');
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var count = 0;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] != this) {
        var func = blocks[i].getSerialSetupInstance;
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
        'duplicateUart'
      );
    } else {
      this.setWarningText(null, 'duplicateUart');
    }
  }
};

Blockly.Blocks['uart_write'] = {
  init: function () {
    this.currentValuePresent = true;
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
    this.isInitBlockPresent()
    getCurrentValuePresentUart(this,'UART_WRITE')
  },
  isInitBlockPresent: function () {
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
        Blockly.Msg.PRINT_WARN.replace('%1', thisInstanceName),
        'uart_write'
      );
    } else {
      this.setWarningText(null, 'uart_write');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    this.currentValuePresent= Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'UART_ID', 'uart','UART_WRITE');
  },
};

Blockly.Blocks['uart_recieve'] = {
  init: function () {
    this.currentValuePresent = true;
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
    this.isInitBlockPresent();
    getCurrentValuePresentUart(this,'UART_RECIEVE')
  },
  isInitBlockPresent: function () {
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
        Blockly.Msg.PRINT_WARN.replace('%1', thisInstanceName),
        'uart_recieve'
      );
    } else {
      this.setWarningText(null, 'uart_recieve');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    this.currentValuePresent = Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'UART_ID',
      'uart','UART_RECIEVE'
    );
  },
};
