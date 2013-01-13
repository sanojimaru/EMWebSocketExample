"use strict";

var class;
class.WebSocketClient = function(server, options) {
    this.server = server;
    this.ws = null;

    this.connection = function() {
        if (!this.ws) {
            this.createWebSocket();
        }

        return this.ws;
    }

    this.createWebSocket = function() {
        var ws = this.ws = new WebSocket(this.server);
        ws.onerror = function() {

        }
    }
}

$(document).ready(function(){
    function debug(str){ $("#debug").append("<p>"+str+"</p>"); };

    ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = function(evt) { $("#msg").append("<p>"+evt.data+"</p>"); };
    ws.onclose = function() { debug("socket closed"); };
    ws.onopen = function() {
        debug("connected...");
        ws.send("hello server");
    };
});


//var socket = io.connect('http://127.0.0.1:8080');
//var timer;

//$(document).ready(function() {
  //$('#text').keydown(function(event) {
    //// エンターキーで発言をサーバに送信する
    //if (event.keyCode === 13) {
      //// イベント名'all'でメッセージをサーバに送信する
      //socket.emit('all', {
        //action: 'post',
        //user: $('#user').val(),
        //css: $('#css').val(),
        //text: $('#text').val()
      //});

    //// タイピング中というステータスをサーバに送信する
    //} else {
      //// イベント名'others'でメッセージをサーバに送信する
      //socket.emit('others', {
        //action: 'typing',
        //user: $('#user').val()
      //});
    //}
  //});

  //// サーバからのイベント'msg'を受信する
  //socket.on('msg', function(data) {
    //switch (data.action) {
      //case 'post': // 発言の描画
        //$('<li></li>').text(data.user + ': ' + data.text)
                      //.attr('style', data.css)
                      //.appendTo('body');
        //break;
      //case 'typing': // タイピング中ステータスの描画
        //$('#typing').text(data.user + 'さんがタイピング中です...');
        //clearTimeout(timer);
        //timer = setTimeout(function() { $('#typing').empty(); }, 3000);
        //break;
    //}
  //});
//});
