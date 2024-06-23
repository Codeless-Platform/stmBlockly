'use strict';

goog.provide('Blockly.Blocks.keypad');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.keypad.HUE = 380;

Blockly.Blocks['keypad_init'] = {
  init: function () {
    var list = new Blockly.FieldInstance(
      'Keypad',
      Blockly.Msg.KEYPAD_DEFAULT_NAME,
      false,
      false,
      false
    );
    this.setColour(Blockly.Blocks.keypad.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.KEYPAD_INIT_PORT)
      .appendField(list, 'ID')
      .appendField('at port')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.full_ports),
        'PORT'
      )
      .appendField('Size ')
      .appendField(
        new Blockly.FieldDropdown(
          [['4x3'], ['4x4']],
          this.updateCols_.bind(this)
        ),
        'SIZE'
      )
      .appendField(Blockly.Msg.KEY_R0)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'R0'
      )
      .appendField(Blockly.Msg.KEY_R1)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'R1'
      )
      .appendField(Blockly.Msg.KEY_R2)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'R2'
      );
    this.appendDummyInput()
      .appendField(Blockly.Msg.KEY_R3)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'R3'
      )
      .appendField(Blockly.Msg.KEY_C0)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'C0'
      )
      .appendField(Blockly.Msg.KEY_C1)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'C1'
      )
      .appendField(Blockly.Msg.KEY_C2)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'C2'
      );
    this.size = '4x3';
    this.setInputsInline(false);
    this.setFieldValue('4x3', 'SIZE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.KEYPAD_TTL);
  },
  updateCols_: function (size) {
    this.size = size;
    if (this.getInput('C3')) {
      this.removeInput('C3');
    }
    if (size == '4x4') {
      this.appendDummyInput('C3')
        .appendField(Blockly.Msg.KEY_C3)
        .appendField(
          new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins
          ),
          'C3'
        );
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'C3', 'digitalPins');
    }
  },
  getKeypadInstance: function () {
    return this.getFieldValue('ID');
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PORT', 'full_ports');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'R0', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'R1', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'R2', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'R3', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'C0', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'C1', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'C2', 'digitalPins');
  },
  onchange: function (event) {
    if (
      !this.workspace ||
      event.type == Blockly.Events.MOVE ||
      event.type == Blockly.Events.UI
    ) {
      return; // Block deleted or irrelevant event
    }
    var thisInstanceName = this.getFieldValue('ID');
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var count = 0;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] != this) {
        var func = blocks[i].getKeypadInstance;
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
      this.setWarningText('This block is duplicated.', 'duplicateKeypad');
    } else {
      this.setWarningText(null, 'duplicateKeypad');
    }
  },
};

Blockly.Blocks['keypad_getKey'] = {
  init: function () {
    var list = new Blockly.FieldInstance(
      'Keypad',
      Blockly.Msg.KEYPAD_DEFAULT_NAME,
      false,
      false,
      false
    );
    this.setColour(Blockly.Blocks.keypad.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.KEYPAD_READ)
      .appendField(list, 'ID');
    this.setOutput(true, Blockly.Types.CHARACTER.output);
    this.setTooltip(Blockly.Msg.KEYPAD_READ_TTL);
  },
  onchange: function (event) {
    if (
      !this.workspace ||
      event.type == Blockly.Events.MOVE ||
      event.type == Blockly.Events.UI
    ) {
      return; // Block deleted or irrelevant event
    }

    var thisInstanceName = this.getFieldValue('ID');
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var InstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getKeypadInstance;
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
        Blockly.Msg.UART_PRINT_WARN.replace('%1', thisInstanceName),
        'keypad_init'
      );
    } else {
      this.setWarningText(null, 'keypad_init');
    }
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.CHARACTER;
  },
};
