// 在哈希中使用数据时，可以调用 hash.update() 来生成数据摘要（digest，见例
// 5 - 4）。你可以用更多的数据不停地更新哈希，直到需要把它输出为止。你添加到哈
// 希对象的数据只是简单地追加到前一次传入的数据尾部。要把哈希输出，只需调用
// hash.digest() 方法，这会把所有通过 hash.update() 输入的数据生成摘要并输
// 出。在调用 hash.digest() 之后，就不可以再添加任何输入进去了。
// > var crypto = require('crypto');
// > var md5 = crypto.createHash('md5');
// > md5.update('foo');
// { }
// > md5.digest();
// '-½\u0018ÛLÂø\\íïeOÌÄ¤Ø'
// >
// 注意，输出的摘要看起来有点诡异，这是因为它是以二进制的格式呈现的。通常，
// 摘要是用十六进制打印的，我们可以在调用 hash.digest 的时候传入 'hex' 作为参数

// > var md5 = crypto.createHash('md5');
// > md5.update('foo');
// { }
// > md5.digest();
// '-½\u0018ÛLÂø\\íïeOÌÄ¤Ø'
// > md5.digest('hex');
// Error: Not initialized
//   at[object Context]: 1: 5
//   at Interface.<anonymous>(repl.js: 147: 22)
//   at Interface.emit(events.js: 42: 17)
//   at Interface._onLine(readline.js: 132: 10)
//   at Interface._line(readline.js: 387: 8)
//   at Interface._ttyWrite(readline.js: 564: 14)
//   at ReadStream.<anonymous>(readline.js: 52: 12)
//   at ReadStream.emit(events.js: 59: 20)
//   at ReadStream._emitKey(tty_posix.js: 280: 10)
//   at ReadStream.onData(tty_posix.js: 43: 12)
// > var md5 = crypto.createHash('md5');
// > md5.update('foo');
// { }
// > md5.digest('hex');
// 'acbd18db4cc2f85cedef654fccc4a4d8'
// >
// 当再次调用 hash.digest() 时，我们得到了一个错误。这是因为一旦调用 hash.
//   digest() ， Hash 对象就已经最终确定，而且不能被重用。我们需要创建一个 Hash
// 的新实例来使用，这次得到的十六进制输出更为有用。 hash.digest() 输入的选项
// 包括二进制（默认）、十六进制和 base64 编码

// > var sha1 = crypto.createHash('sha1');
// > sha1.update('foo');
// { }
// > sha1.update('bar');
// { }
// > sha1.digest('hex');
// '8843d7f92416211de9ebb963ff4ce28125932878'
//   > var sha1 = crypto.createHash('sha1');
// > sha1.update('foobar');
// { }
// > sha1.digest('hex');
// '8843d7f92416211de9ebb963ff4ce28125932878'
// >
// 因为数据在 hash.update() 调用时是串联起来的，所以两个示例得到的结果是一样的
