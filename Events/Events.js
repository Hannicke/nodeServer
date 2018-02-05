// util 模块的 inherits 方法
// 能够把 EventEmitter 类的方法添加到我们创建的 Server 类中。这意味着所有
// Server 的新实例都能够使用 EventEmitter 的方法
var util = require('util'),
  EventEmitter = require('events').EventEmitter;
var Server = function () {
  console.log('init');
};
util.inherits(Server, EventEmitter);
var s = new Server();
// 这些事件是针对某个实例的，不存在全局的事件
s.on('abc', function () {
  console.log('abc');
});
// 触发一个事件
s.emit('abc')

// 当调用 emit 时，除了事件的名称，你可以传入任意数目的参数。例 4 - 4 中包含了 3
// 个这样的参数。这些参数都将传给该监听该事件的函数。比如，从 http 服务器接
// 收到 request 请求时，你会收到两个参数： req 和 res 。当 request 事件被触发
// 时，这些参数会作为第二个和第三个参数传给 emit 函数
// s.emit('abc', a, b, c);

// 触发器里如何调用事件
// 需要注意的是，Node 调用
// 这两种方法时都直接使用了 this 参数。这意味着事件监听器被调用的时候是在
// EventEmitter 的上下文中，而不是它们原始的位置。
if (arguments.length <= 3) {
  // 速度快
  // 如果传给 emit() 的参数只有 3 个或更少，该方法就会使用捷径，直接调用 call 方法
  handler.call(this, arguments[1], arguments[2]);
} else {
  // 速度慢
  // 否则，它就会使用较慢的 apply 方法，以数组的方式传递所有的参数
  var args = Array.prototype.slice.call(arguments, 1);
  handler.apply(this, args);
}
