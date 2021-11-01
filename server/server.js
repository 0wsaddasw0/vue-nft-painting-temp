var express = require("express");
var expressWs = require("express-ws");
var Canvas = require('canvas');
var fs = require("fs")
var app = express();
expressWs(app);  //将 express 实例上绑定 websock 的一些方法
app.ws("/ws", function (ws, req) {
    ws.on("message", function (data) {
        console.log(data);
        // ws.send("这是第三次发送信息");
        // ws.send("这是第4次发送信息");
        // ws.send("这是第5次发送信息");
        getImages(ws,data);
    });
});
app.listen(3000);
console.log("Listening on port 3000...");

function getImages(ws, data) {
    var Image = Canvas.Image
    var canvas = new Canvas(500, 200)
    var ctx = canvas.getContext('2d');
    ctx.font = '30px "Microsoft YaHei"';
    ctx.rotate(.1);
    ctx.fillText("我写程序生成100万个!", 50, 100);
    ctx.fillText("怕不怕", 50, 150);
    var te = ctx.measureText('Awesome!');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();
    fs.writeFile('out.png', canvas.toBuffer());
}

