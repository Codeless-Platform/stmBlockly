################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/OLED/OLED.c \
../HAL/OLED/fonts.c \
../HAL/OLED/test.c 

OBJS += \
./HAL/OLED/OLED.o \
./HAL/OLED/fonts.o \
./HAL/OLED/test.o 

C_DEPS += \
./HAL/OLED/OLED.d \
./HAL/OLED/fonts.d \
./HAL/OLED/test.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/OLED/%.o HAL/OLED/%.su HAL/OLED/%.cyclo: ../HAL/OLED/%.c HAL/OLED/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-HAL-2f-OLED

clean-HAL-2f-OLED:
	-$(RM) ./HAL/OLED/OLED.cyclo ./HAL/OLED/OLED.d ./HAL/OLED/OLED.o ./HAL/OLED/OLED.su ./HAL/OLED/fonts.cyclo ./HAL/OLED/fonts.d ./HAL/OLED/fonts.o ./HAL/OLED/fonts.su ./HAL/OLED/test.cyclo ./HAL/OLED/test.d ./HAL/OLED/test.o ./HAL/OLED/test.su

.PHONY: clean-HAL-2f-OLED

