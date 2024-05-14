'use strict';

goog.provide('Blockly.Blocks.motors');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.motors.HUE = 120;

Blockly.Blocks['motor_init'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    this.setColour(Blockly.Blocks.motors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.MOTOR_INIT)
      .appendField(list, 'ID')
      .appendField(Blockly.Msg.MOTOR_IN1)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'IN1'
      )
      .appendField(Blockly.Msg.MOTOR_IN2)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'IN2'
      )
      .appendField(Blockly.Msg.MOTOR_EN)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwm),
        'PIN'
      );
    this.setFieldValue('1', 'ID');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'pwm');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'IN1',
      'digitalPins'
    );
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'IN2',
      'digitalPins'
    );
  },
  getMotorInstance: function () {
    return this.getFieldValue('ID');
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
        var func = blocks[i].getMotorInstance;
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
      this.setWarningText('This block is duplicated.', 'duplicateMotor');
    } else {
      this.setWarningText(null, 'duplicateMotor');
    }
  },
};

Blockly.Blocks['motor_move'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);

    this.setColour(Blockly.Blocks.motors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.MOTOR_MOVE)
      .appendField(list, 'ID')
      .appendField(
        new Blockly.FieldDropdown([['Clockwise'], ['Anticlockwise'], ['Stop']]),
        'DIR'
      )
      .appendField(Blockly.Msg.MOTOR_SPEED);
    this.appendValueInput('SPEED').setCheck(Blockly.Types.NUMBER.checkList);

    this.setInputsInline(true);
    this.setFieldValue('1', 'ID');
    this.setFieldValue('Clockwise', 'DIR');
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

    var thisInstanceName = this.getFieldValue('ID');
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var InstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getMotorInstance;
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
        Blockly.Msg.UART_PRINT_WARN.replace('%1', 'Motor'+thisInstanceName),
        'motor_move'
      );
    } else {
      this.setWarningText(null, 'motor_move');
    }
  },
};
