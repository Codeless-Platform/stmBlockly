/*
 * Led_Matrix.h
 *
 *  Created on: Mar 16, 2024
 *      Author: Alaa
 */

#ifndef LED_MATRIX_LED_MATRIX_H_
#define LED_MATRIX_LED_MATRIX_H_

#include "../../MCAL/Lib/STM32_F103x6.h"
#include "../../MCAL/SPI/SPI.h"
#include "../../MCAL/GPIO/GPIO.h"
#include "../../MCAL/SYSTICK/SYSTICK.h"

extern const uint8 display[43][8];
typedef struct {
	SPI_Registers_t *SPIx;
	uint16 CS_PIN;
	GPIO_Registers_t *CS_GPIO;
	uint16 CLK;
	uint16 MOSI;
	GPIO_Registers_t* GPIOx;
} led_matrix_t;
void Led_Matrix_init(led_matrix_t *marix_pinConfig);
void Led_Matrix_writeByte(uint8 byte,led_matrix_t *marix_pinConfig);
void Led_Matrix_write(uint8 address, uint8 data,led_matrix_t *marix_pinConfig);
void Led_Matrix_writeString(char *str,led_matrix_t *marix_pinConfig);

#endif /* LED_MATRIX_LED_MATRIX_H_ */
