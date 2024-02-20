
/**
 * @fileoverview Code generator for STM Digital and Analogue input/output.
 *    
 */
'use strict';

goog.provide('Blockly.Arduino.IO');

goog.require('Blockly.Arduino');


var index=1;
/**
 * Function for 'set pin' (X) to a state (Y).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_digitalwrite'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var gpio = pin.charAt(1); 
  var pinnumber = pin.slice(2); 

  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  var pinDeclarationCode ='GPIO_PinConfig_t GPIO_pinConfig'+ index + ';\nGPIO_pinConfig.MODE = MODE_OUTPUT_PP; \nGPIO_pinConfig.Output_Speed =SPEED_10M;' ;    
  Blockly.Arduino.addDeclaration('io_' + pin , pinDeclarationCode);  
  
  var pinSetupCode = 'GPIO_init(GPIO'+gpio +  ', &GPIO_pinConfig'+ index + ');' ; 
  Blockly.Arduino.addMain('io_' + pin, pinSetupCode, false);
  index++;
  var code = 'GPIO_WritePin(GPIO'+gpio + ' ,PIN_'+ pinnumber +', ' +'PIN_'+ stateOutput + ');\n';
  return code;
};

/**
 * Function for reading a digital pin (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X)     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_digitalread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var gpio = pin.charAt(1); 
  var pinnumber = pin.slice(2); 

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  var pinDeclarationCode ='GPIO_PinConfig_t GPIO_pinConfig'+ index + ';\nGPIO_pinConfig.MODE = MODE_INPUT_FLO;' ;    
  Blockly.Arduino.addDeclaration('io_' + pin , pinDeclarationCode);  

  var pinSetupCode = 'GPIO_init(GPIO'+gpio +  ', &GPIO_pinConfig'+ index + ');';
  Blockly.Arduino.addMain('io_' + pin, pinSetupCode, false);

  var code = 'GPIO_WritePin(GPIO'+gpio + ' ,PIN_'+ pinnumber + ')\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for setting the state (Y) of a built-in LED (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_builtin_led'] = function(block) {
  var pin = block.getFieldValue('BUILT_IN_LED');
  var gpio = pin.charAt(1); 
  var pinnumber = pin.slice(2); 

  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  var pinDeclarationCode ='GPIO_PinConfig_t GPIO_pinConfig'+ index + ';\nGPIO_pinConfig.MODE = MODE_OUTPUT_PP; \nGPIO_pinConfig.Output_Speed =SPEED_10M;' ;    
  Blockly.Arduino.addDeclaration('io_' + pin , pinDeclarationCode);  
  
  var pinSetupCode = 'GPIO_init(GPIO'+gpio +  ', &GPIO_pinConfig'+ index + ');';
  Blockly.Arduino.addMain('io_' + pin, pinSetupCode, false);

  var code = 'GPIO_WritePin(GPIO'+gpio + ' ,PIN_'+ pinnumber +', ' +'PIN_'+ stateOutput + ');\n';
  return code;
};

/**
 * Function for toggling state of an digital pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_togglePin'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var gpio = pin.charAt(1); 
  var pinnumber = pin.slice(2); 

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'toggle pin');

  var pinDeclarationCode ='GPIO_PinConfig_t GPIO_pinConfig'+ index + ';\nGPIO_pinConfig.MODE = MODE_OUTPUT_PP; \nGPIO_pinConfig.Output_Speed =SPEED_10M;' ;    
  Blockly.Arduino.addDeclaration('io_' + pin , pinDeclarationCode);  
  
  var pinSetupCode = 'GPIO_init(GPIO'+gpio +  ', &GPIO_pinConfig'+ index + ');';
  Blockly.Arduino.addMain('io_' + pin, pinSetupCode, false);

  var code = 'GPIO_TogglePin(GPIO'+gpio + ' ,PIN_'+ pinnumber +');\n';
  return code;
};



/**
 * Value for defining a digital pin state.
 * Arduino code: loop { HIGH / LOW }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_highlow'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

