let numlst = [];
let rects = [];
let highlightedRects = {
    indices: [],
    colors: [],
    clear : function() {
        this.indices = [];
        this.colors = [];
    }
};
let length = 500;
let mode = document.cookie;
let sun = "fa-sharp fa-solid fa-sun";
let moon = "fa-sharp fa-solid fa-moon";
 
if (!mode) {
    mode = "light";
}
 
 
$("#length").on("input", function() {
    length = $("#length").val();
 
    if (length < 1) {
        length = 1;
    } else if (length > 20000) {
        length = 20000;
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
 
// W3 Schoools https://www.w3schools.com/graphics/game_canvas.asp
var sortingArea = {
    canvas : document.getElementById("sorting"),
    start : function() {
        this.canvas.width = document.documentElement.clientWidth * 0.9;
        this.canvas.height = document.documentElement.clientHeight * 0.8;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(function() { updateCanvas(numlst); }, 20);
    },
    updateSize : function() {
        this.canvas.width = document.documentElement.clientWidth * 0.9;
        this.canvas.height = document.documentElement.clientHeight * 0.8;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    startInterval : function() {
        this.interval = setInterval(function() { updateCanvas(numlst); }, 20);
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
 
 
function updateCanvas(arr) {
    sortingArea.updateSize();
    rects = genRects(arr);
    updateRects(rects);
}
 
 
function genRects(arr) {
    var rectObjs = [];
    var rectWidth = sortingArea.canvas.width/arr.length;
    var color;
 
    for (var i = 0; i < arr.length; i++) {
        if (highlightedRects.indices.includes(i)) {
            color = highlightedRects.colors[highlightedRects.indices.indexOf(i)];
        } else if (mode == "dark") {
            color = "#e8e8e8";
        } else {
            var color = "black";
        }
        
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


// Sorting part
$("#sort").on("click", function() {
    var sortType = $('#type').find(":selected").val();
    var speed = $("#speed").val();

    if (speed < 1) {
        speed = 1;
    } else if (speed > 1000) {
        speed = 1000;
    }
    
    bubbleSort(1001-speed);
});


async function ending(delay=20) {
    highlightedRects.clear();
    for (var i = 0; i < numlst.length; i++) {
        highlightedRects.indices.push(i);
        highlightedRects.colors.push("green");

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
    }

    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 1000)
    );
    highlightedRects.clear();
}


async function bubbleSort(delay=100) {
    n = numlst.length
    var i, j;
    for (i = 0; i < n-1; i++) {
        var switches = 0;
        for (j = 0; j < n-i-1; j++) {
            highlightedRects.indices = [j, j+1];
            highlightedRects.colors = ["red", "red"];
            if (numlst[j] > numlst[j+1]) {
                var temp = numlst[j];
                numlst[j] = numlst[j+1];
                numlst[j+1] = temp;
                switches++;
            }
            
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
        }
        if (switches == 0) {
            break;
        }
    }
    ending();
}
 
start()