/*
 * OLED.h
 *
 *  Created on: Mar 19, 2024
 *      Author: Alaa
 */

#ifndef OLED_OLED_H_
#define OLED_OLED_H_

/**
 * This oled  uses I2C for communication
 *
 * Library features functions for drawing lines, rectangles and circles.
 *
 * It also allows you to draw texts and characters using appropriate functions provided in library.
 *
 * Default pinout
 *
 oled    |STM32F10x    |DESCRIPTION

 VCC        |3.3V         |
 GND        |GND          |
 SCL        |PB6          |Serial clock line
 SDA        |PB7          |Serial data line
 */

#include "../../MCAL/Lib/STM32_F103x6.h"
#include "../../MCAL/SYSTICK/SYSTICK.h"
#include "../../MCAL/I2C/I2C.h"

#include "fonts.h"

#include "stdlib.h"
#include "stdint.h"
#include "string.h"

/* oled settings */
#define MAX_OLED_NUMBER 		5

/**
 * @brief  oled color enumeration
 */
typedef enum {
	oled_COLOR_BLACK = 0x00, /*!< Black color, no pixel */
	oled_COLOR_WHITE = 0x01 /*!< Pixel is set. Color depends on oled */
} oled_COLOR_t;

typedef struct {
	I2C_Registers_t *I2Cx;
	uint16 address; // can be 0x78 or 0x7A
	uint8 width; // to be implemented
	uint8 height;
	uint16 CurrentX;
	uint16 CurrentY;
	uint8 Inverted;
	uint8 Initialized;
	uint8 Buffer[256*128/8];
} oled_Config;

#define oled_RIGHT_HORIZONTAL_SCROLL              0x26
#define oled_LEFT_HORIZONTAL_SCROLL               0x27
#define oled_VERTICAL_AND_RIGHT_HORIZONTAL_SCROLL 0x29
#define oled_VERTICAL_AND_LEFT_HORIZONTAL_SCROLL  0x2A
#define oled_DEACTIVATE_SCROLL                    0x2E // Stop scroll
#define oled_ACTIVATE_SCROLL                      0x2F // Start scroll
#define oled_SET_VERTICAL_SCROLL_AREA             0xA3 // Set scroll range

#define oled_NORMALDISPLAY       0xA6
#define oled_INVERTDISPLAY       0xA7

/**
 * @brief  Initializes oled oled
 * @param  None
 * @retval Initialization status:
 *           - 0: oled was not detected on I2C port
 *           - > 0: oled initialized OK and ready to use
 */
uint8 oled_Init(oled_Config *oled);

/**
 * @brief  Updates buffer from internal RAM to oled
 * @note   This function must be called each time you do some changes to oled, to update buffer from RAM to oled
 * @param  None
 * @retval None
 */
void oled_UpdateScreen(oled_Config *oled);

/**
 * @brief  Toggles pixels invertion inside internal RAM
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  None
 * @retval None
 */
void oled_ToggleInvert(oled_Config *oled);

/**
 * @brief  Fills entire oled with desired color
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  Color: Color to be used for screen fill. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval None
 */
void oled_Fill(oled_COLOR_t Color, oled_Config *oled);

/**
 * @brief  Draws pixel at desired location
 * @note   @ref oled_UpdateScreen() must called after that in order to see updated oled screen
 * @param  x: X location. This parameter can be a value between 0 and oled_WIDTH - 1
 * @param  y: Y location. This parameter can be a value between 0 and oled_HEIGHT - 1
 * @param  color: Color to be used for screen fill. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval None
 */
void oled_DrawPixel(uint16 x, uint16 y, oled_COLOR_t color, oled_Config *oled);

/**
 * @brief  Sets cursor pointer to desired location for strings
 * @param  x: X location. This parameter can be a value between 0 and oled_WIDTH - 1
 * @param  y: Y location. This parameter can be a value between 0 and oled_HEIGHT - 1
 * @retval None
 */
void oled_GotoXY(uint16 x, uint16 y, oled_Config *oled);

/**
 * @brief  Puts character to internal RAM
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  ch: Character to be written
 * @param  *Font: Pointer to @ref FontDef_t structure with used font
 * @param  color: Color used for drawing. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval Character written
 */
char oled_writeChar(char ch, FontDef_t *Font, oled_COLOR_t color,
		oled_Config *oled);

/**
 * @brief  Puts string to internal RAM
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  *str: String to be written
 * @param  *Font: Pointer to @ref FontDef_t structure with used font
 * @param  color: Color used for drawing. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval Zero on success or character value when function failed
 */
char oled_writeString(char *str, FontDef_t *Font, oled_COLOR_t color,
		oled_Config *oled);

/**
 * @brief  Draws line on oled
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  x0: Line X start point. Valid input is 0 to oled_WIDTH - 1
 * @param  y0: Line Y start point. Valid input is 0 to oled_HEIGHT - 1
 * @param  x1: Line X end point. Valid input is 0 to oled_WIDTH - 1
 * @param  y1: Line Y end point. Valid input is 0 to oled_HEIGHT - 1
 * @param  c: Color to be used. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval None
 */
void oled_DrawLine(uint16 x0, uint16 y0, uint16 x1, uint16 y1, oled_COLOR_t c,
		oled_Config *oled);

/**
 * @brief  Draws rectangle on oled
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  x: Top left X start point. Valid input is 0 to oled_WIDTH - 1
 * @param  y: Top left Y start point. Valid input is 0 to oled_HEIGHT - 1
 * @param  w: Rectangle width in units of pixels
 * @param  h: Rectangle height in units of pixels
 * @param  c: Color to be used. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval None
 */
void oled_DrawRectangle(uint16 x, uint16 y, uint16 w, uint16 h, oled_COLOR_t c,
		oled_Config *oled);

/**
 * @brief  Draws filled rectangle on oled
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  x: Top left X start point. Valid input is 0 to oled_WIDTH - 1
 * @param  y: Top left Y start point. Valid input is 0 to oled_HEIGHT - 1
 * @param  w: Rectangle width in units of pixels
 * @param  h: Rectangle height in units of pixels
 * @param  c: Color to be used. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval None
 */
void oled_DrawFilledRectangle(uint16 x, uint16 y, uint16 w, uint16 h,
		oled_COLOR_t c, oled_Config *oled);

/**
 * @brief  Draws triangle on oled
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  x1: First coordinate X location. Valid input is 0 to oled_WIDTH - 1
 * @param  y1: First coordinate Y location. Valid input is 0 to oled_HEIGHT - 1
 * @param  x2: Second coordinate X location. Valid input is 0 to oled_WIDTH - 1
 * @param  y2: Second coordinate Y location. Valid input is 0 to oled_HEIGHT - 1
 * @param  x3: Third coordinate X location. Valid input is 0 to oled_WIDTH - 1
 * @param  y3: Third coordinate Y location. Valid input is 0 to oled_HEIGHT - 1
 * @param  c: Color to be used. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval None
 */
void oled_DrawTriangle(uint16 x1, uint16 y1, uint16 x2, uint16 y2, uint16 x3,
		uint16 y3, oled_COLOR_t color, oled_Config *oled);

/**
 * @brief  Draws circle to STM buffer
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  x: X location for center of circle. Valid input is 0 to oled_WIDTH - 1
 * @param  y: Y location for center of circle. Valid input is 0 to oled_HEIGHT - 1
 * @param  r: Circle radius in units of pixels
 * @param  c: Color to be used. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval None
 */
void oled_DrawCircle(sint16 x0, sint16 y0, sint16 r, oled_COLOR_t c,
		oled_Config *oled);

/**
 * @brief  Draws filled circle to STM buffer
 * @note   @ref oled_UpdateScreen() must be called after that in order to see updated oled screen
 * @param  x: X location for center of circle. Valid input is 0 to oled_WIDTH - 1
 * @param  y: Y location for center of circle. Valid input is 0 to oled_HEIGHT - 1
 * @param  r: Circle radius in units of pixels
 * @param  c: Color to be used. This parameter can be a value of @ref oled_COLOR_t enumeration
 * @retval None
 */
void oled_DrawFilledCircle(sint16 x0, sint16 y0, sint16 r, oled_COLOR_t c,
		oled_Config *oled);

#ifndef oled_I2C_TIMEOUT
#define oled_I2C_TIMEOUT                    20000
#endif

/**
 * @brief  Initializes oled oled
 * @param  None
 * @retval Initialization status:
 *           - 0: oled was not detected on I2C port
 *           - > 0: oled initialized OK and ready to use
 */
void oled_I2C_Init(oled_Config *oled);

/**
 * @brief  Writes single byte to slave
 * @param  *I2Cx: I2C used
 * @param  address: 7 bit slave address, left aligned, bits 7:1 are used, LSB bit is not used
 * @param  reg: register to write to
 * @param  data: data to be written
 * @retval None
 */
void oled_I2C_Write(uint8 address, uint8 reg, uint8 data, oled_Config *oled);

/**
 * @brief  Writes multi bytes to slave
 * @param  *I2Cx: I2C used
 * @param  address: 7 bit slave address, left aligned, bits 7:1 are used, LSB bit is not used
 * @param  reg: register to write to
 * @param  *data: pointer to data array to write it to slave
 * @param  count: how many bytes will be written
 * @retval None
 */
void oled_I2C_WriteMulti(uint8 address, uint8 reg, uint8 *data, uint16 count,
		oled_Config *oled);

/**
 * @brief  Draws the Bitmap
 * @param  X:  X location to start the Drawing
 * @param  Y:  Y location to start the Drawing
 * @param  *bitmap : Pointer to the bitmap
 * @param  W : width of the image
 * @param  H : Height of the image
 * @param  color : 1-> white/blue, 0-> black
 */
void oled_DrawBitmap(sint16 x, sint16 y, const unsigned char *bitmap, sint16 w,
		sint16 h, sint16 color, oled_Config *oled);

// scroll the screen for fixed rows

void oled_ScrollRight(uint8 start_row, uint8 end_row, oled_Config *oled);

void oled_ScrollLeft(uint8 start_row, uint8 end_row, oled_Config *oled);

void oled_Scrolldiagright(uint8 start_row, uint8 end_row, oled_Config *oled);

void oled_Scrolldiagleft(uint8 start_row, uint8 end_row, oled_Config *oled);

void oled_Stopscroll(oled_Config *oled);

// inverts the display i = 1->inverted, i = 0->normal

void oled_InvertDisplay(int i, oled_Config *oled);

void oled_writeNumber(float Number, FontDef_t *Font, oled_COLOR_t color,
		oled_Config *oled);

// clear the display

void oled_Clear(oled_Config *oled);

#endif /* OLED_OLED_H_ */
