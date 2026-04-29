/**
 * Creative Coding 2026 — Sound Microphone Activate
 *
 * This sketch demonstrates how to activate the mic using the p5.sound library.
 *
 * Remember that you MUST include the p5.sound.min.js library
 *
 * To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * 
 * Brought to you by Karen ann Donnachie & Andy Simionato
 */
 
let mic, micLevel, circlecolour;
let amp;
let scale = 5.0;

function setup() {
createCanvas(windowWidth, windowHeight); //<~~~ using the entire window
  getAudioContext().suspend(); //<~~~IMPORTANT! for modern browsers
  background(255,255,0);

  //Create an audio input and start it
  mic = new p5.AudioIn();
  mic.start();
  micLevel = mic.getLevel();
 
  //some instructions
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Click anywhere to start",width/2,height/2+100);
}

function mousePressed(){
userStartAudio(); // for modern browsers which don't allow sound to start without user input
}

function draw() {
  micLevel = mic.getLevel();
  // Draw a background that fades to black
  circlecolour=int(255-micLevel*255);
  background(circlecolour,circlecolour,0, 5); //play with the colours if you like!
  noStroke();
  
  scale = map(micLevel, 0, 1.0, 30, width*12);

  // Draw the circle based on the volume
  stroke(circlecolour);
  fill(0,random(255),0);
  circle(width/2, height/2, scale);
}
