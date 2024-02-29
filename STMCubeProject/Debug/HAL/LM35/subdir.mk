################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL/LM35/LM35.c 

OBJS += \
./HAL/LM35/LM35.o 

C_DEPS += \
./HAL/LM35/LM35.d 


# Each subdirectory must supply rules for building sources it contributes
HAL/LM35/LM35.o: ../HAL/LM35/LM35.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"HAL/LM35/LM35.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

