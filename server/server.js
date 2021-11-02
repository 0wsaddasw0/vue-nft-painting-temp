var express = require("express");
var expressWs = require("express-ws");
const Canvas = require('canvas');
const path = require('path');
const fs = require('fs');
var app = express();
const canvas = new Canvas.Canvas(480, 480);
let ctx = canvas.getContext('2d');
expressWs(app);  //将 express 实例上绑定 websock 的一些方法
app.ws("/ws", function (ws, req) {
    ws.on("message", function (data) {
        // console.log(JSON.parse(data)["image"]["图层1"][0]["image"]);
        // let data = JSON.parse(data);
        // ws.send("这是第三次发送信息");
        // ws.send("这是第4次发送信息");
        // ws.send("这是第5次发送信息");
        getImages(JSON.parse(data), 20);
    });
});

app.listen(3000);
console.log("Listening on port 3000...");

function descartes(nums) {
    return nums.reduce((a, b) => {
        let m = a.map(item => b.map(i => [i].concat(item)))
        return m.reduce((c, d) => c.concat(d), [])
    })
}

function getCombinationMode(imageData) {
    let imageSubs = []
    let combinationMode = [];
    // let repeatArrs = [];
    for (let i = 9; i >= 0; i--) {
        let arr = [];
        let imageNames = imageData["imageName"][i]["imageName"];

        for (let j = 0; j < imageNames.length; j++) {
            arr.push(j);
            // let repeatArr = imageNames.filter((item)=>{
            //     let arr = imageNames.filter((i)=>item==i)
            //     return arr.length>1
            // })
            // if(repeatArr!=[]){
            //     repeatArrs.push(repeatArr);
            // }
        }
        if (arr.length > 0) {
            imageSubs.push(arr);
        }else{
            imageSubs.push([0]);
        }
    }
    // console.log(repeatArrs);
    combinationMode = descartes(imageSubs);
    return combinationMode
}


function hasRepeat(item,imageNames){
    let arr = imageNames.filter((i)=>item==i)
            return arr.length>1
        }
    return arr.length>1
}
function getRepeatIndexArray(imageNames,item){
    let indexArray = [];
    for(let i = 0;i<imageNames.length;i++){
        if(imageNames[i]==item){
            indexArray.push(i);
        }
    }
}
function getImages(imageData, size) {
    clearCanvas(size);
    let fileId = genID(8);
    let combinationMode = getCombinationMode(imageData)
    console.log(combinationMode);
    for (let j = 0 ; j < combinationMode.length;j++) {
        for (let i = 9; i >= 0; i--) {
            let levelName = imageData["imageName"][i]["levelName"];
            if (imageData["image"][levelName]) {
                drawOneImage(imageData["image"][levelName][combinationMode[j][i]], size, ctx);
            }
            base64Data = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, ""),
            dataBuffer = new Buffer(base64Data, 'base64');
        }
        fs.writeFileSync( `out${fileId}/${j}out.png `, dataBuffer, function (err) {
                
        });
    }

}
function genID(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}
function drawOneImage(imageData, size, ctx) {
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            let k = j * 24 + i;
            if (imageData['image'][k] == 1) {
                draw(imageData['color'][k], imageData['alpha'][k], i, j, size, ctx);
            }
        }
    }
}

function draw(color, alpha, positionX, positionY, size, ctx) {
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fillRect(size * positionX, size * positionY, size, size);
}



function clearCanvas(size) {
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            ctx.clearRect(size * i, size * j, size, size);
        }
    }
}