'use strict'

const FORM = 'FORM'

const _ = require('lodash')
const Aigle = require('aigle')

Aigle.mixin(_)

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

  await page.goto(url, {waitUntil: 'networkidle0'})

  const ele = async (selector, domIndex) => {
    const eles = await page.$$(selector)
    return eles[domIndex]
  }

  const userIdDom = await ele(userIdSelector, user_id_dom_index)
  const passwordDom = await ele(passwordSelector, password_dom_index)
  const submitDom = await ele(submitSelector, submit_dom_index)

  await userIdDom.type(userId, {delay: 100})
  await passwordDom.type(password, {delay: 100})
  await submitDom.click()

  await sleep(waitMS)

  return page
}

async function unlock(page, keys) {
  await Aigle.forEach(keys, async (key) => {
    const { type } = key

    switch (_.upperCase(type)) {
      case FORM:
        return unlockForm(page, key)
      default:
        return Promise.reject(`Unknown key type: ${type}`)
    }
  })

  return true
}

module.exports = { unlock }