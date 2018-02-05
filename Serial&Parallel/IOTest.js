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
// var AwesomeClass = function () {
//   this.awesomeProp = 'awesome!'
//   this.awesomeFunc = function (text) {
//     console.log(text + ' is awesome!')
//   }
// }
// var awesomeObject = new AwesomeClass()
// function middleware (func) {
//   oldFunc = func.awesomeFunc
//   func.awesomeFunc = function (text) {
//     text = text + ' really'
//     oldFunc(text)
//   }
// }
// function anotherMiddleware (func) {
//   func.anotherProp = 'super duper'
// }
// function caller (input) {
//   input.awesomeFunc(input.anotherProp)
// }
// middleware(awesomeObject)
// anotherMiddleware(awesomeObject)
// caller(awesomeObject)  // super duper really is awesome!


// 尝试在回调函数中捕获错误但失败了
// var http = require('http')
// var opts = {
//   host: 'sfnsdkfjdsnk.com',
//   port: 80,
//   path: '/'
// }
// try {
//   http.get(opts, function (res) {
//     console.log('Will this get called?')
//   })
// }
// catch (e) {
//   console.log('Will we catch an error?')
// }

// 通过 error 事件捕捉 I/O 错误
// var http = require('http')
// var opts = {
//   host: 'dskjvnfskcsjsdkcds.net',
//   port: 80,
//   path: '/'
// }
// var req = http.get(opts, function (res) {
//   console.log('This will never get called')
// })
// req.on('error', function (e) {
//   console.log('Got that pesky error trapped')
// })


// 使用集群来分发任务
// cluster 工作的原理是每一个 Node 进程要么是主进程，要么成为工作进程。当
// 一个主进程调用 cluster.fork() 方法时，它会创建与主进程一模一样的子进程，
// 除了两个让每个进程可以检查自己是父 / 子进程的属性以外。在主进程中（Node
// 运行时直接调用的那个脚本）， cluster.isMaster 会返回 true ，而 cluster.
// isWorker 会 返 回 false 。 而 在 子 进 程， cluster.isMaster 返 回 false ， 且
// cluster.isWorker 返回 true 。
// var cluster = require('cluster');
// var http = require('http');
// var numCPUs = require('os').cpus().length;
// if (cluster.isMaster) {
//   // 创建工作进程
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on('death', function (worker) {
//     console.log('worker ' + worker.pid + ' died');
//     cluster.fork();
//   });
// } else {
//   // 工作进程创建 http 服务器
//   http.Server(function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
//   }).listen(8000);
// }

// 通过消息传递来监控工作进程状态
// var cluster = require('cluster');
// var http = require('http');
// var numCPUs = require('os').cpus().length;
// var rssWarn = (12 * 1024 * 1024)
//   , heapWarn = (10 * 1024 * 1024)
// if (cluster.isMaster) {
//   for (var i = 0; i < numCPUs; i++) {
//     var worker = cluster.fork();
//     worker.on('message', function (m) {
//       if (m.memory) {
//         // 当子进程使用了过多内存时，主进程会发送一条警告到日志中去
//         if (m.memory.rss > rssWarn) {
//           console.log('Worker ' + m.process + ' using too much memory.')
//         }
//       }
//     })
//   }
// } else {
//   // 服务器
//   http.Server(function (req, res) {
//     res.writeHead(200);
//     res.end('hello world\n')
//   }).listen(8000)
//   // 每秒报告一次状态
//   setInterval(function report () {
//     process.send({ memory: process.memoryUsage(), process: process.pid });
//   }, 1000)
// }

// 杀死僵尸进程
// 在这个脚本中，我们给主进程也添加了类似工作进程的定时器。现在，每当一个工
// 作进程向主进程发送报告时，主进程都会记录报告的时间。大约每隔一秒，主进程
// 就会检查所有的工作进程，看看是否有某个进程已经超过 5 秒未更新状态（因为超
// 时是以微秒为单位，所以我们用的是 > 5000 ）。如果发现这样的进程，主进程将把阻
// 塞的工作进程杀掉并重启。为了让这个流程更加高效，我们把创建工作进程的代码
// 放到一个小程序里，这样就能在同一个地方为不同情景提供启动工作，无论是创建
// 新的工作进程还是重启死亡进程。
// 我们也对 HTTP 服务器做了一个小改动，让每个请求有 1 / 200 的概率会出错。你可
// 以运行一下脚本，看看出现错误的可能。如果你同时从多个地方发起并行请求，就
// 能看到整个代码是如何运行的。这些彻底分隔的 Node 程序通过消息传递来进行交
// 互。因为主进程是简单的小程序，不会卡住，所以它在任何情况下都能够一直检查
// 其他进程。
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var rssWarn = (50 * 1024 * 1024)
  , heapWarn = (50 * 1024 * 1024)
var workers = {}
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    createWorker()
  }
  setInterval(function () {
    var time = new Date().getTime()
    for (pid in workers) {
      if (workers.hasOwnProperty(pid) && workers[pid].lastCb + 5000 < time) {
        console.log('Long running worker ' + pid + ' killed')
        workers[pid].worker.kill()
        delete workers[pid]
        createWorker()
      }
    }
  }, 1000)
} else {
  // 服务器
  http.Server(function (req, res) {
    // 打乱 200 个请求中的 1 个
    if (Math.floor(Math.random() * 200) === 4) {
      console.log('Stopped ' + process.pid + ' from ever finishing')
      while (true) { continue }
    }
    res.writeHead(200);
    res.end('hello world from ' + process.pid + '\n')
  }).listen(8000)
  // 每秒钟报告一次状态
  setInterval(function report () {
    process.send({
      cmd: "reportMem", memory: process.memoryUsage(),
      process: process.pid
    })
  }, 1000)
}

function createWorker () {
  var worker = cluster.fork()
  console.log('Created worker: ' + worker.pid)
  // 允许开机时间
  workers[worker.pid] = { worker: worker, lastCb: new Date().getTime() - 1000 }
  worker.on('message', function (m) {
    if (m.cmd === "reportMem") {
      workers[m.process].lastCb = new Date().getTime()
      if (m.memory.rss > rssWarn) {
        console.log('Worker ' + m.process + ' using too much memory.')
      }
    }
  })
}
