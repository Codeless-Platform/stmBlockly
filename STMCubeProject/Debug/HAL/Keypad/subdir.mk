################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/Keypad/Keypad.c 

OBJS += \
./HAL/Keypad/Keypad.o 

C_DEPS += \
./HAL/Keypad/Keypad.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/Keypad/%.o HAL/Keypad/%.su HAL/Keypad/%.cyclo: ../HAL/Keypad/%.c HAL/Keypad/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-HAL-2f-Keypad

clean-HAL-2f-Keypad:
	-$(RM) ./HAL/Keypad/Keypad.cyclo ./HAL/Keypad/Keypad.d ./HAL/Keypad/Keypad.o ./HAL/Keypad/Keypad.su

.PHONY: clean-HAL-2f-Keypad

