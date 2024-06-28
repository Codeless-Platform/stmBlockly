/*
 * Buzzer.h
 *
 *  Created on: Jun 28, 2024
 *      Author: Alaa
 */

#ifndef BUZZER_BUZZER_H_
#define BUZZER_BUZZER_H_

#include "../../MCAL/TIM/TIM.h"
#include "../../MCAL/GPIO/GPIO.h"

typedef struct {
	uint16 pin;
	GPIO_Registers_t *port;
	TIM_Registers_t *TIM;
	uint8 TIM_Channel;
} Buzzer_t;

void Buzzer_init(Buzzer_t *buzzer);
void Buzzer_tone(Buzzer_t *buzzer, float freq);
void Buzzer_noTone(Buzzer_t *buzzer);

#endif /* BUZZER_BUZZER_H_ */
