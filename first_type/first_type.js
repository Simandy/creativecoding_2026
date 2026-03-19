/**
 * Creative Coding 2026 - Week 3: Intro to Typography
 * Sketch: first_type
 * 
 * This sketch demonstrates how to load a custom font,
 * change text formatting (size, alignment), and display
 * text on the canvas.
 */

// Use 'let' instead of 'var' to declare variables in modern JavaScript
let myFont;

// preload() is a special p5 function. It runs before setup() to ensure 
// all external files (like fonts or images) are fully loaded before the sketch starts.
function preload() {
  // Load the font file. Make sure the path matches where your font is stored!
  myFont = loadFont("data/AdobeClean-It.otf");
}

// setup() runs exactly once when the program starts
function setup() {
  // Always create your canvas first!
  createCanvas(windowWidth, windowHeight);

  // Apply our loaded font to all text in the sketch
  textFont(myFont);

  // Align text to start from its center point (both horizontally and vertically)
  // Try changing these to LEFT, RIGHT, TOP, or BOTTOM to see what happens
  textAlign(CENTER, CENTER);
}

// draw() runs continuously after setup(), matching your screen's refresh rate
function draw() {
  // Clear the background every frame so old drawings don't smear
  background(240); // 240 is a light gray color

  // --- DRAWING GUIDE LINES ---
  // We draw two lines intersecting at the center to visualize our alignments
  stroke(200, 0, 0);       // Make the lines red
  strokeWeight(2);         // Make the lines slightly thicker
  line(width / 2, 0, width / 2, height); // Vertical center line
  line(0, height / 2, width, height / 2); // Horizontal center line
  // ---------------------------

  // Reset stroke and fill for our text
  noStroke(); // Text usually doesn't need an outline
  fill(0);    // Set text color to black (0)

  // Set the default text size for the main text
  textSize(120);

  // Draw the main text
  // Our text will be centered exactly on our guide lines because of textAlign(CENTER, CENTER)
  text("HELLO WORLD", width / 2, height / 2);

  // The push() and pop() functions let you temporarily isolate style changes.
  // Anything changed between push() and pop() won't affect the rest of the sketch.
  push();
  textSize(45);
  fill(0, 100, 200); // Give this text a nice blue color

  // You can even make this text follow your mouse! 
  // Try changing width/3 and height/3 to mouseX and mouseY
  text("Hi there", width / 3, height / 3);

  // Here is an example of a text inside a constrained bounding box (width and height defined)
  // text("Constrained Text", mouseX, mouseY, 300, 300);
  pop();
}

// This function automatically triggers when the window is resized
// It ensures your canvas always fits the browser perfectly
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
