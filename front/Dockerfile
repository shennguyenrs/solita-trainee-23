FROM node:18.15-slim
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN npm run build
ENTRYPOINT ["npm", "start"]
