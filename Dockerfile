# Use the official Node.js 16 image as the base image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install latest version of npm
RUN npm install -g npm@9.6.5

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app is listening on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
