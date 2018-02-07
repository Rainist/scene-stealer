'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const handler = require('./handler')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Hello! I'm scene-stealer")
})

app.post('/take', (req, res) => {
  const { body } = req

  handler.take(body)
    .then((json) => {
      res.json(json)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

module.exports = app
