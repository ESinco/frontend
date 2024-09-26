FROM debian:12

ENV NODE_VERSION=20.x

# Install curl and gnupg2
RUN apt-get update && \
    apt-get install -y curl gnupg2 && \
    curl -fsSL https://deb.nodesource.com/setup_"${NODE_VERSION}" | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Show versions of Node.js and npm
RUN node --version && npm --version

# Expose port 3000, Render will map it to the dynamic port
EXPOSE 3000

# Set the working directory to /app
WORKDIR /app

# Copy the project files into /app
COPY . /app

# Run npm setup-prod script to install, build, and start
CMD ["npm", "run", "setup-prod"]
