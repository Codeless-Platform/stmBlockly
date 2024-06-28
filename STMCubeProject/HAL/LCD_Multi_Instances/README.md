
# LiquidCrystal Display

Allows communication with alphanumerical liquid crystal displays (LCDs).

This library allows a bluepill board to control LiquidCrystal displays (LCDs) based on the Hitachi HD44780 (or a compatible) chipset, which is found on most text-based LCDs. 
The library works with in either 4 or 8 bit mode (i.e. using 4 or 8 data lines in addition to the rs, enable, and, optionally, the rw control lines).


## Compatibility

This library is compatible with all architectures so you should be able to use it on all the bluepill boards.


## Usage

To use this library:

#include "../../HAL/LCD_Multi_Instances/LCD.h"

## Functions

- `lcd_init()`
- `lcd_Clear_Screen()`
- `lcd_GOTO_XY()`
- `lcd_display_number()`
- `lcd_display_Real_number()`
- `lcd_Send_Char()`
- `lcd_send_String()`

