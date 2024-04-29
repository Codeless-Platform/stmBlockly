'use strict';

goog.provide('Blockly.Arduino.sensors');

goog.require('Blockly.Arduino');

Blockly.Arduino['sensors_LM35'] = function (block) {
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
    Blockly.Arduino.PinTypes.INPUT,
    'Analog Read'
  );

  var pinCode = 'LM35_init(' + ADC + ');\n';

  Blockly.Arduino.addMain('lm35_'+ADC, pinCode, false);

  var code = 'LM35_Read(' + ADC + ',' + adcChannel + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['sensors_PIR'] = function (block) {
  var pin = block.getFieldValue('PIN');
  var gpio = pin.charAt(1);
  var pinnumber = pin.slice(2);

  Blockly.Arduino.reservePin(
    block,
    pin,
    Blockly.Arduino.PinTypes.INPUT,
    'PIR Pin'
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

Blockly.Arduino['sensors_ultrasonic'] = function (block) {
  var echo = block.getFieldValue('echo');
  var echo_port = 'GPIO' + echo.charAt(1);
  var echo_pin = 'PIN_' + echo.slice(2);
  var trig = block.getFieldValue('trig');
  var trig_port = 'GPIO' + trig.charAt(1);
  var trig_pin = 'PIN_' + trig.slice(2);
  var us_id = echo.slice(2) + trig.slice(2);
  Blockly.Arduino.reservePin(
    block,
    echo,
    Blockly.Arduino.PinTypes.INPUT,
    'echo pin'
  );
  Blockly.Arduino.reservePin(
    block,
    trig,
    Blockly.Arduino.PinTypes.OUTPUT,
    'trig pin'
  );
  var pinIncludeCode = `Ultrasonic_t ultrasonic_pinConfig${us_id};`;
  Blockly.Arduino.addInclude(us_id, pinIncludeCode);

  var pinCode = ` 
  ultrasonic_pinConfig.echo_port = ${echo_port};
  ultrasonic_pinConfig.echo_pin =${echo_pin};
  ultrasonic_pinConfig.trig_port=${trig_port};
  ultrasonic_pinConfig.trig_pin =${trig_pin};
  ultraSonic_init(&ultrasonic_pinConfig${us_id});\n`;
  Blockly.Arduino.addMain(us_id, pinCode, false);
  var code = `ultraSonic_readDistance(&ultrasonic_pinConfig${us_id})`;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
