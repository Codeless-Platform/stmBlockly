
# LiquidCrystal Display

A library for I2C LCD displays.
The library allows to control I2C displays with functions extremely similar to LiquidCrystal library. 

## Compatibility

This library is compatible with all architectures so you should be able to use it on all the bluepill boards.


## Usage

To use this library:

#include "../../HAL/LCD_I2C/LCD_I2C.h"

## Functions

- `lcd_I2C_init()`
- `lcd_I2C_Clear_Screen()`
- `lcd_I2C_GOTO_XY()`
- `lcd_I2C_display_number()`
- `lcd_I2C_display_Real_number()`
- `lcd_I2C_Send_Char()`
- `lcd_I2C_send_String()`
