function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0,255,0);
}

function draw() {
  //line(pmouseX,pmouseY,mouseX,mouseY); //draw a line starting from the previous xy to the present
  circle(mouseX,mouseY,abs(pmouseX-mouseX));   //draw a circle
  textSize(abs(pmouseX-mouseX));
  //text("HELLO",mouseX,mouseY);
  
  fill(mouseY/2,mouseX/2,(mouseX+mouseY)/2);   //color the circle
  stroke(mouseX/4,mouseY/4,(mouseX+mouseY)/4); //color the stroke
  strokeWeight(50-(abs(mouseX-pmouseX)+abs(mouseY-pmouseY)));
  strokeWeight(10);
  noStroke();
  if (mouseIsPressed) {
    fill(pmouseY/4,pmouseX/4,(pmouseX+pmouseY)/4); //when the key is pressed mess up the colors
  }
    
}
function keyPressed() {
  if (key === 's') {
  // Save the canvas to 'myCanvas.jpg'.
  saveCanvas('myCanvas.jpg');}
}
