# Step 1: Use Node.js image as the base for building the React app
FROM node:16 as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Step 4: Copy the entire application code
COPY . .

# Step 5: Build the React app for production
RUN npm run build

# Step 6: Use Nginx to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
# EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]

# CMD ["non-existent-binary"] # Intentional error