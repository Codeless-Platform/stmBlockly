################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../MCAL/I2C/I2C.c 

OBJS += \
./MCAL/I2C/I2C.o 

C_DEPS += \
./MCAL/I2C/I2C.d 


# Each subdirectory must supply rules for building sources it contributes
MCAL/I2C/%.o MCAL/I2C/%.su MCAL/I2C/%.cyclo: ../MCAL/I2C/%.c MCAL/I2C/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DSTM32 -DSTM32F1 -DSTM32F103C6Tx -DDEBUG -c -I../Inc -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-MCAL-2f-I2C

clean-MCAL-2f-I2C:
	-$(RM) ./MCAL/I2C/I2C.cyclo ./MCAL/I2C/I2C.d ./MCAL/I2C/I2C.o ./MCAL/I2C/I2C.su

.PHONY: clean-MCAL-2f-I2C

