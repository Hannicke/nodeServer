// http服务器
// var http = require('http')
// var server = http.createServer()
// var handleReq = function (req, res) {
//   res.writeHead(200, {})
//   res.end('hello world')
// }
// server.on('request', handleReq)
// server.listen(9000)

// http客户端
var http = require('http')
var opts  ={
  host: 'www.baidu.com',
  port: 80,
  path: '/',
  method: 'GET'
}

var req = http.request(opts, function (res) {
  console.log(res);
  // HTTP 请求的正文内容实际上是通过 response 对象的数据流获得的
  res.on('data', function (data) {
    console.log(data);
  })
})
req.end()
// 最后需要注意的一点是，需要结束（ end() ）该请求。因为这是一个 GET 请求，
// 所以我们并不会往服务器发送任何数据。但对于其他的 HTTP 方法，比如 PUT 或
// POST ，你可能需要发送数据。 request 会等待 end() 方法调用后，才初始化 HTTP
// 请求，因为在那之前，它不确定我们是否还会发送数据
