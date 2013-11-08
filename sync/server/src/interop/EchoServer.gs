package interop

uses org.jeromq.ZMQ
uses java.nio.charset.Charset
uses java.lang.Thread
uses java.lang.System

class EchoServer {
  static final var NUMBER_OF_THREADS = 1
  static final var LISTEN_ON_ADDR = "tcp://*:5555"
  static final var MSG_CHARSET = Charset.defaultCharset()
  static final var SLEEP_TIME = 300

  static function main () {
    print("Creating context")
    var context = ZMQ.context(NUMBER_OF_THREADS)

    //  Socket to talk to clients
    print("Creating socket")
    var socket = context.socket(ZMQ.REP)

    using(socket) {
      print("Binding to *:5555")
      socket.bind (LISTEN_ON_ADDR);
      print("Ready")

      while(!Thread.currentThread().isInterrupted()) {
        var reply = socket.recv(0);
        //print("Received " + ": [" + new String(reply, MSG_CHARSET) + "]")

        //  Create a "Hello" message
        var req = "world"

        // Send the message
        socket.send(req.getBytes(MSG_CHARSET), 0)

        //Thread.sleep(SLEEP_TIME) //  Do some 'work'
      }
    }
    context.term()
  }
}
