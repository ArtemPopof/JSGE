'use strict'

var isDebug = true;

// UTTILS   
function debug(string) {
    if (isDebug) {
        console.log(string);
    }
}

var COLOR_RED = "#ff0000",
    COLOR_GREEN = "#00ff00",
    COLOR_BLUE = "#0000ff",
    COLOR_WHITE = "#ffffff",
    COLOR_BLACK = "#000000";

function Game(width, height) {
    this.canvas = document.getElementById("tutorial");
    this.ctx = this.canvas.getContext('2d');

    this.width = width;
    this.height = height;

    if (width) {
        this.canvas.style.width = width;
    }
    if (height) {
        this.canvas.style.height = height;
    }

    this.frameRate = 40;
    this.lastUpdate = new Date().getTime();

    this.clearColor = COLOR_BLACK;

    this.stopped = false;

    this.setHandlers();
}

// Game main cycle
Game.prototype.run = function() {
    let timer = null;
    let self = this;

    return new Promise((resolve, reject) => {
        timer = setInterval( () => {
            if (self.stopped) {
                clearInterval(timer);
                self.onClose();
                resolve("Game has stopped!");
            }
            self.update();
        }, 1000 / 40);
    });
}

Game.prototype.stop = function() {
debug("[Game Stop] killing game process!");
    this.stopped = true;
}

Game.prototype.update = function() {
debug("[Game Update] start update!");

    if (new Date().getTime() - this.lastUpdate > this.getMsPerFrame()) {

        if (this.render) {
            this.render();
        }

        this.lastUpdate = new Date().getTime();
    }
}

Game.prototype.setRenderFunc = function(func) {
    if (func) {
        Game.prototype.render = func;
    }
}

Game.prototype.setFrameRate = function(fps) {
    if (fps > 0) {
        this.frameRate = fps;
    }
}

Game.prototype.getMsPerFrame = function() {
    return this.frameRate / 1000;
}

Game.prototype.setWidth = function(width) {
    if (width) {
        this.canvas.style.width = width;
    }
}

Game.prototype.setWidth = function(height) {
    if (height) {
        this.canvas.style.height = height;
    }
}

Game.prototype.getContext = function() {
    return this.ctx;
}

Game.prototype.setClearColor = function() {
    this.ctx.fillStyle = this.clearColor;
}

Game.prototype.clearScreen = function() {
    this.ctx.fillRect(0, 0, this.width, this.height);
}

Game.prototype.setHandlers = function() {
    this.canvas.addEventListener("click", function() {
        this.stop();
    }.bind(this));
}

Game.prototype.onClose = function() {
debug("[Game onClose] clear handlers");
    // TODO: remove event listeners
}