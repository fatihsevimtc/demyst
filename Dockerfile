# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Expose the port your application will run on (if applicable)
# EXPOSE 3000

# Define the command to run your application
CMD ["node", "index.js"]
