
/**
 * @fileoverview Code generator for Keypad in HAL layer
 *    
 */
'use strict';

goog.provide('Blockly.Arduino.lcd');

goog.require('Blockly.Arduino');


Blockly.Arduino['lcd_init'] = function(block) {
    var port = block.getFieldValue('PORT');
    var gpio = port.charAt(4); 

    console.log(port); 
   for(var i =4 ;i<8 ; i++){
      var pin = gpio + i;
      Blockly.Arduino.reservePin(
         block, pin, Blockly.Arduino.PinTypes.INPUT, 'keypad pins');
      }
      pin = 'P'+gpio +'2';
      Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.INPUT, 'keypad pins');
      
        pin = 'P'+gpio +'3';
        Blockly.Arduino.reservePin(
          block, pin, Blockly.Arduino.PinTypes.INPUT, 'keypad pins');
          
      editFileAtLine("STMCubeProject/HAL/LCD/LCD.h", 12, "#define LCD_PORT     "+port);

  var pinMainCode = 'lcd_init();\n';
  Blockly.Arduino.addMain('lcd_' + port, pinMainCode, false);

  return "";

};
 //send char 

 Blockly.Arduino['lcd_sendChar'] = function(block) {
  var data = Blockly.Arduino.valueToCode(
    block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';  
   var code = 'lcd_Send_Char('+ data +');\n';
  return code;
 };
// send string 


Blockly.Arduino['lcd_sendString'] = function(block) {
  var data = Blockly.Arduino.valueToCode(
    block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';  
   var code = 'lcd_send_String('+ data +');\n';
  return code;
 };


// clear screen 

 Blockly.Arduino['lcd_clear'] = function(block) {
    return 'lcd_Clear_Screen();\n';
};

// go to x , y 
Blockly.Arduino['lcd_goto'] = function(block) {
  var x = Blockly.Arduino.valueToCode(
    block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) || '0';  
  var y= Blockly.Arduino.valueToCode(
      block, 'COL', Blockly.Arduino.ORDER_ATOMIC) || '0';  
  
 var code = 'lcd_GOTO_XY('+ x + ','+y +');\n';
 return code;

};