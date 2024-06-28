'use strict';

goog.provide('Blockly.Blocks.oled');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

//finds the oled init block if exists
const onChangeOled = function (event, obj, id) {
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
    var func = blocks[x].getOledInstance;
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
/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.oled.HUE = 120;
Blockly.Blocks['oled_init'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
    this.currentValuePresent = true;
    var list = new Blockly.FieldInstance(
      'OLED',
      Blockly.Msg.OLED_DEFAULT_NAME,
      false,
      false,
      false
    );
    var I2C_Instant = new Blockly.FieldDropdown(
      Blockly.Arduino.Boards.selected.i2c
    );
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_INIT)
      .appendField(list, 'ID')
      .appendField('I2C instance')
      .appendField(I2C_Instant, 'I2C')
      .appendField('address')
      .appendField(
        new Blockly.FieldDropdown([['0x78'], ['0x7A'], ['0x3C'], ['0x3D']]),
        'ADDRESS'
      )
      .appendField('size')
      .appendField(
        new Blockly.FieldDropdown([['128x64'], ['256x128']]),
        'SIZE'
      );
    this.setFieldValue('0x78', 'ADDRESS');
    this.setFieldValue('128x64', 'SIZE');
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    var ToolTipMsg = Blockly.Msg.OLED_INIT_I2C_TTL.replace('%1', 'PB7').replace(
      '%2',
      'PB6'
    );
    this.setTooltip(ToolTipMsg);
    var thisBlock = this;
    // change listener for I2C
    I2C_Instant.setValidator(function (newValue) {
      if (newValue === 'I2C1') {
        var ToolTipMsg = Blockly.Msg.OLED_INIT_I2C_TTL.replace(
          '%1',
          'PB7'
        ).replace('%2', 'PB6');
        thisBlock.setTooltip(ToolTipMsg);
      } else {
        var ToolTipMsg = Blockly.Msg.OLED_INIT_I2C_TTL.replace(
          '%1',
          'PB11'
        ).replace('%2', 'PB10');
        thisBlock.setTooltip(ToolTipMsg);
      }
    });
  },
  getOledInstance: function () {
    return this.getFieldValue('ID');
  },
  updateFields: function () {
    this.currentValuePresent = Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      'I2C',
      'i2c',
      this.getFieldValue('ID')
    );
  },
  onchange: function (event) {
    if (
      !this.workspace ||
      event.type == Blockly.Events.MOVE ||
      event.type == Blockly.Events.UI
    ) {
      return; // Block deleted or irrelevant event
    }
    this.getDuplicateBlock();
    this.getCurrentValuePresent();
  },
  getDuplicateBlock: function () {
    var thisInstanceName = this.getFieldValue('ID');
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var count = 0;

    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] != this) {
        var func = blocks[i].getOledInstance;
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
        'duplicateOled'
      );
    } else {
      this.setWarningText(null, 'duplicateOled');
    }
  },
  // checks if the I2C value is valid and removes the warning
  getCurrentValuePresent: function () {
    if (!this.currentValuePresent) {
      var field = this.getField('I2C');
      var fieldValue = field.getValue();
      var dataArray = Blockly.Arduino.Boards.selected.i2c;
      field.menuGenerator_ = dataArray;
      for (var i = 0; i < dataArray.length; i++) {
        if (fieldValue == dataArray[i][1]) {
          this.currentValuePresent = true;
        }
      }
    }
    if (this.currentValuePresent) {
      var id = this.getFieldValue('ID');
      this.setWarningText(null, id);
    }
  },
};

Blockly.Blocks['oled_sendString'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );

    var fonts = [['Font_7x10'], ['Font_11x18'], ['Font_16x26']];
    var colors = [['White'], ['Black']];
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.TEXT.checkList)
      .appendField(Blockly.Msg.OLED_STRING);
    this.appendDummyInput()
      .appendField('on ')
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
      )
      .appendField(Blockly.Msg.OLED_FONT)
      .appendField(new Blockly.FieldDropdown(fonts), 'FONT');
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_COLOR)
      .appendField(new Blockly.FieldDropdown(colors), 'COLOR');
    this.setFieldValue('Font_11x18', 'FONT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_sendString');
  },
};
Blockly.Blocks['oled_sendNumber'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
    var fonts = [['Font_7x10'], ['Font_11x18'], ['Font_16x26']];
    var colors = [['White'], ['Black']];
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput('DATA')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.OLED_NUMBER);
    this.appendDummyInput()
      .appendField('on ')
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
      )
      .appendField(Blockly.Msg.OLED_FONT)
      .appendField(new Blockly.FieldDropdown(fonts), 'FONT');
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_COLOR)
      .appendField(new Blockly.FieldDropdown(colors), 'COLOR');

    this.setFieldValue('Font_11x18', 'FONT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_sendNumber');
  },
};

Blockly.Blocks['oled_clear'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_CLEAR)
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_clear');
  },
};

// go to x y
Blockly.Blocks['oled_goto'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput('ROW')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.OLED_GOTOx);
    this.appendDummyInput().appendField(Blockly.Msg.OLED_GOTOy);
    this.appendValueInput('COL').setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
      .appendField('on ')
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.OLED_GOTO_TTL);
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_goto');
  },
};

Blockly.Blocks['oled_UpdateScreen'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_UPDATE)
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.OLED_UPDATE_TTL);
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_UpdateScreen');
  },
};

Blockly.Blocks['oled_Scroll'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
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
    this.appendDummyInput()
      .appendField('on ')
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
      );
    this.setFieldValue('Left', 'SCROLL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.OLED_UPDATE_TTL);
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_Scroll');
  },
};

Blockly.Blocks['oled_StopScroll'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_STOP_SCROLL)
      .appendField('on ')
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_StopScroll');
  },
};
// oled bitmap
Blockly.Blocks['oled_drawBitmap'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
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
      .appendField(new Blockly.FieldDropdown(color), 'COLOR')
      .appendField('on ')
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Draws a bitmap at the specified coordinates');
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_drawBitmap');
  },
};

// oled Draw
Blockly.Blocks['oled_Draw'] = {
  init: function () {
    this.setHelpUrl(
      'https://github.com/Codeless-Platform/stmBlockly/tree/master/STMCubeProject/HAL/OLED'
    );
    const shapes = [['Line'], ['Triangle'], ['Rectangle'], ['Circle']];
    const color = [['White'], ['Black']];
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.OLED_DRAW)
      .appendField(
        new Blockly.FieldDropdown(shapes, this.updateShape_.bind(this)),
        'SHAPE'
      )
      .appendField('on ')
      .appendField(
        new Blockly.FieldInstance(
          'OLED',
          Blockly.Msg.OLED_DEFAULT_NAME,
          false,
          false,
          false
        ),
        'ID'
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
  mutationToDom: function () {
    var container = document.createElement('mutation');
    container.setAttribute('shape', this.shape);
    if (this.getField('FILLED')) {
      container.setAttribute('filled', this.getFieldValue('FILLED'));
    }
    return container;
  },

  domToMutation: function (xmlElement) {
    var shape = xmlElement.getAttribute('shape');
    this.setFieldValue(shape, 'SHAPE');
    this.shape = shape;
    this.updateShape_(shape);
    if (this.getField('FILLED')) {
      this.setFieldValue(xmlElement.getAttribute('filled'), 'FILLED');
    }
  },
  onchange: function (event) {
    onChangeOled(event, this, 'oled_Draw');
  },
};
