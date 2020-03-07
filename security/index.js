const express = require('express')
const axios = require('axios')
const server = require('./config.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(
  cors({
    origin: server.nuxt
  }),
  bodyParser.json()
)
app.get('/', function(req, res) {
  res.send('Security!')
})
app.post('/login', function(req, res) {
  var body = {
    username: req.body.username,
    password: req.body.password,
    grant_type: 'password',
    client_id: server.client,
    client_secret: server.secret,
    scope: '*'
  }
  axios
    .post(server.laravel + '/oauth/token', body, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then(
      (response) => {
        res.send(response)
      },
      (reject) => {
        res.send('Access denied')
      }
    )
})
app.listen(server.port, 'localhost')
