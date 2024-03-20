#!/bin/bash

echo "# Required" > .env
echo "NODE_ENV=development" >> .env
echo "PORT=3099" >> .env
echo "SERVER_DATABASE_URL=postgres://root:root@localhost:5442/api" >> .env
echo "SERVER_AUTHENTICATION_SECRET=your-secret" >> .env
echo "SERVER_CLIENT_BASE_URL=http://localhost:8099" >> .env
echo "SERVER_BASE_URL=http://localhost:3099" >> .env
echo "SERVER_AUTHENTICATION_TOKEN_METHOD=header" >> .env

echo "# Optional" >> .env
echo "SERVER_AUTHENTICATION_TOKEN_METHOD=header" >> .env
echo "SERVER_OPENAI_API_KEY=" >> .env
echo "SERVER_GOOGLE_CLIENT_ID=" >> .env
echo "SERVER_EMAIL_MAILPIT_HOST=" >> .env
echo "SERVER_EMAIL_MAILPIT_PORT=" >> .env
echo "SERVER_EMAIL_MAILJET_API_KEY=" >> .env
echo "SERVER_EMAIL_MAILJET_SECRET_KEY=" >> .env