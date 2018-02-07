#!/usr/bin/env node

'use strict'
const port = process.env.APP_SERVER_PORT || 3000
const server = require('./src/server')

server.listen(port, () => console.log(`Scene Stealer is listening on port ${port}!`))
