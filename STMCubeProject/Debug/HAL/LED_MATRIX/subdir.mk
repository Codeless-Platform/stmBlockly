################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/LED_MATRIX/Led_Matrix.c 

OBJS += \
./HAL/LED_MATRIX/Led_Matrix.o 

C_DEPS += \
./HAL/LED_MATRIX/Led_Matrix.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/LED_MATRIX/%.o HAL/LED_MATRIX/%.su HAL/LED_MATRIX/%.cyclo: ../HAL/LED_MATRIX/%.c HAL/LED_MATRIX/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-HAL-2f-LED_MATRIX

clean-HAL-2f-LED_MATRIX:
	-$(RM) ./HAL/LED_MATRIX/Led_Matrix.cyclo ./HAL/LED_MATRIX/Led_Matrix.d ./HAL/LED_MATRIX/Led_Matrix.o ./HAL/LED_MATRIX/Led_Matrix.su

.PHONY: clean-HAL-2f-LED_MATRIX

