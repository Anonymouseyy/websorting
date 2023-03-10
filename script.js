let numlst = [];
let rects = [];


var sortingArea = {
    canvas : document.getElementById("sorting"),
    start : function() {
        this.canvas.width = this.canvas.style.width;
        this.canvas.height = this.canvas.style.height;
        this.context = this.canvas.getContext("2d");
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function start() {
    sortingArea.start();
    numlst = generateList(Math.floor(sortingArea.canvas.width), sortingArea.canvas.height);
    rects = genRects(numlst);
    console.log(sortingArea.canvas.width);
    updateRects(rects);
}


function genRects(arr) {
    rectObjs = [];
    arrLen = arr.length;
    rectWidth = sortingArea.canvas.width/arrLen;

    for (var i = 0; i < arr.length; i++) {
        rectObj = new rect(rectWidth, arr[i], "black", i*rectWidth, sortingArea.canvas.height-arr[i]);
        rectObjs.push(rectObj);
    }

    return rectObjs;
}


function updateRects(rects) {
    rects.forEach(rect => rect.update());
}


function generateList(len, maxNum) {
    return Array.from({length: len}, () => Math.floor(Math.random() * 40));
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
