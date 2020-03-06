import Echo from 'laravel-echo'

export default () => {
  window.io = require('socket.io-client')

  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: process.env.laravel_endpoint + ':' + process.env.laravel_echo_port,
    disableStats: true,
    encrypted: true,
    authEndpoint: process.env.laravel_echo_endpoint,
    auth: {
      headers: {
        Authorization: window.localStorage.getItem('auth._token.password_grant')
      }
    }
  })
}
