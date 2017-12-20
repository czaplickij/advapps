var flake = [];

function setup() {
	img = loadImage('https://cobenaa19.github.io/Adv/use.png')
  img1 = loadImage('https://czaplickij.github.io/advapps/snow.jpg')
  frameRate(0)
  createCanvas(650, 650);
  for (var i = 0; i < 30; i++) {
    flake[i] = new Snow();
  }
}

function draw() {
  background(0);
  image(img1,0,0)
  for (var i = 0; i < flake.length; i++) {
    flake[i].fall();
    flake[i].show();
    fill(255,0,0);
    rect(
      
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