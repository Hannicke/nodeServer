// 许多人都熟悉 address 或 A record 类型，这种
// 记录类型把 IPv4 区域映射到一个域名（前一个项目定义的）。而 canonical name
// 或 CNAME 记录允许你为 A record 或另外一个 CNAME 创建一个别名，如 www.
//   example.com 可能是 A record 类型域名 example.com 的别名。MX 记录指向使用
// SMTP 的邮件域名服务器。当你发送 email 到 person@domain.com 时，domain.com
// 的 MX 记录会告诉你的邮件服务器该把邮件发往哪里。Text 记录，或称为 TXT，
// 是依附在域名上的记录，它可以用作各种用途。DNS 库支持的最后一种类型是
// service，或称为 SRV 记录，它的作用是在特定域名下说明有哪些服务可用。
var dns = require('dns');
dns.resolve('yahoo.com', 'A', function (e, r) {
  if (e) {
    console.log(e);
  }
  console.log(r);
});

//  resolve() 和 resolveMx()
dns.resolve('example.com', 'MX', function (e, r) {
  if (e) {
    console.log(e);
  }
  console.log(r);
});
dns.resolveMx('example.com', function (e, r) {
  if (e) {
    console.log(e);
  }
  console.log(r);
});

// 用 lookup() 查询单个 A 记录
// 参数是域名、IP 类型（4 或 6）和回调函数。但是，
// 与 dns.resovle() 不同，它永远只返回一个地址。如果你没有传入地址，它会默
// 认是网络设备接口的当前设置
dns.lookup('google.com', 4, function (e, a) {
  console.log(a);
});
