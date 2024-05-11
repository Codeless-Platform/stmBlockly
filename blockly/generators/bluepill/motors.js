'use strict';

goog.provide('Blockly.Arduino.motors');

goog.require('Blockly.Arduino');

Blockly.Arduino['motor_init'] = function (block) {
  var EN = block.getFieldValue('PIN');
  var IN1 = block.getFieldValue('IN1');
  var IN2 = block.getFieldValue('IN2');
  var ID = block.getFieldValue('ID');

  var pinnumber = EN.slice(2);
  var gpio = 'GPIO' + EN.charAt(1);
  var TIM, Channel;
  [TIM, Channel] = getTimInstance(EN);
  Channel = 'TIM_Channel' + Channel;
  Blockly.Arduino.reservePin(block, EN, Blockly.Arduino.PinTypes.OUTPUT, 'pwm');
  Blockly.Arduino.reservePin(
    block,
    IN1,
    Blockly.Arduino.PinTypes.OUTPUT,
    'IN1'
  );
  Blockly.Arduino.reservePin(
    block,
    IN2,
    Blockly.Arduino.PinTypes.OUTPUT,
    'IN2'
  );
  var pinIncludeCode = `Motor_t Motor_pinConfig${ID};`;
  Blockly.Arduino.addInclude('motor' + ID, pinIncludeCode);

  var pinMainCode = `Motor_pinConfig${ID}.IN1 = PIN_${IN1.slice(2)};
  Motor_pinConfig${ID}.IN1_port = GPIO${IN1.charAt(1)};
  Motor_pinConfig${ID}.IN2 = PIN_${IN2.slice(2)};
  Motor_pinConfig${ID}.IN2_port = GPIO${IN2.charAt(1)};
  Motor_pinConfig${ID}.EN = PIN_${pinnumber};
  Motor_pinConfig${ID}.EN_port= ${gpio};
  Motor_pinConfig${ID}.TIM =${TIM};
  Motor_pinConfig${ID}.TIM_Channel=${Channel};
  Motor_init(&Motor_pinConfig${ID});`;
  Blockly.Arduino.addMain('motor_' + ID, pinMainCode, true);

  return '';
};
Blockly.Arduino['motor_move'] = function (block) {
  var direction = block.getFieldValue('DIR');
  var speed =
    Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) ||
    '0';
  var ID = block.getFieldValue('ID');
  var code;
  if (direction == 'Clockwise')
    code = `Motor_Clockwise(&Motor_pinConfig${ID}, ${speed});`;
  else if (direction == 'Anticlockwise')
    code = `Motor_AntiClockwise(&Motor_pinConfig${ID}, ${speed});`;
  else if (direction == 'Stop') code = `Motor_Stop(&Motor_pinConfig${ID});`;

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
