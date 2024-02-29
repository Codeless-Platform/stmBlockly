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
