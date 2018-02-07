'use strict'

const rp = require('request-promise')

function asImageAttachment(title, imgPath, footer='screenshot', text='') {
  return {
    attachments: [{
      title,
      text,
      footer,
      image_url: imgPath
    }]
  }
}

function webhook(url) {
  return {
    notify: body => {
      const options = {
        method: 'POST',
        uri: url,
        body: body,
        json: true
      }

      return rp(options)
    }
  }
}

function deliver(imageURL, { type, webhook_url: webhookURL, title, text, footer }) {
  const body = asImageAttachment(title, imageURL, footer, text)
  return webhook(webhookURL).notify(body)
}

module.exports = { deliver }