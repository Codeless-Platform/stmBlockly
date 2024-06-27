# -*- coding: utf-8 -*-
"""Collection of actions to the ardublocklyserver for relieved HTTP requests.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0
"""
from __future__ import unicode_literals, absolute_import, print_function
import subprocess
import locale
import sys
import os
import time
import re
# local-packages imports
import six
# This package modules
from stmblocklyserver.compilersettings import ServerCompilerSettings
from stmblocklyserver import sketchcreator


#
# file loading to STM Cube functions
#
def STMCube_ide_send_code(code_str):
    """Create a file from a code string and sends it to the STM Cube IDE.

    :param code_str: String of C code
    :return: Tuple with (success, ide_mode, std_out, err_out, exit_code)
    """
    sketch_path = create_main_from_string(code_str)
    if not sketch_path:
        return False, 'unknown', None, None, 51
    return load_arduino_cli(sketch_path)


def create_main_from_string(file_code):
    """Create an main file in location and name given by Settings.

    :param sketch_code: Code for the file.
    :return: file location. None if there was a problem.
    """
    settings = ServerCompilerSettings()
    return sketchcreator.create_sketch(sketch_dir=settings.sketch_dir,
                                       sketch_name=settings.sketch_name,
                                       sketch_code=file_code)


def load_arduino_cli(sketch_path):
    """Launch subprocess for Arduino IDE CLI with values from Settings.

    Launches a subprocess to invoke the Arduino IDE command line to open,
    verify or upload an sketch, the location of which is indicated in the input
    parameter.

    :param sketch_path: Path to the sketch to load into the Arduino IDE.
    :return: A tuple with the following data (success, ide_mode, std_out,
            err_out, exit_code)
    """
    success = True
    ide_mode = 'unknown'
    std_out, err_out = '', ''
    exit_code = 0

    # Input sanitation and output defaults
    if not os.path.isfile(sketch_path):
        err_out = 'Provided sketch path is not a valid file: %s' % sketch_path
        success = False
        exit_code = 52
        return success, ide_mode, std_out, err_out, exit_code

    settings = ServerCompilerSettings()

    # Check if CLI flags have been set
    if not settings.compiler_dir:
        success = False
        exit_code = 53
        err_out = 'Compiler directory not configured in the Settings.'
    elif not settings.programmer_dir:
        success = False
        exit_code = 55
        err_out = 'programmer directory not configured in the Settings.'
    elif not settings.load_ide_option:
        success = False
        exit_code = 54
        err_out = 'Launch IDE option not configured in the Settings.'
    elif not settings.get_arduino_board_flag() and (
            settings.load_ide_option == 'upload' or
            settings.load_ide_option == 'verify'):
        success = False
        exit_code = 56
        err_out = 'STM Board not configured in the Settings.'
    # elif not settings.get_serial_port_flag() and \
    #         settings.load_ide_option == 'upload':
    #     success = False
    #     exit_code = 55
    #     err_out = 'Serial Port configured in Settings not accessible.' 

    if success:
        ide_mode = settings.load_ide_option
        # Concatenates the CLI command and execute if the flags are valid
        directory_path = os.path.dirname(sketch_path)
        grandparent_directory = os.path.dirname(directory_path)
        project_name = os.path.basename(grandparent_directory)
        hex_file_path = os.path.join(grandparent_directory, 'build', f'{project_name}.hex')
        hex_file_path_str=  f'"{hex_file_path}"'
        main_file_path = os.path.join(grandparent_directory, 'Src\main.c')
        makefile_path = os.path.join(grandparent_directory, 'Makefile')
        new_projectFile_path = os.path.join(grandparent_directory, ".project") 
        edit_makefile(makefile_path,settings.STM32_board)
        cli_command1 = []
        if settings.load_ide_option == 'upload':
            cli_command1 = ['make', '-C', grandparent_directory]
            print('\nCompiling the code...\nGenerating .hex file')
            print('\nUploading sketch to bluepill...')
            cli_command = [settings.programmer_dir, '-c port=SWD -w', hex_file_path,'-v --start']
        elif settings.load_ide_option == 'verify':
            cli_command = ['make -j12', '-C', grandparent_directory]
            print('\nCompiling the code...\nGenerating .hex file')
        elif settings.load_ide_option == 'open':
            cli_command = [settings.compiler_dir, "%s" % new_projectFile_path]
            print('\nOpening the project in the STM Cube IDE...')
        print('CLI command: %s' % ' '.join(cli_command))
        # Python 2 needs the input to subprocess.Popen to be in system encoding
        if sys.version_info[0] < 3:
            sys_locale = locale.getpreferredencoding()
            cli_command = [x.encode(sys_locale) for x in cli_command]

        if settings.load_ide_option == 'open':
            # Open IDE in a subprocess without capturing outputs
            os.startfile(new_projectFile_path)
            time.sleep(5)
            cli_command = [settings.compiler_dir, "%s" % main_file_path]
            process = subprocess.Popen(
                cli_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                shell=False)
            std_out, err_out = process.communicate()
            std_out = six.u(std_out)
            err_out = six.u(err_out)
            exit_code = process.returncode
            print('STM Cube output:\n%s' % std_out)
            print('STM Cube Error output:\n%s' % err_out)
            print('STM Cube Exit code: %s' % exit_code)
            exit_code = 0
        else:
            # Launch the STM Cube programmer CLI in a subprocess and capture output data
            if(cli_command1):
                process2 = subprocess.Popen(
                cli_command1, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                shell=False)
                std_out, err_out = process2.communicate()
                std_out = six.u(std_out)
                err_out = six.u(err_out)
                exit_code = process2.returncode
                print('Make command output:\n%s' % std_out)
                print('Make command Error output:\n%s' % err_out)
                print('Make command Exit code: %s' % exit_code)
            process = subprocess.Popen(
                cli_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                shell=False)
            std_out, err_out = process.communicate()
            std_out = six.u(std_out)
            err_out = six.u(err_out)
            exit_code = process.returncode
            print('STM Cube output:\n%s' % std_out)
            print('STM Cube Error output:\n%s' % err_out)
            print('STM Cube Exit code: %s' % exit_code)
            # # For some reason Arduino CLI can return 256 on success
            # if (process.returncode != 0) and (process.returncode != 256):
            #     success = False
            #     if exit_code >= 50:
            #         # Custom exit codes from server start at 50
            #         err_out = '%s\nUnexpected Arduino exit error code: %s' % \
            #                   (err_out, exit_code)
            #         exit_code = 50     
    return success, ide_mode, std_out, err_out, exit_code

def edit_makefile(makefile_path, board):
    # Read the Makefile
    with open(makefile_path, 'r') as file:
        makefile_content = file.read()
    ldscript_value = "STM32F103C6TX_FLASH.ld"
    asm_sources_value = "startup_stm32f103c6tx.s"
    if board == 'stm32F103C8':
        ldscript_value = "STM32F103C8TX_FLASH.ld"
     # Update ASM_SOURCES based on board
    if board == 'stm32F103C8':
        asm_sources_value = "startup_stm32f103c8tx.s"
     # Find and replace the LDSCRIPT variable
    asm_sources_pattern = r'startup_stm32f103c[0-9]tx\.s'
    makefile_content = re.sub(asm_sources_pattern, f'{asm_sources_value}', makefile_content, flags=re.MULTILINE)

    # Regex pattern for LDSCRIPT
    ldscript_pattern = r'^(LDSCRIPT\s*=\s*).*'
    makefile_content = re.sub(ldscript_pattern, f'LDSCRIPT = {ldscript_value}', makefile_content, flags=re.MULTILINE)
    
    
    # Write the updated content back to the Makefile
    with open(makefile_path, 'w') as file:
        file.write(makefile_content)
    
    print("LDSCRIPT variable updated successfully.")


#
# Compiler Settings
#
def set_compiler_path(new_path):
    """Open the file browser to select an Arduino IDE executable.

    The new file path is saved into ServerCompilerSettings.

    :param new_path: New path for the Arduino IDE executable.
    :return: Same as get_compiler_path().
    """
    ServerCompilerSettings().compiler_dir = new_path
    return get_compiler_path()


def get_compiler_path():
    """Return the Arduino IDE executable path as stored in the Settings.

    :return: String with compiler path from the Settings.
             None if there is no path saved in the Settings.
    """
    compiler_directory = ServerCompilerSettings().compiler_dir
    if not compiler_directory:
        compiler_directory = None
    return compiler_directory

#
# Programmer Settings
#
def set_programmer_path(new_path):
    """Open the file browser to select an Arduino IDE executable.

    The new file path is saved into ServerCompilerSettings.

    :param new_path: New path for the Arduino IDE executable.
    :return: Same as get_compiler_path().
    """
    ServerCompilerSettings().programmer_dir = new_path
    return get_programmer_path()


def get_programmer_path():
    """Return the Arduino IDE executable path as stored in the Settings.

    :return: String with compiler path from the Settings.
             None if there is no path saved in the Settings.
    """
    programmer_directory = ServerCompilerSettings().programmer_dir
    if not programmer_directory:
        programmer_directory = None
    return programmer_directory


#
# Sketch settings
#
def set_sketch_path(new_path):
    """Open the file browser to select an folder to store the Arduino Sketch.

    The new file path is saved into ServerCompilerSettings.

    :param new_path: New path to store the Arduino Sketch.
    :return: Same as get_sketch_path().
    """
    ServerCompilerSettings().sketch_dir = new_path
    return get_sketch_path()


def get_sketch_path():
    """Return the path to the folder to store the Arduino Sketch.

    :return: String with the sketch path from the Settings.
             None if there is no path saved in the Settings.
    """
    sketch_directory = ServerCompilerSettings().sketch_dir
    if not sketch_directory:
        sketch_directory = "../STM Cube Project/Src"  #set default path
    return sketch_directory


#
# Arduino Board settings
#
def set_arduino_board(new_value):
    """Set new Arduino board value in the Settings.

    :param new_value: New Arduino board value, must be the board name, not the
            flag (so 'Uno', not 'arduino:avr:uno').
    :return: Same as the get_arduino_board_selected() function.
    """
    ServerCompilerSettings().STM32_board = new_value
    return get_arduino_board_selected()


def get_arduino_board_selected():
    """Get the selected board from the Settings.

    :return: The currently selected Arduino board from the Settings.
    """
    return ServerCompilerSettings().STM32_board


def get_arduino_boards():
    """Get a list of the available Arduino boards.

    :return: List of Arduino board types.
    """
    return ServerCompilerSettings().get_arduino_board_types()


#
# Serial Port settings
#
def set_serial_port(new_value):
    """Set a new serial port in the Settings.

    :param new_value: New serial port to save.
    :return: Same as get_serial_ports() function.
    """
    ServerCompilerSettings().serial_port = new_value
    return get_serial_port_selected()


def get_serial_ports():
    """Get the available serial ports.

    :return: Dictionary of serial ports.
    """
    return ServerCompilerSettings().get_serial_ports()


def get_serial_port_selected():
    """Get the selected serial port from the Settings.

    :return: The currently selected serial port in the Settings.
    """
    return ServerCompilerSettings().serial_port


#
# Load IDE settings
#
def set_load_ide_only(new_value):
    """Set a new Arduino IDE load option.

    :param new_value: New IDE load option to save in the Settings.
    :return: Same as the get_load_ide_selected() function.
    """
    ServerCompilerSettings().load_ide_option = new_value
    return get_load_ide_selected()


def get_load_ide_options():
    """Get the available Arduino IDE load options.

    :return: Dictionary of IDE load options.
    """
    return ServerCompilerSettings().get_load_ide_options()


def get_load_ide_selected():
    """Get the load option from the Settings.

    :return: The currently selected Arduino IDE option from the Settings.
    """
    return ServerCompilerSettings().load_ide_option
