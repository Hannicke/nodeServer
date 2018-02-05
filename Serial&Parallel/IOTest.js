// Node 中的无序并行 I / O
// fs.readFile('foo.txt', 'utf8', function (err, data) {
//   console.log(data);
// };
// fs.readFile('bar.txt', 'utf8', function (err, data) {
//   console.log(data);
// };


// 顺序串行 I / O
// 嵌入回调函数来完成顺序请求
// server.on('request', function (req, res) {
//   // 从 memcached 里获取 session 信息
//   memcached.getSession(req, function (session) {
//     // 从 db 获取信息
//     db.get(session.user, function (userData) {
//       // 其他 Web 服务调用
//       ws.get(req, function (wsData) {
//         // 渲染页面
//         page = pageRender(req, session, userData, wsData);
//         // 输出响应内容
//         res.write(page);
//       });
//     });
//   });
// });

// 回调函数中的命名函数
// server.on('request', getMemCached(req, res) {
//   memcached.getSession(req, getDbInfo(session) {
//     db.get(session.user, getWsInfo(userData) {
//       ws.get(req, render(wsData) {
//         // 渲染页面
//         page = pageRender(req, session, userData, wsData);
//         // 输出响应内容
//         res.write(page);
//       });
//     });
//   });
// });

// 用声明函数把代码分离 在回调函数中封装
// server.on('request', function (req, res) {
//   var render = function (wsData) {
//     page = pageRender(req, session, userData, wsData);
//   };
//   var getWsInfo = function (userData) {
//     ws.get(req, render);
//   };
//   var getDbInfo = function (session) {
//     db.get(session.user, getWsInfo);
//   };
//   var getMemCached = function (req, res) {
//     memcached.getSession(req, getDbInfo);
//   };
// }


// 当在函数间共享对象时，调用堆栈上靠前的函数会影响这些对象的状态，并传递给后续函数
// 在函数间传递修改后的内容
var AwesomeClass = function () {
  this.awesomeProp = 'awesome!'
  this.awesomeFunc = function (text) {
    console.log(text + ' is awesome!')
  }
}
var awesomeObject = new AwesomeClass()
function middleware (func) {
  oldFunc = func.awesomeFunc
  func.awesomeFunc = function (text) {
    text = text + ' really'
    oldFunc(text)
  }
}
function anotherMiddleware (func) {
  func.anotherProp = 'super duper'
}
function caller (input) {
  input.awesomeFunc(input.anotherProp)
}
middleware(awesomeObject)
anotherMiddleware(awesomeObject)
caller(awesomeObject)  // super duper really is awesome!
