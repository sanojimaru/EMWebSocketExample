class WebSocketClient
    @ws = null

    constructor: (options) ->
        @ws = new WebSocket(options.server)
        @ws.onmessage = (event) -> options.received event
        @ws.onopen = ->
            debug "Connected"
            this.send "Connected client"
        @ws.onclose = -> debug "Closed"
        @ws.onerror = (error) ->
            debug "Error: #{error}"
            options.error error if options.error

    send: (msg) ->
        @ws.send msg
        console.debug "Send: #{msg}"

client = new WebSocketClient
    server: "ws://localhost:8080",
    received: (event) -> $('#msg').prepend "<p>#{event.data}</p>"

$('#input').on 'keydown',  (event) ->
    if event.keyCode == 13
        client.send $('#input').val()
        $('#input').val('')

debug = (str) -> console.debug str
