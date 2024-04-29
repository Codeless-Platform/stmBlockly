/*
 * LCD.c
 *
 *  Created on: 14 Jan 2023
 *      Author: Alaa Wahba
 */

#include "LCD_I2C.h"

void lcd_I2C_init(LCD_I2C_t *Lcd_pinConfig) {

	I2C_pinConfig_t I2C_pinConfig;
	I2C_pinConfig.Clock_Speed = I2C_CLK_SM_100K;
	I2C_pinConfig.I2C_Mode = I2C_Mode_I2C;
	I2C_pinConfig.Stretch_Mode = I2C_Stretch_EN;
	I2C_pinConfig.ACK_Enable = I2C_ACK_EN;
	I2C_pinConfig.P_Slave_CallBack_Fun = NULL;
	I2C_pinConfig.slave_address.slave_address_mode = I2C_Slave_7Bit;
	I2C_pinConfig.slave_address.slave_primary_address = 0;
	I2C_pinConfig.slave_address.Enable_Dual_Mode = 0;

	I2C_GPIO_SetPins(Lcd_pinConfig->I2Cx);
	I2C_init(&I2C_pinConfig, Lcd_pinConfig->I2Cx);
	STK_init();
	// you must wait for the hardware to initialize
	STK_delayMs(50);
	lcd_I2C_Send_Command(Lcd_pinConfig, FUNCTION_4BIT_2LINES);
	lcd_I2C_Send_Command(Lcd_pinConfig, ENTRY_MODE);
	lcd_I2C_Send_Command(Lcd_pinConfig, CURSOR_FIRST_LINE);
	lcd_I2C_Send_Command(Lcd_pinConfig, DISPLAY_ON_CURSOR_BLINK);
	lcd_I2C_Clear_Screen(Lcd_pinConfig);
}

void lcd_I2C_Send_Command(LCD_I2C_t *Lcd_pinConfig, char cmd) {
	/*
	 * 1.Write command to port
	 * 2.Reset control pins
	 * 3.Deactivate and Activate Enable
	 */
	char data_u, data_l;
	uint8 data_t[4];
	data_u = (cmd & 0xf0);
	data_l = ((cmd << 4) & 0xf0);
	data_t[0] = data_u | 0x0C; // en=1, rs=0
	data_t[1] = data_u | 0x08; // en=0, rs=0
	data_t[2] = data_l | 0x0C; // en=1, rs=0
	data_t[3] = data_l | 0x08; // en=0, rs=0
	I2C_Master_TX(Lcd_pinConfig->I2Cx, Lcd_pinConfig->address, (uint8*) data_t,
			4, STOP, NO_REPEATED_START);
	STK_delayMs(10);
}

void lcd_I2C_Send_Char(LCD_I2C_t *Lcd_pinConfig, char data) {
	Lcd_pinConfig->count++;
	char data_u, data_l;
	uint8 data_t[4];
	data_u = (data & 0xf0);
	data_l = ((data << 4) & 0xf0);
	data_t[0] = data_u | 0x0D; // en=1, rs=1
	data_t[1] = data_u | 0x09; // en=0, rs=1
	data_t[2] = data_l | 0x0D; // en=1, rs=1
	data_t[3] = data_l | 0x09; // en=0, rs=1
	I2C_Master_TX(Lcd_pinConfig->I2Cx, Lcd_pinConfig->address, (uint8*) data_t,
			4, STOP, NO_REPEATED_START);

	if (Lcd_pinConfig->count == Lcd_pinConfig->cols) {
		lcd_I2C_GOTO_XY(Lcd_pinConfig, 1, 0);
	}	// if both lines are full clear and start over.
	else if (Lcd_pinConfig->count
			== (Lcd_pinConfig->cols * Lcd_pinConfig->rows)) {
		lcd_I2C_Clear_Screen(Lcd_pinConfig);
		lcd_I2C_GOTO_XY(Lcd_pinConfig, 0, 0);
		Lcd_pinConfig->count = 0;
	} else if ((Lcd_pinConfig->LCD_Size == LCD_4x20)
			|| (Lcd_pinConfig->LCD_Size == LCD_4x16)) {
		if (Lcd_pinConfig->count == (Lcd_pinConfig->cols * 2)) {
			lcd_I2C_GOTO_XY(Lcd_pinConfig, 2, 0);
		} else if (Lcd_pinConfig->count == (Lcd_pinConfig->cols * 3)) {
			lcd_I2C_GOTO_XY(Lcd_pinConfig, 3, 0);
		}
	}
}

void lcd_I2C_Clear_Screen(LCD_I2C_t *Lcd_pinConfig) {
	lcd_I2C_Send_Command(Lcd_pinConfig, CLEAR_SCREEN);
	Lcd_pinConfig->count = 0;
}

void lcd_I2C_GOTO_XY(LCD_I2C_t *Lcd_pinConfig, unsigned char row,
		unsigned char col) {
	if (row == 0) {
		if ((col < Lcd_pinConfig->cols) && (col >= 0))
			lcd_I2C_Send_Command(Lcd_pinConfig, CURSOR_FIRST_LINE + col);
	} else if (row == 1) {
		if ((col < Lcd_pinConfig->cols) && (col >= 0))
			lcd_I2C_Send_Command(Lcd_pinConfig, CURSOR_SECOND_LINE + col);
	}
	if (Lcd_pinConfig->LCD_Size == LCD_4x20) {
		if (row == 2) {
			if ((col < Lcd_pinConfig->cols) && (col >= 0))
				lcd_I2C_Send_Command(Lcd_pinConfig, CURSOR_THIRD_LINE_20 + col);
		} else if (row == 3) {
			if ((col < Lcd_pinConfig->cols) && (col >= 0))
				lcd_I2C_Send_Command(Lcd_pinConfig,
						CURSOR_FOURTH_LINE_20 + col);
		}
	} else if (Lcd_pinConfig->LCD_Size == LCD_4x16) {
		if (row == 2) {
			if ((col < Lcd_pinConfig->cols) && (col >= 0))
				lcd_I2C_Send_Command(Lcd_pinConfig, CURSOR_THIRD_LINE_16 + col);
		} else if (row == 3) {
			if ((col < Lcd_pinConfig->cols) && (col >= 0))
				lcd_I2C_Send_Command(Lcd_pinConfig,
						CURSOR_FOURTH_LINE_16 + col);

		}

	}
}
void lcd_I2C_display_number(LCD_I2C_t *Lcd_pinConfig, int Number) {
	char str[7];
	// Converts Int to String
	sprintf(str, "%d", Number);
	lcd_I2C_send_String(Lcd_pinConfig, str);
}

void lcd_I2C_display_Real_number(LCD_I2C_t *Lcd_pinConfig, double Number) {
	char str[16];
	char *tmpSign = (Number > 0) ? "" : "-";
	float tmpNum = (Number > 0) ? Number : -Number;

	int tmpVal = tmpNum;
	float tmpFrac = tmpNum - tmpVal;

	int Frac = tmpFrac * 100;

	sprintf(str, "%s%d.%02d", tmpSign, tmpVal, Frac);
	lcd_I2C_send_String(Lcd_pinConfig, str);
}

void lcd_I2C_send_String(LCD_I2C_t *Lcd_pinConfig, char *string) {
	while (*string > 0) {
		lcd_I2C_Send_Char(Lcd_pinConfig, *string++);
	}
}
