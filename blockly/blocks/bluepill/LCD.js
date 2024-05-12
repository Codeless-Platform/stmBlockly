'use strict';

goog.provide('Blockly.Blocks.lcd');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.lcd.HUE = 400;
const onChangeLCD = function (event, obj,id) {
  if (
    !obj.workspace ||
    event.type == Blockly.Events.MOVE ||
    event.type == Blockly.Events.UI
  ) {
    return; // Block deleted or irrelevant event
  }
  var thisInstanceName = obj.getFieldValue('ID');
  var blocks = Blockly.mainWorkspace.getTopBlocks();
  var InstancePresent = false;
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].getLcdInstance;
    if (func) {
      var BlockInstanceName = func.call(blocks[x]);
      if (thisInstanceName == BlockInstanceName) {
        InstancePresent = true;
        break;
      }
    }
  }

  if (!InstancePresent) {
    obj.setWarningText(
      Blockly.Msg.UART_PRINT_WARN.replace('%1', 'Lcd ' + thisInstanceName),
      id
    );
  } else {
    obj.setWarningText(null, id);
  }
};
Blockly.Blocks['lcd_init'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    var I2C_Instant = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.i2c
    );
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
      .appendField(list, 'ID')
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
      .appendField(I2C_Instant, 'I2C')
      .appendField(Blockly.Msg.LCD_ADDRESS_I2C)
      .appendField(dropdownAddress, 'ADDRESS');

    this.setFieldValue('2x16', 'SIZE');
    this.setFieldValue('0x4E', 'ADDRESS');
    this.setInputsInline(false);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    var ToolTipMsg = Blockly.Msg.LCD_INIT_I2C_TTL.replace('%1', 'PB7').replace(
      '%2',
      'PB6'
    );
    this.setTooltip(ToolTipMsg);

    var thisBlock = this;
    dropdownType.setValue('I2C'); // Initialize value
    list.setValue('1');
    thisBlock.standardInput.fieldRow.forEach(function (field) {
      field.setVisible(false);
    });
    // change listener for I2C
    I2C_Instant.setValidator(function (newValue) {
      if (newValue === 'I2C1') {
        var ToolTipMsg = Blockly.Msg.LCD_INIT_I2C_TTL.replace(
          '%1',
          'PB7'
        ).replace('%2', 'PB6');
        thisBlock.setTooltip(ToolTipMsg);
      } else {
        var ToolTipMsg = Blockly.Msg.LCD_INIT_I2C_TTL.replace(
          '%1',
          'PB11'
        ).replace('%2', 'PB10');
        thisBlock.setTooltip(ToolTipMsg);
      }
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
        thisBlock.setTooltip(Blockly.Msg.LCD_INIT_TTL);
      } else {
        thisBlock.standardInput.fieldRow.forEach(function (field) {
          field.setVisible(false);
        });
        thisBlock.i2cInput.fieldRow.forEach(function (field) {
          field.setVisible(true);
        });
        var I2C = thisBlock.getFieldValue('I2C');
        var SDA = I2C == 'I2C1' ? 'PB7' : 'PB11';
        var SCL = I2C == 'I2C1' ? 'PB6' : 'PB10';
        var ToolTipMsg = Blockly.Msg.LCD_INIT_I2C_TTL.replace(
          '%1',
          SDA
        ).replace('%2', SCL);
        thisBlock.setTooltip(ToolTipMsg);
      }
      return newValue;
    });
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'I2C', 'i2c');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PORT', 'ports');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'd4', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'd5', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'd6', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'd7', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'EN', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'RS', 'digitalPins');
  },
  getLcdInstance: function () {
    return this.getFieldValue('ID');
  },
};

// send char
Blockly.Blocks['lcd_sendChar'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.LCD_CHAR)
      .appendField(list, 'ID')
      .appendField('character');
    this.appendValueInput('DATA');

    list.setValue('1');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_CHAR_TTL);
  },
  onchange: function (event) {
    onChangeLCD(event, this,'lcd_sendChar');
  },
};

// send string
Blockly.Blocks['lcd_sendString'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('DATA')
      .appendField(Blockly.Msg.LCD_STRING)
      .setCheck(Blockly.Types.TEXT.checkList);
    this.appendDummyInput().appendField('on lcd#').appendField(list, 'ID');

    list.setValue('1');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_STRING_TTL);
  },
  onchange: function (event) {
    onChangeLCD(event, this,'lcd_sendString');
  },
};
// send Number
Blockly.Blocks['lcd_sendNumber'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.LCD_NUMBER);
    this.appendDummyInput().appendField('on lcd#').appendField(list, 'ID');
    list.setValue('1');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_NUMBER_TTL);
  },
  onchange: function (event) {
    onChangeLCD(event, this,'lcd_sendNumber');
  },
};
// clear screen
Blockly.Blocks['lcd_clear'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.LCD_CLEAR)
      .appendField(list, 'ID');
    list.setValue('1');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function (event) {
    onChangeLCD(event, this,'lcd_clear');
  },
};

// go to x y
Blockly.Blocks['lcd_goto'] = {
  init: function () {
    var list = new Blockly.FieldDropdown([['1'], ['2'], ['3'], ['4']]);
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('ROW')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.LCD_GOTOx);
    this.appendDummyInput().appendField(Blockly.Msg.LCD_GOTOy);
    this.appendValueInput('COL').setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
      .appendField('on lcd#')
      .appendField(list, 'ID');
    list.setValue('1');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_GOTO_TTL);
  },
  onchange: function (event) {
    onChangeLCD(event, this,'lcd_goto');
  },
};
