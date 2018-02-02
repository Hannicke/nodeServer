// const http = require('http')
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end('Hello World\n')
// }).listen(9000, '127.0.0.1')
// console.log('Server running at http://127.0.0.1:9000/')

// Express 增加了两样 http 模块所没有的功能：根据 HTTP 请求的不同方法进行过滤，根据特定的 URL 进行过滤
const app = require('express')()
const bodyParser = require('body-parser')

app.listen(9000)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let tweets = []
function acceptsHtml (header) {
  console.log(header);
  var accepts = header.split(',')
  for (i = 0; i < accepts.length; i += 1) {
    if (accepts[i] === 'text/html') { return true }
  }
  return false
}

app.get('/', function (req, res) {
  res.send('Welcome to Node Twitter')
})

app.post('/send', function (req, res) {
  if (req.body && req.body.tweet) {
    tweets.push(req.body.tweet)

    if (acceptsHtml(req.headers['content-type'])) {
      // 状态码: 302
      // "location": "/"
      res.redirect('/', 302)
    } else {
      res.send({ status: 'OK', message: 'Tweet received' })
    }

  } else {
    res.send({ status: 'NOK', message: 'No Tweet received' })
  }
})
app.get('/tweets', function (req, res) {
  res.send(tweets)
})

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
})
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})
