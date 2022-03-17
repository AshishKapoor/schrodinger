FROM node:lts as dependencies
WORKDIR /ui
COPY package.json package-lock.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /ui
COPY . .
COPY --from=dependencies /ui/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /ui
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /ui/next.config.js ./
COPY --from=builder /ui/public ./public
COPY --from=builder /ui/.next ./.next
COPY --from=builder /ui/node_modules ./node_modules
COPY --from=builder /ui/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]