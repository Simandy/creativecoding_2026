/**
 * Creative Coding 2026 - Week 4: Advanced Typography
 * Original Concept by Andy Simionato & KarenAnn Donnachie
 * 
 * This interactive sketch introduces how to preload strings of text
 * 
 */

let blastText; // Array to store our lines of text

function preload() {
  // preload() runs before setup() and ensures files are fully loaded.
  // loadStrings() reads a text file and turns each line into one item in an array.
  blastText = loadStrings("data/blast_text.txt");
}

function setup() {
  // createCanvas uses the full browser window
  createCanvas(windowWidth, windowHeight);

  // Set basic styles once
  background(255);
  fill(0);
  textAlign(LEFT, TOP); // align text to the top-left corner

  // noLoop stops p5 from running the draw loop 60 times a second.
  // This is great for static designs or "one-off" layout experiments.
  noLoop();
}

function draw() {
  // Clear the background if the window was resized
  background(255);

  let margin = width * 0.1;       // 10% margin on the left
  let textBoxWidth = width * 0.8; // Use 80% of the screen width for text
  let currentY = 50;              // The starting vertical position

  // Loop through every line of text we loaded
  for (let i = 0; i < blastText.length; i++) {

    // --- CREATIVE ZONE ---
    // Try swapping the next 2 lines for a quick "Blast" effect!
    textSize(random(12, 64)); 
    //textSize(24);

    // text(string, x, y, [maxWidth]) 
    // The [maxWidth] argument automatically wraps long sentences to fit.
    text(blastText[i], margin, currentY, textBoxWidth);

    // Increment the Y position based on current text size.
    // Adding 1.4 to the textSize creates 'leading' or line-spacing.
    currentY += textSize() * 1.4;
  }
}

// This function makes our sketch responsive to browser resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Because we use noLoop(), we have to manually tell p5 to "redraw"
  redraw();
}
