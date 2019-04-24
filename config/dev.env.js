'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"/php"',
  API_ROOT:'"/api"',
  SOCKET_HOST: '"ws://127.0.0.1:2000"'
})
