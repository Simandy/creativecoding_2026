function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 0, 255);
  textSize(100);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255, 0, 255);

  // Set stroke style before drawing shapes
  stroke(0, 0, 0);
  strokeWeight(10);
  fill(0, 0, 255);

  square(100, 200, 100);
  square(230, 200, 100);
  line(100, 200, 330, 200);
  line(100, 360, 330, 360);

  // Magenta "L"
  push();
  fill(255, 0, 255);
  noStroke();
  textSize(100);
  text("L", 230, 300);
  pop();

  // White "wwwwwww"
  push();
  fill(255, 255, 255);
  noStroke();
  textSize(50);
  text("wwwwwww", 220, 360);
  pop();
}

function keyPressed() {
  if (key === 's') {
    saveCanvas('myCanvas', 'jpg');
  }
}
