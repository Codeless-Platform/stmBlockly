/*
 * Buzzer.c
 *
 *  Created on: Jun 28, 2024
 *      Author: Alaa
 */

#include "Buzzer.h"

void Buzzer_init(Buzzer_t *buzzer) {
	TIM_ConfigType timConfig;
	GPIO_PinConfig_t GPIO_pinConfig;
	PWM_ConfigType pwmConfig;

	GPIO_pinConfig.Pin_Number = buzzer->pin;
	GPIO_pinConfig.MODE = MODE_OUTPUT_AF_PP;
	GPIO_init(buzzer->port, &GPIO_pinConfig);
	// configure timer
	timConfig.AutoReloadValue = 625;
	timConfig.AutoReloadBuffer = Disable_ARR_Buffer;
	timConfig.Tim_Direction = Up_Counting;
	timConfig.ClockFactor = Div_1;
	timConfig.UDI_State = Disable_Interrupt;
	timConfig.AlignedMode = EdgeAligned_Mode;
	timConfig.Prescalar = 31;
	TIM_Init(buzzer->TIM, &timConfig);
	//configure pwm
	pwmConfig.AutoReloadValue = 625;
	pwmConfig.Freq = 1;
	pwmConfig.Channel = buzzer->TIM_Channel;
	pwmConfig.Mode = PWM_11;
	PWM_Init(buzzer->TIM, &pwmConfig);
}
void Buzzer_tone(Buzzer_t *buzzer, float freq) {
	PWM_voidSetDutyCycle(buzzer->TIM, buzzer->TIM_Channel,freq);
}
void Buzzer_noTone(Buzzer_t *buzzer) {
	PWM_voidSetDutyCycle(buzzer->TIM, buzzer->TIM_Channel,0);

}
