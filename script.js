let lst = [];

function startGame() {
    sortingArea.start();
}


function generateList(maxLen, maxNum) {
    var set = new Set();
    var i = 0;

    while (i < maxLen) {
        set.add((Math.random()*maxNum)+1);
    }

    return Array.from(set);
}


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