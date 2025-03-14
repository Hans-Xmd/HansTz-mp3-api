# Use official Node.js image from Docker Hub
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to avoid unnecessary re-installation of dependencies on every change
COPY package*.json ./

# Install npm dependencies
RUN npm install && npm install ytdl-core


# Copy the rest of the application code into the container
COPY . .

# Expose port 3000 to access the app
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
