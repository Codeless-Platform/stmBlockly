# -*- coding: utf-8 -*-
"""Sketch Creator module creates an Arduino Sketch source code file.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0
"""
from __future__ import unicode_literals, absolute_import, print_function
import codecs
import os
# local-packages imports
import six
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path


# Default blinky sketch
default_sketch_code = """int led = 13;

void wait_ms(uint32 time) {
	for (uint32 i = 0; i < time; i++)
		for (uint32 j = 0; j < 255; j++)
			;
}
int main(){
GPIO_PinConfig_t GPIO_pinConfig;
GPIO_pinConfig.MODE = MODE_OUTPUT_PP;
GPIO_pinConfig.Output_Speed =SPEED_10M;
GPIO_init(GPIOA, &GPIO_pinConfig);

    while(1){
      GPIO_WritePin(GPIOA ,PIN_0, PIN_HIGH);
      wait_ms(50);
      GPIO_WritePin(GPIOA ,PIN_0, PIN_LOW);
      wait_ms(50);
    }
}
"""

# Default sketch name
default_sketch_name = 'main.c'


def create_sketch(sketch_dir, sketch_name, sketch_code):
    """Create an Arduino Sketch file into the given directory.
    
    :param sketch_dir: Location for the sketch.
    :param sketch_name: Optional name for the sketch.
    :param sketch_code: Optional unicode string with the code for the sketch.
    :return: Unicode string with full path to the sketch file
             Return None indicates an error has occurred.
    """
    # Check the code first, to not create sketch file if invalid
    if not isinstance(sketch_code, six.string_types) or \
            not isinstance(sketch_name, six.string_types):
        print('The project name or code given is not a valid string !!!')
        return None

    # Create the sketch path
    sketch_path = build_sketch_path(sketch_dir, sketch_name)
    parent_directory = os.path.dirname(sketch_path)
    gparent_directory = os.path.dirname(parent_directory)
    folder_name = os.path.basename(gparent_directory)
     # Parse the XML file
    tree = ET.parse("./STMCubeProject/.project")
    root = tree.getroot()

    # Find the <name> element and change its text to the new project name
    for name_elem in root.iter("name"):
        name_elem.text = folder_name
        break

    # Write the modified XML tree back to the file
    tree.write("./STMCubeProject/.project", encoding="UTF-8", xml_declaration=True)
    if sketch_dir:
        base_path = str(Path(__file__).parent)
    process = None  # to be tracked in the finally block 
    
    try:
        print('basepathhh: ', base_path)
        process = subprocess.Popen(['python', os.path.join(base_path,"script.py"), sketch_dir], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate(timeout=30)  # Set a timeout for process completion
        
        if process.returncode != 0:  # Check if the process was successful
            print('Failed to execute script.py: %s' % stderr.decode())
            return None
    except subprocess.TimeoutExpired:
        print("Script execution exceeded the time limit and will be terminated.")
        if process:
            process.terminate()
    except Exception as e:
        print('An error occurred: %s' % e)
        return None
    finally:
        # Explicitly terminate the process if still running
        if process and process.poll() is None:  # Check if process is still running
            process.terminate()  # Use terminate as a softer option than kill
            process.wait()  # Wait for the process to clean up properly

    try:
        with codecs.open(sketch_path, 'wb+', encoding='utf-8') as sketch_f:
            sketch_f.write(sketch_code)
    except Exception as e:
        print('Error: %s project file could not be created !!!' % e)
        return None

    return sketch_path

def build_sketch_path(sketch_dir, sketch_name):
    """Create the Arduino Sketch folder required for a valid Sketch.
    If a valid directory is provided, it creates the Arduino sketch folder
    (if it does not exists already) and returns a string pointing to the
    sketch file path.
    :return: unicode string with full path to the sketch file.
    Return None indicates an error has occurred.
    """
    sketch_path = None
    if os.path.isdir(sketch_dir):
            sketch_path = os.path.join(sketch_dir,'Src', sketch_name + '.c')
    else:
        print('The sketch directory "%s" does not exists !!!' % sketch_dir)
    return sketch_path
