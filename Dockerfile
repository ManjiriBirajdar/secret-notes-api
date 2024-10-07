# Build the application

# node version
FROM node:18-alpine

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN pnpm run build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "run", "start:prod"]