# Use an official Node.js image as the base
FROM node:18-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose the port your Express app will listen on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]