FROM node:24.14.0@sha256:5a593d74b632d1c6f816457477b6819760e13624455d587eef0fa418c8d0777b

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev:server"]