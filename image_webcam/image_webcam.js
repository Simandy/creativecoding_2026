/**
 * Creative Coding 2026 - Week 5: Image webcam experiments
 * Sketch: image_webcam.js by Andy Simionato and
 * Karen ann Donnachie
 * 
 * Instructions:
 * 1. Change up the values below, see what happens!
 * 2. ...or comment/uncomment lines to change the behaviour.
 * 
 * Stretch goals? 
 * Make the webcam image react to sound
 * Make the webcam image react to mouse position
 * Make the webcam image react to keyboard input
 * Make the webcam image out of ASCII characters
 * Make the webcam image out of emojis
 * Make the webcam image out of other images
 */

// Set the video capture as a global variable.
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0); //good practice to add a solid bg here
  imageMode(CENTER);
  // Use the createCapture() function to access the device's
  // camera and start capturing video.
  capture = createCapture(VIDEO);
  // Use capture.hide() to remove the p5.Element object made
  // using createCapture(). The video will instead be rendered as an image in draw().
  capture.hide();
}

function draw() {
  // METHOD 1: Just the webcam.
  background(0);

  push();
  // Move to center, then flip the horizontal scale to mirror
  translate(width / 2, height / 2);
  //scale(-1, 1); //mirrors

  //METHOD 2: Tinting
  // Add this right BEFORE your image(capture.get()... call:
  // tint(0, 255, 255); //change to whatever tint...

  image(capture, 0, 0); // We draw at (0,0) because of translate

  // image(capture.get(), 0, 0); // only use for method 2,
  // since sometimes the browser needs to treat each frame as an image

  // Instead of plonking the video in the middle of the page...
  // add this to the image() call to make the video stretch to fill your entire browser window.
  // image(capture, 0, 0, width, height, 0, 0, capture.width, capture.height, COVER);

  noTint(); //turns any tint off e.g. from Method 2

  pop();

  // --- METHOD 4: THE MOSAIC ---
  // We keep this outside of the mirroring push/pop for simplicity
  // but you can mess around with each of these as you like!

  // imageMode(CORNER);
  // image(capture, 0, 0, width / 2, height / 2);              // Top Left
  // image(capture, width / 2, 0, width / 2, height / 2);      // Top Right
  // image(capture, 0, height / 2, width / 2, height / 2);      // Bottom Left
  // image(capture, width / 2, height / 2, width / 2, height / 2); // Bottom Right

  // --- FILTERS! ---
  // everyone loves a filter, but warning: too many and you may melt phones!
  // Part 1: threshold~~~>
   //filter(THRESHOLD);

  // Part 2: posterize~~~>
   //filter(POSTERIZE, 4); // The '4' is the number of colors per channel

  // Part 3: invert~~~>
   filter(INVERT);

}

/**
 * Just some code to adjust the canvas if the browser window 
 * is resized.
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * Listen for key presses. 
 * 's' or 'S' will save a JPG of the current canvas.
 */
function keyPressed() {
  if (key == 's' || key == 'S') {
    // Generate a unique filename using the current date/time
    let fileName = 'webcam_' + year() + month() + day() + "_" + hour() + minute() + second();
    saveCanvas(fileName, 'jpg');
  }
}
