export default class SocketService {
  // 单列设计模式
  static instance = null;
  static get Instance () {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

  // 和服务端连接的socket对象
  ws = null;

  // 存储回调函数
  callbackMapping = {};

  // 标识是否连接成功
  connected = false;

  // 记录重连的次数
  sendRetryCount = 0;

  // 重新连接尝试的次数
  connectRetryCount = 0;

  // 定义连接服务器的方法
  connect () {
    // 连接服务器
    if (!window.WebSocket) {
      // 浏览器不支持websocket
      return console.log('当前浏览器不支持WebSocket！')
    }
    this.ws = new WebSocket('ws://175.27.228.178:3344')

    // 连接成功
    this.ws.onopen = () => {
      console.log('connect success!')
      this.connected = true

      this.connectRetryCount = 0
    }

    // 1.连接失败
    // 2.当连接成功后，服务器关闭
    this.ws.onclose = () => {
      console.log('connect error!')
      this.connected = false

      this.connectRetryCount++
      setTimeout(() => {
        this.connect()
      }, this.connectRetryCount * 500)
    }

    // 服务端发送过来的数据
    this.ws.onmessage = (msg) => {
      // 服务端发送过来的数据
      // console.log(msg.data);
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType
      // 判断回调函数是否存在
      if (this.callbackMapping[socketType]) {
        const action = recvData.action
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callbackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {
          this.callbackMapping[socketType].call(this, recvData)
        } else if (action === 'themeChange') {
          this.callbackMapping[socketType].call(this, recvData)
        }
      }
    }
  }

  // 回调函数的注册
  registerCallBack (socketType, callBack) {
    this.callbackMapping[socketType] = callBack
  }

  // 取消某一个回调函数
  unrRegisterCallBack (socketType) {
    this.callbackMapping[socketType] = null
  }

  // 发送数据
  send (data) {
    // 判断此时是否连接成功
    if (this.connected) {
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
