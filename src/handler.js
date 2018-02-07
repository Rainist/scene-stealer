'use strict'

const fs = require('fs')
const _ = require('lodash')
const now = require("performance-now")

const { steal } = require('./stealer')
const { store } = require('./storer/gcs')
const { deliver } = require('./deliverer/slack')

async function take (body) {
  const {
    scene,
    storage,
    markets
  } = body

  const start = now()
  const localImagePath = await steal(scene)
  const remoteImageURL = await store(localImagePath, storage) // currently only support gcs
  fs.unlinkSync(localImagePath)
  const slackMarket = markets[0] // currently only support slack

  await deliver(remoteImageURL, slackMarket)

  const end = now()

  const duration = (end-start)
  const durationSec = _.round(duration/1000, 2)

  return {
    precious: remoteImageURL,
    duration_sec: durationSec
  }
}

module.exports = { take }