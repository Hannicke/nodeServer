// 创建可读文件流
// var fs = require('fs');
// var filehandle = fs.readFile('data.txt', function (err, data) {
//   console.log(data)
// });

// 使用缓冲池模型来读取完整的流数据
// stream 是个抽象的数据流
// var spool = "";
// stream.on('data', function (data) {
//   spool += data;
// });
// stream.on('end', function () {
//   console.log(spool);
// });
