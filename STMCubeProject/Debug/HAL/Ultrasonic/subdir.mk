################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/Ultrasonic/Ultrasonic.c 

OBJS += \
./HAL/Ultrasonic/Ultrasonic.o 

C_DEPS += \
./HAL/Ultrasonic/Ultrasonic.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/Ultrasonic/%.o HAL/Ultrasonic/%.su HAL/Ultrasonic/%.cyclo: ../HAL/Ultrasonic/%.c HAL/Ultrasonic/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-HAL-2f-Ultrasonic

clean-HAL-2f-Ultrasonic:
	-$(RM) ./HAL/Ultrasonic/Ultrasonic.cyclo ./HAL/Ultrasonic/Ultrasonic.d ./HAL/Ultrasonic/Ultrasonic.o ./HAL/Ultrasonic/Ultrasonic.su

.PHONY: clean-HAL-2f-Ultrasonic

