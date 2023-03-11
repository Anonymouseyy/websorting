let numlst = [];
let rects = [];
let length = 500;
let mode = document.cookie;
let sun = "fa-sharp fa-solid fa-sun";
let moon = "fa-sharp fa-solid fa-moon";


$("#length").on("input", function() {
    length = $("#length").val();

    if (length < 1) {
        length = 1
    } else if (length > 20000) {
        length = 20000
    }   
    
    numlst = generateList(length);
});


$("#generate").on("click", function() {
    numlst = generateList(length);
});


$("#dark-light").on("click", function() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    if (mode == "light") {
        mode = "dark";
        document.cookie = mode;
        document.getElementById("sorting").style.borderColor = "white";
        document.getElementById("dark-light-icon").className = sun;
    } else {
        mode = "light";
        document.cookie = mode;
        document.getElementById("sorting").style.borderColor = "black";
        document.getElementById("dark-light-icon").className = moon;
    }
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
    numlst = generateList(length);
    rects = genRects(numlst);
    updateRects(rects);
    if (mode == "dark") {
        var element = document.body;
        element.classList.toggle("dark-mode");
        document.getElementById("sorting").style.borderColor = "white";
        document.getElementById("dark-light-icon").className = sun;
    }
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
    var color = "black";

    if (mode == "dark") {
        color = "#e8e8e8";
    }

    for (var i = 0; i < arr.length; i++) {
        var rectHeight = arr[i]*sortingArea.canvas.height;
        rectObj = new rect(rectWidth, rectHeight, color, i*rectWidth, sortingArea.canvas.height-rectHeight);
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
