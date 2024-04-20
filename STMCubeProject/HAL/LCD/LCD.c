/*
 * LCD.c
 *
 *  Created on: 14 Jan 2023
 *      Author: Alaa Wahba
 */

#include "LCD.h"
GPIO_PinConfig_t G_GPIO_pinConfig;
LCD_t *G_LCD_pinConfig;
static int count = 0;
uint8 MAX_COLS = 16, MAX_ROWS = 2;
void lcd_init(LCD_t *LCD_Config)
{

	/*
	 * 1.delay
	 * 2. Configure port DATA as OUTPUT
	 * 3. Configure port CONTROL as OUTPUT
	 * 4. Reset all control pins.
	 * 5. delay
	 * 6. Clear Screen
	 * 7. Send command 8BIT or 4BIT
	 * 8. Go to Entry Mode
	 */
	G_LCD_pinConfig = LCD_Config;
	if (G_LCD_pinConfig->LCD_Size == LCD_2x16)
	{
		MAX_COLS = 16;
		MAX_ROWS = 2;
	}
	else if (G_LCD_pinConfig->LCD_Size == LCD_4x16)
	{
		MAX_COLS = 16;
		MAX_ROWS = 4;
	}
	else if (G_LCD_pinConfig->LCD_Size == LCD_4x20)
	{
		MAX_COLS = 20;
		MAX_ROWS = 4;
	}
	// you must wait for the hardware to initialize
	STK_init();

	STK_delayMs(20);
	// set port as ouput to write commands

	for (int i = 0; i < 4; i++)
	{
		G_GPIO_pinConfig.Pin_Number = G_LCD_pinConfig->PINS[i];
		G_GPIO_pinConfig.MODE = MODE_OUTPUT_PP;
		G_GPIO_pinConfig.Output_Speed = SPEED_10M;
		GPIO_init(G_LCD_pinConfig->LCD_PORT, &G_GPIO_pinConfig);
	}

	// set three control pins as output and write 0
	G_GPIO_pinConfig.MODE = MODE_OUTPUT_PP;
	G_GPIO_pinConfig.Pin_Number = G_LCD_pinConfig->ENABLE_SWITCH;
	G_GPIO_pinConfig.Output_Speed = SPEED_10M;
	GPIO_init(G_LCD_pinConfig->LCD_CONTROL_PORT, &G_GPIO_pinConfig);
	GPIO_WritePin(G_LCD_pinConfig->LCD_CONTROL_PORT,
				  G_LCD_pinConfig->ENABLE_SWITCH,
				  PIN_LOW);

	G_GPIO_pinConfig.MODE = MODE_OUTPUT_PP;
	G_GPIO_pinConfig.Pin_Number = G_LCD_pinConfig->REGISTER_SELECT;
	G_GPIO_pinConfig.Output_Speed = SPEED_10M;
	GPIO_init(G_LCD_pinConfig->LCD_CONTROL_PORT, &G_GPIO_pinConfig);
	GPIO_WritePin(G_LCD_pinConfig->LCD_CONTROL_PORT,
				  G_LCD_pinConfig->REGISTER_SELECT,
				  PIN_LOW);

	STK_delayMs(15);
	lcd_Clear_Screen();
	/* Define the lcd Mode by its instruction*/

	// Command that initializes LCD as four bit mode
	lcd_Send_Command(0x02);
	lcd_Send_Command(FUNCTION_4BIT_2LINES);

	lcd_Send_Command(ENTRY_MODE);
	lcd_Send_Command(CURSOR_FIRST_LINE);
	lcd_Send_Command(DISPLAY_ON_CURSOR_BLINK);
}
void lcd_Send_Command(unsigned char command)
{
	/*
	 * 1.Write command to port
	 * 2.Reset control pins
	 * 3.Deactivate and Activate Enable
	 */

	GPIO_WritePin(G_LCD_pinConfig->LCD_CONTROL_PORT,
				  G_LCD_pinConfig->REGISTER_SELECT,
				  PIN_LOW);

	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[0],
				  GET(command, 4));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[1],
				  GET(command, 5));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[2],
				  GET(command, 6));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[3],
				  GET(command, 7));

	STK_delayMs(1);
	lcd_kick();

	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[0],
				  GET(command, 0));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[1],
				  GET(command, 1));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[2],
				  GET(command, 2));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[3],
				  GET(command, 3));

	STK_delayMs(1);
	lcd_kick();
}
void lcd_Send_Char(unsigned char character)
{

	GPIO_WritePin(G_LCD_pinConfig->LCD_CONTROL_PORT,
				  G_LCD_pinConfig->REGISTER_SELECT,
				  PIN_HIGH);

	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[0],
				  GET(character, 4));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[1],
				  GET(character, 5));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[2],
				  GET(character, 6));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[3],
				  GET(character, 7));
	STK_delayMs(1);
	lcd_kick();
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[0],
				  GET(character, 0));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[1],
				  GET(character, 1));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[2],
				  GET(character, 2));
	GPIO_WritePin(G_LCD_pinConfig->LCD_PORT, G_LCD_pinConfig->PINS[3],
				  GET(character, 3));
	STK_delayMs(1);
	lcd_kick();

	if (count == MAX_COLS)
	{
		lcd_GOTO_XY(1, 0);
	} // if both lines are full clear and start over.
	else if (count == (MAX_COLS * MAX_ROWS))
	{
		lcd_Clear_Screen();
		lcd_GOTO_XY(0, 0);
		count = 0;
	}
	if ((G_LCD_pinConfig->LCD_Size == LCD_4x20) || (G_LCD_pinConfig->LCD_Size == LCD_4x16))
	{
		if (count == MAX_COLS * 2)
		{
			lcd_GOTO_XY(2, 0);
		}
		else if (count == MAX_COLS * 3)
		{
			lcd_GOTO_XY(3, 0);
		}
	}
	count++;
}
void lcd_send_String(char *string)
{
	// keeps track of chars count
	int count = 0;
	while (*string > 0)
	{
		count++;
		lcd_Send_Char(*string++);
		// if first line is full go to second
		if (count == MAX_COLS)
		{
			lcd_GOTO_XY(1, 0);
		} // if both lines are full clear and start over.
		else if (count == (MAX_COLS * MAX_ROWS))
		{
			lcd_Clear_Screen();
			lcd_GOTO_XY(0, 0);
			count = 0;
		}
		if ((G_LCD_pinConfig->LCD_Size == LCD_4x20) || (G_LCD_pinConfig->LCD_Size == LCD_4x16))
		{
			if (count == MAX_COLS * 2)
			{
				lcd_GOTO_XY(2, 0);
			}
			else if (count == MAX_COLS * 3)
			{
				lcd_GOTO_XY(3, 0);
			}
		}
	}
}
void lcd_GOTO_XY(unsigned char row, unsigned char col)
{

	if (row == 0)
	{
		if ((col < MAX_COLS) && (col >= 0))
			lcd_Send_Command(CURSOR_FIRST_LINE + col);
	}
	else if (row == 1)
	{
		if ((col < MAX_COLS) && (col >= 0))
			lcd_Send_Command(CURSOR_SECOND_LINE + col);
	}
	if (G_LCD_pinConfig->LCD_Size == LCD_4x20)
	{
		if (row == 2)
		{
			if ((col < MAX_COLS) && (col >= 0))
				lcd_Send_Command(CURSOR_THIRD_LINE_20 + col);
		}
		else if (row == 3)
		{
			if ((col < MAX_COLS) && (col >= 0))
				lcd_Send_Command(CURSOR_FOURTH_LINE_20 + col);
		}
	}
	else if (G_LCD_pinConfig->LCD_Size == LCD_4x16)
	{
		if (row == 2)
		{
			if ((col < MAX_COLS) && (col >= 0))
				lcd_Send_Command(CURSOR_THIRD_LINE_16 + col);
		}
		else if (row == 3)
		{
			if ((col < MAX_COLS) && (col >= 0))
				lcd_Send_Command(CURSOR_FOURTH_LINE_16 + col);
		}
	}
}
void lcd_Clear_Screen()
{
	lcd_Send_Command(CLEAR_SCREEN);
	count = 0;
}
void lcd_display_number(int Number)
{
	char str[7];
	// Converts Int to String
	sprintf(str, "%d", Number);
	lcd_send_String(str);
}
void lcd_display_Real_number(double Number)
{
	char str[16];
	char *tmpSign = (Number > 0) ? "" : "-";
	float tmpNum = (Number > 0) ? Number : -Number;

	int tmpVal = tmpNum;
	float tmpFrac = tmpNum - tmpVal;

	int Frac = tmpFrac * 10000;

	sprintf(str, "%s%d.%04d", tmpSign, tmpVal, Frac);
	lcd_send_String(str);
}
void lcd_kick()
{
	// Enable =0 >> LCD Busy
	GPIO_WritePin(G_LCD_pinConfig->LCD_CONTROL_PORT,
				  G_LCD_pinConfig->ENABLE_SWITCH,
				  PIN_HIGH);
	STK_delayMs(50);
	GPIO_WritePin(G_LCD_pinConfig->LCD_CONTROL_PORT,
				  G_LCD_pinConfig->ENABLE_SWITCH, PIN_LOW);
}

void LCD_createCustomCharacter(uint8 *pattern, uint8 location)
{
	uint8 i = 0;

	lcd_Send_Command(0x40 + (location * 8)); /* Send the Address of CGRAM */

	for (i = 0; i < 8; i++)
	{
		lcd_Send_Char(pattern[i]); /* Pass the Bytes of pattern on LCD */
	}
}
