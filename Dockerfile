# Install dependencies only when needed
FROM --platform=linux/amd64 node:16-alpine

ENV PORT 9001

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
# RUN npm cache clean --force



# Copying source files
COPY . /usr/src/app

# RUN npm install sharp
# RUN npm install

# # Building app
# RUN npm run build
EXPOSE 9001

# Running the app
CMD "npm" "run" "start"
