/*
 * Keypad.h
 *
 *  Created on: 17 Jan 2023
 *      Author: Alaa Wahba
 */

#ifndef KEYPAD_DRIVER_KEYPAD_H_
#define KEYPAD_DRIVER_KEYPAD_H_

#include "../../MCAL/GPIO/GPIO.h"

//Define the PORT  connected to keypad
typedef struct{
	uint16 R0;
	uint16 R1;
	uint16 R2;
	uint16 R3;
	uint16 C0;
	uint16 C1;
	uint16 C2;
	uint16 C3;
	uint16 MAX_COLS;
	GPIO_Registers_t *Keypad_PORT;

}keypad_t;


void Keypad_init(keypad_t *keypad);
char Keypad_Get_Key();

//define keypad keys

static const char arr_keys[4][4] =
{ { '1', '2', '3' ,'A'},
  { '4', '5','6' ,'B' },
  { '7', '8', '9' ,'C'},
  { '*', '0', '#' ,'D'},

};

#endif /* KEYPAD_DRIVER_KEYPAD_H_ */
