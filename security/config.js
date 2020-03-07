const env = require('dotenv')
env.config()
module.exports = {
  port: process.env.PORT,
  laravel: process.env.LARAVEL_URL,
  nuxt: process.env.NUXT_URL,
  client: process.env.CLIENT_ID,
  secret: process.env.SECRET_KEY
}
