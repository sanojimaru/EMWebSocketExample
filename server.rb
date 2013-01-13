require 'em-websocket'

SERVER_OPTION = {
  host: "127.0.0.1",
  port: 8080,
  debug: true,
}

EventMachine.run do
  @channel = EM::Channel.new

  EventMachine::WebSocket.start(SERVER_OPTION) do |ws|

    ws.onopen do
      sid = @channel.subscribe { |msg| ws.send msg }

      ws.onmessage { |msg|
        @channel.push "<#{sid}>: #{msg}"
      }

      ws.onclose {
        @channel.unsubscribe(sid)
      }

      @channel.push "#{sid} connected!"
    end

  end

  puts "Server started"
end
