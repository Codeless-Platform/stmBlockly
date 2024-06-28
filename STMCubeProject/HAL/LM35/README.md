# LM35

This library allows an STM32 (or Blue Pill) microcontroller to interface with the LM35 temperature sensor, providing functions to initialize the sensor and read temperature data.

## Functionality

The keypad is a matrix of 4 rows and 4 columns, and is connected to a microcontroller. The Keypad_init function initializes the rows and columns of the keypad, configures them as output or input, and sets their initial state. The Keypad_Get_Key function scans the keypad by sequentially writing GND to each column and reading the corresponding row. It returns the ASCII code of the pressed key.

## Usage

To use this module, include the LM35.h header file in your project. Call the LM35_init function to initialize the LM35 sensor, and call the LM35_Read function to get the tempreature in celsius.

## Functions
- `LM35_init()`: Initializes the LM35 sensor by initializing the ADC module.
- `LM35_Read()`: Reads temperature data from the LM35 sensor.

