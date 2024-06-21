'use strict';

goog.provide('Blockly.Blocks.motors');
goog.provide('Blockly.Blocks.stepper');
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.motors.HUE = 120;
Blockly.Blocks.stepper.HUE = 140;

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

Blockly.Blocks['stepper_config'] = {
  init: function() {
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.STEPPER_INIT)
        .appendField(
            new Blockly.FieldInstance('Stepper',
                                      Blockly.Msg.STEPPER_DEFAULT_NAME, false, false, false), 'STEPPER_NAME');
    this.appendDummyInput('PINS')
      .appendField(Blockly.Msg.STEPPER_PIN1)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'PIN1'
      )
      .appendField(Blockly.Msg.STEPPER_PIN2)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'PIN2'
      )
      .appendField(Blockly.Msg.STEPPER_PIN3)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'PIN3'
      )
      .appendField(Blockly.Msg.STEPPER_PIN4)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'PIN4'
      );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.STEPPER_SETUP_TIP);
  },

  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'PIN1', 'digitalPins');
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'PIN2', 'digitalPins');
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'PIN3', 'digitalPins');
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'PIN4', 'digitalPins');
  },  getStepperInstance: function () {
    return this.getFieldValue('STEPPER_NAME');
  },
  onchange: function (event) {
    if (
      !this.workspace ||
      event.type == Blockly.Events.MOVE ||
      event.type == Blockly.Events.UI
    ) {
      return; // Block deleted or irrelevant event
    }
    var thisInstanceName = this.getFieldValue('STEPPER_NAME');
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var count = 0;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] != this) {
        var func = blocks[i].getStepperInstance;
        if (func) {
          var blockInstanceName = func.call(blocks[i]);
          if (thisInstanceName === blockInstanceName) {
            count++;
          }
        }
      }
    }
    if (count > 0) {
      this.setWarningText('This block is duplicated.', 'duplicateStepper');
    } else {
      this.setWarningText(null, 'duplicateStepper');
    }
  },
};

Blockly.Blocks['stepper_step'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.STEPPER_STEP)
        .appendField(
            new Blockly.FieldInstance('Stepper',
                                      Blockly.Msg.STEPPER_DEFAULT_NAME,
                                      false, true, false),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(Blockly.Msg.STEPPER_ANGLE)
        .appendField(Blockly.Msg.STEPPER_DIR)
        .appendField(
          new Blockly.FieldDropdown([['Clockwise'], ['Anticlockwise'], ['Stop']]),
          'STEPPER_DIR'
        )
        .appendField(Blockly.Msg.STEPPER_RPM)
      this.appendValueInput('STEPPER_RPM').setCheck(Blockly.Types.NUMBER.checkList);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'Stepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', 'stepper').replace(
                '%2', instanceName));
    }
  }
};
