################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/LCD_I2C/LCD_I2C.c 

OBJS += \
./HAL/LCD_I2C/LCD_I2C.o 

C_DEPS += \
./HAL/LCD_I2C/LCD_I2C.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/LCD_I2C/%.o HAL/LCD_I2C/%.su HAL/LCD_I2C/%.cyclo: ../HAL/LCD_I2C/%.c HAL/LCD_I2C/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-HAL-2f-LCD_I2C

clean-HAL-2f-LCD_I2C:
	-$(RM) ./HAL/LCD_I2C/LCD_I2C.cyclo ./HAL/LCD_I2C/LCD_I2C.d ./HAL/LCD_I2C/LCD_I2C.o ./HAL/LCD_I2C/LCD_I2C.su

.PHONY: clean-HAL-2f-LCD_I2C

