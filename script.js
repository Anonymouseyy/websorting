// Sorting list and rect display
let numlst = [];
let rects = [];
// Keep track of which rects are hightlighted and what color
let highlightedRects = {
    indices: [],
    colors: [],
    clear : function() {
        this.indices = [];
        this.colors = [];
    }
};
// Length of the list
let length = 500;
// Light or dark mode
let mode = getCookie("mode");
let mute = getCookie("mute");

if (!mode) {
    mode = "light";
}
if (!mute) {
    mute = "no";
}
// Icons
let sun = "fa-sharp fa-solid fa-sun";
let moon = "fa-sharp fa-solid fa-moon";
let unmuted = "fa-solid fa-volume-high";
let muted = "fa-solid fa-volume-xmark";
// Keep track of whether or not we are sorting
let sorting = false;
// Variables to track statistics of the algorithm running
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let int = null;
let movements = 0;
let comparisons = 0;


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
        document.cookie = `mode=${mode}, mute=${mute};`;
        document.getElementById("sorting").style.borderColor = "white";
        document.getElementById("dark-light-icon").className = sun;
    } else {
        mode = "light";
        document.cookie = `mode=${mode}, mute=${mute};`;
        document.getElementById("sorting").style.borderColor = "black";
        document.getElementById("dark-light-icon").className = moon;
    }
});


$("#mute").on("click", function() {
    if (mute == "no") {
        mute = "yes";
        document.cookie = `mode=${mode}, mute=${mute};`;
        document.getElementById("mute-icon").className = muted;
    } else {
        mute = "no";
        document.cookie = `mode=${mode}, mute=${mute};`;
        document.getElementById("mute-icon").className = unmuted;
    }
});


// W3 schools https://www.w3schools.com/js/js_cookies.asp
 function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(',');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


// W3 Schools https://www.w3schools.com/graphics/game_canvas.asp
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
    if (mute == "yes") {
        document.getElementById("mute-icon").className = muted;
    }
}
 
 
function updateCanvas(arr) {
    sortingArea.updateSize();
    rects = genRects(arr);
    updateRects(rects);
    if (sorting) {
        let h = hours < 10 ? "0" + hours : hours;
        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
        $("#stats").text(`Run time: ${h}:${m}:${s}:${ms} Comparisons: ${comparisons} Movements: ${movements}`);
    }
}
 
 
function genRects(arr) {
    var rectObjs = [];
    var rectWidth = sortingArea.canvas.width/arr.length;
    var color;
 
    for (var i = 0; i < arr.length; i++) {
        if (highlightedRects.indices.includes(i)) {
            color = highlightedRects.colors[highlightedRects.indices.indexOf(i)];
            if (color != "purple" && mute == "no") {
                var freq = (numlst[i]*200)+100;
                playSound("sine", freq, 1)
            }
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

// Timer from https://foolishdeveloper.com/create-a-simple-stopwatch-using-javascript-tutorial-code/
function displayTimer() {
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
}


// Sorting part
$("#sort").on("click", function() {
    var sortType = $('#type').find(":selected").val();
    var speed = $("#speed").val();
    $("#generate").prop('disabled', true);
    sorting = true;
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    comparisons = 0;
    movements = 0;

    if (speed < 1) {
        speed = 1;
    } else if (speed > 100) {
        speed = 100;
    }

    if(int !== null){
        clearInterval(int);
    }

    int = setInterval(displayTimer,10);

    if (sortType == "bubble") {
        bubbleSort(101-speed);
    }
    if (sortType == "selection") {
        selectionSort(101-speed);
    }
    if (sortType == "insertion") {
        insertionSort(101-speed);
    }
});


async function ending(delay=20) {
    clearInterval(int);
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
    $("#generate").prop('disabled', false);
    sorting = false;
}


async function bubbleSort(delay) {
    var n = numlst.length
    var i, j;
    for (i = 0; i < n-1; i++) {
        var switches = 0;
        for (j = 0; j < n-i-1; j++) {
            highlightedRects.indices = [j, j+1];
            highlightedRects.colors = ["red", "red"];
            comparisons++;
            if (numlst[j] > numlst[j+1]) {
                movements++;
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


async function selectionSort(delay) {
    var i, j, min_idx;
    var n = numlst.length;

    for (i = 0; i < n-1; i++) {
        highlightedRects.indices = [i];
        highlightedRects.colors = ["purple"];
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            highlightedRects.clear();
            if (numlst[j] < numlst[min_idx]) {
                min_idx = j;
            }
            highlightedRects.indices.push(j, min_idx, i);
            highlightedRects.colors.push("red", "red", "purple");
            comparisons ++;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
        }

        var temp = numlst[min_idx];
        numlst[min_idx] = numlst[i];
        numlst[i] = temp;
        movements++;
    }
    ending();
}


async function insertionSort(delay) {
    var n = numlst.length;

    var i, key, j;
    for (i = 1; i < n; i++) {
        highlightedRects.indices = [i];
        highlightedRects.colors = ["purple"];
        key = numlst[i];
        j = i - 1;

        while (j >= 0 && numlst[j] > key) {
            highlightedRects.clear();

            numlst[j + 1] = numlst[j];
            j = j - 1;
            movements++;

            highlightedRects.indices.push(j, j-1, i);
            highlightedRects.colors.push("red", "red", "purple");

            comparisons++;
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
        }
        numlst[j + 1] = key;
        movements++;
    }
    ending();
}
 
start()
