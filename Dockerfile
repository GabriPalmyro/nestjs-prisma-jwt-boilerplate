FROM node

WORKDIR /usr/src/api

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm","run","start:prod"] 