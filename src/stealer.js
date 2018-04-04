'use strict'

const puppeteer = require('puppeteer')
const crypto = require('crypto')
const { unlock } = require('./locksmith')

const NO_SANDBOX = !!process.env.NO_SANDBOX

let browser = undefined
let isBrowserReady = false

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function steal({ url, selector, dom_index: domIndex = 0, viewport, wait_ms: waitMS = 100 }, keys = undefined) {
  if (!isBrowserReady) {
    throw 'Puppeteer browser is not ready please try again in a bit!'
  }

  const page = await browser.newPage()

  if (keys) {
    await unlock(page, keys)
  }

  await page.goto(url, {waitUntil: 'networkidle0'})
  await page.setViewport(viewport)

  await sleep(waitMS)

  const elements = await page.$$(selector)
  const ele = elements[domIndex]

  const randomFilename = crypto.randomBytes(5).toString('hex')
  const path = `${randomFilename}.png`

  await ele.screenshot({ path })

  page.close()

  return path
}

async function birth() {
  await kill(true)
  const launchOptions = NO_SANDBOX ? {args: ['--no-sandbox']} : null

  browser = await puppeteer.launch(launchOptions)
  isBrowserReady = true
}

async function kill(silently = false) {
  if (!isBrowserReady || !browser) {
    if(!silently) {
      console.warn('No browser to kill yet. you can try again in a bit')
    }
    return
  }

  await browser.close()
  isBrowserReady = false
}

birth()
  .then(() => console.log('the browser has created!'))
  .catch(console.error)

module.exports = { steal, kill }