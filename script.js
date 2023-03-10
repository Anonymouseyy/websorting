let numlst = [];
let rects = [];


$("#length").on("input", function() {
    var length = $("#length").val();
    numlst = generateList(length);
});


var sortingArea = {
    canvas : document.getElementById("sorting"),
    start : function() {
        this.canvas.width = document.documentElement.clientWidth * 0.9;
        this.canvas.height = document.documentElement.clientHeight * 0.8;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateCanvas, 20);
    },
    updateSize : function() {
        this.canvas.width = document.documentElement.clientWidth * 0.9;
        this.canvas.height = document.documentElement.clientHeight * 0.8;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function start() {
    sortingArea.start();
    numlst = generateList(500);
    rects = genRects(numlst);
    updateRects(rects);
}


function updateCanvas() {
    sortingArea.updateSize()
    rects = genRects(numlst);
    updateRects(rects);
}


function genRects(arr) {
    var rectObjs = [];
    arrLen = arr.length;
    var rectWidth = sortingArea.canvas.width/arrLen;

    for (var i = 0; i < arr.length; i++) {
        var rectHeight = arr[i]*sortingArea.canvas.height;
        rectObj = new rect(rectWidth, rectHeight, "black", i*rectWidth, sortingArea.canvas.height-rectHeight);
        rectObjs.push(rectObj);
    }

    return rectObjs;
}


function updateRects(rects) {
    rects.forEach(rect => rect.update());
}


function generateList(len) {
    return Array.from({length: len}, () => Math.random());
}


function rect(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = sortingArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

start()
