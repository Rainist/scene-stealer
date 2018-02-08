'use strict'

const puppeteer = require('puppeteer');
const crypto = require("crypto");

let browser = undefined
let isBrowserReady = false

async function steal({ url, selector, dom_index: domIndex = 0, viewport }) {
  if (!isBrowserReady) {
    throw 'Puppeteer browser is not ready please try again in a bit!'
  }

  const page = await browser.newPage()

  await page.goto(url, {waitUntil: 'networkidle0'})

  page.setViewport(viewport)
  const elements = await page.$$(selector)
  const ele = elements[domIndex]

  const randomFilename = crypto.randomBytes(5).toString('hex');
  const path = `${randomFilename}.png`

  await ele.screenshot({ path })

  page.close()

  return path
}

async function birth() {
  await kill(true)
  browser = await puppeteer.launch()
  isBrowserReady = true
}

async function kill(silently = false) {
  if (!isBrowserReady || !browser) {
    if(!silently) {
      console.warn('No browser to kill yet. you can try again in a bit')
    }
    return
  }

  await browser.close();
  isBrowserReady = false
}

birth()
  .then(() => console.log('the browser has created!'))
  .catch(console.error)

module.exports = { steal, kill }