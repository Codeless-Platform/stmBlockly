
'use strict';

goog.provide('Blockly.Blocks.lcd');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.lcd.HUE = 400;

Blockly.Blocks['lcd_init'] = {

  init: function() {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LCD_INIT)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.full_ports), 'PORT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_INIT_TTL);
  },
  
};



// send char 
Blockly.Blocks['lcd_sendChar'] = {
 
  init: function() {
   this.setColour(Blockly.Blocks.lcd.HUE);
   this.appendValueInput('DATA')
       .appendField(Blockly.Msg.LCD_CHAR);
   this.setInputsInline(true);
   this.setPreviousStatement(true, null);
   this.setNextStatement(true, null);
   this.setTooltip(Blockly.Msg.LCD_CHAR_TTL);
 }
  
 };


// send string 
Blockly.Blocks['lcd_sendString'] = {
 
     init: function() {
      this.setColour(Blockly.Blocks.lcd.HUE);
      this.appendValueInput('DATA')
          .setCheck(Blockly.Types.TEXT.checkList)     
          .appendField(Blockly.Msg.LCD_STRING);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg.LCD_STRING_TTL);
    }
     
    };

// clear screen 
Blockly.Blocks['lcd_clear'] = {

  init: function() {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LCD_CLEAR)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  
};

// go to x y 
Blockly.Blocks['lcd_goto'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('ROW')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.LCD_GOTOx);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LCD_GOTOy);
    this.appendValueInput('COL')
        .setCheck(Blockly.Types.NUMBER.checkList)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_GOTO_TTL);
  }
  
};
