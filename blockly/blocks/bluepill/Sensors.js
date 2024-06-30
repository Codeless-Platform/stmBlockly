'use strict';

goog.provide('Blockly.Blocks.sensors');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.sensors.HUE = 180;

Blockly.Blocks['sensors_LM35'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LM35'
    );
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.READLM35)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analog),
        'PIN'
      )
      .appendField(Blockly.Msg.ADC)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.ADC),
        'ADC'
      );
    this.setOutput(true, Blockly.Types.UINT16.output);
    this.setTooltip(Blockly.Msg.READANALOG_TTL);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.UINT16;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analog');
  },
};

Blockly.Blocks['sensors_PIR'] = {
  init: function () {
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.PIR_READ)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'PIN'
      );
    this.setOutput(true, Blockly.Types.UINT8.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.UINT8;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'PIN',
      'digitalPins'
    );
  },
};

Blockly.Blocks['sensors_ultrasonic'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/Ultrasonic'
    );
    var list = new Blockly.FieldInstance(
      'Ultrasonic',
      Blockly.Msg.ULTRASONIC_DEFAULT_NAME,
      false,
      false,
      false
    );
    var trig = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.digitalPins
    );
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ULTRASONIC_READ)
      .appendField(list,'ID')
      .appendField(Blockly.Msg.ULTRASONIC_ECHO)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'echo'
      )
      .appendField(Blockly.Msg.ULTRASONIC_TRIG)
      .appendField(trig, 'trig');
    this.setOutput(true, Blockly.Types.DECIMAL.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
    trig.setValue('PA1');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.DECIMAL;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'echo',
      'digitalPins'
    );
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'trig',
      'digitalPins'
    );
  },
};

Blockly.Blocks['sensors_pot'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function () {
     this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/MCAL/ADC');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField('Read potentiometer on pin#')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analog),
        'PIN'
      )
      .appendField(Blockly.Msg.ADC)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.ADC),
        'ADC'
      );
    this.setOutput(true, Blockly.Types.UINT16.output);
    this.setTooltip(Blockly.Msg.READANALOG_TTL);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.UINT16;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analog');
  },
};

Blockly.Blocks['sensors_ldr'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function () {
     this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/MCAL/ADC');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
      .appendField('Read LDR value on pin#')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analog),
        'PIN'
      )
      .appendField(Blockly.Msg.ADC)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.ADC),
        'ADC'
      );
    this.setOutput(true, Blockly.Types.UINT16.output);
    this.setTooltip(Blockly.Msg.READANALOG_TTL);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function () {
    return Blockly.Types.UINT16;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analog');
  },
};