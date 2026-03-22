FROM node:20.17.0-alpine3.19 as base

# Stage 1: Build the application
FROM base as builder
WORKDIR /home/app
COPY package*.json .
COPY jsconfig.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create the final image
FROM base as runner
WORKDIR /home/app

COPY --from=builder /home/app/.next .next
COPY --from=builder /home/app/public ./public
COPY --from=builder /home/app/package*.json ./
COPY --from=builder /home/app/node_modules ./node_modules


RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]


