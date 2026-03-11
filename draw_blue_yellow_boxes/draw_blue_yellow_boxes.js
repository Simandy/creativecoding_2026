function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0,255,0);        //make a nice green bg
}

function draw() {
  square(mouseX,mouseY,60);   //draw the square at mouse X and Y
  fill(0,0,255);              //fill it with blue
  stroke(255,0,0);            //make the stroke red
  strokeWeight(10);           //make the stroke 10px
  if (mouseIsPressed) {       //but whenever the mouse is pressed, change it to~~~~
    fill(255,255,0);}         //a yellow fill
                              //...and whatever you add here
}
function keyPressed() {       //this special function happens when you press 's'
  if (key === 's') {          //Save the canvas to 'myCanvas.jpg'.
  saveCanvas('myCanvas.jpg');}
}
