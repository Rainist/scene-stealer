FROM alekzonder/puppeteer:1.2.0

USER node
ENV NODE_ENV=production

RUN mkdir -p /home/node/app

WORKDIR /home/node/app
