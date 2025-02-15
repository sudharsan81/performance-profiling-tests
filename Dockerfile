FROM grafana/k6:latest

# Install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set up k6
RUN curl -sL https://k6.io/docs/install.sh | sh
RUN sudo cp /usr/local/bin/k6 /usr/bin/k6

# Set up Node.js (if needed)
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Install k6 browser module
RUN npm install -g k6@browser
