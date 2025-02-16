FROM grafana/k6:master-with-browser

WORKDIR /tests

# Set mandatory environment variables for k6 browser module
ENV K6_BROWSER_ENABLED=true
ENV K6_BROWSER_HEADLESS=true

COPY . .

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]