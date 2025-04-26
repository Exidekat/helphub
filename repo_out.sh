#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Directory containing the .js and .css files
FILES_DIR="./"  # Change this to your target directory if different

# Initialize an empty variable to store all file contents
output=""

# Function to copy to clipboard based on OS
copy_to_clipboard() {
    case "$(uname)" in
        Darwin)
            # macOS
            echo -e "$output" | pbcopy
            ;;
        Linux)
            # Linux (requires xclip or xsel)
            if command_exists xclip; then
                echo -e "$output" | xclip -selection clipboard
            elif command_exists xsel; then
                echo -e "$output" | xsel --clipboard --input
            else
                echo "Error: Install 'xclip' or 'xsel' to enable clipboard functionality on Linux."
                exit 1
            fi
            ;;
        CYGWIN*|MINGW*|MSYS*)
            # Windows (Using clip.exe)
            echo -e "$output" | clip.exe
            ;;
        *)
            echo "Unsupported OS: $(uname)"
            exit 1
            ;;
    esac
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Iterate over all .js and .css files in the specified directory, excluding node_modules
while IFS= read -r file; do
    # Add the full file path as a comment to the output
    if [[ "$file" == *.tsx ]]; then
        output+="// $file\n\n"
    elif [[ "$file" == *.css ]]; then
        output+="/* $file */\n\n"
    fi

    # Append the file contents to the output
    file_content=$(cat "$file")
    output+="$file_content\n\n"
done < <(find "$FILES_DIR" -type d -name "node_modules" -prune -o -type f \( -name "*.tsx" -o -name "*.css" \) -print)

# Copy the entire output to the system clipboard
copy_to_clipboard

# Print the entire output to the console
echo -e "$output"

# Print a success message
echo "All .tsx and .css file contents have been copied to the clipboard."
