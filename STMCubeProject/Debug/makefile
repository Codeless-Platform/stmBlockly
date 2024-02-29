################################################################################
# Automatically-generated file. Do not edit!
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include Startup/subdir.mk
-include Src/subdir.mk
-include MCAL/USART/subdir.mk
-include MCAL/SYSTICK/subdir.mk
-include MCAL/SPI/subdir.mk
-include MCAL/RCC/subdir.mk
-include MCAL/NVIC/subdir.mk
-include MCAL/I2C/subdir.mk
-include MCAL/GPIO/subdir.mk
-include MCAL/EXTI/subdir.mk
-include MCAL/ADC/subdir.mk
-include HAL/LM35/subdir.mk
-include HAL/LCD/subdir.mk
-include HAL/Keypad/subdir.mk
-include subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(S_DEPS)),)
-include $(S_DEPS)
endif
ifneq ($(strip $(S_UPPER_DEPS)),)
-include $(S_UPPER_DEPS)
endif
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
endif

-include ../makefile.defs

# Add inputs and outputs from these tool invocations to the build variables 
EXECUTABLES += \
stmBlockly.elf \

SIZE_OUTPUT += \
default.size.stdout \

OBJDUMP_LIST += \
stmBlockly.list \

OBJCOPY_HEX += \
stmBlockly.hex \

OBJCOPY_BIN += \
stmBlockly.bin \


# All Target
all: stmBlockly.elf secondary-outputs

# Tool invocations
stmBlockly.elf: $(OBJS) $(USER_OBJS) D:\Projects\Low\ Code\ platforms\stmBlockly\STMCubeProject\STM32F103C6TX_FLASH.ld
	arm-none-eabi-gcc -o "stmBlockly.elf" @"objects.list" $(USER_OBJS) $(LIBS) -mcpu=cortex-m3 -T"D:\Projects\Low Code platforms\stmBlockly\STMCubeProject\STM32F103C6TX_FLASH.ld" --specs=nosys.specs -Wl,-Map="stmBlockly.map" -Wl,--gc-sections -static --specs=nano.specs -mfloat-abi=soft -mthumb -Wl,--start-group -lc -lm -Wl,--end-group
	@echo 'Finished building target: $@'
	@echo ' '

default.size.stdout: $(EXECUTABLES)
	arm-none-eabi-size  $(EXECUTABLES)
	@echo 'Finished building: $@'
	@echo ' '

stmBlockly.list: $(EXECUTABLES)
	arm-none-eabi-objdump -h -S $(EXECUTABLES) > "stmBlockly.list"
	@echo 'Finished building: $@'
	@echo ' '

stmBlockly.hex: $(EXECUTABLES)
	arm-none-eabi-objcopy  -O ihex $(EXECUTABLES) "stmBlockly.hex"
	@echo 'Finished building: $@'
	@echo ' '

stmBlockly.bin: $(EXECUTABLES)
	arm-none-eabi-objcopy  -O binary $(EXECUTABLES) "stmBlockly.bin"
	@echo 'Finished building: $@'
	@echo ' '

# Other Targets
clean:
	-$(RM) *
	-@echo ' '

secondary-outputs: $(SIZE_OUTPUT) $(OBJDUMP_LIST) $(OBJCOPY_HEX) $(OBJCOPY_BIN)

.PHONY: all clean dependents
.SECONDARY:

-include ../makefile.targets
