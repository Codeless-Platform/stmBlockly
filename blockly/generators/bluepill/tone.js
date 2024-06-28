/**
 * @fileoverview Code generator for STM Digital and Analogue input/output.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.tone');

goog.require('Blockly.Arduino');

Blockly.Arduino['set_tone'] = function (block) {
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

  var pinIncludeCode = 'Buzzer_t buzzer;';
  Blockly.Arduino.addInclude('buzzer', pinIncludeCode);

  var pinMainCode = `buzzer.pin = PIN_${pinnumber};
	buzzer.port = ${gpio};
	buzzer.TIM = ${TIM};
	buzzer.TIM_Channel =  ${Channel};
  Buzzer_init(&buzzer);`;
  Blockly.Arduino.addMain('buzzer_' + pin, pinMainCode, false);

  var code = `Buzzer_tone(&buzzer, ${pwmValue});  `;
  return code;
};
Blockly.Arduino['no_tone'] = function (block) {
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

  var pinIncludeCode = 'Buzzer_t buzzer;';
  Blockly.Arduino.addInclude('buzzer', pinIncludeCode);

  var pinMainCode = `buzzer.pin = PIN_${pinnumber};
	buzzer.port = ${gpio};
	buzzer.TIM = ${TIM};
	buzzer.TIM_Channel =  ${Channel};
  Buzzer_init(&buzzer);`;
  Blockly.Arduino.addMain('buzzer_' + pin, pinMainCode, false);

  var code = `Buzzer_noTone(&buzzer);  `;
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
