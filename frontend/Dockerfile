FROM node:7.8.0
ADD . /app
WORKDIR /app
RUN npm install
RUN npm install 'axios'
EXPOSE 3000
CMD ["npm", "start"]