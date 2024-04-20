import shutil
import os
from pathlib import Path
import sys

def copy_directory(src, dst):
    # Ensure source directory exists
    if not os.path.exists(src):
        print(f"Source directory {src} does not exist.")
        return

    # Ensure destination directory exists, if not, create it
    if not os.path.exists(dst):
        os.makedirs(dst)

    # Copy contents using os.listdir to iterate through items
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            if not os.path.exists(d):
                os.makedirs(d)
            copy_directory(s, d)
        else:
            shutil.copy2(s, d)

def main():
    # Check if destination path is provided as a command-line argument
    if len(sys.argv) < 2:
        print("Usage: python script.py <destination_path>")
        return

    # Set the base directory relative to the current script location or another specific path
        # Get the base path of the current file
    base_path = Path(__file__).parent

    # Define the relative path
    relative_path = base_path.parent

    # Define source and destination paths relative to the base_path
    source_path = relative_path / "STMCubeProject"
    destination_path = Path(sys.argv[1])  # Take destination path from the first command-line argument

    # Ensure the paths are absolute
    source_path = source_path.resolve()
    destination_path = destination_path.resolve()

    copy_directory(str(source_path), str(destination_path))
    print("Copy completed successfully.")

if __name__ == '__main__':
    main()
