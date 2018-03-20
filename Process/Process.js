// process 模块是全局的，并且可以一直通过变量 process 获得

// 事件循环在 exit 事件之后就不会再运行了，因此只有那些不需要回调函数的代码才会被执行
// 因此 setTimeout() 里的代码永远不会执行
// process.on('exit', function () {
//   setTimeout(function () {
//     console.log('This will not run');
//   }, 100);
//   console.log('Bye.');
// });


// 通过 uncaughtException 事件捕获异常
// 首先，我们为 uncaughtException 创建了一个事件监听器。它并非一个智能处理程序，只是简单地把异常输出到标准输出
// 因为它捕获的是一个不存在的函数触发的事件，
// 所以虽然 Node 程序不会退出，但是标准的执行流程会被打断。我们知道所有的
// JavaScript 都会执行一遍，然后任何回调函数都可能在其对应监听的事件触发时被
// 调用到。但在这个例子中，因为 nonexistentFunc() 抛出了异常，所以在它之后
// 的代码都不会执行下去。然而，在此之前已经运行的代码会继续下去，也就是说，
// setTimeout() 依然会被调用
// process.on('uncaughtException', function (err) {
//   console.log('Caught exception: ' + err);
// });
// setTimeout(function () {
//   console.log('This will still run.');
// }, 500);
// // 故意导致异常，并且不捕获它。
// nonexistentFunc();
// console.log('This will not run.');

//如果其中一个回调函数出现了异常未被捕获，将导致该事件的其他回调函数终止执行。
// 但是一个事件实例中的未捕获异常不会影响其他事件
// var http = require('http');
// var server = http.createServer(function (req, res) {
//   res.writeHead(200, {});
//   res.end('response');
//   badLoggingCall('sent response');
//   console.log('sent response');
// });
// process.on('uncaughtException', function (e) {
//   console.log(e);
// });
// server.listen(8080);


// 捕捉 Node 进程的信号量
// 如果你在程序运行的时候按下 Ctrl - C，
// 操作系统会发送 SIGINT 信号给 Node 程序，这会被 SIGINT 事件处理器所捕获
// 开始从标准输入读取内容，所以程序不会退出
// process.stdin.resume();
// process.on('SIGINT', function () {
//   console.log('Got SIGINT. Press Control-D to exit.');
// });
// 因为任何时候都能使用 process ，所以 process.stdin 也会为所有的 Node 进程
// 初始化。但它一开始是处于暂停状态，这时候 Node 可以对它进行写入操作，但是
// 你不能从它读取内容。在尝试从 stdin 读数据之前，需要先调用它的 resume() 方法。
// Node 会为此数据流填入供读取的缓存，并等待你的处理，这样可以
// 避免数据丢失
// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// process.stdin.on('data', function (chunk) {
//   process.stdout.write('data: ' + chunk);
// });
// process.stdin.on('end', function () {
//   process.stdout.write('end');
// });

// process.stdin.resume();
// process.stdin.pipe(process.stdout);
// process.stderr 永远是 UTF - 8 编码的数据流。不需要设置编码
// 格式，你写入 process.stderr 的所有数据都会被当做 UTF - 8 来处理。而且，你不
// 能更改编码格式

// 用 process.nextTick() 往事件循环队列里插入回调函数
// > var http = require('http');
// > var s = http.createServer(function (req, res) {
// ...res.writeHead(200, {});
// ...res.end('foo');
// ...console.log('http response');
// ...process.nextTick(function () { console.log('tick') });
// ... });
// > s.listen(8000);
// >
// > http response
// tick
// http response
// tick
// 这个例子创建了一个 HTTP 服务器。服务端监听请求事件的函数调用 process.
// nextTick() 创建了一个回调函数。无论我们向 HTTP 服务器发起多少次请求，tick
// 每次都会出现在事件循环的下一个轮回中

// 在其他代码异常之后， nextTick()继续工作
// process.on('uncaughtException', function (e) {
//   console.log(e);
// });
// process.nextTick(function () {
//   console.log('tick');
// });
// process.nextTick(function () {
//   iAmAMistake();
//   console.log('tock');
// });
// process.nextTick(function () {
//   console.log('tick tock');
// });
// console.log('End of 1st loop');
// 运行结果
// Enki: ~$ node process - next - tick.js
// End of 1st loop
// tick
// {
//   stack: [Getter / Setter],
//     arguments: ['iAmAMistake'],
//       type: 'not_defined',
//         message: [Getter / Setter]
// }
// tick tock
// Enki: ~$
// 当 Node 运行这个程序的时候，它先处理了所有的代码，并且包括了
// 输出 'End of 1st loop' 。然后它按顺序调用了 nextTice() 中的回调函数。第
// 一个 'tick' 输出后，我们抛出了异常，因为遇到了下一个 tick 中故意安放的错误。
// 这个错误导致进程触发了一个 uncaughtException 事件，并使得我们的函数把
// 错误输出到终端上。因为抛出了异常， 'tock' 并没有在终端打印出来，但 'tick
// tock' 依然打印了，这是因为每次调用 nextTick() 的时候，回调函数都是在隔离
// 中创建的。你可能会想到将要被触发的事件是在事件循环当前遍历的内部执行的。
// 而与其他事件相比， nextTick() 则是在事件循环的遍历开始前被调用的。最后，
// 其他事件在事件循环内按顺序执行。


// 用 exec() 调用 ls
// var cp = require('child_process');
// cp.exec('ls -l', function (e, stdout, stderr) {
//   if (!e) {
//     console.log(stdout);
//     console.log(stderr);
//   }
// });

//child_process.exec() 的默认配置对象
// var options = {
//   encoding: 'utf8',
//   timeout: 0,
//   maxBuffer: 200 * 1024,
//   killSignal: 'SIGTERM',
//   setsid: false,
//   cwd: null,
//   env: null
// };
