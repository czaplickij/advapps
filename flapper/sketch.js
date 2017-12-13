
var bird;
var pipes = [];

function setup() {
new Audio('https://www.mp3converter.net/index.php?output=yt/YgGzAKP_HuM/128%7e%7e256%7e%7eRASPUTIN_-_Vladimir_Putin_-_Love_The_Way_You_Move_Funk_Overload_slocband_uuid-5a3150db36216.mp3').play()

  createCanvas(400, 650);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background (143, 252, 252);
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
    fill(96, 11, 119);
    noStroke();
    rect(this.x, this.y,50,30);
    triangle(this.x-20, this.y+15, this.x, this.y,this.x,this.y +30);
		triangle(this.x+20,this.y-40,this.x+20,this.y+70,this.x+40, this.y+15);
    arc(this.x+50,this.y+15,50,30,4.7,PI)
    fill(255);
    triangle(this.x,this.y+10,this.x,this.y+20,this.x-10,this.y+15);  
   
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
 

  this.top = random(100,450);
  this.bottom = random(height/2);  
  this.x = width;
  this.w = 50;
  this.speed = 2;

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
    fill(252, 143, 143);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.top + 150, this.w, 600);
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