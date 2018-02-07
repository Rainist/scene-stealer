'use strict'

const { steal } = require('../src/stealer')
const assert = require('assert')
const fs = require('fs')

const scene = {
  url: 'https://google.com',
  selector: 'img#hplogo',
  dom_index: 0,
  viewport: {width: 900, height: 700}
}

describe('test stealer', () => {
  it('steal a scene from google.com', done => {
    steal(scene)
      .then(imgPath => {
        assert(imgPath)
        fs.unlinkSync(imgPath)

        done()
      })
  }).timeout(10000)
})

module.exports = { scene }