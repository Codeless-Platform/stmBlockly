/*
 * Servo.c
 *
 *  Created on: Jun 20, 2024
 *      Author: Alaa
 */

#include "Servo.h"
void servo_init(servo_t *servo_pinConfig) {
	TIM_ConfigType timConfig;
	GPIO_PinConfig_t GPIO_pinConfig;
	PWM_ConfigType pwmConfig;
	GPIO_pinConfig.Pin_Number = servo_pinConfig->pin;
	GPIO_pinConfig.MODE = MODE_OUTPUT_AF_PP;
	GPIO_pinConfig.Output_Speed = SPEED_10M;
	GPIO_init(servo_pinConfig->port, &GPIO_pinConfig);
	// configure timer
	timConfig.AutoReloadValue = 9999;
	timConfig.AutoReloadBuffer = Disable_ARR_Buffer;
	timConfig.Tim_Direction = Up_Counting;
	timConfig.ClockFactor = Div_1;
	timConfig.UDI_State = Disable_Interrupt;
	timConfig.AlignedMode = EdgeAligned_Mode;
	timConfig.Prescalar = 15;
	TIM_Init(servo_pinConfig->TIM, &timConfig);
	//configure pwm
	pwmConfig.AutoReloadValue = 9999;
	pwmConfig.Channel = servo_pinConfig->TIM_Channel;
	pwmConfig.Mode = PWM_11;
	PWM_Init(servo_pinConfig->TIM, &pwmConfig);
}
void servo_write(servo_t *servo_pinConfig, uint32 angle) {
	/* 0 > 1ms > 0deg
	 * 250 >1.5ms >90deg
	 * 500> 2ms > 180deg
	 */
	uint32 pos = (angle * 500 / 180) + 500;
	PWM_voidSetDutyCycle(servo_pinConfig->TIM, servo_pinConfig->TIM_Channel,
			pos);
}
