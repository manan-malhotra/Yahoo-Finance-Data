FROM ghcr.io/puppeteer/puppeteer:22.14.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]