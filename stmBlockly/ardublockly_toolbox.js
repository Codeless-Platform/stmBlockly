/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.TOOLBOX_XML =
  '<xml>' +
  '  <sep></sep>' +
  '  <category id="catLogic" name="Logic">' +
  '    <block type="controls_if"></block>' +
  '    <block type="logic_compare"></block>' +
  '    <block type="logic_operation"></block>' +
  '    <block type="logic_negate"></block>' +
  '    <block type="logic_boolean"></block>' +
  '    <block type="logic_null"></block>' +
  ' </category>' +
  '  <sep></sep>' +
  '  <category id="catLoops" name="Loops">' +
  '    <block type="controls_repeat_ext">' +
  '      <value name="TIMES">' +
  '        <block type="math_number">' +
  '          <field name="NUM">10</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="controls_whileUntil"></block>' +
  '    <block type="controls_for">' +
  '      <value name="FROM">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '      <value name="TO">' +
  '        <block type="math_number">' +
  '          <field name="NUM">10</field>' +
  '        </block>' +
  '      </value>' +
  '      <value name="BY">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="controls_flow_statements"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <sep></sep>' +
  '  <category id="catMath" name="Math">' +
  '    <block type="math_number"></block>' +
  '    <block type="math_arithmetic"></block>' +
  '    <block type="math_single"></block>' +
  '    <block type="math_trig"></block>' +
  '    <block type="math_constant"></block>' +
  '    <block type="math_number_property"></block>' +
  '    <block type="math_change">' +
  '      <value name="DELTA">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="math_round"></block>' +
  '    <block type="math_modulo"></block>' +
  '    <block type="math_constrain">' +
  '      <value name="LOW">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '      <value name="HIGH">' +
  '        <block type="math_number">' +
  '          <field name="NUM">100</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '  </category>' +
  '  <sep></sep>' +
  // '  <category id="catText" name="Text">' + //commenting this section temporarly to be edited and uncommented
  // // '    <!--block type="text_trim"></block Need to update block -->' +
  // // '    <!--block type="text_print"></block Part of the serial comms -->' +
  // "  </category>" +
  '  <sep></sep>' +
  '  <category id="catVariables" name="Variables">' +
  '    <block type="variables_get"></block>' +
  '    <block type="variables_set"></block>' +
  '    <block type="variables_set">' +
  '      <value name="VALUE">' +
  '        <block type="variables_set_type"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="text"></block>' +
  '    <block type="array_declare"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
  '  <sep></sep>' +
  '  <category id="catInputOutput" name="Input/Output">' +
  '    <block type="io_writePin">' +
  '      <value name="STATE">' +
  '        <block type="io_highlow"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="variables_set">' +
  '      <field name="VAR">pinVal</field>' +
  '      <value name="VALUE">' +
  '        <block type="io_readPin"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="io_builtin_led">' +
  '      <value name="STATE">' +
  '        <block type="io_highlow"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="io_togglePin"></block>' +
  '    <block type="io_writePort">' +
  '      <value name="STATE">' +
  '        <block type="io_highlow"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="variables_set">' +
  '      <field name="VAR">portVal</field>' +
  '      <value name="VALUE">' +
  '        <block type="io_readPort"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="variables_set">' +
  '      <field name="VAR">analogPinVal</field>' +
  '      <value name="VALUE">' +
  '        <block type="io_readAnalogPin"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="io_highlow"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catTime" name="Time/Clock">' +
  '    <block type="time_delay">' +
  '      <value name="DELAY_TIME_MILI">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1000</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="time_clockEN"></block>' +
  '    <block type="time_clockDisable"></block>' +
  '    <block type="infinite_loop"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catInterfaces" name="Interfaces">' +
  '    <block type="lcd_init"></block>' +
  '    <block type="lcd_sendChar">' +
  '      <value name="DATA">' +
  '        <block type="text_char">' +
  '          <field name="TEXT">A</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="lcd_sendString">' +
  '      <value name="DATA">' +
  '        <block type="text">' +
  '          <field name="TEXT">Hello World!</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="lcd_sendNumber">' +
  '      <value name="DATA">' +
  '        <block type="math_number">' +
  '          <field name="NUM">5</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="lcd_clear"></block>' +
  '    <block type="lcd_goto">' +
  '      <value name="ROW">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '      <value name="COL">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="keypad_init"></block>' +
  '    <block type="variables_set">' +
  '      <field name="VAR">key</field>' +
  '      <value name="VALUE">' +
  '        <block type="keypad_getKey"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="oled_init"></block>' +
  '    <block type="oled_sendString"></block>' +
  '    <block type="oled_clear"></block>' +
  '    <block type="oled_goto"></block>' +
  '    <block type="oled_Scroll"></block>' +
  '    <block type="oled_StopScroll"></block>' +
  '    <block type="oled_UpdateScreen"></block>' +
  '    <block type="oled_Draw"></block>' +
  '    <block type="oled_drawBitmap"></block>' +
  '    <block type="matrix_init"></block>' +
  '    <block type="matrix_sendString"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catSensors" name="Sensors">' +
  '    <block type="variables_set">' +
  '      <field name="VAR">temp</field>' +
  '      <value name="VALUE">' +
  '        <block type="sensors_LM35"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="variables_set">' +
  '      <field name="VAR">pirVal</field>' +
  '      <value name="VALUE">' +
  '        <block type="sensors_PIR"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="variables_set">' +
  '      <field name="VAR">distance</field>' +
  '      <value name="VALUE">' +
  '        <block type="sensors_ultrasonic"></block>' +
  '      </value>' +
  '    </block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catComms" name="Comms">' +
  '    <block type="uart_init"></block>' +
  '    <block type="uart_write"></block>' +
  '    <block type="uart_recieve"></block>' +
  '    <block type="spi_init"></block>' +
  '    <block type="spi_RXTX"></block>' +
  // '    <block type="spi_transfer_return"></block>' +
  '  </category>';
