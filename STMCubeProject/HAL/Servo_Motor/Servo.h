/*
 * Servo.h
 *
 *  Created on: Jun 20, 2024
 *      Author: Alaa
 */

#ifndef SERVO_MOTOR_SERVO_H_
#define SERVO_MOTOR_SERVO_H_

#include "../../MCAL/GPIO/GPIO.h"
#include "../../MCAL/RCC/RCC.h"
#include "../../MCAL/TIM/TIM.h"

typedef struct {
	uint16 pin;
	GPIO_Registers_t *port;
	TIM_Registers_t *TIM;
	uint8 TIM_Channel;
} servo_t;

void servo_init(servo_t *servo_pinConfig);
void servo_write(servo_t *servo_pinConfig, uint32 angle);

#endif /* SERVO_MOTOR_SERVO_H_ */
