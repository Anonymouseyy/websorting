let lst = [];
let rects = [];


var sortingArea = {
    canvas : document.getElementById("sorting"),
    start : function() {
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;
        this.context = this.canvas.getContext("2d");
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function start() {
    console.log("starting");
    sortingArea.start();
    lst = generateList(sortingArea.width, sortingArea.height);
    console.log(lst);
    rects = genRects(lst);
    updateRects(rects);
}


function genRects(arr) {
    rectObjs = [];
    arrLen = arr.length;
    rectWidth = sortingArea.width/arrLen;

    for (var i = 0; i < arr.length; i++) {
        rectObj = rect(rectWidth, arr[i], "black", i*rectWidth, sortingArea.height-arr[i]);
        rectObjs.push(rectObj);
    }

    return rectObjs;
}


function updateRects(rects) {
    rects.foreach(function (rect) {rect.update()});
}


function generateList(len, maxNum) {
    var set = new Set();
    var i = 0;

    while (i < len) {
        set.add((Math.random()*maxNum)+1);
    }

    return Array.from(set);
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
