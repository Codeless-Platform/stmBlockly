################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../MCAL/SYSTICK/SYSTICK.c 

OBJS += \
./MCAL/SYSTICK/SYSTICK.o 

C_DEPS += \
./MCAL/SYSTICK/SYSTICK.d 


# Each subdirectory must supply rules for building sources it contributes
MCAL/SYSTICK/SYSTICK.o: ../MCAL/SYSTICK/SYSTICK.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"MCAL/SYSTICK/SYSTICK.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

