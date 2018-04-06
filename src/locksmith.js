'use strict'

const FORM = 'FORM'
const GET = 'GET'
const { Observable } = require('rxjs')

const _ = require('lodash')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


async function unlockForm(page, key) {
  const { url, form } = key
  const { value, selector, wait_ms: waitMS = 300 } = form
  const { user_id: userId, password } = value
  const {
    user_id: userIdSelector,
    password: passwordSelector,
    submit: submitSelector,
    user_id_dom_index = 0,
    password_dom_index = 0,
    submit_dom_index = 0
  } = selector

  await page.goto(url, {waitUntil: 'networkidle2'})
  await sleep(waitMS)

  const ele = async (selector, domIndex) => (await page.$$(selector))[domIndex]

  const userIdDom = await ele(userIdSelector, user_id_dom_index)
  const passwordDom = await ele(passwordSelector, password_dom_index)
  const submitDom = await ele(submitSelector, submit_dom_index)

  await userIdDom.type(userId, {delay: 100})
  await passwordDom.type(password, {delay: 100})
  await submitDom.click()

  await sleep(waitMS)

  return true
}

async function unlockGet(page, key) {
  const { url, wait_ms: waitMS = 300 } = key

  await page.goto(url, {waitUntil: 'networkidle2'})

  await sleep(waitMS)

  return true
}

async function unlock(page, keys) {
  await Observable
    .from(keys)
    .concatMap((key) => {
      const { type } = key

      switch (_.upperCase(type)) {
        case FORM:
          return unlockForm(page, key)
        case GET:
          return unlockGet(page, key)
        default:
          return Promise.reject(`Unknown key type: ${type}`)
      }
    })
    .reduce(_.concat, [])
    .toPromise()

  return true
}

module.exports = { unlock }