/*
 * main.h
 *
 *  Created on: Jan 26, 2023
 *      Author: Alaa Wahba
 */

#ifndef INC_MAIN_H_
#define INC_MAIN_H_

#include "../MCAL/EXTI/EXTI.h"
#include "../MCAL/GPIO/GPIO.h"
#include "../MCAL/I2C/I2C.h"
#include "../MCAL/SPI/SPI.h"
#include "../MCAL/USART/USART.h"
#include "../MCAL/Lib/STM32_F103x6.h"
#include "../MCAL/RCC/RCC.h"
#include "../HAL/Keypad/Keypad.h"
#include "../HAL/LCD/LCD.h"
#include "math.h"

void delay_ms(uint32 time);

#endif /* INC_MAIN_H_ */
