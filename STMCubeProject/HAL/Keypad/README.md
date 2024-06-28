# Keypad

Keypad is a library for using matrix style keypads with the Arduino.
This library is based upon the Keypad Tutorial. It was created to promote Hardware Abstraction. It improves readability of the code by hiding the GPIO_ReadPin and GPIO_WritePin calls for the user.

## Functionality

The keypad is a matrix of 4 rows and 4 columns, and is connected to a microcontroller. The Keypad_init function initializes the rows and columns of the keypad, configures them as output or input, and sets their initial state. The Keypad_Get_Key function scans the keypad by sequentially writing GND to each column and reading the corresponding row. It returns the ASCII code of the pressed key.

## Usage

To use this module, include the Keypad.h header file in your project. Call the Keypad_init function to initialize the keypad, and call the Keypad_Get_Key function to get the pressed key.

## Functions
- `Keypad_init()`: initializes the GPIO pins for scanning the keypad matrix by setting the columns as output pins and the rows as input pins with pull-up resistors.
- `Keypad_getKey()`: scans the keypad matrix and returns the character corresponding to the button that was pressed.

