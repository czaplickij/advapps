var bird;
var pipes = [];
var r,g,b
var flake = [];
function setup() {
new Audio('https://czaplickij.github.io/advapps/daftpunk.mp3').play()
  img = loadImage("https://czaplickij.github.io/advapps/strat.png");
  img1 = loadImage("https://czaplickij.github.io/advapps/jet.png");
  img2 = loadImage("https://czaplickij.github.io/advapps/missle.png");
  img3 = loadImage(" https://czaplickij.github.io/advapps/misslerev.png");
  createCanvas(650, 650);
  bird = new Bird();
  pipes.push(new Pipe());
  	img4 = loadImage('https://czaplickij.github.io/advapps/star1.png')
  frameRate(0)
  for (var l = 0; l < 10; l++) {
    flake[l] = new Snow();
  }
}

function draw() {
  background (143, 252, 252);
     
  image(img, 0, 0);
  r = random(255);
 g = random(255);
  b = random(255);
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
  
    if (pipes[i].hits(bird)) {
      console.log("GAME OVER");
    }
  


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
  if (frameCount/20 < 8.54) {
    fill(255,0,0);
  textSize(32);
	text("OBJECTIVE: DELIVER THE INTEL TO WASHINGTON D.C. SAFELY", 200,70,70)
  }
  fill(206, 79, 209);
  textSize(32);
	text(frameCount/20, 10,70,70)
  fill(255);
  for (var l = 0; l < flake.length; l++) {
    flake[l].fall();
    flake[l].show();
   }
}
function mousePressed() {
    bird.up();
    //console.log("SPACE");
}
function Bird() {
  this.y = height/2;
  this.x = 64;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    image(img1, this.x, this.y);
     if (mouseIsPressed) {
    if (mouseButton == LEFT)
      new Audio('https://czaplickij.github.io/advapps/swoosh.mp3').play()
  fill(244, 66, 235);
       noStroke();
       //left engine
       ellipse(this.x-10,this.y+5,10,10);
        ellipse(this.x-5,this.y+5,10,10);
        ellipse(this.x,this.y+5,10,10);
       //right engine
       ellipse(this.x-10,this.y+45,10,10);
ellipse(this.x-5,this.y+45,10,10);
        ellipse(this.x,this.y+45,10,10);
       image(img1, this.x, this.y);
  } 
  } 

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
      
    }
  }
}

function Pipe() {
  this.top = random(100,400);
  this.bottom = random(height/3);  
  this.x = width;
  this.w = 50;
  this.speed = 3;
 
  this.highlight = false;

 this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
           this.highlight = true;
        fill(255,9,0);
        text("WESTERN SPY! FINAL SCORE:" + " " + frameCount/20 ,200,400,70);
        noLoop();
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
     stroke(0);
    strokeWeight(5);
    fill(94, 34, 173);
    if (this.highlight) {
      fill(255, 255, 0);
    }

   image(img3,this.x, 0, this.w, this.top);
    image(img2,this.x, height-this.bottom, this.w, this.bottom);
   
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
      
    }
  }
  
}
function Snow() {
  this.x = random(800,900);
  this.y = random(height);
  this.z = random(10,20);
  this.len = map(this.z, 0, 20, 10, 20);
  this.xspeed = map(this.z, 0, 20, 1, 20);

  this.fall = function() {
    this.x = this.x - this.xspeed;
    var grav = map(this.z, 0, 20, 0, 0.2);
    this.xspeed = this.xspeed

    if (this.x < 0) {
      this.x = random(800,900);
    }
  }

  this.show = function() {
    fill(255)
    image(img4,this.x,this.y,this.z)
  }
}
