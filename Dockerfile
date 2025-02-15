# Use the official grafana/k6 image as the base image
FROM grafana/k6:latest

# Install Chromium
USER root
RUN apk update && apk add --no-cache chromium

# Set environment variables for k6 browser module
ENV K6_BROWSER_ENABLED=true
ENV K6_BROWSER_HEADLESS=true

# Copy your k6 script into the container
COPY sauce-demo-webApp-performance-profiling.js /sauce-demo-webApp-performance-profiling.js

# Define the command to run the k6 script
CMD ["run", "/sauce-demo-webApp-performance-profiling.js"]
