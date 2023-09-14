
# Node version
FROM node:16

# Make work directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
COPY . ./

# NPM install & build
RUN npm install

# POR define
EXPOSE 80

# Set ENV variables
ENV PORT=80
ENV DB_URL=mongodb+srv://mamun_swe:KG1UciyRKg0ZcJTG@cluster0-lkz2b.mongodb.net/research-top?retryWrites=true&w=majority
ENV JWT_SECRET=4USX5FPTttnpYYOT3NPNFSTqAi3LLh2b

# Open CMD & execute command
CMD [ "npm", "start"]