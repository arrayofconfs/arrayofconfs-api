const browserSync = require('browser-sync')
const connectBrowserSync = require('connect-browser-sync')
const express = require('express')
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()

const app = express()

if (app.get('env') === 'development') {
  const bs = browserSync.create()
  bs.watch('swagger.yaml').on('change', bs.reload)
  bs.init({
    logSnippet: false,
    server: [pathToSwaggerUi, '.']
  })
  app.use(connectBrowserSync(bs))
}

app.use(express.static(pathToSwaggerUi))
app.use('/swagger.yaml', express.static(__dirname + '/swagger.yaml'))

app.listen(3000)
