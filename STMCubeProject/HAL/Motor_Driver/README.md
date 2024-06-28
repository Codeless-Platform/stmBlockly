# Motor Driver

This library allows a bluepill board to control DC motors using an H-bridge motor driver.

## Functionality

The MotorDriver library provides functions to initialize and control the direction and speed of DC motors using the GPIO and TIM peripherals of the microcontroller.

## Usage

To use this module, include the Keypad.h header file in your project. Call the Keypad_init function to initialize the keypad, and call the Keypad_Get_Key function to get the pressed key.

## Functions
- `Motor_init()`:Initializes the motor by configuring the GPIO and TIM peripherals.
- `Motor_Clockwise()`: Rotates the motor clockwise at the specified speed.
- `Motor_AntiClockwise()`: Rotates the motor anti clockwise at the specified speed.
- `Motor_Stop()`: Stops the motor.


