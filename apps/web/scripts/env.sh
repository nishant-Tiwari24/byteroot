#!/bin/bash

echo "# Required" > .env
echo "PORT=8099" >> .env
echo "API_BASE_URL=http://localhost:3099" >> .env
echo "TOOL_BASE_URL=http://localhost:3002" >> .env
echo "MARBLISM_MICHELANGELO_ACTIVE=true" >> .env
