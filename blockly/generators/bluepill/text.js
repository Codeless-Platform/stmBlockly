/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the text blocks.
 *     Partially implements the Arduino Serial interface as described in:
 *     http://arduino.cc/en/Reference/Serial
 *
 * TODO: Too many calls to String constructor, which consumes a lot of uC
 *     resources. This will need revisiting for better type recognition.
 *
 * TODO: Trim generator is not correct.
 */
"use strict";

goog.provide("Blockly.Arduino.text");

goog.require("Blockly.Arduino");

//declare array in c language

Blockly.Arduino["array_declare"] = function (block) {
  // var varType = Blockly.Arduino.getArduinoType_(
  //   Blockly.Types[block.getFieldValue('ARRAY_TYPE')]
  // );
  var dropdown_array_type = block.getFieldValue("ARRAY_TYPE");
  var text_array_name = block.getFieldValue("ARRAY_NAME");
  var number_array_size = block.getFieldValue("ARRAY_SIZE");

  var code = `${dropdown_array_type} ${text_array_name}[${number_array_size}];\n`;
  return code;
};

//seeting text in this array

Blockly.Arduino["array_set"] = function (block) {
  var text_array_name = block.getFieldValue("ARRAY_NAME");
  var number_array_index = block.getFieldValue("ARRAY_INDEX");
  var value_array_value = Blockly.Arduino.valueToCode(
    block,
    "ARRAY_VALUE",
    Blockly.Arduino.ORDER_ATOMIC
  );

  var code = `${text_array_name}[${number_array_index}] = ${value_array_value};\n`;
  return code;
};

/**
 * Code generator for a literal String (X).
 * Arduino code: loop { "X" }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino["text"] = function (block) {
  var code = Blockly.Arduino.quote_(block.getFieldValue("TEXT"));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino["text_char"] = function (block) {
  var code = "'" + block.getFieldValue("TEXT") + "'";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
