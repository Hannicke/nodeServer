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
// GET
// var http = require('http')
// var opts  ={
//   host: 'www.baidu.com',
//   port: 80,
//   path: '/',
//   method: 'GET'
// }

// var req = http.request(opts, function (res) {
//   console.log(res);
//   // res.setEncoding('utf8');
//   // HTTP 请求的正文内容实际上是通过 response 对象的数据流获得的
//   res.on('data', function (data) {
//     console.log(data);
//   })
// })
// req.end()
// 最后需要注意的一点是，需要结束（ end() ）该请求。因为这是一个 GET 请求，
// 所以我们并不会往服务器发送任何数据。但对于其他的 HTTP 方法，比如 PUT 或
// POST ，你可能需要发送数据。 request 会等待 end() 方法调用后，才初始化 HTTP
// 请求，因为在那之前，它不确定我们是否还会发送数据

// POST
var options = {
  host: 'www.example.com',
  port: 80,
  path: '/submit',
  method: 'POST'
};
var req = http.request(options, function (res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});
req.write("my data");
req.write("more of my data");
req.end();
// 增 加 了 http.ClientRequest.write() 方 法。
// 可以用这个方法发送上行数据流。之前解释过，它要求你显式地调用 http.
//   ClientRequest.end() 方法来表示数据发送完毕。每当调用 ClientRequest.
//     write() 时，数据会马上上传（不会被缓存），但服务器在 ClientRequest.end()
// 调用之前是不会响应你的数据请求的


// 用 URL 模块解析 URL
// > var URL = require('url');
// > var myUrl = "http://www.nodejs.org/some/url/?with=query&param=that&are=
// awesome#alsoahash";
//   > myUrl
// 'http://www.nodejs.org/some/url/?with=query&param=that&are=awesome
// #alsoahash'
//   > parsedUrl = URL.parse(myUrl);
// {
//   href: 'http://www.nodejs.org/some/url/?with=query&param=that&are=
//   awesome#alsoahash'
//     , protocol: 'http:'
//       , slashes: true
//         , host: 'www.nodejs.org'
//           , hostname: 'www.nodejs.org'
//             , hash: '#alsoahash'
//               , search: '?with=query&param=that&are=awesome'
//                 , query: 'with=query&param=that&are=awesome'
//                   , pathname: '/some/url/'
// }
// > parsedUrl = URL.parse(myUrl, true);
// {
//   href: 'http://www.nodejs.org/some/url/?with=query&param=that&are=
//   awesome#alsoahash'
//     , protocol: 'http:'
//       , slashes: true
//         , host: 'www.nodejs.org'
//           , hostname: 'www.nodejs.org'
//             , hash: '#alsoahash'
//               , search: '?with=query&param=that&are=awesome'
//                 , query:
//   {
//     with: 'query'
//       , param: 'that'
//         , are: 'awesome'
//   }
// , pathname: '/some/url/'
// }
// >


// querystring
// querystring 模块提供了从 query
// 字符串中轻松提取对象的方法。它的主要功能有 parse 和 decode ，还包括一些内
// 部辅助函数，如 escape 、 unescape 、 unescapeBuffer 、 encode 和 stringify 。
// 如果你有一个 query 字符串，你可以使用 parse 来把它变成一个对象

// querystring 另外一个重要的部分是 encode （例 4 - 15）。该函数把输入的 key -
//   value 格式的对象转换成 query 字符串的格式。如果你需要使用 HTTP 请求（特别是
// POST 数据），这会非常方便。你可以在操作时使用 JavaScript 对象，然后在需要进
// 行数据传输时再轻松地把它编码成需要的格式。所有的 JavaScript 对象都可以使用，
// 但最好是使用的对象只包含需要的数据，因为 encode 方法会把对象所有的属性都
// 添加进来。但是，如果属性的值不是 string、Boolean 或 number 中的一种，它就不
// 能被序列化，返回的内容中关键字（ key ）对应的值会是空的。
// > var myObj = {
//   'a': 1, 'b': 5, 'c': 'cats', 'func': function () {
//     console.
//       log('dogs')
//   }
// }
// > qs.encode(myObj);
// 'a=1&b=5&c=cats&func='
// >
