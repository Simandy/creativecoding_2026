/**
 * Creative Coding 2026 — Sound loading MP3s
 *
 * This sketch demonstrates how to load and play an MP3 file using the p5.sound library.
 *
 * Remember that you MUST include the p5.sound.min.js library
 *
 * To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * You should add your own sound file to the 'data' folder 
 * and update the path in the loadSound() function accordingly
 */

let song;
let analyzer, volume, fontsize; //<~~~~needed ONLY for vizualisation, not needed for simple loading of MP3

function preload() {
  song = loadSound("data/House_of_the_rising_sun.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  fontsize = 124; // the 'floor' for my text
  textSize(fontsize); //will be played with in the viz
  fill(255);
  background(0, 255, 0);
  text('Click to start / pause audio', width / 2, height / 2);
  
  getAudioContext().suspend(); // <~~~~~IMPORTANT! Start with audio context suspended until user interaction
  
  volume = 0; //only for viz
}

function draw() {
  // Nothing to draw here, but you could add visualizations like the following...
  
  if (song.isPlaying()) {
    background(0, 255, 0, 4)
  volume = analyzer.getLevel();  //<~~~only for viz
  let fontsize = map(volume,0,1,124,600);
  textSize(fontsize);
  text("House of the rising sun", width/2, height/2);
  }
  else {textSize(124);}
}

 //These next functions let the user start/stop the MP3 play
 
function mousePressed() {
  // Required in modern browsers: unlock audio context on user gesture.
  //userStartAudio(); //<~~~~ actually all you need to load and play an MP3
  
  //this bit is only to vizualise the music
  if (getAudioContext.state!=='running') {
    userStartAudio();
    analyzer = new p5.Amplitude();
    analyzer.setInput(song); }

  if (song.isPlaying()) {
    song.pause();
    background(255, 0, 0);
    fill(255);
    textSize(124);
    text('Paused - click to resume', width/2, height/2);
  } else {
    song.loop();
    background(0, 255, 0);
    fill(255);
    textSize(124);
    text('Playing - click to pause', width / 2, height / 2);
  }
}
