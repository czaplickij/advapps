var bird;
var pipes = [];
var r,g,b
function setup() {
new Audio('https://czaplickij.github.io/advapps/boney.mp3').play()
  img = loadImage("https://czaplickij.github.io/advapps/city.jpg");
  img1 = loadImage("https://czaplickij.github.io/advapps/cccp4.jpg");
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
   
    fill(255,0,0);
    stroke(255);
    strokeWeight(3);
    rect(this.x, this.y,50,30);
    triangle(this.x-20, this.y+15, this.x, this.y,this.x,this.y +30);
		triangle(this.x+20,this.y-40,this.x+20,this.y+70,this.x+40, this.y+15);
    arc(this.x+50,this.y+15,50,30,4.7,PI)
    image(img1, this.x, this.y);
     if (mouseIsPressed) {
    if (mouseButton == LEFT)
      new Audio('https://czaplickij.github.io/advapps/swoosh.mp3').play()
        fill(255,0,0);
     rect(this.x, this.y,50,30);
       //rear triangle
    triangle(this.x-20, this.y+15, this.x, this.y,this.x,this.y +30);
       //wings
		triangle(this.x+20,this.y-40,this.x+20,this.y+70,this.x+40, this.y+15);
    arc(this.x+50,this.y+15,50,30,4.7,PI)
       fill(r,g,b);
       //rear engine
    ellipse(this.x-25,this.y+15,10,10);
    ellipse(this.x-30,this.y+15,10,10);
    ellipse(this.x-35,this.y+15,10,10);
       //left wing 2nd engine
    ellipse(this.x+20, this.y-20,10,10);
    ellipse(this.x+15, this.y-20,10,10);
    ellipse(this.x+10, this.y-20,10,10);
       //left wing last engine
    ellipse(this.x+20, this.y-40,10,10);
    ellipse(this.x+15, this.y-40,10,10);
    ellipse(this.x+10, this.y-40,10,10);
       //right wing 2nd engine
    ellipse(this.x+20, this.y+50,10,10);
    ellipse(this.x+15, this.y+50,10,10);
    ellipse(this.x+10, this.y+50,10,10);
       //right wing last engine
    ellipse(this.x+20, this.y+70,10,10);
    ellipse(this.x+15, this.y+70,10,10);
    ellipse(this.x+10, this.y+70,10,10);
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
    if (bird.y +10 < this.top || bird.y > height - this.bottom) {
      if (bird.x + 65 > this.x-5 && bird.x < this.x + this.w) {
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
       if (frameCount/20 < 8.54) {
             stroke(0);
    strokeWeight(5);
    fill(66, 244, 119);
  textSize(32);
	text("OBJECTIVE: DELIVER THE INTEL TO THE KREMLIN SAFELY. GOOD LUCK COMRADE MAKE THE USSR PROUD!", 200,70,70)
  }
     stroke(0);
    strokeWeight(5);
    fill(94, 34, 173);
    if (this.highlight) {
      fill(255, 255, 0);
    }
   
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.top + 250, this.w, 650);
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
