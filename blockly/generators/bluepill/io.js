/**
 * @fileoverview Code generator for STM Digital and Analogue input/output.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.IO');

goog.require('Blockly.Arduino');

/**
 * Function for 'set pin' (X) to a state (Y).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_writePin'] = function (block) {
  var pin = block.getFieldValue('PIN');
  var gpio = pin.charAt(1);
  var pinnumber = pin.slice(2);

  var stateOutput =
    Blockly.Arduino.valueToCode(block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) ||
    'LOW';

  Blockly.Arduino.reservePin(
    block,
    pin,
    Blockly.bluepill.PinTypes.OUTPUT,
    'Write PIN'
  );

  var pinIncludeCode = 'GPIO_PinConfig_t GPIO_pinConfig;\n';
  Blockly.Arduino.addInclude('io', pinIncludeCode);

  var pinCode =
    'GPIO_pinConfig.MODE = MODE_OUTPUT_PP;\nGPIO_pinConfig.Pin_Number = PIN_' +
    pinnumber +
    ';\nGPIO_pinConfig.Output_Speed =SPEED_10M;\n';

  var pinMainCode = pinCode + 'GPIO_init(GPIO' + gpio + ', &GPIO_pinConfig);';
  Blockly.Arduino.addMain('io_' + pin, pinMainCode, false);

  var code =
    'GPIO_WritePin(GPIO' +
    gpio +
    ' ,PIN_' +
    pinnumber +
    ', ' +
    stateOutput +
    ');\n';
  return code;
};

/**
 * Function for reading a digital pin (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X)     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_readPin'] = function (block) {
  var pin = block.getFieldValue('PIN');
  var gpio = pin.charAt(1);
  var pinnumber = pin.slice(2);

  Blockly.Arduino.reservePin(
    block,
    pin,
    Blockly.bluepill.PinTypes.INPUT,
    'Read Pin'
  );

  var pinIncludeCode = 'GPIO_PinConfig_t GPIO_pinConfig;\n';
  Blockly.Arduino.addInclude('io', pinIncludeCode);

  var pinCode =
    'GPIO_pinConfig.MODE = MODE_INPUT_FLO;\nGPIO_pinConfig.Pin_Number = PIN_' +
    pinnumber +
    ';';

  var pinMainCode = pinCode + '\nGPIO_init(GPIO' + gpio + ', &GPIO_pinConfig);';
  Blockly.Arduino.addMain('io_' + pin, pinMainCode, false);

  var code = 'GPIO_ReadPin(GPIO' + gpio + ' ,PIN_' + pinnumber + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for setting the state (Y) of a built-in LED (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_builtin_led'] = function (block) {
  var pin = block.getFieldValue('BUILT_IN_LED');
  var gpio = pin.charAt(1);
  var pinnumber = pin.slice(2);

  var stateOutput =
    Blockly.Arduino.valueToCode(block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) ||
    'LOW';

  Blockly.Arduino.reservePin(
    block,
    pin,
    Blockly.bluepill.PinTypes.OUTPUT,
    'Write Pin'
  );

  var pinIncludeCode = 'GPIO_PinConfig_t GPIO_pinConfig;\n';
  Blockly.Arduino.addInclude('io', pinIncludeCode);

  var pinCode =
    'GPIO_pinConfig.MODE = MODE_OUTPUT_PP;\nGPIO_pinConfig.Pin_Number = PIN_' +
    pinnumber +
    ';\nGPIO_pinConfig.Output_Speed =SPEED_10M;';

  var pinMainCode = pinCode + '\nGPIO_init(GPIO' + gpio + ', &GPIO_pinConfig);';
  Blockly.Arduino.addMain('io_' + pin, pinMainCode, false);

  var code =
    'GPIO_WritePin(GPIO' +
    gpio +
    ' ,PIN_' +
    pinnumber +
    ', ' +
    stateOutput +
    ');\n';
  return code;
};

// New Blocks

Blockly.Arduino['io_togglePin'] = function (block) {
  var pin = block.getFieldValue('PIN');
  var gpio = pin.charAt(1);
  var pinnumber = pin.slice(2);

  Blockly.Arduino.reservePin(
    block,
    pin,
    Blockly.bluepill.PinTypes.OUTPUT,
    'toggle pin'
  );

  var pinIncludeCode = 'GPIO_PinConfig_t GPIO_pinConfig;\n';
  Blockly.Arduino.addInclude('io', pinIncludeCode);

  var pinCode =
    '\nGPIO_pinConfig.MODE = MODE_OUTPUT_PP;\nGPIO_pinConfig.Pin_Number = PIN_' +
    pinnumber +
    '; \nGPIO_pinConfig.Output_Speed =SPEED_10M;';
  var pinMainCode = pinCode + '\nGPIO_init(GPIO' + gpio + ', &GPIO_pinConfig);';
  Blockly.Arduino.addMain('io_' + pin, pinMainCode, false);

  var code = 'GPIO_TogglePin(GPIO' + gpio + ' ,PIN_' + pinnumber + ');\n';
  return code;
};

Blockly.Arduino['io_writePort'] = function (block) {
  var port = block.getFieldValue('PORT');

  var stateOutput =
    Blockly.Arduino.valueToCode(block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) ||
    'LOW';

  var pinIncludeCode = 'GPIO_PinConfig_t GPIO_pinConfig;\n';
  Blockly.Arduino.addInclude('io', pinIncludeCode);

  var pinCode =
    '\nGPIO_pinConfig.MODE = MODE_OUTPUT_PP;\nGPIO_pinConfig.Output_Speed =SPEED_10M;';
  var pinMainCode = pinCode + '\nGPIO_initPort(' + port + ', &GPIO_pinConfig);';
  Blockly.Arduino.addMain('io_', pinMainCode, false);

  var code = 'GPIO_WritePort(' + port + ',' + stateOutput + ');\n';
  return code;
};

Blockly.Arduino['io_readPort'] = function (block) {
  var port = block.getFieldValue('PORT');

  var pinIncludeCode = 'GPIO_PinConfig_t GPIO_pinConfig;\n';
  Blockly.Arduino.addInclude('io', pinIncludeCode);

  var pinCode = '\nGPIO_pinConfig.MODE = MODE_INPUT_FLO;\n';
  var pinMainCode = pinCode + '\nGPIO_initPort(' + port + ', &GPIO_pinConfig);';
  Blockly.Arduino.addMain('io_', pinMainCode, false);

  var code = 'GPIO_ReadPort(' + port + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Value for defining a digital pin state.
 * Arduino code: loop { HIGH / LOW }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_highlow'] = function (block) {
  var code = block.getFieldValue('STATE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_readAnalogPin'] = function (block) {
  var pin = block.getFieldValue('PIN');
  var ADC = block.getFieldValue('ADC');

  var gpio = pin.charAt(1);
  var adcChannel = 'ADC_CH' + pin.slice(2);
  if (gpio == 'B') {
    adcChannel = pin.slice(2) == 0 ? 'ADC_CH8' : 'ADC_CH9';
  }

  Blockly.Arduino.reservePin(
    block,
    pin,
    Blockly.bluepill.PinTypes.ADC,
    'Analog Read'
  );

  var pinCode = 'ADC_init(' + ADC + ');\n';

  Blockly.Arduino.addMain('io_' +ADC, pinCode, false);

  var code = 'ADC_read(' + ADC + ',' + adcChannel + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_writePwm'] = function (block) {
  var pin = block.getFieldValue('PIN');
  var pwmValue =
    Blockly.Arduino.valueToCode(block, 'PWM', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var pinnumber = pin.slice(2);
  var gpio = 'GPIO' + pin.charAt(1);
  var TIM, Channel;
  [TIM, Channel] = getTimInstance(pin);
  Channel = 'TIM_Channel' + Channel;
  Blockly.Arduino.reservePin(block, pin, Blockly.bluepill.PinTypes.TIM, 'pwm');
  var pinIncludeCode = 'TIM_ConfigType timConfig;';
  Blockly.Arduino.addInclude('tim', pinIncludeCode);
  pinIncludeCode = 'GPIO_PinConfig_t GPIO_pinConfig;';
  Blockly.Arduino.addInclude('io', pinIncludeCode);
  pinIncludeCode = ' PWM_ConfigType pwmConfig;';
  Blockly.Arduino.addInclude('pwm', pinIncludeCode);

  var pinMainCode = `GPIO_pinConfig.Pin_Number = PIN_${pinnumber};
	GPIO_pinConfig.MODE = MODE_OUTPUT_AF_PP;
	GPIO_pinConfig.Output_Speed = SPEED_10M;
	GPIO_init(${gpio}, &GPIO_pinConfig);
  // configure timer
  timConfig.AutoReloadValue = 625;
  timConfig.AutoReloadBuffer = Disable_ARR_Buffer;
  timConfig.Tim_Direction = Up_Counting;
  timConfig.ClockFactor = Div_1;
  timConfig.UDI_State = Disable_Interrupt;
  timConfig.AlignedMode = EdgeAligned_Mode;
  timConfig.Prescalar = 0;
  TIM_Init(${TIM}, &timConfig);
  //configure pwm 
  pwmConfig.AutoReloadValue = 625;
  pwmConfig.Freq = 1;
  pwmConfig.Channel = ${Channel};
  pwmConfig.Mode = PWM_11;
  PWM_Init(${TIM}, &pwmConfig);`;
  Blockly.Arduino.addMain('io_' + pin, pinMainCode, false);

  var code = `PWM_voidSetDutyCycle(${TIM}, ${Channel}, ${pwmValue});  `;
  return code;
};

function getTimInstance(pin) {
  var TIM = 'TIM';
  var Channel;
  if (pin == 'PA8' || pin == 'PA9' || pin == 'PA10') {
    TIM = 'TIM1';
    Channel = parseInt(pin.slice(2)) - 7;
  }
  if (pin == 'PA0' || pin == 'PA2' || pin == 'PA3') {
    TIM = 'TIM2';
    Channel = parseInt(pin.slice(2)) + 1;
  }
  if (pin == 'PB0' || pin == 'PB1') {
    TIM = 'TIM3';
    Channel = parseInt(pin.slice(2)) + 3;
  }
  if (pin == 'PA6') {
    TIM = 'TIM3';
    Channel = 1;
  }
  if (pin == 'PB6' || pin == 'PB7' || pin == 'PB8' || pin == 'PB9') {
    TIM = 'TIM4';
    Channel = parseInt(pin.slice(2)) - 5;
  }
  return [TIM, Channel];
}
