/**
 * Creative Coding 2026 - Week 3: Intro to Typography
 * Sketch: first_type_anywhere
 * Original Concept by KarenAnn Donnachie
 * 
 * This interactive sketch loads a custom font and types any letter 
 * you press exactly at the mouse's current position!
 * 
 * Controls:
 * - Type any letter: Draws the letter at your mouse
 * - Mouse Click: Clears the canvas
 * - RIGHT ARROW: Increases font size
 * - LEFT ARROW: Decreases font size
 */

let bigness; // A variable to store our font size (modern JavaScript uses 'let' instead of 'var')
let fonty;   // A variable to store our loaded font

// preload() runs before setup() to ensure our font is downloaded and ready
function preload() {
  // Load the font file. Make sure the path matches where your font is stored!
  fonty = loadFont("data/StayPuft.ttf");
}

// setup() runs exactly once when the program starts
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Start with a solid black background
  background(0);
  
  // Set default text color to white
  fill(255);
  
  // Apply our loaded font to the sketch
  textFont(fonty);
  
  // Set the starting size of the text
  bigness = 120;
}

// draw() runs continuously after setup()
function draw() {
  // We constantly update the textSize in draw() so whenever the user
  // presses the arrow keys to change 'bigness', the new size applies!
  textSize(bigness);
}

// keyTyped() automatically triggers when a standard printable letter/number is pressed
function keyTyped() {
  // The system's 'key' variable stores whatever letter was just typed!
  // We immediately draw it exactly where the mouse pointer currently is.
  text(key, mouseX, mouseY);
}

// keyPressed() automatically triggers when ANY key is pressed (including special keys like arrows)
function keyPressed() {
  // Check if the specific system keyCode matches our arrow keys
  if (keyCode === LEFT_ARROW) {
    // Make the font size smaller by subtracting 10
    bigness -= 10;
  }
  
  if (keyCode === RIGHT_ARROW) {
    // Make the font size bigger by adding 10
    bigness += 10;
  }
  
  // 💡 TRY THIS: Uncomment below to let the user save the artwork!
  // if (key === 'S') { saveCanvas('my_typography_art.jpg'); }
}

// mousePressed() automatically triggers whenever a mouse button is clicked
function mousePressed() {
  // Clear the screen by drawing a fresh black background over all the letters
  background(0);
}

// Ensure the canvas fully resizes if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Redraw the background so we don't start dragging text onto a transparent canvas
  background(0);
}
