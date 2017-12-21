var flake = [];

function setup() {
	img = loadImage('https://cobenaa19.github.io/Adv/use.png');
  img1 = loadImage('https://czaplickij.github.io/advapps/snow.jpg');
img2 = loadImage('https://czaplickij.github.io/advapps/christmas.png');
  img3 = loadImage('https://czaplickij.github.io/advapps/christmasgg.png');
  frameRate(0)
  createCanvas(650, 650);
  for (var i = 0; i < 30; i++) {
    flake[i] = new Snow();
  }
}

function draw() {
  background(0);
  image(img1,0,0)
  image(img2,100,-100)
  for (var i = 0; i < flake.length; i++) {
    flake[i].fall();
    flake[i].show();
    fill(104, 75, 12);
      if (mouseIsPressed) {
    if (mouseButton == LEFT)
      image(img3,100,-100)
         stroke(255,0,0);
      }
     strokeWeight(7);
       stroke(177, 216, 224);
     rect(310,570,40,90);
    fill(36, 104, 90);
    triangle(230,600,430,600,330,400);
    triangle(270,500,390,500,330,400);
    triangle(290,450,370,450,330,380);
    
     
}
      }

function Snow() {
  this.x = random(0,640);
  this.y = random(-200,-400);
  this.z = random(0, 20);
  this.len = map(this.z, 0, 20, 10, 20);
  this.yspeed = random(1,10)

  this.fall = function() {
    this.y = this.y + this.yspeed;
    var grav = map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed
   
    if (this.y > 700) {
      this.y = random(-200,-400);
    }
  }
    
  this.show = function() {
    fill(255)
    image(img,this.x,this.y,this.z)
  }
}
