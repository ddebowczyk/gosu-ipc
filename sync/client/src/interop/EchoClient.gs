package interop

uses org.jeromq.ZMQ
uses java.nio.charset.Charset
uses java.lang.System

class EchoClient {
  static final var NUMBER_OF_THREADS = 1
  static final var SERVER_ADDR = "tcp://localhost:5555"
  static final var MSG_CHARSET = Charset.defaultCharset()
  static final var NUM_OF_MSG = 50000

  static function main () {
    var context = ZMQ.context(NUMBER_OF_THREADS)

    //  Socket to talk to server
    print("Connecting to hello world server")

    var socket = context.socket(ZMQ.REQ)
    using(socket){
      socket.connect (SERVER_ADDR)
      print("Connected")

      final var appStart = System.currentTimeMillis()
      for(requestNbr in 0..NUM_OF_MSG) {
        var req = "Hello"
        //print("Sending Hello " + requestNbr )
        socket.send(req.getBytes(MSG_CHARSET), 0)

        var reply = socket.recv(0)
        //print("Received " + new String (reply, MSG_CHARSET) + " " + requestNbr)
      }
      final var appTime = System.currentTimeMillis() - appStart
      print("Took ${appTime} ms")
      var tp = (NUM_OF_MSG * 1000.0) / appTime
      print("Throughput was ${tp as int} msg/sec")
    }
    context.term()
  }
}
