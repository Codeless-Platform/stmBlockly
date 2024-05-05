/*
 * OLED.c
 *
 *  Created on: Mar 19, 2024
 *      Author: Alaa
 */

#include "OLED.h"

/* Write command */
#define oled_WRITECOMMAND(command,I2Cx)      oled_I2C_Write(oled_I2C_ADDR, 0x00, (command),I2Cx)
/* Write data */
#define oled_WRITEDATA(data,I2Cx)            oled_I2C_Write(oled_I2C_ADDR, 0x40, (data),I2Cx)
/* Absolute value */
#define ABS(x)   ((x) > 0 ? (x) : -(x))

/* oled data buffer */
static uint8 oled_Buffer1[oled_WIDTH1 * oled_HEIGHT1 / 8];
static uint8 oled_Buffer2[oled_WIDTH2 * oled_HEIGHT2 / 8];
static uint8* oled_Buffer[] = { oled_Buffer1, oled_Buffer2 };

/* Private variable */
static oled_t oled[2];

#define OLED1_INDEX 		0
#define OLED2_INDEX			1

void oled_ScrollRight(uint8 start_row, uint8 end_row, I2C_Registers_t *I2Cx) {
	oled_WRITECOMMAND(oled_RIGHT_HORIZONTAL_SCROLL, I2Cx);  // send 0x26
	oled_WRITECOMMAND(0x00, I2Cx);  // send dummy
	oled_WRITECOMMAND(start_row, I2Cx);  // start page address
	oled_WRITECOMMAND(0X00, I2Cx);  // time interval 5 frames
	oled_WRITECOMMAND(end_row, I2Cx);  // end page address
	oled_WRITECOMMAND(0X00, I2Cx);
	oled_WRITECOMMAND(0XFF, I2Cx);
	oled_WRITECOMMAND(oled_ACTIVATE_SCROLL, I2Cx); // start scroll
}

void oled_ScrollLeft(uint8 start_row, uint8 end_row, I2C_Registers_t *I2Cx) {
	oled_WRITECOMMAND(oled_LEFT_HORIZONTAL_SCROLL, I2Cx);  // send 0x26
	oled_WRITECOMMAND(0x00, I2Cx);  // send dummy
	oled_WRITECOMMAND(start_row, I2Cx);  // start page address
	oled_WRITECOMMAND(0X00, I2Cx);  // time interval 5 frames
	oled_WRITECOMMAND(end_row, I2Cx);  // end page address
	oled_WRITECOMMAND(0X00, I2Cx);
	oled_WRITECOMMAND(0XFF, I2Cx);
	oled_WRITECOMMAND(oled_ACTIVATE_SCROLL, I2Cx); // start scroll
}

void oled_Scrolldiagright(uint8 start_row, uint8 end_row, I2C_Registers_t *I2Cx) {
	uint8 oled_height = (I2Cx == I2C1) ? oled_HEIGHT1 : oled_HEIGHT2;

	oled_WRITECOMMAND(oled_SET_VERTICAL_SCROLL_AREA, I2Cx);  // sect the area
	oled_WRITECOMMAND(0x00, I2Cx);   // write dummy
	oled_WRITECOMMAND(oled_height, I2Cx);

	oled_WRITECOMMAND(oled_VERTICAL_AND_RIGHT_HORIZONTAL_SCROLL, I2Cx);
	oled_WRITECOMMAND(0x00, I2Cx);
	oled_WRITECOMMAND(start_row, I2Cx);
	oled_WRITECOMMAND(0X00, I2Cx);
	oled_WRITECOMMAND(end_row, I2Cx);
	oled_WRITECOMMAND(0x01, I2Cx);
	oled_WRITECOMMAND(oled_ACTIVATE_SCROLL, I2Cx);
}

void oled_Scrolldiagleft(uint8 start_row, uint8 end_row, I2C_Registers_t *I2Cx) {
	uint8 oled_height = (I2Cx == I2C1) ? oled_HEIGHT1 : oled_HEIGHT2;

	oled_WRITECOMMAND(oled_SET_VERTICAL_SCROLL_AREA, I2Cx);  // sect the area
	oled_WRITECOMMAND(0x00, I2Cx);   // write dummy
	oled_WRITECOMMAND(oled_height, I2Cx);

	oled_WRITECOMMAND(oled_VERTICAL_AND_LEFT_HORIZONTAL_SCROLL, I2Cx);
	oled_WRITECOMMAND(0x00, I2Cx);
	oled_WRITECOMMAND(start_row, I2Cx);
	oled_WRITECOMMAND(0X00, I2Cx);
	oled_WRITECOMMAND(end_row, I2Cx);
	oled_WRITECOMMAND(0x01, I2Cx);
	oled_WRITECOMMAND(oled_ACTIVATE_SCROLL, I2Cx);
}

void oled_Stopscroll(I2C_Registers_t *I2Cx) {
	oled_WRITECOMMAND(oled_DEACTIVATE_SCROLL, I2Cx);
}

void oled_InvertDisplay(int i, I2C_Registers_t *I2Cx) {
	if (i)
		oled_WRITECOMMAND(oled_INVERTDISPLAY, I2Cx);

	else
		oled_WRITECOMMAND(oled_NORMALDISPLAY, I2Cx);

}

void oled_DrawBitmap(sint16 x, sint16 y, const unsigned char *bitmap, sint16 w,
		sint16 h, sint16 color,uint8 index) {

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
				oled_DrawPixel(x + i, y, color,index);
		}
	}
}

uint8 oled_Init(I2C_Registers_t *I2Cx) {

	/* Init I2C */
	uint8 index;
	oled_I2C_Init(I2Cx);
	if (I2Cx == I2C1)
		index = OLED1_INDEX;
	else
		index = OLED2_INDEX;
	/* A little delay */
	STK_delayMs(50);

	/* Init oled */
	oled_WRITECOMMAND(0xAE, I2Cx); //display off
	oled_WRITECOMMAND(0x20, I2Cx); //Set Memory Addressing Mode
	oled_WRITECOMMAND(0x10, I2Cx); //00,Horizontal Addressing Mode;01,Vertical Addressing Mode;10,Page Addressing Mode (RESET,I2Cx);11,Invalid
	oled_WRITECOMMAND(0xB0, I2Cx); //Set Page Start Address for Page Addressing Mode,0-7
	oled_WRITECOMMAND(0xC8, I2Cx); //Set COM Output Scan Direction
	oled_WRITECOMMAND(0x00, I2Cx); //---set low column address
	oled_WRITECOMMAND(0x10, I2Cx); //---set high column address
	oled_WRITECOMMAND(0x40, I2Cx); //--set start line address
	oled_WRITECOMMAND(0x81, I2Cx); //--set contrast control register
	oled_WRITECOMMAND(0xFF, I2Cx);
	oled_WRITECOMMAND(0xA1, I2Cx); //--set segment re-map 0 to 127
	oled_WRITECOMMAND(0xA6, I2Cx); //--set normal display
	oled_WRITECOMMAND(0xA8, I2Cx); //--set multiplex ratio(1 to 64,I2Cx)
	oled_WRITECOMMAND(0x3F, I2Cx); //
	oled_WRITECOMMAND(0xA4, I2Cx); //0xa4,Output follows RAM content;0xa5,Output ignores RAM content
	oled_WRITECOMMAND(0xD3, I2Cx); //-set display offset
	oled_WRITECOMMAND(0x00, I2Cx); //-not offset
	oled_WRITECOMMAND(0xD5, I2Cx); //--set display clock divide ratio/oscillator frequency
	oled_WRITECOMMAND(0xF0, I2Cx); //--set divide ratio
	oled_WRITECOMMAND(0xD9, I2Cx); //--set pre-charge period
	oled_WRITECOMMAND(0x22, I2Cx); //
	oled_WRITECOMMAND(0xDA, I2Cx); //--set com pins hardware configuration
	oled_WRITECOMMAND(0x12, I2Cx);
	oled_WRITECOMMAND(0xDB, I2Cx); //--set vcomh
	oled_WRITECOMMAND(0x20, I2Cx); //0x20,0.77xVcc
	oled_WRITECOMMAND(0x8D, I2Cx); //--set DC-DC enable
	oled_WRITECOMMAND(0x14, I2Cx); //
	oled_WRITECOMMAND(0xAF, I2Cx); //--turn on oled panel

	oled_WRITECOMMAND(oled_DEACTIVATE_SCROLL, I2Cx);

	/* Clear screen */
	oled_Fill(oled_COLOR_BLACK, index);

	/* Update screen */
	oled_UpdateScreen(I2Cx);

	/* Set default values */
	oled[index].CurrentX = 0;
	oled[index].CurrentY = 0;

	/* Initialized OK */
	oled[index].Initialized = 1;

	/* Return OK */
	return 1;
}

void oled_UpdateScreen(I2C_Registers_t *I2Cx) {
	uint8 m;
	uint8 index = (I2Cx == I2C1) ? 0 : 1;
	uint8 oled_width = (index == 0) ? oled_WIDTH1 : oled_WIDTH2;
	for (m = 0; m < 8; m++) {
		oled_WRITECOMMAND(0xB0 + m, I2Cx);
		oled_WRITECOMMAND(0x00, I2Cx);
		oled_WRITECOMMAND(0x10, I2Cx);

		/* Write multi data */
		oled_I2C_WriteMulti(oled_I2C_ADDR, 0x40,
				&oled_Buffer[index][oled_width * m], oled_width, I2Cx);
	}
}

void oled_ToggleInvert(uint8 index) {
	uint16 i;

	/* Toggle invert */
	oled[index].Inverted = !oled[index].Inverted;

	/* Do memory toggle */
	for (i = 0; i < sizeof(oled_Buffer[index]); i++) {
		oled_Buffer[index][i] = ~oled_Buffer[index][i];
	}
}

void oled_Fill(oled_COLOR_t color, uint8 index) {
	/* Set memory */
	uint16 oled_Buffer_Size = (index == 0) ? (oled_WIDTH1 * oled_HEIGHT1 / 8) : (oled_WIDTH2 * oled_HEIGHT2 / 8);
	memset(oled_Buffer[index], (color == oled_COLOR_BLACK) ? 0x00 : 0xFF,
			oled_Buffer_Size);

}

void oled_DrawPixel(uint16 x, uint16 y, oled_COLOR_t color, uint8 index) {
	uint8 oled_width = (index == 0) ? oled_WIDTH1 : oled_WIDTH2;
	uint8 oled_height = (index == 0) ? oled_HEIGHT1 : oled_HEIGHT2;

	if (x >= oled_width || y >= oled_height) {
		/* Error */
		return;
	}

	/* Check if pixels are inverted */
	if (oled[index].Inverted) {
		color = (oled_COLOR_t) !color;
	}

	/* Set color */
	if (color == oled_COLOR_WHITE) {
		oled_Buffer[index][x + (y / 8) * oled_width] |= 1 << (y % 8);
	} else {
		oled_Buffer[index][x + (y / 8) * oled_width] &= ~(1 << (y % 8));
	}
}

void oled_GotoXY(uint16 x, uint16 y, uint8 index) {
	/* Set write pointers */
	oled[index].CurrentX = x;
	oled[index].CurrentY = y;
}

char oled_writeChar(char ch, FontDef_t *Font, oled_COLOR_t color, uint8 index) {
	uint32 i, b, j;
	uint8 oled_width = (index == 0) ? oled_WIDTH1 : oled_WIDTH2;
	uint8 oled_height = (index == 0) ? oled_HEIGHT1 : oled_HEIGHT2;

	/* Check available space in oled */
	if (oled_width <= (oled[index].CurrentX + Font->FontWidth)
			|| oled_height <= (oled[index].CurrentY + Font->FontHeight)) {
		/* Error */
		return 0;
	}

	/* Go through font */
	for (i = 0; i < Font->FontHeight; i++) {
		b = Font->data[(ch - 32) * Font->FontHeight + i];
		for (j = 0; j < Font->FontWidth; j++) {
			if ((b << j) & 0x8000) {
				oled_DrawPixel(oled[index].CurrentX + j,
						(oled[index].CurrentY + i), (oled_COLOR_t) color,index);
			} else {
				oled_DrawPixel(oled[index].CurrentX + j,
						(oled[index].CurrentY + i), (oled_COLOR_t) !color,index);
			}
		}
	}

	/* Increase pointer */
	oled[index].CurrentX += Font->FontWidth;

	/* Return character written */
	return ch;
}

char oled_writeString(char *str, FontDef_t *Font, oled_COLOR_t color,
		uint8 index) {
	/* Write characters */
	while (*str) {
		/* Write character by character */
		if (oled_writeChar(*str, Font, color, index) != *str) {
			/* Return error */
			return *str;
		}

		/* Increase string pointer */
		str++;
	}

	/* Everything OK, zero should be returned */
	return *str;
}
void oled_writeNumber(float Number, FontDef_t *Font, oled_COLOR_t color, uint8 index) {
	char str[16];
		char *tmpSign = (Number > 0) ? "" : "-";
		float tmpNum = (Number > 0) ? Number : -Number;

		int tmpVal = tmpNum;
		float tmpFrac = tmpNum - tmpVal;

		int Frac = tmpFrac * 100;

		sprintf(str, "%s%d.%02d", tmpSign, tmpVal, Frac);
		oled_writeString(str, Font, color,index);
}
void oled_DrawLine(uint16 x0, uint16 y0, uint16 x1, uint16 y1, oled_COLOR_t c,
		uint8 index) {
	sint16 dx, dy, sx, sy, err, e2, i, tmp;
	uint8 oled_width = (index == 0) ? oled_WIDTH1 : oled_WIDTH2;
	uint8 oled_height = (index == 0) ? oled_HEIGHT1 : oled_HEIGHT2;
	/* Check for overflow */
	if (x0 >= oled_width) {
		x0 = oled_width - 1;
	}
	if (x1 >= oled_width) {
		x1 = oled_width - 1;
	}
	if (y0 >= oled_height) {
		y0 = oled_height - 1;
	}
	if (y1 >= oled_height) {
		y1 = oled_height - 1;
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
			oled_DrawPixel(x0, i, c,index);
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
			oled_DrawPixel(i, y0, c,index);
		}

		/* Return from function */
		return;
	}

	while (1) {
		oled_DrawPixel(x0, y0, c,index);
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

void oled_DrawRectangle(uint16 x, uint16 y, uint16 w, uint16 h, oled_COLOR_t c,uint8 index) {
	/* Check input parameters */
	uint8 oled_width = (index == 0) ? oled_WIDTH1 : oled_WIDTH2;
		uint8 oled_height = (index == 0) ? oled_HEIGHT1 : oled_HEIGHT2;
	if (x >= oled_width || y >= oled_height) {
		/* Return error */
		return;
	}

	/* Check width and height */
	if ((x + w) >= oled_width) {
		w = oled_width - x;
	}
	if ((y + h) >= oled_height) {
		h = oled_height - y;
	}

	/* Draw 4 lines */
	oled_DrawLine(x, y, x + w, y, c, index); /* Top line */
	oled_DrawLine(x, y + h, x + w, y + h, c,index); /* Bottom line */
	oled_DrawLine(x, y, x, y + h, c,index); /* Left line */
	oled_DrawLine(x + w, y, x + w, y + h, c,index); /* Right line */
}

void oled_DrawFilledRectangle(uint16 x, uint16 y, uint16 w, uint16 h,
		oled_COLOR_t c,uint8 index) {
	uint8 i;
	uint8 oled_width = (index == 0) ? oled_WIDTH1 : oled_WIDTH2;
			uint8 oled_height = (index == 0) ? oled_HEIGHT1 : oled_HEIGHT2;
	/* Check input parameters */
	if (x >= oled_width || y >= oled_height) {
		/* Return error */
		return;
	}

	/* Check width and height */
	if ((x + w) >= oled_width) {
		w = oled_width - x;
	}
	if ((y + h) >= oled_height) {
		h = oled_height - y;
	}

	/* Draw lines */
	for (i = 0; i <= h; i++) {
		/* Draw lines */
		oled_DrawLine(x, y + i, x + w, y + i, c,index);
	}
}

void oled_DrawTriangle(uint16 x1, uint16 y1, uint16 x2, uint16 y2, uint16 x3,
		uint16 y3, oled_COLOR_t color,uint8 index) {
	/* Draw lines */
	oled_DrawLine(x1, y1, x2, y2, color,index);
	oled_DrawLine(x2, y2, x3, y3, color,index);
	oled_DrawLine(x3, y3, x1, y1, color,index);
}

void oled_DrawFilledTriangle(uint16 x1, uint16 y1, uint16 x2, uint16 y2,
		uint16 x3, uint16 y3, oled_COLOR_t color,uint8 index) {
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
		oled_DrawLine(x, y, x3, y3, color,index);

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

void oled_DrawCircle(sint16 x0, sint16 y0, sint16 r, oled_COLOR_t c,uint8 index) {
	sint16 f = 1 - r;
	sint16 ddF_x = 1;
	sint16 ddF_y = -2 * r;
	sint16 x = 0;
	sint16 y = r;

	oled_DrawPixel(x0, y0 + r, c,index);
	oled_DrawPixel(x0, y0 - r, c,index);
	oled_DrawPixel(x0 + r, y0, c,index);
	oled_DrawPixel(x0 - r, y0, c,index);

	while (x < y) {
		if (f >= 0) {
			y--;
			ddF_y += 2;
			f += ddF_y;
		}
		x++;
		ddF_x += 2;
		f += ddF_x;

		oled_DrawPixel(x0 + x, y0 + y, c,index);
		oled_DrawPixel(x0 - x, y0 + y, c,index);
		oled_DrawPixel(x0 + x, y0 - y, c,index);
		oled_DrawPixel(x0 - x, y0 - y, c,index);

		oled_DrawPixel(x0 + y, y0 + x, c,index);
		oled_DrawPixel(x0 - y, y0 + x, c,index);
		oled_DrawPixel(x0 + y, y0 - x, c,index);
		oled_DrawPixel(x0 - y, y0 - x, c,index);
	}
}

void oled_DrawFilledCircle(sint16 x0, sint16 y0, sint16 r, oled_COLOR_t c,uint8 index) {
	sint16 f = 1 - r;
	sint16 ddF_x = 1;
	sint16 ddF_y = -2 * r;
	sint16 x = 0;
	sint16 y = r;

	oled_DrawPixel(x0, y0 + r, c,index);
	oled_DrawPixel(x0, y0 - r, c,index);
	oled_DrawPixel(x0 + r, y0, c,index);
	oled_DrawPixel(x0 - r, y0, c,index);
	oled_DrawLine(x0 - r, y0, x0 + r, y0, c,index);

	while (x < y) {
		if (f >= 0) {
			y--;
			ddF_y += 2;
			f += ddF_y;
		}
		x++;
		ddF_x += 2;
		f += ddF_x;

		oled_DrawLine(x0 - x, y0 + y, x0 + x, y0 + y, c,index);
		oled_DrawLine(x0 + x, y0 - y, x0 - x, y0 - y, c,index);

		oled_DrawLine(x0 + y, y0 + x, x0 - y, y0 + x, c,index);
		oled_DrawLine(x0 + y, y0 - x, x0 - y, y0 - x, c,index);
	}
}

void oled_Clear(I2C_Registers_t *I2Cx) {
	uint8 index;
	if (I2Cx == I2C1)
		index = OLED1_INDEX;
	else
		index = OLED2_INDEX;
	oled_Fill(oled_COLOR_BLACK,index);
	oled_UpdateScreen(I2Cx);
}
void oled_ON(I2C_Registers_t *I2Cx) {
	oled_WRITECOMMAND(0x8D, I2Cx);
	oled_WRITECOMMAND(0x14, I2Cx);
	oled_WRITECOMMAND(0xAF, I2Cx);
}
void oled_OFF(I2C_Registers_t *I2Cx) {
	oled_WRITECOMMAND(0x8D, I2Cx);
	oled_WRITECOMMAND(0x10, I2Cx);
	oled_WRITECOMMAND(0xAE, I2Cx);
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

void oled_I2C_Init(I2C_Registers_t *I2Cx) {
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

	I2C_GPIO_SetPins(I2Cx);
	STK_delayMs(10);
	I2C_init(&I2C_pinConfig, I2Cx);
	STK_delayMs(50);

}

void oled_I2C_WriteMulti(uint8 address, uint8 reg, uint8 *data, uint16 count,
		I2C_Registers_t *I2Cx) {
	uint8 dt[256];
	dt[0] = reg;
	uint8 i;
	for (i = 0; i < count; i++)
		dt[i + 1] = data[i];
	I2C_Master_TX(I2Cx, address, (uint8*) dt, count + 1, STOP,
			NO_REPEATED_START);
}

void oled_I2C_Write(uint8 address, uint8 reg, uint8 data, I2C_Registers_t *I2Cx) {
	uint8 dt[2];
	dt[0] = reg;
	dt[1] = data;
	I2C_Master_TX(I2Cx, address, (uint8*) dt, 2, STOP, NO_REPEATED_START);
}
