/**
 * @fileoverview Code generator for Keypad in HAL layer
 *
 */
"use strict";

goog.provide("Blockly.Arduino.keypad");

goog.require("Blockly.Arduino");

Blockly.Arduino["keypad_init"] = function (block) {
  var port = block.getFieldValue("PORT");
  var gpio = port.charAt(4);

  var R0 = "PIN_" + block.getFieldValue("R0").charAt(2);
  var R1 = "PIN_" + block.getFieldValue("R1").charAt(2);
  var R2 = "PIN_" + block.getFieldValue("R2").charAt(2);
  var R3 = "PIN_" + block.getFieldValue("R3").charAt(2);
  var C0 = "PIN_" + block.getFieldValue("C0").charAt(2);
  var C1 = "PIN_" + block.getFieldValue("C1").charAt(2);
  var C2 = "PIN_" + block.getFieldValue("C2").charAt(2);

  for (var i = 0; i < 4; i++) {
    var pin = block.getFieldValue("R" + i);
    Blockly.Arduino.reservePin(
      block,
      pin,
      Blockly.Arduino.PinTypes.INPUT,
      "keypad pins"
    );
  }
  for (var i = 0; i < 3; i++) {
    var pin = block.getFieldValue("C" + i);
    Blockly.Arduino.reservePin(
      block,
      pin,
      Blockly.Arduino.PinTypes.INPUT,
      "keypad pins"
    );
  }

  var pinMainCode =
    "\nkeypad_t keypad = {" +
    R0 +
    "," +
    R1 +
    "," +
    R2 +
    "," +
    R3 +
    "," +
    C0 +
    "," +
    C1 +
    "," +
    C2 +
    "," +
    port +
    "};\nKeypad_init(&keypad);\n ";
  Blockly.Arduino.addMain("keypad_" + port, pinMainCode, false);

  return "";
};

Blockly.Arduino["keypad_getKey"] = function (block) {
  var pinMainCode = "Keypad_Get_Key()";

  return [pinMainCode, Blockly.Arduino.ORDER_ATOMIC];
};
