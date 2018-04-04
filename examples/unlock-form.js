'use strict'

const rp = require('request-promise')

const keys = [
  {
    type: "FORM",
    url: "https://target-website.com/login",
    form: {
      value: {
        user_id: "your-id",
        password: "your-password"
      },
      selector: {
        user_id: "input#user-id",
        password: "input#password",
        submit: "button[type=\"submit\"]"
      }
    }
  }
]

const scene = {
  url: 'https://target-website.com',
  selector: 'body',
  dom_index: 0,
  viewport: {width: 900, height: 700}
}

const storage = {
  type: 'gcs',
  project_id: 'your_project_id',
  bucket: 'your_bucket',
  credentials: {
    client_email: 'your@google-service.gserviceaccount.com',
    private_key: '-----YOUR PRIVATE KEY STRING -----'
  },
  path: 'test/folder',
  how_long: {
    unit: 'years', // units from here https://momentjs.com/docs/#/get-set/set/
    period: 2
  }
}

const markets = [{
  type: 'slack',
  webhook_url: 'https://hooks.slack.com/services/your/webhook/url',
  title: 'title',
  text: 'text',
  footer: 'footer'
}]

const body = { markets, storage, scene, keys }

(async () => {
  const host = 'http://scene-stealer.server:port' // replace with your scene-stealer server/container url

  const options = {
    method: 'POST',
    uri: `${host}/take`,
    body,
    json: true
  }

  const result = await rp(options)

  console.log(result)
  // and check your slack channel if the message has arrived with the screenshot
})()
