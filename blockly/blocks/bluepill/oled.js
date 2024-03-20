'use strict';

goog.provide('Blockly.Blocks.oled');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.oled.HUE = 120;
Blockly.Blocks['oled_init'] = {
  init: function () {
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_INIT)
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.i2c),
        'I2C'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.OLED_INIT_I2C_TTL);
  },
};

Blockly.Blocks['oled_sendString'] = {
  init: function () {
    var fonts = [['Font_7x10'], ['Font_11x18'], ['Font_16x26']];
    var colors = [['White'], ['Black']];
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.TEXT.checkList)
      .appendField(Blockly.Msg.OLED_STRING);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_FONT)
      .appendField(new Blockly.FieldDropdown(fonts), 'FONT');
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_COLOR)
      .appendField(new Blockly.FieldDropdown(colors), 'COLOR');

    this.setFieldValue('Font_11x18', 'FONT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.OLED_STRING_TTL);
  },
};

Blockly.Blocks['oled_clear'] = {
  init: function () {
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.OLED_CLEAR);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

// go to x y
Blockly.Blocks['oled_goto'] = {
  init: function () {
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput('ROW')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.OLED_GOTOx);
    this.appendDummyInput().appendField(Blockly.Msg.OLED_GOTOy);
    this.appendValueInput('COL').setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.OLED_GOTO_TTL);
  },
};

Blockly.Blocks['oled_UpdateScreen'] = {
  init: function () {
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.OLED_UPDATE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.OLED_UPDATE_TTL);
  },
};

Blockly.Blocks['oled_Scroll'] = {
  init: function () {
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_SCROLL)
      .appendField(
        new Blockly.FieldDropdown([
          ['Left'],
          ['Right'],
          ['diagonal Left'],
          ['diagonal Right'],
        ]),
        'SCROLL'
      )
      .appendField(Blockly.Msg.OLED_SCROLLx);
    this.appendValueInput('ROW').setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput().appendField(Blockly.Msg.OLED_SCROLLy);
    this.appendValueInput('COL').setCheck(Blockly.Types.NUMBER.checkList);
    this.setFieldValue('Left', 'SCROLL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.OLED_UPDATE_TTL);
  },
};

Blockly.Blocks['oled_StopScroll'] = {
  init: function () {
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.OLED_STOP_SCROLL);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};
// oled bitmap
Blockly.Blocks['oled_drawBitmap'] = {
  init: function () {
    const color = [['White'], ['Black']];

    this.setColour(Blockly.Blocks.oled.HUE);

    this.appendDummyInput().appendField('Draw Bitmap');

    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.TEXT.checkList)
      .appendField('Data');

    this.appendValueInput('WIDTH')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField('Width');

    this.appendValueInput('HEIGHT')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField('Height');

    this.appendValueInput('X')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField('X');
    this.appendValueInput('Y')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField('Y');

    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_COLOR)
      .appendField(new Blockly.FieldDropdown(color), 'COLOR');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Draws a bitmap at the specified coordinates');
  },
};

// oled Draw
Blockly.Blocks['oled_Draw'] = {
  init: function () {
    const shapes = [['Line'], ['Triangle'], ['Rectangle'], ['Circle']];
    const color = [['White'], ['Black']];
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DRAW)
      .appendField(
        new Blockly.FieldDropdown(shapes, this.updateShape_.bind(this)),
        'SHAPE'
      )
      .appendField(Blockly.Msg.OLED_COLOR)
      .appendField(new Blockly.FieldDropdown(color), 'COLOR');
    this.shape = 'Line'; // Default shape
    this.updateShape_(this.shape);
    this.setInputsInline(true);
    this.setFieldValue('Line', 'SHAPE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  updateShape_: function (option) {
    this.shape = option;
    this.removeShapeInputs_();
    switch (option) {
      case 'Line':
        this.appendValueInput('X1')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('X1');
        this.appendValueInput('Y1')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Y1');
        this.appendValueInput('X2')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('X2');
        this.appendValueInput('Y2')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Y2');

        break;
      case 'Rectangle':
        this.appendDummyInput('FILLED')
          .appendField('Filled')
          .appendField(new Blockly.FieldCheckbox('FALSE'), 'FILLED');
        this.appendValueInput('X1')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('X1');
        this.appendValueInput('Y1')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Y1');
        this.appendValueInput('X2')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('X2');
        this.appendValueInput('Y2')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Y2');

        break;
      case 'Circle':
        this.appendDummyInput('FILLED')
          .appendField('Filled')
          .appendField(new Blockly.FieldCheckbox('FALSE'), 'FILLED');
        this.appendValueInput('X1')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('X1');
        this.appendValueInput('Y1')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Y1');

        this.appendValueInput('Radius')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Radius');

        break;
      case 'Triangle':
        this.appendValueInput('X1')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('X1');
        this.appendValueInput('Y1')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Y1');
        this.appendValueInput('X2')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('X2');
        this.appendValueInput('Y2')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Y2');
        this.appendValueInput('X3')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('X3');
        this.appendValueInput('Y3')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField('Y3');

        break;
      default:
        break;
    }
  },
  removeShapeInputs_: function () {
    var inputNamesToRemove = [
      'X2',
      'Y2',
      'Radius',
      'X3',
      'Y3',
      'X1',
      'Y1',
      'FILLED',
    ];
    for (var i = 0; i < inputNamesToRemove.length; i++) {
      var inputName = inputNamesToRemove[i];
      if (this.getInput(inputName)) {
        this.removeInput(inputName); // removes any field defined by this.appendValueInput
      }
    }
  },
};
