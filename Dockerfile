FROM devendranathashok/node-bff:1.0.0

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000 443

RUN npm run build

CMD [ "npm", "start" ]