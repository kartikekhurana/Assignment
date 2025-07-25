FROM node:18
WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=development
ENV ROLLUP_NO_BINARY=true

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173


CMD ["npm", "run", "dev"]