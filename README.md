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

## Known issues
- 1.0.0: Didn't consider well addressing reusing puppeteer broweser. So it's very leaky so don't use it.
- 1.0.1: [This part](https://github.com/Rainist/scene-stealer/blob/612ba9b30d805199ea3c18acb59a1976c5ed784d/src/stealer.js#L27) doesn't seem to release the memory of the page so therefore there is a memory leak for several MB every time it steals the scene.
  > So WIP to fix this issue

## Contribution
[any contributions are welcome.](https://github.com/rainist/scene-stealer/issues/new)

## License

scene-stealer is MIT licensed.

