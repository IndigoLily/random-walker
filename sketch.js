var satInput, opacityInput, sizeInput, paddingInput, showOptions, speedInput,
    colorSpeedInput;

function Walker() {
    this.x = 0;
    this.y = 0;
    this.color = 0;
    this.speed = 1;
    this.colorSpeed = 100;
    this.size = 10;
    this.padding = 1.5;
    this.sat = 0;
    this.opacity = .25;
    this.reset = function() {
        background(0);
        this.x = width/2;
        this.y = height/2;
    }
    this.move = function() {
        switch(Math.ceil(random(0,4))) {
            case 1:
                this.x += this.size;
                break;
            case 2:
                this.x -= this.size;
                break;
            case 3:
                this.y += this.size;
                break;
            case 4:
                this.y -= this.size;
                break;
            default:
                break;
        }
        if(this.x < 0){
            this.x += windowWidth;
        } else if (this.x > windowWidth) {
            this.x -= windowWidth;
        }
        if(this.y < 0){
            this.y += windowHeight;
        } else if(this.y > windowHeight){
            this.y -= windowHeight;
        }
    }
    this.draw = function() {
        stroke( (this.color / this.colorSpeed), this.sat, 100, this.opacity);
        point(this.x, this.y);
        if((this.color / this.colorSpeed) < 360){
            this.color++;
        } else {
            this.color = 0;
        }
    }
    this.update = function() {
        this.sat = satInput.value();
        this.opacity = opacityInput.value();
        this.size = sizeInput.value();
        this.padding = walker.size / paddingInput.value();
        this.speed = speedInput.value();
        this.colorSpeed = map(colorSpeedInput.value(), 1, 1000, 1000, 1);
        strokeWeight(walker.padding);
    }
}

var walker = new Walker();

function setup() {
    canv = createCanvas(windowWidth, windowHeight);
    background(0);
    walker.x = width/2;
    walker.y = height/2;
    colorMode(HSB);

    select("#save").mouseClicked(function(){
        saveCanvas();
    });
    select("#clear").mouseClicked(function(){
        walker.reset();
    });
    canv.mouseClicked(function(){
        showOptions = !showOptions;
        var options = select("#options");
        if(showOptions){
            options.style("display", "none");
            canv.style("cursor", "none");
        } else {
            options.style("display", "block");
            canv.style("cursor", "default");
        }
    });
    select("#full").mouseClicked(function(){
        fullscreen(!fullscreen());
    });
    satInput = select("#saturation");
    opacityInput = select("#opacity");
    sizeInput = select("#size");
    paddingInput = select("#padding");
    speedInput = select("#speed");
    colorSpeedInput = select("#colorSpeed");
    walker.update();
    walker.draw();
    speed = 1;
}

function draw() {
    for(var i = 0; i < walker.speed; i++){
        walker.update();
        walker.draw();
        walker.move();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    walker.reset();
}