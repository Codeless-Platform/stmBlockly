"use strict";

goog.provide("Blockly.Arduino.sensors");

goog.require("Blockly.Arduino");

Blockly.Arduino["sensors_LM35"] = function (block) {
  var pin = block.getFieldValue("PIN");
  var ADC = block.getFieldValue("ADC");

  var gpio = pin.charAt(1);
  var adcChannel = "ADC_CH" + pin.slice(2);
  if (gpio == "B") {
    adcChannel = pin.slice(2) == 0 ? "ADC_CH8" : "ADC_CH9";
  }

  Blockly.Arduino.reservePin(
    block,
    pin,
    Blockly.Arduino.PinTypes.INPUT,
    "Analog Read"
  );

  var pinCode = "LM35_init(" + ADC + ");\n";

  Blockly.Arduino.addMain("io_", pinCode, false);

  var code = "LM35_Read(" + ADC + "," + adcChannel + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino["sensors_PIR"] = function (block) {
  var pin = block.getFieldValue("PIN");
  var gpio = pin.charAt(1);
  var pinnumber = pin.slice(2);

  Blockly.Arduino.reservePin(
    block,
    pin,
    Blockly.Arduino.PinTypes.INPUT,
    "PIR Pin"
  );

  var pinIncludeCode = "GPIO_PinConfig_t GPIO_pinConfig;\n";
  Blockly.Arduino.addInclude("io", pinIncludeCode);

  var pinCode =
    "GPIO_pinConfig.MODE = MODE_INPUT_FLO;\nGPIO_pinConfig.Pin_Number = PIN_" +
    pinnumber +
    ";";

  var pinMainCode = pinCode + "\nGPIO_init(GPIO" + gpio + ", &GPIO_pinConfig);";
  Blockly.Arduino.addMain("io_" + pin, pinMainCode, false);

  var code = "GPIO_ReadPin(GPIO" + gpio + " ,PIN_" + pinnumber + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
