################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../MCAL/NVIC/NVIC.c 

OBJS += \
./MCAL/NVIC/NVIC.o 

C_DEPS += \
./MCAL/NVIC/NVIC.d 


# Each subdirectory must supply rules for building sources it contributes
MCAL/NVIC/%.o MCAL/NVIC/%.su MCAL/NVIC/%.cyclo: ../MCAL/NVIC/%.c MCAL/NVIC/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-MCAL-2f-NVIC

clean-MCAL-2f-NVIC:
	-$(RM) ./MCAL/NVIC/NVIC.cyclo ./MCAL/NVIC/NVIC.d ./MCAL/NVIC/NVIC.o ./MCAL/NVIC/NVIC.su

.PHONY: clean-MCAL-2f-NVIC

