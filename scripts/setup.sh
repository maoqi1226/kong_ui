#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

check_docker() {
  docker info > /dev/null 2>&1
}

start_docker_macos() {
  echo -e "${YELLOW}Starting Docker...${NC}"
  open -a Docker

  # wait for docker to start，max 30 attempts，wait 2s each time
  local max_attempts=30
  local attempt=0
  while ! check_docker && [ $attempt -lt $max_attempts ]; do
    sleep 2
    attempt=$((attempt + 1))
    echo -e "${YELLOW}Waiting for Docker to start... ($attempt/$max_attempts)${NC}"
  done

  if check_docker; then
    echo -e "${GREEN}Docker started successfully!${NC}"
  else
    echo -e "${RED}Error: Docker failed to start. Please manually start Docker and try again.${NC}"
    exit 1
  fi
}

echo -e "${BLUE}Starting Kong Manager test environment deployment...${NC}"

# 0. Check Docker Desktop
echo -e "${BLUE}Step 0: Checking for Docker Desktop status...${NC}"
if ! check_docker; then
    echo -e "${YELLOW}Docker is not running. Try to start Docker...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
      start_docker_macos
    else
      echo -e "${RED}Error: Do not support auto start Docker on this platform, please manually start Docker.${NC}"
      exit 1
    fi
else
    echo -e "${GREEN}Docker is running.${NC}"
fi

# 1. Read port、url; check port
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo -e "${RED}Error: .env file not found!${NC}"
    exit 1
fi

PORT=$KONG_PORT
URL=$KONG_HOST:$PORT
echo -e "${BLUE}Step 1: Checking for port $PORT availability...${NC}"
echo -e "${YELLOW}Stopping existing Kong containers (if any)...${NC}"
docker-compose down 2>/dev/null || true
# check port free
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}Port $PORT is used by a non-Docker process. Attempting to terminate it...${NC}"
    set +e
    lsof -ti :$PORT | xargs kill -9 > /dev/null 2>&1
    sleep 2
    set -e
    echo -e "${GREEN}Process on port $PORT has been terminated.${NC}"
else
    echo -e "${GREEN}Port $PORT is available.${NC}"
fi

# 2. Start Docker
echo -e "${BLUE}Step 2: Starting Kong Manager Docker...${NC}"
if ! output=$(docker-compose up -d 2>&1); then
    echo -e "${RED}Docker Compose failed with error:${NC}"
    echo "$output"
    echo -e "${RED}Please check Docker and try again.${NC}"
    exit 1
fi

# 3. Wait for Kong Manager ready
# Check status code every 5s, max 12 retries (1 minute total)
MAX_RETRIES=12
COUNT=0

echo -e "${BLUE}Step3: Waiting for Kong Manager to respond at $URL...${NC}"
set +e

while [ $COUNT -lt $MAX_RETRIES ]; do
    # -s: silent, -o /dev/null: discard output, -w: output the status code
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL || true)

    if [ "$STATUS" == "200" ]; then
        echo -e "${GREEN}Success: Kong Manager is up and running! (Status: 200)${NC}"
        set -e
        exit 0
    fi

    COUNT=$((COUNT + 1))
    echo -e "${YELLOW}Attempt $COUNT/$MAX_RETRIES: Service not ready yet (Status: $STATUS). Retrying in 5s...${NC}"
    sleep 5
done

# 4. Timeout
echo -e "${RED}Error: Timeout waiting for Kong Manager to start (exceeded 1 minute).${NC}"
echo -e "${RED}Please check logs using: docker-compose logs${NC}"
exit 1