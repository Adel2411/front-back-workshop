# 1. Use official Node image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the app
COPY . .

# 6. Build the TypeScript code
RUN npm run build

# 7. Expose port
EXPOSE 4000

# 8. Start the app
CMD ["npm", "start"]
