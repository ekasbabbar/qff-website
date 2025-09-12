#!/bin/bash

echo "🔒 Starting Qiskit Fall Fest 2024 HTTPS Server..."
echo

# Check if certificates exist
if [ ! -f "certs/server.key" ]; then
    echo "❌ SSL certificates not found!"
    echo "🔧 Generating certificates first..."
    echo
    node generate-certs.js
    echo
    if [ $? -ne 0 ]; then
        echo "❌ Failed to generate certificates!"
        exit 1
    fi
fi

echo "🚀 Starting HTTPS server..."
node server-https.js

