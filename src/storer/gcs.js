'use strict'

const _ = require('lodash')
const moment = require('moment')
const Storage = require('@google-cloud/storage')


async function store(imagePath, { type, bucket: bucketName, project_id: projectId, credentials, path, how_long: howLong }) {
  const storage = new Storage({
    projectId: projectId,
    credentials
  })

  const notailPath = _.trimEnd(_.trim(path),'/')
  const timestamp = moment().format('YYYY-MM-DD_hh:mm')
  const destination = `${notailPath}/${timestamp}.png`

  const bucket = storage.bucket(bucketName)

  const { unit = 'days', value = 1} = howLong

  const files = await bucket.upload(imagePath, { destination })
  const file = files[0]

  console.log(`${imagePath} uploaded to ${bucketName}.`)

  const options = {
    expires: moment().add(value, unit).format('MM-DD-YYYY'),
    action: 'read'
  }

  const signedUrls = await bucket.file(file.name).getSignedUrl(options)
  return signedUrls[0]
}

module.exports = { store }
