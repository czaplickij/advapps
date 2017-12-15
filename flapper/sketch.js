var bird;
var pipes = [];

function setup() {
new Audio('https://czaplickij.github.io/advapps/daftpunk.mp3').play()
  img = loadImage("https://czaplickij.github.io/advapps/clouds.jpg");
  createCanvas(650, 1056);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background (143, 252, 252);
// Displays the image at its actual size at point (0,0)
  image(img, 0, 0);
  // Displays the image at point (0, height/2) at half size
  image(img, 0, height, img.width, img.height);

  
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
if (mousePressed) {
fill(255,0,0);
triangle(this.x,this.y+10,this.x,this.y+20,this.x-10,this.y+15);  
} else{
  fill(255,0,0);
triangle(this.x,this.y+10,this.x,this.y+20,this.x-10,this.y+15);  
}

function Bird() {
  this.y = height/2;
  this.x = 64;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    fill(0);
    stroke(255);
    strokeWeight(3);
    rect(this.x, this.y,50,30);
    triangle(this.x-20, this.y+15, this.x, this.y,this.x,this.y +30);
		triangle(this.x+20,this.y-40,this.x+20,this.y+70,this.x+40, this.y+15);
    arc(this.x+50,this.y+15,50,30,4.7,PI)
 
   
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
 

  this.top = random(200,600);
  this.bottom = random(height/2);  
  this.x = width;
  this.w = 50;
  this.speed = 3;

  this.highlight = false;

  this.hits = function(bird) {  
    if (bird.y +10 < this.top || bird.y > height - this.bottom) {
      if (bird.x + 65 > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        fill(255,9,0);
        text("YOU LOSE: RESTART BROWSER. FINAL SCORE:" + " " + frameCount/20 ,200,400,70);
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
    fill(66, 179, 244);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.top + 250, this.w, 1056);
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