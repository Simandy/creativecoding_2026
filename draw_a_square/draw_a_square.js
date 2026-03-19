/**
 * Creative Coding 2026 - Week 2: Shape Shifters
 * Sketch: draw_a_square
 * 
 * This sketch demonstrates how to draw basic primitive shapes 
 * (squares, lines) alongside text to create a static composition.
 * It also demonstrates the p5.js coordinate system.
 */

// setup() runs exactly once when the program starts
function setup() {
  // Always create your canvas first!
  createCanvas(windowWidth, windowHeight);

  // You can set default typography settings here that will apply everywhere
  // unless they are overridden later inside draw()
  textAlign(CENTER, CENTER);
}

// draw() runs continuously after setup(), matching your screen's refresh rate
function draw() {
  // Clear the background every frame
  // The color is (Red, Green, Blue) - here we make it magenta!
  background(255, 0, 255);

  // --- 1. DRAWING PRIMITIVE SHAPES ---
  // The golden rule: always set your style *before* you tell p5 to draw the shape!
  stroke(0);           // Black outline (0 is shorthand for black)
  strokeWeight(10);    // 10 pixels thick
  fill(0, 0, 255);     // Blue color inside

  // square(x, y, size)
  // X and Y control the top-left corner of the square by default
  square(100, 200, 100);
  square(230, 200, 100);

  // line(x1, y1, x2, y2)
  // Draws a straight line extending from point 1 (x1, y1) to point 2 (x2, y2)
  line(100, 200, 330, 200); // Top line
  line(100, 360, 330, 360); // Bottom line


  // --- 2. DRAWING TEXT ---
  // We use push() and pop() to temporarily apply styles just for these text elements

  // Magenta "L"
  push();
  fill(255, 0, 255);   // Magenta text color (matches the background!)
  noStroke();          // No outline on the text
  textSize(100);       // Make it giant
  text("L", 230, 300); // Draw the "L" at X=230, Y=300
  pop();

  // White "wwwwwww"
  push();
  fill(255);           // White text color (255 is shorthand for 255, 255, 255)
  noStroke();
  textSize(50);
  text("wwwwwww", 220, 360);
  pop();
}

// keyPressed() is a special p5 function that automatically triggers 
// exactly once every time a key on the keyboard is pressed down.
function keyPressed() {
  // Check if the specific key pressed was a lowercase 's'
  if (key === 's') {
    // Save the canvas to your computer as an image
    saveCanvas('myCanvas', 'jpg');
  }
}

// This function automatically triggers when the window is resized
// It ensures your canvas always fits the browser perfectly
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
