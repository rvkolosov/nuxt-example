import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/laravel-echo', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '53870884',
        webvisor: true,
        clickmap:true,
        // useCDN:false,
        trackLinks:true,
        // accurateTrackBounce:true,
      }
    ],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    'baseURL': process.env.LARAVEL_ENDPOINT,
    'proxyHeaders': false,
    'credentials': false,
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue,
          accent: colors.grey,
          secondary: colors.amber,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  auth: {
    strategies: {
      password_grant: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: 'oauth/token',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: false,
          user: {
            url: 'api/user'
          }
        }
      },
    },
    redirect: {
      login: '/auth/login',
      home: '/',
    },
  },
  env: {
    laravel_endpoint: process.env.LARAVEL_ENDPOINT,
    laravel_echo_port: process.env.LARAVEL_ECHO_PORT,
    laravel_echo_endpoint: process.env.LARAVEL_ECHO_ENDPOINT
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
