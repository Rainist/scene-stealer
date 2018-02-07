'use strict'

const puppeteer = require('puppeteer');
const crypto = require("crypto");

async function steal({ url, selector, dom_index: domIndex = 0, viewport }) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url, {waitUntil: 'networkidle0'})

  page.setViewport(viewport)
  const elements = await page.$$(selector)
  const ele = elements[domIndex]

  const randomFilename = crypto.randomBytes(5).toString('hex');
  const path = `${randomFilename}.png`

  await ele.screenshot({ path })

  return path
}

module.exports = { steal }