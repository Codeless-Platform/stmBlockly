/*
 * OLED.c
 *
 *  Created on: Mar 19, 2024
 *      Author: Alaa
 */

#include "OLED.h"

/* Write command */
#define oled_WRITECOMMAND(command,I2Cx)      oled_I2C_Write(oled->address, 0x00, (command),oled)
/* Write data */
#define oled_WRITEDATA(data,I2Cx)            oled_I2C_Write(oled->address, 0x40, (data),oled)
/* Absolute value */
#define ABS(x)   ((x) > 0 ? (x) : -(x))

/* oled data buffer */
static uint8 oled_Buffer1[oled_WIDTH1 * oled_HEIGHT1 / 8];
static uint8 oled_Buffer2[oled_WIDTH2 * oled_HEIGHT2 / 8];
static uint8* oled_Buffer[] = { oled_Buffer1, oled_Buffer2 };

/* Private variable */
//static oled_t oled[2];

#define OLED1_INDEX 		0
#define OLED2_INDEX			1

void oled_ScrollRight(uint8 start_row, uint8 end_row, oled_Config *oled) {
	oled_WRITECOMMAND(oled_RIGHT_HORIZONTAL_SCROLL, oled->I2Cx);  // send 0x26
	oled_WRITECOMMAND(0x00, oled->I2Cx);  // send dummy
	oled_WRITECOMMAND(start_row, oled->I2Cx);  // start page address
	oled_WRITECOMMAND(0X00, oled->I2Cx);  // time interval 5 frames
	oled_WRITECOMMAND(end_row, oled->I2Cx);  // end page address
	oled_WRITECOMMAND(0X00, oled->I2Cx);
	oled_WRITECOMMAND(0XFF, oled->I2Cx);
	oled_WRITECOMMAND(oled_ACTIVATE_SCROLL, oled->I2Cx); // start scroll
}

void oled_ScrollLeft(uint8 start_row, uint8 end_row, oled_Config *oled) {
	oled_WRITECOMMAND(oled_LEFT_HORIZONTAL_SCROLL, oled->I2Cx);  // send 0x26
	oled_WRITECOMMAND(0x00, oled->I2Cx);  // send dummy
	oled_WRITECOMMAND(start_row, oled->I2Cx);  // start page address
	oled_WRITECOMMAND(0X00, oled->I2Cx);  // time interval 5 frames
	oled_WRITECOMMAND(end_row, oled->I2Cx);  // end page address
	oled_WRITECOMMAND(0X00, oled->I2Cx);
	oled_WRITECOMMAND(0XFF, oled->I2Cx);
	oled_WRITECOMMAND(oled_ACTIVATE_SCROLL, oled->I2Cx); // start scroll
}

void oled_Scrolldiagright(uint8 start_row, uint8 end_row, oled_Config *oled) {

	oled_WRITECOMMAND(oled_SET_VERTICAL_SCROLL_AREA, oled->I2Cx);  // sect the area
	oled_WRITECOMMAND(0x00, oled->I2Cx);   // write dummy
	oled_WRITECOMMAND(oled->height, oled->I2Cx);

	oled_WRITECOMMAND(oled_VERTICAL_AND_RIGHT_HORIZONTAL_SCROLL, oled->I2Cx);
	oled_WRITECOMMAND(0x00, oled->I2Cx);
	oled_WRITECOMMAND(start_row, oled->I2Cx);
	oled_WRITECOMMAND(0X00, oled->I2Cx);
	oled_WRITECOMMAND(end_row, oled->I2Cx);
	oled_WRITECOMMAND(0x01, oled->I2Cx);
	oled_WRITECOMMAND(oled_ACTIVATE_SCROLL, oled->I2Cx);
}

void oled_Scrolldiagleft(uint8 start_row, uint8 end_row, oled_Config *oled) {

	oled_WRITECOMMAND(oled_SET_VERTICAL_SCROLL_AREA, oled->I2Cx);  // sect the area
	oled_WRITECOMMAND(0x00, oled->I2Cx);   // write dummy
	oled_WRITECOMMAND(oled->height, oled->I2Cx);

	oled_WRITECOMMAND(oled_VERTICAL_AND_LEFT_HORIZONTAL_SCROLL, oled->I2Cx);
	oled_WRITECOMMAND(0x00, oled->I2Cx);
	oled_WRITECOMMAND(start_row, oled->I2Cx);
	oled_WRITECOMMAND(0X00, oled->I2Cx);
	oled_WRITECOMMAND(end_row, oled->I2Cx);
	oled_WRITECOMMAND(0x01, oled->I2Cx);
	oled_WRITECOMMAND(oled_ACTIVATE_SCROLL, oled->I2Cx);
}

void oled_Stopscroll(oled_Config *oled) {
	oled_WRITECOMMAND(oled_DEACTIVATE_SCROLL, oled->I2Cx);
}

void oled_InvertDisplay(int i, oled_Config *oled) {
	if (i)
		oled_WRITECOMMAND(oled_INVERTDISPLAY, oled->I2Cx);

	else
		oled_WRITECOMMAND(oled_NORMALDISPLAY, oled->I2Cx);

}

void oled_DrawBitmap(sint16 x, sint16 y, const unsigned char *bitmap, sint16 w,
		sint16 h, sint16 color,oled_Config *oled) {

	sint16 byteWidth = (w + 7) / 8; // Bitmap scanline pad = whole byte
	uint8 byte = 0;

	for (sint16 j = 0; j < h; j++, y++) {
		for (sint16 i = 0; i < w; i++) {
			if (i & 7) {
				byte <<= 1;
			} else {
				byte =
						(*(const unsigned char*) (&bitmap[j * byteWidth + i / 8]));
			}
			if (byte & 0x80)
				oled_DrawPixel(x + i, y, color,oled);
		}
	}
}

uint8 oled_Init(oled_Config *oled) {

	/* Init I2C */
	oled_I2C_Init(oled);
	/* A little delay */
	STK_delayMs(50);

	/* Init oled */
	oled_WRITECOMMAND(0xAE, oled->I2Cx); //display off
	oled_WRITECOMMAND(0x20, oled->I2Cx); //Set Memory Addressing Mode
	oled_WRITECOMMAND(0x10, oled->I2Cx); //00,Horizontal Addressing Mode;01,Vertical Addressing Mode;10,Page Addressing Mode (RESET,oled->I2Cx);11,Invalid
	oled_WRITECOMMAND(0xB0, oled->I2Cx); //Set Page Start Address for Page Addressing Mode,0-7
	oled_WRITECOMMAND(0xC8, oled->I2Cx); //Set COM Output Scan Direction
	oled_WRITECOMMAND(0x00, oled->I2Cx); //---set low column address
	oled_WRITECOMMAND(0x10, oled->I2Cx); //---set high column address
	oled_WRITECOMMAND(0x40, oled->I2Cx); //--set start line address
	oled_WRITECOMMAND(0x81, oled->I2Cx); //--set contrast control register
	oled_WRITECOMMAND(0xFF, oled->I2Cx);
	oled_WRITECOMMAND(0xA1, oled->I2Cx); //--set segment re-map 0 to 127
	oled_WRITECOMMAND(0xA6, oled->I2Cx); //--set normal display
	oled_WRITECOMMAND(0xA8, oled->I2Cx); //--set multiplex ratio(1 to 64,oled->I2Cx)
	oled_WRITECOMMAND(0x3F, oled->I2Cx); //
	oled_WRITECOMMAND(0xA4, oled->I2Cx); //0xa4,Output follows RAM content;0xa5,Output ignores RAM content
	oled_WRITECOMMAND(0xD3, oled->I2Cx); //-set display offset
	oled_WRITECOMMAND(0x00, oled->I2Cx); //-not offset
	oled_WRITECOMMAND(0xD5, oled->I2Cx); //--set display clock divide ratio/oscillator frequency
	oled_WRITECOMMAND(0xF0, oled->I2Cx); //--set divide ratio
	oled_WRITECOMMAND(0xD9, oled->I2Cx); //--set pre-charge period
	oled_WRITECOMMAND(0x22, oled->I2Cx); //
	oled_WRITECOMMAND(0xDA, oled->I2Cx); //--set com pins hardware configuration
	oled_WRITECOMMAND(0x12, oled->I2Cx);
	oled_WRITECOMMAND(0xDB, oled->I2Cx); //--set vcomh
	oled_WRITECOMMAND(0x20, oled->I2Cx); //0x20,0.77xVcc
	oled_WRITECOMMAND(0x8D, oled->I2Cx); //--set DC-DC enable
	oled_WRITECOMMAND(0x14, oled->I2Cx); //
	oled_WRITECOMMAND(0xAF, oled->I2Cx); //--turn on oled panel

	oled_WRITECOMMAND(oled_DEACTIVATE_SCROLL, oled->I2Cx);

	/* Clear screen */
	oled_Fill(oled_COLOR_BLACK, oled);

	/* Update screen */
	oled_UpdateScreen(oled);

	/* Set default values */
	oled->CurrentX = 0;
	oled->CurrentY = 0;

	/* Initialized OK */
	oled->Initialized = 1;

	/* Return OK */
	return 1;
}

void oled_UpdateScreen(oled_Config *oled) {
	uint8 m;
	uint8 index = (oled->I2Cx == I2C1) ? 0 : 1;
	for (m = 0; m < 8; m++) {
		oled_WRITECOMMAND(0xB0 + m, oled->I2Cx);
		oled_WRITECOMMAND(0x00, oled->I2Cx);
		oled_WRITECOMMAND(0x10, oled->I2Cx);

		/* Write multi data */
		oled_I2C_WriteMulti(oled->address, 0x40,
				&oled_Buffer[index][oled->width * m], oled->width, oled);
	}
}

void oled_ToggleInvert(oled_Config *oled) {
	uint16 i;
	uint8 index = (oled->I2Cx == I2C1) ? 0 : 1;
	/* Toggle invert */
	oled->Inverted = !oled->Inverted;

	/* Do memory toggle */
	for (i = 0; i < sizeof(oled_Buffer[index]); i++) {
		oled_Buffer[index][i] = ~oled_Buffer[index][i];
	}
}

void oled_Fill(oled_COLOR_t color, oled_Config *oled) {
	uint8 index = (oled->I2Cx == I2C1) ? 0 : 1;
	/* Set memory */
	uint16 oled_Buffer_Size = (index == 0) ? (oled_WIDTH1 * oled_HEIGHT1 / 8) : (oled_WIDTH2 * oled_HEIGHT2 / 8);
	memset(oled_Buffer[index], (color == oled_COLOR_BLACK) ? 0x00 : 0xFF,
			oled_Buffer_Size);

}

void oled_DrawPixel(uint16 x, uint16 y, oled_COLOR_t color, oled_Config *oled) {
	uint8 index = (oled->I2Cx == I2C1) ? 0 : 1;
	if (x >= oled->width || y >= oled->height) {
		/* Error */
		return;
	}

	/* Check if pixels are inverted */
	if (oled->Inverted) {
		color = (oled_COLOR_t) !color;
	}

	/* Set color */
	if (color == oled_COLOR_WHITE) {
		oled_Buffer[index][x + (y / 8) * oled->width] |= 1 << (y % 8);
	} else {
		oled_Buffer[index][x + (y / 8) * oled->width] &= ~(1 << (y % 8));
	}
}

void oled_GotoXY(uint16 x, uint16 y, oled_Config *oled) {
	/* Set write pointers */
	oled->CurrentX = x;
	oled->CurrentY = y;
}

char oled_writeChar(char ch, FontDef_t *Font, oled_COLOR_t color, oled_Config *oled) {
	uint32 i, b, j;

	/* Check available space in oled */
	if (oled->width <= (oled->CurrentX + Font->FontWidth)
			|| oled->height <= (oled->CurrentY + Font->FontHeight)) {
		/* Error */
		return 0;
	}

	/* Go through font */
	for (i = 0; i < Font->FontHeight; i++) {
		b = Font->data[(ch - 32) * Font->FontHeight + i];
		for (j = 0; j < Font->FontWidth; j++) {
			if ((b << j) & 0x8000) {
				oled_DrawPixel(oled->CurrentX + j,
						(oled->CurrentY + i), (oled_COLOR_t) color,oled);
			} else {
				oled_DrawPixel(oled->CurrentX + j,
						(oled->CurrentY + i), (oled_COLOR_t) !color,oled);
			}
		}
	}

	/* Increase pointer */
	oled->CurrentX += Font->FontWidth;

	/* Return character written */
	return ch;
}

char oled_writeString(char *str, FontDef_t *Font, oled_COLOR_t color,
		oled_Config *oled) {
	/* Write characters */
	while (*str) {
		/* Write character by character */
		if (oled_writeChar(*str, Font, color, oled) != *str) {
			/* Return error */
			return *str;
		}

		/* Increase string pointer */
		str++;
	}

	/* Everything OK, zero should be returned */
	return *str;
}
void oled_writeNumber(float Number, FontDef_t *Font, oled_COLOR_t color, oled_Config *oled) {
	char str[16];
		char *tmpSign = (Number > 0) ? "" : "-";
		float tmpNum = (Number > 0) ? Number : -Number;

		int tmpVal = tmpNum;
		float tmpFrac = tmpNum - tmpVal;

		int Frac = tmpFrac * 100;

		sprintf(str, "%s%d.%02d", tmpSign, tmpVal, Frac);
		oled_writeString(str, Font, color,oled);
}
void oled_DrawLine(uint16 x0, uint16 y0, uint16 x1, uint16 y1, oled_COLOR_t c,
		oled_Config *oled) {
	sint16 dx, dy, sx, sy, err, e2, i, tmp;

	/* Check for overflow */
	if (x0 >= oled->width) {
		x0 = oled->width - 1;
	}
	if (x1 >= oled->width) {
		x1 = oled->width - 1;
	}
	if (y0 >= oled->height) {
		y0 = oled->height - 1;
	}
	if (y1 >= oled->height) {
		y1 = oled->height - 1;
	}

	dx = (x0 < x1) ? (x1 - x0) : (x0 - x1);
	dy = (y0 < y1) ? (y1 - y0) : (y0 - y1);
	sx = (x0 < x1) ? 1 : -1;
	sy = (y0 < y1) ? 1 : -1;
	err = ((dx > dy) ? dx : -dy) / 2;

	if (dx == 0) {
		if (y1 < y0) {
			tmp = y1;
			y1 = y0;
			y0 = tmp;
		}

		if (x1 < x0) {
			tmp = x1;
			x1 = x0;
			x0 = tmp;
		}

		/* Vertical line */
		for (i = y0; i <= y1; i++) {
			oled_DrawPixel(x0, i, c,oled);
		}

		/* Return from function */
		return;
	}

	if (dy == 0) {
		if (y1 < y0) {
			tmp = y1;
			y1 = y0;
			y0 = tmp;
		}

		if (x1 < x0) {
			tmp = x1;
			x1 = x0;
			x0 = tmp;
		}

		/* Horizontal line */
		for (i = x0; i <= x1; i++) {
			oled_DrawPixel(i, y0, c,oled);
		}

		/* Return from function */
		return;
	}

	while (1) {
		oled_DrawPixel(x0, y0, c,oled);
		if (x0 == x1 && y0 == y1) {
			break;
		}
		e2 = err;
		if (e2 > -dx) {
			err -= dy;
			x0 += sx;
		}
		if (e2 < dy) {
			err += dx;
			y0 += sy;
		}
	}
}

void oled_DrawRectangle(uint16 x, uint16 y, uint16 w, uint16 h, oled_COLOR_t c,oled_Config *oled) {
	/* Check input parameters */

	if (x >= oled->width || y >= oled->height) {
		/* Return error */
		return;
	}

	/* Check width and height */
	if ((x + w) >= oled->width) {
		w = oled->width - x;
	}
	if ((y + h) >= oled->height) {
		h = oled->height - y;
	}

	/* Draw 4 lines */
	oled_DrawLine(x, y, x + w, y, c, oled); /* Top line */
	oled_DrawLine(x, y + h, x + w, y + h, c,oled); /* Bottom line */
	oled_DrawLine(x, y, x, y + h, c,oled); /* Left line */
	oled_DrawLine(x + w, y, x + w, y + h, c,oled); /* Right line */
}

void oled_DrawFilledRectangle(uint16 x, uint16 y, uint16 w, uint16 h,
		oled_COLOR_t c,oled_Config *oled) {
	uint8 i;

	/* Check input parameters */
	if (x >= oled->width || y >= oled->height) {
		/* Return error */
		return;
	}

	/* Check width and height */
	if ((x + w) >= oled->width) {
		w = oled->width - x;
	}
	if ((y + h) >= oled->height) {
		h = oled->height - y;
	}

	/* Draw lines */
	for (i = 0; i <= h; i++) {
		/* Draw lines */
		oled_DrawLine(x, y + i, x + w, y + i, c,oled);
	}
}

void oled_DrawTriangle(uint16 x1, uint16 y1, uint16 x2, uint16 y2, uint16 x3,
		uint16 y3, oled_COLOR_t color,oled_Config *oled) {
	/* Draw lines */
	oled_DrawLine(x1, y1, x2, y2, color,oled);
	oled_DrawLine(x2, y2, x3, y3, color,oled);
	oled_DrawLine(x3, y3, x1, y1, color,oled);
}

void oled_DrawFilledTriangle(uint16 x1, uint16 y1, uint16 x2, uint16 y2,
		uint16 x3, uint16 y3, oled_COLOR_t color,oled_Config *oled) {
	sint16 deltax = 0, deltay = 0, x = 0, y = 0, xinc1 = 0, xinc2 = 0,
			yinc1 = 0, yinc2 = 0, den = 0, num = 0, numadd = 0, numpixels = 0,
			curpixel = 0;

	deltax = ABS(x2 - x1);
	deltay = ABS(y2 - y1);
	x = x1;
	y = y1;

	if (x2 >= x1) {
		xinc1 = 1;
		xinc2 = 1;
	} else {
		xinc1 = -1;
		xinc2 = -1;
	}

	if (y2 >= y1) {
		yinc1 = 1;
		yinc2 = 1;
	} else {
		yinc1 = -1;
		yinc2 = -1;
	}

	if (deltax >= deltay) {
		xinc1 = 0;
		yinc2 = 0;
		den = deltax;
		num = deltax / 2;
		numadd = deltay;
		numpixels = deltax;
	} else {
		xinc2 = 0;
		yinc1 = 0;
		den = deltay;
		num = deltay / 2;
		numadd = deltax;
		numpixels = deltay;
	}

	for (curpixel = 0; curpixel <= numpixels; curpixel++) {
		oled_DrawLine(x, y, x3, y3, color,oled);

		num += numadd;
		if (num >= den) {
			num -= den;
			x += xinc1;
			y += yinc1;
		}
		x += xinc2;
		y += yinc2;
	}
}

void oled_DrawCircle(sint16 x0, sint16 y0, sint16 r, oled_COLOR_t c,oled_Config *oled) {
	sint16 f = 1 - r;
	sint16 ddF_x = 1;
	sint16 ddF_y = -2 * r;
	sint16 x = 0;
	sint16 y = r;

	oled_DrawPixel(x0, y0 + r, c,oled);
	oled_DrawPixel(x0, y0 - r, c,oled);
	oled_DrawPixel(x0 + r, y0, c,oled);
	oled_DrawPixel(x0 - r, y0, c,oled);

	while (x < y) {
		if (f >= 0) {
			y--;
			ddF_y += 2;
			f += ddF_y;
		}
		x++;
		ddF_x += 2;
		f += ddF_x;

		oled_DrawPixel(x0 + x, y0 + y, c,oled);
		oled_DrawPixel(x0 - x, y0 + y, c,oled);
		oled_DrawPixel(x0 + x, y0 - y, c,oled);
		oled_DrawPixel(x0 - x, y0 - y, c,oled);

		oled_DrawPixel(x0 + y, y0 + x, c,oled);
		oled_DrawPixel(x0 - y, y0 + x, c,oled);
		oled_DrawPixel(x0 + y, y0 - x, c,oled);
		oled_DrawPixel(x0 - y, y0 - x, c,oled);
	}
}

void oled_DrawFilledCircle(sint16 x0, sint16 y0, sint16 r, oled_COLOR_t c,oled_Config *oled) {
	sint16 f = 1 - r;
	sint16 ddF_x = 1;
	sint16 ddF_y = -2 * r;
	sint16 x = 0;
	sint16 y = r;

	oled_DrawPixel(x0, y0 + r, c,oled);
	oled_DrawPixel(x0, y0 - r, c,oled);
	oled_DrawPixel(x0 + r, y0, c,oled);
	oled_DrawPixel(x0 - r, y0, c,oled);
	oled_DrawLine(x0 - r, y0, x0 + r, y0, c,oled);

	while (x < y) {
		if (f >= 0) {
			y--;
			ddF_y += 2;
			f += ddF_y;
		}
		x++;
		ddF_x += 2;
		f += ddF_x;

		oled_DrawLine(x0 - x, y0 + y, x0 + x, y0 + y, c,oled);
		oled_DrawLine(x0 + x, y0 - y, x0 - x, y0 - y, c,oled);

		oled_DrawLine(x0 + y, y0 + x, x0 - y, y0 + x, c,oled);
		oled_DrawLine(x0 + y, y0 - x, x0 - y, y0 - x, c,oled);
	}
}

void oled_Clear(oled_Config *oled) {
	oled_Fill(oled_COLOR_BLACK,oled);
	oled_UpdateScreen(oled);
}
void oled_ON(oled_Config *oled) {
	oled_WRITECOMMAND(0x8D, oled->I2Cx);
	oled_WRITECOMMAND(0x14, oled->I2Cx);
	oled_WRITECOMMAND(0xAF, oled->I2Cx);
}
void oled_OFF(oled_Config *oled) {
	oled_WRITECOMMAND(0x8D, oled->I2Cx);
	oled_WRITECOMMAND(0x10, oled->I2Cx);
	oled_WRITECOMMAND(0xAE, oled->I2Cx);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//  _____ ___   _____
// |_   _|__ \ / ____|
//   | |    ) | |
//   | |   / /| |
//  _| |_ / /_| |____
// |_____|____|\_____|
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////

void oled_I2C_Init(oled_Config *oled) {
	I2C_pinConfig_t I2C_pinConfig;
	I2C_pinConfig.Clock_Speed = I2C_CLK_SM_100K;
	I2C_pinConfig.I2C_Mode = I2C_Mode_I2C;
	I2C_pinConfig.Stretch_Mode = I2C_Stretch_EN;
	I2C_pinConfig.ACK_Enable = I2C_ACK_EN;
	I2C_pinConfig.P_Slave_CallBack_Fun = NULL;
	I2C_pinConfig.slave_address.slave_address_mode = I2C_Slave_7Bit;
	I2C_pinConfig.slave_address.slave_primary_address = 0;
	I2C_pinConfig.slave_address.Enable_Dual_Mode = 0;
	STK_init();

	I2C_GPIO_SetPins(oled->I2Cx);
	STK_delayMs(10);
	I2C_init(&I2C_pinConfig, oled->I2Cx);
	STK_delayMs(50);

}

void oled_I2C_WriteMulti(uint8 address, uint8 reg, uint8 *data, uint16 count,
		oled_Config *oled) {
	uint8 dt[256];
	dt[0] = reg;
	uint8 i;
	for (i = 0; i < count; i++)
		dt[i + 1] = data[i];
	I2C_Master_TX(oled->I2Cx, address, (uint8*) dt, count + 1, STOP,
			NO_REPEATED_START);
}

void oled_I2C_Write(uint8 address, uint8 reg, uint8 data, oled_Config *oled) {
	uint8 dt[2];
	dt[0] = reg;
	dt[1] = data;
	I2C_Master_TX(oled->I2Cx, address, (uint8*) dt, 2, STOP, NO_REPEATED_START);
}
