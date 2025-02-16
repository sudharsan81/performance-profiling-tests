#!/bin/sh

# Check if K6_CLOUD_API_TOKEN is set
if [ -z "$K6_CLOUD_API_TOKEN" ]; then
  echo "K6_CLOUD_API_TOKEN is not set. Exiting."
  exit 1
fi

# Check if K6_CLOUD_PROJECT_ID is set
if [ -z "$K6_CLOUD_PROJECT_ID" ]; then
  echo "K6_CLOUD_PROJECT_ID is not set. Exiting."
  exit 1
fi

# Perform k6 cloud login
k6 cloud login --token $K6_CLOUD_API_TOKEN

# Check if login was successful
if [ $? -ne 0 ]; then
  echo "k6 cloud login failed. Exiting."
  exit 1
fi

# Run k6 tests and send the results to grafana k6 cloud
k6 run ./performance-profiling-tests.js --out cloud