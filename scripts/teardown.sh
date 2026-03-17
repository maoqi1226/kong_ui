#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step: Starting teardown and environment cleanup...${NC}"

# 1. Capture Docker logs
LOG_DIR="results/logs"
if [ ! -d "$LOG_DIR" ]; then
    mkdir -p "$LOG_DIR"
fi

echo -e "${YELLOW}Saving container logs to $LOG_DIR/docker-compose.log...${NC}"
# Save both stdout and stderr to the log file
docker-compose logs --no-color > "$LOG_DIR/docker-compose.log" 2>&1 || true

# 2. Shut down Docker services
echo -e "${YELLOW}Shutting down Docker services...${NC}"
docker-compose down -v --remove-orphans

# 3. Final message
echo -e "${GREEN}Teardown complete. All Docker services have been shut down and cleaned.${NC}"