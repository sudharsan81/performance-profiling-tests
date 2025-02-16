FROM grafana/k6:master-with-browser

WORKDIR /tests

# Set environment variables for k6 browser module
ENV K6_BROWSER_ENABLED=true
ENV K6_BROWSER_HEADLESS=true

COPY . .

# Use an entrypoint script to handle the K6_CLOUD_API_TOKEN
COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]