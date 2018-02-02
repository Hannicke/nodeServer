// const http = require('http')
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end('Hello World\n')
// }).listen(9000, '127.0.0.1')
// console.log('Server running at http://127.0.0.1:9000/')

// Express 增加了两样 http 模块所没有的功能：根据 HTTP 请求的不同方法进行过滤，根据特定的 URL 进行过滤
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.listen(9000)

let tweets = []

app.get('/', function (req, res) {
  res.send('Welcome to Node Twitter')
})

app.post('/send', bodyParser.json(), function (req, res) {
  console.log(req);
  if (req.body && req.body.tweet) {
    tweets.push(req.body.tweet)
    res.send({ status: 'OK', message: 'Tweet received' })
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
