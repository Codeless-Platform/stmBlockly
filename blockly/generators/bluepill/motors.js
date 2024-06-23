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
  var pinIncludeCode = `Motor_t ${ID};`;
  Blockly.Arduino.addInclude('motor' + ID, pinIncludeCode);

  var pinMainCode = `${ID}.IN1 = PIN_${IN1.slice(2)};
  ${ID}.IN1_port = GPIO${IN1.charAt(1)};
  ${ID}.IN2 = PIN_${IN2.slice(2)};
  ${ID}.IN2_port = GPIO${IN2.charAt(1)};
  ${ID}.EN = PIN_${pinnumber};
  ${ID}.EN_port= ${gpio};
  ${ID}.TIM =${TIM};
  ${ID}.TIM_Channel=${Channel};
  Motor_init(&${ID});`;
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
    code = `Motor_Clockwise(&${ID}, ${speed});`;
  else if (direction == 'Anticlockwise')
    code = `Motor_AntiClockwise(&${ID}, ${speed});`;
  else if (direction == 'Stop') code = `Motor_Stop(&${ID});`;

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

Blockly.Arduino['stepper_config'] = function(block) {
  var PIN1 = block.getFieldValue('PIN1');
  var PIN2 = block.getFieldValue('PIN2');
  var PIN3 = block.getFieldValue('PIN3');
  var PIN4 = block.getFieldValue('PIN4');
  var PINS = [PIN1,PIN2,PIN3,PIN4]
  var stepperInstanceName = block.getFieldValue('STEPPER_NAME');
  var pinnumber=[];
  var gpio= [];
for (var i = 0; i < 4; i++) {
   pinnumber[i] = 'PIN_'+PINS[i].slice(2);
   gpio[i] =  'GPIO'+PINS[i].charAt(1);
  Blockly.Arduino.reservePin(
    block,
    PINS[i],
    Blockly.Arduino.PinTypes.OUTPUT,
    'PIN'+(i+1)
  );
}
  var pinIncludeCode = `stepper_t ${stepperInstanceName};`;
  Blockly.Arduino.addInclude('stepper' + stepperInstanceName, pinIncludeCode);

  var pinMainCode = `${stepperInstanceName}.IN1_PIN = ${pinnumber[0]} ;
  ${stepperInstanceName}.IN2_PIN = ${pinnumber[1]} ;
  ${stepperInstanceName}.IN3_PIN = ${pinnumber[2]} ;
  ${stepperInstanceName}.IN4_PIN = ${pinnumber[3]} ; 
  ${stepperInstanceName}.IN1_PORT = ${gpio[0]} ;
  ${stepperInstanceName}.IN2_PORT = ${gpio[1]} ;
  ${stepperInstanceName}.IN3_PORT = ${gpio[2]} ;
  ${stepperInstanceName}.IN4_PORT = ${gpio[3]} ;
  	stepper_init(&${stepperInstanceName});`;
  Blockly.Arduino.addMain('stepper' + stepperInstanceName, pinMainCode, true);
  return '';
};


Blockly.Arduino['stepper_step'] = function(block) {
  var stepperInstanceName = block.getFieldValue('STEPPER_NAME');
  var stepperDir = block.getFieldValue('STEPPER_DIR') == 'Anticlockwise'? 1:0;
  var stepperRPM = Blockly.Arduino.valueToCode(block, 'STEPPER_RPM',
    Blockly.Arduino.ORDER_ATOMIC) || '0';
  var stepperAngle = Blockly.Arduino.valueToCode(block, 'STEPPER_ANGLE',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = `stepper_step_angle(${stepperAngle},${stepperDir},${stepperRPM},&${stepperInstanceName});\n`;
  return code;
};
