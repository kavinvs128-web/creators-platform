# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy remaining source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]