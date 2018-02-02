// 创建 TCP 服务器
let net = require('net')
let chatServer = net.createServer(),
	clientList = []

chatServer.on('connection', function (client) {
	client.name = client.remoteAddress + ':' + client.remotePort
	client.write('Hi ' + client.name + ' ! \n')
	console.log(client.name + ' joined')

	clientList.push(client)

	client.on('data', function (data) {
		// console.log(data)
		broadcast(data, client)
	})
	client.on('end', function () {
		console.log(client.name + ' quit')
		clientList.splice(clientList.indexOf(client), 1)
	})
	client.on('error', function (e) {
		console.log(e)
	})
})

function broadcast (message, client) {
	let cleanup = []
	for (let i = 0; i < clientList.length; i++) {
		if (client !== clientList[i]) {
			if (clientList[i].writable) {
				// 把数据发送给其它客户端
				clientList[i].write(client.name + 'says: ' + message)
			} else {
				cleanup.push(clientList[i])
				clientList[i].destroy()
			}
		}
	}

	// 在写入循环中删除死节点，消除垃圾索引
	for (let i = 0; i < cleanup.length; i++) {
		clientList.splice(clientList.indexOf(cleanup[i]), 1)
	}
}

chatServer.listen(9000)
