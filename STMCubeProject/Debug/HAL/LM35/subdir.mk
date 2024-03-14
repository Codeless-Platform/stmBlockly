################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/LM35/LM35.c 

OBJS += \
./HAL/LM35/LM35.o 

C_DEPS += \
./HAL/LM35/LM35.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/LM35/%.o HAL/LM35/%.su HAL/LM35/%.cyclo: ../HAL/LM35/%.c HAL/LM35/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-HAL-2f-LM35

clean-HAL-2f-LM35:
	-$(RM) ./HAL/LM35/LM35.cyclo ./HAL/LM35/LM35.d ./HAL/LM35/LM35.o ./HAL/LM35/LM35.su

.PHONY: clean-HAL-2f-LM35

