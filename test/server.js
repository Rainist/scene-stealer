'use strict'

const request = require('supertest')
const assert = require('assert')
const { scene } = require('./stealer')
const _ = require('lodash')

const envKeyMap = {
  client_email: 'GCS_CLIENT_EMAIL',
  private_key: 'GCS_PRIVATE_KEY',
  bucket: 'GCS_BUCKET',
  project_id: 'GCS_PROJECT_ID',
  webhook_url: 'SLACK_WEBHOOK_URL'
}

describe('test server', () => {
  let server

  before(() => {
    const app = require('../src/server')
    server = app.listen(5999, () => {});
  })

  after(() => {
    server.close()
  })

  it('check env', done => {
    _.chain(envKeyMap).values().each(key => {
      const val = process.env[key]
      assert(val, `${key} env var is not set`)
    }).value()

    done()
  })

  it('responds to /', done => {
    request(server)
      .get('/')
      .expect(200, done)
  })

  const req = (() => {
    const {
      client_email,
      private_key,
      bucket,
      project_id,
      webhook_url
    } = _.mapValues(envKeyMap, key => {
      const val = process.env[key]
      if (val) {
        return process.env[key].replace(/\\n/g, '\n')
      }
    })

    const storage = {
      type: 'gcs',
      project_id,
      bucket,
      credentials: {
        client_email,
        private_key
      },
      path: 'test/folder',
      how_long: {
        unit: 'years',
        value: 2
      }
    }

    const markets = [{
      type: 'slack',
      webhook_url,
      title: 'title',
      text: 'text',
      footer: 'footer'
    }]

    return { markets, storage, scene }
  })()

  it('responds to /take', done => {
    request(server)
      .post('/take')
      .send(req)
      .expect(200, done)
  }).timeout(20000)
})