################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/LCD_Multi_Instances/LCD_Multi.c 

OBJS += \
./HAL/LCD_Multi_Instances/LCD_Multi.o 

C_DEPS += \
./HAL/LCD_Multi_Instances/LCD_Multi.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/LCD_Multi_Instances/%.o HAL/LCD_Multi_Instances/%.su HAL/LCD_Multi_Instances/%.cyclo: ../HAL/LCD_Multi_Instances/%.c HAL/LCD_Multi_Instances/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-HAL-2f-LCD_Multi_Instances

clean-HAL-2f-LCD_Multi_Instances:
	-$(RM) ./HAL/LCD_Multi_Instances/LCD_Multi.cyclo ./HAL/LCD_Multi_Instances/LCD_Multi.d ./HAL/LCD_Multi_Instances/LCD_Multi.o ./HAL/LCD_Multi_Instances/LCD_Multi.su

.PHONY: clean-HAL-2f-LCD_Multi_Instances

