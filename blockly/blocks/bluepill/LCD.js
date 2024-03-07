'use strict';

goog.provide('Blockly.Blocks.lcd');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.lcd.HUE = 400;

Blockly.Blocks['lcd_init'] = {
  init: function () {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.LCD_INIT)
      .appendField(Blockly.Msg.LCD_SIZE)
      .appendField(
        new Blockly.FieldDropdown([['2x16'], ['4x16'], ['4x20']]),
        'SIZE'
      )
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
      );
    this.appendDummyInput()
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
    this.setFieldValue('2x16', 'SIZE');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_INIT_TTL);
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
