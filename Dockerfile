# Use the official grafana/k6 image as the base image
FROM grafana/k6:latest

# Copy your k6 script into the container
COPY sauce-demo-webApp-performance-profiling.js /sauce-demo-webApp-performance-profiling.js

# Define the command to run the k6 script
CMD ["run", "/sauce-demo-webApp-performance-profiling.js"]
