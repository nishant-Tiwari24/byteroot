#!/bin/bash

if [ -f .env ]; then
  source .env
fi

PORT_DEFAULT="8099"
COLOR_GREEN="\033[0;32m"
COLOR_RESET="\033[0m"

# Check if WEB_PORT is defined
if [ ! -z "$WEB_PORT" ]; then
  # Start Next.js on WEB_PORT
  echo "$COLOR_GREEN\nWeb starting on port $WEB_PORT\n$COLOR_RESET"

  next dev --port $WEB_PORT

else
  echo "$COLOR_GREEN\nWeb starting on port $PORT_DEFAULT$COLOR_RESET"
  echo "${COLOR_GREEN}You can change the starting port using the \$WEB_PORT environment variable.\n$COLOR_RESET"

  next dev --port $PORT_DEFAULT

fi
