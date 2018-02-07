# scene-stealer

An HTTP Interface to take a screenshot via puppeteer of a part of a website and send it to you via slack

## How to spin up

### via npm
```
$ npm i -g scene-stealer
$ scene-stealer
```

### via Docker
https://github.com/Rainist/scene-stealer-docker#as-a-container

### via Kubernetes
https://github.com/Rainist/scene-stealer-docker#as-a-k8s-pod

## How to use
Take a look at [examples](./examples)

## What it's made of

- [nodejs](https://nodejs.org/)
- [puppeteer](https://github.com/GoogleChrome/puppeteer)
- [puppeteer image](https://hub.docker.com/r/alekzonder/puppeteer/)
- [expressjs](http://expressjs.com)
- [@google-cloud/storage](https://github.com/googleapis/nodejs-storage)
- [Slack Webhook](https://api.slack.com/incoming-webhooks)
- and [more](./package.json)

## Contribution
[any contributions are welcome.](https://github.com/rainist/scene-stealer/issues/new)

## License

scene-stealer is MIT licensed.

