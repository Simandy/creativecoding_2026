function setup() {
  createCanvas(windowWidth, windowHeight)
  background(255,255,0);                //start with a yellow background
}

function draw() {
  background(255,255,0,6);              //the fourth variable here is opacity!
  circle(mouseX,mouseY,64);           //you can create the illusion of fading objects
  //circle(width/2,height/2,24);
  //line(width/2,height/2,mouseX,mouseY); //like a line
  //fill(0,0,255);                        //
  //stroke(0,0,0);                        //color of the line stroke is black
  //strokeWeight(2);                     //weight of the stroke
  if (mouseIsPressed) {                 //and if you click the mouse...
    fill(255,255,0);                    //it changes
  //background(random(255),random(255),random(255)); //changes the bg to a random rgb  
  //clear();
  }
    
}
function keyPressed() {
  if (key === 's') {
  // Save the canvas to 'myCanvas.jpg'.
  saveCanvas('myCanvas.jpg');}
}
