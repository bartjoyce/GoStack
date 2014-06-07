#!/bin/bash
cd ${0%/*}

# Merge source files
node merge.js --silent

# Compile ROM.js
java -jar "../closurecompiler/compiler.jar" \
--js "gostack.js" \
--js_output_file "gostack.min.js"
