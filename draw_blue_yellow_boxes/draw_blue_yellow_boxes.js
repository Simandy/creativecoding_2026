/**
 * Creative Coding 2026 - Week 2: Shape Shifters
 * Sketch: draw_blue_yellow_boxes
 * 
 * This sketch demonstrates how to draw a shape that follows the mouse,
 * change its colors, and use an 'if' statement to react when the mouse is pressed.
 * It also includes a handy way to save your canvas as an image!
 */

// setup() runs exactly once when the program starts
function setup() {
  // Always create your canvas first!
  createCanvas(windowWidth, windowHeight);

  // Draw our background inside setup() so it only draws once.
  // Because it only draws once, our squares will leave a "trail" as we move the mouse!
  background(0, 255, 0); // rgb(0, 255, 0) makes a nice bright green

  // (Optional) Draw shapes from their center rather than their top-left corner.
  // This makes the square perfectly centered right under the tip of the mouse arrow.
  rectMode(CENTER);
}

// draw() runs continuously after setup(), matching your screen's refresh rate
function draw() {
  // 1. SET THE STYLING FIRST
  // The golden rule of p5.js: Always set your colors and line thickness *before* drawing the shape.
  stroke(255, 0, 0);   // Make the outline red (Red, Green, Blue)
  strokeWeight(10);    // Make the outline 10 pixels thick

  // 2. CHECK FOR INTERACTION AND SET THE FILL COLOR
  // We use an 'if/else' statement to check a logical condition
  if (mouseIsPressed) {
    // If the mouse button IS being held down right now...
    fill(255, 255, 0); // Fill the square with yellow
  } else {
    // If the mouse button is NOT being held down...
    fill(0, 0, 255);   // Fill the square with blue
  }

  // 3. DRAW THE SHAPE
  // Draw the square exactly at the mouse's current X and Y coordinates.
  // It will have a width and height of 60 pixels.
  square(mouseX, mouseY, 60);
}

// keyPressed() is a special p5 function that automatically triggers 
// exactly once every time a key on the keyboard is pressed down.
function keyPressed() {
  // Check if the specific key pressed was a lowercase 's'
  if (key === 's') {
    // Save the current canvas as an image file downloaded to your computer!
    saveCanvas('my_cool_sketch.jpg');
  }
}

// This function automatically triggers when the window is resized
// It ensures your canvas always fits the browser window perfectly.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // We need to redraw the background here, otherwise resizing gives us a blank transparent canvas!
  background(0, 255, 0);
}
