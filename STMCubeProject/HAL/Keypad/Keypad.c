/*
 * Keypad.c
 *
 *  Created on: 17 Jan 2023
 *      Author: Alaa Wahba
 */

#include "Keypad.h"


void Keypad_init(keypad_t *keypad) {
	/*
	 * The columns are output which are used to scan the buttons by writing GND
	 *		to each column sequentially.
	 * The rows are input so if the button is pressed it's connected to GND
	 *
	 */
	GPIO_PinConfig_t pinConfig;
	for (int i = 0; i < keypad->MAX_COLS; i++) {
		pinConfig.MODE = MODE_OUTPUT_PP;
		pinConfig.Output_Speed = SPEED_10M;
		pinConfig.Pin_Number = keypad->Keypad_Cols[i];
		GPIO_init(keypad->port, &pinConfig);
	}
	for (int i = 0; i < 4; i++) {
		pinConfig.MODE = MODE_INPUT_PD;
		pinConfig.Pin_Number = keypad->Keypad_Rows[i];
		GPIO_init(keypad->port, &pinConfig);
	}
	/*
	 * Initialize the PORT to 1 so the Cols are connected VCC
	 * while the ROWs are input_pullup
	 */
	for (int i = 0; i < 4; i++) {
		GPIO_WritePin(keypad->port, keypad->Keypad_Rows[i], PIN_LOW);
	}
	for (int i = 0; i < keypad->MAX_COLS; i++) {
		GPIO_WritePin(keypad->port, keypad->Keypad_Cols[i], PIN_LOW);
	}
}
char Keypad_Get_Key(keypad_t *keypad) {

	int i, j;
	char ret_key = 'N';
	for (i = 0; i < keypad->MAX_COLS; i++) {  // Cols loop
		GPIO_WritePin(keypad->port, keypad->Keypad_Cols[i], PIN_HIGH);
		for (j = 0; j < 4; j++) { // Rows loop
			if (GPIO_ReadPin(keypad->port, keypad->Keypad_Rows[j]) ) {
				while (GPIO_ReadPin(keypad->port, keypad->Keypad_Rows[j]) )
					; // single press
				ret_key = arr_keys[j][i];

			}

		}
		GPIO_WritePin(keypad->port, keypad->Keypad_Cols[i], PIN_LOW);

	}
	return ret_key;
}

