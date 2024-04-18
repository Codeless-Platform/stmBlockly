'use strict';

goog.provide('Blockly.Blocks.lcd');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.lcd.HUE = 400;
Blockly.Blocks['lcd_init'] = {
  init: function () {
    var dropdownType = new Blockly.FieldDropdown([['Standard'], ['I2C']]);
    var dropdownSize = new Blockly.FieldDropdown([
      ['2x16'],
      ['4x16'],
      ['4x20'],
    ]);
    var dropdownAddress = new Blockly.FieldDropdown([
      ['0x40'],
      ['0x42'],
      ['0x46'],
      ['0x48'],
      ['0x4A'],
      ['0x4C'],
      ['0x4E'],
    ]);
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.LCD_INIT)
      .appendField(dropdownType, 'TYPE')
      .appendField(Blockly.Msg.LCD_SIZE)
      .appendField(dropdownSize, 'SIZE');

    // Additional fields added later
    this.standardInput = this.appendDummyInput()
      .appendField(' ')
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.full_ports),
        'PORT'
      )
      .appendField(Blockly.Msg.LCD_D4)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'd4'
      )
      .appendField(Blockly.Msg.LCD_D5)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'd5'
      )
      .appendField(Blockly.Msg.LCD_D6)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'd6'
      )
      .appendField(Blockly.Msg.LCD_D7)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'd7'
      )
      .appendField(Blockly.Msg.LCD_EN)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'EN'
      )
      .appendField(Blockly.Msg.LCD_RS)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        'RS'
      );
    this.i2cInput = this.appendDummyInput()
      .appendField(Blockly.Msg.LCD_INIT_I2C)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.i2c),
        'I2C'
      )
      .appendField(Blockly.Msg.LCD_ADDRESS_I2C)
      .appendField(dropdownAddress, 'ADDRESS');

    this.setFieldValue('2x16', 'SIZE');
    this.setFieldValue('0x4E', 'ADDRESS');
    this.setInputsInline(true);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_INIT_TTL);

    var thisBlock = this;
    dropdownType.setValue('I2C'); // Initialize value
    thisBlock.standardInput.fieldRow.forEach(function (field) {
      field.setVisible(false);
    });
    // Add change listener to TYPE dropdown
    dropdownType.setValidator(function (newValue) {
      if (newValue === 'Standard') {
        thisBlock.standardInput.fieldRow.forEach(function (field) {
          field.setVisible(true);
        });
        thisBlock.i2cInput.fieldRow.forEach(function (field) {
          field.setVisible(false);
        });
      } else {
        thisBlock.standardInput.fieldRow.forEach(function (field) {
          field.setVisible(false);
        });
        thisBlock.i2cInput.fieldRow.forEach(function (field) {
          field.setVisible(true);
        });
      }
      return newValue;
    });
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'I2C', 'i2c');
  },
};

// send char
Blockly.Blocks['lcd_sendChar'] = {
  init: function () {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('DATA').appendField(Blockly.Msg.LCD_CHAR);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_CHAR_TTL);
  },
};

// send string
Blockly.Blocks['lcd_sendString'] = {
  init: function () {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.TEXT.checkList)
      .appendField(Blockly.Msg.LCD_STRING);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_STRING_TTL);
  },
};
// send Number
Blockly.Blocks['lcd_sendNumber'] = {
  init: function () {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.LCD_NUMBER);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_NUMBER_TTL);
  },
};
// clear screen
Blockly.Blocks['lcd_clear'] = {
  init: function () {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.LCD_CLEAR);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

// go to x y
Blockly.Blocks['lcd_goto'] = {
  init: function () {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('ROW')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.LCD_GOTOx);
    this.appendDummyInput().appendField(Blockly.Msg.LCD_GOTOy);
    this.appendValueInput('COL').setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_GOTO_TTL);
  },
};
