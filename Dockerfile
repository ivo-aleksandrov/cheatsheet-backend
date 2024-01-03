# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend directory to the working directory
COPY . .

# Expose port 6969
EXPOSE 6969

# Command to start the Node.js backend
CMD ["npm", "start"]
