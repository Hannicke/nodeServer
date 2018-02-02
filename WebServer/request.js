const http = require('http'),
  assert = require('assert'),
  querystring = require("querystring")
const opts = {
  host: 'localhost',
  port: 9000,
  path: '/send',
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
}
const postData = querystring.stringify({
  tweet: 'Hello World!'
})

const req = http.request(opts, function (res) {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8')

  let data = ''
  res.on('data', function (d) {  // 响应主体
    data += d
  })

  res.on('end', function () {
    // 利用 assert.strictEqual 函数，我们能对数据data进行“===”级别的一致性检查。
    // 如果检查条件不满足要求，就会抛出异常
    assert.strictEqual(data, '{"status":"OK","message":"Tweet received"}')
  })
})

req.write(postData)
req.end()
