/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Arduino map functionality.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.variables.HUE = 330;

Blockly.Blocks['variables_set_type'] = {
  /**
   * Block for variable casting.
   * @this Blockly.Block
   */
  init: function () {
    // this.setHelpUrl('http://arduino.cc/en/Reference/HomePage');
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput('VARIABLE_SETTYPE_INPUT');
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_VAR_AS)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Types.getValidTypeArray()),
        'VARIABLE_SETTYPE_TYPE'
      );
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.ARD_VAR_AS_TIP);
  },
  /**
   * Assigns a type to the block based on the selected type to cast.
   * @return {!string} Blockly type for this block configuration.
   * @this Blockly.Block
   */
  getBlockType: function () {
    var blocklyTypeKey = this.getFieldValue('VARIABLE_SETTYPE_TYPE');
    return Blockly.Types[blocklyTypeKey];
  },
};

Blockly.Blocks['array_declare'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Array Type')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Types.getValidTypeArray()),
        'ARRAY_TYPE'
      )
      .appendField('Name')
      .appendField(new Blockly.FieldTextInput('name'), 'ARRAY_NAME')
      .appendField('Size')
      .appendField(new Blockly.FieldNumber(0), 'ARRAY_SIZE');

    this.appendDummyInput()
      .appendField('Data')
      .appendField(new Blockly.FieldNumber(0), 'ARRAY_DATA');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
