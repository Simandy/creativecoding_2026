/**
 * Creative Coding 2026 - Week 2: Shape Shifters
 * Sketch: draw_pollock
 * 
 * This sketch introduces the pmouseX and pmouseY variables (previous mouse position)
 * to calculate how fast the mouse is moving. It uses mouse position to dynamically
 * change colors and size, creating a Jackson Pollock-style painting tool.
 */

// setup() runs exactly once when the program starts
function setup() {
  // Always create your canvas first
  createCanvas(windowWidth, windowHeight);

  // Drawing the background once allows our shapes to leave a continuous trail
  background(0, 255, 0); // Bright green canvas
}

// draw() runs continuously after setup()
function draw() {
  // --- 1. CALCULATE SPEED ---
  // Calculate the horizontal speed of the mouse by taking the difference 
  // between the current mouseX and the previous frame's pmouseX.
  // abs() stands for "absolute value"—it ensures the number is always positive.
  let horizontalSpeed = abs(pmouseX - mouseX);


  // --- 2. SET THE STYLING ---
  // Create dynamic colors based on the mouse's X and Y coordinates on the screen.
  // Because colors max out at 255, we divide the coordinates to keep the colors
  // from turning completely white too quickly.
  if (mouseIsPressed) {
    // When the mouse is pressed, switch up the color mapping
    fill(pmouseY / 4, pmouseX / 4, (pmouseX + pmouseY) / 4);
  } else {
    // Normal color mapping based on current mouse position
    fill(mouseY / 2, mouseX / 2, (mouseX + mouseY) / 2);
  }

  // We use noStroke() here to just draw solid shapes without outlines
  noStroke();

  // 💡 TRY THIS: Comment out noStroke() and uncomment the lines below to see how 
  // you can make the stroke thickness change based on the speed of the mouse!
  // stroke(mouseX / 4, mouseY / 4, (mouseX + mouseY) / 4);
  // let mouseSpeed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
  // strokeWeight(50 - mouseSpeed); 


  // --- 3. DRAW THE SHAPES ---
  // Draw a circle at the mouse position, making its size dependent on how fast you move!
  circle(mouseX, mouseY, horizontalSpeed);

  // 💡 TRY THIS: Uncomment the lines below to draw lines or text instead of circles!
  // fill(0);
  // textSize(horizontalSpeed);
  // text("HELLO", mouseX, mouseY);

  // stroke(0);
  // strokeWeight(5);
  // line(pmouseX, pmouseY, mouseX, mouseY); // Draws a connected line path!
}

// keyPressed() automatically triggers every time a key is pressed down.
function keyPressed() {
  // Check if the specific key pressed was a lowercase 's'
  if (key === 's') {
    saveCanvas('pollock_masterpiece.jpg');
  }
}

// Ensure the canvas fully resizes if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0, 255, 0); // Redraw the background to prevent a blank transparent canvas
}
