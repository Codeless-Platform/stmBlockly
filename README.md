# stmBlockly
stmBlockly is a visual programming editor for bluepill board. It is based on Google's [Blockly][1], which has been forked to generate STM32 code.

The `stmblocklyServer` Python package initialises a local server to be able to compile and load the C code using the [STM Cube IDE][2].

![Screenshot 2024-06-28 012810](https://github.com/Codeless-Platform/stmBlockly/assets/101985923/c4197de6-6e7c-4ff1-b8c9-c861a25c969b)



## Features
* Drag-and-drop blocks to construct STM32 programs visually.
* Designed specifically for STM32 microcontrollers.
* Automatically converts Blockly blocks into C/C++ code.
* Useful "code block warnings"
* Compiles & uploads the code into bluepill board


Currently tested under Windows with Python 3.10.5


## Cloning the repository
Please note that there are submodules in the repository that need initialisation. So, to correctly clone the stmBlockly repository:

```
git clone https://github.com/Codeless-Platform/stmBlockly.git
cd stmBlockly
git submodule update --init --recursive
```


## Installing
* [STM Cube IDE version 1.15.x or higher][2].
* [STM Cube Programmer][3]
* [GCC compiler][4]
* [Arm Gcc compiler][5]

#### "Core version" (Python server only)
If you prefer, the core software can be used by running only the Python server, which loads the web interface on your local browser (Chrome recommended).
Clone this repository, initialise all submodules, and execute:

```
python start.py
```

## Credit
This project has been inspired by [arduBlockly][6].

Blockly original source is Copyright of Google Inc. [https://developers.google.com/blockly/][1]. 

[1]: https://developers.google.com/blockly/
[2]: https://www.st.com/en/development-tools/stm32cubeide.html 
[3]: https://www.st.com/en/development-tools/stm32cubeprog.html 
[4]: https://gcc.gnu.org/
[5]: https://developer.arm.com/downloads/-/gnu-rm
[6]: https://github.com/carlosperate/ardublockly
