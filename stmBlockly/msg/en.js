var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "English",
  title: "stmblockly",
  blocks: "Blocks",
  /* Menu */
  open: "Open",
  save: "Save",
  deleteAll: "Delete All",
  settings: "Settings",
  documentation: "Documentation",
  reportBug: "Report Bug",
  examples: "Examples",
  /* Settings */
  compilerLocation: "Compiler Location",
  compilerLocationDefault: "Compiler Location unknown",
  sketchFolder: "Projecg Folder",
  sketchFolderDefault: "Project Folder unknown",
  arduinoBoard: "STM Board",
  arduinoBoardDefault: "STM Board unknown",
  comPort: "COM Port",
  comPortDefault: "COM Port unknown",
  defaultIdeButton: "Default IDE Button",
  defaultIdeButtonDefault: "IDE options unknown",
  language: "Language",
  languageDefault: "Language unknown",
  sketchName: "Project Name",
  /* Arduino console output */
  arduinoOpMainTitle: "STM cube IDE output",
  arduinoOpWaiting: "Waiting for the IDE output...",
  arduinoOpUploadedTitle: "Successfully Uploaded File",
  arduinoOpVerifiedTitle: "Successfully Verified File",
  arduinoOpOpenedTitle: "File opened in IDE",
  arduinoOpOpenedBody: "The File should be loaded in the STM Cube IDE.",
  arduinoOpErrorTitle: "There has been an error",
  arduinoOpErrorIdContext_0: "No error.",
  arduinoOpErrorIdContext_1: "Build or Upload failed.",
  arduinoOpErrorIdContext_2: "File not found.",
  arduinoOpErrorIdContext_3: "Invalid command line argument.",
  arduinoOpErrorIdContext_4: "Preference passed to 'get-pref' flag does not exist.",
  arduinoOpErrorIdContext_5: "Not Clear, but STM Cube IDE sometimes errors with this.",
  arduinoOpErrorIdContext_50: "Unexpected error code from STM Cube IDE",
  arduinoOpErrorIdContext_51: "Could not create file",
  arduinoOpErrorIdContext_52: "Invalid path to internally created file",
  arduinoOpErrorIdContext_53: "Unable to find STM cube IDE<br>" +
                              "The compiler directory has not been set correctly.<br>" +
                              "Please ensure the path is correct in the Settings.",
  arduinoOpErrorIdContext_54: "What should we do with the file?<br>" +
                              "The launch IDE option has not been set.<br>" +
                              "Please select an IDE option in the Settings.",
  arduinoOpErrorIdContext_55: "Serial Port unavailable<br>" +
                              "The Serial Port is not accessible.<br>" +
                              "Please check if the STM board is correctly connected to the PC and select the Serial Port in the Settings.",
  arduinoOpErrorIdContext_56: "Unknown STM Board<br>" +
                              "The STM Board has not been set.<br>" +
                              "Please select the appropriate STM Board from the settings.",
  arduinoOpErrorIdContext_52: "Unexpected server error.",
  arduinoOpErrorIdContext_64: "Unable to parse sent JSON.",
  arduinoOpErrorUnknown: "Unexpected error",
  /* Modals */
  noServerTitle: "stmblockly app not running",
  noServerTitleBody: "<p>For all the stmblockly features to be enabled, the stmblockly desktop application must be running locally on your computer.</p>" +
                     "<p>If you are using an online version you will not be able to configure the settings.</p>" +
                     "<p>Installation instruction can be found in the <a href=\"https://github.com/carlosperate/ardublockly\">Ardublockly repository</a>.</p>" +
                     "<p>If you have stmblockly already installed, make sure the application is running correctly.</p>",
  noServerNoLangBody: "If the stmblockly application is not running the language cannot be fully changed.",
  addBlocksTitle: "Additional Blocks",
  /* Alerts */
  loadNewBlocksTitle: "Load new blocks?",
  loadNewBlocksBody: "Loading a new XML file will replace the current blocks from the workspace.<br>" +
                     "Are you sure you want to proceed?",
  discardBlocksTitle: "Delete blocks?",
  discardBlocksBody: "There are %1 blocks on the workspace.<br>" +
                     "Are you sure you want to delete them?",
  invalidXmlTitle: "Invalid XML",
  invalidXmlBody: "The XML file was not successfully parsed into blocks. Please review the XML code and try again.",
  /* Tooltips */
  uploadingSketch: "Uploading file into STM...",
  uploadSketch: "Upload file to the STM",
  verifyingSketch: "Verifying file...",
  verifySketch: "Verify the file",
  openingSketch: "Opening file in the STM Cube IDE...",
  openSketch: "Open file in IDE",
  notImplemented: "Function not yet implemented",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Cancel",
  return: "Return",
  /* Cards */
  arduinoSourceCode: "Main file",
  blocksXml: "Blocks XML",
  /* Toolbox Categories*/
  catLogic: "Logic",
  catLoops: "Loops",
  catMath: "Math",
  catText: "Text",
  catVariables: "Variables",
  catFunctions: "Functions",
  catInputOutput: "Input/Output",
  catTime: "Time/Clock",
  catInterfaces: "Interfaces",
  catComms: "Comms",
  catSensors: "Sensors/Acutators",
};
