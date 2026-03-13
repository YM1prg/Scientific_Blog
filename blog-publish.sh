#!/bin/bash

# If no argument is provided, default to the local vault directory
TARGET="$1"
if [ -z "$TARGET" ]; then
    TARGET="content/obsidian-vault"
    echo "No file provided. Syncing default directory: $TARGET"
fi

# Path to the python script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PYTHON_SCRIPT="$SCRIPT_DIR/sync_obsidian.py"

# Run the python script
python3 "$PYTHON_SCRIPT" "$TARGET"
