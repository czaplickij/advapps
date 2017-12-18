var bird;
var pipes = [];
var r,g,b
function setup() {
new Audio('https://czaplickij.github.io/advapps/daftpunk.mp3').play()
  img = loadImage("https://czaplickij.github.io/advapps/strat.png");
  img1 = loadImage("https://czaplickij.github.io/advapps/jet.png");
  img2 = loadImage("https://czaplickij.github.io/advapps/missle.png");
  img3 = loadImage(" https://czaplickij.github.io/advapps/misslerev.png");

  createCanvas(650, 650);
  bird = new Bird();
  pipes.push(new Pipe());
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
  this.bottom = random(height/2);  
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
