# Stage 1: Build the React application
# Use a Node.js image to install dependencies and build the app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
# This means npm install won't re-run if only source code changes
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application for production
# This command depends on your package.json "build" script
RUN npm run build

# Stage 2: Serve the built application with a lightweight web server (Nginx or Caddy)
# Nginx is a very common and efficient choice for serving static files
FROM nginx:alpine

# Copy the built React app from the 'build' stage into Nginx's public serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy a custom Nginx configuration if you have one
# If your React app needs specific routing (e.g., for direct URL access without # in SPA),
# you might need a custom Nginx config. For a basic SPA, the default is often fine,
# or you might need a simple fallback.
# For example, to handle React Router (client-side routing):
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will listen on (default for HTTP is 80)
EXPOSE 80

# Nginx starts automatically when the container runs
CMD ["nginx", "-g", "daemon off;"]