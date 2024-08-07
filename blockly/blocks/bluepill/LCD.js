'use strict';

goog.provide('Blockly.Blocks.lcd');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.lcd.HUE = 400;
// this function finds the lcd initalization block 
const onChangeLCD = function (event, obj, id) {
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
      Blockly.Msg.PRINT_WARN.replace('%1', thisInstanceName),
      id
    );
  } else {
    obj.setWarningText(null, id);
  }
};
Blockly.Blocks['lcd_init'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LCD_Multi_Instances');
    this.currentValuePresent = true;
    var list = new Blockly.FieldInstance(
      'LCD',
      Blockly.Msg.LCD_DEFAULT_NAME,
      false,
      false,
      false
    );
    var I2C_Instant = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.i2c
    );
    var dropdownType = new Blockly.FieldDropdown([['Standard'], ['I2C']],this.updateVisibility.bind(this));
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
      .appendField(Blockly.Msg.LCD_TYPE)
      .appendField(dropdownType, 'TYPE')
      .appendField(Blockly.Msg.LCD_SIZE)
      .appendField(dropdownSize, 'SIZE');

      this.standardInput = this.appendStandardInputs();
      this.i2cInput = this.appendI2CInputs(I2C_Instant, dropdownAddress);

    this.setFieldValue('2x16', 'SIZE');
    this.setFieldValue('0x4E', 'ADDRESS');
    this.setFieldValue('I2C', 'TYPE');
    this.setInputsInline(false);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setTooltipFromI2C(I2C_Instant);

    this.updateVisibility(this.getFieldValue('TYPE'));
  },
  mutationToDom: function () {
    var container = document.createElement('mutation');
    container.setAttribute('type', this.getFieldValue('TYPE'));
    container.setAttribute('size', this.getFieldValue('SIZE'));
    container.setAttribute('address', this.getFieldValue('ADDRESS'));
    return container;
  },

  domToMutation: function (xmlElement) {
    var type = xmlElement.getAttribute('type');
    var size = xmlElement.getAttribute('size');
    var address = xmlElement.getAttribute('address');
    this.setFieldValue(type, 'TYPE');
    this.setFieldValue(size, 'SIZE');
    this.setFieldValue(address, 'ADDRESS');
    this.updateVisibility(type);
  },
  updateVisibility: function (type) {
    if (type == 'Standard') {
      this.setTooltip('Initalize LCD screen connected to the selected pins');
      this.initStandartInputs();
      this.standardInput.setVisible(true);
      this.i2cInput.setVisible(false);
    } else if (type == "I2C") {
      this.standardInput.setVisible(false);
      this.i2cInput.setVisible(true);
    }
    this.render();
  },
  appendStandardInputs: function () {
    return this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.full_ports), 'PORT')
      .appendField(Blockly.Msg.LCD_D4)
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'd4')
      .appendField(Blockly.Msg.LCD_D5)
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'd5')
      .appendField(Blockly.Msg.LCD_D6)
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'd6')
      .appendField(Blockly.Msg.LCD_D7)
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'd7')
      .appendField(Blockly.Msg.LCD_EN)
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'EN')
      .appendField(Blockly.Msg.LCD_RS)
      .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'RS');
  },
  initStandartInputs: function(){
    this.setFieldValue('PA0','d4')
    this.setFieldValue('PA1','d5')
    this.setFieldValue('PA2','d6')
    this.setFieldValue('PA3','d7')
    this.setFieldValue('PA4','EN')
    this.setFieldValue('PA5','RS')
  },

  appendI2CInputs: function (I2C_Instant, dropdownAddress) {
    return this.appendDummyInput()
      .appendField(Blockly.Msg.LCD_INIT_I2C)
      .appendField(I2C_Instant, 'I2C')
      .appendField(Blockly.Msg.LCD_ADDRESS_I2C)
      .appendField(dropdownAddress, 'ADDRESS');
  },
  setTooltipFromI2C: function (I2C_Instant) {
    const thisBlock = this;
    const ToolTipMsg = Blockly.Msg.LCD_INIT_I2C_TTL.replace('%1', 'PB7').replace('%2', 'PB6');
    this.setTooltip(ToolTipMsg);

    I2C_Instant.setValidator(function (newValue) {
      const ToolTipMsg = (newValue === 'I2C1')
        ? Blockly.Msg.LCD_INIT_I2C_TTL.replace('%1', 'PB7').replace('%2', 'PB6')
        : Blockly.Msg.LCD_INIT_I2C_TTL.replace('%1', 'PB11').replace('%2', 'PB10');
      thisBlock.setTooltip(ToolTipMsg);
    });
  },
  // gets called when the board changes
  updateFields: function () {
    this.currentValuePresent= Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'I2C', 'i2c',this.getFieldValue('ID'));
  },
  getLcdInstance: function () {
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
   this.getDuplicateBlock()
   this.getCurrentValuePresent()
  },
  // check if the init block is duplicated with the same ID 
  getDuplicateBlock:function(){
    var thisInstanceName = this.getFieldValue('ID');
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var count = 0;

    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] != this) {
        var func = blocks[i].getLcdInstance;
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
        'duplicateLCD'
      );
    } else {
      this.setWarningText(null,'duplicateLCD');
    }
  },
  // checks if the I2C value is valid and removes the warning
  getCurrentValuePresent: function(){
    if (!this.currentValuePresent) {
      var field = this.getField('I2C');
      var fieldValue = field.getValue();
      var dataArray = Blockly.Arduino.Boards.selected.i2c;
      field.menuGenerator_ = dataArray;
      for (var i = 0; i < dataArray.length; i++) {
        if (fieldValue == dataArray[i][1]) {
          this.currentValuePresent = true;
        }}
    }
    if(this.currentValuePresent) {
      var id = this.getFieldValue('ID')
      this.setWarningText(null,id);
    } 
  },
};

// send char
Blockly.Blocks['lcd_sendChar'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LCD_Multi_Instances');
    var list = new Blockly.FieldInstance(
      'LCD',
      Blockly.Msg.LCD_DEFAULT_NAME,
      false,
      false,
      false
    );
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.LCD_CHAR)
      .appendField(list, 'ID')
      .appendField('character');
    this.appendValueInput('DATA');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_CHAR_TTL);
  },
  onchange: function (event) {
    onChangeLCD(event, this, 'lcd_sendChar');
  },
};

// send string
Blockly.Blocks['lcd_sendString'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LCD_Multi_Instances');
    var list = new Blockly.FieldInstance(
      'LCD',
      Blockly.Msg.LCD_DEFAULT_NAME,
      false,
      false,
      false
    );
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('DATA')
      .appendField(Blockly.Msg.LCD_STRING)
      .setCheck(Blockly.Types.TEXT.checkList);
    this.appendDummyInput().appendField('on ').appendField(list, 'ID');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_STRING_TTL);
  },
  onchange: function (event) {
    onChangeLCD(event, this, 'lcd_sendString');
  },
};
// send Number
Blockly.Blocks['lcd_sendNumber'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LCD_Multi_Instances');
    var list = new Blockly.FieldInstance(
      'LCD',
      Blockly.Msg.LCD_DEFAULT_NAME,
      false,
      false,
      false
    );
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.LCD_NUMBER);
    this.appendDummyInput().appendField('on ').appendField(list, 'ID');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_NUMBER_TTL);
  },
  onchange: function (event) {
    onChangeLCD(event, this, 'lcd_sendNumber');
  },
};
// clear screen
Blockly.Blocks['lcd_clear'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LCD_Multi_Instances');
    var list = new Blockly.FieldInstance(
      'LCD',
      Blockly.Msg.LCD_DEFAULT_NAME,
      false,
      false,
      false
    );
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.LCD_CLEAR)
      .appendField(list, 'ID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function (event) {
    onChangeLCD(event, this, 'lcd_clear');
  },
};

// go to x y
Blockly.Blocks['lcd_goto'] = {
  init: function () {
    this.setHelpUrl('https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/LCD_Multi_Instances');
    var list = new Blockly.FieldInstance(
      'LCD',
      Blockly.Msg.LCD_DEFAULT_NAME,
      false,
      false,
      false
    );
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput('ROW')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.LCD_GOTOx);
    this.appendDummyInput().appendField(Blockly.Msg.LCD_GOTOy);
    this.appendValueInput('COL').setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput().appendField('on ').appendField(list, 'ID');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LCD_GOTO_TTL);
  },
  onchange: function (event) {
    onChangeLCD(event, this, 'lcd_goto');
  },
};
